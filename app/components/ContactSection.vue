<script setup>
import { ref, reactive } from 'vue'
import { useToast } from '../composables/useToast'

const { showToast } = useToast()

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const sent = ref(false)

function submit() {
  if (!form.name || !form.email || !form.message) {
    showToast('Please fill in all required fields.', 'warning')
    return
  }

  isSubmitting.value = true

  // Simulate network request
  setTimeout(() => {
    isSubmitting.value = false
    sent.value = true
    showToast('Message sent successfully! I will reply soon.', 'success')
  }, 1200)
}

function resetForm() {
  sent.value = false
  form.name = ''
  form.email = ''
  form.subject = ''
  form.message = ''
}

function copyEmail() {
  const email = 'agung.astanto14@gmail.com'
  if (navigator.clipboard) {
    navigator.clipboard.writeText(email).then(() => {
      showToast('Email address copied to clipboard!', 'success')
    })
  } else {
    showToast(`Email: ${email}`, 'info')
  }
}
</script>

<template>
  <section id="contact" class="section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Let's Work Together</h2>
        <p class="section-subtitle">
          Have an exciting project in mind, an opportunity, or simply want to chat? Drop me a message!
        </p>
      </div>

      <div class="contact-grid">
        <!-- Contact Information & Quick Channels -->
        <div class="contact-info">
          <div class="info-card card">
            <h3>Contact Details</h3>
            <p class="info-desc">
              Feel free to reach out via email or connect with me directly across my social platforms.
            </p>

            <div class="contact-channels">
              <div class="channel-item" @click="copyEmail">
                <div class="channel-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div class="channel-text">
                  <span class="channel-label">Email (Click to copy)</span>
                  <span class="channel-val">agung.astanto14@gmail.com</span>
                </div>
              </div>

              <div class="channel-item">
                <div class="channel-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div class="channel-text">
                  <span class="channel-label">Location</span>
                  <span class="channel-val">Semarang, Central Java, Indonesia</span>
                </div>
              </div>

              <div class="channel-item">
                <div class="channel-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div class="channel-text">
                  <span class="channel-label">Response Time</span>
                  <span class="channel-val">&lt; 24 Hours</span>
                </div>
              </div>
            </div>

            <div class="social-links">
              <a
                href="https://github.com/agungast"
                target="_blank"
                rel="noopener"
                class="social-btn"
                aria-label="GitHub"
              >
                GitHub &rarr;
              </a>
              <a
                href="https://www.linkedin.com/in/agunghadiastanto/"
                target="_blank"
                rel="noopener"
                class="social-btn"
                aria-label="LinkedIn"
              >
                LinkedIn &rarr;
              </a>
            </div>
          </div>
        </div>

        <!-- Interactive Contact Form -->
        <div class="contact-form-container" v-reveal :style="{ transitionDelay: '200ms' }">
          <form
            v-if="!sent"
            class="card contact-form"
            @submit.prevent="submit"
          >
            <div class="form-row">
              <div class="form-group">
                <label for="name">Your Name <span class="req">*</span></label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  placeholder="e.g. Jane Doe"
                >
              </div>

              <div class="form-group">
                <label for="email">Your Email <span class="req">*</span></label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="e.g. jane@example.com"
                >
              </div>
            </div>

            <div class="form-group">
              <label for="subject">Subject</label>
              <input
                id="subject"
                v-model="form.subject"
                type="text"
                placeholder="Project Inquiry / Job Opportunity"
              >
            </div>

            <div class="form-group">
              <label for="message">Message <span class="req">*</span></label>
              <textarea
                id="message"
                v-model="form.message"
                rows="5"
                required
                placeholder="Tell me about your project, goals, or timeline..."
              />
            </div>

            <button
              type="submit"
              class="btn btn-primary submit-btn"
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting" class="spinner" />
              <span v-if="isSubmitting">Sending Message...</span>
              <span v-else>Send Message &rarr;</span>
            </button>
          </form>

          <!-- Success Feedback View -->
          <div v-else class="card success-card">
            <div class="success-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h3>Thank You!</h3>
            <p>Your message has been received. I will get back to you as soon as possible.</p>
            <button class="btn btn-outline" @click="resetForm">
              Send Another Message
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.35fr;
  gap: 36px;
  align-items: start;
}

.info-card {
  padding: 36px;
  background: var(--card);
  backdrop-filter: blur(12px);
}

.info-card h3 {
  font-size: 1.4rem;
  margin-bottom: 12px;
}

.info-desc {
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 28px;
}

.contact-channels {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
}

.channel-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 16px;
  border-radius: 12px;
  background: var(--chip-bg);
  border: 1px solid var(--border);
  cursor: pointer;
  transition: all 0.2s ease;
}

.channel-item:hover {
  background: var(--chip-bg);
  border-color: var(--accent);
  transform: translateX(4px);
}

.channel-icon {
  font-size: 1.35rem;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  flex-shrink: 0;
  background: var(--chip-bg);
  border: 1px solid var(--border);
}

.channel-text {
  display: flex;
  flex-direction: column;
}

.channel-label {
  font-size: 0.78rem;
  color: var(--muted);
  font-weight: 600;
  text-transform: uppercase;
}

.channel-val {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text);
}

.social-links {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.social-btn {
  padding: 8px 18px;
  border-radius: 10px;
  font-size: 0.88rem;
  font-weight: 600;
  background: var(--card);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  transition: all 0.2s ease;
}

.social-btn:hover {
  border-color: var(--border-light);
  color: var(--text);
  transform: translateY(-2px);
}

/* Form */
.contact-form {
  padding: 36px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: var(--card);
  backdrop-filter: blur(12px);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.req {
  color: var(--muted);
  font-weight: 500;
}

input,
textarea {
  background: var(--input-bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 13px 16px;
  color: var(--text);
  font-family: inherit;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  resize: vertical;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(var(--accent-rgb), 0.15);
  background: var(--card);
}

.submit-btn {
  padding: 15px;
  font-size: 1rem;
  margin-top: 8px;
  min-height: 48px;
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.35);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.success-card {
  padding: 50px 36px;
  text-align: center;
  background: rgba(21, 28, 44, 0.7);
  backdrop-filter: blur(12px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}

.success-icon {
  font-size: 3.5rem;
}

.success-card h3 {
  font-size: 1.6rem;
  color: var(--text);
}

.success-card p {
  color: var(--muted);
  max-width: 400px;
  margin-bottom: 12px;
}

@media (max-width: 860px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }

  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
