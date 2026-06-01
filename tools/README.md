# tools/

Hilfsskripte rund um den Kurs. Nicht Teil des Kursmaterials.

## docs-check

`Dockerfile` + `docs-check.js` liefern einen reproduzierbaren Health-Check
für die Kurs-Dokumentation. Geprüft wird:

1. **Math-Inhalte** — Inline `$...$`, einzeiliges `$$...$$` und
   ```math-Fences werden mit MathJax 3.2.0 + AllPackages exakt wie auf
   GitHub gerendert; zusätzlich GitHub-spezifische Quirks als Warnung
   (siehe unten).
2. **Interne Markdown-Links** `[text](pfad.md#anker)` — Datei vorhanden?
   Bei Anker: gibt es die zugehörige Heading-ID?
3. **Bild-Referenzen** `![alt](pfad.png|jpg|gif|svg)` — Datei vorhanden?
4. **Skript-Referenzen** `[text](*.py|*.js|*.ipynb)` — Datei vorhanden?
5. **Externe Links** (`http://`, `https://`) — optional per HTTP HEAD
   geprüft, schaltet sich mit `--external` ein.

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

Externe Links zusätzlich per HTTP HEAD prüfen (langsam):

```bash
docker run --rm -v "$PWD":/work docs-check --external
```

Math-Validierung überspringen (z.B. nur Links interessieren):

```bash
docker run --rm -v "$PWD":/work docs-check --no-math
```

Warnungen unterdrücken:

```bash
docker run --rm -v "$PWD":/work docs-check --no-warn
```

### Drei Schweregrade

**ERROR** — fehlende Datei, toter Anker, MathJax bricht beim Rendern ab.
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

- `anchor-not-indexed` — Markdown-Link zeigt auf eine `.md` außerhalb
  des aktuellen Scopes; der Validator kann den Anker nicht prüfen.
  Beim nächsten Lauf mit größerem Scope verschwindet die Warnung.
