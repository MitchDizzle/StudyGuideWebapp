import { CardType, Difficulty } from '@/types'

// Placeholder Network+ cards - Networking Fundamentals domain
export const networkingFundamentalsCards = [
  {
    type: CardType.DEFINITION,
    front: 'What is the OSI Model?',
    back: 'A conceptual framework with 7 layers (Physical, Data Link, Network, Transport, Session, Presentation, Application) that standardizes network communication functions. Each layer has specific responsibilities for data transmission.',
    domain: 'Networking Fundamentals',
    topic: 'OSI Model',
    difficulty: Difficulty.EASY
  },
  {
    type: CardType.DEFINITION,
    front: 'What is the difference between TCP and UDP?',
    back: 'TCP (Transmission Control Protocol) is connection-oriented, reliable, with error checking and ordered delivery. UDP (User Datagram Protocol) is connectionless, faster but unreliable, with no error checking or guaranteed delivery.',
    domain: 'Networking Fundamentals',
    topic: 'Transport Protocols',
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.SCENARIO,
    scenario: 'A company needs to segment their network to separate guest WiFi from internal resources. Which device should they use?',
    options: [
      'Hub',
      'Switch with VLANs',
      'Repeater',
      'Bridge'
    ],
    correctAnswer: 1,
    explanation: 'A switch with VLANs (Virtual Local Area Networks) can logically segment a network, separating guest WiFi traffic from internal resources while using the same physical infrastructure. This provides both security and efficiency.',
    domain: 'Networking Fundamentals',
    topic: 'Network Devices',
    difficulty: Difficulty.MEDIUM
  }
]
