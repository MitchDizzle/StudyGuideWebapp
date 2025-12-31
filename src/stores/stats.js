import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import * as db from '@/db'
import { createReview, createStudySession } from '@/types'
import { getCardRetention } from '@/utils/spacedRepetition'
import { useCardStore } from './card'

export const useStatsStore = defineStore('stats', () => {
  const reviews = ref([])
  const sessions = ref([])
  const currentSession = ref(null)
  const dailyGoal = ref(20)
  const streak = ref(0)

  const cardStore = useCardStore()

  const reviewsToday = computed(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return reviews.value.filter(r => new Date(r.timestamp) >= today)
  })

  const cardsStudiedToday = computed(() => {
    return new Set(reviewsToday.value.map(r => r.cardId)).size
  })

  const dailyProgress = computed(() => {
    return Math.min(100, Math.round((cardsStudiedToday.value / dailyGoal.value) * 100))
  })

  const weakTopics = computed(() => {
    const topicStats = {}

    cardStore.cards.forEach(card => {
      if (!topicStats[card.topic]) {
        topicStats[card.topic] = {
          topic: card.topic,
          domain: card.domain,
          totalCards: 0,
          totalReviews: 0,
          correctReviews: 0,
          retention: 0
        }
      }

      const stats = topicStats[card.topic]
      stats.totalCards++
      stats.totalReviews += card.totalReviews
      stats.correctReviews += card.correctReviews

      if (stats.totalReviews > 0) {
        stats.retention = Math.round((stats.correctReviews / stats.totalReviews) * 100)
      }
    })

    return Object.values(topicStats)
      .filter(t => t.totalReviews >= 3)
      .sort((a, b) => a.retention - b.retention)
      .slice(0, 5)
  })

  const domainStats = computed(() => {
    const stats = {}

    cardStore.cards.forEach(card => {
      if (!stats[card.domain]) {
        stats[card.domain] = {
          domain: card.domain,
          totalCards: 0,
          totalReviews: 0,
          correctReviews: 0,
          retention: 0,
          averageEase: 0
        }
      }

      const domainStat = stats[card.domain]
      domainStat.totalCards++
      domainStat.totalReviews += card.totalReviews
      domainStat.correctReviews += card.correctReviews
      domainStat.averageEase += card.easeFactor
    })

    Object.values(stats).forEach(stat => {
      if (stat.totalReviews > 0) {
        stat.retention = Math.round((stat.correctReviews / stat.totalReviews) * 100)
      }
      if (stat.totalCards > 0) {
        stat.averageEase = Number((stat.averageEase / stat.totalCards).toFixed(2))
      }
    })

    return stats
  })

  const accuracyOverTime = computed(() => {
    const last30Days = []
    const now = new Date()

    for (let i = 29; i >= 0; i--) {
      const date = new Date(now)
      date.setDate(date.getDate() - i)
      date.setHours(0, 0, 0, 0)

      const nextDate = new Date(date)
      nextDate.setDate(nextDate.getDate() + 1)

      const dayReviews = reviews.value.filter(r => {
        const reviewDate = new Date(r.timestamp)
        return reviewDate >= date && reviewDate < nextDate
      })

      const total = dayReviews.length
      const correct = dayReviews.filter(r => r.rating >= 2).length

      last30Days.push({
        date: date.toISOString().split('T')[0],
        total,
        correct,
        accuracy: total > 0 ? Math.round((correct / total) * 100) : 0
      })
    }

    return last30Days
  })

  async function loadReviews() {
    reviews.value = await db.getAllReviews()
  }

  async function loadSessions() {
    sessions.value = await db.getAllSessions()
  }

  async function addReview(reviewData) {
    const review = createReview(reviewData)

    // Convert to plain object for IndexedDB (can't store Vue Proxies)
    const plainReview = JSON.parse(JSON.stringify(review))

    await db.saveReview(plainReview)
    reviews.value.push(plainReview)

    if (currentSession.value) {
      currentSession.value.cardsStudied++
    }

    return plainReview
  }

  async function startSession(deckId = null) {
    const session = createStudySession({ deckId })
    currentSession.value = session
    return session
  }

  async function endSession() {
    if (!currentSession.value) return

    currentSession.value.endedAt = new Date().toISOString()
    currentSession.value.timeSpent = new Date(currentSession.value.endedAt) - new Date(currentSession.value.startedAt)

    // Convert to plain object for IndexedDB (can't store Vue Proxies)
    const plainSession = JSON.parse(JSON.stringify(currentSession.value))

    await db.saveSession(plainSession)
    sessions.value.push(plainSession)

    const session = plainSession
    currentSession.value = null
    return session
  }

  async function updateStreak() {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    let currentStreak = 0
    let checkDate = new Date(today)

    while (true) {
      const nextDay = new Date(checkDate)
      nextDay.setDate(nextDay.getDate() + 1)

      const hasReviews = reviews.value.some(r => {
        const reviewDate = new Date(r.timestamp)
        return reviewDate >= checkDate && reviewDate < nextDay
      })

      if (hasReviews) {
        currentStreak++
        checkDate.setDate(checkDate.getDate() - 1)
      } else {
        break
      }
    }

    streak.value = currentStreak
    await db.saveSetting('streak', currentStreak)
  }

  async function loadSettings() {
    const goal = await db.getSetting('dailyGoal')
    if (goal !== undefined) {
      dailyGoal.value = goal
    }

    const savedStreak = await db.getSetting('streak')
    if (savedStreak !== undefined) {
      streak.value = savedStreak
    }
  }

  async function setDailyGoal(goal) {
    dailyGoal.value = goal
    await db.saveSetting('dailyGoal', goal)
  }

  // Alias for consistency with other update methods
  const updateDailyGoal = setDailyGoal

  return {
    reviews,
    sessions,
    currentSession,
    dailyGoal,
    streak,
    reviewsToday,
    cardsStudiedToday,
    dailyProgress,
    weakTopics,
    domainStats,
    accuracyOverTime,
    loadReviews,
    loadSessions,
    addReview,
    startSession,
    endSession,
    updateStreak,
    loadSettings,
    setDailyGoal,
    updateDailyGoal
  }
})
