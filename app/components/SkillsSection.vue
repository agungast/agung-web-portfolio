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
  { name: 'HTML5 & CSS3', level: 95, category: 'frontend', icon: 'logos:html-5', experience: 'Advanced' },
  { name: 'JavaScript (ES6+)', level: 88, category: 'frontend', icon: 'logos:javascript', experience: 'Advanced' },
  { name: 'TypeScript', level: 80, category: 'frontend', icon: 'logos:typescript-icon', experience: 'Intermediate' },
  { name: 'Vue.js 3', level: 85, category: 'framework', icon: 'logos:vue', experience: 'Advanced' },
  { name: 'Nuxt 3', level: 82, category: 'framework', icon: 'logos:nuxt-icon', experience: 'Advanced' },
  { name: 'Tailwind CSS', level: 90, category: 'frontend', icon: 'logos:tailwindcss-icon', experience: 'Advanced' },
  { name: 'Pinia / State Management', level: 80, category: 'framework', icon: 'logos:pinia', experience: 'Intermediate' },
  { name: 'REST APIs & Fetch', level: 85, category: 'tools', icon: 'mdi:api', experience: 'Advanced' },
  { name: 'Git & GitHub', level: 82, category: 'tools', icon: 'mdi:github', experience: 'Advanced' },
  { name: 'Node.js Basics', level: 68, category: 'tools', icon: 'logos:nodejs-icon', experience: 'Intermediate' },
  { name: 'Firebase / Supabase', level: 75, category: 'tools', icon: 'logos:firebase', experience: 'Intermediate' },
  { name: 'Responsive Web Design', level: 92, category: 'frontend', icon: 'ph:devices-fill', experience: 'Advanced' }
]

const selectedCategory = ref<'all' | 'frontend' | 'framework' | 'tools'>('all')
const isVisible = ref(false)

const filteredSkills = computed(() => {
  if (selectedCategory.value === 'all') return skills
  return skills.filter(s => s.category === selectedCategory.value)
})
</script>

<template>
  <section id="skills" class="section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Skills &amp; Expertise</h2>
        <p class="section-subtitle">
          Core technologies, modern frameworks, and tools I use to build scalable web applications.
        </p>
      </div>

      <!-- Filter Category Buttons -->
      <div class="category-filters" v-reveal>
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
          @click="selectedCategory === 'framework'"
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
          v-reveal
          :style="{ transitionDelay: `${index * 30}ms` }"
        >
          <div class="skill-header">
            <div class="skill-info">
              <div class="skill-icon">
                <Icon :name="skill.icon" />
              </div>
              <div>
                <h3 class="skill-title">{{ skill.name }}</h3>
                <span class="skill-badge">{{ skill.experience }}</span>
              </div>
            </div>
            <span class="skill-percentage">{{ skill.level }}%</span>
          </div>

          <div class="progress-bar-bg" aria-hidden="true">
            <div
              class="progress-bar-fill"
              :style="{ transform: `scaleX(${skill.level / 100})` }"
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
  color: var(--btn-primary-text);
  border-color: var(--accent);
  font-weight: 700;
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
  perspective: 1000px;
}

.skill-card:hover .skill-icon {
  transform: translateZ(12px) scale(1.08) rotate(-4deg);
  border-color: var(--accent);
  box-shadow: inset 0 2px 4px rgba(255,255,255,0.1),
              0 8px 16px rgba(0,0,0,0.25);
}

.skill-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.skill-info {
  display: flex;
  align-items: center;
  gap: 14px;
}

.skill-icon {
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: var(--card-hover);
  border: 1px solid var(--border-light);
  box-shadow: inset 0 2px 4px rgba(255,255,255,0.04),
              0 4px 10px rgba(0,0,0,0.12);
  color: var(--brand-cyan-text); /* Fallback for monochrome icons */
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform-style: preserve-3d;
}

.skill-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 2px;
}

.skill-badge {
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--muted);
}

.skill-percentage {
  font-size: 1.05rem;
  font-weight: 700;
  font-family: var(--font-heading);
  color: var(--text);
}

.progress-bar-bg {
  width: 100%;
  height: 7px;
  background: var(--border);
  border-radius: 999px;
  overflow: hidden;
}

.progress-bar-fill {
  width: 100%;
  height: 100%;
  border-radius: 999px;
  background: var(--accent);
  transform-origin: left center;
  transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}

@media (max-width: 640px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
}
</style>
