# Lösungen zu Einheit 6: Hilbert-Transformation

Aufgabenstellung: [Einheit 6 — Übungen](../einheit-6.md#übungen-zu-einheit-6)

1. Im Frequenzbereich gilt:

   $$
   \mathcal{F}\{\mathcal{H}x\}(\omega)
   =
   -i\,\operatorname{sgn}(\omega)X(\omega).
   $$

   Für positive Frequenzen ist \(\operatorname{sgn}(\omega)=1\), also wird mit \(-i\) multipliziert. Das entspricht einer Phasenverschiebung um \(-90^\circ\).

2. Für \(\omega_0>0\) gilt aus der Einheit:

   $$
   \mathcal{H}\{\cos(\omega_0t)\}=\sin(\omega_0t).
   $$

   Mit \(\omega_0=5\):

   $$
   \mathcal{H}\{\cos(5t)\}=\sin(5t).
   $$

3. Entsprechend:

   $$
   \mathcal{H}\{\sin(\omega_0t)\}=-\cos(\omega_0t),
   $$

   also

   $$
   \mathcal{H}\{\sin(5t)\}=-\cos(5t).
   $$

4. Die Zeitbereichsdefinition enthält den Kern

   $$
   \frac{1}{t-\tau}.
   $$

   Bei \(\tau=t\) wird der Nenner null. Das Integral ist daher nicht als gewöhnliches uneigentliches Integral zu verstehen, sondern als Cauchy-Hauptwert, bei dem die Umgebung der Singularität symmetrisch behandelt wird.

---

[Zurück: Lösungen zu Einheit 5](einheit-5.md) · [Zurück zur Einheit](../einheit-6.md) · [Lösungs-Index](README.md) · [Weiter: Lösungen zu Einheit 7](einheit-7.md)
