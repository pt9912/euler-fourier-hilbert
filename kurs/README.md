# Kurs: Euler-Formel, Fourier- und Hilbert-Transformation

Dies ist der inhaltliche Teil des Kurses. Ein Überblick über Zielgruppe und Lernziele steht in der [Projekt-README](../README.md).

## Einheiten

| Einheit | Thema | Kernidee |
| --- | --- | --- |
| [1](einheit-1.md) | Komplexe Zahlen und Euler-Formel | Rotation und Schwingung sind dieselbe Struktur |
| [2](einheit-2.md) | Fourier-Reihen | Periodische Signale als Summe komplexer Schwingungen |
| [3](einheit-3.md) | Fourier-Transformation | Nichtperiodische Signale als kontinuierliches Frequenzspektrum |
| [4](einheit-4.md) | Eigenschaften der Fourier-Transformation | Verschieben, Skalieren, Falten, Ableiten |
| [5](einheit-5.md) | Diskrete Signale, DFT und FFT | Abtastung und Nyquist-Grenze |
| [6](einheit-6.md) | Hilbert-Transformation | Frequenzabhängige Phasenverschiebung um 90 Grad |
| [7](einheit-7.md) | Analytisches Signal | Amplitude, Phase und Momentanfrequenz |
| [8](einheit-8.md) | Gemeinsames Bild | Verknüpfung aller drei Themen mit Abschlussaufgaben |

Die Lösungen zu allen Übungen und Abschlussaufgaben stehen separat in [`loesungen/`](loesungen/README.md).

## Empfohlene Reihenfolge beim Lernen

1. Euler-Formel sicher verstehen.
2. Komplexe Exponentialfunktionen als Schwingungen interpretieren.
3. Fourier-Reihen für periodische Signale üben.
4. Fourier-Transformation als Grenzfall für nichtperiodische Signale verstehen.
5. Eigenschaften der Fourier-Transformation anwenden.
6. Hilbert-Transformation zuerst im Frequenzbereich verstehen.
7. Analytisches Signal für Hüllkurve, Phase und Momentanfrequenz nutzen.

## Weiterführende Projektideen

1. **Python-Notebook zur Fourier-Transformation**
   Erzeuge Sinus-, Rechteck- und Gaußsignale und visualisiere Betrag und Phase ihrer FFT.

2. **Hilbert-Hüllkurve eines AM-Signals**
   Simuliere \(x(t)=(1+0.5\cos(2\pi f_mt))\cos(2\pi f_ct)\) und extrahiere die Hüllkurve mit der Hilbert-Transformation.

3. **Phasenanalyse**
   Berechne die entfaltete Phase eines Chirp-Signals und daraus die Momentanfrequenz.

4. **Filter im Frequenzbereich**
   Implementiere Tiefpass, Hochpass und Bandpass über Multiplikation im Spektrum.
