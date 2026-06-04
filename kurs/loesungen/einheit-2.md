# Lösungen zu Einheit 2: Fourier-Reihen

Aufgabenstellung: [Einheit 2 — Übungen](../einheit-2.md#übungen-zu-einheit-2)

## Lösung 1

Aus

$$\cos \theta=\frac{e^{i\theta}+e^{-i\theta}}{2}$$

folgt mit $\theta=3\omega_0t$:

$$2\cos(3\omega_0t) =e^{i3\omega_0t}+e^{-i3\omega_0t}.$$

Also sind die einzigen von null verschiedenen Koeffizienten

$$c_3=1,\qquad c_{-3}=1.$$

Die reelle Kosinusamplitude $2$ verteilt sich auf die beiden zweiseitigen Koeffizienten.

## Lösung 2

Aus

$$\sin \theta=\frac{e^{i\theta}-e^{-i\theta}}{2i}$$

folgt:

$$4\sin(2\omega_0t) =\frac{4}{2i}\left(e^{i2\omega_0t}-e^{-i2\omega_0t}\right) =-2i\thinspace e^{i2\omega_0t}+2i\thinspace e^{-i2\omega_0t}.$$

Daher:

$$c_2=-2i,\qquad c_{-2}=2i.$$

## Lösung 3

Für reelle Signale muss gelten:

$$c_{-n}=\overline{c_n}.$$

Dann ist

$$c_ne^{in\omega_0t}+c_{-n}e^{-in\omega_0t} = c_ne^{in\omega_0t}+\overline{c_ne^{in\omega_0t}} =2\mathrm{Re}\left(c_ne^{in\omega_0t}\right),$$

also reell. Positive und negative Frequenzen treten deshalb paarweise auf.

## Lösung 4

Die Grundfrequenz ist $\omega_0=2\pi/T$. Oberwellen sind ganzzahlige Vielfache davon:

```math
2\omega_0,\;3\omega_0,\;4\omega_0,\ldots
```

Der Index $n$ zählt also, wie viele Grundschwingungen in eine Periode passen.

## Lösung 5

Eine einfache Wahl ist jede ungerade $2\pi$-periodische Funktion, zum Beispiel

$$f(t)=\sin t+\frac12\sin(3t).$$

In reeller Schreibweise enthält ihre Fourier-Reihe nur Sinus-Terme. Der Grund ist die Symmetrie:

$$f(-t)=-f(t).$$

Kosinus-Terme sind gerade, sie können zu einer ungeraden Funktion keinen Beitrag leisten. Allgemeiner gilt: Ungerade reelle Funktionen haben nur Sinus-Terme; gerade reelle Funktionen haben nur Kosinus-Terme. In komplexer Schreibweise zeigt sich dieselbe Aussage in rein imaginären, ungeraden Koeffizienten.

Was du daraus mitnehmen solltest: Fehlende Terme sind oft keine Rechenzufälle, sondern Symmetrieinformationen.

## Lösung 6

Das kann für ein reellwertiges Signal nicht stimmen. Für reelle Signale gilt immer

$$c_{-n}=\overline{c_n}.$$

Wenn $c_3=2$ ist, muss also mindestens

$$c_{-3}=2$$

hinzukommen. Dann ergibt das Paar

$$2e^{i3\omega_0t}+2e^{-i3\omega_0t}=4\cos(3\omega_0t),$$

also ein reelles Signal. Nur $2e^{i3\omega_0t}$ allein wäre komplexwertig.

## Lösung 7

Wir setzen in der Definition $c_n=\frac{1}{T}\int_0^T f(t)e^{-in\omega_0 t}\thinspace dt$ die Substitution $t\to -t$ ein. Auf einem zentrierten Intervall $[-T/2,T/2]$ (das wegen Periodizität dasselbe Integral liefert) wird das Substitutions­integral übersichtlicher:

$$c_n=\frac{1}{T}\int_{-T/2}^{T/2} f(t)e^{-in\omega_0 t}\thinspace dt.$$

Substitution $u=-t$, $du=-dt$ kehrt die Integrationsgrenzen um:

$$c_n=\frac{1}{T}\int_{-T/2}^{T/2} f(-u)e^{in\omega_0 u}\thinspace du.$$

**Fall 1 — $f$ gerade** ($f(-t)=f(t)$):

$$c_n=\frac{1}{T}\int_{-T/2}^{T/2} f(u)e^{in\omega_0 u}\thinspace du = \overline{c_n}\quad\text{(weil $f$ reell ist)}.$$

Aus $c_n=\overline{c_n}$ folgt $c_n\in\mathbb R$ — **gerade Signale haben reelle Koeffizienten**.

**Fall 2 — $f$ ungerade** ($f(-t)=-f(t)$):

$$c_n=-\frac{1}{T}\int_{-T/2}^{T/2} f(u)e^{in\omega_0 u}\thinspace du = -\overline{c_n}.$$

Aus $c_n=-\overline{c_n}$ folgt $c_n+\overline{c_n}=2\mathrm{Re}(c_n)=0$, also $\mathrm{Re}(c_n)=0$. Die Koeffizienten sind **rein imaginär** — **ungerade reelle Signale haben rein imaginäre Koeffizienten**.

**Rechteckwelle aus §2.6.** Sie ist auf $(-\pi,\pi)$ definiert durch $f(t)=+1$ für $0 < t < \pi$ und $f(t)=-1$ für $-\pi < t < 0$. Es gilt $f(-t)=-f(t)$, sie ist also **ungerade**. Die Vorhersage: $c_n$ rein imaginär. Das gefundene $c_n=-\tfrac{2i}{\pi n}$ (für ungerade $n$) ist genau das — der Faktor $-i$ macht den Koeffizienten rein imaginär, und die $c_0=0$-Aussage in §2.6 bestätigt zusätzlich, dass eine ungerade Funktion keinen Gleichanteil hat (er wäre als $\mathrm{Re}(c_0)$ präsent, ist aber bei rein imaginären Koeffizienten konsequent null).

Was du daraus mitnehmen solltest: Symmetrie ist ein Diagnosewerkzeug. Wer in einer numerischen Rechnung *gerade* Symmetrie des Zeitsignals annimmt und *komplexe* $c_n$ erhält, hat fast immer einen Implementierungsfehler — Zentrierung der Zeitachse, Fenstergrenzen, oder die komplex-konjugierte Definition.

---

[Zurück: Lösungen zu Einheit 1](einheit-1.md) · [Zurück zur Einheit](../einheit-2.md) · [Lösungs-Index](README.md) · [Weiter: Lösungen zu Einheit 3](einheit-3.md)
