import { CardType, Domain, Difficulty } from '@/types'

// Domain 4: Operations and Incident Response (16% of exam)
export const operationsCards = [
  // Definition Cards
  {
    type: CardType.DEFINITION,
    front: 'What is Chain of Custody?',
    back: 'The chronological documentation of the seizure, custody, control, transfer, analysis, and disposition of evidence. It ensures evidence integrity for legal proceedings.',
    domain: Domain.OPERATIONS,
    topic: 'Digital Forensics',
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: 'What is the purpose of a Security Information and Event Management (SIEM) system?',
    back: 'A SIEM aggregates and analyzes security logs and events from multiple sources in real-time, providing centralized monitoring, alerting, and forensic analysis capabilities.',
    domain: Domain.OPERATIONS,
    topic: 'Security Tools',
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: 'What is a Honeypot?',
    back: 'A decoy system designed to attract attackers, allowing security teams to study attack methods and divert attackers from real systems.',
    domain: Domain.OPERATIONS,
    topic: 'Security Tools',
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: 'What are the phases of the Incident Response lifecycle?',
    back: 'Preparation, Identification, Containment, Eradication, Recovery, and Lessons Learned. This systematic approach ensures effective handling of security incidents.',
    domain: Domain.OPERATIONS,
    topic: 'Incident Response',
    difficulty: Difficulty.MEDIUM
  },

  // Scenario Multiple Choice Cards
  {
    type: CardType.SCENARIO,
    scenario: 'During an incident investigation, you discover a compromised server that is actively being used by an attacker. What should be your immediate priority?',
    options: [
      'Immediately power off the server to stop the attack',
      'Isolate the server from the network while preserving evidence',
      'Change all passwords on the server',
      'Delete the attacker\'s files and backdoors'
    ],
    correctAnswer: 1,
    explanation: 'Containment by isolating the server prevents further damage while preserving evidence in memory. Powering off loses volatile memory data. The priority is to contain while preserving evidence for investigation.',
    domain: Domain.OPERATIONS,
    topic: 'Incident Response',
    difficulty: Difficulty.HARD
  },

  // Drag and Drop Cards
  {
    type: CardType.DRAGDROP,
    instructions: 'Place the Incident Response phases in the correct order:',
    targets: [
      { label: 'Step 1', correctItem: 'Preparation' },
      { label: 'Step 2', correctItem: 'Identification' },
      { label: 'Step 3', correctItem: 'Containment' },
      { label: 'Step 4', correctItem: 'Eradication' },
      { label: 'Step 5', correctItem: 'Recovery' },
      { label: 'Step 6', correctItem: 'Lessons Learned' }
    ],
    items: [
      'Preparation',
      'Identification',
      'Containment',
      'Eradication',
      'Recovery',
      'Lessons Learned'
    ],
    explanation: 'The NIST Incident Response lifecycle: Preparation → Identification → Containment → Eradication → Recovery → Lessons Learned. This systematic approach ensures effective incident handling.',
    domain: Domain.OPERATIONS,
    topic: 'Incident Response',
    difficulty: Difficulty.HARD
  }
]
