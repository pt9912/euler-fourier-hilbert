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

fig, (ax_time, ax_dft, ax_alias) = plt.subplots(1, 3, figsize=(15, 4.5))

ax_time.plot(t_fine, x_low, color="C0", label=f"{f_low:.0f} Hz")
ax_time.plot(t_fine, x_high, color="C3", linestyle="--", label=f"{f_high:.0f} Hz")
ax_time.scatter(t_samples, samples_low, color="black", zorder=4,
                s=40, label=f"Samples {f_low:.0f} Hz bei fs={fs:.0f} Hz")
ax_time.scatter(t_samples, samples_high, facecolors="none", edgecolors="C3",
                s=130, lw=1.6, zorder=3,
                label=f"Samples {f_high:.0f} Hz (umschließen die schwarzen)")
ax_time.set_xlabel("t (s)")
ax_time.set_ylabel("Amplitude")
ax_time.set_title("Zwei verschiedene Schwingungen, identische Samples")
ax_time.legend(loc="lower left", fontsize=8)

N = 500
fs_demo = 100.0
n = np.arange(N)
true_freq = 30.0
signal = np.cos(2 * np.pi * true_freq * n / fs_demo)
X = np.fft.fft(signal)
freqs = np.fft.fftfreq(N, d=1 / fs_demo)
order = np.argsort(freqs)
ax_dft.plot(freqs[order], np.abs(X[order]) / N, color="C0")
ax_dft.axvline(fs_demo / 2, color="gray", linestyle=":", label="Nyquist fs/2")
ax_dft.axvline(-fs_demo / 2, color="gray", linestyle=":")
ax_dft.set_xlabel("Frequenz (Hz)")
ax_dft.set_ylabel(r"$|X[k]|/N$")
ax_dft.set_title(f"DFT eines {true_freq:.0f}-Hz-Kosinus bei fs={fs_demo:.0f} Hz")
ax_dft.legend(fontsize=9)

nyquist = fs / 2
alias_signed = ((f_high + nyquist) % fs) - nyquist
for freq, color, label in [
    (-f_high, "C3", "vor Abtastung: ±11 Hz"),
    (f_high, "C3", None),
    (alias_signed, "black", "nach Aliasing: ±1 Hz"),
    (-alias_signed, "black", None),
]:
    ax_alias.vlines(freq, 0, 1.0, color=color, lw=2.2,
                    linestyle="--" if color == "C3" else "-", label=label)
ax_alias.axvspan(-nyquist, nyquist, color="C0", alpha=0.08,
                 label="Nyquist-Band")
ax_alias.axvline(-nyquist, color="gray", lw=0.8, linestyle=":")
ax_alias.axvline(nyquist, color="gray", lw=0.8, linestyle=":")
ax_alias.set_xlim(-13, 13)
ax_alias.set_ylim(0, 1.15)
ax_alias.set_yticks([])
ax_alias.set_xlabel("Frequenz (Hz)")
ax_alias.set_title("Spektrum: außerhalb wird zurückgefaltet")
ax_alias.legend(loc="upper center", fontsize=8)

fig.tight_layout()
fig.savefig("kurs/bilder/einheit-5.png", dpi=120)
