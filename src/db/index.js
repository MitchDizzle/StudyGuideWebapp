import { openDB } from 'idb'

const DB_NAME = 'flashcards-db'
const DB_VERSION = 1

let db = null

/**
 * Initialize the IndexedDB database
 */
export async function initDB() {
  if (db) return db

  db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db, oldVersion, newVersion, transaction) {
      // Create object stores if they don't exist
      if (!db.objectStoreNames.contains('decks')) {
        db.createObjectStore('decks', { keyPath: 'id' })
      }

      if (!db.objectStoreNames.contains('cards')) {
        const cardStore = db.createObjectStore('cards', { keyPath: 'id' })
        cardStore.createIndex('deckId', 'deckId', { unique: false })
        cardStore.createIndex('domain', 'domain', { unique: false })
        cardStore.createIndex('nextReview', 'nextReview', { unique: false })
      }

      if (!db.objectStoreNames.contains('reviews')) {
        const reviewStore = db.createObjectStore('reviews', { keyPath: 'id' })
        reviewStore.createIndex('cardId', 'cardId', { unique: false })
        reviewStore.createIndex('timestamp', 'timestamp', { unique: false })
      }

      if (!db.objectStoreNames.contains('sessions')) {
        const sessionStore = db.createObjectStore('sessions', { keyPath: 'id' })
        sessionStore.createIndex('deckId', 'deckId', { unique: false })
        sessionStore.createIndex('startedAt', 'startedAt', { unique: false })
      }

      if (!db.objectStoreNames.contains('settings')) {
        db.createObjectStore('settings', { keyPath: 'key' })
      }
    }
  })

  return db
}

// Deck operations
export async function getAllDecks() {
  const database = await initDB()
  return database.getAll('decks')
}

export async function getDeck(id) {
  const database = await initDB()
  return database.get('decks', id)
}

export async function saveDeck(deck) {
  const database = await initDB()
  return database.put('decks', deck)
}

export async function deleteDeck(id) {
  const database = await initDB()
  return database.delete('decks', id)
}

// Card operations
export async function getAllCards() {
  const database = await initDB()
  return database.getAll('cards')
}

export async function getCard(id) {
  const database = await initDB()
  return database.get('cards', id)
}

export async function getCardsByDeck(deckId) {
  const database = await initDB()
  return database.getAllFromIndex('cards', 'deckId', deckId)
}

export async function getCardsByDomain(domain) {
  const database = await initDB()
  return database.getAllFromIndex('cards', 'domain', domain)
}

export async function saveCard(card) {
  const database = await initDB()
  return database.put('cards', card)
}

export async function saveCards(cards) {
  const database = await initDB()
  const tx = database.transaction('cards', 'readwrite')
  await Promise.all([
    ...cards.map(card => tx.store.put(card)),
    tx.done
  ])
}

export async function deleteCard(id) {
  const database = await initDB()
  return database.delete('cards', id)
}

// Review operations
export async function getAllReviews() {
  const database = await initDB()
  return database.getAll('reviews')
}

export async function getReviewsByCard(cardId) {
  const database = await initDB()
  return database.getAllFromIndex('reviews', 'cardId', cardId)
}

export async function saveReview(review) {
  const database = await initDB()
  return database.put('reviews', review)
}

export async function getReviewsSince(date) {
  const database = await initDB()
  const allReviews = await database.getAll('reviews')
  return allReviews.filter(review => new Date(review.timestamp) >= date)
}

// Session operations
export async function getAllSessions() {
  const database = await initDB()
  return database.getAll('sessions')
}

export async function getSession(id) {
  const database = await initDB()
  return database.get('sessions', id)
}

export async function saveSession(session) {
  const database = await initDB()
  return database.put('sessions', session)
}

export async function getSessionsSince(date) {
  const database = await initDB()
  const allSessions = await database.getAll('sessions')
  return allSessions.filter(session => new Date(session.startedAt) >= date)
}

// Settings operations
export async function getSetting(key) {
  const database = await initDB()
  const result = await database.get('settings', key)
  return result?.value
}

export async function saveSetting(key, value) {
  const database = await initDB()
  return database.put('settings', { key, value })
}

export async function getSettings() {
  const database = await initDB()
  const allSettings = await database.getAll('settings')
  // Convert array of {key, value} to object
  return allSettings.reduce((acc, { key, value }) => {
    acc[key] = value
    return acc
  }, {})
}

export async function saveSettings(settingsObj) {
  const database = await initDB()
  const tx = database.transaction('settings', 'readwrite')
  const promises = Object.entries(settingsObj).map(([key, value]) =>
    tx.store.put({ key, value })
  )
  promises.push(tx.done)
  await Promise.all(promises)
}

// Bulk operations
export async function exportData() {
  const database = await initDB()
  const [decks, cards, reviews, sessions, settings] = await Promise.all([
    database.getAll('decks'),
    database.getAll('cards'),
    database.getAll('reviews'),
    database.getAll('sessions'),
    database.getAll('settings')
  ])

  return {
    version: DB_VERSION,
    exportedAt: new Date().toISOString(),
    decks,
    cards,
    reviews,
    sessions,
    settings
  }
}

export async function importData(data) {
  const database = await initDB()

  // Clear existing data
  const tx = database.transaction(
    ['decks', 'cards', 'reviews', 'sessions', 'settings'],
    'readwrite'
  )

  await Promise.all([
    tx.objectStore('decks').clear(),
    tx.objectStore('cards').clear(),
    tx.objectStore('reviews').clear(),
    tx.objectStore('sessions').clear(),
    tx.objectStore('settings').clear()
  ])

  await tx.done

  // Import new data
  const importTx = database.transaction(
    ['decks', 'cards', 'reviews', 'sessions', 'settings'],
    'readwrite'
  )

  const promises = []

  if (data.decks) {
    promises.push(...data.decks.map(deck => importTx.objectStore('decks').put(deck)))
  }

  if (data.cards) {
    promises.push(...data.cards.map(card => importTx.objectStore('cards').put(card)))
  }

  if (data.reviews) {
    promises.push(...data.reviews.map(review => importTx.objectStore('reviews').put(review)))
  }

  if (data.sessions) {
    promises.push(...data.sessions.map(session => importTx.objectStore('sessions').put(session)))
  }

  if (data.settings) {
    promises.push(...data.settings.map(setting => importTx.objectStore('settings').put(setting)))
  }

  promises.push(importTx.done)

  await Promise.all(promises)
}

export async function clearAllData() {
  const database = await initDB()
  const tx = database.transaction(
    ['decks', 'cards', 'reviews', 'sessions', 'settings'],
    'readwrite'
  )

  await Promise.all([
    tx.objectStore('decks').clear(),
    tx.objectStore('cards').clear(),
    tx.objectStore('reviews').clear(),
    tx.objectStore('sessions').clear(),
    tx.objectStore('settings').clear(),
    tx.done
  ])
}
