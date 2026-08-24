<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useToast } from '../composables/useToast'
import profileImg from '~/assets/images/profile-picture.webp'

const { showToast } = useToast()

const titles = [
  'Front-End Developer',
  'Vue.js & Nuxt Specialist',
  'UI/UX Designer',
  'Informatics Student'
]

const currentTitle = ref('')
const titleIndex = ref(0)
const charIndex = ref(0)
const isDeleting = ref(false)
const typingSpeed = ref(100)

let typingTimeout: ReturnType<typeof setTimeout> | null = null

function typeLoop() {
  const currentFullTitle = titles[titleIndex.value] ?? ''
  if (!currentFullTitle) return

  if (!isDeleting.value) {
    currentTitle.value = currentFullTitle.substring(0, charIndex.value + 1)
    charIndex.value++

    if (charIndex.value === currentFullTitle.length) {
      isDeleting.value = true
      typingSpeed.value = 2000 // Pause before deleting
    } else {
      typingSpeed.value = 90
    }
  } else {
    currentTitle.value = currentFullTitle.substring(0, charIndex.value - 1)
    charIndex.value--

    if (charIndex.value === 0) {
      isDeleting.value = false
      titleIndex.value = (titleIndex.value + 1) % titles.length
      typingSpeed.value = 400 // Pause before typing next
    } else {
      typingSpeed.value = 40
    }
  }

  typingTimeout = setTimeout(typeLoop, typingSpeed.value)
}

// Mouse Spotlight Tracker
const mouseX = ref(50)
const mouseY = ref(50)

function handleMouseMove(e: MouseEvent) {
  const heroEl = document.getElementById('home')
  if (!heroEl) return
  const rect = heroEl.getBoundingClientRect()
  const x = ((e.clientX - rect.left) / rect.width) * 100
  const y = ((e.clientY - rect.top) / rect.height) * 100
  mouseX.value = Math.round(x)
  mouseY.value = Math.round(y)
}

function copyEmail() {
  const email = 'agunghadi.astanto@gmail.com'
  if (navigator.clipboard) {
    navigator.clipboard.writeText(email).then(() => {
      showToast('Email address copied to clipboard!', 'success')
    }).catch(() => {
      showToast('Email: agunghaast14@gmail.com', 'info')
    })
  } else {
    showToast('Email: agunghadi.astanto@gmail.com', 'info')
  }
}

onMounted(() => {
  typeLoop()
  const hero = document.getElementById('home')
  hero?.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  if (typingTimeout) clearTimeout(typingTimeout)
  const hero = document.getElementById('home')
  hero?.removeEventListener('mousemove', handleMouseMove)
})
</script>

<template>
  <section
    id="home"
    class="hero"
    :style="{
      '--spotlight-x': `${mouseX}%`,
      '--spotlight-y': `${mouseY}%`
    }"
  >
    <div class="spotlight-layer" aria-hidden="true" />

    <div class="container hero-inner">
      <div class="hero-content">
        <p class="greeting">Hello, I'm</p>
        <h1 class="hero-name">
          Agung Hadi Astanto
        </h1>

        <div class="typewriter-container">
          <span class="typewriter-text">{{ currentTitle }}</span>
          <span class="cursor">|</span>
        </div>

        <p class="desc">
          Passionate in crafting fast, accessible, and interactive modern web applications.
          Focused on the Vue &amp; Nuxt ecosystem with an eye for clean UI/UX aesthetics.
        </p>

        <!-- Action buttons -->
        <div class="actions">
          <a href="#projects" class="btn btn-primary">
            Explore Work
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
          <button class="btn btn-outline" @click="copyEmail">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            Copy Email
          </button>
        </div>

        <!-- Tech stack tags -->
        <div class="tech-pills">
          <span class="pill-label">Tech Stack:</span>
          <div class="pills-list">
            <span class="tech-pill">Vue 3</span>
            <span class="tech-pill">Nuxt 3</span>
            <span class="tech-pill">TypeScript</span>
            <span class="tech-pill">Tailwind CSS</span>
            <span class="tech-pill">Node.js</span>
          </div>
        </div>
      </div>

      <!-- Hero Visual Minimalist Profile Frame -->
      <div class="hero-visual">
        <div class="profile-frame">
          <img
            :src="profileImg"
            alt="Agung Hadi Astanto"
            class="profile-photo"
            loading="eager"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: calc(100vh - 72px);
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 60px 0 80px;
}

.spotlight-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    700px circle at var(--spotlight-x, 50%) var(--spotlight-y, 40%),
    var(--spotlight-aura),
    transparent 70%
  );
  transition: background 0.1s ease-out;
  z-index: 1;
}

.hero-inner {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 60px;
  align-items: center;
  position: relative;
  z-index: 2;
}

.greeting {
  margin-bottom: 8px;
}

.greeting {
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 6px;
}

.hero-name {
  font-size: clamp(2.5rem, 5.5vw, 4.2rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 12px;
  letter-spacing: -0.03em;
}

.typewriter-container {
  font-size: clamp(1.3rem, 2.8vw, 1.85rem);
  font-weight: 700;
  min-height: 2.2em;
  display: flex;
  align-items: center;
  margin-bottom: 18px;
}

.typewriter-text {
  color: var(--text);
}

.cursor {
  font-weight: 300;
  color: var(--muted);
  margin-left: 2px;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.desc {
  font-size: 1.05rem;
  color: var(--muted);
  max-width: 520px;
  margin-bottom: 32px;
  line-height: 1.7;
}

.actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 36px;
}

.tech-pills {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.pill-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--muted);
}

.pills-list {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tech-pill {
  font-size: 0.82rem;
  font-weight: 500;
  padding: 4px 12px;
  border-radius: 8px;
  background: var(--card);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  transition: all 0.2s ease;
}

.tech-pill:hover {
  border-color: var(--accent);
  color: var(--accent);
  transform: translateY(-1px);
}

/* Hero Visual Profile Frame */
.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-frame {
  position: relative;
  width: 100%;
  max-width: 370px;
  aspect-ratio: 3 / 4;
  border-radius: 24px;
  background: var(--card);
  border: 1px solid var(--border);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.profile-frame:hover {
  border-color: var(--border-light);
  transform: translateY(-4px);
}

.profile-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
  user-select: none;
  pointer-events: none;
  transition: transform 0.35s ease;
}

.profile-frame:hover .profile-photo {
  transform: scale(1.02);
}

@media (max-width: 960px) {
  .hero-inner {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: left;
  }

  .profile-frame {
    max-width: 320px;
    margin-inline: auto;
  }
}
</style>
