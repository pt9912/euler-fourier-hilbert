# Lösungen zu Einheit 4a: Verschieben, Modulieren, Skalieren, Ableiten

Aufgabenstellung: [Einheit 4a — Übungen](../einheit-4a.md#übungen-zu-einheit-4a)

## Lösung 1

Für eine Zeitverschiebung gilt:

$$x(t-t_0)\leftrightarrow e^{-i\omega t_0}X(\omega).$$

Der Faktor $e^{-i\omega t_0}$ hat Betrag $1$. Deshalb bleibt $|X(\omega)|$ gleich, aber die Phase ändert sich um $-\omega t_0$.

## Lösung 2

Die Ableitung erfüllt:

$$\frac{d}{dt}x(t)\leftrightarrow i\omega X(\omega).$$

Der Betrag des Faktors ist

$$|i\omega|=|\omega|.$$

Hohe Frequenzen werden daher stärker gewichtet als niedrige.

## Lösung 3

Setze $u=t_0-t$. Dann ist $t=t_0-u$ und $dt=-du$. Im Fourier-Integral folgt:

$$Y(\omega) =\int_{-\infty}^{\infty}x(t_0-t)e^{-i\omega t}\thinspace dt =e^{-i\omega t_0}\int_{-\infty}^{\infty}x(u)e^{i\omega u}\thinspace du =e^{-i\omega t_0}X(-\omega).$$

Die Spiegelung vertauscht also $\omega$ und $-\omega$; die anschließende Verschiebung erzeugt den Phasenfaktor $e^{-i\omega t_0}$. Was du daraus mitnehmen solltest: Zusammengesetzte Signaloperationen lassen sich regelweise zerlegen, aber die Reihenfolge entscheidet über den Phasenfaktor.

## Lösung 4

Zuerst betrachten wir die verzögerte Version

$$u(t)=x(t-t_0).$$

Nach der Zeitverschiebungsregel gilt

$$U(\omega)=e^{-i\omega t_0}X(\omega).$$

Danach wird mit $e^{i\omega_ct}$ moduliert. Das verschiebt das Spektrum:

$$Y(\omega)=U(\omega-\omega_c) =e^{-i(\omega-\omega_c)t_0}X(\omega-\omega_c).$$

Die Reihenfolge zeigt sich im Phasenfaktor: Er enthält $\omega-\omega_c$, weil erst verzögert und danach das bereits verzögerte Spektrum verschoben wird.

## Lösung 5

Die einfachste Konstruktion nutzt eine Zeitverschiebung: Wähle ein beliebiges reelles $x(t)$ und setze

$$y_1(t)=x(t),\qquad y_2(t)=x(t-t_0)$$

für ein $t_0\ne 0$. Dann gilt $Y_2(\omega)=e^{-i\omega t_0}X(\omega)$, also $|Y_2(\omega)|=|Y_1(\omega)|$. Die Phasenspektren unterscheiden sich um den linearen Term $-\omega t_0$.

Eine zweite Konstruktion ist die Zeitumkehr $y_2(t)=x(-t)$: Es gilt $Y_2(\omega)=X(-\omega)$, also wieder $|Y_2(\omega)|=|Y_1(\omega)|$ — allerdings spiegelt sich die Phase, und für reelle Signale ändert das nichts am Betrag, weil $|X(-\omega)|=|X(\omega)|$ aus der hermiteschen Symmetrie folgt. Was du daraus mitnehmen solltest: Betragsspektren sind nicht eindeutig zuordenbar — die Phase trägt die Lage- und Richtungsinformation.

## Lösung 6

Die behauptete Aussage $x(t)\cos(\omega_c t)\leftrightarrow X(\omega-\omega_c)$ hat zwei Fehler. Erstens fehlt der Vorfaktor $\tfrac12$, zweitens fehlt die zweite, nach $-\omega_c$ verschobene Kopie. Beide Fehler stammen aus derselben Quelle: $\cos$ wird stillschweigend mit $e^{i\omega_c t}$ verwechselt.

Sauber gerechnet liefert die Euler-Zerlegung $\cos(\omega_c t)=\tfrac12(e^{i\omega_c t}+e^{-i\omega_c t})$ zusammen mit der Frequenzverschiebung aus §4a.3:

$$x(t)\cos(\omega_c t)\leftrightarrow \tfrac12\bigl[X(\omega-\omega_c)+X(\omega+\omega_c)\bigr].$$

**Spezialfall-Test.** Für $x(t)\equiv 1$ ist $X(\omega)=2\pi\delta(\omega)$, und das Signal wird zu $\cos(\omega_c t)$, dessen Spektrum bekannt ist:

$$\mathcal F\lbrace\cos(\omega_c t)\rbrace=\pi\bigl[\delta(\omega-\omega_c)+\delta(\omega+\omega_c)\rbrack.$$

Setzt man $X(\omega)=2\pi\delta(\omega)$ in die korrekte Regel ein, ergibt sich genau dasselbe — beide Linien tauchen mit Höhe $\pi$ auf. Die falsche Version $X(\omega-\omega_c)$ würde nur die Linie bei $+\omega_c$ liefern und damit das Spektrum eines komplexen Trägers $e^{i\omega_c t}$ statt eines reellen Kosinus beschreiben.

Was du daraus mitnehmen solltest: Reelle Träger erzeugen *immer* zwei spektrale Kopien (positive und negative Frequenz). Wer eine einzelne Kopie sieht, hat unbemerkt zur komplexen Schwingung gewechselt — derselbe Mechanismus wird in [Einheit 7](../einheit-7.md) für das analytische Signal *gewollt* eingesetzt.

---

[Zurück: Lösungen zu Einheit 3](einheit-3.md) · [Zurück zur Einheit](../einheit-4a.md) · [Lösungs-Index](README.md) · [Weiter: Lösungen zu Einheit 4b](einheit-4b.md)
