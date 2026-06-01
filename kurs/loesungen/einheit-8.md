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

1. \(\mathcal{H}\{\cos(8t)\}=\sin(8t)\).
2. \(z(t)=\cos(8t)+i\sin(8t)=e^{i8t}\).
3. \(|z(t)|=1\).
4. \(\omega_{\text{inst}}=8\), also \(f_{\text{inst}}=8/(2\pi)=4/\pi\).

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

---

[Zurück: Lösungen zu Einheit 7](einheit-7.md) · [Zurück zur Einheit](../einheit-8.md) · [Lösungs-Index](README.md)
