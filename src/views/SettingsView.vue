<template>
  <div class="settings-view">
    <div class="settings-header">
      <button @click="$router.push('/')" class="btn-back">
        ← Back to Dashboard
      </button>
      <h1>Settings</h1>
    </div>

    <div class="settings-content">
      <div class="settings-section">
        <h2>Study Packs</h2>
        <p class="section-description">Enable or disable study packs to customize your learning</p>

        <div class="pack-toggles">
          <div v-for="pack in allPacks" :key="pack.id" class="pack-toggle">
            <div class="pack-toggle-info">
              <div class="pack-toggle-icon">📦</div>
              <div>
                <div class="pack-toggle-name">{{ pack.name }}</div>
                <div class="pack-toggle-description">{{ pack.description }}</div>
                <div class="pack-toggle-count">{{ pack.cardCount }} cards</div>
              </div>
            </div>
            <label class="toggle-switch">
              <input
                type="checkbox"
                :checked="isPackEnabled(pack.id)"
                @change="togglePack(pack.id)"
              />
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>

      <div class="settings-section">
        <h2>Study Settings</h2>
        <p class="section-description">Customize your study experience</p>

        <div class="setting-item">
          <label for="dailyGoal">Daily Goal (cards per day)</label>
          <input
            id="dailyGoal"
            type="number"
            v-model.number="dailyGoal"
            @change="updateDailyGoal"
            min="1"
            max="200"
            class="input"
          />
        </div>
      </div>

      <div class="settings-section">
        <h2>Data Management</h2>
        <p class="section-description">Export, import, or reset your study data</p>

        <div class="settings-actions">
          <div class="action-card">
            <div class="action-icon" style="background: #dbeafe; color: #1e40af;">📤</div>
            <div class="action-content">
              <h3>Export Data</h3>
              <p>Download all your cards, progress, and statistics as a JSON file</p>
              <button @click="exportData" class="btn btn-primary">Export Data</button>
            </div>
          </div>

          <div class="action-card">
            <div class="action-icon" style="background: #dcfce7; color: #166534;">📥</div>
            <div class="action-content">
              <h3>Import Data</h3>
              <p>Upload a previously exported JSON file to restore your data</p>
              <label class="btn btn-primary">
                Import Data
                <input type="file" @change="importData" accept=".json" style="display: none;">
              </label>
            </div>
          </div>

          <div class="action-card warning">
            <div class="action-icon" style="background: #fef3c7; color: #92400e;">🔄</div>
            <div class="action-content">
              <h3>Reset All Progress</h3>
              <p>Mark all cards as new and due for review (statistics preserved)</p>
              <button @click="resetAllProgress" class="btn btn-warning">Reset Progress</button>
            </div>
          </div>

          <div class="action-card danger">
            <div class="action-icon" style="background: #fee2e2; color: #991b1b;">⚠️</div>
            <div class="action-content">
              <h3>Reinitialize Database</h3>
              <p>Delete all data and recreate with fresh cards (fixes missing cards)</p>
              <button @click="reinitializeDatabase" class="btn btn-danger">Reinitialize Database</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCardStore } from '@/stores/card'
import { useStatsStore } from '@/stores/stats'
import { useDeckStore } from '@/stores/deck'
import { usePackStore } from '@/stores/pack'
import * as db from '@/db'
import { availablePacks, getEnabledCards } from '@/data/packs'
import { createDeck } from '@/types'

const router = useRouter()
const cardStore = useCardStore()
const statsStore = useStatsStore()
const deckStore = useDeckStore()
const packStore = usePackStore()

const dailyGoal = ref(20)
const allPacks = computed(() => packStore.allPacks)

onMounted(async () => {
  await Promise.all([
    statsStore.loadSettings(),
    packStore.loadSettings()
  ])
  dailyGoal.value = statsStore.dailyGoal
})

async function updateDailyGoal() {
  await statsStore.updateDailyGoal(dailyGoal.value)
}

function isPackEnabled(packId) {
  return packStore.isPackEnabled(packId)
}

async function togglePack(packId) {
  await packStore.togglePack(packId)

  // Simple solution: reload the page to reinitialize everything
  setTimeout(() => {
    window.location.reload()
  }, 100)
}

async function exportData() {
  try {
    const data = await db.exportData()
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `flashcards-export-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Export failed:', error)
    alert('Failed to export data')
  }
}

async function importData(event) {
  const file = event.target.files[0]
  if (!file) return

  try {
    const text = await file.text()
    const data = JSON.parse(text)
    await db.importData(data)

    await Promise.all([
      cardStore.loadCards(),
      statsStore.loadReviews(),
      statsStore.loadSettings(),
      deckStore.loadDecks()
    ])

    alert('Data imported successfully!')
  } catch (error) {
    console.error('Import failed:', error)
    alert('Failed to import data. Please check the file format.')
  }
}

async function resetAllProgress() {
  if (!confirm('Reset all card progress? This will mark all cards as new and due for review. Statistics will be preserved.')) {
    return
  }

  const now = new Date().toISOString()

  for (const card of cardStore.cards) {
    const resetCard = {
      ...card,
      repetitions: 0,
      interval: 1,
      easeFactor: 2.5,
      nextReview: now,
      lastReviewed: null,
      totalReviews: 0,
      correctReviews: 0,
      updatedAt: now
    }

    const plainCard = JSON.parse(JSON.stringify(resetCard))
    await db.saveCard(plainCard)
  }

  await cardStore.loadCards()
  alert('All cards have been reset! All cards are now due for review.')
}

async function reinitializeDatabase() {
  // Get enabled pack IDs
  const enabledPackIds = packStore.enabledPackIds
  const allAvailableCards = getEnabledCards(enabledPackIds)

  if (!confirm(`This will DELETE ALL DATA and recreate the database with ${allAvailableCards.length} cards from ${enabledPackIds.length} enabled pack(s). Your progress and statistics will be lost. Continue?`)) {
    return
  }

  console.log('=== Reinitializing Database ===')
  console.log('Enabled packs:', enabledPackIds)

  // Clear all data
  await db.clearAllData()
  console.log('Database cleared')

  // Reload pack settings (they were cleared, so restore them)
  await packStore.loadSettings()

  // If no packs are enabled after reload, we're done
  if (packStore.enabledPackIds.length === 0) {
    alert('Database cleared. Please enable packs in settings.')
    window.location.reload()
    return
  }

  // Reload stores
  await Promise.all([
    deckStore.loadDecks(),
    cardStore.loadCards()
  ])
  console.log('Stores reloaded')

  // Create decks for ONLY enabled packs
  const enabledPacks = availablePacks.filter(pack => packStore.enabledPackIds.includes(pack.id))
  let totalCards = 0

  for (const pack of enabledPacks) {
    const deck = createDeck({
      name: pack.name,
      description: pack.description,
      isDefault: pack.isDefault || false
    })
    await deckStore.addDeck(deck)

    if (pack.isDefault || enabledPacks.length === 1) {
      deckStore.setCurrentDeck(deck.id)
    }

    console.log('Deck created:', deck.name)

    // Add all cards from this pack
    const cards = pack.cards.map(cardData => ({
      ...cardData,
      deckId: deck.id,
      packId: pack.id
    }))

    await cardStore.addCards(cards)
    totalCards += cards.length
    console.log(`Added ${cards.length} cards from ${pack.name}`)
  }

  // Reload everything
  await Promise.all([
    cardStore.loadCards(),
    deckStore.loadDecks()
  ])

  console.log('Final card count:', cardStore.cards.length)
  alert(`Database reinitialized with ${totalCards} cards from ${enabledPacks.length} enabled pack(s)!`)

  // Reload page to reset all state
  window.location.reload()
}
</script>

<style scoped>
.settings-view {
  max-width: 1000px;
  margin: 0 auto;
  padding: 24px;
}

.settings-header {
  margin-bottom: 32px;
}

.btn-back {
  background: transparent;
  border: none;
  color: #6366f1;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  padding: 8px 0;
  margin-bottom: 16px;
  display: inline-block;
  transition: color 0.2s;
}

.btn-back:hover {
  color: #4f46e5;
}

.settings-header h1 {
  font-size: 32px;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.settings-content {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.settings-section {
  background: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.settings-section h2 {
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 8px 0;
}

.section-description {
  color: #6b7280;
  margin: 0 0 24px 0;
  font-size: 14px;
}

.settings-actions {
  display: grid;
  gap: 20px;
}

.action-card {
  display: flex;
  gap: 20px;
  padding: 24px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  transition: all 0.2s;
}

.action-card:hover {
  border-color: #cbd5e1;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.action-card.warning {
  border-color: #fbbf24;
  background: #fffbeb;
}

.action-card.danger {
  border-color: #f87171;
  background: #fef2f2;
}

.action-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  flex-shrink: 0;
}

.action-content {
  flex: 1;
}

.action-content h3 {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 8px 0;
}

.action-content p {
  color: #6b7280;
  margin: 0 0 16px 0;
  font-size: 14px;
  line-height: 1.5;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-primary {
  background: #6366f1;
  color: white;
}

.btn-warning {
  background: #f59e0b;
  color: white;
}

.btn-danger {
  background: #ef4444;
  color: white;
}

.setting-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.setting-item label {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

.input {
  padding: 10px 14px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  max-width: 200px;
  transition: border-color 0.2s;
}

.input:focus {
  outline: none;
  border-color: #6366f1;
}

.pack-toggles {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.pack-toggle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  transition: all 0.2s;
}

.pack-toggle:hover {
  border-color: #cbd5e1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.pack-toggle-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.pack-toggle-icon {
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pack-toggle-name {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 4px;
}

.pack-toggle-description {
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 4px;
}

.pack-toggle-count {
  font-size: 12px;
  font-weight: 600;
  color: #6366f1;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 56px;
  height: 28px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #cbd5e1;
  transition: 0.3s;
  border-radius: 28px;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.3s;
  border-radius: 50%;
}

input:checked + .toggle-slider {
  background-color: #6366f1;
}

input:checked + .toggle-slider:before {
  transform: translateX(28px);
}

input:disabled + .toggle-slider {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
