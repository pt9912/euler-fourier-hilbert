# Einheit 4a: Eigenschaften der Fourier-Transformation — Verschieben, Modulieren, Skalieren, Ableiten

> **Hauptschwelle dieser Einheit.** Jede Signaloperation hat *genau einen* spezifischen Effekt im Frequenzbereich: Zeitverschiebung dreht nur die Phase, Modulation verschiebt nur die Lage, Skalierung dehnt nur die Breite, Ableitung gewichtet nur die hohen Frequenzen. Wer diese **Disjunktheit der Wirkungen** verinnerlicht hat, muss bei zusammengesetzten Operationen nicht mehr raten — er stapelt die Effekte in der gegebenen Reihenfolge.

Welche Manipulationen am Signal lassen sich im Frequenzbereich einfacher beschreiben als im Zeitbereich? Diese erste Hälfte sammelt die punktweisen Werkzeuge: Linearität, Verschiebung, Modulation, Skalierung und Ableitung. Die strukturellen Werkzeuge — Faltung, Energie, Symmetrien — folgen in [Einheit 4b](einheit-4b.md).

## 4a.0 Arbeitsweg durch die Werkzeugkiste

Diese Einheit ist keine lange Einzelrechnung, sondern eine Sammlung von Werkzeugen. Arbeite in drei Durchgängen:

1. **Erst Bedeutung lesen:** Was passiert mit Betrag, Phase oder Breite?
2. **Dann eine Formel prüfen:** Setze ein einfaches Beispiel wie $x(t)=\cos(3t)$, einen Rechteckpuls oder eine Gaußfunktion ein.
3. **Zum Schluss Regeln kombinieren:** Viele Aufgaben bestehen daraus, zwei Operationen nacheinander korrekt zu ordnen.

Im ersten Durchgang sind Zeitverschiebung (§4a.2) und Frequenzverschiebung (§4a.3) das Wichtigste, weil sie überall wiederkehren — auch in der Modulationsregel und später bei der Bedrosian-Bedingung.

## 4a.1 Linearität

Wenn

```math
x(t) \leftrightarrow X(\omega), \qquad y(t)\leftrightarrow Y(\omega),
```

dann gilt:

```math
ax(t)+by(t) \leftrightarrow aX(\omega)+bY(\omega).
```

## 4a.2 Zeitverschiebung

```math
x(t-t_0) \leftrightarrow e^{-i\omega t_0}X(\omega).
```

Eine Verschiebung im Zeitbereich ändert die Phase im Frequenzbereich.

**Beweis (musterhaft, weil derselbe Trick überall wiederkehrt):** Substitution $u=t-t_0$ im Definitionsintegral liefert
```math
\int_{-\infty}^{\infty} x(t-t_0)e^{-i\omega t}\,dt
= \int_{-\infty}^{\infty} x(u)e^{-i\omega(u+t_0)}\,du
= e^{-i\omega t_0}\int_{-\infty}^{\infty} x(u)e^{-i\omega u}\,du
= e^{-i\omega t_0}X(\omega).
```
Die übrigen Eigenschaften in diesem Kapitel folgen mit analogen Substitutionen oder partieller Integration.

## 4a.3 Frequenzverschiebung

```math
e^{i\omega_0t}x(t) \leftrightarrow X(\omega-\omega_0).
```

Multiplikation mit einer komplexen Schwingung verschiebt das Spektrum. Mit $\cos(\omega_c t)=\tfrac12(e^{i\omega_c t}+e^{-i\omega_c t})$ folgt sofort die **Modulationsregel**:

```math
x(t)\cos(\omega_c t)\leftrightarrow \tfrac12\bigl[X(\omega-\omega_c)+X(\omega+\omega_c)\bigr].
```

Genau dieser Mechanismus erklärt das AM-Signal in [§7.7](einheit-7.md#77-typische-anwendung-am-signal): ein Tiefpass-Spektrum $X$ wird durch die Trägerschwingung in zwei Kopien um $\pm\omega_c$ gespiegelt — die spätere Bedrosian-Bedingung verlangt, dass diese Kopien sich nicht überlappen.

**Zwischenstopp.** Ohne zu rechnen: Eine Zeitverschiebung verändert die Phase, aber nicht den Betrag des Spektrums. Eine Multiplikation mit $e^{i\omega_0t}$ verschiebt dagegen das ganze Spektrum. Wenn du diese beiden Sätze verwechselst, lies §4a.2 und §4a.3 noch einmal mit einem Skizzenbeispiel.

## 4a.4 Skalierung

Für $a\ne0$:

```math
x(at) \leftrightarrow \frac{1}{|a|}X\left(\frac{\omega}{a}\right).
```

Zeitliche Stauchung führt zu spektraler Streckung.

## 4a.5 Ableitung

Unter der Voraussetzung, dass $x$ und $x'$ integrierbar sind und $x(t)\to0$ für $|t|\to\infty$, gilt:

```math
\frac{d}{dt}x(t) \leftrightarrow i\omega X(\omega).
```

Beweis durch partielle Integration; die Randterme verschwinden gerade wegen $x(t)\to0$. Die Regel zeigt: Ableiten verstärkt hohe Frequenzen, weil der Faktor $i\omega$ für große $|\omega|$ groß wird.

Diese Regel hat den DGL-Beweis der Gauß-Transformierten in [§3.7](einheit-3.md#37-beispiel-gaußfunktion) im Hintergrund gestützt — dort wurde dieselbe partielle Integration ad hoc geführt; hier ist sie systematisch.

## 4a.6 Integrierendes Beispiel: alle Regeln in einem Signal

> **Pacing-Hinweis.** Dieser Abschnitt ist eine **Vertiefung**, nicht Teil des ersten Lese-Durchgangs. Empfohlene Reihenfolge: Erst §4a.1–§4a.5 lesen und die Übungen 1–4 bearbeiten, danach §4a.6 als zusammenfassendes Beispiel. Wer §4a.6 *vor* den Übungen liest, kann der gestapelten Rechnung folgen, übt aber nicht die Werkzeuge — der Lerngewinn ist klein.

Damit die Werkzeuge nicht isoliert bleiben, durchläuft das folgende Beispiel die Regeln in einer einzigen Rechnung. Es ist als **Faded Worked Example** strukturiert: Schritt 1 ist vollständig vorgeführt, ab Schritt 2 wirst du gebeten, jeweils einen kleinen Teil selbst zu vervollständigen, bevor du weiterliest.

Sei $x(t)=e^{-t^2}$ mit bekannter Transformierter
$$X(\omega)=\sqrt{\pi}\thinspace e^{-\omega^2/4}\quad\text{(aus §3.7)}.$$

Wir konstruieren schrittweise das Signal
$$y(t)=\frac{d}{dt}\Bigl[x\bigl(a(t-t_0)\bigr)\cos(\omega_c t)\Bigr]$$
und berechnen sein Spektrum. Die Rechnung zeigt typisch, wie sich die Phasenfaktoren stapeln.

**Schritt 1 — Skalierung (§4a.4) — vollständig vorgeführt.** Für $u(t)=x(at)$ mit $a>0$ liefert die Skalierungsregel
$$U(\omega)=\frac{1}{a}X\left(\frac{\omega}{a}\right).$$
Der Faktor $1/a$ erhält die Energie ($\Vert u\Vert^2=\Vert x\Vert^2/a$, was über Parseval auch im Frequenzbereich gelten muss), und $\omega/a$ verschiebt die spektrale Breite umgekehrt zur Zeitskalierung.

**Schritt 2 — Zeitverschiebung (§4a.2) — selbst probieren.**
*Versuch's selbst:* Welche Regel wendest du auf $u(t)$ an, um $v(t)=u(t-t_0)$ zu bekommen, und welcher Faktor steht vor $U(\omega)$?

<details>
<summary>Lösung Schritt 2</summary>

Für $v(t)=u(t-t_0)=x\bigl(a(t-t_0)\bigr)$ liefert die Verschiebungsregel
$$V(\omega)=e^{-i\omega t_0}U(\omega)=\frac{1}{a}e^{-i\omega t_0}X\left(\frac{\omega}{a}\right).$$
Beachte: der Phasenfaktor trägt $\omega$ (nicht $\omega/a$), weil die Verschiebung *im Ausgangssignal* $u$ erfolgt — Reihenfolge zählt.

</details>

**Schritt 3 — Modulation (§4a.3) — Skizze allein, dann Lösung lesen.**
*Versuch's selbst:* Skizziere ohne Rechnung das Spektrum von $w(t)=v(t)\cos(\omega_c t)$. Wie viele Kopien des $V$-Spektrums bekommst du, und wo liegen sie?

<details>
<summary>Lösung Schritt 3</summary>

Mit $w(t)=v(t)\cos(\omega_c t)$ ergibt die Modulationsregel
$$W(\omega)=\tfrac12\bigl[V(\omega-\omega_c)+V(\omega+\omega_c)\bigr].$$
Zwei Kopien (reeller Träger), jede mit Faktor $\tfrac12$, zentriert um $\pm\omega_c$.

</details>

**Schritt 4 — Ableitung (§4a.5) — alleine vervollständigen.**
*Versuch's selbst:* Welcher Faktor multipliziert das Spektrum, wenn du $y(t)=w'(t)$ bildest? Stelle den vollständigen Ausdruck für $Y(\omega)$ auf, indem du die Faktoren aus den Schritten 1–4 stapelst.

<details>
<summary>Lösung Schritt 4 (Endergebnis)</summary>

Ableitung liefert den Faktor $i\omega$:
$$Y(\omega)=i\omega W(\omega) =\frac{i\omega}{2a}\bigl[e^{-i(\omega-\omega_c)t_0}X\bigl(\tfrac{\omega-\omega_c}{a}\bigr)+e^{-i(\omega+\omega_c)t_0}X\bigl(\tfrac{\omega+\omega_c}{a}\bigr)\bigr].$$

</details>

**Plausibilitätsprüfung.** Setze $a=1$, $t_0=0$, $\omega_c=0$ — dann verschwinden Skalierung, Verschiebung und Modulation, und $Y(\omega)$ kollabiert zu $i\omega X(\omega)$, was genau der reinen Ableitungsregel entspricht. Setze $a=1$, $t_0=0$, behalte nur $\omega_c\ne 0$: $Y$ wird $\tfrac{i\omega}{2}[X(\omega-\omega_c)+X(\omega+\omega_c)]$ — die Ableitung eines amplitudenmodulierten Gauß-Pulses. Beide Spezialfälle sind unmittelbar nachprüfbar.

**Was du daraus mitnehmen solltest.** Die Rechnung hat zwei Lehrwerte:

1. **Reihenfolge entscheidet:** Skalierung *vor* Verschiebung erzeugt einen Phasenfaktor in $\omega$, nicht in $\omega/a$. Eine andere Reihenfolge würde einen anderen Faktor liefern (vgl. Übung 3 und 4).
2. **Lineare Operationen sind disjunkt:** Jede Regel verändert genau einen Aspekt — Betragsform (Skalierung), Phase (Verschiebung), Lage (Modulation), Gewichtung (Ableitung). Sich an dieser Trennung zu orientieren ist meist einfacher als alle Faktoren auf einmal anzustellen.

## Übungen zu Einheit 4a

1. Was passiert im Frequenzbereich, wenn ein Signal zeitlich verschoben wird?
2. Warum verstärkt Ableiten hohe Frequenzen?
3. Ein Signal wird zuerst gespiegelt und dann verschoben: $y(t)=x(-(t-t_0))=x(t_0-t)$. Was passiert mit $X(\omega)$?
4. Transfer: Ein Signal wird zuerst um $t_0$ verzögert und dann mit $e^{i\omega_c t}$ moduliert:
   $$y(t)=e^{i\omega_ct}x(t-t_0).$$
   Bestimme $Y(\omega)$. Wo zeigt sich die Reihenfolge der Operationen?
5. Konstruktion: Gib zwei verschiedene reelle Signale $y_1(t)\ne y_2(t)$ mit identischen Betragsspektren $|Y_1(\omega)|=|Y_2(\omega)|$ an. Welche Eigenschaft aus §4a.2 oder §4a.3 verbindet sie, und worin unterscheiden sich ihre Phasenspektren?
6. Fehlerdiagnose: Jemand schreibt die Modulationsregel als $x(t)\cos(\omega_c t)\leftrightarrow X(\omega-\omega_c)$ — also eine einzige verschobene Kopie ohne Vorfaktor. Wo genau steckt der Fehler? Korrigiere die Aussage und prüfe sie am Spezialfall $x(t)\equiv 1$, $\omega_c=5$.

## Selbstcheck zu Einheit 4a

- [ ] Ich kann erklären, wie eine Zeitverschiebung Betrag und Phase des Spektrums verändert.
- [ ] Ich kann die Modulationsregel aus der Frequenzverschiebung herleiten.
- [ ] Ich kann die Skalierungsregel an einem Beispiel anwenden und das Zeit-Frequenz-Verhalten qualitativ beschreiben.
- [ ] Ich kann begründen, warum Ableiten hohe Frequenzen verstärkt.
- [ ] Ich kann zwei Signaloperationen nacheinander in die richtige Frequenzbereichsform übersetzen.

Lösungen: [loesungen/einheit-4a.md](loesungen/einheit-4a.md)

---

[Zurück: Einheit 3 — Fourier-Transformation](einheit-3.md) · [Index](README.md) · [Weiter: Einheit 4b — Faltung, Energie, Symmetrien](einheit-4b.md)
