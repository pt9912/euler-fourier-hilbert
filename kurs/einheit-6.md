# Einheit 6: Hilbert-Transformation

## 6.1 Grundidee

Die Hilbert-Transformation erzeugt aus einem Signal ein neues Signal, dessen Frequenzanteile um \(90^\circ\) phasenverschoben sind:

- positive Frequenzen werden um \(-90^\circ\) verschoben,
- negative Frequenzen werden um \(+90^\circ\) verschoben.

Sie ist besonders wichtig für:

- analytische Signale,
- Hüllkurven,
- Phasenanalyse,
- Modulation,
- Kausalitätsbeziehungen in Physik und Systemtheorie.

## 6.2 Definition im Zeitbereich

Für ein geeignetes Signal \(x(t)\) ist die Hilbert-Transformierte:

$$
\mathcal{H}\{x\}(t)
=
\frac{1}{\pi}\,\text{p.v.}\int_{-\infty}^{\infty}
\frac{x(\tau)}{t-\tau}\,d\tau.
$$

"p.v." steht für Cauchy-Hauptwert. Das ist nötig, weil der Integrand bei \(\tau=t\) singulär ist.

Strukturell ist das eine **Faltung** mit dem Kern \(h(t)=1/(\pi t)\):
$$
\mathcal H\{x\} = h * x,\qquad h(t)=\frac{1}{\pi t}.
$$
Die Hilbert-Transformation ist also ein linearer, zeitinvarianter (LTI-)Operator und passt in den Rahmen von [Einheit 4](einheit-4.md): Ihr "Frequenzgang" ist genau die Funktion aus Abschnitt 6.3.

## 6.3 Definition im Frequenzbereich

Viel einfacher ist die Hilbert-Transformation im Frequenzbereich:

$$
\mathcal{F}\{\mathcal{H}x\}(\omega)
=
-i\,\operatorname{sgn}(\omega)X(\omega).
$$

Dabei ist

$$
\operatorname{sgn}(\omega)=
\begin{cases}
1, & \omega>0,\\
0, & \omega=0,\\
-1, & \omega<0.
\end{cases}
$$

Der Gleichanteil bei \(\omega=0\) wird auf null gesetzt.

## 6.4 Beispiele

Für \(\omega_0>0\) gilt:

$$
\mathcal{H}\{\cos(\omega_0t)\} = \sin(\omega_0t).
$$

und

$$
\mathcal{H}\{\sin(\omega_0t)\} = -\cos(\omega_0t).
$$

Die Hilbert-Transformation entspricht also einer Quadratur-Komponente.

**Nachrechnen am Beispiel \(\cos\) im Frequenzbereich.** Die Fourier-Transformierte von \(\cos(\omega_0 t)\) ist
$$
\mathcal F\{\cos(\omega_0 t)\}(\omega)=\pi\bigl[\delta(\omega-\omega_0)+\delta(\omega+\omega_0)\bigr].
$$
Multiplikation mit \(-i\operatorname{sgn}(\omega)\) liefert (unter Beachtung von \(\operatorname{sgn}(\pm\omega_0)=\pm 1\)):
$$
\pi\bigl[-i\,\delta(\omega-\omega_0)+i\,\delta(\omega+\omega_0)\bigr]
= \frac{\pi}{i}\bigl[\delta(\omega-\omega_0)-\delta(\omega+\omega_0)\bigr]
= \mathcal F\{\sin(\omega_0 t)\}(\omega).
$$
Rücktransformation gibt also \(\sin(\omega_0 t)\). Die analoge Rechnung für \(\sin\) liefert \(-\cos\).

## 6.5 Zweimalige Hilbert-Transformation

Im Frequenzbereich wird zweimal mit \(-i\operatorname{sgn}(\omega)\) multipliziert:

$$
\left(-i\operatorname{sgn}(\omega)\right)^2 = -1
$$

für \(\omega\ne0\). Daher gilt für Signale ohne Gleichanteil:

$$
\mathcal{H}\{\mathcal{H}\{x\}\} = -x.
$$

## 6.6 Visualisierung

![Hilbert-Transformierte eines Kosinus ist ein um 90 Grad verschobener Sinus](bilder/einheit-6.png)

Im Zoom unten ist gut zu sehen: Wo der Kosinus sein Maximum hat, ist die Hilbert-Transformierte gerade Null — und umgekehrt. Das ist die Quadratur-Beziehung in einem einzigen Bild.

Kernidee in Python (vollständiges Skript: [`scripts/einheit-6.py`](scripts/einheit-6.py)):

```python
import numpy as np
from scipy.signal import hilbert

fs = 1000.0
t = np.arange(0, 1.0, 1 / fs)
cos_signal = np.cos(2 * np.pi * 5.0 * t)

analytic = hilbert(cos_signal)         # liefert x + i*H{x}
hilbert_cos = np.imag(analytic)        # = sin(2 pi 5 t)
```

## Übungen zu Einheit 6

1. Was macht die Hilbert-Transformation mit positiven Frequenzen?
2. Berechne \(\mathcal{H}\{\cos(5t)\}\).
3. Berechne \(\mathcal{H}\{\sin(5t)\}\).
4. Warum braucht die Zeitbereichsdefinition einen Hauptwert?

Lösungen: [loesungen/einheit-6.md](loesungen/einheit-6.md)

---

[Zurück: Einheit 5 — DFT und FFT](einheit-5.md) · [Index](README.md) · [Weiter: Einheit 7 — Analytisches Signal](einheit-7.md)
