<script setup>
import websiteLogo from '~/assets/images/new-website-logo.webp'
</script>

<template>
  <footer class="footer">
    <div class="container footer-inner">
      <div class="footer-brand">
        <div class="brand-row">
          <img :src="websiteLogo" alt="Agung Portfolio Logo" class="footer-logo-img" />
          <span class="brand-title">Agung<span class="brand-accent">.Portfolio</span></span>
        </div>
        <p class="brand-desc">
          Building thoughtful, interactive, and modern web experiences.
        </p>
      </div>

      <div class="footer-nav">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </div>

      <div class="footer-bottom">
        <p class="copy">
          &copy; {{ new Date().getFullYear() }} Agung Hadi Astanto. Crafted with Vue 3 &amp; Nuxt.
        </p>
        <div class="socials">
          <a href="https://github.com/agungast" target="_blank" rel="noopener" aria-label="GitHub">GitHub</a>
          <a href="https://www.linkedin.com/in/agunghadiastanto/" target="_blank" rel="noopener" aria-label="LinkedIn">LinkedIn</a>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=agung.astanto14@gmail.com" target="_blank" rel="noopener" aria-label="Email">Email</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--border);
  padding: 60px 0 40px;
  background: var(--bg-soft);
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.footer-inner {
  display: flex;
  flex-direction: column;
  gap: 36px;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.brand-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.footer-logo-img {
  width: 28px;
  height: 28px;
  object-fit: contain;
  filter: drop-shadow(0 2px 8px rgba(var(--accent-rgb), 0.15));
}

.brand-title {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--text);
}

.brand-accent {
  color: var(--muted);
  font-weight: 500;
}

.brand-desc {
  color: var(--muted);
  font-size: 0.92rem;
  max-width: 400px;
}

.footer-nav {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--border);
}

.footer-nav a {
  color: var(--muted);
  font-size: 0.92rem;
  font-weight: 500;
  transition: color 0.2s ease;
}

.footer-nav a:hover {
  color: var(--accent);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  color: var(--muted);
  font-size: 0.88rem;
}

.socials {
  display: flex;
  gap: 20px;
}

.socials a {
  color: var(--muted);
  transition: color 0.2s ease;
}

.socials a:hover {
  color: var(--accent);
}

@media (max-width: 640px) {
  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
