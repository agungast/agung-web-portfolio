import { ref, computed } from 'vue'

const theme = ref('dark')

export function useTheme() {
  const isDark = computed(() => theme.value === 'dark')

  function applyTheme(newTheme) {
    theme.value = newTheme
    if (typeof document !== 'undefined') {
      const root = document.documentElement
      if (newTheme === 'dark') {
        root.classList.add('dark')
        root.classList.remove('light')
        root.setAttribute('data-theme', 'dark')
      } else {
        root.classList.add('light')
        root.classList.remove('dark')
        root.setAttribute('data-theme', 'light')
      }
    }
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', newTheme)
    }
  }

  function toggleTheme() {
    applyTheme(theme.value === 'dark' ? 'light' : 'dark')
  }

  return {
    theme,
    isDark,
    toggleTheme,
    applyTheme
  }
}
