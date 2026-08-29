<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const projects = [
  {
    id: 'wicara',
    title: 'WICARA – Campus Complaints & Service Rating',
    subtitle: 'Integrated Campus Reporting & Rating Ecosystem',
    category: 'web-mobile',
    description: 'An end-to-end digital ecosystem comprising a responsive Web Admin Panel and Flutter Mobile App for campus reporting, lost & found, and service ratings.',
    fullDescription: 'Developed through Project-Based Learning at Polines. Designed comprehensive information architecture, user flows, and high-fidelity Figma prototypes for both the Web Admin Panel and Mobile App. Implemented the responsive web frontend within the Laravel ecosystem and built the cross-platform mobile client using Flutter, maintaining strict design system fidelity and end-to-end Git version control.',
    features: [
      'Web Admin Panel (Laravel) & Mobile App (Flutter)',
      'Figma Information Architecture, User Flows & Hi-Fi Prototypes',
      'Lost & Found Reporting with Status Tracking',
      'Academic Service Rating & Feedback Analytics',
      'Pixel-perfect Design System Execution & Git Integration'
    ],
    tags: ['Figma', 'UI/UX Design', 'Laravel', 'Flutter', 'Git & GitHub'],
    icon: '📢',
    demoUrl: '',
    githubUrl: 'https://github.com/agungast'
  },
  {
    id: 'gudangku',
    title: 'GUDANGKU – Warehouse Management System',
    subtitle: 'Inventory Tracking & Real-Time Stock Dashboard',
    category: 'web-mobile',
    description: 'A centralized warehouse management web dashboard for real-time stock monitoring, inventory flow, and simplified operational data entry.',
    fullDescription: 'Engineered during Project-Based Learning at Polines. Designed intuitive user flows and high-fidelity dashboard UI in Figma, then executed the frontend implementation using Laravel. Optimized complex UI components including structured data tables, status KPI cards, and custom data filters to streamline daily warehouse workflows.',
    features: [
      'Real-time Inventory & Stock Level Tracking',
      'Figma Dashboard UI & Information Architecture',
      'Dynamic Data Tables, Status Cards & Advanced Filters',
      'Optimized UI Component Architecture for Rapid Entry',
      'Collaborative Git Repository & Branch Workflow'
    ],
    tags: ['Figma', 'UI/UX Design', 'Laravel', 'Blade', 'Git & GitHub'],
    icon: '📦',
    demoUrl: '',
    githubUrl: 'https://github.com/agungast'
  },
  {
    id: 'tanikita',
    title: 'TaniKita – Mobile App for Farmer Empowerment',
    subtitle: 'HIMI UNSURYA National UI/UX Design Competition 2025',
    category: 'uiux',
    description: 'A user-centered mobile app concept and interactive prototype designed to optimize agricultural supply chains and empower local farmers.',
    fullDescription: 'Crafted for the national UI/UX Design Competition HIMI UNSURYA (February 2025). Conducted in-depth user research, problem framing, and persona development tailored to agricultural supply chains and digital literacy levels. Created intuitive high-fidelity prototypes in Figma under tight competition deadlines from ideation to final deliverables.',
    features: [
      'User Research & Problem Framing for Agricultural Supply',
      'User Personas & Digital Literacy-Friendly Flows',
      'Interactive Figma High-Fidelity Prototype Simulation',
      'Supply Chain Efficiency & Logistics Architecture',
      'Rapid Prototyping under Competitive Deadlines'
    ],
    tags: ['Figma', 'UI/UX Design', 'User Research', 'Wireframing', 'Interactive Prototype'],
    icon: '🌱',
    demoUrl: '',
    githubUrl: 'https://github.com/agungast'
  }
]

const currentCategory = ref('all')
const selectedProject = ref(null)

const filteredProjects = computed(() => {
  if (currentCategory.value === 'all') return projects
  return projects.filter(p => p.category === currentCategory.value)
})

function openModal(project) {
  selectedProject.value = project
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  selectedProject.value = null
  document.body.style.overflow = ''
}

function handleKeydown(e) {
  if (e.key === 'Escape' && selectedProject.value) {
    closeModal()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <section id="projects" class="section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Crafted with Code &amp; Care</h2>
        <p class="section-subtitle">
          Explore a selection of recent web applications, UI prototypes, and client projects.
        </p>
      </div>

      <!-- Filter Tabs -->
      <div class="filter-tabs">
        <button
          class="tab-pill"
          :class="{ active: currentCategory === 'all' }"
          @click="currentCategory = 'all'"
        >
          All Projects ({{ projects.length }})
        </button>
        <button
          class="tab-pill"
          :class="{ active: currentCategory === 'web-mobile' }"
          @click="currentCategory = 'web-mobile'"
        >
          Web &amp; Mobile Systems
        </button>
        <button
          class="tab-pill"
          :class="{ active: currentCategory === 'uiux' }"
          @click="currentCategory = 'uiux'"
        >
          UI/UX Case Studies
        </button>
      </div>

      <!-- Projects Grid -->
      <div class="projects-grid">
        <article
          v-for="(project, index) in filteredProjects"
          :key="project.id"
          class="project-card card"
          v-reveal
          :style="{ transitionDelay: `${index * 100}ms` }"
          @click="openModal(project)"
        >
          <div class="project-thumb">
            <span class="project-icon">{{ project.icon }}</span>
            <div class="project-badge">{{ project.subtitle }}</div>
          </div>

          <div class="project-body">
            <div class="project-title-row">
              <h3 class="project-title">{{ project.title }}</h3>
              <span class="view-icon" aria-hidden="true">&rarr;</span>
            </div>
            <p class="project-desc">{{ project.description }}</p>

            <div class="tags-row">
              <span v-for="tag in project.tags" :key="tag" class="tag-chip">
                {{ tag }}
              </span>
            </div>

            <div class="project-footer">
              <button class="btn-detail-link" @click.stop="openModal(project)">
                View Case Details &rarr;
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>

    <!-- Project Detail Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="selectedProject"
          class="modal-backdrop"
          @click="closeModal"
        >
          <div
            class="modal-container card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-project-title"
            @click.stop
          >
            <button
              class="modal-close"
              aria-label="Close modal"
              @click="closeModal"
            >
              &times;
            </button>

            <div class="modal-banner">
              <span class="banner-icon">{{ selectedProject.icon }}</span>
              <div class="banner-info">
                <h2 id="modal-project-title">{{ selectedProject.title }}</h2>
                <p>{{ selectedProject.subtitle }}</p>
              </div>
            </div>

            <div class="modal-content">
              <div class="modal-section">
                <h4>About Project</h4>
                <p>{{ selectedProject.fullDescription }}</p>
              </div>

              <div class="modal-section">
                <h4>Key Features</h4>
                <ul class="features-list">
                  <li v-for="(feat, idx) in selectedProject.features" :key="idx">
                    <span class="check-icon">✓</span>
                    <span>{{ feat }}</span>
                  </li>
                </ul>
              </div>

              <div class="modal-section">
                <h4>Technologies &amp; Architecture</h4>
                <div class="tags-row modal-tags">
                  <span v-for="tag in selectedProject.tags" :key="tag" class="tag-chip">
                    {{ tag }}
                  </span>
                </div>
              </div>

              <div class="modal-actions">
                <a
                  v-if="selectedProject.demoUrl"
                  :href="selectedProject.demoUrl"
                  target="_blank"
                  rel="noopener"
                  class="btn btn-primary"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  Live Preview
                </a>
                <a
                  v-if="selectedProject.githubUrl"
                  :href="selectedProject.githubUrl"
                  target="_blank"
                  rel="noopener"
                  class="btn btn-outline"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                  Source Code
                </a>
                <button class="btn btn-ghost" @click="closeModal">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
.filter-tabs {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 46px;
}

.tab-pill {
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

.tab-pill:hover {
  color: var(--text);
  border-color: var(--border-light);
}

.tab-pill.active {
  background: var(--accent);
  color: var(--btn-primary-text);
  border-color: var(--accent);
  font-weight: 700;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

.project-card {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  background: var(--card);
  border: 1px solid var(--border);
  position: relative;
}

.project-card:hover {
  transform: translateY(-4px);
}

.project-thumb {
  height: 150px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: var(--bg-soft);
  border-bottom: 1px solid var(--border);
}

.project-icon {
  font-size: 3rem;
  transition: transform 0.25s ease;
}

.project-card:hover .project-icon {
  transform: scale(1.1) translateY(-2px);
}

.project-badge {
  position: absolute;
  bottom: 12px;
  left: 16px;
  background: var(--card);
  color: var(--text-secondary);
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 999px;
  border: 1px solid var(--border);
}

.project-body {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
}

.project-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.project-title {
  font-size: 1.15rem;
  font-weight: 700;
}

.view-icon {
  color: var(--text-secondary);
  font-size: 1.1rem;
  transition: transform 0.2s ease, color 0.2s ease;
}

.project-card:hover .view-icon {
  color: var(--text);
  transform: translateX(4px);
}

.project-desc {
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.6;
  flex: 1;
}

.tags-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 6px;
}

.tag-chip {
  font-size: 0.78rem;
  font-weight: 500;
  padding: 4px 10px;
  border-radius: 6px;
  background: var(--card);
  color: var(--text-secondary);
  border: 1px solid var(--border);
}

.project-footer {
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid var(--border);
}

.btn-detail-link {
  background: none;
  border: none;
  color: var(--text);
  font-family: inherit;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: color 0.2s ease;
}

.btn-detail-link:hover {
  color: var(--text);
  text-decoration: underline;
}

/* Modal styles */
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9990;
  background: var(--modal-backdrop);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-container {
  width: 100%;
  max-width: 620px;
  max-height: 90vh;
  overflow-y: auto;
  background: var(--modal-bg);
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-card-hover);
  position: relative;
  padding: 0;
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 18px;
  background: var(--btn-outline-bg);
  border: 1px solid var(--border);
  color: var(--text);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 10;
  transition: all 0.2s ease;
}

.modal-close:hover {
  background: var(--card-hover);
  border-color: var(--border-light);
  color: var(--text);
}

.modal-banner {
  padding: 32px 30px;
  display: flex;
  align-items: center;
  gap: 20px;
  background: var(--bg-soft);
  border-bottom: 1px solid var(--border);
}

.banner-icon {
  font-size: 3rem;
}

.banner-info h2 {
  font-size: 1.5rem;
  margin-bottom: 4px;
  color: var(--text);
}

.banner-info p {
  color: var(--muted);
  font-weight: 500;
  font-size: 0.92rem;
}

.modal-content {
  padding: 28px 30px;
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.modal-section h4 {
  font-size: 1rem;
  color: var(--accent);
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.modal-section p {
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.7;
}

.features-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.features-list li {
  display: flex;
  gap: 10px;
  align-items: baseline;
  font-size: 0.92rem;
  color: var(--text-secondary);
}

.check-icon {
  color: var(--accent);
  font-weight: bold;
}

.modal-tags {
  margin-top: 4px;
}

.modal-actions {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  padding-top: 14px;
  border-top: 1px solid var(--border);
}

/* Modal transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-enter-from .modal-container {
  transform: scale(0.9) translateY(20px);
}

.modal-leave-to .modal-container {
  transform: scale(0.9) translateY(20px);
}
</style>
