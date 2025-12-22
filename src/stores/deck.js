import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import * as db from '@/db'
import { createDeck } from '@/types'

export const useDeckStore = defineStore('deck', () => {
  const decks = ref([])
  const currentDeckId = ref(null)
  const loading = ref(false)

  const currentDeck = computed(() => {
    return decks.value.find(d => d.id === currentDeckId.value) || null
  })

  const defaultDeck = computed(() => {
    return decks.value.find(d => d.isDefault) || null
  })

  async function loadDecks() {
    loading.value = true
    try {
      decks.value = await db.getAllDecks()
    } catch (error) {
      console.error('Failed to load decks:', error)
    } finally {
      loading.value = false
    }
  }

  async function addDeck(deckData) {
    const deck = createDeck(deckData)
    await db.saveDeck(deck)
    decks.value.push(deck)
    return deck
  }

  async function updateDeck(id, updates) {
    const deck = decks.value.find(d => d.id === id)
    if (!deck) return

    const updatedDeck = {
      ...deck,
      ...updates,
      updatedAt: new Date().toISOString()
    }

    await db.saveDeck(updatedDeck)
    const index = decks.value.findIndex(d => d.id === id)
    decks.value[index] = updatedDeck
    return updatedDeck
  }

  async function removeDeck(id) {
    await db.deleteDeck(id)
    decks.value = decks.value.filter(d => d.id !== id)
  }

  function setCurrentDeck(id) {
    currentDeckId.value = id
  }

  return {
    decks,
    currentDeckId,
    currentDeck,
    defaultDeck,
    loading,
    loadDecks,
    addDeck,
    updateDeck,
    removeDeck,
    setCurrentDeck
  }
})
