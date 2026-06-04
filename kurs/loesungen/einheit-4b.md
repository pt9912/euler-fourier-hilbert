# Lösungen zu Einheit 4b: Faltung, Energie, Symmetrien

Aufgabenstellung: [Einheit 4b — Übungen](../einheit-4b.md#übungen-zu-einheit-4b)

## Lösung 1

Der Faltungssatz sagt:

$$x*h\leftrightarrow X(\omega)H(\omega).$$

Eine Faltung ist ein Integral über alle Verschiebungen. Im Frequenzbereich wird daraus eine punktweise Multiplikation, was theoretisch und numerisch oft einfacher ist.

## Lösung 2

Wenn $y=x*h$, dann folgt direkt aus dem Faltungssatz:

$$Y(\omega)=X(\omega)H(\omega).$$

$H(\omega)$ beschreibt also, welche Frequenzen das System verstärkt, abschwächt oder in der Phase verschiebt.

## Lösung 3

Die diskrete Faltung mit `mode="same"` zentriert das Ergebnis. Mit einer hinreichend feinen Diskretisierung ($\Delta t\ll 1$) und einer Skalierung mit $\mathrm dt$ approximiert sie das Integral

$$(\mathrm{rect}*\mathrm{rect})(t)=\int_{-\infty}^{\infty}\mathrm{rect}(\tau)\mathrm{rect}(t-\tau)\thinspace d\tau.$$

Für die hier definierte $\mathrm{rect}$-Funktion (Träger $[-\tfrac12,\tfrac12]$, Höhe $1$) ergibt sich der Dreieckspuls

$$\Lambda(t)=\max\bigl(0,1-|t|\bigr),$$

mit Spitze $\Lambda(0)=1$ und Trägerbreite $2$.

```python
import numpy as np

t = np.linspace(-3, 3, 4000)
dt = t[1] - t[0]
rect = np.where(np.abs(t) <= 0.5, 1.0, 0.0)
triangle = np.convolve(rect, rect, mode="same") * dt

assert abs(triangle.max() - 1.0) < 1e-2
assert abs(triangle[np.argmin(np.abs(t - 1.0))]) < 1e-2   # bei t=1 ist Lambda(1)=0
```

Im Frequenzbereich entspricht das der Multiplikation der beiden Sinc-Spektren. Mit

```math
\mathcal F\lbrace\mathrm{rect}\rbrace(\omega)=\mathrm{sinc}\!\left(\frac{\omega}{2\pi}\right)
```

(für unsere Konvention und Trägerbreite $1$) folgt

```math
\mathcal F\lbrace\Lambda\rbrace(\omega)=\mathrm{sinc}^2\!\left(\frac{\omega}{2\pi}\right),
```

also ein nichtnegatives Spektrum. Was du daraus mitnehmen solltest: Quadratur eines Spektrums (durch Selbstfaltung) liefert Nichtnegativität — eine einfache Plausibilitätsprüfung für Implementierungen.

## Lösung 4

Faltung im Zeitbereich entspricht Multiplikation der Spektren. Damit der Träger von $x*h$ schmaler ist als der von $x$, müssen Spektralanteile von $X$ durch Multiplikation mit $H$ entfernt oder geschwächt werden, sodass im Zeitbereich Selbstauslöschung dafür sorgt, dass das Resultat in einem schmaleren Intervall liegt.

In der Standard-Lehrbuchsituation (kompakter Träger, beide nichtnegativ) ist das **nicht** möglich: Es gilt $\mathrm{supp}(x*h)\subseteq\mathrm{supp}(x)+\mathrm{supp}(h)$ (Minkowski-Summe), und der Träger wird mindestens so breit wie der von $x$.

Möglich wird das nur, wenn $x$ und $h$ Vorzeichen wechseln können (oder komplex sind), sodass im Faltungsintegral konstruktive und destruktive Interferenz zusammenkommen. Beispiel: $x(t)=\cos(\omega_0 t)\cdot e^{-t^2}$ ist auf ganz $\mathbb R$ unendlich gestreut; ein passendes $h$ kann es nahezu kompakt machen. Diese Möglichkeit ist die Grundlage von **gefensterten Rekonstruktionen** und **Matched Filters**.

Was du daraus mitnehmen solltest: Träger-Erweiterung ist die Regel, Träger-Verschmälerung erfordert besondere Struktur.

## Lösung 5

Für $x(t)=e^{-|t|}$ ist $|x(t)|^2=e^{-2|t|}$, also

$$\int_{-\infty}^{\infty}e^{-2|t|}\thinspace dt = 2\int_0^{\infty}e^{-2t}\thinspace dt = 1.$$

Auf der Frequenzseite ist $|X(\omega)|^2=\frac{4}{(1+\omega^2)^2}$. Mit dem Standardintegral

$$\int_{-\infty}^{\infty}\frac{d\omega}{(1+\omega^2)^2}=\frac{\pi}{2}$$

folgt

$$\frac{1}{2\pi}\int_{-\infty}^{\infty}\frac{4}{(1+\omega^2)^2}\thinspace d\omega = \frac{1}{2\pi}\cdot 4\cdot\frac{\pi}{2} = 1.$$

Beide Seiten stimmen überein.

## Lösung 6

$x(t)=e^{-t^2}\cos(3t)$ ist reell (weil $e^{-t^2}$ und $\cos(3t)$ reell sind) und gerade (Produkt zweier gerader Funktionen). Nach der Symmetrietabelle aus §4b.3 folgt, dass $X(\omega)$ **reell und gerade** ist.

Konkret: Mit der Modulationsregel aus [§4a.3](../einheit-4a.md#4a3-frequenzverschiebung) gilt
$$X(\omega)=\tfrac12\bigl[G(\omega-3)+G(\omega+3)\bigr],$$
mit $G(\omega)=\sqrt{\pi}\thinspace e^{-\omega^2/4}$ (Gauß-Transformierte aus §3.7). Sowohl $G(\omega-3)$ als auch $G(\omega+3)$ sind reell und nichtnegativ, ihre Summe ist gerade — Bestätigung der Vorhersage.

---

[Zurück: Lösungen zu Einheit 4a](einheit-4a.md) · [Zurück zur Einheit](../einheit-4b.md) · [Lösungs-Index](README.md) · [Weiter: Lösungen zu Einheit 5](einheit-5.md)
