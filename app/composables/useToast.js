import { ref } from 'vue'

const toasts = ref([])
let nextId = 1

export function useToast() {
  function showToast(text, type = 'success', duration = 3000) {
    const id = nextId++
    toasts.value.push({ id, text, type })

    setTimeout(() => {
      removeToast(id)
    }, duration)
  }

  function removeToast(id) {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  return {
    toasts,
    showToast,
    removeToast
  }
}
