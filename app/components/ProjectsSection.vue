<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { projects } from '../data/projects'

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
          <!-- Thumbnail: gambar jika ada, fallback ke icon -->
          <div class="project-thumb">
            <img
              v-if="project.image"
              :src="project.image"
              :alt="project.title"
              class="project-thumb-img"
            />
            <span v-else class="project-icon">
              <Icon :name="project.icon" />
            </span>
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

            <!-- Modal Banner: gambar jika ada, fallback ke icon -->
            <div class="modal-banner">
              <img
                v-if="selectedProject.image"
                :src="selectedProject.image"
                :alt="selectedProject.title"
                class="modal-banner-img"
              />
              <template v-else>
                <span class="banner-icon"><Icon :name="selectedProject.icon" /></span>
              </template>
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
                    <span class="check-icon">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
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
                <!-- GitHub repo links -->
                <template v-if="selectedProject.githubLinks && selectedProject.githubLinks.length">
                  <a
                    v-for="link in selectedProject.githubLinks"
                    :key="link.label"
                    :href="link.url"
                    target="_blank"
                    rel="noopener"
                    class="btn btn-outline"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                    {{ link.label }}
                  </a>
                </template>
                <!-- Fallback: single githubUrl lama -->
                <a
                  v-else-if="selectedProject.githubUrl"
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

                <!-- Figma prototype links -->
                <template v-if="selectedProject.figmaLinks && selectedProject.figmaLinks.length">
                  <a
                    v-for="link in selectedProject.figmaLinks"
                    :key="link.label"
                    :href="link.url"
                    target="_blank"
                    rel="noopener"
                    class="btn btn-figma"
                  >
                    <!-- Figma icon -->
                    <svg width="18" height="18" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 28.5C19 25.9804 20.0009 23.5641 21.7825 21.7825C23.5641 20.0009 25.9804 19 28.5 19C31.0196 19 33.4359 20.0009 35.2175 21.7825C36.9991 23.5641 38 25.9804 38 28.5C38 31.0196 36.9991 33.4359 35.2175 35.2175C33.4359 36.9991 31.0196 38 28.5 38C25.9804 38 23.5641 36.9991 21.7825 35.2175C20.0009 33.4359 19 31.0196 19 28.5Z" fill="#1ABCFE"/>
                      <path d="M0 47.5C0 44.9804 1.00089 42.5641 2.78249 40.7825C4.56408 39.0009 6.98044 38 9.5 38H19V47.5C19 50.0196 17.9991 52.4359 16.2175 54.2175C14.4359 55.9991 12.0196 57 9.5 57C6.98044 57 4.56408 55.9991 2.78249 54.2175C1.00089 52.4359 0 50.0196 0 47.5Z" fill="#0ACF83"/>
                      <path d="M19 0V19H28.5C31.0196 19 33.4359 17.9991 35.2175 16.2175C36.9991 14.4359 38 12.0196 38 9.5C38 6.98044 36.9991 4.56408 35.2175 2.78249C33.4359 1.00089 31.0196 0 28.5 0H19Z" fill="#FF7262"/>
                      <path d="M0 9.5C0 12.0196 1.00089 14.4359 2.78249 16.2175C4.56408 17.9991 6.98044 19 9.5 19H19V0H9.5C6.98044 0 4.56408 1.00089 2.78249 2.78249C1.00089 4.56408 0 6.98044 0 9.5Z" fill="#F24E1E"/>
                      <path d="M0 28.5C0 31.0196 1.00089 33.4359 2.78249 35.2175C4.56408 36.9991 6.98044 38 9.5 38H19V19H9.5C6.98044 19 4.56408 20.0009 2.78249 21.7825C1.00089 23.5641 0 25.9804 0 28.5Z" fill="#A259FF"/>
                    </svg>
                    {{ link.label }}
                  </a>
                </template>

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

/* Thumbnail area */
.project-thumb {
  height: 180px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: var(--bg-soft);
  border-bottom: 1px solid var(--border);
}

/* Gambar thumbnail — cover penuh area */
.project-thumb-img {
  width: 100%;
  height: 150%;
  object-fit: cover;
  object-position: center top;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.project-card:hover .project-thumb-img {
  transform: scale(1.04);
}

/* Icon fallback */
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
  left: 50%;
  transform: translateX(-50%);
  background: var(--card);
  color: var(--text-secondary);
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 999px;
  border: 1px solid var(--border);
  /* Pastikan badge selalu di atas gambar */
  z-index: 1;
  backdrop-filter: blur(4px);
  white-space: nowrap;
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

/* ── Modal ── */
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

/* Banner: icon mode */
.modal-banner {
  padding: 32px 30px;
  display: flex;
  align-items: center;
  gap: 20px;
  background: var(--bg-soft);
  border-bottom: 1px solid var(--border);
}

/* Banner: gambar mode — full-width header image */
.modal-banner-img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  object-position: center top;
  display: block;
  border-bottom: 1px solid var(--border);
}

/* Ketika ada gambar, banner-info ditampilkan di bawah gambar */
.modal-banner:has(.modal-banner-img) {
  padding: 0;
  flex-direction: column;
  align-items: stretch;
  gap: 0;
}

.modal-banner:has(.modal-banner-img) .banner-info {
  padding: 20px 30px;
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

/* Figma button */
.btn-figma {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--btn-outline-bg, transparent);
  color: var(--text);
  font-family: inherit;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-figma:hover {
  border-color: #A259FF;
  background: rgba(162, 89, 255, 0.08);
  color: var(--text);
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
