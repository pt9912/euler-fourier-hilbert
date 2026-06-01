"""Projekt 4: Filter im Frequenzbereich.

Konstruiert Tief-, Hoch- und Bandpass durch Multiplikation des Spektrums
eines Eingangssignals mit einer indikatorartigen Übertragungsfunktion und
zeigt Eingang, Filter, Ausgang in Zeit- und Frequenzbereich.

Hinweis: Reine Rechteck-Filter im Frequenzbereich entsprechen einer
sinc-förmigen Impulsantwort und führen zu Gibbs-Artefakten an Sprüngen.
Für die Lehre eignet sich das gut; in der Praxis verwendet man weichere
Übergänge (z.B. Butterworth, Bessel oder Fensterung).
"""

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

fs = 2000.0
T = 1.0
N = int(fs * T)
t = np.arange(N) / fs

rng = np.random.default_rng(42)
signal = (
    np.sin(2 * np.pi * 10 * t)        # niederfrequent
    + 0.7 * np.sin(2 * np.pi * 80 * t)  # mittel
    + 0.5 * np.sin(2 * np.pi * 300 * t)  # hochfrequent
    + 0.3 * rng.standard_normal(N)    # Rauschen
)

X = np.fft.fft(signal)
freqs = np.fft.fftfreq(N, d=1 / fs)
abs_f = np.abs(freqs)

filters = {
    "Tiefpass (≤ 30 Hz)":         abs_f <= 30,
    "Hochpass (≥ 200 Hz)":        abs_f >= 200,
    "Bandpass (50–120 Hz)":       (abs_f >= 50) & (abs_f <= 120),
}

fig, axes = plt.subplots(len(filters) + 1, 2, figsize=(13, 11))

# Eingang
axes[0, 0].plot(t, signal, color="black", lw=0.7)
axes[0, 0].set_xlim(0, 0.2)
axes[0, 0].set_title("Eingang x(t) — Zeitausschnitt 0 … 0.2 s")
axes[0, 0].set_xlabel("t (s)")
axes[0, 0].grid(alpha=0.3)

axes[0, 1].plot(np.fft.fftshift(freqs),
                np.fft.fftshift(np.abs(X)) / N,
                color="black")
axes[0, 1].set_xlim(-400, 400)
axes[0, 1].set_title("Eingangsspektrum |X(f)|/N")
axes[0, 1].set_xlabel("f (Hz)")
axes[0, 1].grid(alpha=0.3)

# Filter
for row, (name, H) in enumerate(filters.items(), start=1):
    Y = X * H
    y = np.real(np.fft.ifft(Y))

    axes[row, 0].plot(t, y, color="C0", lw=0.9)
    axes[row, 0].set_xlim(0, 0.2)
    axes[row, 0].set_title(f"{name} — Ausgang y(t)")
    axes[row, 0].set_xlabel("t (s)")
    axes[row, 0].grid(alpha=0.3)

    axes[row, 1].plot(np.fft.fftshift(freqs),
                      np.fft.fftshift(np.abs(Y)) / N,
                      color="C0")
    axes[row, 1].plot(np.fft.fftshift(freqs),
                      np.fft.fftshift(H).astype(float) * 0.6 * (np.abs(X) / N).max(),
                      color="C3", linestyle="--", alpha=0.7,
                      label="H(f) (skaliert)")
    axes[row, 1].set_xlim(-400, 400)
    axes[row, 1].set_title(f"{name} — Ausgangsspektrum")
    axes[row, 1].set_xlabel("f (Hz)")
    axes[row, 1].legend(loc="upper right", fontsize=8)
    axes[row, 1].grid(alpha=0.3)

fig.suptitle("Projekt 4: Filter durch Multiplikation im Frequenzbereich",
             y=1.0, fontsize=14)
fig.tight_layout()
fig.savefig("kurs/bilder/projekt-4.png", dpi=110)
