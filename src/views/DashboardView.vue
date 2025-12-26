<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <div>
        <h1>Dashboard</h1>
        <p>Track your study progress</p>
      </div>
      <div class="header-actions" v-if="enabledPacks.length > 0">
        <button @click="startStudy" class="btn btn-primary btn-large">
          Start Studying
        </button>
      </div>
    </div>

    <div v-if="enabledPacks.length === 0" class="no-packs-message">
      <div class="no-packs-icon">📦</div>
      <h2>No Study Packs Enabled</h2>
      <p>Get started by enabling study packs in the settings.</p>
      <button @click="$router.push('/settings')" class="btn btn-primary btn-large">
        Go to Settings
      </button>
    </div>

    <template v-else>
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon" style="background: #dbeafe; color: #1e40af;">📚</div>
        <div class="stat-content">
          <div class="stat-value">{{ cardsDueToday.length }}</div>
          <div class="stat-label">Due Today</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon" style="background: #dcfce7; color: #166534;">✓</div>
        <div class="stat-content">
          <div class="stat-value">{{ cardsStudiedToday }}</div>
          <div class="stat-label">Studied Today</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon" style="background: #fef3c7; color: #92400e;">🔥</div>
        <div class="stat-content">
          <div class="stat-value">{{ streak }}</div>
          <div class="stat-label">Day Streak</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon" style="background: #fce7f3; color: #9f1239;">🎯</div>
        <div class="stat-content">
          <div class="stat-value">{{ totalCards }}</div>
          <div class="stat-label">Total Cards</div>
        </div>
      </div>
    </div>

    <div class="daily-goal">
      <div class="goal-header">
        <h3>Daily Goal</h3>
        <span class="goal-progress">{{ cardsStudiedToday }} / {{ dailyGoal }}</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: dailyProgress + '%' }"></div>
      </div>
      <p class="goal-message" v-if="dailyProgress >= 100">
        Great job! You've reached your daily goal!
      </p>
      <p class="goal-message" v-else>
        {{ dailyGoal - cardsStudiedToday }} more cards to reach your goal
      </p>
    </div>

    <div class="charts-grid">
      <div class="chart-card">
        <h3>Accuracy Over Time (Last 30 Days)</h3>
        <div class="accuracy-chart">
          <div
            v-for="(day, index) in accuracyData"
            :key="index"
            class="chart-bar"
            :style="{ height: day.accuracy + '%' }"
            :title="`${day.date}: ${day.accuracy}% (${day.correct}/${day.total})`"
          >
            <div class="bar-fill" :style="{ height: day.accuracy + '%' }"></div>
          </div>
        </div>
        <div class="chart-labels">
          <span>30 days ago</span>
          <span>Today</span>
        </div>
      </div>

      <div class="chart-card">
        <h3>Domain Breakdown</h3>
        <div class="domain-list">
          <div v-for="(stats, domain) in domainStats" :key="domain" class="domain-item">
            <div class="domain-header">
              <span class="domain-name">{{ shortenDomain(domain) }}</span>
              <span class="domain-retention" :class="getRetentionClass(stats.retention)">
                {{ stats.retention }}%
              </span>
            </div>
            <div class="domain-bar">
              <div
                class="domain-fill"
                :class="getRetentionClass(stats.retention)"
                :style="{ width: stats.retention + '%' }"
              ></div>
            </div>
            <div class="domain-stats">
              <span>{{ stats.totalCards }} cards</span>
              <span>{{ stats.totalReviews }} reviews</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="active-packs" v-if="enabledPacks.length > 0">
      <h3>Active Study Packs</h3>
      <div class="pack-list">
        <div v-for="pack in enabledPacks" :key="pack.id" class="pack-item">
          <div class="pack-icon">📦</div>
          <div class="pack-info">
            <div class="pack-name">{{ pack.name }}</div>
            <div class="pack-description">{{ pack.description }}</div>
          </div>
          <div class="pack-stats">
            <div class="pack-count">{{ pack.cardCount }} cards</div>
          </div>
        </div>
      </div>
    </div>

    <div class="weak-topics" v-if="weakTopics.length > 0">
      <h3>Topics Needing Practice</h3>
      <div class="topic-list">
        <div v-for="topic in weakTopics" :key="topic.topic" class="topic-item">
          <div class="topic-info">
            <div class="topic-name">{{ topic.topic }}</div>
            <div class="topic-domain">{{ topic.domain }}</div>
          </div>
          <div class="topic-stats">
            <div class="topic-retention" :class="getRetentionClass(topic.retention)">
              {{ topic.retention }}% retention
            </div>
            <div class="topic-cards">{{ topic.totalCards }} cards</div>
          </div>
        </div>
      </div>
    </div>
    </template>

  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCardStore } from '@/stores/card'
import { useStatsStore } from '@/stores/stats'
import { useDeckStore } from '@/stores/deck'
import { usePackStore } from '@/stores/pack'

const router = useRouter()
const cardStore = useCardStore()
const statsStore = useStatsStore()
const deckStore = useDeckStore()
const packStore = usePackStore()

const cardsDueToday = computed(() => cardStore.cardsDueToday)
const cardsStudiedToday = computed(() => statsStore.cardsStudiedToday)
const streak = computed(() => statsStore.streak)
const totalCards = computed(() => cardStore.cards.length)
const dailyGoal = computed(() => statsStore.dailyGoal)
const dailyProgress = computed(() => statsStore.dailyProgress)
const accuracyData = computed(() => statsStore.accuracyOverTime)
const domainStats = computed(() => statsStore.domainStats)
const weakTopics = computed(() => statsStore.weakTopics)
const enabledPacks = computed(() => packStore.enabledPacks)

onMounted(async () => {
  await Promise.all([
    packStore.loadSettings(),
    cardStore.loadCards(),
    statsStore.loadReviews(),
    statsStore.loadSessions(),
    statsStore.loadSettings(),
    deckStore.loadDecks()
  ])

  await statsStore.updateStreak()
})

function startStudy() {
  router.push('/study')
}

function shortenDomain(domain) {
  const mapping = {
    'Threats, Attacks, and Vulnerabilities': 'Threats & Attacks',
    'Architecture and Design': 'Architecture',
    'Implementation': 'Implementation',
    'Operations and Incident Response': 'Operations',
    'Governance, Risk, and Compliance': 'Governance'
  }
  return mapping[domain] || domain
}

function getRetentionClass(retention) {
  if (retention >= 80) return 'high'
  if (retention >= 60) return 'medium'
  return 'low'
}
</script>

<style scoped>
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.dashboard-header h1 {
  font-size: 32px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 4px 0;
}

.dashboard-header p {
  color: #6b7280;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 16px;
  align-items: center;
}

.no-packs-message {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 64px 32px;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.no-packs-icon {
  font-size: 80px;
  margin-bottom: 24px;
}

.no-packs-message h2 {
  font-size: 28px;
  color: #111827;
  margin-bottom: 12px;
}

.no-packs-message p {
  font-size: 16px;
  color: #6b7280;
  margin-bottom: 32px;
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

.btn-text {
  background: transparent;
  color: #6b7280;
}

.btn-large {
  padding: 14px 32px;
  font-size: 16px;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}

.stat-card {
  display: flex;
  gap: 16px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.stat-content {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #111827;
}

.stat-label {
  font-size: 14px;
  color: #6b7280;
}

.daily-goal {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 32px;
}

.goal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.goal-header h3 {
  margin: 0;
  font-size: 18px;
  color: #111827;
}

.goal-progress {
  font-weight: 700;
  color: #6366f1;
}

.progress-bar {
  height: 12px;
  background: #e5e7eb;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 12px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(to right, #6366f1, #8b5cf6);
  transition: width 0.3s ease;
}

.goal-message {
  margin: 0;
  color: #6b7280;
  font-size: 14px;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.chart-card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.chart-card h3 {
  margin: 0 0 20px 0;
  font-size: 18px;
  color: #111827;
}

.accuracy-chart {
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 200px;
  margin-bottom: 8px;
}

.chart-bar {
  flex: 1;
  position: relative;
  display: flex;
  align-items: flex-end;
}

.bar-fill {
  width: 100%;
  background: linear-gradient(to top, #6366f1, #8b5cf6);
  border-radius: 2px 2px 0 0;
  transition: height 0.3s ease;
  min-height: 2px;
}

.chart-labels {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #6b7280;
}

.domain-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.domain-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.domain-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.domain-name {
  font-weight: 600;
  color: #111827;
  font-size: 14px;
}

.domain-retention {
  font-weight: 700;
  font-size: 14px;
}

.domain-retention.high {
  color: #10b981;
}

.domain-retention.medium {
  color: #f59e0b;
}

.domain-retention.low {
  color: #ef4444;
}

.domain-bar {
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
}

.domain-fill {
  height: 100%;
  transition: width 0.3s ease;
}

.domain-fill.high {
  background: #10b981;
}

.domain-fill.medium {
  background: #f59e0b;
}

.domain-fill.low {
  background: #ef4444;
}

.domain-stats {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: #6b7280;
}

.weak-topics {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 32px;
}

.weak-topics h3 {
  margin: 0 0 20px 0;
  font-size: 18px;
  color: #111827;
}

.topic-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.topic-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: #f9fafb;
  border-radius: 8px;
  border-left: 4px solid #ef4444;
}

.topic-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.topic-name {
  font-weight: 600;
  color: #111827;
}

.topic-domain {
  font-size: 12px;
  color: #6b7280;
}

.topic-stats {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.topic-retention {
  font-weight: 700;
  font-size: 14px;
}

.topic-retention.high {
  color: #10b981;
}

.topic-retention.medium {
  color: #f59e0b;
}

.topic-retention.low {
  color: #ef4444;
}

.topic-cards {
  font-size: 12px;
  color: #6b7280;
}

.active-packs {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 32px;
}

.active-packs h3 {
  margin: 0 0 20px 0;
  font-size: 18px;
  color: #111827;
}

.pack-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.pack-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #f9fafb;
  border-radius: 8px;
  border-left: 4px solid #6366f1;
}

.pack-icon {
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
}

.pack-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.pack-name {
  font-weight: 600;
  color: #111827;
  font-size: 16px;
}

.pack-description {
  font-size: 13px;
  color: #6b7280;
}

.pack-stats {
  display: flex;
  align-items: center;
}

.pack-count {
  font-size: 14px;
  font-weight: 600;
  color: #6366f1;
  background: #eef2ff;
  padding: 6px 12px;
  border-radius: 6px;
}
</style>
