"""Einheit 8: Synthese — Chirp und seine Momentanfrequenz."""

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
from scipy.signal import hilbert

fs = 4000.0
T = 1.0
t = np.arange(0, T, 1 / fs)

f0, f1 = 20.0, 200.0
phi = 2 * np.pi * (f0 * t + 0.5 * (f1 - f0) / T * t**2)
signal = np.cos(phi)

analytic = hilbert(signal)
inst_phase = np.unwrap(np.angle(analytic))
# np.diff lebt auf dem versetzten Gitter; Mittelpunkte als x-Achse verwenden
inst_freq = np.diff(inst_phase) / (2 * np.pi) * fs
t_freq = (t[:-1] + t[1:]) / 2

fig, axes = plt.subplots(2, 1, figsize=(11, 6), sharex=True)

axes[0].plot(t, signal, color="C0", lw=0.8)
axes[0].plot(t, np.abs(analytic), color="C3", lw=1.4, label=r"$|z(t)|$")
axes[0].axhline(0, color="gray", lw=0.5)
axes[0].set_ylabel("Amplitude")
axes[0].set_title("Linearer Chirp und Hüllkurve")
axes[0].legend(loc="upper right", fontsize=9)

axes[1].plot(t_freq, inst_freq, color="C2", lw=1.6, label="Momentanfrequenz aus Hilbert")
axes[1].plot(t, f0 + (f1 - f0) / T * t, color="black", linestyle="--",
             label="Soll: lineare Rampe")
axes[1].set_xlabel("t (s)")
axes[1].set_ylabel("f (Hz)")
axes[1].set_title("Momentanfrequenz $= \\frac{1}{2\\pi}\\frac{d}{dt}\\arg z(t)$")
axes[1].legend(loc="upper left", fontsize=9)

fig.tight_layout()
fig.savefig("kurs/bilder/einheit-8.png", dpi=120)
