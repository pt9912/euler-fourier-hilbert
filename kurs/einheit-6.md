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

## 6.5 Zweimalige Hilbert-Transformation

Im Frequenzbereich wird zweimal mit \(-i\operatorname{sgn}(\omega)\) multipliziert:

$$
\left(-i\operatorname{sgn}(\omega)\right)^2 = -1
$$

für \(\omega\ne0\). Daher gilt für Signale ohne Gleichanteil:

$$
\mathcal{H}\{\mathcal{H}\{x\}\} = -x.
$$

## Übungen zu Einheit 6

1. Was macht die Hilbert-Transformation mit positiven Frequenzen?
2. Berechne \(\mathcal{H}\{\cos(5t)\}\).
3. Berechne \(\mathcal{H}\{\sin(5t)\}\).
4. Warum braucht die Zeitbereichsdefinition einen Hauptwert?

Lösungen: [loesungen/einheit-6.md](loesungen/einheit-6.md)

---

[Zurück: Einheit 5 — DFT und FFT](einheit-5.md) · [Index](README.md) · [Weiter: Einheit 7 — Analytisches Signal](einheit-7.md)
