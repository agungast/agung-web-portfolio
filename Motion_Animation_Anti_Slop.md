# 🎬 Action Plan: Motion & Interactivity (Anti-Slop Editorial Style)

Desain yang berpegang teguh pada prinsip struktural (tanpa AI *slop*, tanpa *shadow* melayang, dan berbasis *hairline divider*) memang bisa terasa kaku jika statis. Fokus dokumen ini adalah menyuntikkan "nyawa" melalui pergerakan (*motion*) yang terasa sinematik, tajam, dan presisi—tanpa melanggar aturan desain Anda.

---

## 🎞️ Fase 1: Page Transitions & Cinematic Flow (Vue/Nuxt)

- [ ] **Wipe/Masking Transitions**
  - **Tindakan:** Manfaatkan fitur `<Transition>` pada Nuxt untuk perpindahan halaman yang dramatis.
  - **Eksekusi:** Hindari *fade-in* transparan yang generik. Terapkan efek *wipe* atau *masking* (mirip dengan teknik pemotongan klip pada *timeline editing video*). Gunakan tirai warna solid menggunakan `--canvas-elevated` atau `--canvas-bg` yang menggeser layar sesaat sebelum rute baru dirender.
  - **Kurva Easing:** Gunakan *cubic-bezier(0.76, 0, 0.24, 1)* untuk pergerakan yang cepat dan bertenaga di tengah, namun melambat halus di akhir.

---

## 🖋️ Fase 2: Editorial Text Reveals

- [ ] **Masked Typography Reveal pada Hero Section**
  - **Tindakan:** Menghidupkan *oversized typography* ("Instrument Serif" / "Syne") saat halaman dimuat.
  - **Eksekusi:** Daripada sekadar *fade-up*, bungkus setiap baris teks *headline* ke dalam elemen *wrapper* dengan `overflow: hidden`. Animasikan teks di dalamnya dari posisi `translate-y-[100%]` (tak terlihat) menuju `translate-y-0`.
  - **Kesan:** Teks seolah-olah "terpotong" dan muncul dari lantai garis tak kasat mata. Ini memberikan kesan mekanis dan tegas (*brutalist elegance*) tanpa efek memantul (*no bounce*).

---

## 🖱️ Fase 3: Interaksi Hover "Anti-Card" (Visual Fokus)

- [ ] **Floating Image on Cursor Move (Proyek / Portofolio)**
  - **Tindakan:** Menghidupkan daftar proyek yang sebelumnya hanya dibatasi oleh *hairline divider* (`border-t border-[var(--border-subtle)]`).
  - **Eksekusi:** Saat pengguna mengarahkan kursor ke teks judul proyek, munculkan gambar *thumbnail* beresolusi tinggi (atau video singkat tanpa suara) yang melayang (`position: absolute; z-index: 50`) dan **mengikuti koordinat pergerakan kursor** (*mouse tracking*). 
  - **Estetika:** Pastikan gambar/footage yang muncul memiliki *color grading* yang konsisten dengan *undertone* UI Anda. Transisi kemunculan cukup menggunakan *fade* cepat 150ms. **Dilarang keras menambahkan efek *zoom-in/scale* pada gambar tersebut.**

---

## 📐 Fase 4: Asymmetric Parallax & Scroll Rhythm

- [ ] **Scroll-Linked Asymmetry**
  - **Tindakan:** Memperkuat kesan *layout* asimetris yang Anda miliki saat pengguna melakukan *scroll*.
  - **Eksekusi:** Pada *section* dengan dua kolom (misalnya: kolom kiri berisi periode waktu dengan "JetBrains Mono", kolom kanan berisi cerita studi kasus), buat kecepatan *scroll* keduanya sedikit berbeda.
  - **Alat:** Gunakan GSAP ScrollTrigger. Kolom meta data di kiri bisa bergerak 10-15% lebih lambat daripada teks utama di kanan. Ini menciptakan ilusi kedalaman ruang (*spatial depth*) tanpa perlu mengandalkan *drop shadow* AI slop.

---

## 📸 Fase 5: Tekstur Dinamis (Subtle Canvas)

- [ ] **Animated Film Grain Overlay**
  - **Tindakan:** Mengurangi kesan steril pada blok warna `--canvas-bg` tanpa menggunakan gradien neon/ungu yang dilarang.
  - **Eksekusi:** Implementasikan efek *film grain* ala kamera analog. Tambahkan div *overlay* selebar layar penuh (pointer-events: none) yang memuat SVG *noise texture* statis.
  - **Animasi:** Gunakan animasi CSS keyframe dengan fungsi `steps()` untuk menggeser posisi *background* `1px` atau `2px` secara terus-menerus setiap 50ms. Ini memberikan tekstur berpasir yang hidup namun tetap menyatu dengan *Deep Oceanic Slate* Anda.
