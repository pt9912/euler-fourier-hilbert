# Einheit 3: Fourier-Transformation

> **Hauptschwelle dieser Einheit.** Aus den diskreten Frequenzen der Fourier-Reihe wird ein *Kontinuum* von Frequenzen. Das macht zwei Sprünge nötig: (i) Distributionen wie $\delta$ als Funktionale statt als gewöhnliche Funktionen, und (ii) **Zeit-Frequenz-Dualität** — Konzentration in der einen Domäne erzwingt Ausdehnung in der anderen. Beide werden in dieser Einheit eingeführt.

Was bleibt von Fourier übrig, wenn ein Signal nicht periodisch ist und daher keine einzelne Grundfrequenz hat? Diese Einheit ersetzt die diskreten Linien der Fourier-Reihe durch ein kontinuierliches Spektrum. Damit werden Pulse, Fenster, Gaußfunktionen und reale Messsignale zugänglich.

## 3.1 Von Fourier-Reihe zur Fourier-Transformation

Fourier-Reihen beschreiben periodische Signale. Viele reale Signale sind aber nicht periodisch: ein Puls, ein Messfenster, ein Ton mit Anfang und Ende.

Die Fourier-Transformation ersetzt die diskreten Frequenzen $n\omega_0$ durch ein kontinuierliches Spektrum $\omega$.

## 3.2 Definition

Wir verwenden die Konvention aus der [Kurs-Übersicht](README.md#konventionen-und-voraussetzungen): $\omega$ ist die Kreisfrequenz in rad/s. Wenn später numerische Beispiele in Hertz auftreten, gilt immer $\omega=2\pi f$.

```math
X(\omega) = \mathcal{F}\{x(t)\}
= \int_{-\infty}^{\infty} x(t)e^{-i\omega t}\,dt.
```

Die Rücktransformation lautet:

```math
x(t)
= \mathcal{F}^{-1}\{X(\omega)\}
= \frac{1}{2\pi}\int_{-\infty}^{\infty} X(\omega)e^{i\omega t}\,d\omega.
```

Das Integral konvergiert als gewöhnliches Lebesgue-Integral für $x\in L^1(\mathbb R)$. Für $x\in L^2(\mathbb R)$ erklärt man $\mathcal F$ über einen Grenzprozess (Satz von Plancherel); für $\delta$, $\sin$ und $\cos$ interpretiert man die Aussagen distributionentheoretisch. Vergleiche auch die Konventionshinweise in der [Kurs-Übersicht](README.md#konventionen-und-voraussetzungen).

## 3.3 Interpretation

Die Fourier-Transformation fragt für jede Kreisfrequenz $\omega$:

> Wie stark ähnelt $x(t)$ der Schwingung $e^{i\omega t}$?

Dabei liefert:

- $|X(\omega)|$: Amplitudeninformation,
- $\arg X(\omega)$: Phaseninformation.

## 3.4 Beispiel: Dirac-Impuls

Der Dirac-Impuls $\delta(t)$ ist keine gewöhnliche Funktion, sondern eine idealisierte Distribution. Man verwendet ihn über seine Siebeigenschaft:

```math
\int_{-\infty}^{\infty} f(t)\delta(t-t_0)\,dt=f(t_0).
```

Alle folgenden Aussagen über $\delta$ sind in diesem Sinn zu verstehen.

Für den Dirac-Impuls $\delta(t)$ gilt:

```math
\mathcal{F}\{\delta(t)\}
=\int_{-\infty}^{\infty}\delta(t)e^{-i\omega t}\,dt
=e^{-i\omega\cdot 0}
=1.
```

Ein unendlich kurzer Impuls enthält alle Frequenzen gleich stark.

## 3.5 Beispiel: Verschobener Impuls

Für $\delta(t-t_0)$ gilt:

```math
\mathcal{F}\{\delta(t-t_0)\}
=\int_{-\infty}^{\infty}\delta(t-t_0)e^{-i\omega t}\,dt
=e^{-i\omega t_0}.
```

Eine Zeitverschiebung erzeugt also eine frequenzabhängige Phase.

## 3.6 Beispiel: Rechteckpuls

Sei

```math
x(t)= \begin{cases} 1, & |t|\le a,\\ 0, & |t|>a. \end{cases}
```

Dann:

```math
X(\omega)
= \int_{-a}^{a} e^{-i\omega t}\,dt
= \frac{2\sin(\omega a)}{\omega}
= 2a\,\mathrm{sinc}\!\left(\frac{\omega a}{\pi}\right).
```

Dabei ist $\mathrm{sinc}(x)=\sin(\pi x)/(\pi x)$ die **normierte Sinc-Funktion** (manche Autoren verwenden die unnormierte Variante $\sin(x)/x$; beim Lesen also auf die Konvention achten). Sie hat ihre erste Nullstelle bei $x=1$ und gleicht über den ganzen Kurs als Spektralform jedes Rechteckpulses.

Für $\omega=0$ nimmt man den Grenzwert:

```math
X(0)=2a.
```

Ein breiter Puls im Zeitbereich hat ein schmales Spektrum; ein schmaler Puls hat ein breites Spektrum. Quantitativ ist das eine Form der **Unschärferelation**: Zeit- und Frequenzkonzentration sind nicht gleichzeitig beliebig klein.

## 3.7 Beispiel: Gaußfunktion

Für

```math
x(t)=e^{-at^2}, \qquad a>0
```

ist auch die Fourier-Transformierte eine Gaußfunktion:

```math
X(\omega)=\sqrt{\frac{\pi}{a}}e^{-\omega^2/(4a)}.
```

**Beweisidee über eine Differentialgleichung in $\omega$.** Wir vermeiden das Konturargument und nutzen nur reelle Werkzeuge:

1. Differenzieren unter dem Integral liefert
   ```math
   X'(\omega)=\int_{-\infty}^{\infty}(-it)e^{-at^2}e^{-i\omega t}\,dt.
   ```
2. Wegen $te^{-at^2}=-\tfrac{1}{2a}\bigl(e^{-at^2}\bigr)'$ folgt durch partielle Integration (Randterme verschwinden, weil $e^{-at^2}\to 0$):
   ```math
   X'(\omega)=\frac{i}{2a}\int_{-\infty}^{\infty}\bigl(e^{-at^2}\bigr)'e^{-i\omega t}\,dt =\frac{i}{2a}\cdot i\omega\,X(\omega) =-\frac{\omega}{2a}X(\omega).
   ```
3. Diese lineare Differentialgleichung hat die Lösung $X(\omega)=X(0)\thinspace e^{-\omega^2/(4a)}$.
4. Der Anfangswert ist das klassische Gauß-Integral
   ```math
   X(0)=\int_{-\infty}^{\infty}e^{-at^2}\,dt=\sqrt{\pi/a}.
   ```

Daraus folgt $X(\omega)=\sqrt{\pi/a}\thinspace e^{-\omega^2/(4a)}$. Die DGL-Idee ist exemplarisch — sie wird in [§4a.5](einheit-4a.md#4a5-ableitung) wieder auftreten, wenn die Ableitungsregel der Fourier-Transformation systematisch entwickelt wird.

Die Gaußfunktion ist deshalb in Wahrscheinlichkeitstheorie, Quantenmechanik und Signalverarbeitung besonders wichtig: Sie ist (bis auf Skalierung) ihre eigene Fourier-Transformierte und minimiert die Zeit-Frequenz-Unschärfe.

## 3.8 Visualisierung

![Rechteck/Sinc und Gauß/Gauß als Beispiele der Zeit-Frequenz-Dualität](bilder/einheit-3.png)

Oben: Ein scharf begrenzter Rechteckpuls hat ein langsam abklingendes, oszillierendes Sinc-Spektrum. Unten: Eine Gaußfunktion hat eine Gauß-Transformierte; ihre Form bleibt erhalten, nur die Skalen kehren sich um. Die absoluten Höhen der vier Panels sind nicht normiert (Sinc-Maximum $2a=2$, Gauß-Spektrum-Maximum $\sqrt{\pi/a}\approx 1{,}77$); der Vergleich gilt also Formen und Breiten, nicht Amplituden.

Die Darstellung lohnt sich nicht nur als Bestätigung der Formeln. Sie macht eine Eigenschaft sichtbar, die in der Rechnung leicht untergeht: harte Kanten im Zeitbereich erzeugen lange spektrale Ausläufer, glatte Konzentration erzeugt glatte Konzentration im Spektrum.

Kernidee in Python (vollständiges Skript: [`scripts/einheit-3.py`](scripts/einheit-3.py)):

```python
import numpy as np

t = np.linspace(-6, 6, 2000)
omega = np.linspace(-15, 15, 2000)

rect = np.where(np.abs(t) <= 1.0, 1.0, 0.0)
rect_ft = 2 * np.sinc(omega / np.pi)   # = 2 sin(omega)/omega, sauber bei omega=0

gauss = np.exp(-t**2)
gauss_ft = np.sqrt(np.pi) * np.exp(-omega**2 / 4)
```

## Übungen zu Einheit 3

1. Was ist der Unterschied zwischen Fourier-Reihe und Fourier-Transformation?
2. Berechne $\mathcal{F}\lbrace \delta(t-3)\rbrace $.
3. Was passiert mit dem Spektrum eines Rechteckpulses, wenn der Puls im Zeitbereich breiter wird?
4. Warum enthält ein sehr kurzer Impuls viele Frequenzen?
5. Skizziere ohne Integralrechnung qualitativ das Spektrum von $x(t)=\cos(\omega_0t)\cdot \mathrm{rect}(t/T)$. Nutze die Idee, dass ein zeitlich begrenzter Kosinus ein Rechteckspektrum um $\pm\omega_0$ verschiebt. Prüfe deine Begründung nach [§4a.3](einheit-4a.md#4a3-frequenzverschiebung) erneut.
6. Fehlerdiagnose: Jemand schreibt $\delta(0)=\infty$ und versucht damit $\mathcal F\lbrace \delta\rbrace $ wie ein gewöhnliches Integral auszurechnen. Warum ist das keine saubere Begründung? Welche Eigenschaft verwendet man stattdessen?
7. Code: Berechne numerisch die Fourier-Transformierte des Rechteckpulses $x(t)=\mathrm{rect}(t)$ (Träger $[-\tfrac12,\tfrac12]$) auf einem feinen $t$-Gitter und vergleiche das Ergebnis mit der geschlossenen Form $X(\omega)=\mathrm{sinc}(\omega/(2\pi))$. Verifiziere insbesondere die ersten beiden Nullstellen von $X(\omega)$ und das Verhalten bei $\omega\to 0$. Ein Codegerüst:
   ```python
   import numpy as np
   t = np.linspace(-20, 20, 8000)
   dt = t[1] - t[0]
   x = np.where(np.abs(t) <= 0.5, 1.0, 0.0)
   omega = np.linspace(-30, 30, 4000)
   X = np.array([np.sum(x * np.exp(-1j * w * t)) * dt for w in omega])
   X_theory = np.sinc(omega / (2 * np.pi))

   # Selbsttest: numerische FT trifft die geschlossene Form innen
   assert np.max(np.abs(X.real - X_theory)) < 1e-2
   # Selbsttest: X(0) = 1 (Integral des Rechteckpulses)
   assert abs(X[np.argmin(np.abs(omega))].real - 1.0) < 1e-2
   ```
   Diskutiere, warum die numerische Approximation an den Nullstellen besonders empfindlich auf das $t$-Gitter reagiert.
8. Konstruktion: Konstruiere zwei reelle Signale $x_1,x_2$, deren Fourier-Transformierte beide gerade Funktionen von $\omega$ sind, deren Spektren aber qualitativ unterschiedlich aussehen (z. B. eines glatt abklingend, das andere oszillierend). Welche Eigenschaften deiner $x_1,x_2$ erzwingen die Geradheit des Spektrums, welche bestimmen den Unterschied?

## Selbstcheck zu Einheit 3

- [ ] Ich kann erklären, warum aus Frequenzlinien ein kontinuierliches Spektrum wird.
- [ ] Ich kann die Fourier-Transformierte eines verschobenen Dirac-Impulses bestimmen.
- [ ] Ich kann Rechteckpuls und Sinc-Spektrum als Zeit-Frequenz-Dualität lesen.
- [ ] Ich kann qualitativ vorhersagen, wie Breite im Zeitbereich und Breite im Frequenzbereich zusammenhängen.
- [ ] Ich kann aus einer Visualisierung eine Spektrumeigenschaft formulieren, nicht nur die Formel wiederholen.
- [ ] Ich kann den Dirac-Impuls als Distribution über seine Siebeigenschaft statt als gewöhnliche Funktion verwenden.

Lösungen: [loesungen/einheit-3.md](loesungen/einheit-3.md)

---

[Zurück: Einheit 2 — Fourier-Reihen](einheit-2.md) · [Index](README.md) · [Weiter: Einheit 4a — Verschieben, Modulieren, Skalieren, Ableiten](einheit-4a.md)
