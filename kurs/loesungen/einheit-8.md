# Lösungen zu Einheit 8: Abschlussaufgaben

Aufgabenstellung: [Einheit 8 — Abschlussaufgaben](../einheit-8.md#84-abschlussaufgaben)

## Lösung 1

Mit Euler:

$$
5\cos(4t-\pi/3)
=
\frac{5}{2}e^{i(4t-\pi/3)}
+
\frac{5}{2}e^{-i(4t-\pi/3)}.
$$

## Lösung 2

$$
\mathcal{F}\{\delta(t-2)\}=e^{-i2\omega}.
$$

## Lösung 3

1. \(\mathcal{H}\{\cos(8t)\}=\sin(8t)\) (mit \(\omega_0=8>0\), siehe [§6.4](../einheit-6.md#64-beispiele)).
2. \(z(t)=\cos(8t)+i\sin(8t)=e^{i8t}\).
3. \(|z(t)|=1\) — die Hüllkurve ist konstant, weil die reelle Amplitude des Kosinus konstant gleich \(1\) ist.
4. \(\omega_{\text{inst}}=8\), also \(f_{\text{inst}}=8/(2\pi)=4/\pi\approx 1{,}27\,\text{Hz}\) — die Momentanfrequenz ist konstant, weil das Signal eine reine harmonische Schwingung ist (lineare Phase \(\phi(t)=8t\)).

## Lösung 4

Die Ausgabe eines linearen zeitinvarianten Systems ist die Faltung von Eingabe und Impulsantwort:

$$
y(t)=x(t)*h(t).
$$

Der Faltungssatz sagt:

$$
\mathcal{F}\{x*h\}=X(\omega)H(\omega).
$$

Daher kann man das System im Frequenzbereich als frequenzabhängigen Verstärkungs- und Phasenfaktor \(H(\omega)\) auffassen.

## Lösung 5

Die Nyquist-Frequenz ist

$$
f_N=\frac{f_s}{2}=4000\,\text{Hz}.
$$

Ohne Aliasing eindeutig darstellbar sind Frequenzen mit

$$
|f|<4000\,\text{Hz}.
$$

Für reelle Signale spricht man im einseitigen Spektrum meist vom Bereich \(0\le f<4000\,\text{Hz}\). Der exakte Rand bei \(4000\,\text{Hz}\) ist der Nyquist-Sonderfall; praktisch arbeitet man knapp darunter und verwendet ein Anti-Aliasing-Filter.

## Lösung 6

**a)** Die Amplitude lässt sich mit Euler in drei komplexe Beiträge zerlegen,

$$
1+\tfrac12\cos(2\pi\,5\,t)
=
1+\tfrac14 e^{i\,2\pi\,5\,t}+\tfrac14 e^{-i\,2\pi\,5\,t},
$$

der Träger \(\cos(2\pi\,100\,t)=\tfrac12 e^{i\,2\pi\,100\,t}+\tfrac12 e^{-i\,2\pi\,100\,t}\) liefert zwei. Im Produkt entstehen sechs Linien bei den Frequenzen

$$
\pm 100\,\text{Hz},\qquad \pm 95\,\text{Hz},\qquad \pm 105\,\text{Hz},
$$

denn aus den Mischprodukten \(\cos(2\pi 5t)\cos(2\pi 100t)=\tfrac12\bigl[\cos(2\pi 95t)+\cos(2\pi 105t)\bigr]\) folgt

$$
x(t)
=\underbrace{\tfrac12 e^{i\,2\pi\,100\,t}+\tfrac12 e^{-i\,2\pi\,100\,t}}_{\text{Träger}}
+\tfrac18\bigl(e^{i\,2\pi\,95\,t}+e^{-i\,2\pi\,95\,t}+e^{i\,2\pi\,105\,t}+e^{-i\,2\pi\,105\,t}\bigr).
$$

**b)** Das Linienspektrum ist eine \(\delta\)-Summe (Faktor \(\pi\) entfällt, wenn man das Spektrum als \(c_n\) interpretiert): zentrale Linien bei \(\pm 100\,\text{Hz}\) mit Höhe \(\tfrac12\), Seitenbänder bei \(\pm 95,\pm 105\,\text{Hz}\) mit Höhe \(\tfrac18\). Alle Phasen sind \(0\), weil das Signal reell und gerade ist — Bestätigung der Symmetrie­tabelle aus [§4.8](../einheit-4.md#48-symmetrien-reeller-und-geraderungerader-signale).

**c)** Das Spektrum der Hüllkurve \(A(t)=1+\tfrac12\cos(2\pi\,5\,t)\) hat Linien bei \(0,\pm 5\,\text{Hz}\), das des Trägers bei \(\pm 100\,\text{Hz}\). Die Bedrosian-Bedingung verlangt, dass die nach \(\pm 100\,\text{Hz}\) verschobenen Kopien von \(\hat A\) (Lage \(95\)–\(105\,\text{Hz}\) und \(-105\)–\(-95\,\text{Hz}\)) sich nicht überlappen — das ist hier offensichtlich der Fall. Folglich gilt exakt

$$
z(t)=A(t)e^{i\,2\pi\,100\,t},\qquad
|z(t)|=A(t)=1+\tfrac12\cos(2\pi\,5\,t).
$$

Die Phase ist \(\phi(t)=2\pi\,100\,t\), also

$$
f_{\text{inst}}(t)=\frac{1}{2\pi}\frac{d\phi}{dt}=100\,\text{Hz}\quad\text{(konstant)}.
$$

Die Hüllkurve trägt also die langsame 5-Hz-Modulation, während die Momentanfrequenz die Trägerfrequenz unverändert anzeigt.

---

[Zurück: Lösungen zu Einheit 7](einheit-7.md) · [Zurück zur Einheit](../einheit-8.md) · [Lösungs-Index](README.md)
