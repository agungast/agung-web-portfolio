<script setup>
import { skills } from '../data/skills'
</script>

<template>
  <section id="skills" class="section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Tools & Technologies</h2>
        <p class="section-subtitle">
          Core applications, frameworks, and technologies I utilize to design and develop digital products.
        </p>
      </div>

      <!-- Unified Skills Grid -->
      <div class="skills-grid">
        <div
          v-for="(skill, index) in skills"
          :key="skill.name"
          class="skill-item card"
          v-reveal
          :style="{ transitionDelay: `${index * 25}ms` }"
        >
          <div class="skill-icon-wrap">
            <img
              v-if="skill.image"
              :src="skill.image"
              :alt="skill.name"
              class="skill-icon-img"
            />
            <Icon
              v-else
              :name="skill.icon"
              width="46"
              height="46"
              class="skill-icon-img"
            />
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
  width: 54px;
  height: 54px;
  border-radius: 12px;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
}

.skill-item:hover .skill-icon-wrap {
  border-color: var(--border-light);
  transform: scale(1.06);
  background: var(--card-hover);
}

/* Iconify merender <span> dengan background-image SVG, bukan <svg> langsung */
.skill-icon-wrap :deep(span.iconify) {
  display: block !important;
  width: 46px !important;
  height: 46px !important;
  background-size: 100% 100% !important;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Custom images: ukuran sama */
.skill-icon-wrap :deep(img) {
  display: block;
  width: 46px;
  height: 46px;
  object-fit: contain;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
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
    width: 48px;
    height: 48px;
  }

  .skill-icon-wrap :deep(span.iconify) {
    width: 38px !important;
    height: 38px !important;
  }

  .skill-icon-wrap :deep(img) {
    width: 38px;
    height: 38px;
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