<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-content">
        <router-link to="/" class="nav-brand">
          <span class="logo">🎓</span>
          <span class="brand-text">Study Packs</span>
        </router-link>
        <div class="nav-links">
          <router-link to="/" class="nav-link">Dashboard</router-link>
          <router-link to="/study" class="nav-link">Study</router-link>
          <router-link to="/settings" class="nav-link nav-link-icon" title="Settings">
            ⚙️
          </router-link>
        </div>
      </div>
    </nav>

    <main class="main-content">
      <router-view />
    </main>

    <footer class="footer">
      <p>Study Packs | Built with Vue 3</p>
    </footer>

    <WelcomeModal
      :show="showWelcomeModal"
      :available-packs="availablePacks"
      @select="handlePackSelection"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { initializeApp } from '@/utils/initialize'
import { usePackStore } from '@/stores/pack'
import { availablePacks } from '@/data/packs'
import WelcomeModal from '@/components/WelcomeModal.vue'

const packStore = usePackStore()
const showWelcomeModal = ref(false)

onMounted(async () => {
  // Initialize app (this loads pack settings)
  await initializeApp()

  // Only show modal if no packs are enabled
  if (packStore.enabledPackIds.length === 0) {
    showWelcomeModal.value = true
  }
})

async function handlePackSelection(selectedPackIds) {
  try {
    // Enable the selected packs
    for (const packId of selectedPackIds) {
      await packStore.enablePack(packId)
    }

    // Hide modal after successful save
    showWelcomeModal.value = false

    // Small delay then reload to show the new packs
    setTimeout(() => {
      window.location.reload()
    }, 100)
  } catch (error) {
    console.error('Error enabling packs:', error)
    alert('Failed to enable packs. Please try again.')
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background: #f3f4f6;
  color: #111827;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: #111827;
  font-weight: 700;
  font-size: 20px;
}

.logo {
  font-size: 28px;
}

.brand-text {
  display: none;
}

@media (min-width: 640px) {
  .brand-text {
    display: inline;
  }
}

.nav-links {
  display: flex;
  gap: 24px;
}

.nav-link {
  text-decoration: none;
  color: #6b7280;
  font-weight: 600;
  font-size: 14px;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.2s;
}

.nav-link:hover {
  color: #6366f1;
  background: #eef2ff;
}

.nav-link.router-link-active {
  color: #6366f1;
  background: #eef2ff;
}

.nav-link-icon {
  font-size: 20px;
  padding: 8px 12px;
}

.main-content {
  flex: 1;
  padding: 24px 0;
}

.footer {
  background: white;
  padding: 24px;
  text-align: center;
  color: #6b7280;
  font-size: 14px;
  border-top: 1px solid #e5e7eb;
}

.footer p {
  margin: 0;
}

h1, h2, h3, h4, h5, h6 {
  margin: 0;
  font-weight: 700;
}

button {
  font-family: inherit;
}

input, textarea, select {
  font-family: inherit;
}
</style>
