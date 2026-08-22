<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Skill {
  name: string
  level: number
  category: 'frontend' | 'framework' | 'tools'
  icon: string
  experience: string
}

const skills: Skill[] = [
  { name: 'HTML5 & CSS3', level: 95, category: 'frontend', icon: '🌐', experience: 'Advanced' },
  { name: 'JavaScript (ES6+)', level: 88, category: 'frontend', icon: '⚡', experience: 'Advanced' },
  { name: 'TypeScript', level: 80, category: 'frontend', icon: '📘', experience: 'Intermediate' },
  { name: 'Vue.js 3 (Composition API)', level: 85, category: 'framework', icon: '💚', experience: 'Advanced' },
  { name: 'Nuxt 3', level: 82, category: 'framework', icon: '🚀', experience: 'Advanced' },
  { name: 'Tailwind CSS', level: 90, category: 'frontend', icon: '🎨', experience: 'Advanced' },
  { name: 'Pinia / State Management', level: 80, category: 'framework', icon: '🍍', experience: 'Intermediate' },
  { name: 'REST APIs & Fetch', level: 85, category: 'tools', icon: '🔌', experience: 'Advanced' },
  { name: 'Git & GitHub', level: 82, category: 'tools', icon: '🐙', experience: 'Advanced' },
  { name: 'Node.js Basics', level: 68, category: 'tools', icon: '🟢', experience: 'Intermediate' },
  { name: 'Firebase / Supabase', level: 75, category: 'tools', icon: '🔥', experience: 'Intermediate' },
  { name: 'Responsive Web Design', level: 92, category: 'frontend', icon: '📱', experience: 'Advanced' }
]

const selectedCategory = ref<'all' | 'frontend' | 'framework' | 'tools'>('all')
const isVisible = ref(false)

const filteredSkills = computed(() => {
  if (selectedCategory.value === 'all') return skills
  return skills.filter(s => s.category === selectedCategory.value)
})

onMounted(() => {
  const section = document.getElementById('skills')
  if (!section) return

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        isVisible.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.15 }
  )

  observer.observe(section)
})
</script>

<template>
  <section id="skills" class="section">
    <div class="container">
      <div class="section-header">
        <span class="section-badge">Tech Stack</span>
        <h2 class="section-title">Skills &amp; <span>Expertise</span></h2>
        <p class="section-subtitle">
          Core technologies, modern frameworks, and tools I use to build scalable web applications.
        </p>
      </div>

      <!-- Filter Category Buttons -->
      <div class="category-filters">
        <button
          class="filter-pill"
          :class="{ active: selectedCategory === 'all' }"
          @click="selectedCategory = 'all'"
        >
          All Skills ({{ skills.length }})
        </button>
        <button
          class="filter-pill"
          :class="{ active: selectedCategory === 'frontend' }"
          @click="selectedCategory = 'frontend'"
        >
          Frontend Core
        </button>
        <button
          class="filter-pill"
          :class="{ active: selectedCategory === 'framework' }"
          @click="selectedCategory = 'framework'"
        >
          Vue &amp; Ecosystem
        </button>
        <button
          class="filter-pill"
          :class="{ active: selectedCategory === 'tools' }"
          @click="selectedCategory = 'tools'"
        >
          Tools &amp; Backend
        </button>
      </div>

      <!-- Skills Grid -->
      <div class="skills-grid">
        <div
          v-for="(skill, index) in filteredSkills"
          :key="skill.name"
          class="skill-card card"
          :style="{ transitionDelay: `${index * 50}ms` }"
        >
          <div class="skill-header">
            <div class="skill-info">
              <span class="skill-icon">{{ skill.icon }}</span>
              <div>
                <h4 class="skill-title">{{ skill.name }}</h4>
                <span class="skill-badge">{{ skill.experience }}</span>
              </div>
            </div>
            <span class="skill-percentage">{{ isVisible ? skill.level : 0 }}%</span>
          </div>

          <div class="progress-bar-bg" aria-hidden="true">
            <div
              class="progress-bar-fill"
              :style="{ width: isVisible ? `${skill.level}%` : '0%' }"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.category-filters {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 42px;
}

.filter-pill {
  padding: 8px 20px;
  border-radius: 999px;
  background: rgba(21, 28, 44, 0.7);
  border: 1px solid var(--border);
  color: var(--muted);
  font-family: inherit;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
}

.filter-pill:hover {
  color: var(--text);
  border-color: rgba(56, 189, 248, 0.4);
}

.filter-pill.active {
  background: var(--accent-gradient);
  color: #0b0f19;
  border-color: transparent;
  font-weight: 700;
  box-shadow: 0 4px 15px rgba(56, 189, 248, 0.35);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 22px;
}

.skill-card {
  padding: 22px 24px;
  background: rgba(21, 28, 44, 0.65);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.skill-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.skill-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.skill-icon {
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(35, 48, 74, 0.4);
  border: 1px solid var(--border);
}

.skill-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 2px;
}

.skill-badge {
  font-size: 0.75rem;
  color: var(--accent);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.skill-percentage {
  font-size: 1.1rem;
  font-weight: 800;
  font-family: 'Outfit', sans-serif;
  color: var(--accent);
}

.progress-bar-bg {
  width: 100%;
  height: 8px;
  background: rgba(35, 48, 74, 0.5);
  border-radius: 999px;
  overflow: hidden;
  border: 1px solid rgba(35, 48, 74, 0.7);
}

.progress-bar-fill {
  height: 100%;
  border-radius: 999px;
  background: var(--accent-gradient);
  box-shadow: 0 0 10px rgba(56, 189, 248, 0.5);
  transition: width 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}

@media (max-width: 640px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
}
</style>
