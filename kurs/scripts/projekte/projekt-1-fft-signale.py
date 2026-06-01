"""Projekt 1: FFT von Sinus, Rechteck und Gauß — Betrag und Phase.

Zeigt für drei klassische Signale jeweils Zeitsignal, Betragsspektrum
und Phasenspektrum. Die Signale sind bei t=0 zentriert (negative Zeiten
zugelassen), damit die Phaseninformation gut lesbar ist:

- Reelle, gerade Signale → reelle, gerade FT (Phase ist 0 oder ±π)
- Sinus → rein imaginäre FT (Phase ±π/2, hier zusätzlich +π/3 Versatz)

Eine Zeitverschiebung würde lineare Phase überlagern; das wird hier
bewusst vermieden.
"""

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

fs = 1000.0
N = 1024
t = (np.arange(N) - N / 2) / fs       # symmetrisch um 0

freq = 50.0
signals = {
    "Sinus (50 Hz, Phase π/3)": np.sin(2 * np.pi * freq * t + np.pi / 3),
    "Rechteckpuls (Breite 0.2 s, um 0 zentriert)":
        np.where(np.abs(t) < 0.1, 1.0, 0.0),
    "Gauß (σ=0.05 s, um 0 zentriert)":
        np.exp(-(t**2) / (2 * 0.05**2)),
}

fig, axes = plt.subplots(len(signals), 3, figsize=(15, 9))

# Wichtig: ifftshift erzeugt die "richtige" Phase bei t=0 statt bei t=t[0]
freqs = np.fft.fftshift(np.fft.fftfreq(N, d=1 / fs))

for row, (name, x) in enumerate(signals.items()):
    X = np.fft.fftshift(np.fft.fft(np.fft.ifftshift(x))) / N
    magnitude = np.abs(X)
    phase = np.angle(X)

    # Schwellwert klein wählen, damit auch die Nebenzipfel des Sinc sichtbar bleiben
    threshold = 0.005 * magnitude.max()
    phase_display = np.where(magnitude > threshold, phase, np.nan)

    axes[row, 0].plot(t, x, color="C0", lw=1.0)
    axes[row, 0].set_title(name)
    axes[row, 0].set_xlabel("t (s)")
    axes[row, 0].grid(alpha=0.3)
    if "Sinus" in name:
        axes[row, 0].set_xlim(-0.05, 0.05)

    axes[row, 1].plot(freqs, magnitude, color="C1")
    axes[row, 1].set_xlim(-150, 150)
    axes[row, 1].set_title(r"Betrag $|X(f)|/N$")
    axes[row, 1].set_xlabel("f (Hz)")
    axes[row, 1].grid(alpha=0.3)

    axes[row, 2].plot(freqs, phase_display, color="C3", lw=1.4)
    axes[row, 2].set_xlim(-150, 150)
    axes[row, 2].set_ylim(-np.pi - 0.2, np.pi + 0.2)
    axes[row, 2].set_yticks([-np.pi, -np.pi / 2, 0, np.pi / 2, np.pi])
    axes[row, 2].set_yticklabels(
        [r"$-\pi$", r"$-\pi/2$", "0", r"$\pi/2$", r"$\pi$"])
    axes[row, 2].set_title(r"Phase $\arg X(f)$")
    axes[row, 2].set_xlabel("f (Hz)")
    axes[row, 2].grid(alpha=0.3)

fig.suptitle("Projekt 1: FFT klassischer Signale — Betrag und Phase",
             y=1.0, fontsize=14)
fig.tight_layout()
fig.savefig("kurs/bilder/projekt-1.png", dpi=110)
