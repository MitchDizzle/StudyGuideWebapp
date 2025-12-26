import { securityPlusPack } from './pack'
import { threatsCards } from './threats'
import { architectureCards } from './architecture'
import { implementationCards } from './implementation'
import { operationsCards } from './operations'
import { governanceCards } from './governance'

// Export all cards combined
export const allSecurityPlusCards = [
  ...threatsCards,
  ...architectureCards,
  ...implementationCards,
  ...operationsCards,
  ...governanceCards
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
    name: 'Threats, Attacks, and Vulnerabilities',
    examWeight: '24%',
    cards: threatsCards,
    description: 'Compare and contrast different types of social engineering, attacks, threats, and vulnerabilities'
  },
  architecture: {
    name: 'Architecture and Design',
    examWeight: '21%',
    cards: architectureCards,
    description: 'Explain the importance of security concepts in enterprise architecture'
  },
  implementation: {
    name: 'Implementation',
    examWeight: '25%',
    cards: implementationCards,
    description: 'Implement secure protocols and host/application security solutions'
  },
  operations: {
    name: 'Operations and Incident Response',
    examWeight: '16%',
    cards: operationsCards,
    description: 'Explain security operations, monitoring, and incident response procedures'
  },
  governance: {
    name: 'Governance, Risk, and Compliance',
    examWeight: '14%',
    cards: governanceCards,
    description: 'Summarize risk management and privacy/compliance concepts'
  }
}
