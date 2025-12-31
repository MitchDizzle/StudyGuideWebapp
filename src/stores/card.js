import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import * as db from '@/db'
import { createCard } from '@/types'
import { updateCardSchedule, getDueCards, getCardsDueToday, getNextCard } from '@/utils/spacedRepetition'
import { usePackStore } from '@/stores/pack'

export const useCardStore = defineStore('card', () => {
  const cards = ref([])
  const loading = ref(false)

  const cardsByDeck = computed(() => {
    return (deckId) => cards.value.filter(c => c.deckId === deckId)
  })

  const cardsByDomain = computed(() => {
    return (domain) => cards.value.filter(c => c.domain === domain)
  })

  const dueCards = computed(() => {
    return getDueCards(cards.value)
  })

  const cardsDueToday = computed(() => {
    return getCardsDueToday(cards.value)
  })

  const nextCard = computed(() => {
    return getNextCard(cards.value)
  })

  const cardsByTopic = computed(() => {
    const topics = {}
    cards.value.forEach(card => {
      if (!topics[card.topic]) {
        topics[card.topic] = []
      }
      topics[card.topic].push(card)
    })
    return topics
  })

  // Get all unique domains from enabled cards
  const availableDomains = computed(() => {
    const domains = new Set()
    cards.value.forEach(card => {
      if (card.domain) {
        domains.add(card.domain)
      }
    })
    return Array.from(domains).sort()
  })

  // Get all unique topics from enabled cards
  const availableTopics = computed(() => {
    const topics = new Set()
    cards.value.forEach(card => {
      if (card.topic) {
        topics.add(card.topic)
      }
    })
    return Array.from(topics).sort()
  })

  async function loadCards() {
    loading.value = true
    try {
      const allCards = await db.getAllCards()
      const packStore = usePackStore()

      // Only load cards from enabled packs
      if (packStore.enabledPackIds.length > 0) {
        cards.value = allCards.filter(card =>
          card.packId && packStore.enabledPackIds.includes(card.packId)
        )
        console.log(`Loaded ${cards.value.length} cards from ${packStore.enabledPackIds.length} enabled pack(s)`)

        // Count cards without packId (only warn if there are any)
        const cardsWithoutPackId = allCards.filter(card => !card.packId).length
        if (cardsWithoutPackId > 0) {
          console.warn(`⚠️ Found ${cardsWithoutPackId} cards without packId - use "Reinitialize Database" in Settings to fix`)
        }
      } else {
        // No packs enabled, show no cards
        cards.value = []
        console.log('No packs enabled - no cards loaded')
      }
    } catch (error) {
      console.error('Failed to load cards:', error)
    } finally {
      loading.value = false
    }
  }

  async function addCard(cardData) {
    const card = createCard(cardData)
    await db.saveCard(card)
    cards.value.push(card)
    return card
  }

  async function addCards(cardsData) {
    const newCards = cardsData.map(data => createCard(data))
    await db.saveCards(newCards)
    cards.value.push(...newCards)
    return newCards
  }

  async function updateCard(id, updates) {
    const card = cards.value.find(c => c.id === id)
    if (!card) return

    const updatedCard = {
      ...card,
      ...updates,
      updatedAt: new Date().toISOString()
    }

    await db.saveCard(updatedCard)
    const index = cards.value.findIndex(c => c.id === id)
    cards.value[index] = updatedCard
    return updatedCard
  }

  async function reviewCard(id, rating) {
    const cardIndex = cards.value.findIndex(c => c.id === id)
    if (cardIndex === -1) return

    const card = cards.value[cardIndex]
    const updatedCard = updateCardSchedule(card, rating)

    // Convert to plain object for IndexedDB (can't store Vue Proxies)
    const plainCard = JSON.parse(JSON.stringify(updatedCard))

    // Update in database
    await db.saveCard(plainCard)

    // Update in local array
    cards.value[cardIndex] = plainCard

    return plainCard
  }

  async function removeCard(id) {
    await db.deleteCard(id)
    cards.value = cards.value.filter(c => c.id !== id)
  }

  function getCard(id) {
    return cards.value.find(c => c.id === id)
  }

  return {
    cards,
    loading,
    cardsByDeck,
    cardsByDomain,
    dueCards,
    cardsDueToday,
    nextCard,
    cardsByTopic,
    availableDomains,
    availableTopics,
    loadCards,
    addCard,
    addCards,
    updateCard,
    reviewCard,
    removeCard,
    getCard
  }
})
