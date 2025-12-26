import { CardType, Domain, Difficulty } from '@/types'

// Domain 2: Architecture and Design (21% of exam)
export const architectureCards = [
  // Definition Cards
  {
    type: CardType.DEFINITION,
    front: 'What is the principle of Least Privilege?',
    back: 'Users and systems should be granted only the minimum levels of access necessary to perform their job functions. This limits potential damage from accidents or malicious actions.',
    domain: Domain.ARCHITECTURE,
    topic: 'Security Principles',
    difficulty: Difficulty.EASY
  },
  {
    type: CardType.DEFINITION,
    front: 'Define Defense in Depth',
    back: 'A security strategy that employs multiple layers of security controls throughout an IT system. If one layer fails, others continue to provide protection.',
    domain: Domain.ARCHITECTURE,
    topic: 'Security Principles',
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: 'What is Network Segmentation?',
    back: 'Dividing a network into multiple segments or subnets to improve performance and security. It limits the spread of attacks and reduces the attack surface.',
    domain: Domain.ARCHITECTURE,
    topic: 'Network Security',
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: 'What is a DMZ (Demilitarized Zone)?',
    back: 'A physical or logical subnet that separates an internal network from untrusted networks (like the Internet). It typically contains public-facing services like web servers.',
    domain: Domain.ARCHITECTURE,
    topic: 'Network Security',
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: 'What is Zero Trust Architecture?',
    back: 'A security model that assumes no user or device should be trusted by default, even if inside the network perimeter. Every access request must be verified.',
    domain: Domain.ARCHITECTURE,
    topic: 'Security Models',
    difficulty: Difficulty.HARD
  },
  {
    type: CardType.DEFINITION,
    front: 'What is an Air Gap?',
    back: 'A security measure where a computer or network is physically isolated from unsecured networks, including the internet, with no network connectivity.',
    domain: Domain.ARCHITECTURE,
    topic: 'Physical Security',
    difficulty: Difficulty.MEDIUM
  },

  // Scenario Multiple Choice Cards
  {
    type: CardType.SCENARIO,
    scenario: 'Your organization wants to allow employees to access internal resources from home while maintaining security. Which solution provides the best balance of security and accessibility?',
    options: [
      'Open all ports on the firewall for remote access',
      'Implement a VPN with multi-factor authentication',
      'Use RDP with password authentication only',
      'Create a public-facing portal without encryption'
    ],
    correctAnswer: 1,
    explanation: 'A VPN with multi-factor authentication provides encrypted tunneling and strong authentication. This is the most secure method for remote access while maintaining usability.',
    domain: Domain.ARCHITECTURE,
    topic: 'Remote Access',
    difficulty: Difficulty.EASY
  },
  {
    type: CardType.SCENARIO,
    scenario: 'A company wants to host a public web server while protecting internal resources. Which network architecture should they implement?',
    options: [
      'Place the web server on the internal network',
      'Place the web server in a DMZ with firewall rules',
      'Place the web server directly on the internet without firewall',
      'Place the web server on a separate VLAN with the database'
    ],
    correctAnswer: 1,
    explanation: 'A DMZ (Demilitarized Zone) is specifically designed for this scenario. It isolates public-facing servers from the internal network while controlling traffic with firewall rules.',
    domain: Domain.ARCHITECTURE,
    topic: 'Network Security',
    difficulty: Difficulty.MEDIUM
  },

  // Drag and Drop Cards
  {
    type: CardType.DRAGDROP,
    instructions: 'Match each CIA Triad component to its definition:',
    targets: [
      { label: 'Confidentiality', correctItem: 'Ensuring information is accessible only to authorized individuals' },
      { label: 'Integrity', correctItem: 'Ensuring information remains accurate and unaltered' },
      { label: 'Availability', correctItem: 'Ensuring information and systems are accessible when needed' }
    ],
    items: [
      'Ensuring information is accessible only to authorized individuals',
      'Ensuring information remains accurate and unaltered',
      'Ensuring information and systems are accessible when needed'
    ],
    explanation: 'The CIA Triad is foundational to information security. Confidentiality protects against unauthorized disclosure, Integrity protects against unauthorized modification, and Availability ensures authorized access.',
    domain: Domain.ARCHITECTURE,
    topic: 'Security Principles',
    difficulty: Difficulty.EASY
  }
]
