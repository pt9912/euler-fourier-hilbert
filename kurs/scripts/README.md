# Skripte zur Visualisierung

Pro Einheit ein eigenständiges Python-Skript, das die in der jeweiligen Markdown-Datei eingebundene Abbildung erzeugt.

## Voraussetzungen

- Python ≥ 3.10
- `numpy`, `matplotlib`, `scipy`

Installation in einem virtuellen Environment, falls noch nicht vorhanden:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install numpy matplotlib scipy
```

## Einzelne Abbildung neu erzeugen

Die Skripte schreiben in `kurs/bilder/`. Pfade sind relativ zum Repository-Wurzelverzeichnis, also vom Repo-Root aus aufrufen:

```bash
python3 kurs/scripts/einheit-3.py
```

## Alle Abbildungen neu erzeugen

```bash
for f in kurs/scripts/einheit-*.py kurs/scripts/projekte/*.py; do python3 "$f"; done
```

## Aufbau

### Kapitel-Visualisierungen

| Skript | Inhalt |
| --- | --- |
| `einheit-1.py` | Einheitskreis und Projektion auf Real-/Imaginärachse |
| `einheit-2.py` | Fourier-Reihe der Rechteckwelle (Gibbs-Phänomen) |
| `einheit-3.py` | Rechteck/Sinc und Gauß/Gauß als Zeit-Frequenz-Dualität |
| `einheit-4.py` | Faltungssatz: Rechteck * Rechteck = Dreieck |
| `einheit-5.py` | Aliasing-Demo und DFT-Spektrum |
| `einheit-6.py` | Hilbert-Transformierte eines Kosinus |
| `einheit-7.py` | Hüllkurve eines AM-Signals via analytisches Signal |
| `einheit-8.py` | Linearer Chirp und Momentanfrequenz |

### Weiterführende Projekte

Diese Skripte gehören zu den Projektideen in der [Kurs-Übersicht](../README.md#weiterführende-projektideen).

| Skript | Inhalt |
| --- | --- |
| `projekte/projekt-1-fft-signale.py` | FFT von Sinus, Rechteck und Gauß — Betrag und Phase |
| `projekte/projekt-4-filter.py`      | Tief-, Hoch- und Bandpass durch Multiplikation im Spektrum |
