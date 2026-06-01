# Lösungen zu Einheit 1: Komplexe Zahlen und Euler-Formel

Aufgabenstellung: [Einheit 1 — Übungen](../einheit-1.md#übungen-zu-einheit-1)

1. Direkt mit der Euler-Formel:

   ```math
   3(\cos(\pi/4)+i\sin(\pi/4))=3e^{i\pi/4}.
   ```

2. Mit $\cos \pi=-1$ und $\sin \pi=0$:

   ```math
   e^{i\pi}=\cos \pi+i\sin \pi=-1.
   ```

   Also gilt auch $e^{i\pi}+1=0$.

3. Einerseits ist

   ```math
   e^{-ix}=\cos(-x)+i\sin(-x).
   ```

   Andererseits folgt aus $e^{-ix}=1/e^{ix}$ oder direkt aus Euler:

   ```math
   e^{-ix}=\cos x-i\sin x.
   ```

   Vergleich von Real- und Imaginärteil liefert

   ```math
   \cos(-x)=\cos x,\qquad \sin(-x)=-\sin x.
   ```

4. Für $z=re^{i\varphi}$ gilt:

   ```math
   ze^{i\pi/2}=re^{i(\varphi+\pi/2)}.
   ```

   Die Multiplikation rotiert $z$ also um $90^\circ$ gegen den Uhrzeigersinn, ohne den Betrag zu ändern. Genau in diesem Sinn ist die imaginäre Achse die um $90^\circ$ gedrehte reelle Achse — und genau das wird die Hilbert-Transformation in [Einheit 6](../einheit-6.md) für jede einzelne Frequenz tun.

5. Einerseits gilt

   ```math
   e^{i(\alpha+\beta)}=\cos(\alpha+\beta)+i\sin(\alpha+\beta).
   ```

   Andererseits ist wegen der Rechenregel der Exponentialfunktion

   ```math
   e^{i(\alpha+\beta)}
   =e^{i\alpha}e^{i\beta}
   =(\cos\alpha+i\sin\alpha)(\cos\beta+i\sin\beta).
   ```

   Ausmultiplizieren liefert

   ```math
   (\cos\alpha\cos\beta-\sin\alpha\sin\beta)
   +i(\sin\alpha\cos\beta+\cos\alpha\sin\beta).
   ```

   Vergleich von Real- und Imaginärteil ergibt:

   ```math
   \cos(\alpha+\beta)=\cos\alpha\cos\beta-\sin\alpha\sin\beta,
   ```

   ```math
   \sin(\alpha+\beta)=\sin\alpha\cos\beta+\cos\alpha\sin\beta.
   ```

   Was du daraus mitnehmen solltest: Die Euler-Formel ist nicht nur eine Kurzschreibweise, sondern überträgt Rechenregeln der Exponentialfunktion auf trigonometrische Identitäten.

6. Die Aussage verwechselt die reelle Exponentialfunktion $e^x$ mit der komplexen Exponentialfunktion auf der imaginären Achse. Nach Euler gilt

   ```math
   e^{i\varphi}=\cos\varphi+i\sin\varphi.
   ```

   Der Wert ist im Allgemeinen komplex. Sein Betrag ist

   ```math
   |e^{i\varphi}|=\sqrt{\cos^2\varphi+\sin^2\varphi}=1.
   ```

   Geometrisch liegt $e^{i\varphi}$ also nicht auf der positiven reellen Achse, sondern auf dem Einheitskreis. Wenn $\varphi$ wächst, rotiert der Punkt um den Ursprung.

---

[Zurück zur Einheit](../einheit-1.md) · [Lösungs-Index](README.md) · [Weiter: Lösungen zu Einheit 2](einheit-2.md)
