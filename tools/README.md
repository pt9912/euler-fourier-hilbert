# tools/

Hilfsskripte rund um den Kurs. Nicht Teil des Kursmaterials.

## MathJax-Validator

`Dockerfile` + `validate-math.js` liefern einen reproduzierbaren Math-Check
für die Markdown-Dateien. Es wird dieselbe Engine verwendet, die GitHub für
das Live-Rendering nutzt (`mathjax-full` aus
<https://github.com/mathjax/MathJax-src>) — laut [GitHubs offizieller
Doku](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/writing-mathematical-expressions):
*„GitHub's math rendering capability uses MathJax."*

Damit muss man nicht jedes Mal pushen und auf GitHub schauen, um zu sehen,
ob Math-Inhalte sauber rendern.

### Bauen

```bash
docker build -t math-check tools/
```

### Verwenden

Vom Repo-Root aus, prüft alle `*.md` rekursiv:

```bash
docker run --rm -v "$PWD":/work math-check
```

Eine einzelne Datei prüfen:

```bash
docker run --rm -v "$PWD":/work math-check kurs/einheit-5.md
```

Auch erfolgreich gerenderte Blöcke melden:

```bash
docker run --rm -v "$PWD":/work math-check --verbose kurs/einheit-5.md
```

### Drei Meldungs-Arten

**ERROR** — MathJax bricht beim Rendern ab. Der Quelltext muss korrigiert
werden, sonst rendert er auch live nicht. Exit-Code 1.

**DENIED** — Quelltext nutzt ein Makro, das MathJax kennt, aber GitHubs
Pipeline explizit blockiert. Die Live-Seite zeigt dann
*„The following macros are not allowed: …"*. Aktuell in der Liste:
`\operatorname`. Exit-Code 1.

**WARN** — MathJax akzeptiert den Quelltext, aber GitHubs Pre-Processor
verändert ihn vor dem Rendering. Exit-Code bleibt 0. Empirisch
beobachtete Quirks:

- `github-fence-backslash`: `\\` direkt am Zeilenende in einem
  ```math-Fence. GitHub bläht das Backslash-Paar zu `\\\` auf
  (reproduzierbar über die `/markdown`-API). Workaround: `\\` so
  platzieren, dass weiterer Inhalt auf derselben Zeile folgt — also
  alle Fälle eines `\begin{cases}…\end{cases}` in einer Zeile innerhalb
  der Fence.

- `github-html-roundtrip-lt`: `<` direkt vor einem ASCII-Buchstaben
  (z.B. `k<N`). GitHubs `math-renderer` macht in
  `tempDocumentContentForSanitization()` einen HTML-Parse-Roundtrip
  über `document.implementation.createHTMLDocument`; der HTML-Parser
  interpretiert `<N` als Start eines `<N>`-Tags und verschluckt allen
  Math-Inhalt bis zum nächsten `>` (z.B. das `\end{cases}` der gleichen
  Formel). MathJax bekommt verstümmelten Input und scheitert. Workaround:
  Leerzeichen einfügen (`k < N`) oder `\lt` benutzen.

- `commonmark-escape`: Backslash vor ASCII-Interpunktion in `$...$`
  oder einzeiligem `$$...$$`. CommonMark frisst den Backslash, bevor
  MathJax den Inhalt sieht. Workaround: in Inline-Math die LaTeX-
  Äquivalente verwenden, also `\thinspace` statt `\,`, `\lbrace`/
  `\rbrace` statt `\{`/`\}`. Für nicht-trivial gespacedte Ausdrücke
  den Block in einen ```math-Fence verschieben, wo `\,`, `\;`, `\:`
  unbeschädigt durchgehen.

### MathJax-Version und -Konfiguration

GitHub lädt MathJax als das vorgebackene Bundle
`mathjax/es5/tex-chtml-full`. Eine Inspektion dieses Bundles ergibt:

- Version `3.2.0`
- Pakete `AllPackages` (alle TeX-Pakete aktiviert)

Der Validator pinnt deshalb `mathjax-full@3.2.0` und konfiguriert
`packages: AllPackages` — damit ist die lokale Engine bit-genau mit
GitHubs Live-Engine identisch.

Zusätzliche Restriktionen, die GitHub außerhalb von MathJax auf eigene
Faust dazu legt (z. B. die `operatorname`-Blockade per
„macros not allowed"-Filter), pflegen wir explizit in
`GITHUB_DENIED_MACROS` in `validate-math.js`.
