"""Einheit 5: Aliasing — zwei Sinusse, dieselben Samples."""

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

fs = 10.0
t_fine = np.linspace(0, 1, 2000)

f_low = 1.0
f_high = f_low + fs

x_low = np.cos(2 * np.pi * f_low * t_fine)
x_high = np.cos(2 * np.pi * f_high * t_fine)

t_samples = np.arange(0, 1 + 1e-9, 1 / fs)
samples_low = np.cos(2 * np.pi * f_low * t_samples)
samples_high = np.cos(2 * np.pi * f_high * t_samples)

fig, (ax_time, ax_spec) = plt.subplots(1, 2, figsize=(12, 4.5))

ax_time.plot(t_fine, x_low, color="C0", label=f"{f_low:.0f} Hz")
ax_time.plot(t_fine, x_high, color="C3", linestyle="--", label=f"{f_high:.0f} Hz")
ax_time.scatter(t_samples, samples_low, color="black", zorder=3,
                label=f"Samples bei fs={fs:.0f} Hz")
ax_time.set_xlabel("t (s)")
ax_time.set_title("Zwei verschiedene Sinusse, identische Samples")
ax_time.legend(loc="lower left", fontsize=9)

N = 256
fs_demo = 100.0
n = np.arange(N)
true_freq = 30.0
alias_freq = fs_demo - true_freq
signal = np.cos(2 * np.pi * true_freq * n / fs_demo)
X = np.fft.fft(signal)
freqs = np.fft.fftfreq(N, d=1 / fs_demo)
order = np.argsort(freqs)
ax_spec.plot(freqs[order], np.abs(X[order]) / N, color="C0")
ax_spec.axvline(fs_demo / 2, color="gray", linestyle=":", label="Nyquist fs/2")
ax_spec.axvline(-fs_demo / 2, color="gray", linestyle=":")
ax_spec.set_xlabel("Frequenz (Hz)")
ax_spec.set_title(f"DFT eines {true_freq:.0f}-Hz-Sinus bei fs={fs_demo:.0f} Hz")
ax_spec.legend(fontsize=9)

fig.tight_layout()
fig.savefig("kurs/bilder/einheit-5.png", dpi=120)
