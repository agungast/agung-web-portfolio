import { ref, onMounted, onUnmounted } from 'vue'

const scrollTop = ref(0)
const scrollProgress = ref(0)
const isScrolled = ref(false)

let rafId = null
let subscriberCount = 0

function update() {
  rafId = null
  const top = window.scrollY || document.documentElement.scrollTop
  scrollTop.value = top
  isScrolled.value = top > 20
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
  scrollProgress.value = docHeight > 0 ? Math.min(100, Math.max(0, (top / docHeight) * 100)) : 0
}

function onScroll() {
  if (!rafId) rafId = requestAnimationFrame(update)
}

export function useScrollState() {
  onMounted(() => {
    if (subscriberCount++ === 0) {
      window.addEventListener('scroll', onScroll, { passive: true })
    }
    update()
  })

  onUnmounted(() => {
    if (--subscriberCount === 0) {
      window.removeEventListener('scroll', onScroll)
    }
  })

  return { scrollTop, scrollProgress, isScrolled }
}
