# Lösungen zu Einheit 6: Hilbert-Transformation

Aufgabenstellung: [Einheit 6 — Übungen](../einheit-6.md#übungen-zu-einheit-6)

## Lösung 1

Im Frequenzbereich gilt:

$$\mathcal{F}\lbrace \mathcal{H}x\rbrace (\omega) = -i\thinspace \mathrm{sgn}(\omega)X(\omega).$$

Für positive Frequenzen ist $\mathrm{sgn}(\omega)=1$, also wird mit $-i$ multipliziert. Das entspricht einer Phasenverschiebung um $-90^\circ$.

## Lösung 2

Für $\omega_0>0$ gilt aus der Einheit:

$$\mathcal{H}\lbrace \cos(\omega_0t)\rbrace =\sin(\omega_0t).$$

Mit $\omega_0=5$:

$$\mathcal{H}\lbrace \cos(5t)\rbrace =\sin(5t).$$

## Lösung 3

Entsprechend:

$$\mathcal{H}\lbrace \sin(\omega_0t)\rbrace =-\cos(\omega_0t),$$

also

$$\mathcal{H}\lbrace \sin(5t)\rbrace =-\cos(5t).$$

## Lösung 4

Die Zeitbereichsdefinition enthält den Kern

$$\frac{1}{t-\tau}.$$

Bei $\tau=t$ wird der Nenner null. Das Integral ist daher nicht als gewöhnliches uneigentliches Integral zu verstehen, sondern als Cauchy-Hauptwert, bei dem die Umgebung der Singularität symmetrisch behandelt wird.

## Lösung 5

Ist $x(t)$ reell und gerade, dann ist $X(\omega)$ nach der Symmetrietabelle aus [§4b.3](../einheit-4b.md#4b3-symmetrien-reeller-und-geraderungerader-signale) ebenfalls reell und gerade.

Die Hilbert-Transformation multipliziert im Frequenzbereich mit

$$-i\mathrm{sgn}(\omega).$$

$\mathrm{sgn}(\omega)$ ist ungerade. Gerade mal ungerade ergibt ungerade; der Faktor $-i$ macht das Spektrum rein imaginär. Das Spektrum von $\mathcal H\lbrace x\rbrace $ ist also rein imaginär und ungerade. Wieder nach der Symmetrietabelle gehört dazu ein reelles ungerades Zeitsignal.

Was du daraus mitnehmen solltest: Die Hilbert-Transformation vertauscht bei reellen Signalen die Parität, weil ihr Frequenzgang selbst ungerade ist.

## Lösung 6

Die konstante Funktion besteht nur aus Gleichanteil, also aus Frequenz $\omega=0$. In der Frequenzbereichsdefinition steht der Faktor

$$-i\mathrm{sgn}(\omega).$$

Weil $\mathrm{sgn}(0)=0$, wird der Gleichanteil auf null gesetzt. Daher gilt

$$\mathcal H\lbrace 1\rbrace =0.$$

Die Kurzform "jede Frequenz wird um $90^\circ$ verschoben" meint die echten positiven und negativen Frequenzen. Der Gleichanteil rotiert nicht; er hat keine Schwingungsphase, die man sinnvoll um $90^\circ$ verschieben könnte.

## Lösung 7

Beide Implementierungen liefern dasselbe inhaltlich, unterscheiden sich aber im Rückgabewert:

- Die eigene Implementation multipliziert $X[k]$ mit $-i\thinspace\mathrm{sgn}(f_k)$ und transformiert zurück. Der Realteil des Ergebnisses ist $\mathcal H\lbrace x\rbrace$.
- `scipy.signal.hilbert(x)` liefert **das analytische Signal** $z(t)=x(t)+i\thinspace\mathcal H\lbrace x\rbrace(t)$, also einen komplexen Vektor. Sein Imaginärteil ist die Hilbert-Transformierte.

```python
import numpy as np
from scipy.signal import hilbert

fs = 1000.0
t = np.arange(0, 1.0, 1 / fs)
x = np.cos(2 * np.pi * 5.0 * t)

X = np.fft.fft(x)
freq = np.fft.fftfreq(len(x), d=1 / fs)
X_hilbert = -1j * np.sign(freq) * X
H_x_self = np.real(np.fft.ifft(X_hilbert))

z = hilbert(x)
H_x_scipy = np.imag(z)

# beide stimmen abseits der Ränder überein
assert np.max(np.abs(H_x_self[50:-50] - H_x_scipy[50:-50])) < 1e-6
```

An den Rändern weichen die Ergebnisse leicht ab, weil die DFT die Signale periodisch fortsetzt und Sprünge am Rand entstehen können. In der Praxis arbeitet man dort mit Fensterung oder ignoriert die ersten/letzten Samples.

Was du daraus mitnehmen solltest: Die Engineering-Namenswahl "Hilbert" für eine Funktion, die das analytische Signal zurückgibt, ist üblich, aber irreführend. Wer die reine Hilbert-Transformierte braucht, nimmt den Imaginärteil.

## Lösung 8

Die einfachste Wahl ist die reine Schwingung $x(t)=\cos(\omega_0 t)$ mit $\omega_0>0$.

Erste Anwendung: $\mathcal H\lbrace\cos(\omega_0 t)\rbrace=\sin(\omega_0 t)$ — das ist nicht $\pm x$.
Zweite Anwendung: $\mathcal H\lbrace\sin(\omega_0 t)\rbrace=-\cos(\omega_0 t)=-x$. Also $\mathcal H^2 x=-x$, wie aus §6.5 erwartet (kein Gleichanteil vorhanden).

**Warum genügt ein Schritt nicht?** $\mathcal H x = \lambda x$ wäre eine Eigenwertgleichung mit reellem Eigenwert $\lambda$. Im Frequenzbereich entspräche das $-i\thinspace\mathrm{sgn}(\omega)X(\omega)=\lambda X(\omega)$ für alle $\omega$, also $-i\thinspace\mathrm{sgn}(\omega)=\lambda$ überall dort, wo $X(\omega)\ne 0$. Auf den positiven Frequenzen ist $-i\thinspace\mathrm{sgn}(\omega)=-i$, auf den negativen $+i$ — beides nicht reell. Eine *reelle* Funktion $x\not\equiv 0$ enthält wegen $X(-\omega)=\overline{X(\omega)}$ aber zwangsläufig beide Seiten; ein einheitlicher reeller Eigenwert ist daher unmöglich.

Wer das *im Komplexen* lesen möchte: Auf dem analytischen Signal $z(t)=e^{i\omega_0 t}$ mit $\omega_0>0$ ist $\mathcal H z=-i z$ — der Hilbert-Operator hat dort den Eigenwert $-i$. Erst $\mathcal H^2$ liefert mit $(-i)^2=-1$ einen reellen Eigenwert.

Was du daraus mitnehmen solltest: $\mathcal H$ ist eine *Quadratur* — der reelle Eigenwert $-1$ stellt sich erst nach zweimaliger Anwendung ein, weil die einmalige Anwendung Sinus und Kosinus mischt.

---

[Zurück: Lösungen zu Einheit 5](einheit-5.md) · [Zurück zur Einheit](../einheit-6.md) · [Lösungs-Index](README.md) · [Weiter: Lösungen zu Einheit 7](einheit-7.md)
