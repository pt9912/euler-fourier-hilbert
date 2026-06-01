# Einheit 3: Fourier-Transformation

## 3.1 Von Fourier-Reihe zur Fourier-Transformation

Fourier-Reihen beschreiben periodische Signale. Viele reale Signale sind aber nicht periodisch: ein Puls, ein Messfenster, ein Ton mit Anfang und Ende.

Die Fourier-Transformation ersetzt die diskreten Frequenzen \(n\omega_0\) durch ein kontinuierliches Spektrum \(\omega\).

## 3.2 Definition

Wir verwenden die Konvention:

$$
X(\omega) = \mathcal{F}\{x(t)\}
= \int_{-\infty}^{\infty} x(t)e^{-i\omega t}\,dt.
$$

Die Rücktransformation lautet:

$$
x(t)
= \mathcal{F}^{-1}\{X(\omega)\}
= \frac{1}{2\pi}\int_{-\infty}^{\infty} X(\omega)e^{i\omega t}\,d\omega.
$$

## 3.3 Interpretation

Die Fourier-Transformation fragt für jede Kreisfrequenz \(\omega\):

> Wie stark ähnelt \(x(t)\) der Schwingung \(e^{i\omega t}\)?

Dabei liefert:

- \(|X(\omega)|\): Amplitudeninformation,
- \(\arg X(\omega)\): Phaseninformation.

## 3.4 Beispiel: Dirac-Impuls

Für den Dirac-Impuls \(\delta(t)\) gilt:

$$
\mathcal{F}\{\delta(t)\}=1.
$$

Ein unendlich kurzer Impuls enthält alle Frequenzen gleich stark.

## 3.5 Beispiel: Verschobener Impuls

Für \(\delta(t-t_0)\) gilt:

$$
\mathcal{F}\{\delta(t-t_0)\}=e^{-i\omega t_0}.
$$

Eine Zeitverschiebung erzeugt also eine frequenzabhängige Phase.

## 3.6 Beispiel: Rechteckpuls

Sei

$$
x(t)=
\begin{cases}
1, & |t|\le a,\\
0, & |t|>a.
\end{cases}
$$

Dann:

$$
X(\omega)
= \int_{-a}^{a} e^{-i\omega t}\,dt
= \frac{2\sin(\omega a)}{\omega}.
$$

Für \(\omega=0\) nimmt man den Grenzwert:

$$
X(0)=2a.
$$

Ein breiter Puls im Zeitbereich hat ein schmales Spektrum; ein schmaler Puls hat ein breites Spektrum.

## 3.7 Beispiel: Gaußfunktion

Für

$$
x(t)=e^{-at^2}, \qquad a>0
$$

ist auch die Fourier-Transformierte eine Gaußfunktion:

$$
X(\omega)=\sqrt{\frac{\pi}{a}}e^{-\omega^2/(4a)}.
$$

Die Gaußfunktion ist deshalb in Wahrscheinlichkeitstheorie, Quantenmechanik und Signalverarbeitung besonders wichtig.

## Übungen zu Einheit 3

1. Was ist der Unterschied zwischen Fourier-Reihe und Fourier-Transformation?
2. Berechne \(\mathcal{F}\{\delta(t-3)\}\).
3. Was passiert mit dem Spektrum eines Rechteckpulses, wenn der Puls im Zeitbereich breiter wird?
4. Warum enthält ein sehr kurzer Impuls viele Frequenzen?

Lösungen: [loesungen/einheit-3.md](loesungen/einheit-3.md)

---

[Zurück: Einheit 2 — Fourier-Reihen](einheit-2.md) · [Index](README.md) · [Weiter: Einheit 4 — Eigenschaften](einheit-4.md)
