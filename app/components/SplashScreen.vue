<script setup>
import { ref, onMounted } from 'vue'
import { useAppState } from '../composables/useAppState'
import websiteLogo from '~/assets/images/new-website-logo.webp'

const { isAppReady } = useAppState()
const isLeaving = ref(false)
const isHidden = ref(false)

onMounted(() => {
  // Lock scroll initially
  document.body.style.overflow = 'hidden'
  
  // Show splash for a minimum duration
  setTimeout(() => {
    isLeaving.value = true
    
    // Unlock scroll and notify app after transition ends
    setTimeout(() => {
      isHidden.value = true
      document.body.style.overflow = ''
      isAppReady.value = true
    }, 800) // Match the transition duration
  }, 1000)
})
</script>

<template>
  <div v-if="!isHidden" class="splash-screen" :class="{ 'is-leaving': isLeaving }">
    <div class="splash-content">
      <img :src="websiteLogo" alt="Agung Portfolio Logo" class="splash-logo" />
    </div>
  </div>
</template>

<style scoped>
.splash-screen {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: var(--bg);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.8s cubic-bezier(0.76, 0, 0.24, 1);
}

.splash-screen.is-leaving {
  transform: translateY(-100%);
}

.splash-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.splash-logo {
  width: 72px;
  height: 72px;
  object-fit: contain;
  filter: drop-shadow(0 4px 16px rgba(var(--accent-rgb), 0.18));
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(0.95); opacity: 0.7; }
}
</style>
