import { securityPlusPack } from './pack'
import { threatsCards, metadata as threatsMetadata } from './threats'
import { architectureCards, metadata as architectureMetadata } from './architecture'
import { implementationCards, metadata as implementationMetadata } from './implementation'
import { operationsCards, metadata as operationsMetadata } from './operations'
import { governanceCards, metadata as governanceMetadata } from './governance'

// Helper to apply domain metadata to cards
const applyDomain = (cards, metadata) =>
  cards.map(card => ({ ...card, domain: metadata.domain }))

// Export all cards combined with domain metadata applied
export const allSecurityPlusCards = [
  ...applyDomain(threatsCards, threatsMetadata),
  ...applyDomain(architectureCards, architectureMetadata),
  ...applyDomain(implementationCards, implementationMetadata),
  ...applyDomain(operationsCards, operationsMetadata),
  ...applyDomain(governanceCards, governanceMetadata)
]

// Export pack metadata
export { securityPlusPack }

// Export individual domains for domain-specific loading
export {
  threatsCards,
  architectureCards,
  implementationCards,
  operationsCards,
  governanceCards
}

// Domain metadata for tracking
export const domainInfo = {
  threats: {
    name: threatsMetadata.domain,
    examWeight: '24%',
    cards: applyDomain(threatsCards, threatsMetadata),
    description: 'Compare and contrast different types of social engineering, attacks, threats, and vulnerabilities'
  },
  architecture: {
    name: architectureMetadata.domain,
    examWeight: '21%',
    cards: applyDomain(architectureCards, architectureMetadata),
    description: 'Explain the importance of security concepts in enterprise architecture'
  },
  implementation: {
    name: implementationMetadata.domain,
    examWeight: '25%',
    cards: applyDomain(implementationCards, implementationMetadata),
    description: 'Implement secure protocols and host/application security solutions'
  },
  operations: {
    name: operationsMetadata.domain,
    examWeight: '16%',
    cards: applyDomain(operationsCards, operationsMetadata),
    description: 'Explain security operations, monitoring, and incident response procedures'
  },
  governance: {
    name: governanceMetadata.domain,
    examWeight: '14%',
    cards: applyDomain(governanceCards, governanceMetadata),
    description: 'Summarize risk management and privacy/compliance concepts'
  }
}
