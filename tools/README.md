# tools/

Hilfsskripte rund um den Kurs. Nicht Teil des Kursmaterials.

## KaTeX-Validator

`Dockerfile` + `validate-math.js` liefern einen reproduzierbaren KaTeX-Check
für die Markdown-Dateien. KaTeX wird offline im Container ausgeführt; man
muss also nicht jedes Mal Pushen und auf GitHub schauen, um zu sehen, ob
Math-Inhalte sauber rendern.

### Bauen

```bash
docker build -t katex-check tools/
```

### Verwenden

Vom Repo-Root aus, prüft alle `*.md` rekursiv:

```bash
docker run --rm -v "$PWD":/work katex-check
```

Eine einzelne Datei prüfen:

```bash
docker run --rm -v "$PWD":/work katex-check kurs/einheit-5.md
```

Auch erfolgreich gerenderte Blöcke melden:

```bash
docker run --rm -v "$PWD":/work katex-check --verbose kurs/einheit-5.md
```

### Ausgabe

Fehlerhafte Math-Blöcke werden mit Dateipfad, Zeilennummer, Art (`inline`
oder `display`) und der KaTeX-Fehlermeldung gemeldet. Exit-Code 0 = alles
sauber, sonst Anzahl der Fehler.

### Was wird abgedeckt

- Inline-Math: `$...$`
- Display-Math einzeilig: `$$...$$`
- Display-Math als Code-Fence: ` ```math ... ``` `

### Was geprüft wird

**ERROR** — KaTeX bricht beim Rendern ab. Der Quelltext muss korrigiert
werden, sonst rendert er auch lokal nicht.

**WARN** — KaTeX akzeptiert den Quelltext, aber GitHubs proprietäre
Render-Pipeline verändert ihn auf bekannte Weise, sodass das Live-
Rendering trotzdem kaputt wäre. Empirisch beobachtete Quirks:

- `github-fence-backslash`: `\\` direkt am Zeilenende in einem
  ```math-Fence. GitHub bläht das Backslash-Paar zu `\\\` auf
  (reproduzierbar über die `/markdown`-API). Workaround: `\\` so
  platzieren, dass weiterer Inhalt auf derselben Zeile folgt — also
  `\begin{cases}` & `\\`-Trennzeichen `& Folgecase \end{cases}` alles
  in einer Zeile innerhalb der Fence.

- `commonmark-escape`: Backslash vor ASCII-Interpunktion in `$...$`
  oder einzeiligem `$$...$$`. CommonMark frisst den Backslash, bevor
  KaTeX den Inhalt sieht. Workaround: in Inline-Math die LaTeX-
  Äquivalente verwenden, also `\thinspace` statt `\,`, `\lbrace`/
  `\rbrace` statt `\{`/`\}`, oder die Backtick-geschützte Form
  `` $`...`$ ``.
