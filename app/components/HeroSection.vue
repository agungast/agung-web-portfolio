<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useAppState } from '../composables/useAppState'
import profileImg from '~/assets/images/profile-picture.webp'

const { isAppReady } = useAppState()

const greetings = [
  "Hello, I'm",
  "Halo, saya",
  "Hi there, I'm",
  "Hey, I'm"
]
const greetingIndex = ref(0)
const currentGreeting = computed(() => greetings[greetingIndex.value])
const isWaving = ref(false)
const hintText = ref('click to wave')
let hintTimer = null

function cycleGreeting() {
  isWaving.value = true
  greetingIndex.value = (greetingIndex.value + 1) % greetings.length
  hintText.value = 'waved back!'
  
  if (hintTimer) clearTimeout(hintTimer)
  hintTimer = setTimeout(() => {
    isWaving.value = false
    hintText.value = 'click to wave'
  }, 1600)
}

function onGreetingHover() {
  if (!isWaving.value) {
    hintText.value = 'click to wave'
  }
}

const titles = [
  'UI/UX Designer',
  'Web Developer',
  'AI/ML Enthusiast',
  'Computer Engineering Student'
]

const currentRoleIndex = ref(0)
let roleInterval = null

function startRoleTicker() {
  if (roleInterval) clearInterval(roleInterval)
  roleInterval = setInterval(() => {
    currentRoleIndex.value = (currentRoleIndex.value + 1) % titles.length
  }, 3000)
}

function handleVisibility() {
  if (document.hidden) {
    if (roleInterval) {
      clearInterval(roleInterval)
      roleInterval = null
    }
  } else if (!roleInterval && isAppReady.value) {
    startRoleTicker()
  }
}

onMounted(() => {
  document.addEventListener('visibilitychange', handleVisibility)
  if (isAppReady.value) {
    startRoleTicker()
  }
})

watch(isAppReady, (ready) => {
  if (ready) {
    setTimeout(startRoleTicker, 400)
  }
})

onUnmounted(() => {
  document.removeEventListener('visibilitychange', handleVisibility)
  if (roleInterval) clearInterval(roleInterval)
})
</script>

<template>
  <section id="home" class="hero">

    <div class="container hero-inner">
      <div class="hero-content">
        <div class="greeting-wrap">
          <button
            class="greeting-btn reveal-text"
            :class="{ 'is-visible': isAppReady, 'is-waving': isWaving }"
            @click="cycleGreeting"
            @mouseenter="onGreetingHover"
            type="button"
            title="Click to wave & switch greeting"
            aria-label="Interactive greeting button"
          >
            <span class="wave-container">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="wave-icon" aria-hidden="true">
                <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/>
                <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"/>
                <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/>
                <path d="M18 8a2 2 0 0 1 2 2v4a6 6 0 0 1-6 6h-2a6 6 0 0 1-6-6v-2"/>
              </svg>
            </span>

            <span class="greeting-text">{{ currentGreeting }}</span>

            <span class="greeting-hint" aria-hidden="true">
              <span class="hint-pill">{{ hintText }}</span>
            </span>
          </button>
        </div>
        <div class="mask-wrap">
          <h1 class="hero-name reveal-text delay-1" :class="{ 'is-visible': isAppReady }">
            Agung Hadi Astanto
          </h1>
        </div>

        <div class="mask-wrap">
          <div class="role-roller reveal-text delay-2" :class="{ 'is-visible': isAppReady }">
            <Transition name="role-slide" mode="out-in">
              <span :key="currentRoleIndex" class="role-text">
                {{ titles[currentRoleIndex] }}
              </span>
            </Transition>
          </div>
        </div>

        <p class="desc reveal-up" :class="{ 'is-revealed': isAppReady }">
          Computer Engineering Student at Politeknik Negeri Semarang specializing in UI/UX Design and digital product development. Dedicated to crafting intuitive, user-centered web and mobile experiences.
        </p>

        <!-- Action buttons -->
        <div class="actions reveal-up delay-100" :class="{ 'is-revealed': isAppReady }">
          <a href="#projects" class="btn btn-primary">
            Explore Work
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
          <a
            href="/CV_Agung_Hadi_Astanto.pdf"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-outline"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <line x1="10" y1="9" x2="8" y2="9" />
            </svg>
            View CV
          </a>
        </div>

        <!-- Tech stack tags -->
        <div class="tech-pills reveal-up delay-200" :class="{ 'is-revealed': isAppReady }">
          <span class="pill-label">Focus &amp; Stack:</span>
          <div class="pills-list">
            <span class="tech-pill">Figma (UI/UX)</span>
            <span class="tech-pill">Vue 3 / Nuxt</span>
            <span class="tech-pill">Javascript</span>
            <span class="tech-pill">Supabase</span>
            <span class="tech-pill">Git &amp; GitHub</span>
          </div>
        </div>
      </div>

      <!-- Hero Visual Profile Frame with Animated Border Beam & Studio Accents -->
      <div class="hero-visual reveal-up delay-300" :class="{ 'is-revealed': isAppReady }">
        <div class="profile-frame-wrap">
          <!-- Ambient moving glow aura behind the frame -->
          <div class="frame-glow-runner" aria-hidden="true">
            <div class="glow-spinner" />
          </div>

          <!-- Studio Tech Corner Brackets -->
          <div class="corner-bracket top-left" aria-hidden="true" />
          <div class="corner-bracket top-right" aria-hidden="true" />
          <div class="corner-bracket bottom-left" aria-hidden="true" />
          <div class="corner-bracket bottom-right" aria-hidden="true" />

          <!-- Outer border shell containing the rotating border beam -->
          <div class="profile-frame-shell">
            <div class="border-beam-spinner" aria-hidden="true" />
            
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


/* Masked Typography Reveal Classes */
.mask-wrap {
  overflow: hidden;
}

.reveal-text {
  display: block;
  transform: translateY(110%);
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal-text.is-visible {
  transform: translateY(0);
}

.reveal-text.delay-1 { transition-delay: 100ms; }
.reveal-text.delay-2 { transition-delay: 200ms; }

.hero-inner {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 60px;
  align-items: center;
  position: relative;
  z-index: 2;
}

.greeting-wrap {
  overflow: hidden;
  margin-bottom: 8px;
}

.greeting-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: transparent;
  border: 1px solid transparent;
  padding: 4px 12px 4px 4px;
  border-radius: 9999px;
  cursor: pointer;
  color: var(--text-secondary);
  font-family: inherit;
  font-size: 1.15rem;
  font-weight: 600;
  transition: background-color 0.25s ease, border-color 0.25s ease, color 0.25s ease, transform 0.2s ease;
  user-select: none;
}

.greeting-btn:hover {
  background: var(--brand-mono-surface);
  border-color: var(--border);
  color: var(--text);
  transform: translateY(-1px);
}

.greeting-btn:active {
  transform: translateY(0);
}

.wave-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  color: var(--text);
  transition: transform 0.25s ease, background-color 0.25s ease, border-color 0.25s ease;
}

.greeting-btn:hover .wave-container {
  background: var(--card-hover);
  border-color: var(--border-light);
  transform: scale(1.08);
}

.wave-icon {
  transform-origin: 70% 70%;
}

.greeting-btn:hover .wave-icon,
.greeting-btn.is-waving .wave-icon {
  animation: wave-animation 1.2s ease-in-out infinite;
}

@keyframes wave-animation {
  0% { transform: rotate(0deg); }
  15% { transform: rotate(14deg); }
  30% { transform: rotate(-12deg); }
  45% { transform: rotate(14deg); }
  60% { transform: rotate(-8deg); }
  75% { transform: rotate(10deg); }
  100% { transform: rotate(0deg); }
}

.greeting-text {
  font-size: 1.12rem;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.greeting-hint {
  display: inline-flex;
  align-items: center;
  overflow: hidden;
  max-width: 0;
  opacity: 0;
  transition: max-width 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease;
}

.greeting-btn:hover .greeting-hint,
.greeting-btn.is-waving .greeting-hint {
  max-width: 140px;
  opacity: 1;
}

.hint-pill {
  font-family: var(--font-mono, monospace);
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--muted);
  background: var(--card);
  border: 1px solid var(--border);
  padding: 2px 8px;
  border-radius: 9999px;
  white-space: nowrap;
}

.hero-name {
  font-size: clamp(2.5rem, 5.5vw, 4.2rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 12px;
  letter-spacing: -0.03em;
}

.role-roller {
  font-size: clamp(1.3rem, 2.8vw, 1.85rem);
  font-weight: 700;
  min-height: 2.2em;
  display: flex;
  align-items: center;
  margin-bottom: 18px;
  overflow: hidden;
}

.role-text {
  display: inline-block;
  color: var(--text);
}

.role-slide-enter-active,
.role-slide-leave-active {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
}

.role-slide-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.role-slide-leave-to {
  transform: translateY(-100%);
  opacity: 0;
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
  border-color: var(--border-light);
  color: var(--text);
  transform: translateY(-1px);
}

/* Hero Visual Profile Frame with Border Beam & Studio Accents */
.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-frame-wrap {
  position: relative;
  width: 100%;
  max-width: 370px;
  aspect-ratio: 3 / 4;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.profile-frame-wrap:hover {
  transform: translateY(-4px);
}

/* Ambient moving glow aura behind the frame */
.frame-glow-runner {
  position: absolute;
  inset: -14px;
  border-radius: 36px;
  overflow: hidden;
  filter: blur(22px);
  opacity: 0.45;
  pointer-events: none;
  z-index: 0;
  transition: opacity 0.4s ease, filter 0.4s ease;
}

.glow-spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 250%;
  height: 250%;
  transform: translate(-50%, -50%);
  background: conic-gradient(
    from 0deg,
    transparent 0deg,
    transparent 280deg,
    rgba(var(--accent-rgb), 0.25) 320deg,
    rgba(var(--accent-rgb), 0.85) 360deg
  );
  animation: border-beam-spin 6s linear infinite;
}


/* Outer border shell containing the rotating border beam */
.profile-frame-shell {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 24px;
  padding: 1.5px;
  overflow: hidden;
  background: var(--border);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.border-beam-spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 250%;
  height: 250%;
  transform: translate(-50%, -50%);
  background: conic-gradient(
    from 0deg,
    transparent 0deg,
    transparent 270deg,
    rgba(var(--accent-rgb), 0.3) 315deg,
    rgba(var(--accent-rgb), 1) 360deg
  );
  animation: border-beam-spin 6s linear infinite;
  pointer-events: none;
}

@keyframes border-beam-spin {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.profile-frame {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  border-radius: 22.5px;
  background: var(--card);
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.profile-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
  user-select: none;
  pointer-events: none;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.profile-frame-wrap:hover .profile-photo {
  transform: scale(1.025);
}

/* Studio Tech Corner Brackets */
.corner-bracket {
  position: absolute;
  width: 14px;
  height: 14px;
  pointer-events: none;
  z-index: 3;
  opacity: 0.7;
}

.corner-bracket.top-left {
  top: -6px;
  left: -6px;
  border-top: 1.5px solid var(--text);
  border-left: 1.5px solid var(--text);
}

.corner-bracket.top-right {
  top: -6px;
  right: -6px;
  border-top: 1.5px solid var(--text);
  border-right: 1.5px solid var(--text);
}

.corner-bracket.bottom-left {
  bottom: -6px;
  left: -6px;
  border-bottom: 1.5px solid var(--text);
  border-left: 1.5px solid var(--text);
}

.corner-bracket.bottom-right {
  bottom: -6px;
  right: -6px;
  border-bottom: 1.5px solid var(--text);
  border-right: 1.5px solid var(--text);
}



@media (max-width: 960px) {
  .hero-inner {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: left;
  }

  .profile-frame-wrap {
    max-width: 320px;
    margin-inline: auto;
  }
}
</style>
