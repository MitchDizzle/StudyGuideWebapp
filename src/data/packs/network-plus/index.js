import { networkPlusPack } from './pack'
import { networkingFundamentalsCards } from './networking-fundamentals'

// Export all cards combined
export const allNetworkPlusCards = [
  ...networkingFundamentalsCards
  // Add more domain cards as they are created
]

// Export pack metadata
export { networkPlusPack }

// Export individual domains for domain-specific loading
export {
  networkingFundamentalsCards
}
