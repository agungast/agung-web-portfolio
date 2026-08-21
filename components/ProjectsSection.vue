<script setup lang="ts">
const projects = [
  {
    title: 'Aplikasi Kasir Sederhana',
    description:
      'Aplikasi point of sale untuk UMKM dengan manajemen produk dan laporan penjualan.',
    tags: ['Vue', 'Pinia', 'Firebase'],
    link: '#'
  },
  {
    title: 'Website Sekolah',
    description:
      'Website profil sekolah dengan CMS sederhana untuk mengelola berita dan agenda.',
    tags: ['Nuxt', 'Tailwind', 'Supabase'],
    link: '#'
  },
  {
    title: 'Aplikasi Cuaca',
    description:
      'Aplikasi cuaca real-time yang memanfaatkan public API dengan tampilan yang bersih.',
    tags: ['JavaScript', 'REST API'],
    link: '#'
  },
  {
    title: 'Portofolio v1',
    description:
      'Versi pertama website portfolio pribadi dengan animasi scroll dan dark mode.',
    tags: ['HTML', 'CSS', 'GSAP'],
    link: '#'
  }
]
</script>

<template>
  <section id="proyek" class="section">
    <div class="container">
      <h2 class="section-title">Proyek <span>Pilihan</span></h2>
      <p class="section-subtitle">Beberapa proyek yang pernah saya kerjakan.</p>

      <div class="projects-grid">
        <article v-for="project in projects" :key="project.title" class="card project">
          <div class="thumb" aria-hidden="true">{{ project.title.charAt(0) }}</div>
          <div class="body">
            <h3>{{ project.title }}</h3>
            <p>{{ project.description }}</p>
            <ul class="tags">
              <li v-for="tag in project.tags" :key="tag">{{ tag }}</li>
            </ul>
            <a :href="project.link" class="detail">Lihat detail &rarr;</a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
}

.project {
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.thumb {
  height: 140px;
  display: grid;
  place-items: center;
  font-size: 3rem;
  font-weight: 800;
  color: #0b0f19;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
}

.body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
}

.body h3 {
  font-size: 1.1rem;
}

.body p {
  color: var(--muted);
  font-size: 0.92rem;
  flex: 1;
}

.tags {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tags li {
  font-size: 0.75rem;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.12);
  color: var(--accent);
}

.detail {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--accent);
}
</style>
