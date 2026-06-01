#!/usr/bin/env node
// KaTeX-Validator fuer Markdown-Dateien.
//
// Extrahiert Math-Inhalte (inline $...$, display $$...$$ einzeilig, sowie
// ```math-Fence-Bloecke) und versucht jedes Stueck mit KaTeX zu rendern.
// Bricht KaTeX ab, wird die Fehlermeldung mit Dateipfad und Zeilennummer
// gemeldet.
//
// GitHubs KaTeX-Konfiguration ist in der oeffentlichen Doku nicht
// vollstaendig dokumentiert. Wir konfigurieren KaTeX hier konservativ
// (strict throw, kein trust) — das deckt erfahrungsgemaess die Faelle ab,
// die auch GitHub live zurueckweist.
//
// Aufruf:
//   node validate-math.js                          # alle *.md ab cwd
//   node validate-math.js path/to/file.md ...      # bestimmte Dateien
//   node validate-math.js --verbose                # auch OK-Bloecke melden

const katex = require('katex');
const fs = require('fs');
const path = require('path');

const KATEX_OPTIONS = {
  throwOnError: true,
  strict: 'error',
  trust: false,
  output: 'html',
};

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

    // Außerhalb von Fences: $$...$$ einzeilig und $...$ inline finden.
    // Wir suchen non-greedy nach paaren.
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
        // Single dollar inline. Match bis zum naechsten $, das nicht von einem
        // weiteren $ gefolgt ist (Heuristik gut genug fuer unsere Inhalte).
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

// CommonMark consumiert Backslash vor jeder ASCII-Interpunktion. Außerhalb
// von Code-Fences (also in $...$ und $$...$$-Inhalten) verschwindet damit
// z.B. \, → , oder \{ → {, bevor KaTeX den Inhalt sieht.
const CM_ESCAPABLE = new Set('!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~');
function simulateCommonMarkEscapes(s) {
  let out = '';
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '\\' && i + 1 < s.length && CM_ESCAPABLE.has(s[i + 1])) {
      out += s[i + 1];
      i++;
    } else {
      out += s[i];
    }
  }
  return out;
}

// GitHubs ```math-Pre-Processor blaeht `\\` am Zeilenende zu `\\\` auf
// (reproduziert über die /markdown-API). Der Effekt ist visuell harmlos im
// HTML-Output, aber KaTeX sieht dann `\\\` und bricht ab.
function simulateGithubFenceBackslashQuirk(s) {
  // `\\` am Zeilenende → `\\\` (drei Backslashes)
  return s.replace(/\\\\(\r?\n)/g, '\\\\\\$1');
}

function quirkPreprocess(block) {
  if (block.source === 'fence') {
    return simulateGithubFenceBackslashQuirk(block.content);
  }
  // Inline und einzeiliges $$ gehen durch CommonMark
  return simulateCommonMarkEscapes(block.content);
}

function validate(filePath, verbose = false) {
  let text;
  try {
    text = fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    console.error(`${filePath}: cannot read (${e.code})`);
    return 1;
  }
  let errors = 0;
  let total = 0;
  for (const block of findMathBlocks(text)) {
    total++;
    const processed = quirkPreprocess(block);
    try {
      katex.renderToString(processed, {
        ...KATEX_OPTIONS,
        displayMode: block.type === 'display',
      });
      if (verbose) {
        console.log(`${filePath}:${block.line} (${block.type}/${block.source}) OK`);
      }
    } catch (e) {
      errors++;
      console.log(`${filePath}:${block.line} (${block.type}/${block.source}) FAIL`);
      console.log(`  ${e.message.split('\n')[0]}`);
      if (processed !== block.content) {
        console.log(`  (Inhalt wurde durch GitHub-Quirk-Simulation veraendert)`);
      }
      console.log(`  content: ${block.content.length > 120 ? block.content.substring(0, 120) + '...' : block.content}`);
    }
  }
  if (verbose || errors > 0) {
    console.log(`${filePath}: ${total - errors}/${total} OK${errors ? `, ${errors} FAIL` : ''}`);
  }
  return errors;
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
const verbose = args.includes('--verbose') || args.includes('-v');
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

let total = 0;
for (const f of targets) {
  total += validate(f, verbose);
}
if (total === 0) {
  console.log(`\nOK: ${targets.length} Datei(en) — kein KaTeX-Fehler.`);
  process.exit(0);
} else {
  console.log(`\nFAILED: ${total} KaTeX-Fehler insgesamt.`);
  process.exit(1);
}
