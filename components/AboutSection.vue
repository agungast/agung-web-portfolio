<template>
  <section id="tentang" class="section">
    <div class="container">
      <h2 class="section-title">Tentang <span>Saya</span></h2>
      <p class="section-subtitle">Sedikit cerita tentang siapa saya.</p>

      <div class="about-grid">
        <div class="about-text">
          <p>
            Saya adalah mahasiswa Informatika yang tertarik pada pengembangan web,
            khususnya frontend. Saya senang mengubah desain menjadi halaman yang
            interaktif dan responsif.
          </p>
          <p>
            Saat ini saya sedang memperdalam ekosistem Vue dan Nuxt, serta
            membangun proyek-proyek kecil untuk mengasah kemampuan saya.
          </p>
        </div>

        <ul class="stats">
          <li class="card stat">
            <strong>10+</strong>
            <span>Proyek Selesai</span>
          </li>
          <li class="card stat">
            <strong>2+</strong>
            <span>Tahun Belajar</span>
          </li>
          <li class="card stat">
            <strong>5+</strong>
            <span>Teknologi Dikuasai</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 48px;
  align-items: center;
}

.about-text p {
  color: var(--muted);
  margin-bottom: 16px;
}

.stats {
  list-style: none;
  display: grid;
  gap: 16px;
}

.stat {
  padding: 20px 24px;
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.stat strong {
  font-size: 1.6rem;
  color: var(--accent);
}

.stat span {
  color: var(--muted);
}

@media (max-width: 768px) {
  .about-grid {
    grid-template-columns: 1fr;
  }
}
</style>
