"""Projekt 3: Phasenanalyse — Vertiefungen zum Chirp-Signal.

Drei Erweiterungen über den linearen Chirp aus Einheit 8 hinaus:

1. Exponentieller Chirp — die Momentanfrequenz wächst exponentiell,
   nicht linear. Phase und Frequenzverlauf werden mit der analytisch
   bekannten Erwartung verglichen.

2. Mehrkomponenten-Signal — Summe zweier Chirps. Das Konzept einer
   einzigen Momentanfrequenz ist hier nicht mehr sinnvoll; Hilbert
   liefert die amplituden-gewichtete Schwerpunkt-Frequenz und oszilliert
   mit der Differenzfrequenz der beiden Komponenten — sichtbar als
   "Zittern" um den Mittelwert.

3. Fensterung — eine Tukey-Randfensterung dämpft die FFT-induzierten
   Hilbert-Artefakte an den Signalrändern, ohne den Phasenverlauf im
   mittleren (flachen) Fensterbereich zu verfälschen.
"""

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
from scipy.signal import hilbert, get_window

fs = 4000.0
T = 1.0
N = int(fs * T)
t = np.arange(N) / fs
t_mid = (t[:-1] + t[1:]) / 2     # x-Achse für np.diff-Ergebnisse


def momentanfreq(x):
    """Momentanfrequenz via Hilbert; Länge N-1, auf t_mid."""
    z = hilbert(x)
    return z, np.diff(np.unwrap(np.angle(z))) / (2 * np.pi) * fs


fig, axes = plt.subplots(3, 2, figsize=(13, 11))

# ===== Reihe 1: Exponentieller Chirp =====
f0, f1 = 20.0, 300.0
k = f1 / f0
# f(t) = f0 · k^(t/T) → φ(t) = 2π f0 T/ln(k) · (k^(t/T) - 1)
phi_exp = 2 * np.pi * f0 * T / np.log(k) * (k ** (t / T) - 1)
x_exp = np.cos(phi_exp)
z_exp, if_exp = momentanfreq(x_exp)
true_freq_exp = f0 * k ** (t_mid / T)

axes[0, 0].plot(t, x_exp, color="C0", lw=0.5)
axes[0, 0].plot(t, np.abs(z_exp), color="C3", lw=1.4, label=r"$|z(t)|$")
axes[0, 0].axhline(0, color="gray", lw=0.4)
axes[0, 0].set_xlabel("t (s)")
axes[0, 0].set_ylabel("Amplitude")
axes[0, 0].set_title(r"Exponentieller Chirp: $f(t)=f_0\,(f_1/f_0)^{t/T}$"
                     f"  ({f0:g} → {f1:g} Hz)")
axes[0, 0].legend(loc="upper right", fontsize=9)
axes[0, 0].grid(alpha=0.3)

axes[0, 1].plot(t_mid, if_exp, color="C2", lw=1.2, label="aus Hilbert")
axes[0, 1].plot(t_mid, true_freq_exp, color="black", linestyle="--",
                lw=1.0, label="Soll: exponentiell")
axes[0, 1].set_yscale("log")
axes[0, 1].set_xlabel("t (s)")
axes[0, 1].set_ylabel("f (Hz, log-Skala)")
axes[0, 1].set_title("Momentanfrequenz — exponentielle Rampe")
axes[0, 1].legend(loc="upper left", fontsize=9)
axes[0, 1].grid(alpha=0.3, which="both")

# ===== Reihe 2: Mehrkomponenten-Signal =====
fa0, fa1 = 30.0, 80.0       # Komponente A
fb0, fb1 = 150.0, 250.0     # Komponente B
phi_a = 2 * np.pi * (fa0 * t + 0.5 * (fa1 - fa0) / T * t ** 2)
phi_b = 2 * np.pi * (fb0 * t + 0.5 * (fb1 - fb0) / T * t ** 2)
x_multi = np.cos(phi_a) + 0.8 * np.cos(phi_b)
z_multi, if_multi = momentanfreq(x_multi)
true_a = fa0 + (fa1 - fa0) / T * t_mid
true_b = fb0 + (fb1 - fb0) / T * t_mid

axes[1, 0].plot(t, x_multi, color="C0", lw=0.4, label=r"$x(t)$")
axes[1, 0].plot(t, np.abs(z_multi), color="C3", lw=1.0, label=r"$|z(t)|$")
axes[1, 0].axhline(0, color="gray", lw=0.4)
axes[1, 0].set_xlim(0, 0.15)    # kurzer Ausschnitt — Schwebung sichtbar
axes[1, 0].set_xlabel("t (s)")
axes[1, 0].set_ylabel("Amplitude")
axes[1, 0].set_title("Mehrkomponenten-Signal (zwei überlagerte Chirps, "
                     "Ausschnitt)")
axes[1, 0].legend(loc="upper right", fontsize=9)
axes[1, 0].grid(alpha=0.3)

axes[1, 1].plot(t_mid, if_multi, color="C2", lw=0.5,
                label="Hilbert (eine einzige IF)")
axes[1, 1].plot(t_mid, true_a, color="black", linestyle="--", lw=1.0,
                label="Soll: Komponente A")
axes[1, 1].plot(t_mid, true_b, color="black", linestyle=":", lw=1.0,
                label="Soll: Komponente B")
axes[1, 1].set_ylim(0, 320)
axes[1, 1].set_xlabel("t (s)")
axes[1, 1].set_ylabel("f (Hz)")
axes[1, 1].set_title("Hilbert liefert nur EINE IF — "
                     "Schwebung statt zweier Komponenten")
axes[1, 1].legend(loc="upper left", fontsize=8)
axes[1, 1].grid(alpha=0.3)

# ===== Reihe 3: Fensterung dämpft Randartefakte =====
f0_lin, f1_lin = 20.0, 200.0
phi_lin = 2 * np.pi * (f0_lin * t + 0.5 * (f1_lin - f0_lin) / T * t ** 2)
x_lin = np.cos(phi_lin)
true_freq_lin = f0_lin + (f1_lin - f0_lin) / T * t_mid

# Ohne Fenster
_, if_no = momentanfreq(x_lin)

# Mit Tukey-Fenster (α=0.2): 10 % cosine-Taper an beiden Rändern, Mitte flach
alpha = 0.2
win = get_window(("tukey", alpha), N)
_, if_win = momentanfreq(x_lin * win)

edge = alpha / 2     # Taper-Breite relativ zu T

axes[2, 0].plot(t, x_lin, color="C0", lw=0.4, alpha=0.6, label="ohne Fenster")
axes[2, 0].plot(t, x_lin * win, color="C4", lw=0.5,
                label=fr"$\times$ Tukey ($\alpha={alpha}$)")
axes[2, 0].plot(t, win, color="C3", lw=1.2, linestyle="--",
                label="Fenster $w(t)$")
axes[2, 0].axhline(0, color="gray", lw=0.4)
axes[2, 0].set_xlabel("t (s)")
axes[2, 0].set_ylabel("Amplitude")
axes[2, 0].set_title("Linearer Chirp mit/ohne Tukey-Randfensterung")
axes[2, 0].legend(loc="lower center", fontsize=8, ncol=3)
axes[2, 0].grid(alpha=0.3)

axes[2, 1].plot(t_mid, if_no - true_freq_lin, color="C2", lw=0.9,
                label="ohne Fenster")
axes[2, 1].plot(t_mid, if_win - true_freq_lin, color="C4", lw=0.9,
                label="mit Tukey-Fenster")
axes[2, 1].axhline(0, color="black", lw=0.4)
axes[2, 1].axvspan(0, edge * T, color="gray", alpha=0.15,
                   label="Taper-Bereich")
axes[2, 1].axvspan((1 - edge) * T, T, color="gray", alpha=0.15)
axes[2, 1].set_ylim(-20, 20)
axes[2, 1].set_xlabel("t (s)")
axes[2, 1].set_ylabel(r"$f_{\mathrm{Hilbert}}(t) - f_{\mathrm{Soll}}(t)$ (Hz)")
axes[2, 1].set_title("Fehler in der Momentanfrequenz — "
                     "Fenster reduziert Randartefakte")
axes[2, 1].legend(loc="upper right", fontsize=8)
axes[2, 1].grid(alpha=0.3)

fig.suptitle("Projekt 3: Phasenanalyse — exponentieller Chirp, "
             "Mehrkomponenten-Signal, Fensterung", fontsize=13)
fig.tight_layout()
fig.savefig("kurs/bilder/projekt-3.png", dpi=110)
