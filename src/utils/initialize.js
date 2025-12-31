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

    // Get all cards from database (not filtered by pack)
    const allCardsInDB = await db.getAllCards()

    // Remove cards from disabled packs AND cards without packId (orphaned cards)
    const cardsToRemove = allCardsInDB.filter(card =>
      !card.packId || !packStore.enabledPackIds.includes(card.packId)
    )

    if (cardsToRemove.length > 0) {
      for (const card of cardsToRemove) {
        await db.deleteCard(card.id)
      }
      const orphanedCount = allCardsInDB.filter(c => !c.packId).length
      if (orphanedCount > 0) {
        console.log(`🗑️ Removed ${cardsToRemove.length} cards (${orphanedCount} orphaned cards without packId, ${cardsToRemove.length - orphanedCount} from disabled packs)`)
      } else {
        console.log(`🗑️ Removed ${cardsToRemove.length} cards from disabled packs`)
      }
      // Reload cards after removal
      await cardStore.loadCards()
    }

    // Helper function to get unique identifier for a card based on its type
    const getCardKey = (card) => {
      const packId = card.packId || 'unknown'
      // Use different fields based on card type
      if (card.type === 'scenario') {
        return `${packId}:scenario:${card.scenario}`
      } else if (card.type === 'dragdrop') {
        return `${packId}:dragdrop:${card.instructions}`
      } else {
        // definition type
        return `${packId}:definition:${card.front}`
      }
    }

    // Check if we need to add missing cards from enabled packs
    // Use card type-specific fields to create unique identifiers
    const existingCardKeys = new Set(
      cardStore.cards.map(c => getCardKey(c))
    )

    const missingCards = allAvailableCards.filter(c =>
      !existingCardKeys.has(getCardKey(c))
    )

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
