import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import * as db from '@/db'
import { createCard } from '@/types'
import { updateCardSchedule, getDueCards, getCardsDueToday, getNextCard } from '@/utils/spacedRepetition'

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

  async function loadCards() {
    loading.value = true
    try {
      cards.value = await db.getAllCards()
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
    const card = cards.value.find(c => c.id === id)
    if (!card) return

    const updatedCard = updateCardSchedule(card, rating)
    await db.saveCard(updatedCard)

    const index = cards.value.findIndex(c => c.id === id)
    cards.value[index] = updatedCard
    return updatedCard
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
    loadCards,
    addCard,
    addCards,
    updateCard,
    reviewCard,
    removeCard,
    getCard
  }
})
