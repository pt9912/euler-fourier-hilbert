# Lösungen zu Einheit 7: Analytisches Signal

Aufgabenstellung: [Einheit 7 — Übungen](../einheit-7.md#übungen-zu-einheit-7)

## Lösung 1

Für $\omega_0>0$ gilt:

$$\mathcal{H}\lbrace \cos(\omega_0t)\rbrace =\sin(\omega_0t).$$

Also:

$$\mathcal{H}\lbrace 3\cos(10t)\rbrace =3\sin(10t).$$

Das analytische Signal ist

$$z(t)=3\cos(10t)+i3\sin(10t)=3e^{i10t}.$$

## Lösung 2

Für $\omega_0=5>0$ liefert die Hilbert-Transformation $\mathcal{H}\lbrace 2\cos(5t+\pi/4)\rbrace =2\sin(5t+\pi/4)$. Damit ist das analytische Signal

$$z(t)=2\cos(5t+\pi/4)+i\cdot 2\sin(5t+\pi/4)=2e^{i(5t+\pi/4)}.$$

Hüllkurve und Phase liest man am komplexen Zeiger direkt ab:

$$|z(t)|=2,\qquad \phi(t)=5t+\pi/4.$$

Die konstante Hüllkurve $2$ entspricht der reellen Amplitude des Kosinus, die lineare Phase mit Steigung $5$ der Trägerkreisfrequenz.

## Lösung 3

Die Phase ist

$$\phi(t)=7t.$$

Daher:

$$\omega_{\text{inst}}(t)=\frac{d}{dt}\phi(t)=7.$$

In Hertz:

$$f_{\text{inst}}(t)=\frac{7}{2\pi}.$$

## Lösung 4

Im Frequenzbereich gilt für $z=x+i\mathcal{H}x$:

$$Z(\omega)=X(\omega)+i\left[-i\thinspace \mathrm{sgn}(\omega)X(\omega)\right] = \left(1+\mathrm{sgn}(\omega)\right)X(\omega).$$

Damit ist $Z(\omega)=2X(\omega)$ für $\omega>0$, $Z(\omega)=0$ für $\omega<0$, und der Gleichanteil bleibt separat erhalten. In der DFT-Version gilt zusätzlich: Bei geradem $N$ bleibt auch der Nyquist-Bin $k=N/2$ unverändert, weil er nicht eindeutig zu einer positiven oder negativen Frequenzhälfte gehört.

## Lösung 5

Ein Beispiel ist

$$x(t)=\bigl(1+0{,}8\cos(2\pi\cdot 60\thinspace t)\bigr)\cos(2\pi\cdot 50\thinspace t).$$

Formal hat das die AM-Form $A(t)\cos(2\pi f_ct)$ mit $f_c=50\thinspace \text{Hz}$, aber die Modulationsfrequenz $60\thinspace \text{Hz}$ liegt nicht deutlich unter dem Träger. Das Spektrum von $A(t)$ hat Linien bei $0$ und $\pm60\thinspace \text{Hz}$; nach der Modulation entstehen Linien bei

$$50\thinspace \text{Hz},\quad 50\pm60\thinspace \text{Hz},$$

also auch bei $-10\thinspace \text{Hz}$ bzw. $10\thinspace \text{Hz}$. Positive und negative Anteile sind nicht sauber getrennt. Die Bedrosian-Bedingung ist verletzt, daher muss

$$\mathcal H\lbrace A(t)\cos(2\pi f_ct)\rbrace =A(t)\sin(2\pi f_ct)$$

nicht gelten. Folglich ist auch $|z(t)|$ im Allgemeinen nicht gleich $A(t)$.

Was du daraus mitnehmen solltest: Eine AM-Schreibweise allein reicht nicht; die Spektraltrennung entscheidet, ob die Hilbert-Hüllkurve die modellierte Amplitude trifft.

## Lösung 6

Bei $N=8$ liegen die DFT-Bins bei $k=0,\ldots,7$. Der Gleichanteil ist $k=0$, der Nyquist-Bin ist $k=N/2=4$.

Für das analytische Signal gilt:

- $k=0$ bleibt erhalten.
- $k=1,2,3$ werden verdoppelt.
- $k=4$ bleibt als Nyquist-Sonderbin erhalten.
- $k=5,6,7$ werden auf null gesetzt.

Als Multiplikatorfolge kann man das schreiben als

$$[1,2,2,2,1,0,0,0].$$

---

[Zurück: Lösungen zu Einheit 6](einheit-6.md) · [Zurück zur Einheit](../einheit-7.md) · [Lösungs-Index](README.md) · [Weiter: Lösungen zu Einheit 8](einheit-8.md)
