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

Lösungen: [loesungen/einheit-8.md](loesungen/einheit-8.md)

---

[Zurück: Einheit 7 — Analytisches Signal](einheit-7.md) · [Index](README.md)
