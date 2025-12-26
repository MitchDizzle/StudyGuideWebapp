// Central pack registry
import { securityPlusPack, allSecurityPlusCards } from './security-plus'
import { networkPlusPack, allNetworkPlusCards } from './network-plus'

// All available packs
export const availablePacks = [
  {
    ...securityPlusPack,
    cards: allSecurityPlusCards,
    cardCount: allSecurityPlusCards.length
  },
  {
    ...networkPlusPack,
    cards: allNetworkPlusCards,
    cardCount: allNetworkPlusCards.length
  }
  // Future packs can be added here
]

// Get all cards from enabled packs
export function getEnabledCards(enabledPackIds = []) {
  return availablePacks
    .filter(pack => enabledPackIds.includes(pack.id))
    .flatMap(pack => pack.cards.map(card => ({
      ...card,
      packId: pack.id,
      packName: pack.name
    })))
}

// Get pack by ID
export function getPackById(packId) {
  return availablePacks.find(pack => pack.id === packId)
}

// Default export for backwards compatibility
export { allSecurityPlusCards }
