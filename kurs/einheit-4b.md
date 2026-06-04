# Einheit 4b: Eigenschaften der Fourier-Transformation — Faltung, Energie, Symmetrien

Nachdem [Einheit 4a](einheit-4a.md) die punktweisen Werkzeuge (Verschieben, Modulieren, Skalieren, Ableiten) gesammelt hat, folgen hier die strukturellen Werkzeuge. Faltung verbindet zwei Signale, Parseval verbindet zwei Repräsentationen desselben Signals, und die Symmetrietabelle verbindet algebraische Eigenschaften des Signals mit denen seines Spektrums.

## 4b.1 Faltung

Die Faltung zweier Funktionen ist:

```math
(x*h)(t)=\int_{-\infty}^{\infty}x(\tau)h(t-\tau)\,d\tau.
```

Im Frequenzbereich gilt:

```math
x*h \leftrightarrow X(\omega)H(\omega).
```

Faltung im Zeitbereich wird Multiplikation im Frequenzbereich.

**Beweisskizze.** In das Definitionsintegral der Fourier-Transformation setzt man die Faltung ein und vertauscht (Fubini, unter den üblichen Integrierbarkeitsvoraussetzungen) die Integrationen:
```math
\mathcal F\{x*h\}(\omega) =\int_{-\infty}^{\infty}\!\!\int_{-\infty}^{\infty} x(\tau)h(t-\tau)\,d\tau\,e^{-i\omega t}\,dt =\int_{-\infty}^{\infty} x(\tau)\int_{-\infty}^{\infty} h(t-\tau)e^{-i\omega t}\,dt\,d\tau.
```
Im inneren Integral substituiert man $u=t-\tau$ und zieht $e^{-i\omega\tau}$ heraus — das ist derselbe Trick wie bei der Zeitverschiebung in [§4a.2](einheit-4a.md#4a2-zeitverschiebung):
```math
\int_{-\infty}^{\infty} h(t-\tau)e^{-i\omega t}\,dt = e^{-i\omega\tau}H(\omega).
```
Übrig bleibt $H(\omega)\int x(\tau)e^{-i\omega\tau}\thinspace d\tau=X(\omega)H(\omega)$.

Umgekehrt gilt:

```math
x(t)h(t) \leftrightarrow \frac{1}{2\pi}(X*H)(\omega).
```

**Zwischenstopp.** Merke die Paarung bewusst:

- Faltung in der Zeit wird Multiplikation im Frequenzbereich.
- Multiplikation in der Zeit wird Faltung im Frequenzbereich.

Der Faktor $1/(2\pi)$ im zweiten Satz kommt nur aus unserer Fourier-Konvention.

## 4b.2 Parseval-Identität (Plancherel)

Für $x\in L^2(\mathbb R)$ gilt:

```math
\int_{-\infty}^{\infty}|x(t)|^2\,dt
=
\frac{1}{2\pi}\int_{-\infty}^{\infty}|X(\omega)|^2\,d\omega.
```

Die Energie eines Signals kann im Zeit- oder Frequenzbereich gemessen werden.

Allgemeiner gilt für innere Produkte:

```math
\langle x,y\rangle_t = \frac{1}{2\pi}\langle X,Y\rangle_\omega.
```

Die Fourier-Transformation ist also eine Isometrie auf $L^2$ bis auf den konventionsbedingten Faktor $2\pi$: Abstände und Winkel im Signalraum bleiben im Frequenzraum erhalten, nur die Skala ändert sich.

## 4b.3 Symmetrien reeller und gerader/ungerader Signale

Viele Aussagen über das Spektrum eines reellen Signals folgen direkt aus der Definition durch Konjugation und Substitution $t\to -t$. Es lohnt sich, sie als Tabelle griffbereit zu haben:

| Zeitsignal $x(t)$ | Spektrum $X(\omega)$ |
| --- | --- |
| reell | hermitesch: $X(-\omega)=\overline{X(\omega)}$ |
| imaginär | antihermitesch: $X(-\omega)=-\overline{X(\omega)}$ |
| gerade ($x(-t)=x(t)$) | gerade: $X(-\omega)=X(\omega)$ |
| ungerade ($x(-t)=-x(t)$) | ungerade: $X(-\omega)=-X(\omega)$ |
| reell und gerade | reell und gerade |
| reell und ungerade | rein imaginär und ungerade |

Konsequenzen für die Praxis:

- Bei reellen Signalen genügt das **einseitige Spektrum** $\omega\ge 0$; die andere Hälfte ist konjugiert (siehe auch [§2.7](einheit-2.md#27-betrag-und-phase) und [§5.3](einheit-5.md#53-interpretation-der-frequenzindizes)).
- Bei reellen, geraden Signalen (z. B. Rechteckpuls aus §3.6, Gauß aus §3.7) ist die Phase nur $0$ oder $\pm\pi$ — wertvoll für die Plausibilitätsprüfung in Projekt 1.
- Bei reellen, ungeraden Signalen ist die Phase $\pm\pi/2$ — daher das rein imaginäre Spektrum eines Sinus.

**Zwischenstopp.** Die Tabelle ist ein Diagnosewerkzeug: Wenn dein numerisches Spektrum eines reellen Signals nicht hermitesch ist, stimmt meistens die Frequenzachse, die Zentrierung oder die komplexe Auswertung nicht.

## 4b.4 Visualisierung

![Faltung zweier Rechteckpulse ergibt einen Dreieckspuls; Multiplikation der Sinc-Spektren ergibt sinc²](bilder/einheit-4b.png)

Zwei identische Rechteckpulse werden gefaltet — heraus kommt der klassische Dreieckspuls. Im Frequenzbereich entspricht das einfach der punktweisen Multiplikation der beiden Sinc-Spektren, die das bekannte $\mathrm{sinc}^2$-Profil ergibt (nichtnegativ, weil Quadrat).

Kernidee in Python (vollständiges Skript: [`scripts/einheit-4b.py`](scripts/einheit-4b.py)):

```python
import numpy as np

t = np.linspace(-3, 3, 4000)
dt = t[1] - t[0]

rect = np.where(np.abs(t) <= 0.5, 1.0, 0.0)
triangle = np.convolve(rect, rect, mode="same") * dt   # = (rect * rect)(t)
```

## Übungen zu Einheit 4b

1. Was ist der Vorteil des Faltungssatzes?
2. Ein Filter hat Spektrum $H(\omega)$. Was ist das Spektrum des gefilterten Signals $y=x*h$?
3. Code: Berechne numerisch $(\mathrm{rect}*\mathrm{rect})(t)$ für $\mathrm{rect}$ auf $[-0{,}5,0{,}5]$ und prüfe, dass die diskrete Faltung mit `np.convolve(..., mode="same") * dt` einen Dreieckspuls mit Spitze bei $t=0$ und Trägerbreite $2$ liefert. Vergleiche das numerische Spektrum mit $\mathrm{sinc}^2(\omega/(2\pi))$.
4. Konstruktion: Konstruiere zwei Signale $x$ und $h$ in $L^2(\mathbb R)$, deren Faltung $x*h$ einen schmaleren Träger hat als $x$ allein. Begründe, dass das nur unter besonderen Voraussetzungen möglich ist (Tipp: Faltung erweitert in der Regel den Träger).
5. Parseval: Verifiziere die Parseval-Identität für $x(t)=e^{-|t|}$, also $\int_{-\infty}^{\infty}|x(t)|^2dt=\tfrac{1}{2\pi}\int_{-\infty}^{\infty}|X(\omega)|^2d\omega$. (Hinweis: $X(\omega)=\frac{2}{1+\omega^2}$.)
6. Wende die Symmetrietabelle auf $x(t)=e^{-t^2}\cos(3t)$ an und sage vorher, ob $X(\omega)$ reell, rein imaginär oder allgemein komplex ist.
7. Fehlerdiagnose: Jemand argumentiert: "Wenn ich zwei Signale $x,h\in L^2$ multipliziere, dann ist die Energie des Produkts gleich dem Produkt der Energien — Parseval angewandt auf $xh$." Welche zwei Verwechslungen stecken in dieser Aussage? Korrigiere sie und nenne die richtige Energie-Identität für $y=x*h$ (statt $xh$).

## Selbstcheck zu Einheit 4b

- [ ] Ich kann begründen, warum Faltung im Zeitbereich Multiplikation im Frequenzbereich wird.
- [ ] Ich kann Parseval als Energieerhaltung interpretieren.
- [ ] Ich kann die Symmetrietabelle auf ein konkretes Beispiel anwenden.
- [ ] Ich kann die Faltung zweier Rechteckpulse numerisch berechnen und das $\mathrm{sinc}^2$-Spektrum erkennen.
- [ ] Ich kann an einem nicht-hermiteschen numerischen Spektrum eines reellen Signals einen Implementierungsfehler vermuten.

Lösungen: [loesungen/einheit-4b.md](loesungen/einheit-4b.md)

---

[Zurück: Einheit 4a — Verschieben, Modulieren, Skalieren, Ableiten](einheit-4a.md) · [Index](README.md) · [Weiter: Einheit 5 — DFT und FFT](einheit-5.md)
