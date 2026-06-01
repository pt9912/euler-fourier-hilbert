# Lösungen zu Einheit 4: Eigenschaften der Fourier-Transformation

Aufgabenstellung: [Einheit 4 — Übungen](../einheit-4.md#übungen-zu-einheit-4)

1. Für eine Zeitverschiebung gilt:

   $$x(t-t_0)\leftrightarrow e^{-i\omega t_0}X(\omega).$$

   Der Faktor $e^{-i\omega t_0}$ hat Betrag $1$. Deshalb bleibt $|X(\omega)|$ gleich, aber die Phase ändert sich um $-\omega t_0$.

2. Die Ableitung erfüllt:

   $$\frac{d}{dt}x(t)\leftrightarrow i\omega X(\omega).$$

   Der Betrag des Faktors ist

   $$|i\omega|=|\omega|.$$

   Hohe Frequenzen werden daher stärker gewichtet als niedrige.

3. Der Faltungssatz sagt:

   $$x*h\leftrightarrow X(\omega)H(\omega).$$

   Eine Faltung ist ein Integral über alle Verschiebungen. Im Frequenzbereich wird daraus eine punktweise Multiplikation, was theoretisch und numerisch oft einfacher ist.

4. Wenn $y=x*h$, dann folgt direkt aus dem Faltungssatz:

   $$Y(\omega)=X(\omega)H(\omega).$$

   $H(\omega)$ beschreibt also, welche Frequenzen das System verstärkt, abschwächt oder in der Phase verschiebt.

5. Setze $u=t_0-t$. Dann ist $t=t_0-u$ und $dt=-du$. Im Fourier-Integral folgt:

   $$Y(\omega) =\int_{-\infty}^{\infty}x(t_0-t)e^{-i\omega t}\,dt =e^{-i\omega t_0}\int_{-\infty}^{\infty}x(u)e^{i\omega u}\,du =e^{-i\omega t_0}X(-\omega).$$

   Die Spiegelung vertauscht also $\omega$ und $-\omega$; die anschließende Verschiebung erzeugt den Phasenfaktor $e^{-i\omega t_0}$. Was du daraus mitnehmen solltest: Zusammengesetzte Signaloperationen lassen sich regelweise zerlegen, aber die Reihenfolge entscheidet über den Phasenfaktor.

6. Zuerst betrachten wir die verzögerte Version

   $$u(t)=x(t-t_0).$$

   Nach der Zeitverschiebungsregel gilt

   $$U(\omega)=e^{-i\omega t_0}X(\omega).$$

   Danach wird mit $e^{i\omega_ct}$ moduliert. Das verschiebt das Spektrum:

   $$Y(\omega)=U(\omega-\omega_c) =e^{-i(\omega-\omega_c)t_0}X(\omega-\omega_c).$$

   Die Reihenfolge zeigt sich im Phasenfaktor: Er enthält $\omega-\omega_c$, weil erst verzögert und danach das bereits verzögerte Spektrum verschoben wird.

---

[Zurück: Lösungen zu Einheit 3](einheit-3.md) · [Zurück zur Einheit](../einheit-4.md) · [Lösungs-Index](README.md) · [Weiter: Lösungen zu Einheit 5](einheit-5.md)
