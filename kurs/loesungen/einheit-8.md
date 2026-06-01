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
f_N=\frac{f_s}{2}=4000\,\text{Hz}.
```

Ohne Aliasing eindeutig darstellbar sind Frequenzen mit

```math
|f|<4000\,\text{Hz}.
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
\pm 100\,\text{Hz},\qquad \pm 95\,\text{Hz},\qquad \pm 105\,\text{Hz},
```

denn aus den Mischprodukten $\cos(2\pi 5t)\cos(2\pi 100t)=\tfrac12\bigl[\cos(2\pi 95t)+\cos(2\pi 105t)\bigr]$ folgt

```math
x(t) = \underbrace{\tfrac{1}{2} e^{i\,2\pi\,100\,t} + \tfrac{1}{2} e^{-i\,2\pi\,100\,t}}_{\text{Träger}} + \tfrac{1}{8}\bigl(e^{i\,2\pi\,95\,t}+e^{-i\,2\pi\,95\,t}+e^{i\,2\pi\,105\,t}+e^{-i\,2\pi\,105\,t}\bigr).
```

**b)** Das Linienspektrum ist eine $\delta$-Summe (Faktor $\pi$ entfällt, wenn man das Spektrum als $c_n$ interpretiert): zentrale Linien bei $\pm 100\thinspace \text{Hz}$ mit Höhe $\tfrac12$, Seitenbänder bei $\pm 95,\pm 105\thinspace \text{Hz}$ mit Höhe $\tfrac18$. Alle Phasen sind $0$, weil das Signal reell und gerade ist — Bestätigung der Symmetrie­tabelle aus [§4.8](../einheit-4.md#48-symmetrien-reeller-und-geraderungerader-signale).

**c)** Das Spektrum der Hüllkurve $A(t)=1+\tfrac12\cos(2\pi\thinspace 5\thinspace t)$ hat Linien bei $0,\pm 5\thinspace \text{Hz}$, das des Trägers bei $\pm 100\thinspace \text{Hz}$. Die Bedrosian-Bedingung verlangt, dass die nach $\pm 100\thinspace \text{Hz}$ verschobenen Kopien von $\hat A$ (Lage $95$–$105\thinspace \text{Hz}$ und $-105$–$-95\thinspace \text{Hz}$) sich nicht überlappen — das ist hier offensichtlich der Fall. Folglich gilt exakt

```math
z(t)=A(t)e^{i\,2\pi\,100\,t},\qquad
|z(t)|=A(t)=1+\tfrac12\cos(2\pi\,5\,t).
```

Die Phase ist $\phi(t)=2\pi\thinspace 100\thinspace t$, also

```math
f_{\text{inst}}(t)=\frac{1}{2\pi}\frac{d\phi}{dt}=100\,\text{Hz}\quad\text{(konstant)}.
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

---

[Zurück: Lösungen zu Einheit 7](einheit-7.md) · [Zurück zur Einheit](../einheit-8.md) · [Lösungs-Index](README.md)
