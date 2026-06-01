"""Einheit 6: Hilbert-Transformation — 90°-Phasenverschiebung."""

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
from scipy.signal import hilbert

fs = 1000.0
t = np.arange(0, 1.0, 1 / fs)
omega0 = 2 * np.pi * 5.0

cos_signal = np.cos(omega0 * t)
hilbert_cos = np.imag(hilbert(cos_signal))

fig, axes = plt.subplots(2, 1, figsize=(10, 5.5), sharex=True)

axes[0].plot(t, cos_signal, color="C0", label=r"$\cos(\omega_0 t)$")
axes[0].plot(t, hilbert_cos, color="C3", label=r"$H[\cos(\omega_0 t)] = \sin(\omega_0 t)$")
axes[0].axhline(0, color="gray", lw=0.5)
axes[0].set_ylabel("Amplitude")
axes[0].set_title("Hilbert-Transformation verschiebt jede Frequenz um 90°")
axes[0].legend(loc="upper right", fontsize=9)

t_zoom_mask = t <= 0.4
axes[1].plot(t[t_zoom_mask], cos_signal[t_zoom_mask], color="C0")
axes[1].plot(t[t_zoom_mask], hilbert_cos[t_zoom_mask], color="C3")
axes[1].axhline(0, color="gray", lw=0.5)
axes[1].set_xlabel("t (s)")
axes[1].set_ylabel("Amplitude")
axes[1].set_title("Zoom: Maximum von cos fällt auf Nulldurchgang von sin (Quadratur)")

fig.tight_layout()
fig.savefig("kurs/bilder/einheit-6.png", dpi=120)
