<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-content">
        <router-link to="/" class="nav-brand">
          <span class="logo">🎓</span>
          <span class="brand-text">Security+ Flashcards</span>
        </router-link>
        <div class="nav-links">
          <router-link to="/" class="nav-link">Dashboard</router-link>
          <router-link to="/study" class="nav-link">Study</router-link>
        </div>
      </div>
    </nav>

    <main class="main-content">
      <router-view />
    </main>

    <footer class="footer">
      <p>Security+ SY0-701 Study App | Built with Vue 3</p>
    </footer>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { initializeApp } from '@/utils/initialize'

onMounted(async () => {
  await initializeApp()
})
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
