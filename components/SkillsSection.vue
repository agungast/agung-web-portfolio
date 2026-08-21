<script setup lang="ts">
const skills = [
  { name: 'HTML & CSS', level: 90 },
  { name: 'JavaScript', level: 80 },
  { name: 'Vue.js', level: 75 },
  { name: 'Nuxt', level: 70 },
  { name: 'Tailwind CSS', level: 70 },
  { name: 'Git & GitHub', level: 65 }
]
</script>

<template>
  <section id="keahlian" class="section">
    <div class="container">
      <h2 class="section-title">Keahlian <span>Saya</span></h2>
      <p class="section-subtitle">Teknologi yang saya gunakan sehari-hari.</p>

      <div class="skills-grid">
        <div v-for="skill in skills" :key="skill.name" class="skill">
          <div class="skill-head">
            <span>{{ skill.name }}</span>
            <span class="level">{{ skill.level }}%</span>
          </div>
          <div class="bar">
            <div class="fill" :style="{ width: skill.level + '%' }" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 28px 48px;
}

.skill-head {
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  margin-bottom: 8px;
}

.level {
  color: var(--accent);
}

.bar {
  height: 8px;
  border-radius: 999px;
  background: var(--card);
  border: 1px solid var(--border);
  overflow: hidden;
}

.fill {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
}
</style>
