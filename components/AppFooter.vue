<template>
  <footer class="footer">
    <div class="container footer-inner">
      <p>&copy; {{ new Date().getFullYear() }} Nama Saya. Dibuat dengan Nuxt.</p>
      <div class="socials">
        <a href="https://github.com" target="_blank" rel="noopener">GitHub</a>
        <a href="https://linkedin.com" target="_blank" rel="noopener">LinkedIn</a>
        <a href="https://instagram.com" target="_blank" rel="noopener">Instagram</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--border);
  padding: 32px 0;
  background: var(--bg-soft);
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  color: var(--muted);
  font-size: 0.9rem;
}

.socials {
  display: flex;
  gap: 20px;
}

.socials a {
  transition: color 0.2s ease;
}

.socials a:hover {
  color: var(--accent);
}
</style>
