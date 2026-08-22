<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' }
]

const open = ref(false)
const isScrolled = ref(false)
const activeSection = ref('home')
const scrollProgress = ref(0)

function handleScroll() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  isScrolled.value = scrollTop > 20

  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
  if (docHeight > 0) {
    scrollProgress.value = (scrollTop / docHeight) * 100
  }
}

let observer: IntersectionObserver | null = null

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()

  // Setup ScrollSpy with IntersectionObserver
  const sections = document.querySelectorAll('section[id]')
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
        }
      })
    },
    {
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0
    }
  )

  sections.forEach((sec) => observer?.observe(sec))
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (observer) observer.disconnect()
})

function scrollToSection(e: MouseEvent, href: string) {
  e.preventDefault()
  open.value = false
  const target = document.querySelector(href)
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <header class="navbar" :class="{ scrolled: isScrolled }">
    <!-- Top Scroll Progress Bar -->
    <div
      class="scroll-progress"
      :style="{ width: `${scrollProgress}%` }"
      aria-hidden="true"
    />

    <div class="container navbar-inner">
      <a href="#home" class="logo" @click="scrollToSection($event, '#home')">
        <span class="logo-code">&lt;</span>Agung<span class="logo-accent">.dev</span><span class="logo-code"> /&gt;</span>
      </a>

      <nav class="nav-links" :class="{ open }">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          :class="{ active: activeSection === link.href.replace('#', '') }"
          @click="scrollToSection($event, link.href)"
        >
          {{ link.label }}
        </a>
        <a
          href="#contact"
          class="btn-nav-cta"
          @click="scrollToSection($event, '#contact')"
        >
          Let's Talk
        </a>
      </nav>

      <div class="nav-actions">
        <a
          href="#contact"
          class="btn btn-outline btn-sm cta-desktop"
          @click="scrollToSection($event, '#contact')"
        >
          Get in Touch
        </a>

        <button
          class="hamburger"
          :class="{ active: open }"
          aria-label="Toggle navigation menu"
          :aria-expanded="open"
          @click="open = !open"
        >
          <span class="bar bar-1" />
          <span class="bar bar-2" />
          <span class="bar bar-3" />
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(11, 15, 25, 0.75);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(35, 48, 74, 0.5);
  transition: all 0.3s ease;
}

.navbar.scrolled {
  background: rgba(11, 15, 25, 0.92);
  border-bottom-color: rgba(56, 189, 248, 0.2);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
}

.scroll-progress {
  position: absolute;
  top: 0;
  left: 0;
  height: 2.5px;
  background: var(--accent-gradient);
  box-shadow: 0 0 10px var(--accent);
  transition: width 0.1s ease;
  z-index: 1001;
}

.navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
}

.logo {
  font-size: 1.25rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  letter-spacing: -0.01em;
  font-family: 'Outfit', sans-serif;
  transition: transform 0.2s ease;
}

.logo:hover {
  transform: scale(1.03);
}

.logo-code {
  color: var(--muted);
  font-size: 1.1rem;
  font-weight: 400;
  margin: 0 2px;
}

.logo-accent {
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 32px;
}

.nav-links a {
  color: var(--muted);
  font-size: 0.95rem;
  font-weight: 500;
  position: relative;
  padding: 6px 2px;
  transition: color 0.25s ease;
}

.nav-links a:not(.btn-nav-cta)::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0%;
  height: 2px;
  background: var(--accent-gradient);
  border-radius: 2px;
  transition: width 0.25s ease;
}

.nav-links a:hover {
  color: var(--text);
}

.nav-links a.active {
  color: var(--accent);
  font-weight: 600;
}

.nav-links a.active::after {
  width: 100%;
}

.btn-nav-cta {
  display: none;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.btn-sm {
  padding: 8px 18px;
  font-size: 0.88rem;
  border-radius: 10px;
}

.hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  z-index: 1002;
}

.bar {
  width: 100%;
  height: 2px;
  background: var(--text);
  border-radius: 2px;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.hamburger.active .bar-1 {
  transform: translateY(8px) rotate(45deg);
}

.hamburger.active .bar-2 {
  opacity: 0;
  transform: translateX(10px);
}

.hamburger.active .bar-3 {
  transform: translateY(-8px) rotate(-45deg);
}

@media (max-width: 768px) {
  .cta-desktop {
    display: none;
  }

  .hamburger {
    display: flex;
  }

  .nav-links {
    position: fixed;
    top: 72px;
    left: 0;
    right: 0;
    background: rgba(11, 15, 25, 0.98);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
    flex-direction: column;
    padding: 24px 8%;
    gap: 18px;
    align-items: flex-start;
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .nav-links.open {
    max-height: 400px;
    opacity: 1;
    padding: 24px 8%;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5);
  }

  .nav-links a {
    font-size: 1.05rem;
    width: 100%;
    padding: 10px 0;
  }

  .btn-nav-cta {
    display: inline-block;
    margin-top: 10px;
    text-align: center;
    background: var(--accent-gradient);
    color: #0b0f19 !important;
    font-weight: 700;
    border-radius: 10px;
    padding: 12px 20px !important;
  }
}
</style>
