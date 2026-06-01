# Lösungen zu Einheit 3: Fourier-Transformation

Aufgabenstellung: [Einheit 3 — Übungen](../einheit-3.md#übungen-zu-einheit-3)

1. Fourier-Reihen beschreiben periodische Signale durch diskrete Frequenzen \(n\omega_0\):

   $$
   f(t)=\sum_{n=-\infty}^{\infty}c_ne^{in\omega_0t}.
   $$

   Die Fourier-Transformation beschreibt nichtperiodische Signale durch ein kontinuierliches Spektrum:

   $$
   x(t)=\frac{1}{2\pi}\int_{-\infty}^{\infty}X(\omega)e^{i\omega t}\,d\omega.
   $$

   Anschaulich wird aus der Summe über Frequenzlinien ein Integral über alle Frequenzen.

2. Mit der Siebeigenschaft des Dirac-Impulses:

   $$
   \mathcal{F}\{\delta(t-3)\}
   =
   \int_{-\infty}^{\infty}\delta(t-3)e^{-i\omega t}\,dt
   =
   e^{-i3\omega}.
   $$

3. Beim Rechteckpuls aus der Einheit gilt:

   $$
   X(\omega)=\frac{2\sin(\omega a)}{\omega}.
   $$

   Wird der Puls breiter, wächst \(a\). Die erste Nullstelle liegt bei \(\omega a=\pi\), also bei

   $$
   \omega=\frac{\pi}{a}.
   $$

   Größeres \(a\) bedeutet kleinere Nullstellenabstände: Das Spektrum wird schmaler.

4. Ein sehr kurzer Impuls ist stark im Zeitbereich konzentriert. Um eine solche Konzentration aus Schwingungen zusammenzusetzen, braucht man viele Frequenzen mit passend abgestimmten Phasen. Zeitliche Konzentration und spektrale Ausdehnung stehen deshalb in einem Gegenspiel.

---

[Zurück: Lösungen zu Einheit 2](einheit-2.md) · [Zurück zur Einheit](../einheit-3.md) · [Lösungs-Index](README.md) · [Weiter: Lösungen zu Einheit 4](einheit-4.md)
