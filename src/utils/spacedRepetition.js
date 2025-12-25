import { Rating } from '@/types'

/**
 * SM-2 Spaced Repetition Algorithm
 *
 * This is a modified implementation of the SuperMemo 2 algorithm
 * which calculates the optimal time to review a flashcard based on performance.
 *
 * @param {Object} card - The card to update
 * @param {number} rating - Rating from 0 (Again) to 3 (Easy)
 * @returns {Object} Updated card with new scheduling parameters
 */
export function updateCardSchedule(card, rating) {
  const now = new Date()
  let { repetitions, interval, easeFactor } = card

  // Calculate new ease factor
  // EF' = EF + (0.1 - (3 - rating) * (0.08 + (3 - rating) * 0.02))
  const qualityResponse = rating // 0-3 scale
  easeFactor = easeFactor + (0.1 - (3 - qualityResponse) * (0.08 + (3 - qualityResponse) * 0.02))

  // Ease factor should be at least 1.3
  if (easeFactor < 1.3) {
    easeFactor = 1.3
  }

  // Calculate new interval and repetitions
  let nextReview = new Date(now)

  if (rating === Rating.AGAIN) {
    // Again - review immediately during this session
    repetitions = 0
    interval = 0
    nextReview = new Date(now) // Due now for immediate review
  } else if (rating === Rating.LATER_TODAY) {
    // Later Today - review in 4 hours
    repetitions += 1
    interval = 0.167 // ~4 hours in days (4/24)
    nextReview.setHours(nextReview.getHours() + 4)
  } else if (rating === Rating.NEXT_DAY) {
    // Next Day - review tomorrow at midnight (not 24 hours from now)
    repetitions += 1
    interval = 1
    const tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0) // Set to midnight
    nextReview = tomorrow
  } else if (rating === Rating.KNOW_IT) {
    // Know It - review in 3 days, extending based on ease factor
    repetitions += 1
    const baseDays = 3
    interval = baseDays * easeFactor
    nextReview.setDate(nextReview.getDate() + Math.round(interval))
  } else {
    // Fallback for any other ratings
    repetitions += 1
    interval = 1
    nextReview.setDate(nextReview.getDate() + 1)
  }

  // Update statistics
  const totalReviews = card.totalReviews + 1
  const correctReviews = rating >= Rating.NEXT_DAY ? card.correctReviews + 1 : card.correctReviews

  return {
    ...card,
    repetitions,
    interval,
    easeFactor: Number(easeFactor.toFixed(2)),
    nextReview: nextReview.toISOString(),
    lastReviewed: now.toISOString(),
    totalReviews,
    correctReviews,
    updatedAt: now.toISOString()
  }
}

/**
 * Check if a card is due for review
 * @param {Object} card - The card to check
 * @returns {boolean} True if the card is due for review
 */
export function isCardDue(card) {
  const now = new Date()
  const nextReview = new Date(card.nextReview)
  return nextReview <= now
}

/**
 * Get cards that are due for review
 * @param {Array} cards - Array of cards
 * @returns {Array} Cards that are due for review
 */
export function getDueCards(cards) {
  return cards.filter(isCardDue)
    .sort((a, b) => new Date(a.nextReview) - new Date(b.nextReview))
}

/**
 * Get cards due today
 * @param {Array} cards - Array of cards
 * @returns {Array} Cards due today
 */
export function getCardsDueToday(cards) {
  const now = new Date()
  const endOfDay = new Date(now)
  endOfDay.setHours(23, 59, 59, 999)

  return cards.filter(card => {
    const nextReview = new Date(card.nextReview)
    return nextReview <= endOfDay
  })
}

/**
 * Calculate retention rate for a card
 * @param {Object} card - The card
 * @returns {number} Retention rate as percentage (0-100)
 */
export function getCardRetention(card) {
  if (card.totalReviews === 0) return 0
  return Math.round((card.correctReviews / card.totalReviews) * 100)
}

/**
 * Get the next card to study based on priority
 * @param {Array} cards - Array of cards
 * @returns {Object|null} Next card to study or null if none available
 */
export function getNextCard(cards) {
  const dueCards = getDueCards(cards)
  if (dueCards.length === 0) return null

  // Shuffle new cards (cards with 0 reviews) to prevent always seeing same ones
  const newCards = dueCards.filter(c => c.totalReviews === 0)
  const reviewCards = dueCards.filter(c => c.totalReviews > 0)

  // If there are new cards, shuffle and return a random one
  if (newCards.length > 0) {
    const shuffled = [...newCards].sort(() => Math.random() - 0.5)
    return shuffled[0]
  }

  // For review cards, prioritize by overdue time and retention
  return reviewCards.sort((a, b) => {
    const aRetention = getCardRetention(a)
    const bRetention = getCardRetention(b)
    const aOverdue = new Date() - new Date(a.nextReview)
    const bOverdue = new Date() - new Date(b.nextReview)

    // First sort by how overdue they are
    if (aOverdue !== bOverdue) {
      return bOverdue - aOverdue
    }

    // Then by retention rate (lower retention = higher priority)
    return aRetention - bRetention
  })[0]
}
