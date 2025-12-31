import { CardType, Difficulty } from '@/types'

// Domain 3: Implementation (25% of exam)
export const metadata = {
  domain: 'Implementation'}

export const implementationCards = [
  // Definition Cards
  {
    type: CardType.DEFINITION,
    front: 'What is Multi-Factor Authentication (MFA)?',
    back: 'An authentication method requiring two or more verification factors: something you know (password), something you have (token), or something you are (biometric).',
    topic: 'IAM',
    difficulty: Difficulty.EASY
  },
  {
    type: CardType.DEFINITION,
    front: 'What is Public Key Infrastructure (PKI)?',
    back: 'A framework for creating, managing, distributing, and revoking digital certificates. It enables secure encrypted communications and digital signatures using asymmetric encryption.',
    topic: 'Cryptography',
    difficulty: Difficulty.HARD
  },
  {
    type: CardType.DEFINITION,
    front: 'What is the difference between symmetric and asymmetric encryption?',
    back: 'Symmetric uses the same key for encryption and decryption (fast, good for bulk data). Asymmetric uses a public/private key pair (slower, good for key exchange and digital signatures).',
    topic: 'Cryptography',
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: 'What is a Certificate Authority (CA)?',
    back: 'A trusted third party that issues and manages digital certificates, verifying the identity of certificate holders and maintaining certificate revocation lists.',
    topic: 'Cryptography',
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: 'What is the purpose of HIDS vs NIDS?',
    back: 'HIDS (Host-based IDS) monitors a single host for suspicious activity. NIDS (Network-based IDS) monitors network traffic across the entire network. Both detect intrusions but at different levels.',
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
    topic: 'Cryptography',
    difficulty: Difficulty.MEDIUM
  },

  {
    type: CardType.DEFINITION,
    front: 'What is the difference between HTTPS and HTTP?',
    back: 'HTTPS (HTTP Secure) encrypts data in transit using TLS/SSL, protecting confidentiality and integrity. HTTP transmits data in plaintext. HTTPS uses port 443, HTTP uses port 80.',
    topic: 'Secure Protocols',
    difficulty: Difficulty.EASY
  },
  {
    type: CardType.DEFINITION,
    front: 'What is WPA3 and how does it improve on WPA2?',
    back: 'WPA3 is the latest WiFi security standard. Improvements over WPA2 include: stronger encryption (192-bit), protection against brute-force attacks, individualized data encryption (SAE), and forward secrecy.',
    topic: 'Wireless Security',
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: 'What is 802.1X?',
    back: 'A network access control protocol that provides authentication for devices trying to connect to a LAN or WLAN. Uses EAP (Extensible Authentication Protocol) and RADIUS for centralized authentication.',
    topic: 'Network Security',
    difficulty: Difficulty.HARD
  },
  {
    type: CardType.DEFINITION,
    front: 'What is a VPN and what are the two main types?',
    back: 'Virtual Private Network creates encrypted tunnels over public networks. Site-to-site VPN connects entire networks. Remote access VPN connects individual users to a network. Common protocols: IPSec, SSL/TLS.',
    topic: 'Network Security',
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: 'What is SSO (Single Sign-On)?',
    back: 'Authentication scheme allowing users to log in once and access multiple applications without re-authenticating. Improves user experience and security, but creates a single point of failure. Examples: SAML, OAuth.',
    topic: 'IAM',
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: 'What is the difference between IDS and IPS?',
    back: 'IDS (Intrusion Detection System) monitors and alerts on suspicious activity. IPS (Intrusion Prevention System) can actively block/prevent threats. IPS is inline with traffic, IDS passively monitors.',
    topic: 'Security Tools',
    difficulty: Difficulty.EASY
  },
  {
    type: CardType.DEFINITION,
    front: 'What are SPF, DKIM, and DMARC?',
    back: 'Email authentication protocols. SPF specifies authorized mail servers. DKIM adds digital signatures to verify sender. DMARC ties them together and defines policy for handling failures. All combat email spoofing.',
    topic: 'Email Security',
    difficulty: Difficulty.HARD
  },
  {
    type: CardType.DEFINITION,
    front: 'What is a DMZ (Demilitarized Zone)?',
    back: 'A network segment that sits between the internal trusted network and untrusted external networks. Hosts public-facing services (web, email servers) with restricted access to internal resources.',
    topic: 'Network Security',
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: 'What is MDM (Mobile Device Management)?',
    back: 'Software that manages, monitors, and secures mobile devices. Features include remote wipe, app management, encryption enforcement, and policy compliance. Critical for BYOD environments.',
    topic: 'Mobile Security',
    difficulty: Difficulty.EASY
  },
  {
    type: CardType.SCENARIO,
    scenario: 'Your company needs to allow employees to access internal resources from personal devices (BYOD). What security measures should you implement?',
    options: [
      'Allow direct access with just a password',
      'VPN with MFA, MDM, and network segmentation',
      'Ban all personal devices completely',
      'Only allow access during business hours'
    ],
    correctAnswer: 1,
    explanation: 'BYOD requires layered security: VPN encrypts traffic, MFA verifies users, MDM manages device security, and network segmentation limits access to only necessary resources. This balances security with business needs.',
    topic: 'Mobile Security',
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.SCENARIO,
    scenario: 'You need to protect web servers from attackers while allowing legitimate traffic. What should you deploy?',
    options: [
      'Antivirus software',
      'Web Application Firewall (WAF)',
      'Standard network firewall only',
      'IDS in passive mode'
    ],
    correctAnswer: 1,
    explanation: 'WAF specifically protects web applications by filtering and monitoring HTTP/HTTPS traffic. It defends against attacks like SQL injection, XSS, and CSRF. Standard firewalls work at network layer; WAF works at application layer.',
    topic: 'Security Tools',
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: 'What is perfect forward secrecy (PFS)?',
    back: 'A cryptographic property ensuring session keys are not compromised even if the server\'s private key is compromised. Each session generates unique encryption keys that are discarded after use.',
    topic: 'Cryptography',
    difficulty: Difficulty.HARD
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
    topic: 'IAM',
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DRAGDROP,
    instructions: 'Match each wireless security protocol to its key feature:',
    targets: [
      { label: 'WEP', correctItem: 'Outdated, easily cracked, uses RC4' },
      { label: 'WPA', correctItem: 'TKIP encryption, temporary solution' },
      { label: 'WPA2', correctItem: 'AES encryption, enterprise standard' },
      { label: 'WPA3', correctItem: 'SAE authentication, strongest current standard' }
    ],
    items: [
      'Outdated, easily cracked, uses RC4',
      'TKIP encryption, temporary solution',
      'AES encryption, enterprise standard',
      'SAE authentication, strongest current standard'
    ],
    explanation: 'Wireless security has evolved: WEP (deprecated), WPA (transitional), WPA2 (current standard with AES), WPA3 (latest with SAE and enhanced protection). Always use WPA2 or WPA3.',
    topic: 'Wireless Security',
    difficulty: Difficulty.MEDIUM
  }
]
