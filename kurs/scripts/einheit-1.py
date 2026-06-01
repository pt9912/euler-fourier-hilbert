"""Einheit 1: Euler-Formel als Einheitskreis und Projektion auf Achsen."""

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

phi = np.linspace(0, 2 * np.pi, 400)
z = np.exp(1j * phi)

# Marker-Winkel als Brüche von pi mit lesbaren LaTeX-Labels
phi_markers = [
    (0, r"$1$"),
    (np.pi / 4, r"$e^{i\pi/4}$"),
    (np.pi / 2, r"$e^{i\pi/2}=i$"),
    (2 * np.pi / 3, r"$e^{i\,2\pi/3}$"),
    (np.pi, r"$e^{i\pi}=-1$"),
]
phi_marker = np.array([p for p, _ in phi_markers])
z_marker = np.exp(1j * phi_marker)

fig, (ax_circle, ax_time) = plt.subplots(1, 2, figsize=(11, 4.5))

ax_circle.plot(z.real, z.imag, color="C0", lw=2)
ax_circle.scatter(z_marker.real, z_marker.imag, color="C3", zorder=3)
for (p, label), w in zip(phi_markers, z_marker):
    ax_circle.annotate(label, (w.real, w.imag), textcoords="offset points",
                       xytext=(8, 8), fontsize=10)

# Projektionslinien für phi = 2*pi/3 als geometrischen Beleg von cos/sin.
# Der Marker e^{i 2pi/3} ist bei (-0.5, 0.866); wir lassen Loten auf x- und y-Achse fallen.
phi_demo = 2 * np.pi / 3
z_demo = np.exp(1j * phi_demo)
ax_circle.plot([z_demo.real, z_demo.real], [0, z_demo.imag],
               color="C2", lw=1.2, linestyle=":")
ax_circle.plot([0, z_demo.real], [z_demo.imag, z_demo.imag],
               color="C1", lw=1.2, linestyle=":")
# Marker auf den Achsen, damit klar wird: das sind die Projektionen
ax_circle.scatter([z_demo.real], [0], color="C2", zorder=3, s=30)
ax_circle.scatter([0], [z_demo.imag], color="C1", zorder=3, s=30)
ax_circle.annotate(r"$\cos(2\pi/3)$", (z_demo.real, 0),
                   textcoords="offset points", xytext=(-6, -18),
                   fontsize=9, color="C2", ha="center")
ax_circle.annotate(r"$\sin(2\pi/3)$", (0, z_demo.imag),
                   textcoords="offset points", xytext=(10, 0),
                   fontsize=9, color="C1", va="center")

ax_circle.axhline(0, color="gray", lw=0.5)
ax_circle.axvline(0, color="gray", lw=0.5)
ax_circle.set_aspect("equal")
ax_circle.set_xlim(-1.4, 1.4)
ax_circle.set_ylim(-1.4, 1.4)
ax_circle.set_xlabel("Re")
ax_circle.set_ylabel("Im")
ax_circle.set_title(r"$e^{i\varphi}$ auf dem Einheitskreis")

ax_time.plot(phi, np.cos(phi), color="C2", label=r"$\cos\varphi = \mathrm{Re}\,e^{i\varphi}$")
ax_time.plot(phi, np.sin(phi), color="C1", label=r"$\sin\varphi = \mathrm{Im}\,e^{i\varphi}$")
# Demo-Punkte derselben phi_demo-Stelle, damit Bild und Diagramm gekoppelt sind
ax_time.scatter([phi_demo], [np.cos(phi_demo)], color="C2", zorder=3)
ax_time.scatter([phi_demo], [np.sin(phi_demo)], color="C1", zorder=3)
ax_time.axvline(phi_demo, color="gray", lw=0.5, linestyle=":")
ax_time.axhline(0, color="gray", lw=0.5)
ax_time.set_xlabel(r"$\varphi$")
ax_time.set_xticks([0, np.pi / 2, np.pi, 3 * np.pi / 2, 2 * np.pi])
ax_time.set_xticklabels(["0", r"$\pi/2$", r"$\pi$", r"$3\pi/2$", r"$2\pi$"])
ax_time.set_title("Projektion auf Real- und Imaginärachse")
ax_time.legend(loc="lower left", fontsize=9)

fig.tight_layout()
fig.savefig("kurs/bilder/einheit-1.png", dpi=120)
