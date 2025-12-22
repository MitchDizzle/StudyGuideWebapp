import { CardType, Domain, Difficulty } from '@/types'

// Domain 3: Implementation (25% of exam)
export const implementationCards = [
  // Definition Cards
  {
    type: CardType.DEFINITION,
    front: 'What is Multi-Factor Authentication (MFA)?',
    back: 'An authentication method requiring two or more verification factors: something you know (password), something you have (token), or something you are (biometric).',
    domain: Domain.IMPLEMENTATION,
    topic: 'IAM',
    difficulty: Difficulty.EASY
  },
  {
    type: CardType.DEFINITION,
    front: 'What is Public Key Infrastructure (PKI)?',
    back: 'A framework for creating, managing, distributing, and revoking digital certificates. It enables secure encrypted communications and digital signatures using asymmetric encryption.',
    domain: Domain.IMPLEMENTATION,
    topic: 'Cryptography',
    difficulty: Difficulty.HARD
  },
  {
    type: CardType.DEFINITION,
    front: 'What is the difference between symmetric and asymmetric encryption?',
    back: 'Symmetric uses the same key for encryption and decryption (fast, good for bulk data). Asymmetric uses a public/private key pair (slower, good for key exchange and digital signatures).',
    domain: Domain.IMPLEMENTATION,
    topic: 'Cryptography',
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: 'What is a Certificate Authority (CA)?',
    back: 'A trusted third party that issues and manages digital certificates, verifying the identity of certificate holders and maintaining certificate revocation lists.',
    domain: Domain.IMPLEMENTATION,
    topic: 'Cryptography',
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: 'What is the purpose of HIDS vs NIDS?',
    back: 'HIDS (Host-based IDS) monitors a single host for suspicious activity. NIDS (Network-based IDS) monitors network traffic across the entire network. Both detect intrusions but at different levels.',
    domain: Domain.IMPLEMENTATION,
    topic: 'Security Tools',
    difficulty: Difficulty.MEDIUM
  },

  // Scenario Multiple Choice Cards
  {
    type: CardType.SCENARIO,
    scenario: 'You need to encrypt data at rest on multiple servers. The solution must be fast and suitable for large amounts of data. Which approach is best?',
    options: [
      'RSA encryption for all data',
      'AES symmetric encryption',
      'Use hashing instead of encryption',
      'Asymmetric encryption with 4096-bit keys'
    ],
    correctAnswer: 1,
    explanation: 'AES (Advanced Encryption Standard) is a symmetric encryption algorithm that is very fast and efficient for encrypting large amounts of data at rest. RSA and other asymmetric algorithms are too slow for bulk encryption.',
    domain: Domain.IMPLEMENTATION,
    topic: 'Cryptography',
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.SCENARIO,
    scenario: 'An application needs to verify that downloaded files have not been tampered with. Which cryptographic function should be used?',
    options: [
      'Symmetric encryption',
      'Asymmetric encryption',
      'Hashing (e.g., SHA-256)',
      'Digital signature'
    ],
    correctAnswer: 2,
    explanation: 'Hashing creates a unique fixed-size output (hash/digest) for any input. If the file is modified, the hash changes, allowing integrity verification. SHA-256 is commonly used for file integrity checks.',
    domain: Domain.IMPLEMENTATION,
    topic: 'Cryptography',
    difficulty: Difficulty.MEDIUM
  },

  // Drag and Drop Cards
  {
    type: CardType.DRAGDROP,
    instructions: 'Match each authentication factor type to its example:',
    targets: [
      { label: 'Something You Know', correctItem: 'Password or PIN' },
      { label: 'Something You Have', correctItem: 'Smart card or security token' },
      { label: 'Something You Are', correctItem: 'Fingerprint or facial recognition' },
      { label: 'Somewhere You Are', correctItem: 'Geolocation or IP address' }
    ],
    items: [
      'Password or PIN',
      'Smart card or security token',
      'Fingerprint or facial recognition',
      'Geolocation or IP address'
    ],
    explanation: 'Authentication factors fall into categories. Knowledge factors (passwords), possession factors (tokens), inherence factors (biometrics), and location factors (geolocation) can be combined for multi-factor authentication.',
    domain: Domain.IMPLEMENTATION,
    topic: 'IAM',
    difficulty: Difficulty.MEDIUM
  }
]
