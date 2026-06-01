# Einheit 7: Analytisches Signal

Wie bekommt man aus einem reellen Messsignal eine Hüllkurve, eine Phase und eine Momentanfrequenz? Das analytische Signal ergänzt die fehlende Quadratur-Komponente mit der Hilbert-Transformation. Dadurch wird aus einer Schwingung ein komplexer Zeiger, dessen Betrag und Winkel direkt lesbar sind.

## 7.1 Definition

Aus einem reellen Signal $x(t)$ bildet man das analytische Signal:

```math
z(t)=x(t)+i\mathcal{H}\{x\}(t).
```

Es kombiniert:

- Realteil: Originalsignal,
- Imaginärteil: Hilbert-Transformierte.

## 7.2 Frequenzbereich

Das analytische Signal enthält keine negativen Frequenzen. Mit $\mathrm{sgn}(0):=0$ lässt sich das kompakt schreiben als
```math
Z(\omega) = \bigl(1+\mathrm{sgn}(\omega)\bigr)X(\omega).
```
Aufgeschlüsselt:

```math
Z(\omega)=
\begin{cases}
2X(\omega), & \omega>0,\\
0, & \omega<0,
\end{cases}
```

und für den Gleichanteil bleibt der Wert bei $\omega=0$ unverändert. Bei reinen Schwingungen (also bei $X$, das aus $\delta$-Distributionen besteht) entfällt die punktweise Frage; bei der numerischen DFT-Implementierung muss man die Sonderbins explizit behandeln:

- $X[0]$ (DC/Gleichanteil) wird nicht verdoppelt.
- Bei ungeradem $N$ werden die positiven Bins $k=1,\ldots,(N-1)/2$ verdoppelt; die restlichen Bins werden auf null gesetzt.
- Bei geradem $N$ werden nur $k=1,\ldots,N/2-1$ verdoppelt. Der Nyquist-Bin $k=N/2$ wird wie der Gleichanteil nicht verdoppelt, weil positive und negative Nyquist-Frequenz dort algebraisch zusammenfallen.

Kurz: Negative Frequenzen werden entfernt, echte positive Frequenzen werden verdoppelt, und die Sonderbins DC sowie gegebenenfalls Nyquist bleiben erhalten.

## 7.3 Beispiel: Kosinus

Sei

```math
x(t)=A\cos(\omega_0t+\varphi),\qquad \omega_0>0.
```

Die Annahme $\omega_0>0$ ist wichtig: $\mathcal H$ wirkt frequenzabhängig, und das Vorzeichen von $\omega_0$ bestimmt, ob aus $\cos$ ein $+\sin$ oder ein $-\sin$ wird (vgl. [§6.4](einheit-6.md#64-beispiele)). Für $\omega_0<0$ würde sich das Vorzeichen umkehren. Unter der Annahme $\omega_0>0$ gilt:

```math
\mathcal{H}\{x\}(t)=A\sin(\omega_0t+\varphi).
```

Also:

```math
z(t)
= A\cos(\omega_0t+\varphi)+iA\sin(\omega_0t+\varphi)
= Ae^{i(\omega_0t+\varphi)}.
```

Das analytische Signal macht Amplitude und Phase direkt sichtbar.

## 7.4 Hüllkurve

Die Hüllkurve ist der Betrag des analytischen Signals:

```math
A(t)=|z(t)|.
```

Bei amplitudenmodulierten Signalen kann man so die langsam veränderliche Amplitude schätzen.

## 7.5 Momentane Phase

Die momentane Phase ist:

```math
\phi(t)=\arg z(t).
```

Der Hauptzweig von $\arg$ liefert Werte in $(-\pi,\pi]$. Sobald die Phase über die Grenze $\pm\pi$ hinausläuft, springt der Hauptwert um $2\pi$. Damit die Phase als Funktion der Zeit stetig wird, verwendet man in numerischen Anwendungen das **Phasen-Unwrapping** (z. B. `numpy.unwrap`): Es addiert an jeder Sprungstelle $\pm 2\pi$, sodass die Sprünge verschwinden, ohne den eigentlichen Phasenverlauf zu verändern.

## 7.6 Momentanfrequenz

Die Momentanfrequenz ist die zeitliche Ableitung der Phase:

```math
\omega_{\text{inst}}(t)=\frac{d}{dt}\phi(t).
```

In Hertz:

```math
f_{\text{inst}}(t)=\frac{1}{2\pi}\frac{d}{dt}\phi(t).
```

## 7.7 Typische Anwendung: AM-Signal

Betrachte ein Signal

```math
x(t)=A(t)\cos(\omega_ct),
```

wobei $A(t)$ langsam gegenüber der Trägerschwingung $\cos(\omega_ct)$ variiert. Praktisch bedeutet das: $A(t)$ ist bandbegrenzt deutlich unterhalb der Trägerfrequenz und im Idealfall nicht negativ.

Diese Spektraltrennung ist der entscheidende Punkt. Präzise gefasst wird das durch die **Bedrosian-Bedingung**:

> Sind die Spektren $\hat A$ und $\widehat{\cos(\omega_c\cdot)}$ disjunkt — konkret $\hat A(\omega)=0$ für $|\omega|\ge\omega_c$ und der Träger ist eine reine Schwingung bei $\pm\omega_c$ —, so gilt exakt
> $$\mathcal H\bigl\lbrace A(t)\cos(\omega_c t)\bigr\rbrace (t)=A(t)\sin(\omega_c t).$$

Diese Voraussetzung ist über die Modulations­regel aus [§4.3](einheit-4.md#43-frequenzverschiebung) anschaulich: das Spektrum von $A(t)\cos(\omega_c t)$ ist genau $\tfrac12[\hat A(\omega-\omega_c)+\hat A(\omega+\omega_c)]$; damit $\mathcal H$ die beiden Kopien sauber mit $\mp i$ gewichten kann, dürfen sie sich nicht überlappen.

Unter dieser Bedingung ist exakt:

```math
z(t)=A(t)e^{i\omega_ct}.
```

Die Hüllkurve $|z(t)|$ approximiert dann $A(t)$. Wenn $A(t)$ das Vorzeichen wechseln kann, liefert die Hüllkurve eher $|A(t)|$; bei Spektral­überlappung zwischen Modulation und Träger wird die Näherung schlechter, und in der Praxis (siehe Abbildung in §7.8) bleibt sie für $f_m\ll f_c$ gut.

Ein typisches Negativbeispiel ist
```math
x(t)=\bigl(1+0{,}8\cos(2\pi\cdot 60\,t)\bigr)\cos(2\pi\cdot 50\,t).
```
Es sieht formal wie AM aus, aber die Modulation liegt nicht mehr deutlich unter dem Träger. Die verschobenen Spektralkopien überlappen bzw. reichen durch die Nullfrequenz; die Hilbert-Hüllkurve muss dann nicht mehr $A(t)$ sein. Genau deshalb ist Bedrosian keine Formalität, sondern eine Prüfbedingung.

## 7.8 Visualisierung

![AM-Signal mit Hilbert-Hüllkurve und Spektrum des analytischen Signals](bilder/einheit-7.png)

Oben: Das schnelle Trägersignal $\cos(\omega_c t)$ ist mit einer langsamen Amplitude $A(t)=1+0{,}5\cos(2\pi f_m t)$ moduliert. Die Hüllkurve $|z(t)|$ folgt genau $A(t)$ — sie ist mit `np.abs(hilbert(x))` in zwei Zeilen Code zu haben. Unten: Das Spektrum des analytischen Signals liegt nur auf der positiven Frequenzseite und besteht aus einem schmalen Paket um $f_c=50\thinspace \text{Hz}$; die Modulation bei $f_m=3\thinspace \text{Hz}$ bleibt deutlich vom Träger getrennt. Das ist die Bedrosian-Bedingung im Bild.

Kernidee in Python (vollständiges Skript: [`scripts/einheit-7.py`](scripts/einheit-7.py)):

```python
import numpy as np
from scipy.signal import hilbert

fs = 2000.0
t = np.arange(0, 1.0, 1 / fs)
envelope = 1.0 + 0.5 * np.cos(2 * np.pi * 3.0 * t)
signal = envelope * np.cos(2 * np.pi * 50.0 * t)

recovered = np.abs(hilbert(signal))    # ≈ envelope
```

## Übungen zu Einheit 7

1. Bilde das analytische Signal zu $x(t)=3\cos(10t)$.
2. Berechne die Hüllkurve und die momentane Phase von $x(t)=2\cos(5t+\pi/4)$. (Hinweis: bilde zuerst das analytische Signal.)
3. Was ist die Momentanfrequenz von $z(t)=e^{i(7t)}$?
4. Warum entfernt das analytische Signal negative Frequenzen?
5. Konstruiere ein AM-ähnliches Beispiel, in dem $|z(t)|\neq A(t)$, obwohl $x(t)=A(t)\cos(\omega_ct)$ formal so aussieht. Begründe über die Bedrosian-Bedingung.
6. Implementationscheck: Eine reelle Folge hat gerades $N=8$. Welche DFT-Bins werden beim Bilden des analytischen Signals verdoppelt, welche bleiben erhalten, und welche werden auf null gesetzt?

## Selbstcheck zu Einheit 7

- [ ] Ich kann das analytische Signal aus $x$ und $\mathcal H\lbrace x\rbrace $ bilden.
- [ ] Ich kann erklären, warum negative Frequenzen entfernt und positive verdoppelt werden.
- [ ] Ich kann bei einer DFT-Implementierung DC- und Nyquist-Bin korrekt behandeln.
- [ ] Ich kann Betrag, Phase und Momentanfrequenz aus $z(t)$ ablesen.
- [ ] Ich kann die Bedrosian-Bedingung für ein AM-Signal qualitativ prüfen.
- [ ] Ich kann ein Beispiel nennen, bei dem die Hilbert-Hüllkurve nicht die modellierte Amplitude ist.

Lösungen: [loesungen/einheit-7.md](loesungen/einheit-7.md)

---

[Zurück: Einheit 6 — Hilbert-Transformation](einheit-6.md) · [Index](README.md) · [Weiter: Einheit 8 — Gemeinsames Bild](einheit-8.md)
