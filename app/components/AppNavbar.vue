<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useTheme } from '../composables/useTheme'
import websiteLogo from '~/assets/images/new-website-logo.webp'

const { isDark, toggleTheme, initTheme } = useTheme()

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

// Magic sliding indicator
const navItems = ref([])
const indicatorStyle = ref({ width: '0px', transform: 'translateX(0px)', opacity: '0' })

function updateIndicator() {
  const activeIndex = links.findIndex(l => l.href.replace('#', '') === activeSection.value)
  if (activeIndex !== -1 && navItems.value[activeIndex]) {
    const el = navItems.value[activeIndex]
    indicatorStyle.value = {
      width: `${el.offsetWidth}px`,
      transform: `translateX(${el.offsetLeft}px)`,
      opacity: '1'
    }
  } else {
    indicatorStyle.value.opacity = '0'
  }
}

watch(activeSection, () => {
  nextTick(() => {
    updateIndicator()
  })
})

let scrollTimeout = null
const isProgrammaticScroll = ref(false)

function handleScroll() {
  if (typeof window === 'undefined') return
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  isScrolled.value = scrollTop > 20

  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
  if (docHeight > 0) {
    scrollProgress.value = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100))
  }

  if (isProgrammaticScroll.value) return

  // ScrollSpy Calculation
  // 1. If near top, always activate 'home'
  if (scrollTop < 120) {
    activeSection.value = 'home'
    return
  }

  // 2. If near the bottom of document, activate 'contact'
  if (window.innerHeight + scrollTop >= document.documentElement.scrollHeight - 60) {
    activeSection.value = 'contact'
    return
  }

  // 3. Find current active section by offsetTop
  const sectionIds = ['home', 'about', 'skills', 'projects', 'contact']
  const offsetBuffer = 180

  for (let i = sectionIds.length - 1; i >= 0; i--) {
    const id = sectionIds[i]
    if (!id) continue
    const el = document.getElementById(id)
    if (el && el.offsetTop <= scrollTop + offsetBuffer) {
      activeSection.value = id
      break
    }
  }
}

onMounted(() => {
  initTheme()
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', updateIndicator, { passive: true })
  handleScroll()
  setTimeout(updateIndicator, 100) // Ensure fonts are loaded before calculating width
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('resize', updateIndicator)
  }
})

function scrollToSection(e, href) {
  e.preventDefault()
  open.value = false
  
  isProgrammaticScroll.value = true
  if (scrollTimeout) clearTimeout(scrollTimeout)
  
  scrollTimeout = setTimeout(() => {
    isProgrammaticScroll.value = false
  }, 1000)

  const targetId = href.replace('#', '')
  activeSection.value = targetId
  const target = document.getElementById(targetId)
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
      :style="{ transform: `scaleX(${scrollProgress / 100})` }"
      aria-hidden="true"
    />

    <div class="container navbar-inner">
      <a href="#home" class="logo" @click="scrollToSection($event, '#home')">
        <img :src="websiteLogo" alt="Agung Portfolio Logo" class="logo-img" />
        <span class="logo-text">Agung<span class="logo-accent">.Portfolio</span></span>
      </a>

      <nav class="nav-links" :class="{ open }">
        <div class="nav-indicator" :style="indicatorStyle" aria-hidden="true"></div>
        <a
          v-for="(link, index) in links"
          :key="link.href"
          :href="link.href"
          :class="{ active: activeSection === link.href.replace('#', '') }"
          ref="navItems"
          @click="scrollToSection($event, link.href)"
        >
          {{ link.label }}
        </a>

        <div class="mobile-actions">
          <button
            class="btn-theme-toggle mobile-theme-btn"
            :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
            aria-label="Toggle theme mode"
            @click="toggleTheme"
          >
            <span class="theme-label">{{ isDark ? 'Dark Mode' : 'Light Mode' }}</span>
          </button>

          <a
            href="#contact"
            class="btn-nav-cta"
            @click="scrollToSection($event, '#contact')"
          >
            Let's Talk
          </a>
        </div>
      </nav>

      <div class="nav-actions">
        <!-- Theme Toggle Button (Desktop) -->
        <button
          class="btn-theme-toggle"
          :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
          :aria-label="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
          @click="toggleTheme"
        >
          <Transition name="rotate-fade" mode="out-in">
            <!-- Moon icon (active in Dark Mode) -->
            <svg
              v-if="isDark"
              key="moon"
              class="theme-icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
            <!-- Sun icon (active in Light Mode) -->
            <svg
              v-else
              key="sun"
              class="theme-icon sun"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          </Transition>
        </button>

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
  background: var(--nav-bg);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--border);
  transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

.navbar.scrolled {
  background: var(--nav-bg-scrolled);
  border-bottom-color: var(--border);
}

.scroll-progress {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2.5px;
  background: var(--accent);
  transform-origin: left center;
  transition: transform 0.08s linear;
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
  gap: 10px;
  letter-spacing: -0.01em;
  font-family: 'Outfit', sans-serif;
  transition: transform 0.2s ease;
}

.logo:hover {
  transform: scale(1.03);
}

.logo-img {
  width: 32px;
  height: 32px;
  object-fit: contain;
  display: block;
  filter: drop-shadow(0 2px 8px rgba(var(--accent-rgb), 0.15));
}

.logo-text {
  display: flex;
  align-items: center;
  color: var(--text);
}

.logo-accent {
  color: var(--muted);
  font-weight: 500;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 32px;
  position: relative;
}

.nav-indicator {
  position: absolute;
  bottom: -2px;
  left: 0;
  height: 2px;
  background: var(--text);
  border-radius: 2px;
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), width 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.3s ease;
  z-index: 1;
}

.nav-links a {
  color: var(--muted);
  font-size: 0.95rem;
  font-weight: 500;
  position: relative;
  padding: 6px 2px;
  transition: color 0.25s ease;
  z-index: 2;
}

.nav-links a:hover {
  color: var(--text);
}

.nav-links a.active {
  color: var(--text);
  font-weight: 700;
}

.mobile-actions {
  display: none;
}

.btn-nav-cta {
  display: none;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

/* Theme Toggle Button */
.btn-theme-toggle {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--btn-outline-bg);
  border: 1px solid var(--border);
  color: var(--text);
  cursor: pointer;
  transition: all 0.25s ease;
}

.btn-theme-toggle:hover {
  border-color: var(--border-light);
  transform: scale(1.05);
}

.theme-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text);
}

.rotate-fade-enter-active,
.rotate-fade-leave-active {
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.rotate-fade-enter-from {
  opacity: 0;
  transform: rotate(-90deg) scale(0.5);
}

.rotate-fade-leave-to {
  opacity: 0;
  transform: rotate(90deg) scale(0.5);
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

  .mobile-actions {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    margin-top: 10px;
  }

  .mobile-theme-btn {
    width: 100%;
    height: auto;
    padding: 12px;
    justify-content: flex-start;
    font-size: 0.95rem;
    font-weight: 600;
  }

  .theme-label {
    margin-left: 8px;
  }

  .nav-links {
    position: fixed;
    top: 72px;
    left: 0;
    right: 0;
    background: var(--nav-mobile-bg);
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
    max-height: 480px;
    opacity: 1;
    padding: 24px 8%;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }

  .nav-links a {
    font-size: 1.05rem;
    width: 100%;
    padding: 10px 0;
  }

  .btn-nav-cta {
    display: inline-block;
    text-align: center;
    background: var(--accent);
    color: #ffffff !important;
    font-weight: 600;
    border-radius: 10px;
    padding: 12px 20px !important;
  }
}
</style>
