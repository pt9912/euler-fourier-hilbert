# Einheit 5: Diskrete Signale, DFT und FFT

## 5.1 Warum diskret?

Computer speichern endlich viele Messwerte:

$$
x[0], x[1], \ldots, x[N-1].
$$

Die diskrete Fourier-Transformation (DFT) zerlegt diese Werte in diskrete Frequenzanteile.

## 5.2 Definition der DFT

Die DFT ist:

$$
X[k] = \sum_{n=0}^{N-1} x[n]e^{-i2\pi kn/N},
\qquad k=0,\ldots,N-1.
$$

Die inverse DFT ist:

$$
x[n] = \frac{1}{N}\sum_{k=0}^{N-1}X[k]e^{i2\pi kn/N}.
$$

**Periodizität.** Aus den Definitionen folgt direkt
$$X[k+N]=X[k],\qquad x[n+N]=x[n].$$
DFT und Eingangsfolge sind also implizit \(N\)-periodisch fortgesetzt. Das erklärt, warum es nur \(N\) verschiedene Frequenzbins gibt — und es ist auch der Grund, weshalb Aliasing in der DFT überhaupt auftritt.

**Normierungskonvention.** Wir wählen den Faktor \(1/N\) bei der **inversen** Transformation. Das ist die Konvention von NumPy (`numpy.fft.fft`/`ifft`), SciPy und MATLAB. Andere Quellen verwenden \(1/\sqrt N\) auf beiden Seiten (symmetrische Variante) oder \(1/N\) vorne; die Sätze sind dieselben, die Zahlenwerte einzelner Koeffizienten unterscheiden sich um einen Vorfaktor.

## 5.3 Interpretation der Frequenzindizes

Wenn die Abtastrate \(f_s\) ist, gehört zum Index \(k\) die Frequenz

$$
f_k = \frac{k}{N}f_s.
$$

Diese Formel beschreibt zunächst die unsortierte DFT-Bin-Position. Für die physikalische Interpretation verwendet man meist die signierte Frequenz:

$$
f_k =
\begin{cases}
\frac{k}{N}f_s, & 0\le k < \left\lceil\frac{N}{2}\right\rceil,\\
\frac{k-N}{N}f_s, & \left\lceil\frac{N}{2}\right\rceil\le k<N.
\end{cases}
$$

Für ungerades \(N\) ist die Aufteilung in positive (\(k<N/2\)) und negative (\(k>N/2\)) Frequenzen eindeutig. Für gerades \(N\) ist der **Nyquist-Bin** \(k=N/2\) ein Sonderfall: positive und negative Frequenz \(\pm f_s/2\) fallen dort algebraisch zusammen, weil sich die Abtastwerte einer Schwingung mit \(f=f_s/2\) nur im Vorzeichen unterscheiden. NumPys `fft.fftfreq` ordnet diesen Bin der negativen Frequenz \(-f_s/2\) zu (also der zweite Fall oben mit \(k=N/2\)); inhaltlich macht das keinen Unterschied, weil das Bild dort symmetrisch ist.

**Symmetrie reeller Signale.** Ist \(x[n]\) reell, so gilt
$$
X[N-k]=\overline{X[k]},\qquad k=1,\ldots,N-1.
$$
Insbesondere ist \(|X[N-k]|=|X[k]|\) und \(\arg X[N-k]=-\arg X[k]\). Positive und negative Frequenzanteile tragen also redundante Information. In der Praxis genügt es daher, die Bins \(k=0,\ldots,\lfloor N/2\rfloor\) anzuzeigen (einseitiges Spektrum). Das ist auch der Grund, warum NumPys `rfft` nur diese Hälfte zurückgibt.

## 5.4 FFT

Die FFT ist kein anderes mathematisches Objekt als die DFT. Sie ist ein schneller Algorithmus zur Berechnung der DFT.

- Direkte DFT: ungefähr \(N^2\) Operationen.
- FFT: ungefähr \(N\log_2 N\) Operationen.

## 5.5 Abtastung und Nyquist-Grenze

Wenn ein kontinuierliches Signal mit Abtastrate \(f_s\) abgetastet wird, können Frequenzen mit \(|f|<f_s/2\) ohne Aliasing eindeutig dargestellt werden. Die Grenze

$$
f_N=\frac{f_s}{2}
$$

heißt Nyquist-Frequenz.

Der exakte Randfall \(f=f_s/2\) ist ein Sonderfall: positive und negative Frequenz fallen dort auf denselben Abtastwertwechsel von Sample zu Sample. In der DFT ist das bei geradem \(N\) der Nyquist-Bin \(k=N/2\), der keine separate positive/negative Gegenfrequenz hat. Praktisch hält man Nutzsignale deshalb unterhalb der Nyquist-Frequenz und verwendet vor der Abtastung ein Anti-Aliasing-Filter.

Frequenzen oberhalb dieser Grenze erscheinen als falsche niedrigere Frequenzen. Das nennt man Aliasing.

## 5.6 Visualisierung

![Aliasing: zwei verschiedene Sinusse mit identischen Samples, daneben das DFT-Spektrum eines Sinus](bilder/einheit-5.png)

Links: Eine 1-Hz-Schwingung und eine 11-Hz-Schwingung erzeugen bei \(f_s=10\,\text{Hz}\) **exakt dieselben Abtastwerte** — die roten Kreise umschließen die schwarzen Punkte. Aus den Samples allein lassen sich die beiden Frequenzen nicht unterscheiden, das ist Aliasing. Rechts: Die DFT eines 30-Hz-Kosinus bei \(f_s=100\,\text{Hz}\) zeigt zwei symmetrische Linien bei \(\pm 30\,\text{Hz}\) (konjugierte Symmetrie reeller Signale).

Kernidee in Python (vollständiges Skript: [`scripts/einheit-5.py`](scripts/einheit-5.py)):

```python
import numpy as np

fs = 100.0
N = 500
n = np.arange(N)
signal = np.cos(2 * np.pi * 30.0 * n / fs)

X = np.fft.fft(signal)
freqs = np.fft.fftfreq(N, d=1 / fs)        # signierte Frequenzachse
```

## Übungen zu Einheit 5

1. Was ist der Unterschied zwischen DFT und FFT?
2. Ein Signal wird mit \(f_s=1000\,\text{Hz}\) abgetastet. Was ist die Nyquist-Frequenz, und welcher Frequenzbereich ist ohne Aliasing eindeutig?
3. Warum ist Aliasing problematisch?
4. Was bedeutet der DFT-Koeffizient \(X[0]\)?

Lösungen: [loesungen/einheit-5.md](loesungen/einheit-5.md)

---

[Zurück: Einheit 4 — Eigenschaften](einheit-4.md) · [Index](README.md) · [Weiter: Einheit 6 — Hilbert-Transformation](einheit-6.md)
