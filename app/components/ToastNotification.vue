<script setup lang="ts">
import { useToast } from '../composables/useToast'

const { toasts, removeToast } = useToast()
</script>

<template>
  <div class="toast-container" aria-live="polite">
    <TransitionGroup name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="toast-item"
        :class="toast.type || 'success'"
        @click="removeToast(toast.id)"
      >
        <span class="toast-icon">
          <svg v-if="toast.type === 'success' || !toast.type" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <svg v-else-if="toast.type === 'info'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        </span>
        <span class="toast-text">{{ toast.text }}</span>
        <button class="toast-close" aria-label="Close notification">&times;</button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-container {
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 380px;
  pointer-events: none;
}

.toast-item {
  pointer-events: auto;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  border-radius: 12px;
  background: var(--card);
  backdrop-filter: blur(12px);
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-card-hover);
  color: var(--text);
  font-size: 0.92rem;
  font-weight: 500;
}

.toast-item.success {
  border-color: var(--border-light);
}

.toast-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
}

.toast-text {
  flex: 1;
}

.toast-close {
  background: none;
  border: none;
  color: var(--muted);
  font-size: 1.2rem;
  line-height: 1;
  cursor: pointer;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.toast-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(40px) scale(0.95);
}
</style>
