import * as db from '@/db'
import { useDeckStore } from '@/stores/deck'
import { useCardStore } from '@/stores/card'
import { securityPlusDeck, securityPlusCards } from '@/data/securityPlusDeck'
import { createDeck } from '@/types'

export async function initializeApp() {
  await db.initDB()

  const deckStore = useDeckStore()
  const cardStore = useCardStore()

  await deckStore.loadDecks()
  await cardStore.loadCards()

  if (deckStore.decks.length === 0) {
    console.log('Initializing default Security+ deck...')

    const deck = createDeck(securityPlusDeck)
    await deckStore.addDeck(deck)
    deckStore.setCurrentDeck(deck.id)

    const cards = securityPlusCards.map(cardData => ({
      ...cardData,
      deckId: deck.id
    }))

    await cardStore.addCards(cards)

    console.log(`Initialized with ${cards.length} Security+ cards`)
  } else {
    const defaultDeck = deckStore.defaultDeck || deckStore.decks[0]
    deckStore.setCurrentDeck(defaultDeck.id)
  }
}
