# Lösungen zu Einheit 8: Abschlussaufgaben

Aufgabenstellung: [Einheit 8 — Abschlussaufgaben](../einheit-8.md#84-abschlussaufgaben)

## Lösung 1

Mit Euler:

```math
5\cos(4t-\pi/3)
=
\frac{5}{2}e^{i(4t-\pi/3)}
+
\frac{5}{2}e^{-i(4t-\pi/3)}.
```

## Lösung 2

```math
\mathcal{F}\{\delta(t-2)\}=e^{-i2\omega}.
```

## Lösung 3

1. $\mathcal{H}\lbrace \cos(8t)\rbrace =\sin(8t)$ (mit $\omega_0=8>0$, siehe [§6.4](../einheit-6.md#64-beispiele)).
2. $z(t)=\cos(8t)+i\sin(8t)=e^{i8t}$.
3. $|z(t)|=1$ — die Hüllkurve ist konstant, weil die reelle Amplitude des Kosinus konstant gleich $1$ ist.
4. $\omega_{\text{inst}}=8$, also $f_{\text{inst}}=8/(2\pi)=4/\pi\approx 1{,}27\thinspace \text{Hz}$ — die Momentanfrequenz ist konstant, weil das Signal eine reine harmonische Schwingung ist (lineare Phase $\phi(t)=8t$).

   Achtung: In dieser Aufgabe ist $8$ die Kreisfrequenz in rad/s, kein Hertz-Wert. Ein 8-Hz-Kosinus müsste als $\cos(2\pi\cdot 8\thinspace t)$ geschrieben werden.

## Lösung 4

Die Ausgabe eines linearen zeitinvarianten Systems ist die Faltung von Eingabe und Impulsantwort:

```math
y(t)=x(t)*h(t).
```

Der Faltungssatz sagt:

```math
\mathcal{F}\{x*h\}=X(\omega)H(\omega).
```

Daher kann man das System im Frequenzbereich als frequenzabhängigen Verstärkungs- und Phasenfaktor $H(\omega)$ auffassen.

## Lösung 5

Die Nyquist-Frequenz ist

```math
f_N=\frac{f_s}{2}=4000\thinspace \text{Hz}.
```

Ohne Aliasing eindeutig darstellbar sind Frequenzen mit

```math
|f|<4000\thinspace \text{Hz}.
```

Für reelle Signale spricht man im einseitigen Spektrum meist vom Bereich $0\le f<4000\thinspace \text{Hz}$. Der exakte Rand bei $4000\thinspace \text{Hz}$ ist der Nyquist-Sonderfall; praktisch arbeitet man knapp darunter und verwendet ein Anti-Aliasing-Filter.

## Lösung 6

**a)** Die Amplitude lässt sich mit Euler in drei komplexe Beiträge zerlegen,

```math
1+\tfrac12\cos(2\pi\,5\,t)
=
1+\tfrac14 e^{i\,2\pi\,5\,t}+\tfrac14 e^{-i\,2\pi\,5\,t},
```

der Träger $\cos(2\pi\thinspace 100\thinspace t)=\tfrac12 e^{i\thinspace 2\pi\thinspace 100\thinspace t}+\tfrac12 e^{-i\thinspace 2\pi\thinspace 100\thinspace t}$ liefert zwei. Im Produkt entstehen sechs Linien bei den Frequenzen

```math
\pm 100\thinspace \text{Hz},\qquad \pm 95\thinspace \text{Hz},\qquad \pm 105\thinspace \text{Hz},
```

denn aus den Mischprodukten $\cos(2\pi 5t)\cos(2\pi 100t)=\tfrac12\bigl[\cos(2\pi 95t)+\cos(2\pi 105t)\bigr]$ folgt

```math
x(t) = \tfrac{1}{2} e^{i\,2\pi\,100\,t} + \tfrac{1}{2} e^{-i\,2\pi\,100\,t} + \tfrac{1}{8}\bigl(e^{i\,2\pi\,95\,t}+e^{-i\,2\pi\,95\,t}+e^{i\,2\pi\,105\,t}+e^{-i\,2\pi\,105\,t}\bigr).
```

Die ersten beiden Terme bilden den Träger bei $\pm 100\thinspace \text{Hz}$; die übrigen vier Terme sind die Seitenbänder bei $\pm 95$ und $\pm 105\thinspace \text{Hz}$.

**b)** Das Linienspektrum ist eine $\delta$-Summe (Faktor $\pi$ entfällt, wenn man das Spektrum als $c_n$ interpretiert): zentrale Linien bei $\pm 100\thinspace \text{Hz}$ mit Höhe $\tfrac12$, Seitenbänder bei $\pm 95,\pm 105\thinspace \text{Hz}$ mit Höhe $\tfrac18$. Alle Phasen sind $0$, weil das Signal reell und gerade ist — Bestätigung der Symmetrie­tabelle aus [§4b.3](../einheit-4b.md#4b3-symmetrien-reeller-und-geraderungerader-signale).

**c)** Das Spektrum der Hüllkurve $A(t)=1+\tfrac12\cos(2\pi\thinspace 5\thinspace t)$ hat Linien bei $0,\pm 5\thinspace \text{Hz}$, das des Trägers bei $\pm 100\thinspace \text{Hz}$. Die Bedrosian-Bedingung verlangt, dass die nach $\pm 100\thinspace \text{Hz}$ verschobenen Kopien von $\hat A$ (Lage $95$–$105\thinspace \text{Hz}$ und $-105$–$-95\thinspace \text{Hz}$) sich nicht überlappen — das ist hier offensichtlich der Fall. Folglich gilt exakt

```math
z(t)=A(t)e^{i\,2\pi\,100\,t},\qquad
|z(t)|=A(t)=1+\tfrac12\cos(2\pi\,5\,t).
```

Die Phase ist $\phi(t)=2\pi\thinspace 100\thinspace t$, also

```math
f_{\text{inst}}(t)=\frac{1}{2\pi}\frac{d\phi}{dt}=100\thinspace \text{Hz}\quad\text{(konstant)}.
```

Die Hüllkurve trägt also die langsame 5-Hz-Modulation, während die Momentanfrequenz die Trägerfrequenz unverändert anzeigt.

## Lösung 7

Hier gibt es keine eindeutig richtige Musterantwort, aber eine gute Antwort nennt eine Perspektive und belegt sie konkret. Drei mögliche Richtungen:

- **Euler:** hilfreich, weil die Zerlegung in $e^{i\omega t}$ sofort zeigt, wo die Linien bei $95$, $100$ und $105\thinspace \text{Hz}$ herkommen.
- **Fourier:** hilfreich, weil Modulation als Frequenzverschiebung sichtbar macht, warum Seitenbänder entstehen und warum Bedrosian hier gilt.
- **Hilbert:** hilfreich, weil erst das analytische Signal Hüllkurve und Momentanfrequenz direkt zugänglich macht.

Stark ist eine Antwort, wenn sie nicht nur einen Namen nennt, sondern eine konkrete Formel, ein Spektrumbild oder die Python-Auswertung aus §8.3 als Beleg verwendet.

## Lösung 8

1. **Nur unter Zusatzbedingungen richtig.** Für eine einzelne reine positive Frequenz kann man die Hilbert-Transformation als Quadraturverschiebung lesen, etwa $\mathcal H\lbrace \cos(\omega_0t)\rbrace =\sin(\omega_0t)$. Für ein allgemeines Mehrkomponentensignal ist "eine Viertelperiode" aber nicht eindeutig, weil verschiedene Frequenzen verschiedene Perioden haben. Korrekt ist: Im Frequenzbereich werden positive Frequenzen mit $-i$, negative mit $+i$ multipliziert.

2. **Falsch.** Zero Padding macht das gezeichnete Frequenzraster feiner, fügt aber keine neuen Messdaten hinzu. Die echte Frequenzauflösung wird im Wesentlichen durch die Messdauer bestimmt.

3. **Falsch formuliert.** Negative Frequenzen werden entfernt und echte positive Frequenzen werden verdoppelt. Sonderbins bleiben erhalten: DC wird nicht verdoppelt, und bei geradem $N$ wird auch der Nyquist-Bin nicht verdoppelt.

4. **Richtig** unter den üblichen Voraussetzungen und mit passender Zentrierung/Interpretation der Frequenzachse. Diese Symmetrie ist ein guter Plausibilitätstest für Rechnungen und FFT-Plots.

## Lösung 9

Die analytische Vorhersage ist $f_{\text{inst}}(t)=20+180\thinspace t$ (Hz), also eine Rampe von $20$ auf $200\thinspace\text{Hz}$. Die Implementierung mit zentraler Differenz:

```python
import numpy as np
from scipy.signal import hilbert

fs = 4000.0
t = np.arange(0, 1.0, 1 / fs)
phi = 2 * np.pi * (20.0 * t + 0.5 * 180.0 * t**2)
signal = np.cos(phi)

z = hilbert(signal)
inst_phase = np.unwrap(np.angle(z))

# zentrale Differenz auf demselben Gitter (gegenüber np.diff: bessere Mitte, kleinere Randstörung)
inst_freq = np.gradient(inst_phase, t) / (2 * np.pi)

inst_freq_theory = 20.0 + 180.0 * t
err = np.abs(inst_freq - inst_freq_theory)
print("Max Fehler innen:", err[200:-200].max())
print("Max Fehler an Rändern:", max(err[:50].max(), err[-50:].max()))
```

Die größten Abweichungen treten **an den Rändern** $t\to 0$ und $t\to 1$ auf. Zwei Ursachen aus dem Kurs:

- **Hilbert-Randeffekte aus Einheit 6/8:** Die DFT-basierte Hilbert-Transformation setzt das Signal periodisch fort; an den Rändern entsteht ein Sprung, der die rekonstruierte Phase verzerrt.
- **DFT-Periodizität aus Einheit 5:** Die FFT behandelt das endliche Messfenster wie eine Periode — derselbe Effekt, der Spektralleckage erzeugt, manifestiert sich hier in der Hilbert-Hüllkurve.

In der Praxis werden Randbereiche entweder ignoriert (z. B. erste/letzte 5–10 % verworfen) oder das Signal vorab gefenstert (Tukey-Fenster ist üblich).

## Lösung 10

Die Konstruktion ist ein **Chirp im analytischen Signal**:

$$z(t)=e^{i\phi(t)},\qquad \phi(t)=2\pi\bigl(10\thinspace t+20\thinspace t^2\bigr).$$

Die Momentanfrequenz ist $f_{\text{inst}}(t)=\phi'(t)/(2\pi)=10+40\thinspace t$, also linear von $10\thinspace\text{Hz}$ bei $t=0$ auf $50\thinspace\text{Hz}$ bei $t=1$. Der Betrag ist trivialerweise $\lvert z(t)\rvert=1$.

Das reelle Signal ist dann

$$x(t)=\mathrm{Re}\thinspace z(t)=\cos\bigl(2\pi(10t+20t^2)\bigr).$$

**Warum ist Bedrosian nicht direkt anwendbar?** Bedrosian ist für ein Produkt $A(t)\cos(\omega_c t)$ mit *konstanter Trägerfrequenz* formuliert. Hier gibt es keinen konstanten Träger, sondern eine zeitveränderliche Phase. Trotzdem gilt $\lvert z(t)\rvert=1$ exakt, weil $z(t)=e^{i\phi(t)}$ **per Konstruktion** das analytische Signal ist (sein Spektrum ist auf $\omega>0$ konzentriert, sofern $\phi'(t)>0$ überall — was hier mit $\phi'(t)/2\pi=10+40t>0$ erfüllt ist).

Python-Generator:

```python
import numpy as np

def chirp(t):
    phi = 2 * np.pi * (10.0 * t + 20.0 * t**2)
    return np.cos(phi)
```

Was du daraus mitnehmen solltest: Bedrosian ist hinreichend, aber nicht notwendig. Ein analytisches Signal mit positivem Spektrum kann auch ohne Produktstruktur exakt rekonstruiert werden — das ist der Grund, warum Chirp-Analyse mit der Hilbert-Methode funktioniert.

---

[Zurück: Lösungen zu Einheit 7](einheit-7.md) · [Zurück zur Einheit](../einheit-8.md) · [Lösungs-Index](README.md)
