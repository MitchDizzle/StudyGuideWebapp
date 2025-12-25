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
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCardStore } from '@/stores/card'
import { useStatsStore } from '@/stores/stats'
import { useDeckStore } from '@/stores/deck'
import * as db from '@/db'
import { allSecurityPlusCards } from '@/data/domains'
import { createDeck } from '@/types'

const router = useRouter()
const cardStore = useCardStore()
const statsStore = useStatsStore()
const deckStore = useDeckStore()

const dailyGoal = ref(20)

onMounted(async () => {
  await statsStore.loadSettings()
  dailyGoal.value = statsStore.dailyGoal
})

async function updateDailyGoal() {
  await statsStore.updateDailyGoal(dailyGoal.value)
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
  if (!confirm(`This will DELETE ALL DATA and recreate the database with all ${allSecurityPlusCards.length} Security+ cards. Your progress and statistics will be lost. Continue?`)) {
    return
  }

  console.log('=== Reinitializing Database ===')

  // Clear all data
  await db.clearAllData()
  console.log('Database cleared')

  // Reload stores
  await Promise.all([
    deckStore.loadDecks(),
    cardStore.loadCards()
  ])
  console.log('Stores reloaded')

  // Create default deck
  const deck = createDeck({
    name: 'Security+ SY0-701',
    description: 'CompTIA Security+ SY0-701 certification study deck',
    isDefault: true
  })
  await deckStore.addDeck(deck)
  deckStore.setCurrentDeck(deck.id)
  console.log('Deck created:', deck.name)

  // Add all cards
  const cards = allSecurityPlusCards.map(cardData => ({
    ...cardData,
    deckId: deck.id
  }))

  await cardStore.addCards(cards)
  console.log(`Added ${cards.length} cards to database`)

  // Reload everything
  await Promise.all([
    cardStore.loadCards(),
    deckStore.loadDecks()
  ])

  console.log('Final card count:', cardStore.cards.length)
  alert(`Database reinitialized with ${cardStore.cards.length} cards!`)

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
</style>
