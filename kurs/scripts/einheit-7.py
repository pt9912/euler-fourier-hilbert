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

fig, (ax_time, ax_spec) = plt.subplots(2, 1, figsize=(11, 7))

ax_time.plot(t, signal, color="C0", lw=0.8, label=r"$x(t)=A(t)\cos(\omega_c t)$")
ax_time.plot(t, recovered_envelope, color="C3", lw=1.6, label=r"$|z(t)|$ aus Hilbert")
ax_time.plot(t, -recovered_envelope, color="C3", lw=1.6, linestyle="--")
ax_time.axhline(0, color="gray", lw=0.5)
ax_time.set_xlabel("t (s)")
ax_time.set_ylabel("Amplitude")
ax_time.set_title("Analytisches Signal extrahiert die Hüllkurve eines AM-Signals")
ax_time.legend(loc="upper right", fontsize=9)

freqs_z = np.fft.fftfreq(t.size, d=1 / fs)
Z = np.fft.fft(analytic) / t.size
freqs_env = np.fft.rfftfreq(t.size, d=1 / fs)
A = np.fft.rfft(envelope) / t.size

z_mask = (freqs_z >= 0) & (freqs_z <= 80) & (np.abs(Z) > 0.02)
env_mask = (freqs_env >= 0) & (freqs_env <= 80) & (np.abs(A) > 0.02)

ax_spec.vlines(freqs_env[env_mask], 0, np.abs(A[env_mask]),
               color="C2", lw=2.2, label=r"$|\hat A(f)|$")
ax_spec.vlines(freqs_z[z_mask], 0, np.abs(Z[z_mask]),
               color="C3", lw=2.2, linestyle="--", label=r"$|Z(f)|$")
ax_spec.axvspan(-2, 2 * f_mod, color="C2", alpha=0.08, label="Modulationsband")
ax_spec.axvline(f_carrier, color="gray", lw=0.8, linestyle=":", label="Träger")
ax_spec.set_xlim(-2, 80)
ax_spec.set_ylim(0, 1.1)
ax_spec.set_xlabel("f (Hz)")
ax_spec.set_ylabel("normierter Betrag")
ax_spec.set_title("Spektraltrennung: Hüllkurve nahe 0 Hz, analytisches Signal um den Träger")
ax_spec.legend(loc="upper right", fontsize=9)

fig.tight_layout()
fig.savefig("kurs/bilder/einheit-7.png", dpi=120)
