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

  console.log(`📚 Initialized: ${packStore.enabledPackIds.length} pack(s) enabled, ${deckStore.decks.length} deck(s), ${cardStore.cards.length} card(s) loaded`)

  if (deckStore.decks.length === 0) {
    console.log('No decks found. Initializing enabled packs...')

    // Only initialize decks for enabled packs
    const enabledPacks = availablePacks.filter(pack => packStore.enabledPackIds.includes(pack.id))

    for (const pack of enabledPacks) {
      const deck = createDeck({
        name: pack.name,
        description: pack.description,
        isDefault: pack.isDefault || false
      })
      await deckStore.addDeck(deck)

      if (pack.isDefault || enabledPacks.length === 1) {
        deckStore.setCurrentDeck(deck.id)
      }

      const cards = pack.cards.map(cardData => ({
        ...cardData,
        deckId: deck.id,
        packId: pack.id
      }))

      await cardStore.addCards(cards)
    }
  } else {
    const defaultDeck = deckStore.defaultDeck || deckStore.decks[0]
    deckStore.setCurrentDeck(defaultDeck.id)

    // Check if we need to add missing cards
    if (cardStore.cards.length < allAvailableCards.length) {
      const existingCardFronts = new Set(cardStore.cards.map(c => c.front))
      const missingCards = allAvailableCards.filter(c => !existingCardFronts.has(c.front))

      if (missingCards.length > 0) {
        const cardsToAdd = missingCards.map(cardData => ({
          ...cardData,
          deckId: defaultDeck.id
        }))
        await cardStore.addCards(cardsToAdd)
        console.log(`✨ Added ${cardsToAdd.length} missing cards`)
      }
    }
  }
}
