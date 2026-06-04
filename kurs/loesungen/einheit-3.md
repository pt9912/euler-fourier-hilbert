# Lösungen zu Einheit 3: Fourier-Transformation

Aufgabenstellung: [Einheit 3 — Übungen](../einheit-3.md#übungen-zu-einheit-3)

## Lösung 1

Fourier-Reihen beschreiben periodische Signale durch diskrete Frequenzen $n\omega_0$:

$$f(t)=\sum_{n=-\infty}^{\infty}c_ne^{in\omega_0t}.$$

Die Fourier-Transformation beschreibt nichtperiodische Signale durch ein kontinuierliches Spektrum:

$$x(t)=\frac{1}{2\pi}\int_{-\infty}^{\infty}X(\omega)e^{i\omega t}\thinspace d\omega.$$

Anschaulich wird aus der Summe über Frequenzlinien ein Integral über alle Frequenzen.

## Lösung 2

Mit der Siebeigenschaft des Dirac-Impulses:

$$\mathcal{F}\lbrace \delta(t-3)\rbrace  = \int_{-\infty}^{\infty}\delta(t-3)e^{-i\omega t}\thinspace dt = e^{-i3\omega}.$$

## Lösung 3

Beim Rechteckpuls aus der Einheit gilt:

$$X(\omega)=\frac{2\sin(\omega a)}{\omega}.$$

Wird der Puls breiter, wächst $a$. Die erste Nullstelle liegt bei $\omega a=\pi$, also bei

$$\omega=\frac{\pi}{a}.$$

Größeres $a$ bedeutet kleinere Nullstellenabstände: Das Spektrum wird schmaler.

## Lösung 4

Ein sehr kurzer Impuls ist stark im Zeitbereich konzentriert. Um eine solche Konzentration aus Schwingungen zusammenzusetzen, braucht man viele Frequenzen mit passend abgestimmten Phasen. Zeitliche Konzentration und spektrale Ausdehnung stehen deshalb in einem Gegenspiel.

## Lösung 5

Der Faktor $\mathrm{rect}(t/T)$ begrenzt den Kosinus auf ein endliches Zeitfenster. Das Fenster allein hat ein Sinc-förmiges Spektrum $R(\omega)$, also ein breites Hauptmaximum mit abklingenden Nebenkeulen.

Multiplikation mit

$$\cos(\omega_0t)=\frac12\left(e^{i\omega_0t}+e^{-i\omega_0t}\right)$$

erzeugt zwei verschobene Kopien dieses Fensterspektrums:

$$X(\omega)=\frac12 R(\omega-\omega_0)+\frac12 R(\omega+\omega_0).$$

Qualitativ skizziert man also zwei Sinc-Pakete, eines um $+\omega_0$, eines um $-\omega_0$. Was du daraus mitnehmen solltest: Zeitliche Begrenzung macht aus idealen Linien breite Spektralpakete.

## Lösung 6

Der Dirac-Impuls ist keine gewöhnliche Funktion mit einem wohldefinierten Funktionswert bei $0$. Die Schreibweise $\delta(0)=\infty$ ist höchstens eine gefährliche Merkhilfe und keine Rechenregel.

Sauber verwendet man die Siebeigenschaft:

$$\int_{-\infty}^{\infty} f(t)\delta(t-t_0)\thinspace dt=f(t_0).$$

Für $t_0=0$ und $f(t)=e^{-i\omega t}$ folgt deshalb

$$\mathcal F\lbrace \delta(t)\rbrace =e^{-i\omega\cdot 0}=1.$$

## Lösung 7

Eine direkte numerische Auswertung mit dem Codegerüst aus der Aufgabe ergibt $X(\omega)\approx\mathrm{sinc}(\omega/(2\pi))$ über den gesamten getesteten Frequenzbereich.

```python
import numpy as np

t = np.linspace(-20, 20, 8000)
dt = t[1] - t[0]
x = np.where(np.abs(t) <= 0.5, 1.0, 0.0)

omega = np.linspace(-30, 30, 4000)
X_num = np.array([np.sum(x * np.exp(-1j * w * t)) * dt for w in omega])
X_theory = np.sinc(omega / (2 * np.pi))

assert np.max(np.abs(X_num - X_theory)) < 1e-3
assert abs(X_num[np.argmin(np.abs(omega))] - 1.0) < 1e-3   # X(0) = 1
```

Die ersten beiden positiven Nullstellen liegen bei $\omega=2\pi$ und $\omega=4\pi$ — genau dort, wo $\sin(\omega/2)=0$ mit $\omega\ne 0$. Bei $\omega\to 0$ liefert die Sinc-Form den Grenzwert $1$ (über $\mathrm{sinc}(0)=1$).

Empfindlichkeit an den Nullstellen: An den Nullstellen ist der Wert genau $0$, aber Vorzeichen und Steigung der Sinc-Funktion sind nichttrivial. Ein zu grobes $t$-Gitter führt dazu, dass die Sinusoszillationen des Integranden $\mathrm{rect}(t)\cdot e^{-i\omega t}$ nicht mehr sauber gemittelt werden. Daumenregel: $\mathrm dt$ sollte deutlich kleiner sein als $\pi/\omega_{\max}$, sonst wandert die scheinbare Nullstelle.

## Lösung 8

Geradheit des Spektrums verlangt, dass $X(-\omega)=X(\omega)$. Nach der Symmetrietabelle aus [§4b.3](../einheit-4b.md#4b3-symmetrien-reeller-und-geraderungerader-signale) (die in Einheit 4b systematisch eingeführt wird) reicht dafür: $x$ ist eine gerade Funktion von $t$.

Zwei verschiedene gerade reelle Signale:

- $x_1(t)=e^{-t^2}$ — die Gaußfunktion. Ihr Spektrum $X_1(\omega)=\sqrt{\pi}\thinspace e^{-\omega^2/4}$ ist glatt, nichtnegativ und klingt monoton ab. Das ist eine Folge davon, dass $x_1$ glatt und überall positiv ist.
- $x_2(t)=\mathrm{rect}(t)$ — der Rechteckpuls. Sein Spektrum $X_2(\omega)=\mathrm{sinc}(\omega/(2\pi))$ ist ebenfalls reell und gerade, aber oszilliert mit Vorzeichenwechseln. Die Oszillation ist die spektrale Signatur der harten Kanten von $x_2$ — eine direkte Konsequenz davon, dass $x_2$ unstetig ist.

Was du daraus mitnehmen solltest: Geradheit zwingt die Symmetrie des Spektrums, sagt aber nichts über Glattheit oder Vorzeichen. Ob das Spektrum oszilliert, hängt an den Sprüngen oder Kanten des Zeitsignals.

---

[Zurück: Lösungen zu Einheit 2](einheit-2.md) · [Zurück zur Einheit](../einheit-3.md) · [Lösungs-Index](README.md) · [Weiter: Lösungen zu Einheit 4a](einheit-4a.md)
