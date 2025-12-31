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

  {
    type: CardType.DEFINITION,
    front: 'What is RTO (Recovery Time Objective)?',
    back: 'The maximum acceptable amount of time that a system can be down after a failure or disaster. It defines how quickly you need to restore operations.',
    domain: Domain.GOVERNANCE,
    topic: 'Business Continuity',
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: 'What is RPO (Recovery Point Objective)?',
    back: 'The maximum acceptable amount of data loss measured in time. It defines how far back your backups need to go to avoid unacceptable data loss.',
    domain: Domain.GOVERNANCE,
    topic: 'Business Continuity',
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: 'What is a BIA (Business Impact Analysis)?',
    back: 'A systematic process to identify and evaluate the potential effects of disruptions to critical business operations. It determines RTOs, RPOs, and critical business functions.',
    domain: Domain.GOVERNANCE,
    topic: 'Business Continuity',
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: 'What are the four levels of data classification (from most to least sensitive)?',
    back: 'Top Secret/Highly Confidential, Secret/Confidential, Internal/Private, Public/Unclassified. Classification drives handling, storage, and access requirements.',
    domain: Domain.GOVERNANCE,
    topic: 'Data Classification',
    difficulty: Difficulty.EASY
  },
  {
    type: CardType.DEFINITION,
    front: 'What is MTTR (Mean Time To Repair)?',
    back: 'The average time required to repair a failed component or system and return it to operational status. Lower MTTR means faster recovery.',
    domain: Domain.GOVERNANCE,
    topic: 'Business Continuity',
    difficulty: Difficulty.EASY
  },
  {
    type: CardType.DEFINITION,
    front: 'What is MTBF (Mean Time Between Failures)?',
    back: 'The predicted elapsed time between inherent failures of a system during normal operation. Higher MTBF indicates more reliable systems.',
    domain: Domain.GOVERNANCE,
    topic: 'Business Continuity',
    difficulty: Difficulty.EASY
  },
  {
    type: CardType.DEFINITION,
    front: 'What is PII (Personally Identifiable Information)?',
    back: 'Information that can be used to identify, contact, or locate a specific individual. Examples: SSN, driver\'s license, email address, biometric data. Requires special protection.',
    domain: Domain.GOVERNANCE,
    topic: 'Privacy',
    difficulty: Difficulty.EASY
  },
  {
    type: CardType.DEFINITION,
    front: 'What is PHI (Protected Health Information)?',
    back: 'Any individually identifiable health information held by covered entities under HIPAA. Includes medical records, billing information, and any health data linked to an individual.',
    domain: Domain.GOVERNANCE,
    topic: 'Privacy',
    difficulty: Difficulty.EASY
  },
  {
    type: CardType.DEFINITION,
    front: 'What is Change Management?',
    back: 'A formal process to ensure changes to IT systems are implemented in a controlled manner. Includes request, approval, testing, implementation, and documentation phases.',
    domain: Domain.GOVERNANCE,
    topic: 'Change Management',
    difficulty: Difficulty.EASY
  },
  {
    type: CardType.SCENARIO,
    scenario: 'Your organization wants to outsource email services to a cloud provider. What should be your primary security concern?',
    options: [
      'The cost of the service',
      'Data sovereignty and jurisdiction',
      'The provider\'s marketing materials',
      'The color scheme of the interface'
    ],
    correctAnswer: 1,
    explanation: 'Data sovereignty (where data is stored and which laws apply) is critical when outsourcing. Different countries have different privacy laws, and you need to ensure compliance with regulations like GDPR.',
    domain: Domain.GOVERNANCE,
    topic: 'Third-Party Risk',
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.SCENARIO,
    scenario: 'During a risk assessment, you identify a threat with a 0.1 ARO and a $50,000 SLE. What is the ALE?',
    options: [
      '$500',
      '$5,000',
      '$50,000',
      '$500,000'
    ],
    correctAnswer: 1,
    explanation: 'ALE (Annual Loss Expectancy) = SLE × ARO = $50,000 × 0.1 = $5,000. This is the expected annual cost of this particular risk.',
    domain: Domain.GOVERNANCE,
    topic: 'Risk Management',
    difficulty: Difficulty.HARD
  },
  {
    type: CardType.DEFINITION,
    front: 'What is the principle of least privilege?',
    back: 'Users should be granted the minimum levels of access - or permissions - needed to perform their job functions. This limits damage from accidents or malicious actions.',
    domain: Domain.GOVERNANCE,
    topic: 'Security Policies',
    difficulty: Difficulty.EASY
  },
  {
    type: CardType.DEFINITION,
    front: 'What is separation of duties?',
    back: 'A security principle where critical tasks are divided among multiple people to prevent fraud and error. No single person should have complete control over a critical function.',
    domain: Domain.GOVERNANCE,
    topic: 'Security Policies',
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: 'What is mandatory vacation policy?',
    back: 'A security control requiring employees to take consecutive days off, during which someone else performs their duties. Helps detect fraud or unauthorized activities.',
    domain: Domain.GOVERNANCE,
    topic: 'Security Policies',
    difficulty: Difficulty.MEDIUM
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
  },
  {
    type: CardType.DRAGDROP,
    instructions: 'Match each risk response strategy to its description:',
    targets: [
      { label: 'Risk Avoidance', correctItem: 'Eliminate the risk entirely by not engaging in the activity' },
      { label: 'Risk Mitigation', correctItem: 'Reduce the likelihood or impact of the risk' },
      { label: 'Risk Transfer', correctItem: 'Shift the risk to a third party (insurance, outsourcing)' },
      { label: 'Risk Acceptance', correctItem: 'Accept the risk when cost of mitigation exceeds the benefit' }
    ],
    items: [
      'Eliminate the risk entirely by not engaging in the activity',
      'Reduce the likelihood or impact of the risk',
      'Shift the risk to a third party (insurance, outsourcing)',
      'Accept the risk when cost of mitigation exceeds the benefit'
    ],
    explanation: 'The four risk response strategies provide different approaches to managing identified risks based on business priorities and cost-benefit analysis.',
    domain: Domain.GOVERNANCE,
    topic: 'Risk Management',
    difficulty: Difficulty.MEDIUM
  }
]
