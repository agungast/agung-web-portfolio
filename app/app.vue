<script setup lang="ts">
import { onMounted } from 'vue'
import { useTheme } from './composables/useTheme'

const { initTheme } = useTheme()

onMounted(() => {
  initTheme()
})
</script>

<template>
  <div class="app-shell">
    <SplashScreen />
    <BackgroundElements />
    <AppNavbar />
    <NuxtPage />
    <AppFooter />
    <BackToTop />
    <ToastNotification />
  </div>
</template>

<style scoped>
.app-shell {
  position: relative;
}
</style>
