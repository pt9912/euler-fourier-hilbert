"""Einheit 4: Faltungssatz — Rechteck * Rechteck = Dreieck."""

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

t = np.linspace(-3, 3, 4000)
omega = np.linspace(-25, 25, 4000)
dt = t[1] - t[0]

a = 0.5
rect = np.where(np.abs(t) <= a, 1.0, 0.0)
convolved = np.convolve(rect, rect, mode="same") * dt

rect_ft = 2 * a * np.sinc(omega * a / np.pi)   # 2 sin(omega a)/omega, sauber bei 0
product_ft = rect_ft ** 2

fig, axes = plt.subplots(2, 2, figsize=(11, 6.5))

axes[0, 0].plot(t, rect, color="C0", label=r"$x(t)$")
axes[0, 0].plot(t, rect, color="C1", linestyle="--", label=r"$h(t)$")
axes[0, 0].set_title("Zwei Rechteckpulse")
axes[0, 0].set_xlabel("t")
axes[0, 0].legend(fontsize=9)
axes[0, 0].set_ylim(-0.2, 1.3)

axes[0, 1].plot(t, convolved, color="C2")
axes[0, 1].set_title(r"Faltung $(x*h)(t)$ — Dreieckspuls")
axes[0, 1].set_xlabel("t")

axes[1, 0].plot(omega, rect_ft, color="C0")
axes[1, 0].axhline(0, color="gray", lw=0.5)
axes[1, 0].set_title(r"Spektrum $X(\omega)=H(\omega)$")
axes[1, 0].set_xlabel(r"$\omega$")

axes[1, 1].plot(omega, product_ft, color="C2")
axes[1, 1].set_title(r"Produkt $X(\omega)\cdot H(\omega)=\mathrm{sinc}^2$")
axes[1, 1].set_xlabel(r"$\omega$")

fig.suptitle("Faltungssatz: Faltung im Zeitbereich = Multiplikation im Frequenzbereich", y=1.0)
fig.tight_layout()
fig.savefig("kurs/bilder/einheit-4.png", dpi=120)
