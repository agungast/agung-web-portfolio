<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const stats = [
  { value: 12, suffix: '+', label: 'Projects Built' },
  { value: 2, suffix: '+', label: 'Years Experience' },
  { value: 15, suffix: '+', label: 'Tech & Tools' },
  { value: 100, suffix: '%', label: 'Dedication' }
]

const animatedValues = ref(stats.map(() => 0))
let animated = false

function animateStats() {
  if (animated) return
  animated = true

  stats.forEach((stat, index) => {
    const duration = 1500
    const frameDuration = 1000 / 60
    const totalFrames = Math.round(duration / frameDuration)
    let frame = 0

    const timer = setInterval(() => {
      frame++
      const progress = frame / totalFrames
      const current = Math.round(stat.value * progress)
      animatedValues.value[index] = current

      if (frame === totalFrames) {
        animatedValues.value[index] = stat.value
        clearInterval(timer)
      }
    }, frameDuration)
  })
}

// Live clock
const currentTime = ref('')
const currentDate = ref('')
let clockInterval: ReturnType<typeof setInterval> | null = null

function updateClock() {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })
  currentDate.value = now.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

onMounted(() => {
  const section = document.getElementById('about')
  if (!section) return

  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]
      if (entry?.isIntersecting) {
        animateStats()
        observer.disconnect()
      }
    },
    { threshold: 0.2 }
  )

  observer.observe(section)

  // Start clock
  updateClock()
  clockInterval = setInterval(updateClock, 1000)
})

onUnmounted(() => {
  if (clockInterval) clearInterval(clockInterval)
})
</script>

<template>
  <section id="about" class="section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Turning Ideas into Digital Reality</h2>
        <p class="section-subtitle">
          Get to know my journey, academic background, and passion for creating exceptional digital experiences.
        </p>
      </div>

      <!-- Asymmetric Bento Grid -->
      <div class="bento-grid">
        <!-- Row 1: Story (wide) + Stats (narrow) -->
        <div class="bento-cell cell-story" v-reveal>
          <span class="cell-label">My Story</span>
          <h3>Passionate Frontend Developer</h3>
          <p>
            I am an Informatics student with a relentless drive for building clean, performant, and intuitive user interfaces. I bridge the gap between design and robust frontend engineering.
          </p>
          <p>
            My journey began with HTML/CSS and evolved into building modern reactive web applications using Vue 3, Nuxt 3, and TypeScript. I love exploring interactive UI animations and clean architecture.
          </p>
          <div class="traits">
            <span class="trait">🚀 Clean Code</span>
            <span class="trait">🎨 Pixel-Perfect UI</span>
            <span class="trait">⚡ Fast Performance</span>
            <span class="trait">📱 Fully Responsive</span>
          </div>
        </div>

        <div class="bento-cell cell-stats" v-reveal>
          <span class="cell-label">Numbers</span>
          <div class="stats-inner">
            <div
              v-for="(stat, index) in stats"
              :key="stat.label"
              class="stat-item"
            >
              <div class="stat-number">
                <span>{{ animatedValues[index] }}</span>{{ stat.suffix }}
              </div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
          </div>
        </div>

        <!-- Row 2: Education + Experience + CTA -->
        <div class="bento-cell cell-edu" v-reveal>
          <span class="cell-label">Education</span>
          <div class="timeline">
            <div class="timeline-entry">
              <span class="timeline-date">2023 &mdash; Present</span>
              <h4>Bachelor of Informatics</h4>
              <p class="timeline-sub">Semester 7 Student</p>
              <p>Focusing on Software Engineering, Web Development, and UI/UX Design.</p>
            </div>
            <div class="timeline-divider"></div>
            <div class="timeline-entry">
              <span class="timeline-date">Continuous Learning</span>
              <h4>Modern Web Certification</h4>
              <p class="timeline-sub">Self-directed Projects</p>
              <p>Deep-diving into Nuxt 3, Pinia, TypeScript, and modern CSS architecture.</p>
            </div>
          </div>
        </div>

        <div class="bento-cell cell-exp" v-reveal>
          <span class="cell-label">Experience</span>
          <div class="timeline">
            <div class="timeline-entry">
              <span class="timeline-date">2023 &mdash; Present</span>
              <h4>Freelance Web Developer</h4>
              <p class="timeline-sub">Independent Projects</p>
              <p>Developed landing pages, POS dashboards, and responsive web portals for clients.</p>
            </div>
            <div class="timeline-divider"></div>
            <div class="timeline-entry">
              <span class="timeline-date">Academic Projects</span>
              <h4>Frontend Lead</h4>
              <p class="timeline-sub">University Team Projects</p>
              <p>Led UI architecture and state management for campus assignments.</p>
            </div>
          </div>
        </div>

        <div class="bento-cell cell-cta" v-reveal>
          <div class="cta-inner">
            <span class="cta-emoji">💡</span>
            <h4>Looking for collaboration?</h4>
            <p>I am open to internship, full-time junior frontend roles, or freelance projects.</p>
            <a href="#contact" class="cta-link">Let's connect &rarr;</a>
          </div>
        </div>

        <!-- Row 3: Clock -->
        <div class="bento-cell cell-clock" v-reveal>
          <span class="cell-label">Local Time</span>
          <div class="clock-display">
            <span class="clock-time">{{ currentTime }}</span>
          </div>
          <span class="clock-date">{{ currentDate }}</span>
          <span class="clock-location">Indonesia 🇮🇩</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Bento Grid Layout - Asymmetric */
.bento-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto auto;
  gap: 16px;
}

/* Cell placements */
.cell-story {
  grid-column: 1 / 3; /* spans 2 cols */
  grid-row: 1;
}

.cell-stats {
  grid-column: 3;
  grid-row: 1;
}

.cell-edu {
  grid-column: 1;
  grid-row: 2;
}

.cell-exp {
  grid-column: 2;
  grid-row: 2;
}

.cell-cta {
  grid-column: 3;
  grid-row: 2;
  display: flex;
  align-items: center;
}

.cell-clock {
  grid-column: 1 / 4; /* full width */
  grid-row: 3;
  text-align: center;
  padding: 20px 28px;
}

/* Cell Label (Overline) */
.cell-label {
  display: block;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--brand-cyan-text);
  margin-bottom: 16px;
}

/* Story Cell */
.cell-story h3 {
  font-size: 1.35rem;
  margin-bottom: 14px;
  color: var(--text);
}

.cell-story p {
  color: var(--text-secondary);
  font-size: 0.95rem;
  margin-bottom: 12px;
  line-height: 1.7;
}

.traits {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
}

.trait {
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  transition: border-color 150ms ease-out, color 150ms ease-out;
}

.trait:hover {
  border-color: var(--brand-cyan-text);
  color: var(--text);
}

/* Stats Cell */
.stats-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: clamp(1.8rem, 3vw, 2.4rem);
  font-weight: 800;
  font-family: var(--font-heading);
  color: var(--text);
  line-height: 1;
  margin-bottom: 6px;
}

.stat-label {
  font-size: 0.8rem;
  color: var(--muted);
  font-weight: 500;
}

/* Timeline (Education & Experience) */
.timeline {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.timeline-entry {
  padding: 4px 0;
}

.timeline-divider {
  height: 1px;
  background: var(--border);
  margin: 16px 0;
}

.timeline-date {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 6px;
  color: var(--brand-cyan-text);
}

.timeline-entry h4 {
  font-size: 1rem;
  margin-bottom: 4px;
}

.timeline-sub {
  color: var(--muted);
  font-size: 0.85rem;
  font-weight: 500;
  margin-bottom: 6px;
}

.timeline-entry p:last-child {
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.6;
}

/* CTA Cell */
.cta-inner {
  text-align: center;
}

.cta-emoji {
  font-size: 2rem;
  display: block;
  margin-bottom: 12px;
}

.cta-inner h4 {
  font-size: 1.05rem;
  margin-bottom: 8px;
}

.cta-inner p {
  font-size: 0.88rem;
  color: var(--muted);
  margin-bottom: 14px;
  line-height: 1.6;
}

.cta-link {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--brand-cyan-text);
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: opacity 150ms ease-out;
}

.cta-link:hover {
  opacity: 0.8;
  text-decoration: underline;
}

/* Clock Cell */
.clock-display {
  margin-bottom: 8px;
}

.clock-time {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--text);
  font-variant-numeric: tabular-nums;
}

.clock-date {
  display: block;
  font-size: 0.88rem;
  color: var(--text-secondary);
  margin-bottom: 4px;
}

.clock-location {
  font-size: 0.8rem;
  color: var(--muted);
}

/* Responsive */
@media (max-width: 860px) {
  .bento-grid {
    grid-template-columns: 1fr;
  }

  .cell-story,
  .cell-stats,
  .cell-edu,
  .cell-exp,
  .cell-cta,
  .cell-clock {
    grid-column: 1;
    grid-row: auto;
  }
}

@media (min-width: 861px) and (max-width: 1024px) {
  .bento-grid {
    grid-template-columns: 1fr 1fr;
  }

  .cell-story {
    grid-column: 1 / 3;
  }

  .cell-clock {
    grid-column: 1 / 3;
  }

  .cell-cta {
    grid-column: auto;
  }
}
</style>
