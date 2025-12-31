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

  {
    type: CardType.DEFINITION,
    front: 'What is the difference between IaaS, PaaS, and SaaS?',
    back: 'IaaS (Infrastructure as a Service) provides virtualized computing resources. PaaS (Platform as a Service) provides a platform for developing/deploying apps. SaaS (Software as a Service) provides ready-to-use applications. Responsibility shifts from customer to provider.',
    domain: Domain.ARCHITECTURE,
    topic: 'Cloud Security',
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: 'What is the Shared Responsibility Model in cloud computing?',
    back: 'A framework defining security responsibilities between cloud provider and customer. Provider secures the infrastructure (hardware, facilities), customer secures their data, applications, and access management. Varies by service model (IaaS/PaaS/SaaS).',
    domain: Domain.ARCHITECTURE,
    topic: 'Cloud Security',
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: 'What is microsegmentation?',
    back: 'Dividing a network into very small, isolated segments, often down to individual workloads. Provides granular security controls and limits lateral movement by attackers. Common in zero trust architectures.',
    domain: Domain.ARCHITECTURE,
    topic: 'Network Security',
    difficulty: Difficulty.HARD
  },
  {
    type: CardType.DEFINITION,
    front: 'What is high availability and how is it measured?',
    back: 'A system\'s ability to remain operational and accessible with minimal downtime. Measured in "nines": 99.9% (8.76 hrs downtime/year), 99.99% (52.56 min/year), 99.999% (5.26 min/year). Achieved through redundancy and fault tolerance.',
    domain: Domain.ARCHITECTURE,
    topic: 'Availability',
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: 'What is a security baseline?',
    back: 'A minimum set of security controls and configurations required for systems. Provides a consistent security foundation across an organization. Examples: CIS Benchmarks, NIST guidelines, vendor hardening guides.',
    domain: Domain.ARCHITECTURE,
    topic: 'Hardening',
    difficulty: Difficulty.EASY
  },
  {
    type: CardType.DEFINITION,
    front: 'What is system hardening?',
    back: 'Reducing a system\'s attack surface by removing unnecessary software/services, applying security patches, configuring secure settings, and implementing security controls. Makes systems more resistant to attacks.',
    domain: Domain.ARCHITECTURE,
    topic: 'Hardening',
    difficulty: Difficulty.EASY
  },
  {
    type: CardType.DEFINITION,
    front: 'What is a hypervisor and what are the two types?',
    back: 'Software that creates and manages virtual machines. Type 1 (bare metal) runs directly on hardware (e.g., VMware ESXi, Hyper-V). Type 2 (hosted) runs on an OS (e.g., VirtualBox, VMware Workstation). Type 1 is more secure and performant.',
    domain: Domain.ARCHITECTURE,
    topic: 'Virtualization',
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: 'What is VM escape?',
    back: 'An attack where code breaks out of a virtual machine and interacts with the host operating system or hypervisor. This is a serious vulnerability as it can compromise all VMs on the host.',
    domain: Domain.ARCHITECTURE,
    topic: 'Virtualization',
    difficulty: Difficulty.HARD
  },
  {
    type: CardType.SCENARIO,
    scenario: 'Your organization needs 99.99% uptime for a critical web application. Which architecture should you implement?',
    options: [
      'Single server with daily backups',
      'Load-balanced redundant servers across multiple availability zones',
      'One primary server with a cold standby',
      'Clustered servers in a single data center'
    ],
    correctAnswer: 1,
    explanation: '99.99% uptime (52 minutes downtime/year) requires redundancy and geographic distribution. Load balancing across multiple availability zones provides failover capability and protects against datacenter-level failures.',
    domain: Domain.ARCHITECTURE,
    topic: 'Availability',
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.SCENARIO,
    scenario: 'A company is migrating to cloud IaaS. Who is responsible for securing the guest operating systems?',
    options: [
      'The cloud provider handles all security',
      'The customer is responsible',
      'Security is shared equally between both',
      'Neither party is responsible'
    ],
    correctAnswer: 1,
    explanation: 'In IaaS, the customer is responsible for securing their virtual machines, including guest OS, applications, and data. The provider secures the physical infrastructure and hypervisor. This is the Shared Responsibility Model.',
    domain: Domain.ARCHITECTURE,
    topic: 'Cloud Security',
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: 'What is the Bell-LaPadula security model?',
    back: 'A confidentiality-focused model with two rules: No Read Up (subjects cannot read higher classified objects) and No Write Down (subjects cannot write to lower classifications). Prevents information flowing to unauthorized parties.',
    domain: Domain.ARCHITECTURE,
    topic: 'Security Models',
    difficulty: Difficulty.HARD
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
  },
  {
    type: CardType.DRAGDROP,
    instructions: 'Match each cloud service model to its customer responsibility:',
    targets: [
      { label: 'IaaS', correctItem: 'Customer manages OS, middleware, applications, and data' },
      { label: 'PaaS', correctItem: 'Customer manages applications and data only' },
      { label: 'SaaS', correctItem: 'Customer manages only data and user access' }
    ],
    items: [
      'Customer manages OS, middleware, applications, and data',
      'Customer manages applications and data only',
      'Customer manages only data and user access'
    ],
    explanation: 'Cloud responsibility shifts from customer to provider as you move from IaaS to PaaS to SaaS. IaaS gives most control, SaaS gives least. This is the Shared Responsibility Model.',
    domain: Domain.ARCHITECTURE,
    topic: 'Cloud Security',
    difficulty: Difficulty.MEDIUM
  }
]
