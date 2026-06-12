# tools/

Hilfsskripte rund um den Kurs. Nicht Teil des Kursmaterials.

## docs-check

`Dockerfile` + `docs-check.js` liefern den **Math-Rest-Sensor** der
Kurs-Dokumentation. Die generischen Referenz-Prüfungen (interne
Markdown-Links inkl. Anker, Bild- und Skript-Referenzen) übernimmt
seit der Migration 2026-06-12
[d-check](https://github.com/pt9912/d-check) — digest-gepinntes
Container-Image, Konfiguration in [`../.d-check.yml`](../.d-check.yml);
externe Links optional dort über das Modul `external`.

Geprüft wird (von diesem Tool):

1. **Math-Inhalte** — Inline `$...$`, einzeiliges `$$...$$` und
   ```math-Fences werden mit MathJax 3.2.0 + AllPackages exakt wie auf
   GitHub gerendert; zusätzlich GitHub-spezifische Quirks als Warnung
   (siehe unten).

Die GitHub-Engine MathJax ist offiziell dokumentiert in
<https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/writing-mathematical-expressions>;
das verwendete Bundle ist `mathjax/es5/tex-chtml-full` Version 3.2.0
(Inspektion von `chunk-vendors-node_modules_mathjax_es5_tex-chtml-full_…`).

### Bauen

```bash
docker build -t docs-check tools/
```

### Verwenden

Vom Repo-Root aus, prüft alle `*.md` rekursiv:

```bash
docker run --rm -v "$PWD":/work docs-check
```

Eine einzelne Datei prüfen:

```bash
docker run --rm -v "$PWD":/work docs-check kurs/einheit-5.md
```

Auch OK-Items melden:

```bash
docker run --rm -v "$PWD":/work docs-check --verbose kurs/
```

Warnungen unterdrücken:

```bash
docker run --rm -v "$PWD":/work docs-check --no-warn
```

### Drei Schweregrade

**ERROR** — MathJax bricht beim Rendern ab (oder Datei nicht lesbar).
Exit-Code 1.

**DENIED** — Math-Inhalt nutzt ein Makro, das MathJax kennt, aber GitHub
explizit blockiert (z.B. `\operatorname`). Exit-Code 1.

**WARN** — MathJax akzeptiert den Quelltext, GitHubs Pre-Processor
verändert ihn aber vor dem Rendern. Exit-Code bleibt 0. Bekannte Quirks:

- `commonmark-escape` — Backslash vor ASCII-Interpunktion in `$...$` oder
  einzeiligem `$$...$$`. CommonMark frisst den Backslash (z.B. `\,` → `,`).
  Workaround: LaTeX-Äquivalente wie `\thinspace`, `\lbrace`/`\rbrace` —
  oder den Block in einen ```math-Fence verschieben.

- `github-fence-backslash` — `\\` direkt am Zeilenende in einer
  ```math-Fence. GitHub bläht es zu `\\\` auf (reproduzierbar über die
  `/markdown`-API). Workaround: `\\` so platzieren, dass weiterer Inhalt
  auf derselben Zeile folgt.

- `github-html-roundtrip-lt` — `<` direkt vor einem ASCII-Buchstaben
  (z.B. `k<N`). GitHubs `math-renderer` macht einen
  `document.implementation.createHTMLDocument()`-Roundtrip; der
  HTML-Parser interpretiert `<N` als Start eines `<N>`-Tags und
  verschluckt den Rest der Formel inkl. `\end{cases}`. Workaround:
  Leerzeichen einfügen (`k < N`) oder `\lt` benutzen.

- `github-table-cell-leading-math` — Inline-`$...$` direkt nach einem
  einzelnen Nicht-Whitespace-Zeichen (typisch `"` oder `'`) am Anfang
  einer Tabellenzelle. GitHubs MathJax-Preprocessor erkennt das nicht
  als Math und zeigt `$...$` literal. `$...$` direkt am Zellanfang
  (nur `|` davor) ist dagegen unproblematisch — das ist der übliche
  Glossar-Stil. Workaround: Text oder Whitespace zwischen das Zeichen
  und das öffnende `$` setzen (`"Wegen $x$..."` statt `"$x$..."`).

