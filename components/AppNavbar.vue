<script setup lang="ts">
const links = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Tentang', href: '#tentang' },
  { label: 'Keahlian', href: '#keahlian' },
  { label: 'Proyek', href: '#proyek' },
  { label: 'Kontak', href: '#kontak' }
]

const open = ref(false)
</script>

<template>
  <header class="navbar">
    <div class="container navbar-inner">
      <a href="#beranda" class="logo">Port<span>folio</span></a>

      <nav class="nav-links" :class="{ open }">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          @click="open = false"
        >
          {{ link.label }}
        </a>
      </nav>

      <button
        class="hamburger"
        aria-label="Buka menu"
        @click="open = !open"
      >
        <span /><span /><span />
      </button>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(11, 15, 25, 0.85);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
}

.navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 68px;
}

.logo {
  font-size: 1.3rem;
  font-weight: 800;
}

.logo span {
  color: var(--accent);
}

.nav-links {
  display: flex;
  gap: 28px;
}

.nav-links a {
  color: var(--muted);
  font-size: 0.95rem;
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav-links a:hover {
  color: var(--accent);
}

.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
}

.hamburger span {
  width: 24px;
  height: 2px;
  background: var(--text);
  border-radius: 2px;
}

@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }

  .nav-links {
    position: absolute;
    top: 68px;
    left: 0;
    right: 0;
    flex-direction: column;
    gap: 0;
    background: var(--bg-soft);
    border-bottom: 1px solid var(--border);
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
  }

  .nav-links.open {
    max-height: 320px;
  }

  .nav-links a {
    display: block;
    padding: 14px 5%;
  }
}
</style>
