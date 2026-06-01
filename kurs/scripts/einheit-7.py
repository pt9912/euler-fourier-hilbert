"""Einheit 7: Analytisches Signal — Hüllkurve eines AM-Signals."""

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
from scipy.signal import hilbert

fs = 2000.0
t = np.arange(0, 1.0, 1 / fs)
f_carrier = 50.0
f_mod = 3.0

envelope = 1.0 + 0.5 * np.cos(2 * np.pi * f_mod * t)
signal = envelope * np.cos(2 * np.pi * f_carrier * t)

analytic = hilbert(signal)
recovered_envelope = np.abs(analytic)

fig, ax = plt.subplots(figsize=(11, 4.5))
ax.plot(t, signal, color="C0", lw=0.8, label=r"$x(t)=A(t)\cos(\omega_c t)$")
ax.plot(t, recovered_envelope, color="C3", lw=1.6, label=r"$|z(t)|$ aus Hilbert")
ax.plot(t, -recovered_envelope, color="C3", lw=1.6, linestyle="--")
ax.axhline(0, color="gray", lw=0.5)
ax.set_xlabel("t (s)")
ax.set_ylabel("Amplitude")
ax.set_title("Analytisches Signal extrahiert die Hüllkurve eines AM-Signals")
ax.legend(loc="upper right", fontsize=9)

fig.tight_layout()
fig.savefig("kurs/bilder/einheit-7.png", dpi=120)
