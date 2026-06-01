# Mathe-Kurs: Euler-Formel, Fourier-Transformation und Hilbert-Transformation

Dieser Kurs verbindet drei Themen, die in Signalverarbeitung, Physik, Elektrotechnik, Akustik, Bildverarbeitung und angewandter Mathematik ständig zusammen auftreten:

1. Die **Euler-Formel** beschreibt Schwingungen mit komplexen Zahlen.
2. Die **Fourier-Transformation** zerlegt Signale in Frequenzen.
3. Die **Hilbert-Transformation** erzeugt Phasenverschiebungen und das analytische Signal.

## Zielgruppe

Der Kurs ist für Lernende gedacht, die Analysis-Grundlagen kennen und sicher mit Sinus, Kosinus, Ableitungen und Integralen umgehen können. Komplexe Zahlen werden kurz wiederholt.

## Lernziele

Nach dem Kurs kannst du:

- die Euler-Formel herleiten und geometrisch interpretieren,
- periodische und nichtperiodische Signale mit komplexen Exponentialfunktionen beschreiben,
- Fourier-Reihen und Fourier-Transformationen berechnen und interpretieren,
- zentrale Fourier-Eigenschaften wie Verschiebung, Faltung und Differentiation anwenden,
- die Hilbert-Transformation im Zeit- und Frequenzbereich erklären,
- ein analytisches Signal bilden und Betrag, Phase und Momentanfrequenz interpretieren.

## Kursplan

| Einheit | Thema | Kernidee |
| --- | --- | --- |
| 1 | Komplexe Zahlen und Euler-Formel | Rotation und Schwingung sind dieselbe Struktur |
| 2 | Fourier-Reihen | Periodische Signale als Summe komplexer Schwingungen |
| 3 | Fourier-Transformation | Nichtperiodische Signale als kontinuierliches Frequenzspektrum |
| 4 | Fourier-Eigenschaften | Verschieben, Skalieren, Falten, Ableiten |
| 5 | Diskrete Signale | DFT, FFT, Abtastung und Nyquist-Grenze |
| 6 | Hilbert-Transformation | Frequenzabhängige Phasenverschiebung um 90 Grad |
| 7 | Analytisches Signal | Amplitude, Phase und Momentanfrequenz |
| 8 | Zusammenfassung und Übungen | Verknüpfung aller drei Themen |

---

# Einheit 1: Komplexe Zahlen und Euler-Formel

## 1.1 Komplexe Zahlen

Eine komplexe Zahl hat die Form

$$
z = a + ib
$$

mit Realteil \(a\), Imaginärteil \(b\) und \(i^2 = -1\).

Man kann \(z\) als Punkt oder Vektor in der komplexen Ebene ansehen:

- \(a\): horizontale Achse,
- \(b\): vertikale Achse,
- \(|z| = \sqrt{a^2 + b^2}\): Abstand vom Ursprung,
- \(\arg(z)\): Winkel zur positiven reellen Achse.

## 1.2 Polarform

Jede komplexe Zahl ungleich null lässt sich schreiben als

$$
z = r(\cos \varphi + i\sin \varphi)
$$

mit

$$
r = |z|, \qquad \varphi = \arg(z).
$$

## 1.3 Euler-Formel

Die Euler-Formel lautet:

$$
e^{i\varphi} = \cos \varphi + i\sin \varphi.
$$

Damit wird die Polarform besonders einfach:

$$
z = r e^{i\varphi}.
$$

## 1.4 Herleitung über Taylor-Reihen

Die Taylor-Reihen von Exponentialfunktion, Sinus und Kosinus sind:

$$
e^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots
$$

$$
\cos x = 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \cdots
$$

$$
\sin x = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \cdots
$$

Setzt man \(x = i\varphi\), erhält man:

$$
e^{i\varphi}
= 1 + i\varphi + \frac{(i\varphi)^2}{2!}
+ \frac{(i\varphi)^3}{3!}
+ \frac{(i\varphi)^4}{4!}
+ \cdots
$$

Da \(i^2=-1\), \(i^3=-i\), \(i^4=1\), trennen sich reelle und imaginäre Terme:

$$
e^{i\varphi}
= \left(1 - \frac{\varphi^2}{2!} + \frac{\varphi^4}{4!} - \cdots \right)
+ i\left(\varphi - \frac{\varphi^3}{3!} + \frac{\varphi^5}{5!} - \cdots \right).
$$

Also:

$$
e^{i\varphi} = \cos \varphi + i\sin \varphi.
$$

## 1.5 Geometrische Bedeutung

Die Zahl \(e^{i\varphi}\) liegt auf dem Einheitskreis. Wenn \(\varphi\) wächst, rotiert der Punkt gegen den Uhrzeigersinn.

Multiplikation mit \(e^{i\alpha}\) bedeutet: Rotation um den Winkel \(\alpha\).

Beispiel:

$$
z = 2e^{i\pi/3}
$$

hat Betrag \(2\) und Winkel \(\pi/3 = 60^\circ\).

## 1.6 Nützliche Folgerungen

Aus der Euler-Formel folgen:

$$
\cos x = \frac{e^{ix}+e^{-ix}}{2}
$$

und

$$
\sin x = \frac{e^{ix}-e^{-ix}}{2i}.
$$

Diese beiden Gleichungen sind die Brücke zur Fourier-Analyse: Sinus und Kosinus werden durch komplexe Exponentialfunktionen ersetzt.

## Übungen zu Einheit 1

1. Schreibe \(3(\cos(\pi/4)+i\sin(\pi/4))\) in der Form \(re^{i\varphi}\).
2. Berechne \(e^{i\pi}\).
3. Zeige mit der Euler-Formel, dass \(\cos(-x)=\cos x\) und \(\sin(-x)=-\sin x\).
4. Was bewirkt die Multiplikation einer komplexen Zahl mit \(e^{i\pi/2}\)?

## Lösungen zu Einheit 1

1. \(3e^{i\pi/4}\).
2. \(e^{i\pi} = \cos \pi + i\sin \pi = -1\). Also \(e^{i\pi}+1=0\).
3. \(e^{-ix} = \cos(-x)+i\sin(-x)\). Außerdem gilt \(e^{-ix}=\cos x-i\sin x\). Vergleich der Real- und Imaginärteile liefert die Aussage.
4. Rotation um \(90^\circ\) gegen den Uhrzeigersinn.

---

# Einheit 2: Fourier-Reihen

## 2.1 Grundidee

Viele periodische Signale lassen sich als Summe einfacher Schwingungen schreiben. Statt Sinus und Kosinus verwendet man oft komplexe Exponentialfunktionen:

$$
e^{in\omega_0 t}
$$

mit Grundkreisfrequenz

$$
\omega_0 = \frac{2\pi}{T}.
$$

Hier ist \(T\) die Periode und \(n\) eine ganze Zahl.

## 2.2 Komplexe Fourier-Reihe

Für ein periodisches Signal \(f(t)\) mit Periode \(T\) gilt unter geeigneten Bedingungen:

$$
f(t) = \sum_{n=-\infty}^{\infty} c_n e^{in\omega_0 t}.
$$

Die Koeffizienten sind:

$$
c_n = \frac{1}{T}\int_{t_0}^{t_0+T} f(t)e^{-in\omega_0 t}\,dt.
$$

Die Zahl \(c_n\) sagt:

- wie stark die Frequenz \(n\omega_0\) vorkommt,
- mit welcher Phase sie vorkommt.

## 2.3 Warum funktioniert das?

Die Funktionen \(e^{in\omega_0 t}\) sind über eine Periode orthogonal:

$$
\frac{1}{T}\int_{0}^{T} e^{in\omega_0 t}e^{-im\omega_0 t}\,dt
=
\begin{cases}
1, & n=m,\\
0, & n\ne m.
\end{cases}
$$

Das ist ähnlich wie bei rechtwinkligen Vektoren im Raum: Man kann ein Signal auf eine Frequenzrichtung projizieren.

## 2.4 Beispiel: Reine Kosinusschwingung

Sei

$$
f(t) = \cos(\omega_0 t).
$$

Mit Euler:

$$
\cos(\omega_0 t)
= \frac{e^{i\omega_0 t}+e^{-i\omega_0 t}}{2}.
$$

Also sind nur zwei Koeffizienten ungleich null:

$$
c_1 = \frac12, \qquad c_{-1} = \frac12.
$$

## 2.5 Beispiel: Reine Sinusschwingung

Sei

$$
f(t)=\sin(\omega_0 t).
$$

Dann:

$$
\sin(\omega_0 t)
= \frac{e^{i\omega_0 t}-e^{-i\omega_0 t}}{2i}.
$$

Also:

$$
c_1 = \frac{1}{2i} = -\frac{i}{2},
\qquad
c_{-1} = -\frac{1}{2i} = \frac{i}{2}.
$$

## 2.6 Betrag und Phase

Ein Fourier-Koeffizient \(c_n\) ist komplex.

- \(|c_n|\) beschreibt die Stärke der Frequenz.
- \(\arg(c_n)\) beschreibt die Phase.

Für reellwertige Signale gilt:

$$
c_{-n} = \overline{c_n}.
$$

Das bedeutet: Positive und negative Frequenzen sind nicht unabhängig, wenn das Signal reell ist.

## Übungen zu Einheit 2

1. Bestimme die komplexen Fourier-Koeffizienten von \(f(t)=2\cos(3\omega_0t)\).
2. Bestimme die komplexen Fourier-Koeffizienten von \(f(t)=4\sin(2\omega_0t)\).
3. Warum treten bei reellen Signalen positive und negative Frequenzen paarweise auf?
4. Erkläre den Unterschied zwischen Grundfrequenz und Oberwelle.

## Lösungen zu Einheit 2

1. \(2\cos(3\omega_0t)=e^{i3\omega_0t}+e^{-i3\omega_0t}\). Also \(c_3=1\), \(c_{-3}=1\).
2. \(4\sin(2\omega_0t)=\frac{4}{2i}(e^{i2\omega_0t}-e^{-i2\omega_0t})\). Also \(c_2=-2i\), \(c_{-2}=2i\).
3. Weil ein einzelner komplexer Exponentialterm im Allgemeinen komplexwertig ist. Für ein reelles Signal müssen sich die Imaginärteile der positiven und negativen Frequenzen gegenseitig aufheben.
4. Die Grundfrequenz ist \(\omega_0\). Oberwellen sind ganzzahlige Vielfache \(n\omega_0\).

---

# Einheit 3: Fourier-Transformation

## 3.1 Von Fourier-Reihe zur Fourier-Transformation

Fourier-Reihen beschreiben periodische Signale. Viele reale Signale sind aber nicht periodisch: ein Puls, ein Messfenster, ein Ton mit Anfang und Ende.

Die Fourier-Transformation ersetzt die diskreten Frequenzen \(n\omega_0\) durch ein kontinuierliches Spektrum \(\omega\).

## 3.2 Definition

Wir verwenden die Konvention:

$$
X(\omega) = \mathcal{F}\{x(t)\}
= \int_{-\infty}^{\infty} x(t)e^{-i\omega t}\,dt.
$$

Die Rücktransformation lautet:

$$
x(t)
= \mathcal{F}^{-1}\{X(\omega)\}
= \frac{1}{2\pi}\int_{-\infty}^{\infty} X(\omega)e^{i\omega t}\,d\omega.
$$

## 3.3 Interpretation

Die Fourier-Transformation fragt für jede Kreisfrequenz \(\omega\):

> Wie stark ähnelt \(x(t)\) der Schwingung \(e^{i\omega t}\)?

Dabei liefert:

- \(|X(\omega)|\): Amplitudeninformation,
- \(\arg X(\omega)\): Phaseninformation.

## 3.4 Beispiel: Dirac-Impuls

Für den Dirac-Impuls \(\delta(t)\) gilt:

$$
\mathcal{F}\{\delta(t)\}=1.
$$

Ein unendlich kurzer Impuls enthält alle Frequenzen gleich stark.

## 3.5 Beispiel: Verschobener Impuls

Für \(\delta(t-t_0)\) gilt:

$$
\mathcal{F}\{\delta(t-t_0)\}=e^{-i\omega t_0}.
$$

Eine Zeitverschiebung erzeugt also eine frequenzabhängige Phase.

## 3.6 Beispiel: Rechteckpuls

Sei

$$
x(t)=
\begin{cases}
1, & |t|\le a,\\
0, & |t|>a.
\end{cases}
$$

Dann:

$$
X(\omega)
= \int_{-a}^{a} e^{-i\omega t}\,dt
= \frac{2\sin(\omega a)}{\omega}.
$$

Für \(\omega=0\) nimmt man den Grenzwert:

$$
X(0)=2a.
$$

Ein breiter Puls im Zeitbereich hat ein schmales Spektrum; ein schmaler Puls hat ein breites Spektrum.

## 3.7 Beispiel: Gaußfunktion

Für

$$
x(t)=e^{-at^2}, \qquad a>0
$$

ist auch die Fourier-Transformierte eine Gaußfunktion:

$$
X(\omega)=\sqrt{\frac{\pi}{a}}e^{-\omega^2/(4a)}.
$$

Die Gaußfunktion ist deshalb in Wahrscheinlichkeitstheorie, Quantenmechanik und Signalverarbeitung besonders wichtig.

## Übungen zu Einheit 3

1. Was ist der Unterschied zwischen Fourier-Reihe und Fourier-Transformation?
2. Berechne \(\mathcal{F}\{\delta(t-3)\}\).
3. Was passiert mit dem Spektrum eines Rechteckpulses, wenn der Puls im Zeitbereich breiter wird?
4. Warum enthält ein sehr kurzer Impuls viele Frequenzen?

## Lösungen zu Einheit 3

1. Fourier-Reihen verwenden diskrete Frequenzen für periodische Signale. Fourier-Transformationen verwenden ein kontinuierliches Spektrum für nichtperiodische Signale.
2. \(\mathcal{F}\{\delta(t-3)\}=e^{-i3\omega}\).
3. Das Spektrum wird schmaler.
4. Ein kurzer Impuls muss aus vielen schnell wechselnden Schwingungsanteilen zusammengesetzt werden. Zeitliche Konzentration und spektrale Ausdehnung stehen in einem Gegenspiel.

---

# Einheit 4: Eigenschaften der Fourier-Transformation

Die folgenden Eigenschaften sind oft wichtiger als einzelne Integrale.

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

## 4.3 Frequenzverschiebung

$$
e^{i\omega_0t}x(t) \leftrightarrow X(\omega-\omega_0).
$$

Multiplikation mit einer komplexen Schwingung verschiebt das Spektrum.

## 4.4 Skalierung

Für \(a\ne0\):

$$
x(at) \leftrightarrow \frac{1}{|a|}X\left(\frac{\omega}{a}\right).
$$

Zeitliche Stauchung führt zu spektraler Streckung.

## 4.5 Ableitung

$$
\frac{d}{dt}x(t) \leftrightarrow i\omega X(\omega).
$$

Ableiten verstärkt hohe Frequenzen.

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

## 4.7 Parseval-Identität

Für geeignete Signale gilt:

$$
\int_{-\infty}^{\infty}|x(t)|^2\,dt
=
\frac{1}{2\pi}\int_{-\infty}^{\infty}|X(\omega)|^2\,d\omega.
$$

Die Energie eines Signals kann im Zeit- oder Frequenzbereich gemessen werden.

## Übungen zu Einheit 4

1. Was passiert im Frequenzbereich, wenn ein Signal zeitlich verschoben wird?
2. Warum verstärkt Ableiten hohe Frequenzen?
3. Was ist der Vorteil des Faltungssatzes?
4. Ein Filter hat Spektrum \(H(\omega)\). Was ist das Spektrum des gefilterten Signals \(y=x*h\)?

## Lösungen zu Einheit 4

1. Das Spektrum wird mit \(e^{-i\omega t_0}\) multipliziert. Der Betrag bleibt gleich, die Phase ändert sich.
2. Weil im Frequenzbereich mit \(i\omega\) multipliziert wird. Der Faktor wächst mit \(|\omega|\).
3. Komplizierte Faltungen im Zeitbereich werden einfache Multiplikationen im Frequenzbereich.
4. \(Y(\omega)=X(\omega)H(\omega)\).

---

# Einheit 5: Diskrete Signale, DFT und FFT

## 5.1 Warum diskret?

Computer speichern endlich viele Messwerte:

$$
x[0], x[1], \ldots, x[N-1].
$$

Die diskrete Fourier-Transformation (DFT) zerlegt diese Werte in diskrete Frequenzanteile.

## 5.2 Definition der DFT

Die DFT ist:

$$
X[k] = \sum_{n=0}^{N-1} x[n]e^{-i2\pi kn/N},
\qquad k=0,\ldots,N-1.
$$

Die inverse DFT ist:

$$
x[n] = \frac{1}{N}\sum_{k=0}^{N-1}X[k]e^{i2\pi kn/N}.
$$

## 5.3 Interpretation der Frequenzindizes

Wenn die Abtastrate \(f_s\) ist, gehört zum Index \(k\) die Frequenz

$$
f_k = \frac{k}{N}f_s.
$$

Diese Formel beschreibt zunächst die unsortierte DFT-Bin-Position. Für die physikalische Interpretation verwendet man meist die signierte Frequenz:

$$
f_k =
\begin{cases}
\frac{k}{N}f_s, & 0\le k\le \left\lfloor\frac{N}{2}\right\rfloor,\\
\frac{k-N}{N}f_s, & \left\lfloor\frac{N}{2}\right\rfloor<k<N.
\end{cases}
$$

Die Bins oberhalb der Nyquist-Grenze stehen also für negative Frequenzen. Für gerades \(N\) ist der Bin \(k=N/2\) der Nyquist-Bin und hat keine separate positive/negative Gegenfrequenz. Bei reellwertigen Signalen kommt zusätzlich konjugierte Symmetrie hinzu: positive und negative Frequenzanteile tragen redundante Information.

## 5.4 FFT

Die FFT ist kein anderes mathematisches Objekt als die DFT. Sie ist ein schneller Algorithmus zur Berechnung der DFT.

- Direkte DFT: ungefähr \(N^2\) Operationen.
- FFT: ungefähr \(N\log_2 N\) Operationen.

## 5.5 Abtastung und Nyquist-Grenze

Wenn ein kontinuierliches Signal mit Abtastrate \(f_s\) abgetastet wird, können Frequenzen bis höchstens

$$
f_N=\frac{f_s}{2}
$$

eindeutig dargestellt werden. Diese Grenze heißt Nyquist-Frequenz.

Frequenzen oberhalb dieser Grenze erscheinen als falsche niedrigere Frequenzen. Das nennt man Aliasing.

## Übungen zu Einheit 5

1. Was ist der Unterschied zwischen DFT und FFT?
2. Ein Signal wird mit \(f_s=1000\,\text{Hz}\) abgetastet. Was ist die Nyquist-Frequenz?
3. Warum ist Aliasing problematisch?
4. Was bedeutet der DFT-Koeffizient \(X[0]\)?

## Lösungen zu Einheit 5

1. Die DFT ist die mathematische Transformation. Die FFT ist ein schneller Algorithmus zur Berechnung der DFT.
2. \(500\,\text{Hz}\).
3. Hohe Frequenzen werden als falsche niedrigere Frequenzen sichtbar und können danach nicht mehr eindeutig rekonstruiert werden.
4. \(X[0]\) ist die Summe aller Samples. Bis auf Normierung entspricht das dem Gleichanteil.

---

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

## Lösungen zu Einheit 6

1. Sie multipliziert sie mit \(-i\), also mit einer Phasenverschiebung um \(-90^\circ\).
2. \(\sin(5t)\).
3. \(-\cos(5t)\).
4. Weil der Kern \(1/(t-\tau)\) bei \(\tau=t\) eine Singularität hat.

---

# Einheit 7: Analytisches Signal

## 7.1 Definition

Aus einem reellen Signal \(x(t)\) bildet man das analytische Signal:

$$
z(t)=x(t)+i\mathcal{H}\{x\}(t).
$$

Es kombiniert:

- Realteil: Originalsignal,
- Imaginärteil: Hilbert-Transformierte.

## 7.2 Frequenzbereich

Das analytische Signal enthält keine negativen Frequenzen:

$$
Z(\omega)=
\begin{cases}
2X(\omega), & \omega>0,\\
X(0), & \omega=0,\\
0, & \omega<0.
\end{cases}
$$

Negative Frequenzen werden entfernt, positive Frequenzen werden verdoppelt, und der Gleichanteil bleibt erhalten.

## 7.3 Beispiel: Kosinus

Sei

$$
x(t)=A\cos(\omega_0t+\varphi).
$$

Dann:

$$
\mathcal{H}\{x\}(t)=A\sin(\omega_0t+\varphi).
$$

Also:

$$
z(t)
= A\cos(\omega_0t+\varphi)+iA\sin(\omega_0t+\varphi)
= Ae^{i(\omega_0t+\varphi)}.
$$

Das analytische Signal macht Amplitude und Phase direkt sichtbar.

## 7.4 Hüllkurve

Die Hüllkurve ist der Betrag des analytischen Signals:

$$
A(t)=|z(t)|.
$$

Bei amplitudenmodulierten Signalen kann man so die langsam veränderliche Amplitude schätzen.

## 7.5 Momentane Phase

Die momentane Phase ist:

$$
\phi(t)=\arg z(t).
$$

Damit die Phase nicht bei \(\pi\) springt, verwendet man in numerischen Anwendungen oft eine entfaltete Phase.

## 7.6 Momentanfrequenz

Die Momentanfrequenz ist die zeitliche Ableitung der Phase:

$$
\omega_{\text{inst}}(t)=\frac{d}{dt}\phi(t).
$$

In Hertz:

$$
f_{\text{inst}}(t)=\frac{1}{2\pi}\frac{d}{dt}\phi(t).
$$

## 7.7 Typische Anwendung: AM-Signal

Betrachte ein Signal

$$
x(t)=A(t)\cos(\omega_ct),
$$

wobei \(A(t)\) langsam gegenüber der Trägerschwingung \(\cos(\omega_ct)\) variiert. Praktisch bedeutet das: \(A(t)\) ist bandbegrenzt deutlich unterhalb der Trägerfrequenz und im Idealfall nicht negativ.

Dann ist näherungsweise:

$$
z(t)\approx A(t)e^{i\omega_ct}.
$$

Die Hüllkurve \(|z(t)|\) approximiert dann \(A(t)\). Wenn \(A(t)\) das Vorzeichen wechseln kann, liefert die Hüllkurve eher \(|A(t)|\); bei Spektralüberlappung zwischen Modulation und Träger wird die Näherung schlechter.

## Übungen zu Einheit 7

1. Bilde das analytische Signal zu \(x(t)=3\cos(10t)\).
2. Was ist die Hüllkurve von \(z(t)=2e^{i(5t+\pi/4)}\)?
3. Was ist die Momentanfrequenz von \(z(t)=e^{i(7t)}\)?
4. Warum entfernt das analytische Signal negative Frequenzen?

## Lösungen zu Einheit 7

1. \(z(t)=3e^{i10t}\).
2. \(|z(t)|=2\).
3. \(\omega_{\text{inst}}=7\), also \(f_{\text{inst}}=7/(2\pi)\).
4. Weil \(x+i\mathcal{H}x\) im Frequenzbereich für \(\omega<0\) zu null wird: der Hilbert-Anteil löscht die negativen Frequenzen aus.

---

# Einheit 8: Gemeinsames Bild

## 8.1 Die Verbindung der drei Themen

Die Euler-Formel ist die Sprache:

$$
e^{i\omega t}=\cos(\omega t)+i\sin(\omega t).
$$

Die Fourier-Transformation nutzt diese Sprache, um Signale zu zerlegen:

$$
x(t)
=
\frac{1}{2\pi}\int_{-\infty}^{\infty}X(\omega)e^{i\omega t}\,d\omega.
$$

Die Hilbert-Transformation verändert die Phase dieser Frequenzanteile:

$$
X(\omega)
\mapsto
-i\operatorname{sgn}(\omega)X(\omega).
$$

Zusammen ergeben sie ein sehr starkes Werkzeug:

- Euler: komplexe Darstellung von Rotation und Schwingung,
- Fourier: Zerlegung in Schwingungen,
- Hilbert: Konstruktion der Quadratur-Komponente und des analytischen Signals.

## 8.2 Merksätze

1. Komplexe Exponentialfunktionen sind rotierende Zeiger.
2. Sinus und Kosinus sind Kombinationen positiver und negativer komplexer Frequenzen.
3. Fourier-Analyse misst, welche Frequenzen in einem Signal stecken.
4. Zeitverschiebung entspricht Phasenänderung.
5. Faltung im Zeitbereich entspricht Multiplikation im Frequenzbereich.
6. Die Hilbert-Transformation ist im Frequenzbereich besonders einfach.
7. Das analytische Signal entfernt negative Frequenzen, erhält den Gleichanteil und macht Amplitude und Phase zugänglich.

## 8.3 Abschlussaufgaben

### Aufgabe 1

Schreibe

$$
x(t)=5\cos(4t-\pi/3)
$$

als Summe komplexer Exponentialfunktionen.

### Aufgabe 2

Bestimme die Fourier-Transformierte von \(\delta(t-2)\).

### Aufgabe 3

Sei

$$
x(t)=\cos(8t).
$$

Bestimme:

1. \(\mathcal{H}\{x\}(t)\),
2. das analytische Signal \(z(t)\),
3. die Hüllkurve,
4. die Momentanfrequenz.

### Aufgabe 4

Ein lineares zeitinvariantes System hat Impulsantwort \(h(t)\). Erkläre mit Fourier-Transformation, warum die Ausgabe \(y(t)=x(t)*h(t)\) im Frequenzbereich durch \(Y(\omega)=X(\omega)H(\omega)\) beschrieben wird.

### Aufgabe 5

Ein Signal wird mit \(f_s=8000\,\text{Hz}\) abgetastet. Welche Frequenzen können ohne Aliasing dargestellt werden?

## Lösungen zu den Abschlussaufgaben

### Lösung 1

Mit Euler:

$$
5\cos(4t-\pi/3)
=
\frac{5}{2}e^{i(4t-\pi/3)}
+
\frac{5}{2}e^{-i(4t-\pi/3)}.
$$

### Lösung 2

$$
\mathcal{F}\{\delta(t-2)\}=e^{-i2\omega}.
$$

### Lösung 3

1. \(\mathcal{H}\{\cos(8t)\}=\sin(8t)\).
2. \(z(t)=\cos(8t)+i\sin(8t)=e^{i8t}\).
3. \(|z(t)|=1\).
4. \(\omega_{\text{inst}}=8\), also \(f_{\text{inst}}=8/(2\pi)=4/\pi\).

### Lösung 4

Die Ausgabe eines linearen zeitinvarianten Systems ist die Faltung von Eingabe und Impulsantwort:

$$
y(t)=x(t)*h(t).
$$

Der Faltungssatz sagt:

$$
\mathcal{F}\{x*h\}=X(\omega)H(\omega).
$$

Daher kann man das System im Frequenzbereich als frequenzabhängigen Verstärkungs- und Phasenfaktor \(H(\omega)\) auffassen.

### Lösung 5

Die Nyquist-Frequenz ist

$$
f_N=\frac{f_s}{2}=4000\,\text{Hz}.
$$

Ohne Aliasing darstellbar sind Frequenzen von \(0\) bis zur Nyquist-Grenze \(4000\,\text{Hz}\); praktisch arbeitet man meist knapp darunter und verwendet ein Anti-Aliasing-Filter.

---

# Weiterführende Projektideen

1. **Python-Notebook zur Fourier-Transformation**  
   Erzeuge Sinus-, Rechteck- und Gaußsignale und visualisiere Betrag und Phase ihrer FFT.

2. **Hilbert-Hüllkurve eines AM-Signals**  
   Simuliere \(x(t)=(1+0.5\cos(2\pi f_mt))\cos(2\pi f_ct)\) und extrahiere die Hüllkurve mit der Hilbert-Transformation.

3. **Phasenanalyse**  
   Berechne die entfaltete Phase eines Chirp-Signals und daraus die Momentanfrequenz.

4. **Filter im Frequenzbereich**  
   Implementiere Tiefpass, Hochpass und Bandpass über Multiplikation im Spektrum.

## Empfohlene Reihenfolge beim Lernen

1. Euler-Formel sicher verstehen.
2. Komplexe Exponentialfunktionen als Schwingungen interpretieren.
3. Fourier-Reihen für periodische Signale üben.
4. Fourier-Transformation als Grenzfall für nichtperiodische Signale verstehen.
5. Eigenschaften der Fourier-Transformation anwenden.
6. Hilbert-Transformation zuerst im Frequenzbereich verstehen.
7. Analytisches Signal für Hüllkurve, Phase und Momentanfrequenz nutzen.
