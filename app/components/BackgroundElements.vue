<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const mouseX = ref(50)
const mouseY = ref(40)
const isVisible = ref(false)

let rafId = null
let currentX = 50
let currentY = 40
let targetX = 50
let targetY = 40

function updatePosition() {
  // Smooth spring / lerp damping for fluid cursor flow
  currentX += (targetX - currentX) * 0.12
  currentY += (targetY - currentY) * 0.12

  mouseX.value = Math.round(currentX * 10) / 10
  mouseY.value = Math.round(currentY * 10) / 10

  if (Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05) {
    rafId = requestAnimationFrame(updatePosition)
  } else {
    rafId = null
  }
}

function handleMouseMove(e) {
  if (!isVisible.value) isVisible.value = true
  targetX = (e.clientX / window.innerWidth) * 100
  targetY = (e.clientY / window.innerHeight) * 100

  if (!rafId) {
    rafId = requestAnimationFrame(updatePosition)
  }
}

function handleMouseLeave() {
  isVisible.value = false
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove, { passive: true })
  document.addEventListener('mouseleave', handleMouseLeave, { passive: true })
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseleave', handleMouseLeave)
  }
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<template>
  <div
    class="background-elements"
    :style="{
      '--cursor-x': `${mouseX}%`,
      '--cursor-y': `${mouseY}%`
    }"
    aria-hidden="true"
  >
    <!-- Global Interactive Cursor Flow Spotlight -->
    <div class="cursor-flow-spotlight" :class="{ 'is-active': isVisible }" />

    <!-- Ambient Blobs -->
    <div class="ambient-blobs" />
    
    <!-- Geometric Decor 1: Radar/Crosshair (Top Right) -->
    <svg class="decor-element top-right" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 0V100M0 50H100" stroke="currentColor" stroke-width="0.5"/>
      <circle cx="50" cy="50" r="30" stroke="currentColor" stroke-width="0.5"/>
      <circle cx="50" cy="50" r="45" stroke="currentColor" stroke-width="0.25" stroke-dasharray="2 4"/>
    </svg>

    <!-- Geometric Decor 2: Tech Brackets (Bottom Left) -->
    <svg class="decor-element bottom-left" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Grid square -->
      <rect x="20" y="20" width="160" height="160" stroke="currentColor" stroke-width="0.5" stroke-dasharray="4 8"/>
      <!-- Corner anchors -->
      <path d="M10 30V10H30" stroke="currentColor" stroke-width="1"/>
      <path d="M190 30V10H170" stroke="currentColor" stroke-width="1"/>
      <path d="M10 170V190H30" stroke="currentColor" stroke-width="1"/>
      <path d="M190 170V190H170" stroke="currentColor" stroke-width="1"/>
      <!-- Small plus signs -->
      <path d="M100 95V105M95 100H105" stroke="currentColor" stroke-width="0.5"/>
      <path d="M40 40v4m-2-2h4" stroke="currentColor" stroke-width="0.5"/>
      <path d="M160 160v4m-2-2h4" stroke="currentColor" stroke-width="0.5"/>
    </svg>
    
    <!-- Geometric Decor 3: Side Ruler (Right Center) -->
    <svg class="decor-element side-ruler" viewBox="0 0 20 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 0V200" stroke="currentColor" stroke-width="0.5"/>
      <path d="M5 20H15M5 60H15M5 100H15M5 140H15M5 180H15" stroke="currentColor" stroke-width="1"/>
      <path d="M8 40H12M8 80H12M8 120H12M8 160H12" stroke="currentColor" stroke-width="0.5"/>
    </svg>
  </div>
</template>

<style scoped>
.background-elements {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.cursor-flow-spotlight {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    circle 750px at var(--cursor-x, 50%) var(--cursor-y, 40%),
    var(--spotlight-aura),
    transparent 75%
  );
  opacity: 0;
  transition: opacity 0.5s ease;
  z-index: 1;
}

.cursor-flow-spotlight.is-active {
  opacity: 1;
}

.ambient-blobs {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 650px 550px at 15% 15%, var(--spotlight-aura), transparent 70%),
    radial-gradient(ellipse 550px 450px at 85% 80%, var(--spotlight-aura), transparent 70%),
    radial-gradient(ellipse 400px 350px at 50% 50%, var(--spotlight-aura), transparent 70%);
}

.decor-element {
  position: absolute;
  color: var(--text-secondary);
  opacity: 0.08; /* Sangat halus / subtle */
  transition: opacity 0.3s ease;
}

html.light .decor-element {
  opacity: 0.12; /* Sedikit lebih terlihat di light mode */
}

.top-right {
  top: -5%;
  right: -5%;
  width: 400px;
  height: 400px;
  animation: slow-spin 120s linear infinite;
}

.bottom-left {
  bottom: 10%;
  left: 2%;
  width: 250px;
  height: 250px;
}

.side-ruler {
  top: 40%;
  right: 2%;
  width: 40px;
  height: 300px;
}

@keyframes slow-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@media (max-width: 860px) {
  .top-right {
    width: 250px;
    height: 250px;
    right: -10%;
    top: 5%;
  }
  .bottom-left, .side-ruler {
    display: none;
  }
}
</style>
