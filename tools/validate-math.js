#!/usr/bin/env node
// MathJax-Validator fuer Markdown-Dateien.
//
// GitHub nutzt MathJax (nicht KaTeX) zum Rendern mathematischer
// Ausdruecke; siehe GitHubs Doku zu "Writing mathematical expressions".
// Dieser Validator extrahiert alle Math-Bloecke aus Markdown-Dateien
// und rendert sie mit derselben Engine (mathjax-full).
//
// Drei Meldungs-Arten:
//
//   ERROR  — MathJax bricht beim Rendern ab. Muss korrigiert werden.
//
//   DENIED — Quelltext nutzt ein Makro, das in MathJax existiert, aber
//            von GitHub per Allow-Liste blockiert wird (z.B. \operatorname).
//            MathJax-lokal ist es OK, live auf GitHub bricht es mit
//            "The following macros are not allowed: ...".
//
//   WARN   — MathJax akzeptiert den Quelltext, aber GitHubs Pre-Processor
//            veraendert ihn vor dem Rendering:
//              - In ```math-Fences blaeht GitHub `\\` am Zeilenende zu
//                `\\\` auf (reproduzierbar ueber die /markdown-API).
//              - In $...$ und einzeiligem $$...$$ frisst CommonMark
//                Backslashes vor ASCII-Interpunktion: \, → ,  \{ → {
//                usw. KaTeX/MathJax sieht die geaenderte Form.
//
// Aufruf:
//   node validate-math.js                          # alle *.md ab cwd
//   node validate-math.js path/to/file.md ...      # bestimmte Dateien/Pfade
//   node validate-math.js --verbose                # auch OK-Bloecke melden
//   node validate-math.js --no-warn                # Warnungen unterdruecken

const { mathjax } = require('mathjax-full/js/mathjax.js');
const { TeX } = require('mathjax-full/js/input/tex.js');
const { SVG } = require('mathjax-full/js/output/svg.js');
const { liteAdaptor } = require('mathjax-full/js/adaptors/liteAdaptor.js');
const { RegisterHTMLHandler } = require('mathjax-full/js/handlers/html.js');
const { AllPackages } = require('mathjax-full/js/input/tex/AllPackages.js');
const fs = require('fs');
const path = require('path');

// MathJax 3.2.0 mit tex-chtml-full Setup — laut Bundle-Inspektion identisch
// zu GitHubs Live-Konfiguration:
//   chunk-vendors-node_modules_mathjax_es5_tex-chtml-full_js-...
//   version: "3.2.0"
//   packages: AllPackages
const adaptor = liteAdaptor();
RegisterHTMLHandler(adaptor);
const tex = new TeX({
  packages: AllPackages,
  formatError: (jax, err) => { throw err; },
});
const svg = new SVG({ fontCache: 'none' });
const mjDoc = mathjax.document('', { InputJax: tex, OutputJax: svg });

// Makros, die MathJax kennt, aber GitHubs Math-Pipeline explizit blockiert
// (Fehlermeldung "The following macros are not allowed: <name>").
// Empirisch beobachtet — Liste erweitern, wenn neue auftauchen.
const GITHUB_DENIED_MACROS = new Set([
  'operatorname',
  // \operatorname* wird vom selben Filter abgefangen
]);

// CommonMark escape set: Backslash vor diesen Zeichen verliert in
// $...$ und einzeiligem $$...$$ den Backslash, bevor MathJax es sieht.
const CM_ESCAPABLE = new Set('!"#$%&\'()*+,-./:;<=>?@[]^_`{|}~');

function* findMathBlocks(content) {
  const lines = content.split('\n');
  let inFence = false;
  let fenceContent = [];
  let fenceStart = 0;
  let fenceIndent = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNum = i + 1;
    const trimmed = line.trimStart();

    if (!inFence && trimmed.startsWith('```math')) {
      inFence = true;
      fenceStart = lineNum;
      fenceContent = [];
      fenceIndent = line.substring(0, line.length - trimmed.length);
      continue;
    }
    if (inFence && trimmed.startsWith('```')) {
      yield {
        type: 'display',
        line: fenceStart,
        source: 'fence',
        content: fenceContent.join('\n'),
      };
      inFence = false;
      continue;
    }
    if (inFence) {
      let cleaned = line;
      if (fenceIndent && cleaned.startsWith(fenceIndent)) {
        cleaned = cleaned.substring(fenceIndent.length);
      }
      fenceContent.push(cleaned);
      continue;
    }

    // Außerhalb von Fences: $$...$$ einzeilig und $...$ inline
    let j = 0;
    while (j < line.length) {
      if (line[j] === '$') {
        if (line[j + 1] === '$') {
          const end = line.indexOf('$$', j + 2);
          if (end !== -1) {
            yield {
              type: 'display',
              line: lineNum,
              source: 'dollar-dollar',
              content: line.substring(j + 2, end),
            };
            j = end + 2;
            continue;
          }
        }
        let end = j + 1;
        while (end < line.length) {
          if (line[end] === '$' && line[end + 1] !== '$') break;
          end++;
        }
        if (end < line.length && line[end] === '$') {
          yield {
            type: 'inline',
            line: lineNum,
            source: 'dollar',
            content: line.substring(j + 1, end),
          };
          j = end + 1;
          continue;
        }
      }
      j++;
    }
  }
}

function* detectDenied(block) {
  // Finde \name oder \name* fuer Namen aus der Denylist.
  const re = /\\([a-zA-Z]+)\*?/g;
  let m;
  while ((m = re.exec(block.content)) !== null) {
    if (GITHUB_DENIED_MACROS.has(m[1])) {
      yield {
        relLine: block.content.substring(0, m.index).split('\n').length - 1,
        kind: 'github-denied-macro',
        macro: '\\' + m[1],
        message: `\\${m[1]} ist in MathJax definiert, wird aber von GitHubs Math-Pipeline blockiert (\"macros not allowed\")`,
      };
    }
  }
}

function* detectQuirks(block) {
  if (block.source === 'fence') {
    const lines = block.content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].endsWith('\\\\') && i < lines.length - 1) {
        yield {
          relLine: i,
          kind: 'github-fence-backslash',
          message: '`\\\\` am Zeilenende in ```math-Fence — GitHub blaeht zu `\\\\\\`, MathJax bricht dann live ab',
        };
      }
    }
  } else {
    for (let i = 0; i < block.content.length - 1; i++) {
      if (block.content[i] === '\\' && CM_ESCAPABLE.has(block.content[i + 1])) {
        yield {
          relLine: 0,
          kind: 'commonmark-escape',
          message: `\`\\${block.content[i + 1]}\` in ${block.type === 'inline' ? '$...$' : '$$...$$'} — CommonMark frisst Backslash, MathJax-Bedeutung geht verloren`,
        };
      }
    }
  }
}

function validate(filePath, opts) {
  let text;
  try {
    text = fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    console.error(`${filePath}: cannot read (${e.code})`);
    return { errors: 1, denied: 0, warnings: 0 };
  }
  let errors = 0;
  let denied = 0;
  let warnings = 0;
  let total = 0;
  for (const block of findMathBlocks(text)) {
    total++;
    // 1. MathJax-Render (harte Fehler)
    try {
      mjDoc.convert(block.content, { display: block.type === 'display' });
      if (opts.verbose) {
        console.log(`${filePath}:${block.line} (${block.type}/${block.source}) OK`);
      }
    } catch (e) {
      errors++;
      console.log(`${filePath}:${block.line} (${block.type}/${block.source}) ERROR`);
      const msg = (e.message || e.toString()).split('\n')[0];
      console.log(`  ${msg}`);
      console.log(`  content: ${block.content.length > 120 ? block.content.substring(0, 120) + '...' : block.content}`);
    }
    // 2. GitHub-Denylist (DENIED — MathJax akzeptiert, GitHub blockiert)
    for (const d of detectDenied(block)) {
      denied++;
      const lineNum = block.line + d.relLine;
      console.log(`${filePath}:${lineNum} (${block.type}/${block.source}) DENIED [${d.macro}]`);
      console.log(`  ${d.message}`);
    }
    // 3. Quirk-Warnungen (Pre-Processor-Veraenderungen)
    if (!opts.noWarn) {
      for (const q of detectQuirks(block)) {
        warnings++;
        const lineNum = block.line + q.relLine;
        console.log(`${filePath}:${lineNum} (${block.type}/${block.source}) WARN [${q.kind}]`);
        console.log(`  ${q.message}`);
      }
    }
  }
  if (opts.verbose || errors > 0 || denied > 0 || warnings > 0) {
    const parts = [`${total - errors}/${total} OK`];
    if (errors) parts.push(`${errors} ERROR`);
    if (denied) parts.push(`${denied} DENIED`);
    if (warnings) parts.push(`${warnings} WARN`);
    console.log(`${filePath}: ${parts.join(', ')}`);
  }
  return { errors, denied, warnings };
}

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, out);
    } else if (entry.name.endsWith('.md')) {
      out.push(full);
    }
  }
  return out;
}

const args = process.argv.slice(2);
const opts = {
  verbose: args.includes('--verbose') || args.includes('-v'),
  noWarn: args.includes('--no-warn'),
};
const files = args.filter((a) => !a.startsWith('-'));

let targets;
if (files.length === 0) {
  targets = walk('.');
} else {
  targets = [];
  for (const f of files) {
    const stat = fs.statSync(f);
    if (stat.isDirectory()) {
      walk(f, targets);
    } else {
      targets.push(f);
    }
  }
}

let totalErrors = 0;
let totalDenied = 0;
let totalWarnings = 0;
for (const f of targets) {
  const r = validate(f, opts);
  totalErrors += r.errors;
  totalDenied += r.denied;
  totalWarnings += r.warnings;
}
const summary = [`${targets.length} Datei(en)`];
if (totalErrors) summary.push(`${totalErrors} MathJax-Fehler`);
else summary.push('kein MathJax-Fehler');
if (totalDenied) summary.push(`${totalDenied} von GitHub blockierte Makros`);
if (totalWarnings && !opts.noWarn) summary.push(`${totalWarnings} GitHub-Quirk-Warnung(en)`);
const hardFail = totalErrors + totalDenied;
console.log(`\n${hardFail === 0 ? 'OK' : 'FAILED'}: ${summary.join(' — ')}.`);
process.exit(hardFail === 0 ? 0 : 1);
