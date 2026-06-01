# Lösungen zu Einheit 2: Fourier-Reihen

Aufgabenstellung: [Einheit 2 — Übungen](../einheit-2.md#übungen-zu-einheit-2)

1. Aus

   $$
   \cos \theta=\frac{e^{i\theta}+e^{-i\theta}}{2}
   $$

   folgt mit \(\theta=3\omega_0t\):

   $$
   2\cos(3\omega_0t)
   =e^{i3\omega_0t}+e^{-i3\omega_0t}.
   $$

   Also sind die einzigen von null verschiedenen Koeffizienten

   $$
   c_3=1,\qquad c_{-3}=1.
   $$

   Die reelle Kosinusamplitude \(2\) verteilt sich auf die beiden zweiseitigen Koeffizienten.

2. Aus

   $$
   \sin \theta=\frac{e^{i\theta}-e^{-i\theta}}{2i}
   $$

   folgt:

   $$
   4\sin(2\omega_0t)
   =\frac{4}{2i}\left(e^{i2\omega_0t}-e^{-i2\omega_0t}\right)
   =-2i\,e^{i2\omega_0t}+2i\,e^{-i2\omega_0t}.
   $$

   Daher:

   $$
   c_2=-2i,\qquad c_{-2}=2i.
   $$

3. Für reelle Signale muss gelten:

   $$
   c_{-n}=\overline{c_n}.
   $$

   Dann ist

   $$
   c_ne^{in\omega_0t}+c_{-n}e^{-in\omega_0t}
   =
   c_ne^{in\omega_0t}+\overline{c_ne^{in\omega_0t}}
   =2\operatorname{Re}\left(c_ne^{in\omega_0t}\right),
   $$

   also reell. Positive und negative Frequenzen treten deshalb paarweise auf.

4. Die Grundfrequenz ist \(\omega_0=2\pi/T\). Oberwellen sind ganzzahlige Vielfache davon:

   $$
   2\omega_0,\;3\omega_0,\;4\omega_0,\ldots
   $$

   Der Index \(n\) zählt also, wie viele Grundschwingungen in eine Periode passen.

---

[Zurück: Lösungen zu Einheit 1](einheit-1.md) · [Zurück zur Einheit](../einheit-2.md) · [Lösungs-Index](README.md) · [Weiter: Lösungen zu Einheit 3](einheit-3.md)
