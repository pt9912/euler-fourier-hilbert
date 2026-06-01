# Lösungen zu Einheit 1: Komplexe Zahlen und Euler-Formel

Aufgabenstellung: [Einheit 1 — Übungen](../einheit-1.md#übungen-zu-einheit-1)

1. Direkt mit der Euler-Formel:

   $$
   3(\cos(\pi/4)+i\sin(\pi/4))=3e^{i\pi/4}.
   $$

2. Mit \(\cos \pi=-1\) und \(\sin \pi=0\):

   $$
   e^{i\pi}=\cos \pi+i\sin \pi=-1.
   $$

   Also gilt auch \(e^{i\pi}+1=0\).

3. Einerseits ist

   $$
   e^{-ix}=\cos(-x)+i\sin(-x).
   $$

   Andererseits folgt aus \(e^{-ix}=1/e^{ix}\) oder direkt aus Euler:

   $$
   e^{-ix}=\cos x-i\sin x.
   $$

   Vergleich von Real- und Imaginärteil liefert

   $$
   \cos(-x)=\cos x,\qquad \sin(-x)=-\sin x.
   $$

4. Für \(z=re^{i\varphi}\) gilt:

   $$
   ze^{i\pi/2}=re^{i(\varphi+\pi/2)}.
   $$

   Die Multiplikation rotiert \(z\) also um \(90^\circ\) gegen den Uhrzeigersinn, ohne den Betrag zu ändern.

---

[Zurück zur Einheit](../einheit-1.md) · [Lösungs-Index](README.md) · [Weiter: Lösungen zu Einheit 2](einheit-2.md)
