import * as db from '@/db'
import { useDeckStore } from '@/stores/deck'
import { useCardStore } from '@/stores/card'
import { allSecurityPlusCards } from '@/data/domains'
import { createDeck } from '@/types'

export async function initializeApp() {
  await db.initDB()

  const deckStore = useDeckStore()
  const cardStore = useCardStore()

  await deckStore.loadDecks()
  await cardStore.loadCards()

  console.log('=== App Initialization ===')
  console.log('Decks in database:', deckStore.decks.length)
  console.log('Cards in database:', cardStore.cards.length)
  console.log('All Security+ cards available:', allSecurityPlusCards.length)

  if (deckStore.decks.length === 0) {
    console.log('No decks found. Initializing default Security+ deck...')

    const deck = createDeck({
      name: 'Security+ SY0-701',
      description: 'CompTIA Security+ SY0-701 certification study deck',
      isDefault: true
    })
    await deckStore.addDeck(deck)
    deckStore.setCurrentDeck(deck.id)

    const cards = allSecurityPlusCards.map(cardData => ({
      ...cardData,
      deckId: deck.id
    }))

    await cardStore.addCards(cards)

    console.log(`Initialized with ${cards.length} Security+ cards across all domains`)
  } else {
    console.log('Existing deck found. Loading cards...')
    const defaultDeck = deckStore.defaultDeck || deckStore.decks[0]
    deckStore.setCurrentDeck(defaultDeck.id)

    // Check if we need to add missing cards
    if (cardStore.cards.length < allSecurityPlusCards.length) {
      console.warn(`WARNING: Only ${cardStore.cards.length} of ${allSecurityPlusCards.length} cards found in database!`)
      console.log('Adding missing cards...')

      const existingCardFronts = new Set(cardStore.cards.map(c => c.front))
      const missingCards = allSecurityPlusCards.filter(c => !existingCardFronts.has(c.front))

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
