import { CardType, Difficulty } from '@/types'

// Domain 4: Operations and Incident Response (16% of exam)
export const metadata = {
  domain: 'Operations and Incident Response'}

export const operationsCards = [
  // Definition Cards
  {
    type: CardType.DEFINITION,
    front: 'What is Chain of Custody?',
    back: 'The chronological documentation of the seizure, custody, control, transfer, analysis, and disposition of evidence. It ensures evidence integrity for legal proceedings.',
    topic: 'Digital Forensics',
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: 'What is the purpose of a Security Information and Event Management (SIEM) system?',
    back: 'A SIEM aggregates and analyzes security logs and events from multiple sources in real-time, providing centralized monitoring, alerting, and forensic analysis capabilities.',
    topic: 'Security Tools',
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: 'What is a Honeypot?',
    back: 'A decoy system designed to attract attackers, allowing security teams to study attack methods and divert attackers from real systems.',
    topic: 'Security Tools',
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: 'What are the phases of the Incident Response lifecycle?',
    back: 'Preparation, Identification, Containment, Eradication, Recovery, and Lessons Learned. This systematic approach ensures effective handling of security incidents.',
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
    topic: 'Incident Response',
    difficulty: Difficulty.HARD
  },

  {
    type: CardType.DEFINITION,
    front: 'What is the Order of Volatility in digital forensics?',
    back: 'The sequence for collecting digital evidence from most to least volatile: CPU registers/cache → RAM → Network traffic → Disk drives → Backups/archives. Collect volatile data first as it\'s lost when power is removed.',
    topic: 'Digital Forensics',
    difficulty: Difficulty.HARD
  },
  {
    type: CardType.DEFINITION,
    front: 'What is a write blocker in forensics?',
    back: 'A hardware or software tool that allows read-only access to storage media, preventing any writes that could alter evidence. Essential for maintaining evidence integrity.',
    topic: 'Digital Forensics',
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: 'What is the difference between containment, eradication, and recovery?',
    back: 'Containment limits damage and isolates the threat. Eradication removes the threat and vulnerabilities. Recovery restores systems to normal operations. They are sequential phases in incident response.',
    topic: 'Incident Response',
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: 'What is vulnerability scanning vs penetration testing?',
    back: 'Vulnerability scanning automatically identifies known vulnerabilities (passive). Penetration testing actively exploits vulnerabilities to assess real-world risk (aggressive). Pen tests are deeper but require authorization.',
    topic: 'Vulnerability Management',
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: 'What is patch management?',
    back: 'The process of identifying, acquiring, testing, and installing patches/updates to systems. Includes patch prioritization, scheduling, deployment, and verification.',
    topic: 'Patch Management',
    difficulty: Difficulty.EASY
  },
  {
    type: CardType.DEFINITION,
    front: 'What is the 3-2-1 backup rule?',
    back: '3 copies of data, on 2 different media types, with 1 copy offsite. This ensures backup resilience against various failure scenarios.',
    topic: 'Backups',
    difficulty: Difficulty.EASY
  },
  {
    type: CardType.DEFINITION,
    front: 'What is the difference between full, incremental, and differential backups?',
    back: 'Full backs up everything. Incremental backs up changes since last backup (any type). Differential backs up changes since last FULL backup. Incremental is fastest but slowest to restore.',
    topic: 'Backups',
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: 'What is a SOC (Security Operations Center)?',
    back: 'A centralized unit that monitors, detects, analyzes, and responds to cybersecurity incidents. Operates 24/7 using SIEM, threat intelligence, and incident response procedures.',
    topic: 'Security Operations',
    difficulty: Difficulty.EASY
  },
  {
    type: CardType.DEFINITION,
    front: 'What is threat hunting?',
    back: 'Proactive searching for cyber threats that evade existing security solutions. Uses hypothesis-driven investigation, behavioral analysis, and threat intelligence to find hidden threats.',
    topic: 'Security Operations',
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: 'What is log aggregation and why is it important?',
    back: 'Collecting logs from multiple sources into a central location for analysis. Critical for detecting distributed attacks, meeting compliance requirements, and performing forensic investigations.',
    topic: 'Logging and Monitoring',
    difficulty: Difficulty.EASY
  },
  {
    type: CardType.SCENARIO,
    scenario: 'Your backup system performs full backups on Sunday and incremental backups Monday through Saturday. On Thursday, a ransomware attack encrypts your data. What backups do you need to restore?',
    options: [
      'Only Thursday\'s incremental backup',
      'Sunday\'s full backup only',
      'Sunday\'s full + Monday, Tuesday, Wednesday, Thursday incrementals',
      'Sunday\'s full + Wednesday\'s incremental'
    ],
    correctAnswer: 2,
    explanation: 'With incremental backups, you need the last full backup plus ALL incremental backups since then. Each incremental only contains changes since the previous backup of any type.',
    topic: 'Backups',
    difficulty: Difficulty.HARD
  },
  {
    type: CardType.SCENARIO,
    scenario: 'You detect an ongoing data exfiltration from your network. What is the first step?',
    options: [
      'Document everything for evidence',
      'Isolate the affected systems to stop the leak',
      'Notify law enforcement immediately',
      'Perform a full system restore from backup'
    ],
    correctAnswer: 1,
    explanation: 'During active exfiltration, containment is the priority to stop ongoing damage. Isolate affected systems from the network immediately, then proceed with documentation and investigation.',
    topic: 'Incident Response',
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.SCENARIO,
    scenario: 'A vulnerability scan reports a critical SQL injection vulnerability in a public-facing web application. What should be your first action?',
    options: [
      'Immediately take the application offline',
      'Schedule patching for next maintenance window',
      'Verify the vulnerability is real (not a false positive)',
      'Ignore it if the application isn\'t storing sensitive data'
    ],
    correctAnswer: 2,
    explanation: 'Always verify critical findings first. Scanners can produce false positives. Once confirmed, then prioritize remediation based on risk. Taking systems offline without verification can cause unnecessary business disruption.',
    topic: 'Vulnerability Management',
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: 'What is SOAR (Security Orchestration, Automation, and Response)?',
    back: 'Technologies that enable organizations to collect security data, define incident analysis and response procedures, and execute them automatically. Reduces response time and analyst workload.',
    topic: 'Security Automation',
    difficulty: Difficulty.MEDIUM
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
    topic: 'Incident Response',
    difficulty: Difficulty.HARD
  },
  {
    type: CardType.DRAGDROP,
    instructions: 'Order the following by volatility (most volatile first):',
    targets: [
      { label: 'Most Volatile', correctItem: 'CPU registers and cache' },
      { label: '2nd', correctItem: 'RAM (Random Access Memory)' },
      { label: '3rd', correctItem: 'Network traffic and connections' },
      { label: '4th', correctItem: 'Hard disk drives' },
      { label: 'Least Volatile', correctItem: 'Backup tapes and archives' }
    ],
    items: [
      'CPU registers and cache',
      'RAM (Random Access Memory)',
      'Network traffic and connections',
      'Hard disk drives',
      'Backup tapes and archives'
    ],
    explanation: 'Order of volatility determines evidence collection priority. Volatile data is lost when power is removed or time passes. Collect it first to preserve critical evidence.',
    topic: 'Digital Forensics',
    difficulty: Difficulty.HARD
  }
]
