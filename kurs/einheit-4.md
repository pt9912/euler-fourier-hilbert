# Einheit 4: Eigenschaften der Fourier-Transformation

Welche Manipulationen am Signal lassen sich im Frequenzbereich einfacher beschreiben als im Zeitbereich? Diese Einheit sammelt die Regeln, die später ständig wiederkehren: Verschieben, Modulieren, Skalieren, Ableiten, Falten und Energie vergleichen.

Die folgenden Eigenschaften sind oft wichtiger als einzelne Integrale.

## 4.0 Arbeitsweg durch die Werkzeugkiste

Diese Einheit ist dichter als die vorherigen: Sie ist keine lange Einzelrechnung, sondern eine Sammlung von Werkzeugen. Arbeite deshalb in drei Durchgängen:

1. **Erst Bedeutung lesen:** Was passiert mit Betrag, Phase, Breite oder Energie?
2. **Dann eine Formel prüfen:** Setze ein einfaches Beispiel wie $x(t)=\cos(3t)$, einen Rechteckpuls oder eine Gaußfunktion ein.
3. **Zum Schluss Regeln kombinieren:** Viele Aufgaben bestehen daraus, zwei Operationen nacheinander korrekt zu ordnen.

Für den ersten Durchgang sind besonders wichtig: Zeitverschiebung, Frequenzverschiebung, Faltung und Symmetrietabelle. Skalierung, Ableitung und Parseval kannst du danach als Vertiefung ergänzen.

## 4.1 Linearität

Wenn

$$
x(t) \leftrightarrow X(\omega), \qquad y(t)\leftrightarrow Y(\omega),
$$

dann gilt:

$$
ax(t)+by(t) \leftrightarrow aX(\omega)+bY(\omega).
$$

## 4.2 Zeitverschiebung

$$
x(t-t_0) \leftrightarrow e^{-i\omega t_0}X(\omega).
$$

Eine Verschiebung im Zeitbereich ändert die Phase im Frequenzbereich.

**Beweis (musterhaft, weil derselbe Trick überall wiederkehrt):** Substitution $u=t-t_0$ im Definitionsintegral liefert
$$
\int_{-\infty}^{\infty} x(t-t_0)e^{-i\omega t}\,dt
= \int_{-\infty}^{\infty} x(u)e^{-i\omega(u+t_0)}\,du
= e^{-i\omega t_0}\int_{-\infty}^{\infty} x(u)e^{-i\omega u}\,du
= e^{-i\omega t_0}X(\omega).
$$
Die übrigen Eigenschaften in diesem Kapitel folgen mit analogen Substitutionen oder partieller Integration.

## 4.3 Frequenzverschiebung

$$
e^{i\omega_0t}x(t) \leftrightarrow X(\omega-\omega_0).
$$

Multiplikation mit einer komplexen Schwingung verschiebt das Spektrum. Mit $\cos(\omega_c t)=\tfrac12(e^{i\omega_c t}+e^{-i\omega_c t})$ folgt sofort die **Modulationsregel**:

$$
x(t)\cos(\omega_c t)\leftrightarrow \tfrac12\bigl[X(\omega-\omega_c)+X(\omega+\omega_c)\bigr].
$$

Genau dieser Mechanismus erklärt das AM-Signal in [§7.7](einheit-7.md#77-typische-anwendung-am-signal): ein Tiefpass-Spektrum $X$ wird durch die Trägerschwingung in zwei Kopien um $\pm\omega_c$ gespiegelt — die spätere Bedrosian-Bedingung verlangt, dass diese Kopien sich nicht überlappen.

**Zwischenstopp 1.** Ohne zu rechnen: Eine Zeitverschiebung verändert die Phase, aber nicht den Betrag des Spektrums. Eine Multiplikation mit $e^{i\omega_0t}$ verschiebt dagegen das ganze Spektrum. Wenn du diese beiden Sätze verwechselst, lies §4.2 und §4.3 noch einmal mit einem Skizzenbeispiel.

## 4.4 Skalierung

Für $a\ne0$:

$$
x(at) \leftrightarrow \frac{1}{|a|}X\left(\frac{\omega}{a}\right).
$$

Zeitliche Stauchung führt zu spektraler Streckung.

## 4.5 Ableitung

Unter der Voraussetzung, dass $x$ und $x'$ integrierbar sind und $x(t)\to0$ für $|t|\to\infty$, gilt:

$$
\frac{d}{dt}x(t) \leftrightarrow i\omega X(\omega).
$$

Beweis durch partielle Integration; die Randterme verschwinden gerade wegen $x(t)\to0$. Die Regel zeigt: Ableiten verstärkt hohe Frequenzen, weil der Faktor $i\omega$ für große $|\omega|$ groß wird.

## 4.6 Faltung

Die Faltung zweier Funktionen ist:

$$
(x*h)(t)=\int_{-\infty}^{\infty}x(\tau)h(t-\tau)\,d\tau.
$$

Im Frequenzbereich gilt:

$$
x*h \leftrightarrow X(\omega)H(\omega).
$$

Faltung im Zeitbereich wird Multiplikation im Frequenzbereich.

Umgekehrt gilt:

$$
x(t)h(t) \leftrightarrow \frac{1}{2\pi}(X*H)(\omega).
$$

**Zwischenstopp 2.** Merke die Paarung bewusst:

- Faltung in der Zeit wird Multiplikation im Frequenzbereich.
- Multiplikation in der Zeit wird Faltung im Frequenzbereich.

Der Faktor $1/(2\pi)$ im zweiten Satz kommt nur aus unserer Fourier-Konvention.

## 4.7 Parseval-Identität (Plancherel)

Für $x\in L^2(\mathbb R)$ gilt:

$$
\int_{-\infty}^{\infty}|x(t)|^2\,dt
=
\frac{1}{2\pi}\int_{-\infty}^{\infty}|X(\omega)|^2\,d\omega.
$$

Die Energie eines Signals kann im Zeit- oder Frequenzbereich gemessen werden.

Allgemeiner gilt für innere Produkte:

$$
\langle x,y\rangle_t = \frac{1}{2\pi}\langle X,Y\rangle_\omega.
$$

Die Fourier-Transformation ist also eine Isometrie auf $L^2$ bis auf den konventionsbedingten Faktor $2\pi$: Abstände und Winkel im Signalraum bleiben im Frequenzraum erhalten, nur die Skala ändert sich.

## 4.8 Symmetrien reeller und gerader/ungerader Signale

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

**Zwischenstopp 3.** Die Tabelle ist ein Diagnosewerkzeug: Wenn dein numerisches Spektrum eines reellen Signals nicht hermitesch ist, stimmt meistens die Frequenzachse, die Zentrierung oder die komplexe Auswertung nicht.

## 4.9 Visualisierung

![Faltung zweier Rechteckpulse ergibt einen Dreieckspuls; Multiplikation der Sinc-Spektren ergibt sinc²](bilder/einheit-4.png)

Zwei identische Rechteckpulse werden gefaltet — heraus kommt der klassische Dreieckspuls. Im Frequenzbereich entspricht das einfach der punktweisen Multiplikation der beiden Sinc-Spektren, die das bekannte $\operatorname{sinc}^2$-Profil ergibt (nichtnegativ, weil Quadrat).

Kernidee in Python (vollständiges Skript: [`scripts/einheit-4.py`](scripts/einheit-4.py)):

```python
import numpy as np

t = np.linspace(-3, 3, 4000)
dt = t[1] - t[0]

rect = np.where(np.abs(t) <= 0.5, 1.0, 0.0)
triangle = np.convolve(rect, rect, mode="same") * dt   # = (rect * rect)(t)
```

## Übungen zu Einheit 4

1. Was passiert im Frequenzbereich, wenn ein Signal zeitlich verschoben wird?
2. Warum verstärkt Ableiten hohe Frequenzen?
3. Was ist der Vorteil des Faltungssatzes?
4. Ein Filter hat Spektrum $H(\omega)$. Was ist das Spektrum des gefilterten Signals $y=x*h$?
5. Ein Signal wird zuerst gespiegelt und dann verschoben: $y(t)=x(-(t-t_0))=x(t_0-t)$. Was passiert mit $X(\omega)$?
6. Transfer: Ein Signal wird zuerst um $t_0$ verzögert und dann mit $e^{i\omega_c t}$ moduliert:
   $$
   y(t)=e^{i\omega_ct}x(t-t_0).
   $$
   Bestimme $Y(\omega)$. Wo zeigt sich die Reihenfolge der Operationen?

## Selbstcheck zu Einheit 4

- [ ] Ich kann erklären, wie eine Zeitverschiebung Betrag und Phase des Spektrums verändert.
- [ ] Ich kann die Modulationsregel aus der Frequenzverschiebung herleiten.
- [ ] Ich kann begründen, warum Faltung im Zeitbereich Multiplikation im Frequenzbereich wird.
- [ ] Ich kann Parseval als Energieerhaltung interpretieren.
- [ ] Ich kann die Symmetrietabelle auf ein konkretes Beispiel anwenden.
- [ ] Ich kann zwei Signaloperationen nacheinander in die richtige Frequenzbereichsform übersetzen.

Lösungen: [loesungen/einheit-4.md](loesungen/einheit-4.md)

---

[Zurück: Einheit 3 — Fourier-Transformation](einheit-3.md) · [Index](README.md) · [Weiter: Einheit 5 — DFT und FFT](einheit-5.md)
