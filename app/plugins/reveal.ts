export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', {
    mounted(el: HTMLElement) {
      el.classList.add('reveal-up')
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Add a small delay to allow the layout to settle, 
            // and to make it feel like a deliberate entrance.
            setTimeout(() => {
              el.classList.add('is-revealed')
            }, 50)
            observer.unobserve(el)
          }
        })
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      })
      
      observer.observe(el)
    }
  })
})
