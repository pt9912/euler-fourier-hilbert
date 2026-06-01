"""Einheit 3: Zeit-Frequenz-Dualität — Rechteckpuls/Sinc und Gauß/Gauß."""

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

t = np.linspace(-6, 6, 2000)
omega = np.linspace(-15, 15, 2000)

a_rect = 1.0
rect = np.where(np.abs(t) <= a_rect, 1.0, 0.0)
rect_ft = np.where(np.abs(omega) > 1e-9,
                   2 * np.sin(omega * a_rect) / np.where(omega == 0, 1, omega),
                   2 * a_rect)

a_gauss = 1.0
gauss = np.exp(-a_gauss * t**2)
gauss_ft = np.sqrt(np.pi / a_gauss) * np.exp(-omega**2 / (4 * a_gauss))

fig, axes = plt.subplots(2, 2, figsize=(11, 6.5))

axes[0, 0].plot(t, rect, color="C0")
axes[0, 0].set_title(r"Rechteckpuls $x(t)$")
axes[0, 0].set_xlabel("t")
axes[0, 0].set_ylim(-0.2, 1.3)

axes[0, 1].plot(omega, rect_ft, color="C0")
axes[0, 1].axhline(0, color="gray", lw=0.5)
axes[0, 1].set_title(r"Sinc-Spektrum $X(\omega)=2\sin(\omega a)/\omega$")
axes[0, 1].set_xlabel(r"$\omega$")

axes[1, 0].plot(t, gauss, color="C1")
axes[1, 0].set_title(r"Gaußfunktion $e^{-at^2}$")
axes[1, 0].set_xlabel("t")
axes[1, 0].set_ylim(-0.05, 1.2)

axes[1, 1].plot(omega, gauss_ft, color="C1")
axes[1, 1].set_title(r"Gauß-Spektrum $\sqrt{\pi/a}\,e^{-\omega^2/(4a)}$")
axes[1, 1].set_xlabel(r"$\omega$")

fig.suptitle("Zeit-Frequenz-Dualität: schmal im Zeitbereich → breit im Frequenzbereich", y=1.0)
fig.tight_layout()
fig.savefig("kurs/bilder/einheit-3.png", dpi=120)
