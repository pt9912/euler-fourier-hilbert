# Einheit 2: Fourier-Reihen

## 2.1 Grundidee

Viele periodische Signale lassen sich als Summe einfacher Schwingungen schreiben. Statt Sinus und Kosinus verwendet man oft komplexe Exponentialfunktionen:

$$
e^{in\omega_0 t}
$$

mit Grundkreisfrequenz

$$
\omega_0 = \frac{2\pi}{T}.
$$

Hier ist \(T\) die Periode und \(n\) eine ganze Zahl.

## 2.2 Komplexe Fourier-Reihe

Für ein periodisches Signal \(f(t)\) mit Periode \(T\) gilt unter geeigneten Bedingungen:

$$
f(t) = \sum_{n=-\infty}^{\infty} c_n e^{in\omega_0 t}.
$$

Die Koeffizienten sind:

$$
c_n = \frac{1}{T}\int_{t_0}^{t_0+T} f(t)e^{-in\omega_0 t}\,dt.
$$

Die Zahl \(c_n\) sagt:

- wie stark die Frequenz \(n\omega_0\) vorkommt,
- mit welcher Phase sie vorkommt.

## 2.3 Warum funktioniert das?

Die Funktionen \(e^{in\omega_0 t}\) sind über eine Periode orthogonal:

$$
\frac{1}{T}\int_{0}^{T} e^{in\omega_0 t}e^{-im\omega_0 t}\,dt
=
\begin{cases}
1, & n=m,\\
0, & n\ne m.
\end{cases}
$$

Das ist ähnlich wie bei rechtwinkligen Vektoren im Raum: Man kann ein Signal auf eine Frequenzrichtung projizieren.

## 2.4 Beispiel: Reine Kosinusschwingung

Sei

$$
f(t) = \cos(\omega_0 t).
$$

Mit Euler:

$$
\cos(\omega_0 t)
= \frac{e^{i\omega_0 t}+e^{-i\omega_0 t}}{2}.
$$

Also sind nur zwei Koeffizienten ungleich null:

$$
c_1 = \frac12, \qquad c_{-1} = \frac12.
$$

## 2.5 Beispiel: Reine Sinusschwingung

Sei

$$
f(t)=\sin(\omega_0 t).
$$

Dann:

$$
\sin(\omega_0 t)
= \frac{e^{i\omega_0 t}-e^{-i\omega_0 t}}{2i}.
$$

Also:

$$
c_1 = \frac{1}{2i} = -\frac{i}{2},
\qquad
c_{-1} = -\frac{1}{2i} = \frac{i}{2}.
$$

## 2.6 Betrag und Phase

Ein Fourier-Koeffizient \(c_n\) ist komplex.

- \(|c_n|\) beschreibt die Stärke dieses zweiseitigen Frequenzanteils.
- \(\arg(c_n)\) beschreibt die Phase.

Wichtig: Bei reellwertigen Signalen verteilt sich eine reale Sinus- oder Kosinusamplitude auf ein Paar positiver und negativer Frequenzen. Zum Beispiel hat

$$
\cos(\omega_0t)
= \frac12 e^{i\omega_0t}+\frac12 e^{-i\omega_0t}
$$

die reale Amplitude \(1\), aber die zweiseitigen Koeffizienten \(c_1=c_{-1}=1/2\). In einem einseitigen Amplitudenspektrum fasst man diese beiden Beiträge oft zusammen; dann taucht für \(n>0\) ein Faktor \(2\) auf.

Für reellwertige Signale gilt:

$$
c_{-n} = \overline{c_n}.
$$

Das bedeutet: Positive und negative Frequenzen sind nicht unabhängig, wenn das Signal reell ist.

## Übungen zu Einheit 2

1. Bestimme die komplexen Fourier-Koeffizienten von \(f(t)=2\cos(3\omega_0t)\).
2. Bestimme die komplexen Fourier-Koeffizienten von \(f(t)=4\sin(2\omega_0t)\).
3. Warum treten bei reellen Signalen positive und negative Frequenzen paarweise auf?
4. Erkläre den Unterschied zwischen Grundfrequenz und Oberwelle.

Lösungen: [loesungen/einheit-2.md](loesungen/einheit-2.md)

---

[Zurück: Einheit 1 — Euler-Formel](einheit-1.md) · [Index](README.md) · [Weiter: Einheit 3 — Fourier-Transformation](einheit-3.md)
