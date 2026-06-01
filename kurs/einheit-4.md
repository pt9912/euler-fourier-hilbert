# Einheit 4: Eigenschaften der Fourier-Transformation

Die folgenden Eigenschaften sind oft wichtiger als einzelne Integrale.

## 4.1 Linearität

Wenn

$$
x(t) \leftrightarrow X(\omega), \qquad y(t)\leftrightarrow Y(\omega),
$$

dann gilt:

$$
ax(t)+by(t) \leftrightarrow aX(\omega)+bY(\omega).
$$

## 4.2 Zeitverschiebung

$$
x(t-t_0) \leftrightarrow e^{-i\omega t_0}X(\omega).
$$

Eine Verschiebung im Zeitbereich ändert die Phase im Frequenzbereich.

## 4.3 Frequenzverschiebung

$$
e^{i\omega_0t}x(t) \leftrightarrow X(\omega-\omega_0).
$$

Multiplikation mit einer komplexen Schwingung verschiebt das Spektrum.

## 4.4 Skalierung

Für \(a\ne0\):

$$
x(at) \leftrightarrow \frac{1}{|a|}X\left(\frac{\omega}{a}\right).
$$

Zeitliche Stauchung führt zu spektraler Streckung.

## 4.5 Ableitung

$$
\frac{d}{dt}x(t) \leftrightarrow i\omega X(\omega).
$$

Ableiten verstärkt hohe Frequenzen.

## 4.6 Faltung

Die Faltung zweier Funktionen ist:

$$
(x*h)(t)=\int_{-\infty}^{\infty}x(\tau)h(t-\tau)\,d\tau.
$$

Im Frequenzbereich gilt:

$$
x*h \leftrightarrow X(\omega)H(\omega).
$$

Faltung im Zeitbereich wird Multiplikation im Frequenzbereich.

Umgekehrt gilt:

$$
x(t)h(t) \leftrightarrow \frac{1}{2\pi}(X*H)(\omega).
$$

## 4.7 Parseval-Identität

Für geeignete Signale gilt:

$$
\int_{-\infty}^{\infty}|x(t)|^2\,dt
=
\frac{1}{2\pi}\int_{-\infty}^{\infty}|X(\omega)|^2\,d\omega.
$$

Die Energie eines Signals kann im Zeit- oder Frequenzbereich gemessen werden.

## Übungen zu Einheit 4

1. Was passiert im Frequenzbereich, wenn ein Signal zeitlich verschoben wird?
2. Warum verstärkt Ableiten hohe Frequenzen?
3. Was ist der Vorteil des Faltungssatzes?
4. Ein Filter hat Spektrum \(H(\omega)\). Was ist das Spektrum des gefilterten Signals \(y=x*h\)?

Lösungen: [loesungen/einheit-4.md](loesungen/einheit-4.md)

---

[Zurück: Einheit 3 — Fourier-Transformation](einheit-3.md) · [Index](README.md) · [Weiter: Einheit 5 — DFT und FFT](einheit-5.md)
