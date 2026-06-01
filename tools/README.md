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

### Was wird nicht abgedeckt

- GitHubs Pre-Prozessor-Bugs: GitHub fügt z.B. im ```math-Fence einen
  zusätzlichen Backslash hinzu, wenn `\\` am Zeilenende steht. Der
  Validator sieht den Inhalt so, wie er in der Datei steht — er merkt
  also nicht, wenn GitHub den Inhalt vor KaTeX noch verändert. Aus dem
  Grund haben wir solche Stellen empirisch ermittelt und das Kursmaterial
  so umformuliert, dass keine `\\` am Zeilenende mehr vorkommen.
- CommonMark-Escape-Verarbeitung: in `$...$` oder einzeiligem `$$...$$`
  konsumiert CommonMark Backslashes vor ASCII-Interpunktion. Der
  Validator simuliert das nicht; er rendert den Quelltext direkt mit
  KaTeX. Wir verwenden im Kursmaterial daher die KaTeX-Aequivalente
  `\thinspace`, `\lbrace`, `\rbrace` statt `\,`, `\{`, `\}` außerhalb von
  Fences.
