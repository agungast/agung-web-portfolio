<script setup>
const skills = [
  { name: 'Figma', icon: 'logos:figma' },
  { name: 'Laravel', icon: 'logos:laravel' },
  { name: 'Flutter', icon: 'logos:flutter' },
  { name: 'Vue.js', icon: 'logos:vue' },
  { name: 'Nuxt', icon: 'logos:nuxt-icon' },
  { name: 'HTML5', icon: 'logos:html-5' },
  { name: 'CSS3', icon: 'logos:css-3' },
  { name: 'JavaScript', icon: 'logos:javascript' },
  { name: 'PHP', icon: 'logos:php' },
  { name: 'Tailwind CSS', icon: 'logos:tailwindcss-icon' },
  { name: 'Git', icon: 'logos:git-icon' },
  { name: 'GitHub', icon: 'mdi:github' },
  { name: 'Canva', icon: 'logos:canva' },
  { name: 'CapCut', icon: 'ph:video-camera-fill' },
  { name: 'Notion', icon: 'logos:notion-icon' },
  { name: 'REST APIs', icon: 'mdi:api' }
]
</script>

<template>
  <section id="skills" class="section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Tools &amp; Technologies</h2>
        <p class="section-subtitle">
          Core applications, frameworks, and technologies I utilize to design and develop digital products.
        </p>
      </div>

      <!-- Unified Monochrome Skills Grid -->
      <div class="skills-grid">
        <div
          v-for="(skill, index) in skills"
          :key="skill.name"
          class="skill-item card"
          v-reveal
          :style="{ transitionDelay: `${index * 25}ms` }"
        >
          <div class="skill-icon-wrap">
            <Icon :name="skill.icon" class="skill-icon-img" />
          </div>
          <span class="skill-name">{{ skill.name }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 14px;
}

.skill-item {
  padding: 18px 14px;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 10px;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: default;
}

.skill-item:hover {
  border-color: var(--border-light);
  box-shadow: 0 0 0 1px var(--border-light), 0 10px 24px rgba(0, 0, 0, 0.25);
  transform: translateY(-3px);
}

.skill-icon-wrap {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  color: var(--text);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.skill-item:hover .skill-icon-wrap {
  border-color: var(--border-light);
  transform: scale(1.06);
  background: var(--card-hover);
}

/* =========================================================================
   Monochrome Filter System for Icons (Dark & Light Theme Adaptive)
   ========================================================================= */
.skill-icon-wrap :deep(svg),
.skill-icon-wrap :deep(img) {
  display: block;
  width: 28px;
  height: 28px;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Dark Mode: Clean Crisp White/Silver Icons */
html.dark .skill-icon-wrap :deep(svg),
html.dark .skill-icon-wrap :deep(img) {
  filter: grayscale(100%) brightness(1.8) contrast(1.1);
  opacity: 0.85;
}

html.dark .skill-item:hover .skill-icon-wrap :deep(svg),
html.dark .skill-item:hover .skill-icon-wrap :deep(img) {
  filter: grayscale(100%) brightness(2.4) contrast(1.2);
  opacity: 1;
}

/* Light Mode: Clean Crisp Charcoal/Black Icons */
html.light .skill-icon-wrap :deep(svg),
html.light .skill-icon-wrap :deep(img) {
  filter: grayscale(100%) brightness(0.2) contrast(1.3);
  opacity: 0.85;
}

html.light .skill-item:hover .skill-icon-wrap :deep(svg),
html.light .skill-item:hover .skill-icon-wrap :deep(img) {
  filter: grayscale(100%) brightness(0) contrast(1.6);
  opacity: 1;
}

.skill-name {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--text);
  letter-spacing: -0.01em;
  line-height: 1.2;
}

@media (max-width: 640px) {
  .skills-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }

  .skill-item {
    padding: 14px 10px;
    gap: 8px;
  }

  .skill-icon-wrap {
    width: 42px;
    height: 42px;
    font-size: 1.4rem;
  }

  .skill-icon-wrap :deep(svg),
  .skill-icon-wrap :deep(img) {
    width: 24px;
    height: 24px;
  }

  .skill-name {
    font-size: 0.8rem;
  }
}

@media (max-width: 420px) {
  .skills-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
