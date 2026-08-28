import { ref } from 'vue'

const isAppReady = ref(false)

export function useAppState() {
  return {
    isAppReady
  }
}
