import * as db from '@/db'
import { useDeckStore } from '@/stores/deck'
import { useCardStore } from '@/stores/card'
import { usePackStore } from '@/stores/pack'
import { availablePacks, getEnabledCards } from '@/data/packs'
import { createDeck } from '@/types'

export async function initializeApp() {
  await db.initDB()

  const deckStore = useDeckStore()
  const cardStore = useCardStore()
  const packStore = usePackStore()

  // Load pack settings first
  await packStore.loadSettings()

  await deckStore.loadDecks()
  await cardStore.loadCards()

  // Get all cards from enabled packs
  const allAvailableCards = getEnabledCards(packStore.enabledPackIds)

  console.log('=== App Initialization ===')
  console.log('Available packs:', availablePacks.length)
  console.log('Decks in database:', deckStore.decks.length)
  console.log('Cards in database:', cardStore.cards.length)
  console.log('All available cards:', allAvailableCards.length)

  if (deckStore.decks.length === 0) {
    console.log('No decks found. Initializing default packs...')

    // Initialize decks for each available pack
    for (const pack of availablePacks) {
      const deck = createDeck({
        name: pack.name,
        description: pack.description,
        isDefault: pack.isDefault || false
      })
      await deckStore.addDeck(deck)

      if (pack.isDefault) {
        deckStore.setCurrentDeck(deck.id)
      }

      const cards = pack.cards.map(cardData => ({
        ...cardData,
        deckId: deck.id,
        packId: pack.id
      }))

      await cardStore.addCards(cards)
      console.log(`Initialized ${pack.name} with ${cards.length} cards`)
    }
  } else {
    console.log('Existing deck found. Loading cards...')
    const defaultDeck = deckStore.defaultDeck || deckStore.decks[0]
    deckStore.setCurrentDeck(defaultDeck.id)

    // Check if we need to add missing cards
    if (cardStore.cards.length < allAvailableCards.length) {
      console.warn(`WARNING: Only ${cardStore.cards.length} of ${allAvailableCards.length} cards found in database!`)
      console.log('Adding missing cards...')

      const existingCardFronts = new Set(cardStore.cards.map(c => c.front))
      const missingCards = allAvailableCards.filter(c => !existingCardFronts.has(c.front))

      if (missingCards.length > 0) {
        const cardsToAdd = missingCards.map(cardData => ({
          ...cardData,
          deckId: defaultDeck.id
        }))
        await cardStore.addCards(cardsToAdd)
        console.log(`Added ${cardsToAdd.length} missing cards`)
      }
    }

    console.log(`Final card count: ${cardStore.cards.length}`)
  }
}
