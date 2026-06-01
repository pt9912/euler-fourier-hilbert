#!/usr/bin/env node
// docs-check — vollstaendiger Health-Check fuer das Kurs-Markdown.
//
// Prueft pro Markdown-Datei:
//
//   1. Math-Bloecke (inline $...$, $$...$$ einzeilig, ```math-Fence)
//      werden mit MathJax 3.2.0 + AllPackages exakt wie auf GitHub
//      gerendert. Zusaetzlich: GitHub-spezifische Quirks
//      (commonmark-escape, github-fence-backslash, github-html-roundtrip-lt,
//      github-denied-macro) als Warnung.
//
//   2. Interne Markdown-Links [text](pfad.md#anker): Datei vorhanden?
//      Wenn Anker angegeben: gibt es eine passende Heading-Anker-ID?
//
//   3. Bild-Referenzen ![alt](pfad.png|jpg|gif|svg): Datei vorhanden?
//
//   4. Skript-Referenzen [text](*.py|*.js|*.ipynb): Datei vorhanden?
//
//   5. Externe Links (http://, https://) optional per HTTP HEAD pruefen
//      (default off, mit `--external` einschalten — kann langsam werden).
//
// Aufruf:
//   docs-check                          # alle *.md ab cwd
//   docs-check path/to/file.md ...      # bestimmte Dateien/Pfade
//   docs-check --verbose                # auch OK-Items melden
//   docs-check --no-warn                # MathJax-Quirks unterdruecken
//   docs-check --external               # HTTP-Links zusaetzlich pruefen
//   docs-check --no-math                # Math-Validierung ueberspringen

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
// Slug-Generierung im GitHub-Stil (fuer Anker-Aufloesung)
// ============================================================================
// Empirisch verifiziert gegen Anker im GitHub-Payload:
//   "5.3 Interpretation der Frequenzindizes" -> "53-interpretation-der-frequenzindizes"
//   "Übungen zu Einheit 5"                   -> "übungen-zu-einheit-5"
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s_-]+/gu, '')  // nur Letters/Digits/Whitespace/-/_
    .trim()
    .replace(/\s+/g, '-')                  // Spaces -> Hyphen
    .replace(/-+/g, '-');                  // mehrfache Hyphen kollabieren
}

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

// Liefert alle Links der Form [text](url) und ![alt](src). Ueberspringt
// Code-Fences (jeder Art) und Inline-Code (`...`), damit Beispiele dort nicht
// als "Links" interpretiert werden.
function* findLinks(content) {
  const lines = content.split('\n');
  let inFence = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNum = i + 1;
    const trimmed = line.trimStart();
    // In Code-Fences keine Links suchen. Wir akzeptieren hier ANY Fence
    // (mit oder ohne Sprach-Tag), aber strikt am Zeilenanfang.
    if (/^```/.test(trimmed)) { inFence = !inFence; continue; }
    if (inFence) continue;

    // Inline-Code aus der Zeile maskieren, damit Backtick-Inhalt nicht matcht.
    let stripped = line.replace(/`[^`]*`/g, (m) => ' '.repeat(m.length));

    // Match ![alt](src) und [text](url). Klammer-Inhalte mit Leerzeichen
    // erlauben wir nicht (Standard-Markdown). Nicht-greedy fuer text/alt.
    const re = /(!?)\[([^\]\n]*?)\]\(([^)\s][^)\n]*)\)/g;
    let m;
    while ((m = re.exec(stripped)) !== null) {
      const isImage = m[1] === '!';
      yield { isImage, text: m[2], target: m[3], line: lineNum };
    }
  }
}

function* findHeadings(content) {
  const lines = content.split('\n');
  let inFence = false;
  const seen = new Map();
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trimStart();
    if (/^```/.test(trimmed)) { inFence = !inFence; continue; }
    if (inFence) continue;
    const m = /^(#{1,6})\s+(.+?)\s*$/.exec(trimmed);
    if (m) {
      const baseSlug = slugify(m[2]);
      // GitHub haengt bei doppelten Anker -1, -2, ... an
      const count = seen.get(baseSlug) || 0;
      seen.set(baseSlug, count + 1);
      const slug = count === 0 ? baseSlug : `${baseSlug}-${count}`;
      yield { level: m[1].length, text: m[2], slug, line: i + 1 };
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
}

// ============================================================================
// Link-/Anker-Checks
// ============================================================================
function classifyTarget(target) {
  const cleaned = target.split(/[)#?]/)[0];   // Anker/Query abtrennen
  const anchor = target.includes('#') ? target.substring(target.indexOf('#') + 1) : null;
  if (/^https?:\/\//i.test(target)) return { kind: 'external', url: target };
  if (/^mailto:/i.test(target)) return { kind: 'mailto' };
  if (target.startsWith('#')) return { kind: 'anchor-only', anchor: target.substring(1) };
  const ext = path.extname(cleaned).toLowerCase();
  const file = cleaned;
  if (['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'].includes(ext)) return { kind: 'image', file };
  if (['.py', '.js', '.ts', '.ipynb', '.json', '.yaml', '.yml', '.toml', '.sh'].includes(ext)) return { kind: 'script', file };
  if (ext === '.md') return { kind: 'markdown', file, anchor };
  if (ext === '') return { kind: 'markdown', file: file, anchor }; // README ohne Endung etc.
  return { kind: 'other', file };
}

function checkLinks(filePath, text, headingIndex, report, opts) {
  const fileDir = path.dirname(filePath);
  for (const link of findLinks(text)) {
    report.linkTotal++;
    const cls = classifyTarget(link.target);
    if (cls.kind === 'external') {
      if (opts.external) {
        // Externe Links pruefen wir spaeter gesammelt; hier nur sammeln
        report.externalLinks.push({ filePath, line: link.line, url: cls.url });
      }
      continue;
    }
    if (cls.kind === 'mailto') continue;
    if (cls.kind === 'anchor-only') {
      const slugs = headingIndex.get(filePath) || new Set();
      if (!slugs.has(cls.anchor)) {
        report.error(filePath, link.line, 'link', `Anker \`#${cls.anchor}\` existiert nicht in dieser Datei`,
          `[${link.text}](${link.target})`);
      }
      continue;
    }
    // image / script / markdown / other → Datei pruefen
    const resolved = path.resolve(fileDir, cls.file);
    if (!fs.existsSync(resolved)) {
      report.error(filePath, link.line, `link/${cls.kind}`, `Datei nicht gefunden: ${cls.file}`,
        `[${link.text}](${link.target})`);
      continue;
    }
    // Bei .md zusaetzlich Anker pruefen
    if (cls.kind === 'markdown' && cls.anchor) {
      const slugs = headingIndex.get(resolved) || new Set();
      if (slugs.size === 0) {
        // Datei noch nicht indexiert (z.B. ausserhalb des Scopes). Best-effort:
        // Anker-Pruefung nur, wenn wir die Datei kennen.
        report.warn(filePath, link.line, 'link/markdown', 'anchor-not-indexed',
          `Anker \`#${cls.anchor}\` in ${cls.file} nicht pruefbar (Datei nicht im Scope)`);
      } else if (!slugs.has(cls.anchor)) {
        report.error(filePath, link.line, 'link/markdown', `Anker \`#${cls.anchor}\` nicht in ${cls.file}`,
          `[${link.text}](${link.target})`);
      }
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
    linkTotal: 0,
    externalLinks: [],
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
// Externe Links via HTTP HEAD
// ============================================================================
async function checkExternal(links, report) {
  // node:https aus dem stdlib reicht
  const { request } = require('node:https');
  const { request: httpRequest } = require('node:http');
  const { URL } = require('node:url');
  for (const { filePath, line, url } of links) {
    try {
      const u = new URL(url);
      const lib = u.protocol === 'https:' ? request : httpRequest;
      const status = await new Promise((resolve, reject) => {
        const req = lib({
          method: 'HEAD', host: u.hostname, port: u.port || undefined,
          path: u.pathname + u.search, timeout: 10000,
          headers: { 'User-Agent': 'docs-check/1.0' },
        }, (res) => resolve(res.statusCode));
        req.on('error', reject);
        req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
        req.end();
      });
      if (status >= 400) {
        report.error(filePath, line, 'link/external', `HTTP ${status}`, url);
      }
    } catch (e) {
      report.error(filePath, line, 'link/external', `Fehler beim Abruf: ${e.message}`, url);
    }
  }
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

(async function main() {
  const args = process.argv.slice(2);
  const opts = {
    verbose: args.includes('--verbose') || args.includes('-v'),
    noWarn: args.includes('--no-warn'),
    external: args.includes('--external'),
    noMath: args.includes('--no-math'),
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

  // Phase 1: Heading-Index aufbauen
  const headingIndex = new Map();
  const fileTexts = new Map();
  for (const f of targets) {
    let text;
    try { text = fs.readFileSync(f, 'utf8'); } catch (e) {
      report.error(f, 0, 'io', `Datei kann nicht gelesen werden: ${e.code}`);
      continue;
    }
    fileTexts.set(f, text);
    const slugs = new Set();
    for (const h of findHeadings(text)) slugs.add(h.slug);
    headingIndex.set(f, slugs);
  }

  // Phase 2: pro Datei Math + Links pruefen
  for (const f of targets) {
    const text = fileTexts.get(f);
    if (!text) continue;
    if (!opts.noMath) checkMath(f, text, report);
    checkLinks(f, text, headingIndex, report, opts);
  }

  // Phase 3: externe Links (sequenziell, eher konservativ)
  if (opts.external && report.externalLinks.length) {
    console.log(`Pruefe ${report.externalLinks.length} externe Links per HTTP HEAD…`);
    await checkExternal(report.externalLinks, report);
  }

  // Ausgabe
  for (const item of report.items) printItem(item);
  const s = report.summary();
  const parts = [`${targets.length} Datei(en)`];
  parts.push(`${report.mathTotal} Math-Bloecke`);
  parts.push(`${report.linkTotal} Links`);
  if (s.errors) parts.push(`${s.errors} ERROR`);
  else parts.push('keine Fehler');
  if (s.denied) parts.push(`${s.denied} DENIED`);
  if (s.warnings && !opts.noWarn) parts.push(`${s.warnings} WARN`);
  const hardFail = s.errors + s.denied;
  console.log(`\n${hardFail === 0 ? 'OK' : 'FAILED'}: ${parts.join(' — ')}.`);
  process.exit(hardFail === 0 ? 0 : 1);
})().catch((e) => {
  console.error('docs-check ist abgestuerzt:', e.stack || e.message);
  process.exit(2);
});
