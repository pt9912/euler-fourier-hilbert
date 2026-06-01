# Lösungen zu Einheit 2: Fourier-Reihen

Aufgabenstellung: [Einheit 2 — Übungen](../einheit-2.md#übungen-zu-einheit-2)

1. Aus

   $$
   \cos \theta=\frac{e^{i\theta}+e^{-i\theta}}{2}
   $$

   folgt mit $\theta=3\omega_0t$:

   $$
   2\cos(3\omega_0t)
   =e^{i3\omega_0t}+e^{-i3\omega_0t}.
   $$

   Also sind die einzigen von null verschiedenen Koeffizienten

   $$
   c_3=1,\qquad c_{-3}=1.
   $$

   Die reelle Kosinusamplitude $2$ verteilt sich auf die beiden zweiseitigen Koeffizienten.

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

4. Die Grundfrequenz ist $\omega_0=2\pi/T$. Oberwellen sind ganzzahlige Vielfache davon:

   $$
   2\omega_0,\;3\omega_0,\;4\omega_0,\ldots
   $$

   Der Index $n$ zählt also, wie viele Grundschwingungen in eine Periode passen.

5. Eine einfache Wahl ist jede ungerade $2\pi$-periodische Funktion, zum Beispiel

   $$
   f(t)=\sin t+\frac12\sin(3t).
   $$

   In reeller Schreibweise enthält ihre Fourier-Reihe nur Sinus-Terme. Der Grund ist die Symmetrie:

   $$
   f(-t)=-f(t).
   $$

   Kosinus-Terme sind gerade, sie können zu einer ungeraden Funktion keinen Beitrag leisten. Allgemeiner gilt: Ungerade reelle Funktionen haben nur Sinus-Terme; gerade reelle Funktionen haben nur Kosinus-Terme. In komplexer Schreibweise zeigt sich dieselbe Aussage in rein imaginären, ungeraden Koeffizienten.

   Was du daraus mitnehmen solltest: Fehlende Terme sind oft keine Rechenzufälle, sondern Symmetrieinformationen.

6. Das kann für ein reellwertiges Signal nicht stimmen. Für reelle Signale gilt immer

   $$
   c_{-n}=\overline{c_n}.
   $$

   Wenn $c_3=2$ ist, muss also mindestens

   $$
   c_{-3}=2
   $$

   hinzukommen. Dann ergibt das Paar

   $$
   2e^{i3\omega_0t}+2e^{-i3\omega_0t}=4\cos(3\omega_0t),
   $$

   also ein reelles Signal. Nur $2e^{i3\omega_0t}$ allein wäre komplexwertig.

---

[Zurück: Lösungen zu Einheit 1](einheit-1.md) · [Zurück zur Einheit](../einheit-2.md) · [Lösungs-Index](README.md) · [Weiter: Lösungen zu Einheit 3](einheit-3.md)
