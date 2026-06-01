#!/usr/bin/env node
// KaTeX-Validator fuer Markdown-Dateien.
//
// Extrahiert Math-Inhalte (inline $...$, display $$...$$ einzeilig, sowie
// ```math-Fence-Bloecke) und versucht jedes Stueck mit KaTeX zu rendern.
// Bricht KaTeX ab, wird die Fehlermeldung mit Dateipfad und Zeilennummer
// gemeldet.
//
// Zusaetzlich gemeldet werden Quirks von GitHubs Render-Pipeline, die
// KaTeX-validen Inhalt trotzdem live brechen koennen:
//
// - In ```math-Fences: `\\` am Zeilenende. GitHubs Pre-Processor blaeht
//   es zu `\\\` auf (reproduzierbar ueber die /markdown-API). KaTeX-
//   lokal sieht das nicht, das Rendering auf github.com fliegt aber.
//
// - In $...$ und einzeiligem $$...$$: Backslash vor ASCII-Interpunktion
//   aus dem CommonMark-Escape-Set. CommonMark frisst den Backslash, bevor
//   KaTeX den Inhalt sieht: \, → ,  \{ → {  usw. KaTeX-validen Quelltext
//   rendert GitHub dann mit falscher Bedeutung.
//
// Aufruf:
//   node validate-math.js                          # alle *.md ab cwd
//   node validate-math.js path/to/file.md ...      # bestimmte Dateien/Pfade
//   node validate-math.js --verbose                # auch OK-Bloecke melden
//   node validate-math.js --no-warn                # Warnungen unterdruecken

const katex = require('katex');
const fs = require('fs');
const path = require('path');

const KATEX_OPTIONS = {
  throwOnError: true,
  strict: 'error',
  trust: false,
  output: 'html',
};

// CommonMark escape set: Backslash vor diesen Zeichen verliert in
// $...$ und einzeiligem $$...$$ den Backslash.
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

function* detectQuirks(block) {
  if (block.source === 'fence') {
    // \\ am Zeilenende → GitHub blaeht zu \\\
    const lines = block.content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      // \\ direkt am Ende (auch mit trailing whitespace? Eher nein.)
      if (lines[i].endsWith('\\\\') && i < lines.length - 1) {
        yield {
          relLine: i,
          kind: 'github-fence-backslash',
          message: '`\\\\` am Zeilenende in ```math-Fence — GitHub blaeht zu `\\\\\\`, KaTeX scheitert dann live',
        };
      }
    }
  } else {
    // \X mit X aus CommonMark-Escape-Set in $...$ / $$...$$ einzeilig
    for (let i = 0; i < block.content.length - 1; i++) {
      if (block.content[i] === '\\' && CM_ESCAPABLE.has(block.content[i + 1])) {
        yield {
          relLine: 0,
          col: i,
          kind: 'commonmark-escape',
          message: `\`\\${block.content[i + 1]}\` in ${block.type === 'inline' ? '$...$' : '$$...$$'} — CommonMark frisst Backslash, KaTeX-Bedeutung geht verloren`,
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
    return { errors: 1, warnings: 0 };
  }
  let errors = 0;
  let warnings = 0;
  let total = 0;
  for (const block of findMathBlocks(text)) {
    total++;
    // 1. KaTeX-Render (harte Fehler)
    try {
      katex.renderToString(block.content, {
        ...KATEX_OPTIONS,
        displayMode: block.type === 'display',
      });
      if (opts.verbose) {
        console.log(`${filePath}:${block.line} (${block.type}/${block.source}) OK`);
      }
    } catch (e) {
      errors++;
      console.log(`${filePath}:${block.line} (${block.type}/${block.source}) ERROR`);
      console.log(`  ${e.message.split('\n')[0]}`);
      console.log(`  content: ${block.content.length > 120 ? block.content.substring(0, 120) + '...' : block.content}`);
    }
    // 2. Quirk-Warnungen (auch wenn KaTeX OK)
    if (!opts.noWarn) {
      for (const q of detectQuirks(block)) {
        warnings++;
        const lineNum = block.line + q.relLine;
        console.log(`${filePath}:${lineNum} (${block.type}/${block.source}) WARN [${q.kind}]`);
        console.log(`  ${q.message}`);
      }
    }
  }
  if (opts.verbose || errors > 0 || warnings > 0) {
    const parts = [`${total - errors}/${total} OK`];
    if (errors) parts.push(`${errors} ERROR`);
    if (warnings) parts.push(`${warnings} WARN`);
    console.log(`${filePath}: ${parts.join(', ')}`);
  }
  return { errors, warnings };
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
let totalWarnings = 0;
for (const f of targets) {
  const r = validate(f, opts);
  totalErrors += r.errors;
  totalWarnings += r.warnings;
}
const summary = [`${targets.length} Datei(en)`];
if (totalErrors) summary.push(`${totalErrors} KaTeX-Fehler`);
else summary.push('kein KaTeX-Fehler');
if (totalWarnings && !opts.noWarn) summary.push(`${totalWarnings} GitHub-Quirk-Warnung(en)`);
console.log(`\n${totalErrors === 0 ? 'OK' : 'FAILED'}: ${summary.join(' — ')}.`);
process.exit(totalErrors === 0 ? 0 : 1);
