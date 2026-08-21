<template>
  <section id="beranda" class="hero">
    <div class="container hero-inner">
      <p class="greeting">Halo, saya</p>
      <h1>Nama Saya</h1>
      <h2>Web Developer &amp; Mahasiswa Informatika</h2>
      <p class="desc">
        Saya membangun antarmuka web yang cepat, rapi, dan mudah digunakan.
        Fokus saya pada pengembangan frontend dengan Vue dan Nuxt.
      </p>
      <div class="actions">
        <a href="#proyek" class="btn btn-primary">Lihat Proyek</a>
        <a href="#kontak" class="btn btn-outline">Hubungi Saya</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: calc(100vh - 68px);
  display: flex;
  align-items: center;
  background:
    radial-gradient(600px circle at 20% 20%, rgba(56, 189, 248, 0.12), transparent),
    radial-gradient(600px circle at 80% 60%, rgba(129, 140, 248, 0.12), transparent);
}

.greeting {
  color: var(--accent);
  font-weight: 600;
  margin-bottom: 8px;
}

h1 {
  font-size: clamp(2.4rem, 6vw, 4rem);
  font-weight: 800;
  line-height: 1.15;
}

h2 {
  font-size: clamp(1.2rem, 3vw, 1.6rem);
  font-weight: 600;
  color: var(--muted);
  margin-bottom: 20px;
}

.desc {
  max-width: 560px;
  color: var(--muted);
  margin-bottom: 32px;
}

.actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}
</style>
