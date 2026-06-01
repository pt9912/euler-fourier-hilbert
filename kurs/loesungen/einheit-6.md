# Lösungen zu Einheit 6: Hilbert-Transformation

Aufgabenstellung: [Einheit 6 — Übungen](../einheit-6.md#übungen-zu-einheit-6)

1. Im Frequenzbereich gilt:

   $$\mathcal{F}\{\mathcal{H}x\}(\omega) = -i\,\operatorname{sgn}(\omega)X(\omega).$$

   Für positive Frequenzen ist $\operatorname{sgn}(\omega)=1$, also wird mit $-i$ multipliziert. Das entspricht einer Phasenverschiebung um $-90^\circ$.

2. Für $\omega_0>0$ gilt aus der Einheit:

   $$\mathcal{H}\{\cos(\omega_0t)\}=\sin(\omega_0t).$$

   Mit $\omega_0=5$:

   $$\mathcal{H}\{\cos(5t)\}=\sin(5t).$$

3. Entsprechend:

   $$\mathcal{H}\{\sin(\omega_0t)\}=-\cos(\omega_0t),$$

   also

   $$\mathcal{H}\{\sin(5t)\}=-\cos(5t).$$

4. Die Zeitbereichsdefinition enthält den Kern

   $$\frac{1}{t-\tau}.$$

   Bei $\tau=t$ wird der Nenner null. Das Integral ist daher nicht als gewöhnliches uneigentliches Integral zu verstehen, sondern als Cauchy-Hauptwert, bei dem die Umgebung der Singularität symmetrisch behandelt wird.

5. Ist $x(t)$ reell und gerade, dann ist $X(\omega)$ nach der Symmetrietabelle aus [§4.8](../einheit-4.md#48-symmetrien-reeller-und-geraderungerader-signale) ebenfalls reell und gerade.

   Die Hilbert-Transformation multipliziert im Frequenzbereich mit

   $$-i\operatorname{sgn}(\omega).$$

   $\operatorname{sgn}(\omega)$ ist ungerade. Gerade mal ungerade ergibt ungerade; der Faktor $-i$ macht das Spektrum rein imaginär. Das Spektrum von $\mathcal H\lbrace x\rbrace $ ist also rein imaginär und ungerade. Wieder nach der Symmetrietabelle gehört dazu ein reelles ungerades Zeitsignal.

   Was du daraus mitnehmen solltest: Die Hilbert-Transformation vertauscht bei reellen Signalen die Parität, weil ihr Frequenzgang selbst ungerade ist.

6. Die konstante Funktion besteht nur aus Gleichanteil, also aus Frequenz $\omega=0$. In der Frequenzbereichsdefinition steht der Faktor

   $$-i\operatorname{sgn}(\omega).$$

   Weil $\operatorname{sgn}(0)=0$, wird der Gleichanteil auf null gesetzt. Daher gilt

   $$\mathcal H\{1\}=0.$$

   Die Kurzform "jede Frequenz wird um $90^\circ$ verschoben" meint die echten positiven und negativen Frequenzen. Der Gleichanteil rotiert nicht; er hat keine Schwingungsphase, die man sinnvoll um $90^\circ$ verschieben könnte.

---

[Zurück: Lösungen zu Einheit 5](einheit-5.md) · [Zurück zur Einheit](../einheit-6.md) · [Lösungs-Index](README.md) · [Weiter: Lösungen zu Einheit 7](einheit-7.md)
