"""Einheit 2: Rechteckwelle als Fourier-Reihe (Gibbs-Phänomen)."""

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

t = np.linspace(-np.pi, np.pi, 2000)
ground_truth = np.sign(np.sin(t))


def partial_sum(num_terms: int) -> np.ndarray:
    result = np.zeros_like(t)
    for k in range(num_terms):
        n = 2 * k + 1
        result += np.sin(n * t) / n
    return (4 / np.pi) * result


fig, ax = plt.subplots(figsize=(10, 4.5))
ax.plot(t, ground_truth, color="black", lw=1.2, label="Rechteckwelle")
for num_terms, color in zip([1, 3, 7, 25], ["C0", "C1", "C2", "C3"]):
    ax.plot(t, partial_sum(num_terms), color=color, lw=1.4,
            label=f"Partialsumme bis n={2*num_terms-1}")
ax.axhline(0, color="gray", lw=0.5)
ax.axvline(0, color="gray", lw=0.9, linestyle=":",
           label="Sprungstelle: Mittelwert 0")
ax.set_xlabel("t")
ax.set_title("Fourier-Reihe der Rechteckwelle: Annäherung wächst, Gibbs-Überschwinger bleibt")
ax.legend(loc="lower right", fontsize=9)

fig.tight_layout()
fig.savefig("kurs/bilder/einheit-2.png", dpi=120)
