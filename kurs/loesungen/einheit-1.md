# Lösungen zu Einheit 1: Komplexe Zahlen und Euler-Formel

Aufgabenstellung: [Einheit 1 — Übungen](../einheit-1.md#übungen-zu-einheit-1)

## Lösung 1

Direkt mit der Euler-Formel:

$$3(\cos(\pi/4)+i\sin(\pi/4))=3e^{i\pi/4}.$$

## Lösung 2

Mit $\cos \pi=-1$ und $\sin \pi=0$:

$$e^{i\pi}=\cos \pi+i\sin \pi=-1.$$

Also gilt auch $e^{i\pi}+1=0$.

## Lösung 3

Einerseits ist

$$e^{-ix}=\cos(-x)+i\sin(-x).$$

Andererseits folgt aus $e^{-ix}=1/e^{ix}$ oder direkt aus Euler:

$$e^{-ix}=\cos x-i\sin x.$$

Vergleich von Real- und Imaginärteil liefert

$$\cos(-x)=\cos x,\qquad \sin(-x)=-\sin x.$$

## Lösung 4

Für $z=re^{i\varphi}$ gilt:

$$ze^{i\pi/2}=re^{i(\varphi+\pi/2)}.$$

Die Multiplikation rotiert $z$ also um $90^\circ$ gegen den Uhrzeigersinn, ohne den Betrag zu ändern. Genau in diesem Sinn ist die imaginäre Achse die um $90^\circ$ gedrehte reelle Achse — und genau das wird die Hilbert-Transformation in [Einheit 6](../einheit-6.md) für jede einzelne Frequenz tun.

## Lösung 5

Einerseits gilt

$$e^{i(\alpha+\beta)}=\cos(\alpha+\beta)+i\sin(\alpha+\beta).$$

Andererseits ist wegen der Rechenregel der Exponentialfunktion

$$e^{i(\alpha+\beta)} =e^{i\alpha}e^{i\beta} =(\cos\alpha+i\sin\alpha)(\cos\beta+i\sin\beta).$$

Ausmultiplizieren liefert

$$(\cos\alpha\cos\beta-\sin\alpha\sin\beta) +i(\sin\alpha\cos\beta+\cos\alpha\sin\beta).$$

Vergleich von Real- und Imaginärteil ergibt:

$$\cos(\alpha+\beta)=\cos\alpha\cos\beta-\sin\alpha\sin\beta,$$

$$\sin(\alpha+\beta)=\sin\alpha\cos\beta+\cos\alpha\sin\beta.$$

Was du daraus mitnehmen solltest: Die Euler-Formel ist nicht nur eine Kurzschreibweise, sondern überträgt Rechenregeln der Exponentialfunktion auf trigonometrische Identitäten.

## Lösung 6

Die Aussage verwechselt die reelle Exponentialfunktion $e^x$ mit der komplexen Exponentialfunktion auf der imaginären Achse. Nach Euler gilt

$$e^{i\varphi}=\cos\varphi+i\sin\varphi.$$

Der Wert ist im Allgemeinen komplex. Sein Betrag ist

$$|e^{i\varphi}|=\sqrt{\cos^2\varphi+\sin^2\varphi}=1.$$

Geometrisch liegt $e^{i\varphi}$ also nicht auf der positiven reellen Achse, sondern auf dem Einheitskreis. Wenn $\varphi$ wächst, rotiert der Punkt um den Ursprung.

## Lösung 7

Die einfachste Wahl sind die drei dritten Einheitswurzeln, skaliert mit Faktor $2$:

$$z_k = 2\thinspace e^{i\thinspace 2\pi k/3},\qquad k=0,1,2.$$

Geometrisch sind das drei Zeiger der Länge $2$, die um $120^\circ$ gegeneinander verdreht auf einem Kreis vom Radius $2$ liegen. Ihre Summe ist null, weil die Endpunkte ein gleichseitiges Dreieck mit Schwerpunkt im Ursprung bilden:

$$z_0+z_1+z_2 = 2\bigl(1+e^{i 2\pi/3}+e^{i 4\pi/3}\bigr) = 2\cdot 0 = 0.$$

Die geometrische Schlüsselidee — dass $n$-te Einheitswurzeln symmetrisch um null verteilt sind und sich daher zu null summieren — ist dieselbe, die in [Einheit 2](../einheit-2.md) die Orthogonalität der Schwingungen $e^{in\omega_0 t}$ erzeugt. Was du daraus mitnehmen solltest: Symmetrische Punktverteilungen auf dem Einheitskreis sind die diskrete Variante orthogonaler Schwingungen.

---

[Zurück zur Einheit](../einheit-1.md) · [Lösungs-Index](README.md) · [Weiter: Lösungen zu Einheit 2](einheit-2.md)
