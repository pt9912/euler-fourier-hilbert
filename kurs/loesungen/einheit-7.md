# Lösungen zu Einheit 7: Analytisches Signal

Aufgabenstellung: [Einheit 7 — Übungen](../einheit-7.md#übungen-zu-einheit-7)

1. Für \(\omega_0>0\) gilt:

   $$
   \mathcal{H}\{\cos(\omega_0t)\}=\sin(\omega_0t).
   $$

   Also:

   $$
   \mathcal{H}\{3\cos(10t)\}=3\sin(10t).
   $$

   Das analytische Signal ist

   $$
   z(t)=3\cos(10t)+i3\sin(10t)=3e^{i10t}.
   $$

2. Die Hüllkurve ist der Betrag:

   $$
   |z(t)|=|2e^{i(5t+\pi/4)}|=2|e^{i(5t+\pi/4)}|=2.
   $$

3. Die Phase ist

   $$
   \phi(t)=7t.
   $$

   Daher:

   $$
   \omega_{\text{inst}}(t)=\frac{d}{dt}\phi(t)=7.
   $$

   In Hertz:

   $$
   f_{\text{inst}}(t)=\frac{7}{2\pi}.
   $$

4. Im Frequenzbereich gilt für \(z=x+i\mathcal{H}x\):

   $$
   Z(\omega)=X(\omega)+i\left[-i\,\operatorname{sgn}(\omega)X(\omega)\right]
   =
   \left(1+\operatorname{sgn}(\omega)\right)X(\omega).
   $$

   Damit ist \(Z(\omega)=2X(\omega)\) für \(\omega>0\), \(Z(\omega)=0\) für \(\omega<0\), und der Gleichanteil bleibt separat erhalten.

---

[Zurück: Lösungen zu Einheit 6](einheit-6.md) · [Zurück zur Einheit](../einheit-7.md) · [Lösungs-Index](README.md) · [Weiter: Lösungen zu Einheit 8](einheit-8.md)
