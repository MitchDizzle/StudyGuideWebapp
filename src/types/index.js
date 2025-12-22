export const CardType = {
  DEFINITION: 'definition',
  SCENARIO: 'scenario',
  DRAGDROP: 'dragdrop'
}

export const Domain = {
  THREATS: 'Threats, Attacks, and Vulnerabilities',
  ARCHITECTURE: 'Architecture and Design',
  IMPLEMENTATION: 'Implementation',
  OPERATIONS: 'Operations and Incident Response',
  GOVERNANCE: 'Governance, Risk, and Compliance'
}

export const Difficulty = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard'
}

export const Rating = {
  AGAIN: 0,
  HARD: 1,
  GOOD: 2,
  EASY: 3
}

/**
 * Creates a new card object
 */
export function createCard({
  id = crypto.randomUUID(),
  type = CardType.DEFINITION,
  front = '',
  back = '',
  scenario = '',
  options = [],
  correctAnswer = 0,
  explanation = '',
  instructions = '',
  targets = [],
  items = [],
  domain = Domain.THREATS,
  topic = '',
  difficulty = Difficulty.MEDIUM,
  deckId = null
} = {}) {
  return {
    id,
    type,
    front,
    back,
    scenario,
    options,
    correctAnswer,
    explanation,
    instructions,
    targets,
    items,
    domain,
    topic,
    difficulty,
    deckId,
    // Spaced repetition fields (SM-2 algorithm)
    repetitions: 0,
    interval: 1,
    easeFactor: 2.5,
    nextReview: new Date().toISOString(),
    lastReviewed: null,
    // Statistics
    totalReviews: 0,
    correctReviews: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
}

/**
 * Creates a new deck object
 */
export function createDeck({
  id = crypto.randomUUID(),
  name = '',
  description = '',
  isDefault = false
} = {}) {
  return {
    id,
    name,
    description,
    isDefault,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
}

/**
 * Creates a new review record
 */
export function createReview({
  cardId,
  rating,
  timeSpent = 0,
  userAnswer = null
} = {}) {
  return {
    id: crypto.randomUUID(),
    cardId,
    rating,
    timeSpent,
    userAnswer,
    timestamp: new Date().toISOString()
  }
}

/**
 * Creates a new study session
 */
export function createStudySession({
  deckId = null,
  cardsStudied = 0,
  timeSpent = 0
} = {}) {
  return {
    id: crypto.randomUUID(),
    deckId,
    cardsStudied,
    timeSpent,
    startedAt: new Date().toISOString(),
    endedAt: null
  }
}
