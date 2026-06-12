#!/usr/bin/env node
// docs-check — Math-Rest-Sensor fuer das Kurs-Markdown.
//
// Seit der Migration auf d-check (ghcr.io/pt9912/d-check,
// digest-gepinnt, Konfiguration in .d-check.yml) prueft dieses Tool
// NUR noch die Math-Validierung, die ein generischer Referenz-Checker
// nicht leisten kann:
//
//   1. Math-Bloecke (inline $...$, $$...$$ einzeilig, ```math-Fence)
//      werden mit MathJax 3.2.0 + AllPackages exakt wie auf GitHub
//      gerendert. Zusaetzlich: GitHub-spezifische Quirks
//      (commonmark-escape, github-fence-backslash, github-html-roundtrip-lt,
//      github-table-cell-leading-math, github-denied-macro) als Warnung.
//
// Interne Links, Anker, Bild- und Skript-Referenzen prueft d-check;
// externe Links optional dort ueber das Modul `external`.
//
// Aufruf:
//   docs-check                          # alle *.md ab cwd
//   docs-check path/to/file.md ...      # bestimmte Dateien/Pfade
//   docs-check --verbose                # auch OK-Items melden
//   docs-check --no-warn                # MathJax-Quirks unterdruecken

const { mathjax } = require('mathjax-full/js/mathjax.js');
const { TeX } = require('mathjax-full/js/input/tex.js');
const { SVG } = require('mathjax-full/js/output/svg.js');
const { liteAdaptor } = require('mathjax-full/js/adaptors/liteAdaptor.js');
const { RegisterHTMLHandler } = require('mathjax-full/js/handlers/html.js');
const { AllPackages } = require('mathjax-full/js/input/tex/AllPackages.js');
const fs = require('fs');
const path = require('path');

// ============================================================================
// MathJax-Setup (exakt wie GitHubs Live-Bundle)
// ============================================================================
const adaptor = liteAdaptor();
RegisterHTMLHandler(adaptor);
const tex = new TeX({
  packages: AllPackages,
  formatError: (jax, err) => { throw err; },
});
const svg = new SVG({ fontCache: 'none' });
const mjDoc = mathjax.document('', { InputJax: tex, OutputJax: svg });

const GITHUB_DENIED_MACROS = new Set(['operatorname']);

const CM_ESCAPABLE = new Set('!"#$%&\'()*+,-./:;<=>?@[]^_`{|}~');

// ============================================================================
// Markdown-Parsing
// ============================================================================
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

    // Strikt: ` ```math ` muss am Zeilenende stehen oder von Whitespace
    // gefolgt sein — sonst matcht das auf Prosa-Erwaehnungen wie
    // "die ```math-Fence-Syntax" und schluckt halbe Dokumente.
    if (!inFence && /^```math(\s|$)/.test(trimmed)) {
      inFence = true;
      fenceStart = lineNum;
      fenceContent = [];
      fenceIndent = line.substring(0, line.length - trimmed.length);
      continue;
    }
    if (inFence && /^```\s*$/.test(trimmed)) {
      yield { type: 'display', line: fenceStart, source: 'fence', content: fenceContent.join('\n') };
      inFence = false;
      continue;
    }
    if (inFence) {
      let cleaned = line;
      if (fenceIndent && cleaned.startsWith(fenceIndent)) cleaned = cleaned.substring(fenceIndent.length);
      fenceContent.push(cleaned);
      continue;
    }
    // außerhalb von Fences: $$...$$ und $...$ pro Zeile
    let j = 0;
    while (j < line.length) {
      if (line[j] === '$') {
        if (line[j + 1] === '$') {
          const end = line.indexOf('$$', j + 2);
          if (end !== -1) {
            yield { type: 'display', line: lineNum, source: 'dollar-dollar', content: line.substring(j + 2, end) };
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
          yield { type: 'inline', line: lineNum, source: 'dollar', content: line.substring(j + 1, end) };
          j = end + 1;
          continue;
        }
      }
      j++;
    }
  }
}

// ============================================================================
// Math-Checks
// ============================================================================
function* detectQuirks(block) {
  for (const m of block.content.matchAll(/<[a-zA-Z]/g)) {
    const relLine = block.content.substring(0, m.index).split('\n').length - 1;
    yield {
      relLine,
      kind: 'github-html-roundtrip-lt',
      message: `\`<\` direkt vor ASCII-Buchstaben (\`${m[0]}\`) — GitHubs HTML-Roundtrip frisst alles dahinter; mit Leerzeichen \`< ${m[0][1]}\` oder \`\\lt\` umgehen`,
    };
  }
  if (block.source === 'fence') {
    const lines = block.content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].endsWith('\\\\') && i < lines.length - 1) {
        yield {
          relLine: i, kind: 'github-fence-backslash',
          message: '`\\\\` am Zeilenende in ```math-Fence — GitHub blaeht zu `\\\\\\`, MathJax bricht dann live ab',
        };
      }
    }
  } else {
    for (let i = 0; i < block.content.length - 1; i++) {
      if (block.content[i] === '\\' && CM_ESCAPABLE.has(block.content[i + 1])) {
        yield {
          relLine: 0, kind: 'commonmark-escape',
          message: `\`\\${block.content[i + 1]}\` in ${block.type === 'inline' ? '$...$' : '$$...$$'} — CommonMark frisst Backslash, MathJax-Bedeutung geht verloren`,
        };
      }
    }
  }
}

function* detectDenied(block) {
  const re = /\\([a-zA-Z]+)\*?/g;
  let m;
  while ((m = re.exec(block.content)) !== null) {
    if (GITHUB_DENIED_MACROS.has(m[1])) {
      yield {
        relLine: block.content.substring(0, m.index).split('\n').length - 1,
        kind: 'github-denied-macro',
        macro: '\\' + m[1],
        message: `\\${m[1]} ist in MathJax definiert, wird aber von GitHubs Pipeline blockiert ("macros not allowed")`,
      };
    }
  }
}

function checkMath(filePath, text, report) {
  for (const block of findMathBlocks(text)) {
    report.mathTotal++;
    try {
      mjDoc.convert(block.content, { display: block.type === 'display' });
    } catch (e) {
      report.error(filePath, block.line, `math/${block.type}/${block.source}`,
        (e.message || e.toString()).split('\n')[0],
        block.content.length > 120 ? block.content.substring(0, 120) + '...' : block.content);
    }
    for (const d of detectDenied(block)) {
      report.denied(filePath, block.line + d.relLine, `math/${block.type}/${block.source}`, d.kind, d.message);
    }
    for (const q of detectQuirks(block)) {
      report.warn(filePath, block.line + q.relLine, `math/${block.type}/${block.source}`, q.kind, q.message);
    }
  }
  for (const q of findTableMathQuirks(text)) {
    report.warn(filePath, q.line, 'math/table-cell', q.kind, q.message);
  }
}

// Quirk: GitHubs MathJax-Preprocessor erkennt Inline-`$...$` in Tabellenzellen
// nicht, wenn das oeffnende `$` direkt nach einem einzelnen Nicht-Whitespace-
// Zeichen (z. B. einem Anfuehrungszeichen) am Zellanfang steht. `$...$` direkt
// am Zellanfang (nur `|` davor) rendert dagegen fine — das ist der uebliche
// Tabellen-Glossar-Stil.
// Beispiele:
//   | "$e^{i\varphi}$ ist eine Exponentialfunktion." | ... |   BROKEN
//   | "Weil $e^{i\varphi}$ eine Exponentialfunktion..."| ... |   OK
//   | $A(t)$                                          | ... |   OK (Glossar)
function* findTableMathQuirks(content) {
  const lines = content.split('\n');
  let inFence = false;
  // Trennzeile einer Tabelle (`| --- | --- |`) erkennen wir per Pattern
  // und ueberspringen sie; Zellen mit `---` braucht niemand zu pruefen.
  const sepLine = /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNum = i + 1;
    const trimmed = line.trimStart();
    if (/^```/.test(trimmed)) { inFence = !inFence; continue; }
    if (inFence) continue;
    if (!trimmed.startsWith('|')) continue;
    if (sepLine.test(line)) continue;

    // Zellen splitten. `\|` (escaped pipe) zaehlt nicht als Trenner.
    const parts = line.split(/(?<!\\)\|/);
    // parts[0]/parts[parts.length-1] sind links/rechts vom aeussersten `|`
    // und enthalten typischerweise nur Whitespace.
    for (let c = 1; c < parts.length - 1; c++) {
      const cell = parts[c];
      const cellTrimmed = cell.replace(/^\s+/, '');
      if (cellTrimmed.length < 2) continue;

      // Nur ein einziges Pattern flaggen: ein nicht-Whitespace-Zeichen
      // direkt vor einem `$`, gefolgt von Inline-Math (nicht `$$`).
      if (cellTrimmed[1] !== '$') continue;
      if (cellTrimmed[2] === '$' || cellTrimmed[2] === undefined) continue;
      if (/\s/.test(cellTrimmed[0])) continue;

      // Korrespondierendes schliessendes `$` finden (mindestens ein
      // Zeichen Inhalt dazwischen, kein unmittelbarer `$$`-Anschluss).
      const after = cellTrimmed.substring(2);
      if (!/[^\s$][^$]*\$/.test(after)) continue;

      const lead = cellTrimmed[0];
      const snippet = cellTrimmed.length > 60 ? cellTrimmed.substring(0, 60) + '…' : cellTrimmed;
      yield {
        line: lineNum,
        kind: 'github-table-cell-leading-math',
        message: `Inline-Math \`$...$\` direkt nach \`${lead}\` am Zellanfang rendert auf GitHub nicht; Whitespace oder weiteres Zeichen zwischen \`${lead}\` und \`$\` setzen — Zelle: \`${snippet}\``,
      };
    }
  }
}

// ============================================================================
// Report
// ============================================================================
function newReport(opts) {
  const items = [];
  return {
    mathTotal: 0,
    error(file, line, kind, msg, content) {
      items.push({ severity: 'ERROR', file, line, kind, msg, content });
    },
    denied(file, line, kind, subkind, msg) {
      items.push({ severity: 'DENIED', file, line, kind, msg: `[${subkind}] ${msg}` });
    },
    warn(file, line, kind, subkind, msg) {
      if (opts.noWarn) return;
      items.push({ severity: 'WARN', file, line, kind, msg: `[${subkind}] ${msg}` });
    },
    items,
    summary() {
      return {
        errors: items.filter((i) => i.severity === 'ERROR').length,
        denied: items.filter((i) => i.severity === 'DENIED').length,
        warnings: items.filter((i) => i.severity === 'WARN').length,
      };
    },
  };
}

function printItem(item) {
  console.log(`${item.file}:${item.line} (${item.kind}) ${item.severity}`);
  console.log(`  ${item.msg}`);
  if (item.content) console.log(`  content: ${item.content}`);
}

// ============================================================================
// File-Walking + main
// ============================================================================
function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith('.md')) out.push(full);
  }
  return out;
}

(function main() {
  const args = process.argv.slice(2);
  const opts = {
    verbose: args.includes('--verbose') || args.includes('-v'),
    noWarn: args.includes('--no-warn'),
  };
  const positional = args.filter((a) => !a.startsWith('-'));
  let targets;
  if (positional.length === 0) targets = walk('.');
  else {
    targets = [];
    for (const f of positional) {
      const stat = fs.statSync(f);
      if (stat.isDirectory()) walk(f, targets);
      else targets.push(f);
    }
  }
  targets = targets.map((t) => path.resolve(t));

  const report = newReport(opts);

  for (const f of targets) {
    let text;
    try { text = fs.readFileSync(f, 'utf8'); } catch (e) {
      report.error(f, 0, 'io', `Datei kann nicht gelesen werden: ${e.code}`);
      continue;
    }
    checkMath(f, text, report);
  }

  // Ausgabe
  for (const item of report.items) printItem(item);
  const s = report.summary();
  const parts = [`${targets.length} Datei(en)`];
  parts.push(`${report.mathTotal} Math-Bloecke`);
  if (s.errors) parts.push(`${s.errors} ERROR`);
  else parts.push('keine Fehler');
  if (s.denied) parts.push(`${s.denied} DENIED`);
  if (s.warnings && !opts.noWarn) parts.push(`${s.warnings} WARN`);
  const hardFail = s.errors + s.denied;
  console.log(`\n${hardFail === 0 ? 'OK' : 'FAILED'}: ${parts.join(' — ')}.`);
  process.exit(hardFail === 0 ? 0 : 1);
})();
