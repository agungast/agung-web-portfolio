<script setup lang="ts">
const form = reactive({
  name: '',
  email: '',
  message: ''
})

const sent = ref(false)

function submit() {
  sent.value = true
  form.name = ''
  form.email = ''
  form.message = ''
}
</script>

<template>
  <section id="kontak" class="section">
    <div class="container contact-inner">
      <div>
        <h2 class="section-title">Hubungi <span>Saya</span></h2>
        <p class="section-subtitle">
          Punya proyek menarik atau sekadar ingin menyapa? Kirim pesan lewat form ini.
        </p>
        <ul class="info">
          <li><strong>Email:</strong> nama@email.com</li>
          <li><strong>Lokasi:</strong> Indonesia</li>
        </ul>
      </div>

      <form class="card form" @submit.prevent="submit">
        <label>
          Nama
          <input v-model="form.name" type="text" required placeholder="Nama Anda">
        </label>
        <label>
          Email
          <input v-model="form.email" type="email" required placeholder="nama@email.com">
        </label>
        <label>
          Pesan
          <textarea v-model="form.message" rows="4" required placeholder="Tulis pesan Anda..." />
        </label>
        <button type="submit" class="btn btn-primary">Kirim Pesan</button>
        <p v-if="sent" class="success">Terima kasih! Pesan Anda sudah terkirim.</p>
      </form>
    </div>
  </section>
</template>

<style scoped>
.contact-inner {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 48px;
}

.info {
  list-style: none;
  display: grid;
  gap: 10px;
  color: var(--muted);
}

.form {
  padding: 28px;
  display: grid;
  gap: 18px;
}

.form label {
  display: grid;
  gap: 6px;
  font-size: 0.9rem;
  font-weight: 600;
}

input,
textarea {
  background: var(--bg-soft);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 12px 14px;
  color: var(--text);
  font: inherit;
  resize: vertical;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: var(--accent);
}

.success {
  color: #34d399;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .contact-inner {
    grid-template-columns: 1fr;
  }
}
</style>
