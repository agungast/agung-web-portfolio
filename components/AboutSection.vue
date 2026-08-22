<script setup lang="ts">
import { ref, onMounted } from 'vue'

const activeTab = ref<'story' | 'education' | 'experience'>('story')

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

onMounted(() => {
  const section = document.getElementById('about')
  if (!section) return

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        animateStats()
        observer.disconnect()
      }
    },
    { threshold: 0.2 }
  )

  observer.observe(section)
})
</script>

<template>
  <section id="about" class="section">
    <div class="container">
      <div class="section-header">
        <span class="section-badge">About Me</span>
        <h2 class="section-title">Turning Ideas into <span>Digital Reality</span></h2>
        <p class="section-subtitle">
          Get to know my journey, academic background, and passion for creating exceptional digital experiences.
        </p>
      </div>

      <div class="about-grid">
        <!-- Left column: Interactive Tabs -->
        <div class="about-left">
          <div class="tabs-nav">
            <button
              class="tab-btn"
              :class="{ active: activeTab === 'story' }"
              @click="activeTab = 'story'"
            >
              My Story
            </button>
            <button
              class="tab-btn"
              :class="{ active: activeTab === 'education' }"
              @click="activeTab = 'education'"
            >
              Education
            </button>
            <button
              class="tab-btn"
              :class="{ active: activeTab === 'experience' }"
              @click="activeTab = 'experience'"
            >
              Experience
            </button>
          </div>

          <div class="tab-content card">
            <!-- Story Tab -->
            <div v-if="activeTab === 'story'" class="tab-pane">
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

            <!-- Education Tab -->
            <div v-else-if="activeTab === 'education'" class="tab-pane">
              <div class="timeline">
                <div class="timeline-item">
                  <div class="timeline-marker" />
                  <div class="timeline-content">
                    <span class="timeline-date">2021 &mdash; Present</span>
                    <h4>Bachelor of Computer Science / Informatics</h4>
                    <p class="timeline-sub">Semester 7 Student</p>
                    <p>Focusing on Software Engineering, Web Development, Algorithms, and UI/UX Design.</p>
                  </div>
                </div>
                <div class="timeline-item">
                  <div class="timeline-marker" />
                  <div class="timeline-content">
                    <span class="timeline-date">Continuous Learning</span>
                    <h4>Modern Web &amp; Vue Ecosystem Certification</h4>
                    <p class="timeline-sub">Online Coursework &amp; Self-directed Projects</p>
                    <p>Deep-diving into Nuxt 3, Pinia state management, TypeScript, and modern CSS architecture.</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Experience Tab -->
            <div v-else-if="activeTab === 'experience'" class="tab-pane">
              <div class="timeline">
                <div class="timeline-item">
                  <div class="timeline-marker" />
                  <div class="timeline-content">
                    <span class="timeline-date">2023 &mdash; Present</span>
                    <h4>Freelance Web Developer</h4>
                    <p class="timeline-sub">Independent Projects</p>
                    <p>Developed custom landing pages, POS management dashboards, and responsive web portals for small business clients.</p>
                  </div>
                </div>
                <div class="timeline-item">
                  <div class="timeline-marker" />
                  <div class="timeline-content">
                    <span class="timeline-date">Academic Projects</span>
                    <h4>Frontend Lead &amp; Developer</h4>
                    <p class="timeline-sub">University Team Projects</p>
                    <p>Led UI architecture, component structure, and state management for campus development assignments.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right column: Animated Stats Counters & Highlights -->
        <div class="about-right">
          <div class="stats-grid">
            <div
              v-for="(stat, index) in stats"
              :key="stat.label"
              class="stat-card card"
            >
              <div class="stat-number">
                <span>{{ animatedValues[index] }}</span>{{ stat.suffix }}
              </div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
          </div>

          <div class="highlight-box card">
            <div class="highlight-icon">💡</div>
            <div>
              <h4>Looking for collaboration?</h4>
              <p>I am open to internship, full-time junior frontend roles, or freelance projects.</p>
              <a href="#contact" class="highlight-link">Let's connect &rarr;</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-grid {
  display: grid;
  grid-template-columns: 1.25fr 0.75fr;
  gap: 36px;
  align-items: start;
}

.tabs-nav {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
  border-bottom: 1px solid var(--border);
  padding-bottom: 12px;
}

.tab-btn {
  background: transparent;
  border: 1px solid transparent;
  color: var(--muted);
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 600;
  padding: 8px 18px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab-btn:hover {
  color: var(--text);
  background: rgba(255, 255, 255, 0.05);
}

.tab-btn.active {
  background: rgba(56, 189, 248, 0.12);
  border-color: rgba(56, 189, 248, 0.3);
  color: var(--accent);
}

.tab-content {
  padding: 32px;
  background: rgba(21, 28, 44, 0.7);
  backdrop-filter: blur(12px);
  min-height: 340px;
}

.tab-pane h3 {
  font-size: 1.35rem;
  margin-bottom: 16px;
  color: var(--text);
}

.tab-pane p {
  color: var(--text-secondary);
  font-size: 0.98rem;
  margin-bottom: 16px;
  line-height: 1.7;
}

.traits {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 24px;
}

.trait {
  background: rgba(35, 48, 74, 0.5);
  border: 1px solid var(--border);
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--accent);
  transition: all 0.2s ease;
}

.trait:hover {
  background: rgba(56, 189, 248, 0.15);
  border-color: var(--accent);
  transform: translateY(-2px);
}

/* Timeline */
.timeline {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.timeline-item {
  display: flex;
  gap: 16px;
  position: relative;
}

.timeline-item:not(:last-child)::before {
  content: '';
  position: absolute;
  left: 6px;
  top: 20px;
  bottom: -20px;
  width: 2px;
  background: var(--border);
}

.timeline-marker {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--accent);
  margin-top: 4px;
  flex-shrink: 0;
  box-shadow: 0 0 10px var(--accent);
}

.timeline-content {
  flex: 1;
}

.timeline-date {
  display: inline-block;
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 4px;
}

.timeline-content h4 {
  font-size: 1.05rem;
  margin-bottom: 4px;
}

.timeline-sub {
  color: var(--muted) !important;
  font-size: 0.88rem !important;
  font-weight: 500;
  margin-bottom: 6px !important;
}

/* Stats */
.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
}

.stat-card {
  padding: 24px 20px;
  text-align: center;
  background: rgba(21, 28, 44, 0.7);
  backdrop-filter: blur(12px);
}

.stat-number {
  font-size: clamp(2rem, 3.5vw, 2.6rem);
  font-weight: 800;
  font-family: 'Outfit', sans-serif;
  color: var(--accent);
  line-height: 1;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 0.85rem;
  color: var(--muted);
  font-weight: 500;
}

.highlight-box {
  padding: 22px;
  display: flex;
  gap: 16px;
  align-items: flex-start;
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.08), rgba(129, 140, 248, 0.08));
  border-color: rgba(56, 189, 248, 0.2);
}

.highlight-icon {
  font-size: 1.6rem;
}

.highlight-box h4 {
  font-size: 1rem;
  margin-bottom: 4px;
}

.highlight-box p {
  font-size: 0.88rem;
  color: var(--muted);
  margin-bottom: 8px;
}

.highlight-link {
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--accent);
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.highlight-link:hover {
  text-decoration: underline;
}

@media (max-width: 860px) {
  .about-grid {
    grid-template-columns: 1fr;
  }
}
</style>
