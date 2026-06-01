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

## 5.3 Interpretation der Frequenzindizes

Wenn die Abtastrate \(f_s\) ist, gehört zum Index \(k\) die Frequenz

$$
f_k = \frac{k}{N}f_s.
$$

Diese Formel beschreibt zunächst die unsortierte DFT-Bin-Position. Für die physikalische Interpretation verwendet man meist die signierte Frequenz:

$$
f_k =
\begin{cases}
\frac{k}{N}f_s, & 0\le k\le \left\lfloor\frac{N}{2}\right\rfloor,\\
\frac{k-N}{N}f_s, & \left\lfloor\frac{N}{2}\right\rfloor<k<N.
\end{cases}
$$

Die Bins oberhalb der Nyquist-Grenze stehen also für negative Frequenzen. Für gerades \(N\) ist der Bin \(k=N/2\) der Nyquist-Bin und hat keine separate positive/negative Gegenfrequenz. Bei reellwertigen Signalen kommt zusätzlich konjugierte Symmetrie hinzu: positive und negative Frequenzanteile tragen redundante Information.

## 5.4 FFT

Die FFT ist kein anderes mathematisches Objekt als die DFT. Sie ist ein schneller Algorithmus zur Berechnung der DFT.

- Direkte DFT: ungefähr \(N^2\) Operationen.
- FFT: ungefähr \(N\log_2 N\) Operationen.

## 5.5 Abtastung und Nyquist-Grenze

Wenn ein kontinuierliches Signal mit Abtastrate \(f_s\) abgetastet wird, können Frequenzen bis höchstens

$$
f_N=\frac{f_s}{2}
$$

eindeutig dargestellt werden. Diese Grenze heißt Nyquist-Frequenz.

Frequenzen oberhalb dieser Grenze erscheinen als falsche niedrigere Frequenzen. Das nennt man Aliasing.

## Übungen zu Einheit 5

1. Was ist der Unterschied zwischen DFT und FFT?
2. Ein Signal wird mit \(f_s=1000\,\text{Hz}\) abgetastet. Was ist die Nyquist-Frequenz?
3. Warum ist Aliasing problematisch?
4. Was bedeutet der DFT-Koeffizient \(X[0]\)?

Lösungen: [loesungen/einheit-5.md](loesungen/einheit-5.md)

---

[Zurück: Einheit 4 — Eigenschaften](einheit-4.md) · [Index](README.md) · [Weiter: Einheit 6 — Hilbert-Transformation](einheit-6.md)
