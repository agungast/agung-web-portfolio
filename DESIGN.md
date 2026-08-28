# Design System & Token Guidelines (Anti-Slop Edition)

File ini menjadi sumber kebenaran visual utama untuk seluruh styling proyek. Patuhi token dan aturan di bawah ini secara ketat.

---

## 1. Core Principles (Anti-AI Slop Rules)

* **No Pure Grayscale:** Jangan pernah gunakan `#000000`, `#ffffff`, `#333333`, atau `gray-500` bawaan Tailwind. Semua warna netral wajib memiliki *undertone* (tint).
* **No Nested Cards:** Hindari pola *card-inside-card* dengan border tipis dan drop shadow melayang. Gunakan garis pemisah subtil (*1px solid rules*) atau whitespace untuk memisahkan konten.
* **No Default Gradients:** Dilarang menggunakan gradien ungu-ke-sian (`purple-600 to cyan-400`) atau efek glow neon pada tombol/background.
* **Asymmetric & Editorial Flow:** Prioritaskan layout asimetris dan ritme vertikal yang dinamis. Grid simetris 3-kolom standar atau *bento-box* **seragam** tetap dilarang. Namun, *Asymmetric Bento* (sel berukuran bervariasi, tanpa nested cards, border `1px solid` saja, radius maks `8px`) **diizinkan** untuk section dengan data heterogen.
* **Intentional High Contrast:** Teks sekunder harus tetap memenuhi standar WCAG AA (rasio kontras minimum 4.5:1), hindari teks abu-abu pudar tak terbaca.

---

## 2. Color Palette (OKLCH Tinted Neutrals)

Base undertone: **Deep Oceanic Slate & Warm Clay**

### Neutrals (Dark & Light Canvas)
* `--canvas-bg`: `oklch(0.14 0.025 240)` *(Deep Slate Base - bukan hitam pekat)*
* `--canvas-subtle`: `oklch(0.18 0.03 240)` *(Background kontainer/section)*
* `--canvas-elevated`: `oklch(0.24 0.035 240)` *(Surface aktif/floating element)*
* `--border-subtle`: `oklch(0.28 0.025 240 / 0.6)` *(Pemisah struktural)*
* `--border-focus`: `oklch(0.55 0.08 240)` *(Border fokus/aktif)*

### Typography & Content Colors
* `--text-primary`: `oklch(0.96 0.01 90)` *(Warm off-white - high contrast)*
* `--text-secondary`: `oklch(0.78 0.02 240)` *(Legible cool slate - no washouts)*
* `--text-muted`: `oklch(0.62 0.025 240)` *(Subtext / caption info)*

### Accent & Brand Marks
* `--accent-primary`: `oklch(0.68 0.16 48)` *(Terracotta / Warm Ochre - hangat & berkarakter)*
* `--accent-primary-hover`: `oklch(0.74 0.18 48)`
* `--accent-subtle`: `oklch(0.68 0.16 48 / 0.12)` *(Tinted badges/chips)*

---

## 3. Typography Stack & Hierarchy

Hindari *Inter*, *Roboto*, atau *System Default*. Gunakan kombinasi Display Serif/Display Sans tajam dengan Mono teknis atau Geometris padat.

### Font Families
* **Display / Headline:** `"Instrument Serif"`, `"Newsreader"`, atau `"Syne"`, serif/display
* **Body / UI:** `"Plus Jakarta Sans"`, `"Satoshi"`, atau `"Cabinet Grotesk"`, sans-serif
* **Technical / Meta / Code:** `"JetBrains Mono"`, monospace

### Scale & Rhythm
* **Display 1 (Hero Title):** `clamp(3rem, 6vw, 5.5rem)` | line-height: `1.0` | letter-spacing: `-0.03em` | Display Font
* **Heading 2 (Section Title):** `clamp(2rem, 3.5vw, 3rem)` | line-height: `1.15` | letter-spacing: `-0.02em` | Display Font
* **Heading 3 (Card / Block):** `1.375rem (22px)` | line-height: `1.3` | letter-spacing: `-0.01em` | Bold Sans
* **Body Large (Intro text):** `1.125rem (18px)` | line-height: `1.6` | Text Secondary
* **Body Regular:** `0.9375rem (15px)` | line-height: `1.55` | Text Primary
* **Caption / Overline:** `0.75rem (12px)` | uppercase | letter-spacing: `0.08em` | JetBrains Mono

---

## 4. Spacing, Borders & Shadows

* **Layout Container:** Max-width `1280px` dengan *gutter* dinamis (`px-6 md:px-12`).
* **Section Gap:** Minimal `6rem` (96px) hingga `10rem` (160px) antar section utama.
* **Corner Radius:**
  * Interactive (Buttons, Inputs): `4px` atau `6px` *(Hindari rounded-3xl / pill-shape berlebihan)*
  * Containers / Panels: `8px`
* **Shadows:**
  * *Default:* `none` (Gunakan 1px border subtil sebagai gantinya).
  * *Elevation (Dropdowns/Modals):* `0 12px 32px -4px oklch(0.08 0.03 240 / 0.45)`

---

## 5. UI Elements & Interaction Patterns

* **Buttons:**
  * *Primary:* Background `--accent-primary`, Text `oklch(0.12 0.02 48)`, font-weight 600, border-radius 4px.
  * *Secondary / Outline:* Transparent background, border `1px solid var(--border-subtle)`, text `--text-primary`.
* **Hover State:** Hindari transform bounce atau zoom berlebihan. Gunakan transisi halus pada *opacity*, *border-color*, atau *background-tint* (150ms ease-out).
* **Dividers:** Gunakan hairline separator `border-t border-[var(--border-subtle)]` daripada membungkus setiap item dalam kotak/card.

## Color System (Derived from Brandmark)

### Base & Tinted Neutrals (Derived from Deep Ultramarine #1a2a6c / #0f172a)
* `--canvas-bg`: oklch(0.14 0.03 260) /* Deep Obsidian Blue - Canvas Utama */
* `--canvas-subtle`: oklch(0.18 0.035 255) /* Card / Container Section */
* `--canvas-elevated`: oklch(0.24 0.04 250) /* Floating Popover / Nav Surface */
* `--border-subtle`: oklch(0.28 0.03 250 / 0.5) /* Divider struktural */

### Typography (High Contrast & Intentional Tones)
* `--text-primary`: oklch(0.97 0.008 240) /* Off-white dengan cool undertone */
* `--text-secondary`: oklch(0.78 0.03 245) /* Muted body text yang tetap terbaca */
* `--text-muted`: oklch(0.60 0.035 250) /* Metadata, tags, & captions */

### Brand Accents (Controlled Cyan & Ultramarine from Logo)
* `--brand-cyan-text`: oklch(0.72 0.12 215) /* Cyan matang untuk teks / highlight (.Portfolio) - Anti Slop */
* `--brand-cyan-surface`: oklch(0.72 0.12 215 / 0.12) /* Cyan transparan untuk chip / background badge */
* `--brand-primary`: oklch(0.55 0.19 255) /* Royal Cobalt Blue (Titik tengah logo) */
* `--brand-primary-hover`: oklch(0.62 0.21 255)
* `--brand-deep`: oklch(0.35 0.16 265) /* Deep Navy Accent */