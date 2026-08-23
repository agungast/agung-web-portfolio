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
      const entry = entries[0]
      if (entry?.isIntersecting) {
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
        <span class="section-badge badge-emerald">Tech Stack</span>
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
          :class="{ active: selectedCategory === 'frontend', 'btn-cyan': selectedCategory === 'frontend' }"
          @click="selectedCategory = 'frontend'"
        >
          Frontend Core
        </button>
        <button
          class="filter-pill"
          :class="{ active: selectedCategory === 'framework', 'btn-emerald': selectedCategory === 'framework' }"
          @click="selectedCategory = 'framework'"
        >
          Vue &amp; Ecosystem
        </button>
        <button
          class="filter-pill"
          :class="{ active: selectedCategory === 'tools', 'btn-amber': selectedCategory === 'tools' }"
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
          :class="`skill-cat-${skill.category}`"
          :style="{ transitionDelay: `${index * 50}ms` }"
        >
          <div class="skill-header">
            <div class="skill-info">
              <span class="skill-icon" :class="`icon-${skill.category}`">{{ skill.icon }}</span>
              <div>
                <h4 class="skill-title">{{ skill.name }}</h4>
                <span class="skill-badge" :class="`badge-${skill.category}`">{{ skill.experience }}</span>
              </div>
            </div>
            <span class="skill-percentage" :class="`pct-${skill.category}`">{{ isVisible ? skill.level : 0 }}%</span>
          </div>

          <div class="progress-bar-bg" aria-hidden="true">
            <div
              class="progress-bar-fill"
              :class="`fill-${skill.category}`"
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
  background: var(--card);
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
  border-color: var(--border-light);
}

.filter-pill.active {
  background: var(--accent);
  color: #ffffff;
  border-color: transparent;
  font-weight: 600;
}

.filter-pill.active.btn-cyan {
  background: var(--color-cyan);
}

.filter-pill.active.btn-emerald {
  background: var(--color-emerald);
}

.filter-pill.active.btn-amber {
  background: var(--color-amber);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
}

.skill-card {
  padding: 22px 24px;
  background: var(--card);
  border: 1px solid var(--border);
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
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: var(--chip-bg);
  border: 1px solid var(--border);
}

.icon-frontend {
  background: var(--color-cyan-bg);
  border-color: transparent;
}

.icon-framework {
  background: var(--color-emerald-bg);
  border-color: transparent;
}

.icon-tools {
  background: var(--color-amber-bg);
  border-color: transparent;
}

.skill-title {
  font-size: 0.98rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 2px;
}

.skill-badge {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.badge-frontend { color: var(--color-cyan); }
.badge-framework { color: var(--color-emerald); }
.badge-tools { color: var(--color-amber); }

.skill-percentage {
  font-size: 1.1rem;
  font-weight: 700;
  font-family: 'Outfit', sans-serif;
}

.pct-frontend { color: var(--color-cyan); }
.pct-framework { color: var(--color-emerald); }
.pct-tools { color: var(--color-amber); }

.progress-bar-bg {
  width: 100%;
  height: 7px;
  background: var(--border);
  border-radius: 999px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  border-radius: 999px;
  background: var(--accent);
  transition: width 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.fill-frontend { background: var(--color-cyan); }
.fill-framework { background: var(--color-emerald); }
.fill-tools { background: var(--color-amber); }

@media (max-width: 640px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
}
</style>
