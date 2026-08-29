<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const show = ref(false)
const scrollProgress = ref(0)

function updateScroll() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
  if (docHeight > 0) {
    scrollProgress.value = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100))
  }
  show.value = scrollTop > 300
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', updateScroll, { passive: true })
  updateScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScroll)
})
</script>

<template>
  <Transition name="fade-scale">
    <button
      v-if="show"
      class="back-to-top"
      aria-label="Scroll to top"
      @click="scrollToTop"
    >
      <svg class="progress-ring" width="48" height="48" viewBox="0 0 48 48">
        <circle
          class="progress-ring__circle-bg"
          stroke="var(--border)"
          stroke-width="3"
          fill="transparent"
          r="20"
          cx="24"
          cy="24"
        />
        <circle
          class="progress-ring__circle"
          stroke="var(--accent)"
          stroke-width="3"
          stroke-linecap="round"
          fill="transparent"
          r="20"
          cx="24"
          cy="24"
          :style="{
            strokeDasharray: `${2 * Math.PI * 20}`,
            strokeDashoffset: `${2 * Math.PI * 20 * (1 - scrollProgress / 100)}`
          }"
        />
      </svg>
      <span class="arrow">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="19" x2="12" y2="5" />
          <polyline points="5 12 12 5 19 12" />
        </svg>
      </span>
    </button>
  </Transition>
</template>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 28px;
  left: 28px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--card);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 90;
  box-shadow: var(--shadow-card);
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease, background-color 0.3s ease;
  padding: 0;
}

.back-to-top:hover {
  transform: translateY(-4px) scale(1.05);
  border-color: var(--accent);
  box-shadow: var(--shadow-card);
}

.progress-ring {
  position: absolute;
  top: 0;
  left: 0;
  transform: rotate(-90deg);
}

.progress-ring__circle {
  transition: stroke-dashoffset 0.1s ease;
}

.arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text);
  z-index: 1;
  transition: color 0.2s ease, transform 0.2s ease;
}

.back-to-top:hover .arrow {
  color: var(--accent);
  transform: translateY(-2px);
}

.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.6);
}
</style>
