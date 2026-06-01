# Lösungen zu Einheit 3: Fourier-Transformation

Aufgabenstellung: [Einheit 3 — Übungen](../einheit-3.md#übungen-zu-einheit-3)

## Lösung 1

Fourier-Reihen beschreiben periodische Signale durch diskrete Frequenzen $n\omega_0$:

$$f(t)=\sum_{n=-\infty}^{\infty}c_ne^{in\omega_0t}.$$

Die Fourier-Transformation beschreibt nichtperiodische Signale durch ein kontinuierliches Spektrum:

$$x(t)=\frac{1}{2\pi}\int_{-\infty}^{\infty}X(\omega)e^{i\omega t}\,d\omega.$$

Anschaulich wird aus der Summe über Frequenzlinien ein Integral über alle Frequenzen.

## Lösung 2

Mit der Siebeigenschaft des Dirac-Impulses:

$$\mathcal{F}\{\delta(t-3)\} = \int_{-\infty}^{\infty}\delta(t-3)e^{-i\omega t}\,dt = e^{-i3\omega}.$$

## Lösung 3

Beim Rechteckpuls aus der Einheit gilt:

$$X(\omega)=\frac{2\sin(\omega a)}{\omega}.$$

Wird der Puls breiter, wächst $a$. Die erste Nullstelle liegt bei $\omega a=\pi$, also bei

$$\omega=\frac{\pi}{a}.$$

Größeres $a$ bedeutet kleinere Nullstellenabstände: Das Spektrum wird schmaler.

## Lösung 4

Ein sehr kurzer Impuls ist stark im Zeitbereich konzentriert. Um eine solche Konzentration aus Schwingungen zusammenzusetzen, braucht man viele Frequenzen mit passend abgestimmten Phasen. Zeitliche Konzentration und spektrale Ausdehnung stehen deshalb in einem Gegenspiel.

## Lösung 5

Der Faktor $\operatorname{rect}(t/T)$ begrenzt den Kosinus auf ein endliches Zeitfenster. Das Fenster allein hat ein Sinc-förmiges Spektrum $R(\omega)$, also ein breites Hauptmaximum mit abklingenden Nebenkeulen.

Multiplikation mit

$$\cos(\omega_0t)=\frac12\left(e^{i\omega_0t}+e^{-i\omega_0t}\right)$$

erzeugt zwei verschobene Kopien dieses Fensterspektrums:

$$X(\omega)=\frac12 R(\omega-\omega_0)+\frac12 R(\omega+\omega_0).$$

Qualitativ skizziert man also zwei Sinc-Pakete, eines um $+\omega_0$, eines um $-\omega_0$. Was du daraus mitnehmen solltest: Zeitliche Begrenzung macht aus idealen Linien breite Spektralpakete.

## Lösung 6

Der Dirac-Impuls ist keine gewöhnliche Funktion mit einem wohldefinierten Funktionswert bei $0$. Die Schreibweise $\delta(0)=\infty$ ist höchstens eine gefährliche Merkhilfe und keine Rechenregel.

Sauber verwendet man die Siebeigenschaft:

$$\int_{-\infty}^{\infty} f(t)\delta(t-t_0)\,dt=f(t_0).$$

Für $t_0=0$ und $f(t)=e^{-i\omega t}$ folgt deshalb

$$\mathcal F\{\delta(t)\}=e^{-i\omega\cdot 0}=1.$$

---

[Zurück: Lösungen zu Einheit 2](einheit-2.md) · [Zurück zur Einheit](../einheit-3.md) · [Lösungs-Index](README.md) · [Weiter: Lösungen zu Einheit 4](einheit-4.md)
