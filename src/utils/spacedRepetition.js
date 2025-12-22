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
  if (rating === Rating.AGAIN) {
    // Restart the card
    repetitions = 0
    interval = 1
  } else {
    repetitions += 1

    if (repetitions === 1) {
      interval = 1
    } else if (repetitions === 2) {
      interval = 6
    } else {
      // For subsequent reviews, multiply by ease factor
      interval = Math.round(interval * easeFactor)
    }

    // Adjust interval based on rating for non-Again ratings
    if (rating === Rating.HARD) {
      interval = Math.round(interval * 0.75) // 25% shorter
    } else if (rating === Rating.EASY) {
      interval = Math.round(interval * 1.3) // 30% longer
    }
  }

  // Calculate next review date
  const nextReview = new Date(now)
  nextReview.setDate(nextReview.getDate() + interval)

  // Update statistics
  const totalReviews = card.totalReviews + 1
  const correctReviews = rating >= Rating.GOOD ? card.correctReviews + 1 : card.correctReviews

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

  // Prioritize cards that are overdue and have lower retention
  return dueCards.sort((a, b) => {
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
