import { networkPlusPack } from './pack'
import { networkingFundamentalsCards, metadata as networkingFundamentalsMetadata } from './networking-fundamentals'

// Helper to apply domain metadata to cards
const applyDomain = (cards, metadata) =>
  cards.map(card => ({ ...card, domain: metadata.domain }))

// Export all cards combined with domain metadata applied
export const allNetworkPlusCards = [
  ...applyDomain(networkingFundamentalsCards, networkingFundamentalsMetadata)
  // Add more domain cards as they are created
]

// Export pack metadata
export { networkPlusPack }

// Export individual domains for domain-specific loading
export {
  networkingFundamentalsCards
}
