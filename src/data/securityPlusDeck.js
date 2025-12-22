import { CardType, Domain, Difficulty } from '@/types'

export const securityPlusDeck = {
  name: 'Security+ SY0-701',
  description: 'CompTIA Security+ SY0-701 certification study deck',
  isDefault: true
}

export const securityPlusCards = [
  // Threats, Attacks, and Vulnerabilities - Definition Cards
  {
    type: CardType.DEFINITION,
    front: 'What is a Zero-Day vulnerability?',
    back: 'A security flaw in software that is unknown to the vendor and has no patch available. Attackers can exploit these vulnerabilities before developers are aware of them.',
    domain: Domain.THREATS,
    topic: 'Vulnerabilities',
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: 'Define SQL Injection',
    back: 'A code injection attack where malicious SQL statements are inserted into an entry field, allowing attackers to manipulate or retrieve data from a database.',
    domain: Domain.THREATS,
    topic: 'Application Attacks',
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: 'What is Social Engineering?',
    back: 'The psychological manipulation of people into performing actions or divulging confidential information. Common types include phishing, pretexting, and baiting.',
    domain: Domain.THREATS,
    topic: 'Social Engineering',
    difficulty: Difficulty.EASY
  },
  {
    type: CardType.DEFINITION,
    front: 'What is the difference between XSS and CSRF?',
    back: 'XSS (Cross-Site Scripting) injects malicious scripts into trusted websites to attack users. CSRF (Cross-Site Request Forgery) tricks authenticated users into performing unwanted actions on a different site.',
    domain: Domain.THREATS,
    topic: 'Application Attacks',
    difficulty: Difficulty.HARD
  },
  {
    type: CardType.DEFINITION,
    front: 'What is a DDoS attack?',
    back: 'Distributed Denial of Service - an attack that overwhelms a target system with traffic from multiple sources, making it unavailable to legitimate users.',
    domain: Domain.THREATS,
    topic: 'Network Attacks',
    difficulty: Difficulty.EASY
  },

  // Threats - Scenario Cards
  {
    type: CardType.SCENARIO,
    scenario: 'An employee receives an email appearing to be from IT support, requesting they click a link to verify their account credentials. The email uses the company logo and mentions a recent security update.',
    options: [
      'Click the link immediately to avoid account lockout',
      'Delete the email and report it to the security team',
      'Reply to the email asking for verification',
      'Forward the email to colleagues to warn them'
    ],
    correctAnswer: 1,
    explanation: 'This is a phishing attempt. The correct response is to delete the email and report it to the security team. Never click links in unsolicited emails, even if they appear legitimate. IT departments typically don\'t request credentials via email.',
    domain: Domain.THREATS,
    topic: 'Social Engineering',
    difficulty: Difficulty.EASY
  },
  {
    type: CardType.SCENARIO,
    scenario: 'You discover that an attacker has been inside your network for several months without detection, slowly exfiltrating sensitive data. What type of threat is this?',
    options: [
      'Script kiddie',
      'Advanced Persistent Threat (APT)',
      'Insider threat',
      'Hacktivist'
    ],
    correctAnswer: 1,
    explanation: 'This describes an Advanced Persistent Threat (APT) - a prolonged and targeted cyberattack where an intruder gains access and remains undetected for an extended period. APTs are typically sophisticated and well-resourced.',
    domain: Domain.THREATS,
    topic: 'Threat Actors',
    difficulty: Difficulty.MEDIUM
  },

  // Architecture and Design - Definition Cards
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

  // Architecture - Scenario Cards
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

  // Implementation - Definition Cards
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
    front: 'What is the purpose of HIDS vs NIDS?',
    back: 'HIDS (Host-based IDS) monitors a single host for suspicious activity. NIDS (Network-based IDS) monitors network traffic across the entire network. Both detect intrusions but at different levels.',
    domain: Domain.IMPLEMENTATION,
    topic: 'Security Tools',
    difficulty: Difficulty.MEDIUM
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

  // Implementation - Scenario Cards
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

  // Operations and Incident Response - Definition Cards
  {
    type: CardType.DEFINITION,
    front: 'What are the phases of the Incident Response lifecycle?',
    back: 'Preparation, Identification, Containment, Eradication, Recovery, and Lessons Learned. This systematic approach ensures effective handling of security incidents.',
    domain: Domain.OPERATIONS,
    topic: 'Incident Response',
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
    front: 'What is Chain of Custody?',
    back: 'The chronological documentation of the seizure, custody, control, transfer, analysis, and disposition of evidence. It ensures evidence integrity for legal proceedings.',
    domain: Domain.OPERATIONS,
    topic: 'Digital Forensics',
    difficulty: Difficulty.MEDIUM
  },

  // Operations - Scenario Cards
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

  // Governance, Risk, and Compliance - Definition Cards
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

  // Governance - Scenario Cards
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
  }
]
