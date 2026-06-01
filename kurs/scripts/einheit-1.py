"""Einheit 1: Euler-Formel als Einheitskreis und Projektion auf Achsen."""

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

phi = np.linspace(0, 2 * np.pi, 400)
z = np.exp(1j * phi)

phi_marker = np.array([0, np.pi / 4, np.pi / 2, 2 * np.pi / 3, np.pi])
z_marker = np.exp(1j * phi_marker)

fig, (ax_circle, ax_time) = plt.subplots(1, 2, figsize=(11, 4.5))

ax_circle.plot(z.real, z.imag, color="C0", lw=2)
ax_circle.scatter(z_marker.real, z_marker.imag, color="C3", zorder=3)
for p, w in zip(phi_marker, z_marker):
    label = rf"$e^{{i\,{p/np.pi:.2f}\pi}}$"
    ax_circle.annotate(label, (w.real, w.imag), textcoords="offset points",
                       xytext=(8, 8), fontsize=9)
ax_circle.axhline(0, color="gray", lw=0.5)
ax_circle.axvline(0, color="gray", lw=0.5)
ax_circle.set_aspect("equal")
ax_circle.set_xlim(-1.4, 1.4)
ax_circle.set_ylim(-1.4, 1.4)
ax_circle.set_xlabel("Re")
ax_circle.set_ylabel("Im")
ax_circle.set_title(r"$e^{i\varphi}$ auf dem Einheitskreis")

ax_time.plot(phi, np.cos(phi), color="C0", label=r"$\cos\varphi = \mathrm{Re}\,e^{i\varphi}$")
ax_time.plot(phi, np.sin(phi), color="C1", label=r"$\sin\varphi = \mathrm{Im}\,e^{i\varphi}$")
ax_time.axhline(0, color="gray", lw=0.5)
ax_time.set_xlabel(r"$\varphi$")
ax_time.set_title("Projektion auf Real- und Imaginärachse")
ax_time.legend(loc="lower left", fontsize=9)

fig.tight_layout()
fig.savefig("kurs/bilder/einheit-1.png", dpi=120)
