# Design System & Token Guidelines (Monochrome Studio Edition)

File ini menjadi sumber kebenaran visual utama untuk seluruh styling proyek portofolio.

---

## 1. Core Principles (Monochrome Studio & Anti-Slop)

* **Editorial Monochrome Craft:** Menggunakan spektrum grayscale profesional (Deep Carbon Obsidian, Slate Graphite, Refined Silver, Crisp Alabaster) dengan kontras tinggi ala studio desain Leica, Linear, dan Apple Pro.
* **No Nested Cards:** Hindari pola *card-inside-card* berlebihan. Gunakan pemisah struktural *1px hairline border* atau *whitespace* yang presisi.
* **No Saturated Color Sloop:** Seluruh aksen, spotlight, border, dan gradient menggunakan spektrum monokromatis (Silver Chrome di Dark Mode, Obsidian Carbon di Light Mode).
* **Asymmetric Bento & Editorial Rhythm:** Bento grid asimetris dengan ritme vertikal yang dinamis.
* **Dual-Theme High Contrast:** Memastikan teks dan elemen UI memiliki keterbacaan tinggi di kedua mode (Dark & Light) dengan rasio kontras WCAG AA minimum 4.5:1.

---

## 2. Color Tokens

### Dark Mode (Carbon Slate Studio)
* `--bg`: `oklch(0.12 0.005 260)` *(Deep Carbon Canvas)*
* `--bg-soft`: `oklch(0.16 0.006 260)` *(Graphite Section Surface)*
* `--card`: `oklch(0.18 0.008 260)` *(Slate Carbon Card)*
* `--card-hover`: `oklch(0.22 0.010 260)` *(Elevated Hover Surface)*
* `--border`: `oklch(0.26 0.008 260 / 0.55)` *(Subtle Structural Hairline)*
* `--border-light`: `oklch(0.38 0.010 260 / 0.65)` *(Crisp Silver Hairline on Hover)*
* `--text`: `oklch(0.98 0 0)` *(Pure Crisp Off-White)*
* `--text-secondary`: `oklch(0.80 0.005 260)` *(Silver Slate Body)*
* `--muted`: `oklch(0.58 0.008 260)` *(Matte Zinc Meta)*
* `--accent`: `oklch(0.98 0 0)` *(Silver White Accent)*
* `--accent-gradient`: `linear-gradient(135deg, #ffffff 0%, #a1a1aa 100%)` *(Chrome Gradient)*

### Light Mode (Architectural Alabaster)
* `--bg`: `#f4f4f6` *(Soft Studio Concrete / Alabaster)*
* `--bg-soft`: `#e5e7eb` *(Clean Neutral Surface)*
* `--card`: `#ffffff` *(Crisp White Surface)*
* `--card-hover`: `#fafafa`
* `--border`: `#d4d4d8` *(Crisp Zinc Border)*
* `--border-light`: `#a1a1aa` *(Defined Focus Border)*
* `--text`: `#09090b` *(Deep Obsidian Black)*
* `--text-secondary`: `#3f3f46` *(Charcoal Body Text)*
* `--muted`: `#71717a` *(Zinc Captions)*
* `--accent`: `#18181b` *(Dark Carbon Accent)*
* `--accent-gradient`: `linear-gradient(135deg, #18181b 0%, #3f3f46 100%)`

---

## 3. Brand Assets
* **Logo Resmi**: Monokrom / Grayscale Geometric Brand Icon (`app/assets/images/new-website-logo.webp`)
* **Favicon & Public Assets**: `public/website-logo.webp`, `public/favicon.webp`