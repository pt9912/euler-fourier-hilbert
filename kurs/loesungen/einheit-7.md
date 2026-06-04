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

## Lösung 7

Die Bedrosian-Bedingung verlangt, dass die nach $\pm f_c$ verschobenen Kopien des $A$-Spektrums sich nicht überlappen. Das $A$-Spektrum hat Linien bei $0$ und $\pm f_m$, nach Modulation also bei $\pm f_c$ und $\pm f_c\pm f_m$. Damit positive und negative Frequenzen sauber getrennt sind, muss $f_m < f_c$ — und genauer noch $f_c - f_m > 0$, also $f_m < f_c=50\thinspace\text{Hz}$.

- **$f_m=3\thinspace\text{Hz}$.** Spektrallinien bei $47,50,53\thinspace\text{Hz}$ (positiv) und $-47,-50,-53\thinspace\text{Hz}$ (negativ). Klar getrennt — Bedrosian erfüllt. Die Hilbert-Hüllkurve $\lvert z(t)\rvert$ stimmt fast perfekt mit $A(t)=1+0{,}5\cos(2\pi\cdot 3\thinspace t)$ überein (kleine Randartefakte ausgenommen).
- **$f_m=30\thinspace\text{Hz}$.** Linien bei $20,50,80\thinspace\text{Hz}$ und $-20,-50,-80\thinspace\text{Hz}$. Noch getrennt — Bedrosian gerade noch erfüllt. Die Hüllkurve folgt $A(t)$ noch erkennbar, aber mit sichtbaren Verzerrungen.
- **$f_m=55\thinspace\text{Hz}$.** Linien bei $-5,50,105\thinspace\text{Hz}$ und $-105,-50,5\thinspace\text{Hz}$. Positive und negative Anteile **überlappen** (die $-5\thinspace\text{Hz}$-Linie aus der Modulation kollidiert mit der $+5\thinspace\text{Hz}$-Linie aus der negativen Trägerseite). Bedrosian ist verletzt, $|z(t)|$ weicht deutlich von $A(t)$ ab.

```python
import numpy as np
from scipy.signal import hilbert

fs = 2000.0
t = np.arange(0, 1.0, 1 / fs)
fc = 50.0

for fm in (3.0, 30.0, 55.0):
    envelope = 1.0 + 0.5 * np.cos(2 * np.pi * fm * t)
    signal = envelope * np.cos(2 * np.pi * fc * t)
    z = hilbert(signal)
    recovered = np.abs(z)
    err = np.max(np.abs(recovered[100:-100] - envelope[100:-100]))
    print(f"fm = {fm:>5} Hz  ->  max |z| - A  =  {err:.4f}")
```

Erwartete Größenordnung: bei $f_m=3$ Fehler unter $0{,}01$, bei $f_m=30$ unter $0{,}1$, bei $f_m=55$ deutlich darüber.

Was du daraus mitnehmen solltest: "AM-Form" ist nur Notation; die spektrale Trennung entscheidet, ob die Hüllkurve die modellierte Amplitude ist.

---

[Zurück: Lösungen zu Einheit 6](einheit-6.md) · [Zurück zur Einheit](../einheit-7.md) · [Lösungs-Index](README.md) · [Weiter: Lösungen zu Einheit 8](einheit-8.md)
