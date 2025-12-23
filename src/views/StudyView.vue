<template>
  <div class="study-view">
    <div class="study-header">
      <div class="header-left">
        <h1>Study Session</h1>
        <p v-if="currentDeck">{{ currentDeck.name }}</p>
      </div>
      <div class="header-right">
        <div class="due-count">
          <span class="count">{{ dueCards.length }}</span>
          <span class="label">cards due</span>
        </div>
        <button @click="endStudy" class="btn btn-secondary">End Session</button>
      </div>
    </div>

    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Loading cards...</p>
    </div>

    <div v-else-if="!currentCard" class="no-cards">
      <div class="no-cards-icon">✓</div>
      <h2>All caught up!</h2>
      <p>No cards due for review right now.</p>
      <p class="next-review" v-if="nextReviewTime">
        Next review: {{ nextReviewTime }}
      </p>
      <button @click="$router.push('/')" class="btn btn-primary">
        Back to Dashboard
      </button>
    </div>

    <div v-else class="study-content">
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
      </div>

      <!-- Pause Overlay -->
      <div v-if="paused" class="pause-overlay">
        <div class="pause-card">
          <div class="pause-icon">☕</div>
          <h2>Time for a break!</h2>
          <p>You've been studying for 15 minutes.</p>
          <p class="break-suggestion">Take a 5-minute stretch break to prevent fatigue.</p>
          <div class="pause-actions">
            <button @click="continueStudying" class="btn btn-primary btn-large">
              Continue Studying
            </button>
            <button @click="endStudy" class="btn btn-secondary btn-large">
              End Session
            </button>
          </div>
        </div>
      </div>

      <div class="card-container">
        <DefinitionCard
          v-if="currentCard.type === 'definition'"
          :card="currentCard"
          @rate="handleRating"
        />
        <ScenarioCard
          v-else-if="currentCard.type === 'scenario'"
          :card="currentCard"
          @rate="handleRating"
        />
        <DragDropCard
          v-else-if="currentCard.type === 'dragdrop'"
          :card="currentCard"
          @rate="handleRating"
        />
      </div>

      <div class="session-stats">
        <div class="stat">
          <span class="stat-value">{{ sessionStats.cardsStudied }}</span>
          <span class="stat-label">Studied</span>
        </div>
        <div class="stat">
          <span class="stat-value">{{ sessionTime }}</span>
          <span class="stat-label">Time</span>
        </div>
        <div class="stat">
          <span class="stat-value">{{ sessionAccuracy }}%</span>
          <span class="stat-label">Accuracy</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCardStore } from '@/stores/card'
import { useDeckStore } from '@/stores/deck'
import { useStatsStore } from '@/stores/stats'
import DefinitionCard from '@/components/DefinitionCard.vue'
import ScenarioCard from '@/components/ScenarioCard.vue'
import DragDropCard from '@/components/DragDropCard.vue'

const router = useRouter()
const cardStore = useCardStore()
const deckStore = useDeckStore()
const statsStore = useStatsStore()

const loading = ref(true)
const currentCard = ref(null)
const paused = ref(false)
const sessionStats = ref({
  cardsStudied: 0,
  correctCards: 0,
  startTime: null
})
const sessionTimer = ref(null)
const elapsedSeconds = ref(0)
const pausedAtSeconds = ref(0)
const lastBreakTime = ref(0) // Track when last break was suggested

const currentDeck = computed(() => deckStore.currentDeck)
const dueCards = computed(() => cardStore.dueCards)

const progressPercentage = computed(() => {
  const goal = statsStore.dailyGoal
  const studied = statsStore.cardsStudiedToday + sessionStats.value.cardsStudied
  return Math.min(100, (studied / goal) * 100)
})

const sessionTime = computed(() => {
  const minutes = Math.floor(elapsedSeconds.value / 60)
  const seconds = elapsedSeconds.value % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
})

const sessionAccuracy = computed(() => {
  if (sessionStats.value.cardsStudied === 0) return 0
  return Math.round((sessionStats.value.correctCards / sessionStats.value.cardsStudied) * 100)
})

const nextReviewTime = computed(() => {
  const cards = cardStore.cards.filter(c => !cardStore.dueCards.includes(c))
  if (cards.length === 0) return null

  const nextCard = cards.sort((a, b) =>
    new Date(a.nextReview) - new Date(b.nextReview)
  )[0]

  const date = new Date(nextCard.nextReview)
  const now = new Date()
  const diffHours = Math.round((date - now) / (1000 * 60 * 60))

  if (diffHours < 24) {
    return `in ${diffHours} hours`
  } else {
    const diffDays = Math.round(diffHours / 24)
    return `in ${diffDays} days`
  }
})

onMounted(async () => {
  loading.value = true

  await Promise.all([
    cardStore.loadCards(),
    deckStore.loadDecks()
  ])

  loadNextCard()

  await statsStore.startSession(deckStore.currentDeckId)
  sessionStats.value.startTime = Date.now()

  sessionTimer.value = setInterval(() => {
    if (!paused.value) {
      elapsedSeconds.value = Math.floor((Date.now() - sessionStats.value.startTime) / 1000)

      // Suggest break every 15 minutes (900 seconds)
      const timeSinceLastBreak = elapsedSeconds.value - lastBreakTime.value
      if (timeSinceLastBreak >= 900) {
        pausedAtSeconds.value = elapsedSeconds.value
        lastBreakTime.value = elapsedSeconds.value
        paused.value = true
      }
    }
  }, 1000)

  loading.value = false
})

onUnmounted(() => {
  if (sessionTimer.value) {
    clearInterval(sessionTimer.value)
  }
})

function loadNextCard() {
  console.log('=== Loading Next Card ===')
  console.log('Total cards in store:', cardStore.cards.length)
  console.log('Due cards count:', cardStore.dueCards.length)

  // Debug: Check how many cards have never been reviewed
  const unseenCards = cardStore.cards.filter(c => c.totalReviews === 0)
  console.log('Unseen cards (never reviewed):', unseenCards.length)

  // Debug: Check unique card IDs we've seen
  const seenCardIds = cardStore.cards.filter(c => c.totalReviews > 0).map(c => c.id)
  console.log('Cards already reviewed:', seenCardIds.length)

  // Debug: Show next card being loaded
  console.log('Next card:', cardStore.nextCard)
  currentCard.value = cardStore.nextCard
  console.log('Current card set to:', currentCard.value?.front)

  // Debug: Log all due cards by domain
  if (cardStore.dueCards.length > 0) {
    const dueByDomain = {}
    cardStore.dueCards.forEach(c => {
      dueByDomain[c.domain] = (dueByDomain[c.domain] || 0) + 1
    })
    console.log('Due cards by domain:', dueByDomain)
  }
}

async function handleRating(rating) {
  if (!currentCard.value) return

  console.log('=== Handle Rating ===')
  console.log('Rating:', rating)
  console.log('Card being rated:', currentCard.value.front)

  const wasCorrect = rating >= 2

  sessionStats.value.cardsStudied++
  if (wasCorrect) {
    sessionStats.value.correctCards++
  }

  console.log('Calling reviewCard...')
  await cardStore.reviewCard(currentCard.value.id, rating)
  console.log('reviewCard complete')

  await statsStore.addReview({
    cardId: currentCard.value.id,
    rating,
    timeSpent: 0
  })

  console.log('Loading next card after rating...')
  loadNextCard()
}

function continueStudying() {
  // Adjust start time to account for pause duration
  const pauseDuration = Date.now() - (sessionStats.value.startTime + pausedAtSeconds.value * 1000)
  sessionStats.value.startTime += pauseDuration
  paused.value = false
}

async function endStudy() {
  if (sessionTimer.value) {
    clearInterval(sessionTimer.value)
  }

  await statsStore.endSession()
  await statsStore.updateStreak()

  router.push('/')
}
</script>

<style scoped>
.study-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

.study-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.header-left h1 {
  font-size: 28px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 4px 0;
}

.header-left p {
  color: #6b7280;
  margin: 0;
}

.header-right {
  display: flex;
  gap: 16px;
  align-items: center;
}

.due-count {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 16px;
  background: #eff6ff;
  border-radius: 8px;
}

.count {
  font-size: 24px;
  font-weight: 700;
  color: #1e40af;
}

.label {
  font-size: 12px;
  color: #3b82f6;
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

.btn-primary {
  background: #6366f1;
  color: white;
}

.btn-secondary {
  background: #e5e7eb;
  color: #374151;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 16px;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid #e5e7eb;
  border-top-color: #6366f1;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.no-cards {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;
}

.no-cards-icon {
  font-size: 64px;
  color: #10b981;
  margin-bottom: 16px;
}

.no-cards h2 {
  font-size: 24px;
  color: #111827;
  margin: 0 0 8px 0;
}

.no-cards p {
  color: #6b7280;
  margin: 0 0 8px 0;
}

.next-review {
  color: #6366f1;
  font-weight: 600;
  margin-bottom: 24px;
}

.study-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(to right, #6366f1, #8b5cf6);
  transition: width 0.3s ease;
}

.card-container {
  margin: 24px 0;
}

.session-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 24px;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #111827;
}

.stat-label {
  font-size: 12px;
  color: #6b7280;
  text-transform: uppercase;
  font-weight: 600;
}

.pause-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.pause-card {
  background: white;
  border-radius: 16px;
  padding: 48px;
  max-width: 500px;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.pause-icon {
  font-size: 64px;
  margin-bottom: 16px;
}

.pause-card h2 {
  font-size: 28px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 12px 0;
}

.pause-card p {
  font-size: 16px;
  color: #6b7280;
  margin: 0 0 8px 0;
}

.break-suggestion {
  color: #6366f1;
  font-weight: 600;
  margin-bottom: 32px;
}

.pause-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.btn-large {
  padding: 14px 28px;
  font-size: 16px;
}
</style>
