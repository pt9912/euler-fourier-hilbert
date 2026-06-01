# Lösungen zu Einheit 4: Eigenschaften der Fourier-Transformation

Aufgabenstellung: [Einheit 4 — Übungen](../einheit-4.md#übungen-zu-einheit-4)

1. Für eine Zeitverschiebung gilt:

   $$
   x(t-t_0)\leftrightarrow e^{-i\omega t_0}X(\omega).
   $$

   Der Faktor \(e^{-i\omega t_0}\) hat Betrag \(1\). Deshalb bleibt \(|X(\omega)|\) gleich, aber die Phase ändert sich um \(-\omega t_0\).

2. Die Ableitung erfüllt:

   $$
   \frac{d}{dt}x(t)\leftrightarrow i\omega X(\omega).
   $$

   Der Betrag des Faktors ist

   $$
   |i\omega|=|\omega|.
   $$

   Hohe Frequenzen werden daher stärker gewichtet als niedrige.

3. Der Faltungssatz sagt:

   $$
   x*h\leftrightarrow X(\omega)H(\omega).
   $$

   Eine Faltung ist ein Integral über alle Verschiebungen. Im Frequenzbereich wird daraus eine punktweise Multiplikation, was theoretisch und numerisch oft einfacher ist.

4. Wenn \(y=x*h\), dann folgt direkt aus dem Faltungssatz:

   $$
   Y(\omega)=X(\omega)H(\omega).
   $$

   \(H(\omega)\) beschreibt also, welche Frequenzen das System verstärkt, abschwächt oder in der Phase verschiebt.

---

[Zurück: Lösungen zu Einheit 3](einheit-3.md) · [Zurück zur Einheit](../einheit-4.md) · [Lösungs-Index](README.md) · [Weiter: Lösungen zu Einheit 5](einheit-5.md)
