# Lösungen zu Einheit 5: Diskrete Signale, DFT und FFT

Aufgabenstellung: [Einheit 5 — Übungen](../einheit-5.md#übungen-zu-einheit-5)

## Lösung 1

Die DFT ist die mathematische Transformation

$$X[k]=\sum_{n=0}^{N-1}x[n]e^{-i2\pi kn/N}.$$

Die FFT ist ein schneller Algorithmus, der dieselben $X[k]$ berechnet, aber statt ungefähr $N^2$ nur ungefähr $N\log_2N$ Operationen benötigt.

Was du daraus mitnehmen solltest: Wenn sich ein Spektrum zwischen DFT und FFT unterscheidet, liegt der Fehler nicht an der Mathematik der Transformation, sondern an Implementierung, Normierung oder Interpretation der Frequenzachse.

## Lösung 2

Die Nyquist-Frequenz ist

$$f_N=\frac{f_s}{2}=\frac{1000\thinspace \text{Hz}}{2}=500\thinspace \text{Hz}.$$

Ohne Aliasing eindeutig sind Frequenzen mit $|f|<500\thinspace \text{Hz}$. Der exakte Rand $500\thinspace \text{Hz}$ ist ein Sonderfall und wird praktisch nicht als frei nutzbarer Frequenzbereich behandelt.

## Lösung 3

Aliasing ist problematisch, weil verschiedene kontinuierliche Frequenzen nach der Abtastung dieselbe diskrete Folge erzeugen können. Eine Frequenz oberhalb der Nyquist-Grenze erscheint dann als falsche niedrigere Frequenz und kann aus den Samples nicht mehr eindeutig rekonstruiert werden.

## Lösung 4

Für $k=0$ ist der Exponentialfaktor gleich $1$:

$$X[0]=\sum_{n=0}^{N-1}x[n].$$

$X[0]$ ist also die Summe aller Samples. Der Mittelwert ist

$$\frac{X[0]}{N}.$$

Bis auf diese Normierung entspricht $X[0]$ dem Gleichanteil.

## Lösung 5

Die DFT interpretiert Frequenzen im signierten Nyquist-Band

$$-\frac{f_s}{2}\le f < \frac{f_s}{2},$$

hier also $[-5,5)\thinspace \text{Hz}$. Die Frequenz $7\thinspace \text{Hz}$ wird um $f_s=10\thinspace \text{Hz}$ zurückgefaltet:

$$7\thinspace \text{Hz}-10\thinspace \text{Hz}=-3\thinspace \text{Hz}.$$

Für einen Kosinus ist $-3\thinspace \text{Hz}$ im Betrag nicht von $+3\thinspace \text{Hz}$ zu unterscheiden, weil $\cos(-2\pi 3t)=\cos(2\pi 3t)$. Die scheinbare Frequenz ist also $3\thinspace \text{Hz}$; im signierten Spektrum erscheint die Linie als Paar bei $\pm3\thinspace \text{Hz}$.

Was du daraus mitnehmen solltest: Aliasing ist keine Unschärfe der DFT, sondern eine eindeutige Faltung modulo Abtastrate.

## Lösung 6

Die Bin-Breite ist

$$\Delta f=\frac{f_s}{N}=\frac{1000\thinspace \text{Hz}}{250}=4\thinspace \text{Hz}.$$

Die DFT-Bins liegen also bei $0,4,8,\ldots$ Hz (und entsprechend bei negativen Frequenzen). Ein $77\thinspace \text{Hz}$-Sinus fällt nicht exakt auf einen Bin, weil $77/4=19{,}25$ nicht ganzzahlig ist. Die Abtastung ist für diese Frequenz nicht kohärent; im Betragsspektrum ist Spektralleckage zu erwarten.

## Lösung 7

Zero Padding fügt keine zusätzlichen Messdaten hinzu. Es wertet die Fourier-Information nur auf einem feineren gezeichneten Frequenzraster aus, ähnlich einer Interpolation des Spektrums. Die echte Auflösung bleibt durch die Messdauer

$$T_{\text{mess}}=\frac{N}{f_s}$$

bestimmt. Um zwei nahe Frequenzen besser zu trennen, braucht man im Kern eine längere Messdauer oder ein passenderes Messmodell, nicht nur angehängte Nullen.

## Lösung 8

Ein endliches Messfenster wird von der DFT periodisch fortgesetzt. Wenn Anfang und Ende nicht zusammenpassen, entsteht in dieser Fortsetzung ein Sprung, und Sprünge erzeugen breite Spektralanteile. Ein Fenster dämpft die Ränder, macht die periodische Fortsetzung glatter und reduziert deshalb Nebenkeulen.

Der Preis ist, dass das Hauptmaximum breiter wird und Amplituden korrigiert werden müssen. Fensterung ist also ein kontrollierter Kompromiss: weniger Leckage-Nebenkeulen, aber keine zusätzliche Information.

## Lösung 9

Mit $\Delta f=f_s/N=1000/250=4\thinspace\text{Hz}$ ist $77/4=19{,}25$ — der $77\thinspace\text{Hz}$-Sinus fällt **nicht** auf einen DFT-Bin, das Signal ist also nicht kohärent abgetastet. Erwartetes Bild:

- **(a) Ohne Fenster.** Hauptmaximum etwa zwischen den Bins $76\thinspace\text{Hz}$ und $80\thinspace\text{Hz}$; deutliche Nebenkeulen, die langsam abklingen. Das ist Spektralleckage.
- **(b) Mit Hann-Fenster.** Hauptmaximum breiter (Bin $76\thinspace\text{Hz}$ und $80\thinspace\text{Hz}$ etwa gleich hoch), Nebenkeulen deutlich gedämpft. Amplitude um etwa Faktor $2$ kleiner, weil das Fenster die Signalenergie reduziert.
- **(c) Mit Zero Padding.** Frequenzgitter wird feiner ($\Delta f\to 1\thinspace\text{Hz}$), die Spitze rückt sichtbar näher an $77\thinspace\text{Hz}$. **Die Nebenkeulen bleiben.** Zero Padding interpoliert das Spektrum, fügt aber keine neue Messinformation hinzu.

```python
import numpy as np

fs, N = 1000.0, 250
n = np.arange(N)
x = np.cos(2 * np.pi * 77.0 * n / fs)

# (a) ohne Fenster
X_rect = np.fft.fft(x)
f_rect = np.fft.fftfreq(N, d=1 / fs)

# (b) Hann-Fenster
X_hann = np.fft.fft(x * np.hanning(N))

# (c) Zero Padding
X_zpad = np.fft.fft(np.concatenate([x, np.zeros(750)]))
f_zpad = np.fft.fftfreq(len(X_zpad), d=1 / fs)

assert abs(f_rect[1] - f_rect[0]) == 4.0    # Δf = 4 Hz ohne Padding
assert abs(f_zpad[1] - f_zpad[0]) == 1.0    # Δf = 1 Hz mit Padding
```

Was du daraus mitnehmen solltest: Fenster reduzieren Nebenkeulen (Lesbarkeit), Zero Padding interpoliert das Bild (Anzeige), und nur eine längere Messdauer würde die echte Frequenzauflösung verbessern.

## Lösung 10

Die Bin-Breite ist $\Delta f=f_s/N=64/64=1\thinspace\text{Hz}$, die DFT-Bins liegen also genau bei $0,1,\ldots,63\thinspace\text{Hz}$. Damit ein reelles Signal **genau** zwei nichtverschwindende Bins erzeugt (außer der konjugierten Spiegelung der negativen Frequenz), muss es eine Summe **eines** reinen Kosinus mit einer ganzzahligen Frequenz $f_0\in\lbrace 5,\ldots,15\rbrace\thinspace\text{Hz}$ sein. Zum Beispiel:

```math
x[n]=\cos\bigl(2\pi\cdot 7\cdot n/64\bigr),\qquad n=0,\ldots,63.
```

Die DFT hat dann nichtverschwindende Werte nur bei den Bins $k=7$ und $k=64-7=57$ (konjugiert spiegelbildlich, Realitätssymmetrie). Alle anderen Bins sind exakt null.

Achte darauf: Hätte man $f_0=7{,}5\thinspace\text{Hz}$ gewählt, fiele $f_0$ zwischen zwei Bins und alle 64 Bins wären besetzt (Leckage). Die Kohärenz-Bedingung $f_0=m\Delta f$ mit ganzem $m$ ist also wesentlich.

---

[Zurück: Lösungen zu Einheit 4b](einheit-4b.md) · [Zurück zur Einheit](../einheit-5.md) · [Lösungs-Index](README.md) · [Weiter: Lösungen zu Einheit 6](einheit-6.md)
