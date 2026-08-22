<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useToast } from '../composables/useToast'

const { showToast } = useToast()

const titles = [
  'Front-End Developer',
  'Vue.js & Nuxt Specialist',
  'UI/UX Enthusiast',
  'Informatics Student'
]

const currentTitle = ref('')
const titleIndex = ref(0)
const charIndex = ref(0)
const isDeleting = ref(false)
const typingSpeed = ref(100)

let typingTimeout: ReturnType<typeof setTimeout> | null = null

function typeLoop() {
  const currentFullTitle = titles[titleIndex.value]

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
      showToast('Email: agunghadi.astanto@gmail.com', 'info')
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
    <div class="grid-background" aria-hidden="true" />

    <div class="container hero-inner">
      <div class="hero-content">
        <!-- Live status badge -->
        <div class="status-badge">
          <span class="pulse-dot" />
          <span>Available for Projects &amp; Opportunities</span>
        </div>

        <p class="greeting">Hi there, I'm</p>
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
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            Copy Email
          </button>
        </div>

        <!-- Floating tech pills -->
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

      <!-- Hero Visual Decorative Card -->
      <div class="hero-visual">
        <div class="code-card card">
          <div class="code-header">
            <div class="dots">
              <span class="dot red" />
              <span class="dot yellow" />
              <span class="dot green" />
            </div>
            <span class="file-name">developer.config.ts</span>
          </div>
          <div class="code-body">
            <p><span class="c-keyword">const</span> <span class="c-var">developer</span> = {</p>
            <p class="indent-1"><span class="c-prop">name</span>: <span class="c-str">'Agung Hadi Astanto'</span>,</p>
            <p class="indent-1"><span class="c-prop">role</span>: <span class="c-str">'Front-End Engineer'</span>,</p>
            <p class="indent-1"><span class="c-prop">location</span>: <span class="c-str">'Indonesia 🇮🇩'</span>,</p>
            <p class="indent-1"><span class="c-prop">status</span>: <span class="c-str">'Open to Work'</span>,</p>
            <p class="indent-1"><span class="c-prop">skills</span>: [</p>
            <p class="indent-2"><span class="c-str">'Vue 3'</span>, <span class="c-str">'Nuxt 3'</span>, <span class="c-str">'TypeScript'</span>,</p>
            <p class="indent-2"><span class="c-str">'TailwindCSS'</span>, <span class="c-str">'REST APIs'</span></p>
            <p class="indent-1">],</p>
            <p class="indent-1"><span class="c-prop">codeClean</span>: <span class="c-bool">true</span>,</p>
            <p class="indent-1"><span class="c-prop">fastLearner</span>: <span class="c-bool">true</span></p>
            <p>};</p>
          </div>
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
    rgba(56, 189, 248, 0.14),
    rgba(129, 140, 248, 0.08) 40%,
    transparent 70%
  );
  transition: background 0.1s ease-out;
  z-index: 1;
}

.grid-background {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(to right, rgba(35, 48, 74, 0.25) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(35, 48, 74, 0.25) 1px, transparent 1px);
  background-size: 50px 50px;
  mask-image: radial-gradient(ellipse 80% 60% at 50% 40%, #000 70%, transparent 100%);
  -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 40%, #000 70%, transparent 100%);
  pointer-events: none;
  z-index: 0;
}

.hero-inner {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 60px;
  align-items: center;
  position: relative;
  z-index: 2;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 999px;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.25);
  font-size: 0.82rem;
  font-weight: 600;
  color: #4ade80;
  margin-bottom: 20px;
}

.greeting {
  color: var(--accent);
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
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
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.cursor {
  font-weight: 300;
  color: var(--accent);
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
  font-size: 0.8rem;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 8px;
  background: rgba(35, 48, 74, 0.4);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  transition: all 0.25s ease;
}

.tech-pill:hover {
  border-color: var(--accent);
  color: var(--accent);
  transform: translateY(-2px);
  background: rgba(56, 189, 248, 0.08);
}

/* Code card */
.hero-visual {
  display: flex;
  justify-content: center;
}

.code-card {
  width: 100%;
  max-width: 440px;
  padding: 0;
  overflow: hidden;
  background: rgba(17, 24, 39, 0.85);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(56, 189, 248, 0.25);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(56, 189, 248, 0.12);
  transform: perspective(1000px) rotateY(-4deg) rotateX(2deg);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.code-card:hover {
  transform: perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(-6px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.6), 0 0 35px rgba(56, 189, 248, 0.22);
}

.code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 18px;
  background: rgba(11, 15, 25, 0.75);
  border-bottom: 1px solid var(--border);
}

.dots {
  display: flex;
  gap: 6px;
}

.dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
}
.dot.red { background: #ef4444; }
.dot.yellow { background: #eab308; }
.dot.green { background: #22c55e; }

.file-name {
  font-size: 0.78rem;
  font-family: monospace;
  color: var(--muted);
}

.code-body {
  padding: 20px 22px;
  font-family: 'Consolas', 'Fira Code', monospace;
  font-size: 0.88rem;
  line-height: 1.6;
  color: #e2e8f0;
}

.indent-1 { padding-left: 20px; }
.indent-2 { padding-left: 40px; }

.c-keyword { color: #f472b6; }
.c-var { color: #38bdf8; }
.c-prop { color: #93c5fd; }
.c-str { color: #a7f3d0; }
.c-bool { color: #fbbf24; }

@media (max-width: 960px) {
  .hero-inner {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: left;
  }

  .code-card {
    transform: none;
  }
}
</style>
