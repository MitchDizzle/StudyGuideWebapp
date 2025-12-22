import { CardType, Domain, Difficulty } from '@/types'

// Domain 1: Threats, Attacks, and Vulnerabilities (24% of exam)
export const threatsCards = [
  // Definition Cards
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
    front: 'What is a DDoS attack?',
    back: 'Distributed Denial of Service - an attack that overwhelms a target system with traffic from multiple sources, making it unavailable to legitimate users.',
    domain: Domain.THREATS,
    topic: 'Network Attacks',
    difficulty: Difficulty.EASY
  },
  {
    type: CardType.DEFINITION,
    front: 'What is a Man-in-the-Middle (MITM) attack?',
    back: 'An attack where the attacker secretly intercepts and possibly alters communications between two parties who believe they are directly communicating with each other.',
    domain: Domain.THREATS,
    topic: 'Network Attacks',
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: 'What is Ransomware?',
    back: 'Malware that encrypts victim files and demands payment (usually in cryptocurrency) in exchange for the decryption key.',
    domain: Domain.THREATS,
    topic: 'Malware',
    difficulty: Difficulty.EASY
  },
  {
    type: CardType.DEFINITION,
    front: 'What is a Rootkit?',
    back: 'Malicious software designed to provide unauthorized root or administrative-level access while hiding its presence from users and security tools.',
    domain: Domain.THREATS,
    topic: 'Malware',
    difficulty: Difficulty.HARD
  },
  {
    type: CardType.DEFINITION,
    front: 'What is Privilege Escalation?',
    back: 'An attack where a user gains elevated access to resources normally protected from an application or user, exploiting bugs or misconfigurations to gain unauthorized privileges.',
    domain: Domain.THREATS,
    topic: 'System Attacks',
    difficulty: Difficulty.MEDIUM
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
    front: 'What is a Trojan?',
    back: 'Malware disguised as legitimate software that tricks users into installing it, often providing backdoor access to attackers.',
    domain: Domain.THREATS,
    topic: 'Malware',
    difficulty: Difficulty.EASY
  },

  // Scenario Multiple Choice Cards
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
  {
    type: CardType.SCENARIO,
    scenario: 'A user reports their computer is running slowly and displaying unexpected pop-ups. Upon investigation, you find the browser homepage has changed and unknown toolbars are installed. What type of malware is this MOST likely?',
    options: [
      'Ransomware',
      'Rootkit',
      'Adware/PUP (Potentially Unwanted Program)',
      'Logic bomb'
    ],
    correctAnswer: 2,
    explanation: 'These symptoms (slow performance, pop-ups, changed homepage, unwanted toolbars) are classic indicators of adware or PUPs. Ransomware would encrypt files, rootkits hide deeply in the system, and logic bombs trigger on specific conditions.',
    domain: Domain.THREATS,
    topic: 'Malware',
    difficulty: Difficulty.EASY
  },

  // Drag and Drop Cards
  {
    type: CardType.DRAGDROP,
    instructions: 'Match each social engineering attack to its correct description:',
    targets: [
      { label: 'Phishing', correctItem: 'Mass emails attempting to trick recipients into revealing sensitive information' },
      { label: 'Spear Phishing', correctItem: 'Targeted email attack aimed at specific individuals or organizations' },
      { label: 'Whaling', correctItem: 'Spear phishing attacks specifically targeting high-profile executives' },
      { label: 'Vishing', correctItem: 'Voice phishing conducted over phone calls' }
    ],
    items: [
      'Mass emails attempting to trick recipients into revealing sensitive information',
      'Targeted email attack aimed at specific individuals or organizations',
      'Spear phishing attacks specifically targeting high-profile executives',
      'Voice phishing conducted over phone calls'
    ],
    explanation: 'Understanding the distinctions between phishing variants is crucial for the Security+ exam. Phishing is broad/mass, spear phishing is targeted, whaling targets executives, and vishing uses voice/phone.',
    domain: Domain.THREATS,
    topic: 'Social Engineering',
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DRAGDROP,
    instructions: 'Match each malware type to its primary characteristic:',
    targets: [
      { label: 'Virus', correctItem: 'Requires user action to execute and spread' },
      { label: 'Worm', correctItem: 'Self-replicates across networks without user action' },
      { label: 'Trojan', correctItem: 'Disguises itself as legitimate software' },
      { label: 'Ransomware', correctItem: 'Encrypts files and demands payment' }
    ],
    items: [
      'Requires user action to execute and spread',
      'Self-replicates across networks without user action',
      'Disguises itself as legitimate software',
      'Encrypts files and demands payment'
    ],
    explanation: 'Key malware distinctions: Viruses need user action, worms spread automatically, Trojans hide as legitimate software, ransomware demands payment for decryption.',
    domain: Domain.THREATS,
    topic: 'Malware',
    difficulty: Difficulty.MEDIUM
  }
]
