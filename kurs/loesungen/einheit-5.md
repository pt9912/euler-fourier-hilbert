# Lösungen zu Einheit 5: Diskrete Signale, DFT und FFT

Aufgabenstellung: [Einheit 5 — Übungen](../einheit-5.md#übungen-zu-einheit-5)

1. Die DFT ist die mathematische Transformation

   $$
   X[k]=\sum_{n=0}^{N-1}x[n]e^{-i2\pi kn/N}.
   $$

   Die FFT ist ein schneller Algorithmus, der dieselben \(X[k]\) berechnet, aber statt ungefähr \(N^2\) nur ungefähr \(N\log_2N\) Operationen benötigt.

   Was du daraus mitnehmen solltest: Wenn sich ein Spektrum zwischen DFT und FFT unterscheidet, liegt der Fehler nicht an der Mathematik der Transformation, sondern an Implementierung, Normierung oder Interpretation der Frequenzachse.

2. Die Nyquist-Frequenz ist

   $$
   f_N=\frac{f_s}{2}=\frac{1000\,\text{Hz}}{2}=500\,\text{Hz}.
   $$

   Ohne Aliasing eindeutig sind Frequenzen mit \(|f|<500\,\text{Hz}\). Der exakte Rand \(500\,\text{Hz}\) ist ein Sonderfall und wird praktisch nicht als frei nutzbarer Frequenzbereich behandelt.

3. Aliasing ist problematisch, weil verschiedene kontinuierliche Frequenzen nach der Abtastung dieselbe diskrete Folge erzeugen können. Eine Frequenz oberhalb der Nyquist-Grenze erscheint dann als falsche niedrigere Frequenz und kann aus den Samples nicht mehr eindeutig rekonstruiert werden.

4. Für \(k=0\) ist der Exponentialfaktor gleich \(1\):

   $$
   X[0]=\sum_{n=0}^{N-1}x[n].
   $$

   \(X[0]\) ist also die Summe aller Samples. Der Mittelwert ist

   $$
   \frac{X[0]}{N}.
   $$

   Bis auf diese Normierung entspricht \(X[0]\) dem Gleichanteil.

5. Die DFT interpretiert Frequenzen im signierten Nyquist-Band

   $$
   -\frac{f_s}{2}\le f < \frac{f_s}{2},
   $$

   hier also \([-5,5)\,\text{Hz}\). Die Frequenz \(7\,\text{Hz}\) wird um \(f_s=10\,\text{Hz}\) zurückgefaltet:

   $$
   7\,\text{Hz}-10\,\text{Hz}=-3\,\text{Hz}.
   $$

   Für einen Kosinus ist \(-3\,\text{Hz}\) im Betrag nicht von \(+3\,\text{Hz}\) zu unterscheiden, weil \(\cos(-2\pi 3t)=\cos(2\pi 3t)\). Die scheinbare Frequenz ist also \(3\,\text{Hz}\); im signierten Spektrum erscheint die Linie als Paar bei \(\pm3\,\text{Hz}\).

   Was du daraus mitnehmen solltest: Aliasing ist keine Unschärfe der DFT, sondern eine eindeutige Faltung modulo Abtastrate.

---

[Zurück: Lösungen zu Einheit 4](einheit-4.md) · [Zurück zur Einheit](../einheit-5.md) · [Lösungs-Index](README.md) · [Weiter: Lösungen zu Einheit 6](einheit-6.md)
