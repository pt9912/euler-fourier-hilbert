"""Projekt 2: AM-Signal — Bedrosian-Bedingung und Hüllkurven-Rekonstruktion.

Für x(t) = A(t) cos(2π f_c t) gilt H{x}(t) = A(t) sin(2π f_c t) und damit
|z(t)| = |A(t)| genau dann, wenn das Spektrum von A(t) (Bandbreite W)
keine Überlappung mit ±f_c hat. Für ein einseitig bandbegrenztes A(t)
heißt das W < f_c (Bedrosian-Theorem).

Drei Fälle illustrieren das:

1. BC deutlich erfüllt — Hilbert-Hüllkurve = A(t).
2. BC durch einen einzelnen Hochfrequenz-Modulationston verletzt
   (f_m > f_c): die untere Seitenband-Frequenz wird negativ und faltet
   sich an die positive Achse, |z(t)| weicht systematisch von A(t) ab.
3. BC durch einen versteckten Hochfrequenz-Anteil in einer sonst
   harmlosen Modulation verletzt — der niederfrequente Anteil wird noch
   korrekt extrahiert, der hochfrequente erzeugt Geister-Modulation.
"""

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
from scipy.signal import hilbert

fs = 2000.0
T = 1.0
N = int(fs * T)
t = np.arange(N) / fs


def am_signal(f_c, components):
    """A(t) = 1 + sum_k m_k cos(2π f_k t); x(t) = A(t) cos(2π f_c t)."""
    A = np.ones_like(t)
    for m, f in components:
        A = A + m * np.cos(2 * np.pi * f * t)
    return A, A * np.cos(2 * np.pi * f_c * t)


# (f_c, [(m_k, f_k), …], xlim_zeit, fmax_spec, Titel)
cases = [
    (50.0, [(0.5, 3.0)], 0.35, 80.0,
     r"BC erfüllt: $f_c=50$ Hz, Modulation $f_m=3$ Hz"),
    (8.0,  [(0.5, 12.0)], 0.5, 35.0,
     r"BC verletzt: $f_c=8$ Hz, $f_m=12$ Hz (>$f_c$)"),
    (8.0,  [(0.4, 2.0), (0.3, 12.0)], 0.5, 35.0,
     r"BC versteckt verletzt: $f_c=8$ Hz, Mod. enthält 2 Hz und 12 Hz"),
]

fig, axes = plt.subplots(len(cases), 2, figsize=(13, 11))

for row, (f_c, comps, xlim_t, fmax, title) in enumerate(cases):
    A_true, x = am_signal(f_c, comps)
    z = hilbert(x)
    env_hilbert = np.abs(z)

    axes[row, 0].plot(t, x, color="C0", lw=0.6, label=r"$x(t)$")
    axes[row, 0].plot(t, A_true, color="black", linestyle="--", lw=1.3,
                      label=r"$A(t)$ (Soll)")
    axes[row, 0].plot(t, env_hilbert, color="C3", lw=1.4,
                      label=r"$|z(t)|$ (Hilbert)")
    axes[row, 0].axhline(0, color="gray", lw=0.4)
    axes[row, 0].set_xlim(0, xlim_t)
    axes[row, 0].set_xlabel("t (s)")
    axes[row, 0].set_ylabel("Amplitude")
    axes[row, 0].set_title(title)
    axes[row, 0].legend(loc="upper right", fontsize=8)
    axes[row, 0].grid(alpha=0.3)

    X = np.fft.rfft(x) / N
    A_spec = np.fft.rfft(A_true) / N
    freqs = np.fft.rfftfreq(N, d=1 / fs)
    mask = freqs <= fmax
    # Modulations-Bandbreite W = höchste Frequenz in A(t)
    W = max(f for _, f in comps)

    axes[row, 1].vlines(freqs[mask], 0, np.abs(X[mask]),
                        color="C0", lw=2.2, label=r"$|X(f)|$")
    axes[row, 1].vlines(freqs[mask], 0, np.abs(A_spec[mask]),
                        color="C2", lw=2.2, alpha=0.7,
                        label=r"$|\hat A(f)|$ (Modulation)")
    # Schraffierter Bereich: Modulationsband [0, W]
    axes[row, 1].axvspan(0, W, color="C2", alpha=0.10,
                         label=fr"Mod-Band $[0,\,W={W:g}]$")
    axes[row, 1].axvline(f_c, color="C3", lw=0.9, linestyle=":",
                         label=fr"Träger $f_c={f_c:g}$ Hz")
    if W >= f_c:
        axes[row, 1].axvspan(f_c, W, color="C3", alpha=0.18,
                             label="Überlapp (BC-Verletzung)")
    axes[row, 1].set_xlim(0, fmax)
    axes[row, 1].set_ylim(0, 0.6)
    axes[row, 1].set_xlabel("f (Hz)")
    axes[row, 1].set_ylabel("normierter Betrag")
    axes[row, 1].set_title("Modulations-Bandbreite $W$ vs. Träger $f_c$")
    axes[row, 1].legend(loc="upper right", fontsize=7)
    axes[row, 1].grid(alpha=0.3)

fig.suptitle("Projekt 2: AM-Signal — Hüllkurve nur bei erfüllter "
             "Bedrosian-Bedingung", fontsize=13)
fig.tight_layout()
fig.savefig("kurs/bilder/projekt-2.png", dpi=110)
