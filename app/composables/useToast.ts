import { ref } from 'vue'

export interface ToastMessage {
  id: number
  text: string
  type?: 'success' | 'info' | 'warning'
}

const toasts = ref<ToastMessage[]>([])
let nextId = 1

export function useToast() {
  function showToast(text: string, type: 'success' | 'info' | 'warning' = 'success', duration = 3000) {
    const id = nextId++
    toasts.value.push({ id, text, type })

    setTimeout(() => {
      removeToast(id)
    }, duration)
  }

  function removeToast(id: number) {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  return {
    toasts,
    showToast,
    removeToast
  }
}
