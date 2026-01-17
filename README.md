<div align="center">

# Ultimate Video Controller 🎥✨

[![Download Extension](https://img.shields.io/badge/Download--Unpacked-brightgreen)](https://github.com/QuantumVoidd/Ultimate-Video-Controller/releases/latest)

![Visitors](https://api.visitorbadge.io/api/VisitorHit?user=QuantumVoidd&repo=Ultimate-Video-Controller&countColor=%2337B1E7A)

![GitHub stars](https://img.shields.io/github/stars/QuantumVoidd/Ultimate-Video-Controller?style=social)

</div>

---

The most advanced video control suite for the web. Unlock professional-grade color grading, audio mastering, and geometry tools on YouTube, Twitch, Netflix, Prime Video, Disney+, and any other HTML5 video player.

<img width="1973" height="1605" alt="Screenshot 2026-01-17 172402" src="https://github.com/user-attachments/assets/07d341a6-923a-4fa6-923d-45ce6c055eec" />




## 🚀 Features

### 🎨 Color Master (Professional Grading)

- Color Temperature and Tint: Adjust white balance (Warm/Cool) and fix webcam color casts (Green/Magenta) using SVG color matrices.
- LUT-Style Filters: Control Brightness, Contrast, Saturation, Gamma, Grayscale, and Invert.
- Quick Looks: One-click presets for Cinema, Night Mode (Blue light filter), Retro, and Matrix.

### 🔊 Audio Studio

- Volume Booster: Boost volume up to 600% (uses Web Audio API gain nodes).
- Equalizer: Dedicated Bass and Treble sliders.
- Audio Sync: Fix lip-sync issues with a precise delay slider (+0s to 5s).
- Dynamics Compressor: Normalizer mode to balance loud explosions and quiet dialogue.
- Mono Toggle: Force stereo audio to mono (essential for fixing one-ear headphone issues).

### 📐 Geometry and Transform

- 3D Perspective: Rotate video on X, Y, and Z axes (Tilt/Swivel).
- Zoom and Pan: Zoom up to 5x and use the D-Pad to pan around the video.
- Skew and Flip: Correct projector angles or mirror the video horizontally/vertically.
- Ultrawide Crop: Force 21:9 aspect ratio (cinematic black bars) on 16:9 videos.

### ⏱️ Navigation and Timecode

- Live Timecode: Millisecond-precise clock (01:23:45.150).
- Absolute Seeking: Type 10:30 (or any timestamp) and hit Enter to jump exactly there.
- Smart Jump: Dedicated buttons to skip -30s, -10s, +10s, +30s.
- Percentage Seeking: Jump to Start (0%), Middle (50%), or End instantly.
- Bookmarks: Save timestamps instantly and jump back to them with one click.

### 🛠️ Stream Tools

- Screenshot: Capture high-quality snapshots (preserving all color filters).
- Picture-in-Picture (PiP): Pop the video out to watch while multitasking.
- Focus Mode (Cinema): Dims the rest of the webpage to focus solely on the video.
- Overlays: Gaming Crosshair (center) and Rule of Thirds Grid.
- Thumbnail Grabber: Extracts the highest resolution thumbnail available (supports YouTube maxresdefault).

### ⚡ Playback and Loop

- Speed Control: Precision slider from 0.1x up to 16.0x.
- A-B Loop: Set Start (A) and End (B) points to repeat a specific segment endlessly.

---

## 📦 Installation

Since this is a custom developer extension, you will load it manually:

1. Download this repository to a folder on your computer.
2. Open Chrome/Edge and navigate to chrome://extensions.
3. Toggle Developer Mode (top right corner).
4. Click Load Unpacked.
5. Select the folder containing manifest.json.
6. Refresh your video tab to inject the controller!

---

## 🎮 Usage

### The Floating Icon

A small (20px), discreet icon will appear in the top-left corner of any video player.

- Idle: It spins slowly.
- Hover: It spins faster.
- Click: Opens the Ultimate Control Dashboard.

The icon is sticky—if you zoom into a video or resize the window, the icon slides along the edge of the viewport so you never lose it.

### Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| Alt + Q | Toggle the Dashboard Menu (Open/Close) |
| Alt + R | Emergency Reset (Clears all effects, audio, and transforms) |

---

## 🔧 Technical Details

- SVG Filters: Used for advanced Gamma, Sharpness, and Color Matrix (Temperature/Tint) operations that standard CSS cannot handle.
- Web Audio API: Used to intercept the video audio stream for EQ, Gain (Boost), Delay, and Dynamics Compression.
- CSS Transforms: Used for 3D rotation (perspective, rotate3d) and Zoom/Pan.
- Shadow DOM: Not used (injected directly into DOM), but elements are scoped with unique vcc- class names to prevent style conflicts.

## ⚠️ Troubleshooting

The icon isn't appearing?

1. Refresh the webpage.
2. Ensure the site is using a standard HTML5 video tag.

Styles look wrong or the icon is huge?

Chrome caches extension CSS aggressively.

1. Go to chrome://extensions.
2. Disable and then Enable the extension.
3. Click the Reload (circular arrow) icon.
4. Close and Re-open your video tab.

## 📄 License

This project is licensed under the MIT License - feel free to modify and distribute.

---


Created for Power Users.

