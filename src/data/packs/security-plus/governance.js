import { CardType, Domain, Difficulty } from '@/types'

// Domain 5: Governance, Risk, and Compliance (14% of exam)
export const governanceCards = [
  // Definition Cards
  {
    type: CardType.DEFINITION,
    front: 'What is the difference between quantitative and qualitative risk assessment?',
    back: 'Quantitative uses numerical values and calculations (like ALE = SLE × ARO). Qualitative uses descriptive ratings (high/medium/low). Quantitative is more precise but harder to calculate.',
    domain: Domain.GOVERNANCE,
    topic: 'Risk Management',
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: 'What is GDPR?',
    back: 'General Data Protection Regulation - EU law governing data protection and privacy. It requires organizations to protect personal data and privacy of EU citizens, with significant penalties for violations.',
    domain: Domain.GOVERNANCE,
    topic: 'Compliance',
    difficulty: Difficulty.EASY
  },
  {
    type: CardType.DEFINITION,
    front: 'What is the difference between ARO and SLE in risk calculations?',
    back: 'ARO (Annual Rate of Occurrence) is how many times a threat is expected per year. SLE (Single Loss Expectancy) is the cost of a single occurrence. Together they calculate ALE (Annual Loss Expectancy).',
    domain: Domain.GOVERNANCE,
    topic: 'Risk Management',
    difficulty: Difficulty.HARD
  },
  {
    type: CardType.DEFINITION,
    front: 'Define the four risk response strategies',
    back: 'Risk Avoidance (eliminate), Risk Mitigation (reduce), Risk Transfer (shift to third party), and Risk Acceptance (acknowledge and monitor). Choice depends on cost, impact, and business priorities.',
    domain: Domain.GOVERNANCE,
    topic: 'Risk Management',
    difficulty: Difficulty.MEDIUM
  },

  // Scenario Multiple Choice Cards
  {
    type: CardType.SCENARIO,
    scenario: 'A vulnerability scan reveals a critical vulnerability in a production server, but patching requires 4 hours of downtime during business hours. What is the best approach?',
    options: [
      'Ignore the vulnerability until the next maintenance window',
      'Immediately patch without notification',
      'Implement compensating controls while scheduling patching',
      'Disconnect the server from the network indefinitely'
    ],
    correctAnswer: 2,
    explanation: 'Implementing compensating controls (like additional firewall rules, IPS signatures, or network segmentation) provides temporary protection while you plan proper patching during an appropriate maintenance window with proper notification.',
    domain: Domain.GOVERNANCE,
    topic: 'Risk Management',
    difficulty: Difficulty.HARD
  },

  // Drag and Drop Cards
  {
    type: CardType.DRAGDROP,
    instructions: 'Match each compliance framework to its primary focus:',
    targets: [
      { label: 'HIPAA', correctItem: 'Healthcare data protection' },
      { label: 'PCI DSS', correctItem: 'Payment card data security' },
      { label: 'SOX', correctItem: 'Financial reporting and corporate governance' },
      { label: 'GDPR', correctItem: 'EU personal data protection and privacy' }
    ],
    items: [
      'Healthcare data protection',
      'Payment card data security',
      'Financial reporting and corporate governance',
      'EU personal data protection and privacy'
    ],
    explanation: 'Different compliance frameworks target different industries and data types. HIPAA=healthcare, PCI DSS=payment cards, SOX=financial reporting, GDPR=EU personal data.',
    domain: Domain.GOVERNANCE,
    topic: 'Compliance',
    difficulty: Difficulty.MEDIUM
  }
]
