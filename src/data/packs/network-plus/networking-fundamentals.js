import { CardType, Domain, Difficulty } from '@/types'

// Auto-generated from CSV
export const networkingFundamentalsCards = [
  {
    type: CardType.DEFINITION,
    front: "What is the OSI Model?",
    back: "A conceptual framework with 7 layers (Physical, Data Link, Network, Transport, Session, Presentation, Application) that standardizes network communication functions. Each layer has specific responsibilities for data transmission.",
    domain: "Networking Fundamentals",
    topic: "OSI Model",
    difficulty: Difficulty.EASY
  },
  {
    type: CardType.DEFINITION,
    front: "What is the difference between TCP and UDP?",
    back: "TCP (Transmission Control Protocol) is connection-oriented, reliable, with error checking and ordered delivery. UDP (User Datagram Protocol) is connectionless, faster but unreliable, with no error checking or guaranteed delivery.",
    domain: "Networking Fundamentals",
    topic: "Transport Protocols",
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: "What is an IP address?",
    back: "A numerical label assigned to each device on a network. IPv4 uses 32-bit addresses (e.g., 192.168.1.1), IPv6 uses 128-bit addresses. IP addresses identify devices and enable routing between networks.",
    domain: "Networking Fundamentals",
    topic: "IP Addressing",
    difficulty: Difficulty.EASY
  },
  {
    type: CardType.DEFINITION,
    front: "What is a subnet mask?",
    back: "A 32-bit number that divides an IP address into network and host portions. It determines which part of an IP address identifies the network and which identifies the host. Example: 255.255.255.0 (/24).",
    domain: "Networking Fundamentals",
    topic: "Subnetting",
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: "What is DHCP?",
    back: "Dynamic Host Configuration Protocol - automatically assigns IP addresses and network configuration to devices. Eliminates manual IP configuration, prevents IP conflicts, and manages address pools efficiently.",
    domain: "Networking Fundamentals",
    topic: "Network Services",
    difficulty: Difficulty.EASY
  },
  {
    type: CardType.DEFINITION,
    front: "What is DNS?",
    back: "Domain Name System - translates human-readable domain names (www.example.com) into IP addresses. Functions as the internet's phone book, making navigation user-friendly.",
    domain: "Networking Fundamentals",
    topic: "Network Services",
    difficulty: Difficulty.EASY
  },
  {
    type: CardType.DEFINITION,
    front: "What is NAT (Network Address Translation)?",
    back: "A method that maps private IP addresses to public IP addresses, allowing multiple devices on a private network to share a single public IP. Conserves IPv4 addresses and provides basic security.",
    domain: "Networking Fundamentals",
    topic: "IP Addressing",
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: "What is a default gateway?",
    back: "The router IP address that devices use to communicate outside their local network. It's the 'exit point' for traffic destined for other networks or the internet.",
    domain: "Networking Fundamentals",
    topic: "Routing",
    difficulty: Difficulty.EASY
  },
  {
    type: CardType.DEFINITION,
    front: "What is the difference between a switch and a router?",
    back: "A switch operates at Layer 2, forwarding frames within a LAN based on MAC addresses. A router operates at Layer 3, routing packets between different networks based on IP addresses.",
    domain: "Networking Fundamentals",
    topic: "Network Devices",
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: "What is ARP (Address Resolution Protocol)?",
    back: "Resolves IP addresses to MAC addresses on a local network. When a device needs to send data, ARP finds the MAC address associated with the destination IP address.",
    domain: "Networking Fundamentals",
    topic: "Protocols",
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: "What is a MAC address?",
    back: "Media Access Control address - a unique 48-bit hardware identifier assigned to network interface cards. Format: XX:XX:XX:XX:XX:XX. Used for Layer 2 communication on local networks.",
    domain: "Networking Fundamentals",
    topic: "Network Basics",
    difficulty: Difficulty.EASY
  },
  {
    type: CardType.DEFINITION,
    front: "What is latency?",
    back: "The time delay between sending and receiving data across a network. Measured in milliseconds (ms). Factors include distance, routing, and processing time. Critical for real-time applications.",
    domain: "Networking Fundamentals",
    topic: "Performance",
    difficulty: Difficulty.EASY
  },
  {
    type: CardType.DEFINITION,
    front: "What is bandwidth?",
    back: "The maximum rate of data transfer across a network path, measured in bits per second (bps). Common units: Mbps (megabits), Gbps (gigabits). Represents capacity, not speed.",
    domain: "Networking Fundamentals",
    topic: "Performance",
    difficulty: Difficulty.EASY
  },
  {
    type: CardType.DEFINITION,
    front: "What is a VLAN?",
    back: "Virtual Local Area Network - logically segments a physical network into multiple broadcast domains. Improves security, reduces broadcast traffic, and enables flexible network management without physical changes.",
    domain: "Networking Fundamentals",
    topic: "Switching",
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: "What is IPv6 and why is it important?",
    back: "The newest version of Internet Protocol using 128-bit addresses. Solves IPv4 address exhaustion, provides better security (IPSec built-in), improved routing efficiency, and eliminates need for NAT.",
    domain: "Networking Fundamentals",
    topic: "IP Addressing",
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: "What is CIDR notation?",
    back: "Classless Inter-Domain Routing - a compact way to specify IP addresses and routing prefixes. Example: 192.168.1.0/24 means the first 24 bits are the network portion. Replaced classful addressing.",
    domain: "Networking Fundamentals",
    topic: "Subnetting",
    difficulty: Difficulty.HARD
  },
  {
    type: CardType.DEFINITION,
    front: "What are the private IP address ranges?",
    back: "Class A: 10.0.0.0/8, Class B: 172.16.0.0/12, Class C: 192.168.0.0/16. These addresses are not routable on the public internet and are used for internal networks. Defined in RFC 1918.",
    domain: "Networking Fundamentals",
    topic: "IP Addressing",
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: "What is the Three-Way Handshake in TCP?",
    back: "Connection establishment process: 1) Client sends SYN, 2) Server responds with SYN-ACK, 3) Client sends ACK. This establishes a reliable connection before data transmission begins.",
    domain: "Networking Fundamentals",
    topic: "Transport Protocols",
    difficulty: Difficulty.HARD
  },
  {
    type: CardType.DEFINITION,
    front: "What ports do HTTP and HTTPS use?",
    back: "HTTP uses port 80 (unencrypted). HTTPS uses port 443 (encrypted with TLS/SSL). These are well-known port numbers assigned by IANA for web traffic.",
    domain: "Networking Fundamentals",
    topic: "Protocols",
    difficulty: Difficulty.EASY
  },
  {
    type: CardType.DEFINITION,
    front: "What is broadcast vs multicast vs unicast?",
    back: "Unicast: one-to-one communication. Broadcast: one-to-all on local network. Multicast: one-to-many (specific group). Each has different use cases and efficiency implications.",
    domain: "Networking Fundamentals",
    topic: "Network Basics",
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.SCENARIO,
    scenario: "A company needs to segment their network to separate guest WiFi from internal resources. Which device should they use?",
    options: [
          "Hub",
          "Switch with VLANs",
          "Repeater",
          "Bridge"
    ],
    correctAnswer: 1,
    explanation: "A switch with VLANs (Virtual Local Area Networks) can logically segment a network, separating guest WiFi traffic from internal resources while using the same physical infrastructure.",
    domain: "Networking Fundamentals",
    topic: "Network Devices",
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.SCENARIO,
    scenario: "Which cable type supports 10 Gbps speeds up to 100 meters?",
    options: [
          "Cat5",
          "Cat5e",
          "Cat6",
          "Cat6a"
    ],
    correctAnswer: 3,
    explanation: "Cat6a (Category 6 augmented) supports 10 Gbps up to 100 meters. Cat6 only supports 10 Gbps up to 55 meters, while Cat5e maxes out at 1 Gbps.",
    domain: "Networking Fundamentals",
    topic: "Cabling",
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.SCENARIO,
    scenario: "A network administrator notices broadcast storms. What technology can help?",
    options: [
          "Hubs",
          "Spanning Tree Protocol (STP)",
          "More switches",
          "Longer cables"
    ],
    correctAnswer: 1,
    explanation: "STP prevents broadcast storms by blocking redundant paths in the network, creating a loop-free topology while maintaining redundancy for fault tolerance.",
    domain: "Networking Fundamentals",
    topic: "Network Protocols",
    difficulty: Difficulty.HARD
  },
  {
    type: CardType.DRAGDROP,
    instructions: "Match each OSI layer to its function:",
    targets: [
          {
                "label": "Layer 1 - Physical",
                "correctItem": "Transmits raw bits over physical medium"
          },
          {
                "label": "Layer 2 - Data Link",
                "correctItem": "Handles MAC addressing and frame switching"
          },
          {
                "label": "Layer 3 - Network",
                "correctItem": "Routes packets using IP addresses"
          },
          {
                "label": "Layer 4 - Transport",
                "correctItem": "Manages end-to-end communication (TCP/UDP)"
          }
    ],
    items: [
          "Transmits raw bits over physical medium",
          "Handles MAC addressing and frame switching",
          "Routes packets using IP addresses",
          "Manages end-to-end communication (TCP/UDP)"
    ],
    topic: "Networking Fundamentals",
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: "What is a trunk port?",
    back: "A switch port that carries traffic for multiple VLANs using tagging (802.1Q). Connects switches together or to routers, allowing VLAN traffic to traverse the network. Opposite of an access port.",
    domain: "Network Implementations",
    topic: "VLANs",
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: "What is STP (Spanning Tree Protocol)?",
    back: "Prevents network loops in redundant switch topologies by blocking redundant paths. Uses BPDU messages to elect a root bridge and determine best paths. Provides fault tolerance while preventing broadcast storms.",
    domain: "Network Implementations",
    topic: "Switching",
    difficulty: Difficulty.HARD
  },
  {
    type: CardType.DEFINITION,
    front: "What is link aggregation (LACP)?",
    back: "Link Aggregation Control Protocol - combines multiple physical links into one logical link. Increases bandwidth, provides redundancy, and enables load balancing. Common protocols: LACP (802.3ad) and PAgP.",
    domain: "Network Implementations",
    topic: "Switching",
    difficulty: Difficulty.HARD
  },
  {
    type: CardType.DEFINITION,
    front: "What is PoE (Power over Ethernet)?",
    back: "Delivers electrical power over Ethernet cables to devices like IP phones, wireless APs, and cameras. Standards: 802.3af (15.4W), 802.3at/PoE+ (25.5W), 802.3bt/PoE++ (up to 100W).",
    domain: "Network Implementations",
    topic: "Ethernet",
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: "What is the difference between single-mode and multimode fiber?",
    back: "Single-mode: thin core (9 microns), laser light, long distances (40+ km), more expensive. Multimode: thick core (50/62.5 microns), LED light, shorter distances (<2 km), less expensive.",
    domain: "Network Implementations",
    topic: "Cabling",
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: "What is a crossover cable vs straight-through cable?",
    back: "Straight-through: connects different devices (PC to switch). Crossover: connects similar devices (switch to switch, PC to PC). Modern devices support Auto-MDIX which detects and adapts automatically.",
    domain: "Network Implementations",
    topic: "Cabling",
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: "What is QoS (Quality of Service)?",
    back: "Prioritizes network traffic to ensure important data gets bandwidth and low latency. Uses traffic classification, queuing, and scheduling. Critical for VoIP, video conferencing, and real-time applications.",
    domain: "Network Implementations",
    topic: "Traffic Management",
    difficulty: Difficulty.HARD
  },
  {
    type: CardType.DEFINITION,
    front: "What is a wireless site survey?",
    back: "Assessment of wireless coverage, interference, and capacity needs. Identifies dead zones, channel overlap, and optimal AP placement. Uses heat maps to visualize coverage patterns.",
    domain: "Network Implementations",
    topic: "Wireless",
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: "What are the 2.4 GHz non-overlapping channels?",
    back: "Channels 1, 6, and 11. Only three channels in 2.4 GHz band don't overlap. Using overlapping channels causes interference. 5 GHz band has many more non-overlapping channels available.",
    domain: "Network Implementations",
    topic: "Wireless",
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: "What is SSID broadcasting?",
    back: "Service Set Identifier - the network name broadcast by wireless access points. Disabling SSID broadcast doesn't truly hide networks (security through obscurity). Still detectable with wireless sniffing tools.",
    domain: "Network Implementations",
    topic: "Wireless",
    difficulty: Difficulty.EASY
  },
  {
    type: CardType.DEFINITION,
    front: "What is roaming in wireless networks?",
    back: "Clients moving between access points while maintaining connectivity. Requires overlapping coverage (10-15%), same SSID and security settings, and proper channel planning for seamless handoff.",
    domain: "Network Implementations",
    topic: "Wireless",
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: "What is a WLAN controller?",
    back: "Centralized device managing multiple wireless access points. Provides unified configuration, security policies, roaming management, and monitoring. Common in enterprise environments with many APs.",
    domain: "Network Implementations",
    topic: "Wireless",
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: "What is the difference between VTP and DTP?",
    back: "VTP (VLAN Trunking Protocol) propagates VLAN information between switches. DTP (Dynamic Trunking Protocol) automatically negotiates trunk links. Both are Cisco proprietary and should be carefully managed.",
    domain: "Network Implementations",
    topic: "VLANs",
    difficulty: Difficulty.HARD
  },
  {
    type: CardType.DEFINITION,
    front: "What is port mirroring (SPAN)?",
    back: "Switched Port Analyzer - copies traffic from one or more ports to a monitoring port. Used for packet capture, IDS/IPS monitoring, and troubleshooting. Doesn't affect original traffic flow.",
    domain: "Network Implementations",
    topic: "Switching",
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.SCENARIO,
    scenario: "You need to connect two buildings 500 meters apart. Which cable type is most appropriate?",
    options: [
          "Cat6",
          "Cat6a",
          "Single-mode fiber",
          "Multimode fiber"
    ],
    correctAnswer: 2,
    explanation: "Single-mode fiber can handle long distances (40+ km) and provides high bandwidth. Copper cabling (Cat6/6a) is limited to 100 meters. Multimode would work but single-mode is better for future capacity.",
    domain: "Network Implementations",
    topic: "Cabling",
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.SCENARIO,
    scenario: "A company needs to support 50 VoIP phones. What network feature is essential?",
    options: [
          "More bandwidth",
          "QoS prioritization",
          "Faster switches",
          "Better cables"
    ],
    correctAnswer: 1,
    explanation: "QoS (Quality of Service) is critical for VoIP. It prioritizes voice traffic to ensure low latency and jitter, preventing call quality issues even during network congestion.",
    domain: "Network Implementations",
    topic: "Traffic Management",
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DRAGDROP,
    instructions: "Match each wireless standard to its maximum theoretical speed:",
    targets: [
          {
                "label": "802.11n",
                "correctItem": "600 Mbps"
          },
          {
                "label": "802.11ac",
                "correctItem": "6.9 Gbps"
          },
          {
                "label": "802.11ax (Wi-Fi 6)",
                "correctItem": "9.6 Gbps"
          }
    ],
    items: [
          "600 Mbps",
          "6.9 Gbps",
          "9.6 Gbps"
    ],
    topic: "Network Implementations",
    difficulty: Difficulty.WIRELESS
  },
  {
    type: CardType.DEFINITION,
    front: "What is SNMP and what are its versions?",
    back: "Simple Network Management Protocol - monitors and manages network devices. SNMPv1/v2c: plaintext, insecure. SNMPv3: encrypted, authentication, recommended. Uses agents, managers, and MIBs.",
    domain: "Network Operations",
    topic: "Monitoring",
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: "What is syslog?",
    back: "Centralized logging protocol for network devices. Collects logs from routers, switches, firewalls. Severity levels 0-7 (0=Emergency, 7=Debug). Critical for troubleshooting and security analysis.",
    domain: "Network Operations",
    topic: "Monitoring",
    difficulty: Difficulty.EASY
  },
  {
    type: CardType.DEFINITION,
    front: "What is NetFlow?",
    back: "Cisco protocol that collects IP traffic statistics. Tracks who, what, when, where, and how traffic flows. Used for capacity planning, security analysis, and billing. IPFIX is the standard version.",
    domain: "Network Operations",
    topic: "Monitoring",
    difficulty: Difficulty.HARD
  },
  {
    type: CardType.DEFINITION,
    front: "What is baseline monitoring?",
    back: "Establishing normal network performance metrics (bandwidth usage, latency, CPU, errors). Provides reference point for detecting anomalies, capacity planning, and troubleshooting.",
    domain: "Network Operations",
    topic: "Monitoring",
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: "What is change management in networking?",
    back: "Formal process for implementing network changes. Includes: request, approval, testing, implementation, documentation, rollback plan. Prevents outages and maintains network stability.",
    domain: "Network Operations",
    topic: "Management",
    difficulty: Difficulty.EASY
  },
  {
    type: CardType.DEFINITION,
    front: "What is network documentation and what should it include?",
    back: "Critical records: network diagrams, IP addressing schemes, device configurations, cable runs, port assignments, policies. Ensures knowledge retention and faster troubleshooting.",
    domain: "Network Operations",
    topic: "Documentation",
    difficulty: Difficulty.EASY
  },
  {
    type: CardType.DEFINITION,
    front: "What are MTTR and MTBF?",
    back: "MTTR (Mean Time To Repair): average time to fix failures. MTBF (Mean Time Between Failures): average time between failures. Both measure reliability and help plan maintenance.",
    domain: "Network Operations",
    topic: "Management",
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: "What is configuration management?",
    back: "Tracking and controlling network device configurations. Includes version control, automated backups, configuration templates, and compliance checking. Prevents configuration drift.",
    domain: "Network Operations",
    topic: "Management",
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: "What is performance monitoring?",
    back: "Continuous tracking of network metrics: throughput, packet loss, latency, jitter, error rates. Identifies bottlenecks, predicts failures, validates SLAs.",
    domain: "Network Operations",
    topic: "Monitoring",
    difficulty: Difficulty.EASY
  },
  {
    type: CardType.DEFINITION,
    front: "What is an SLA (Service Level Agreement)?",
    back: "Contract defining expected service levels: uptime percentage, response times, performance metrics. Includes penalties for non-compliance. Example: 99.9% uptime guarantee.",
    domain: "Network Operations",
    topic: "Management",
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: "What is network automation?",
    back: "Using scripts and tools to automate repetitive tasks: configuration deployment, backups, monitoring, provisioning. Reduces human error and saves time. Tools: Ansible, Python, PowerShell.",
    domain: "Network Operations",
    topic: "Automation",
    difficulty: Difficulty.HARD
  },
  {
    type: CardType.DEFINITION,
    front: "What is asset management?",
    back: "Tracking network equipment inventory: devices, locations, serial numbers, warranties, assignments. Critical for maintenance, budgeting, and security audits.",
    domain: "Network Operations",
    topic: "Management",
    difficulty: Difficulty.EASY
  },
  {
    type: CardType.DEFINITION,
    front: "What is patch management for network devices?",
    back: "Process of updating firmware and software on network equipment. Includes: testing patches, scheduling maintenance windows, documentation, rollback plans. Critical for security.",
    domain: "Network Operations",
    topic: "Management",
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.SCENARIO,
    scenario: "Your network experiences intermittent slowdowns every morning at 9 AM. What tool helps identify the cause?",
    options: [
          "Ping",
          "Baseline comparison",
          "Physical inspection",
          "Reboot devices"
    ],
    correctAnswer: 1,
    explanation: "Comparing current performance to baseline helps identify deviations. If morning traffic consistently exceeds baseline, it indicates capacity issues during peak usage.",
    domain: "Network Operations",
    topic: "Monitoring",
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.SCENARIO,
    scenario: "A critical router fails. Which documentation is most immediately useful?",
    options: [
          "SLA",
          "Network topology diagram",
          "Vendor warranty",
          "Change log"
    ],
    correctAnswer: 1,
    explanation: "Network topology diagram shows how devices connect, helping quickly identify impact, plan rerouting, and locate replacement equipment.",
    domain: "Network Operations",
    topic: "Documentation",
    difficulty: Difficulty.EASY
  },
  {
    type: CardType.DEFINITION,
    front: "What is a firewall?",
    back: "Network security device that filters traffic based on rules. Can be stateless (packet filtering) or stateful (connection tracking). Placed at network boundaries to control inbound/outbound traffic.",
    domain: "Network Security",
    topic: "Firewalls",
    difficulty: Difficulty.EASY
  },
  {
    type: CardType.DEFINITION,
    front: "What is the difference between ACL and firewall?",
    back: "ACL (Access Control List): simple permit/deny rules on routers/switches, Layer 3/4. Firewall: dedicated security device with stateful inspection, deep packet inspection, application awareness, logging.",
    domain: "Network Security",
    topic: "Access Control",
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: "What is port security on a switch?",
    back: "Restricts which devices can connect to switch ports based on MAC addresses. Prevents unauthorized access. Violation modes: protect, restrict, shutdown. Helps prevent MAC flooding attacks.",
    domain: "Network Security",
    topic: "Switching",
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: "What is 802.1X?",
    back: "Port-based Network Access Control. Requires authentication before granting network access. Uses RADIUS server and EAP protocols. Common in enterprise wireless and wired networks.",
    domain: "Network Security",
    topic: "Authentication",
    difficulty: Difficulty.HARD
  },
  {
    type: CardType.DEFINITION,
    front: "What is a DMZ (Demilitarized Zone)?",
    back: "Network segment between internal and external networks. Hosts public-facing servers (web, email, DNS). Protected by firewalls on both sides. Limits damage if public servers are compromised.",
    domain: "Network Security",
    topic: "Network Design",
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: "What is IDS vs IPS?",
    back: "IDS (Intrusion Detection System): monitors and alerts on threats, passive. IPS (Intrusion Prevention System): actively blocks threats, inline. Both use signatures and anomaly detection.",
    domain: "Network Security",
    topic: "Threat Detection",
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: "What is VPN and what are the types?",
    back: "Virtual Private Network - encrypted tunnel over public network. Site-to-site: connects networks. Remote access: connects users. Protocols: IPSec (secure), SSL/TLS (web-based), L2TP, PPTP (legacy).",
    domain: "Network Security",
    topic: "Remote Access",
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: "What is AAA in network security?",
    back: "Authentication: verify identity (who are you?). Authorization: grant permissions (what can you do?). Accounting: track usage (what did you do?). Typically implemented with RADIUS or TACACS+.",
    domain: "Network Security",
    topic: "Authentication",
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: "What is RADIUS vs TACACS+?",
    back: "RADIUS: UDP ports 1812/1813, encrypts only password, combines authentication/authorization. TACACS+: TCP port 49, encrypts entire payload, separates AAA functions. TACACS+ more secure but less common.",
    domain: "Network Security",
    topic: "Authentication",
    difficulty: Difficulty.HARD
  },
  {
    type: CardType.DEFINITION,
    front: "What is multi-factor authentication (MFA)?",
    back: "Requires 2+ verification factors: something you know (password), something you have (token/phone), something you are (biometric). Significantly more secure than passwords alone.",
    domain: "Network Security",
    topic: "Authentication",
    difficulty: Difficulty.EASY
  },
  {
    type: CardType.DEFINITION,
    front: "What is network segmentation for security?",
    back: "Dividing network into isolated segments using VLANs, firewalls, or subnets. Limits lateral movement of attackers, contains breaches, enforces security policies. Defense in depth strategy.",
    domain: "Network Security",
    topic: "Network Design",
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: "What is a honeynet?",
    back: "Decoy network designed to attract and trap attackers. Contains fake vulnerable systems. Helps study attack methods, divert attention from real assets, and gather threat intelligence.",
    domain: "Network Security",
    topic: "Threat Detection",
    difficulty: Difficulty.HARD
  },
  {
    type: CardType.DEFINITION,
    front: "What is geofencing in network security?",
    back: "Restricts access based on geographic location using IP geolocation. Blocks traffic from high-risk countries or limits access to specific regions. Not foolproof (VPNs can bypass).",
    domain: "Network Security",
    topic: "Access Control",
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: "What is network access control (NAC)?",
    back: "Enforces security policy before granting network access. Checks device compliance: antivirus updated, patches current, configuration correct. Quarantines non-compliant devices.",
    domain: "Network Security",
    topic: "Access Control",
    difficulty: Difficulty.HARD
  },
  {
    type: CardType.DEFINITION,
    front: "What is a security information and event management (SIEM)?",
    back: "Centralized platform collecting and analyzing security logs from all network devices. Provides real-time alerts, correlation, reporting, and forensics. Examples: Splunk, QRadar, ArcSight.",
    domain: "Network Security",
    topic: "Monitoring",
    difficulty: Difficulty.HARD
  },
  {
    type: CardType.SCENARIO,
    scenario: "An attacker spoofs DHCP responses to redirect traffic. What security measure prevents this?",
    options: [
          "Firewall",
          "DHCP snooping",
          "Port security",
          "VPN"
    ],
    correctAnswer: 1,
    explanation: "DHCP snooping validates DHCP messages and builds a trusted binding table. It blocks rogue DHCP servers, preventing man-in-the-middle attacks.",
    domain: "Network Security",
    topic: "Switching",
    difficulty: Difficulty.HARD
  },
  {
    type: CardType.SCENARIO,
    scenario: "Users need secure remote access to internal resources. What solution provides this?",
    options: [
          "Open all firewall ports",
          "VPN with MFA",
          "Public web portal",
          "Telnet access"
    ],
    correctAnswer: 1,
    explanation: "VPN provides encrypted tunnel for remote access. MFA adds authentication security. This is standard practice for secure remote access to corporate networks.",
    domain: "Network Security",
    topic: "Remote Access",
    difficulty: Difficulty.EASY
  },
  {
    type: CardType.DRAGDROP,
    instructions: "Match each security principle to its description:",
    targets: [
          {
                "label": "Least Privilege",
                "correctItem": "Grant minimum necessary access"
          },
          {
                "label": "Defense in Depth",
                "correctItem": "Multiple layers of security"
          },
          {
                "label": "Zero Trust",
                "correctItem": "Never trust, always verify"
          }
    ],
    items: [
          "Grant minimum necessary access",
          "Multiple layers of security",
          "Never trust, always verify"
    ],
    topic: "Network Security",
    difficulty: Difficulty.PRINCIPLES
  },
  {
    type: CardType.DEFINITION,
    front: "What is the first step in troubleshooting?",
    back: "Identify the problem. Gather information: symptoms, error messages, affected users/devices, recent changes. Question users and document findings. Never skip to solutions without understanding the issue.",
    domain: "Network Troubleshooting",
    topic: "Methodology",
    difficulty: Difficulty.EASY
  },
  {
    type: CardType.DEFINITION,
    front: "What is the OSI troubleshooting approach?",
    back: "Bottom-up: start Layer 1 (physical), work up. Top-down: start Layer 7 (application), work down. Divide and conquer: test middle layers first. Choose based on symptoms and experience.",
    domain: "Network Troubleshooting",
    topic: "Methodology",
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: "What is ping and what does it test?",
    back: "Tests Layer 3 connectivity using ICMP echo request/reply. Verifies host is reachable and measures round-trip time. Options: continuous (-t), count (-c), size. Blocked by some firewalls.",
    domain: "Network Troubleshooting",
    topic: "Tools",
    difficulty: Difficulty.EASY
  },
  {
    type: CardType.DEFINITION,
    front: "What is traceroute/tracert?",
    back: "Shows path packets take to destination. Lists each router hop and response times. Identifies where packets are dropped or delayed. Uses ICMP (Linux) or ICMP + UDP (Windows).",
    domain: "Network Troubleshooting",
    topic: "Tools",
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: "What is ipconfig/ifconfig?",
    back: "Displays network adapter configuration: IP address, subnet mask, default gateway, MAC address. ipconfig (Windows), ifconfig (Linux/Mac). Common commands: /all, /release, /renew, /flushdns.",
    domain: "Network Troubleshooting",
    topic: "Tools",
    difficulty: Difficulty.EASY
  },
  {
    type: CardType.DEFINITION,
    front: "What is nslookup/dig?",
    back: "DNS lookup tools. Query DNS servers to resolve names to IPs or reverse. Troubleshoot DNS issues: misconfiguration, server problems, propagation delays. dig provides more detailed output.",
    domain: "Network Troubleshooting",
    topic: "Tools",
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: "What is netstat?",
    back: "Displays network connections, routing tables, interface statistics, protocol statistics. Shows active connections, listening ports, established sessions. Useful for finding which ports are in use.",
    domain: "Network Troubleshooting",
    topic: "Tools",
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: "What is a packet analyzer (Wireshark)?",
    back: "Captures and analyzes network traffic at packet level. Deep inspection of protocols, conversations, errors. Essential for complex troubleshooting. Can decrypt HTTPS with keys. Very powerful tool.",
    domain: "Network Troubleshooting",
    topic: "Tools",
    difficulty: Difficulty.HARD
  },
  {
    type: CardType.DEFINITION,
    front: "What is a cable tester?",
    back: "Tests physical cable integrity: continuity, wire mapping, length. Identifies opens, shorts, miswires, split pairs. TDR (Time Domain Reflectometer) locates break distance. Essential for cable troubleshooting.",
    domain: "Network Troubleshooting",
    topic: "Tools",
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: "What is a loopback adapter/plug?",
    back: "Tests network interface by redirecting output back to input. Verifies NIC functionality independent of cable/network. Software loopback: 127.0.0.1. Hardware: special connector shorting pins.",
    domain: "Network Troubleshooting",
    topic: "Tools",
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: "What causes high latency?",
    back: "Distance (geographic), congestion (bandwidth saturation), routing (inefficient paths), processing (underpowered devices), wireless interference, queuing delays, packet loss requiring retransmission.",
    domain: "Network Troubleshooting",
    topic: "Performance",
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: "What causes intermittent connectivity?",
    back: "Loose cables, failing hardware, interference (EMI/RFI), duplex mismatches, spanning tree reconvergence, DHCP lease expiration, wireless roaming issues, overheating devices.",
    domain: "Network Troubleshooting",
    topic: "Connectivity",
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: "What is a duplex mismatch?",
    back: "One end set to full-duplex, other to half-duplex. Causes collisions, slow speeds, errors. Often happens with auto-negotiation issues. Symptoms: works but slow, high error rates. Fix: manually configure both ends.",
    domain: "Network Troubleshooting",
    topic: "Configuration",
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DEFINITION,
    front: "What is a broadcast storm?",
    back: "Excessive broadcast traffic saturating network. Caused by switching loops, misconfigured devices, malware. Network becomes unusable. Prevention: STP, storm control features, proper configuration.",
    domain: "Network Troubleshooting",
    topic: "Performance",
    difficulty: Difficulty.HARD
  },
  {
    type: CardType.DEFINITION,
    front: "What causes VLAN mismatch issues?",
    back: "Access port in wrong VLAN, trunk not carrying required VLANs, native VLAN mismatch on trunk, incorrect VLAN tagging. Symptoms: no connectivity between devices that should communicate.",
    domain: "Network Troubleshooting",
    topic: "Configuration",
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.SCENARIO,
    scenario: "Users can't access a specific website but other sites work. What's the likely issue?",
    options: [
          "Switch failure",
          "DNS problem",
          "Cable fault",
          "Power outage"
    ],
    correctAnswer: 1,
    explanation: "If only one site is affected, it's likely a DNS issue (can't resolve that specific domain) or the website itself is down. Other connectivity issues would affect all sites.",
    domain: "Network Troubleshooting",
    topic: "Diagnosis",
    difficulty: Difficulty.EASY
  },
  {
    type: CardType.SCENARIO,
    scenario: "Ping succeeds but can't access web pages. What layer is the problem?",
    options: [
          "Layer 1 (Physical)",
          "Layer 3 (Network)",
          "Layer 7 (Application)",
          "Layer 2 (Data Link)"
    ],
    correctAnswer: 2,
    explanation: "Ping uses ICMP (Layer 3). If ping works, Layers 1-3 are functioning. Web browsing uses HTTP (Layer 7), so the problem is at the application layer - likely DNS, web browser, or server issue.",
    domain: "Network Troubleshooting",
    topic: "Diagnosis",
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.SCENARIO,
    scenario: "New switch installed. Devices can ping each other but internet access fails. What's likely misconfigured?",
    options: [
          "VLAN",
          "Default gateway",
          "MAC addresses",
          "Cable type"
    ],
    correctAnswer: 1,
    explanation: "Without correct default gateway configuration, devices can't route to external networks. They can communicate locally (same subnet) but can't reach the internet.",
    domain: "Network Troubleshooting",
    topic: "Configuration",
    difficulty: Difficulty.MEDIUM
  },
  {
    type: CardType.DRAGDROP,
    instructions: "Match each tool to its primary use:",
    targets: [
          {
                "label": "ping",
                "correctItem": "Test Layer 3 connectivity"
          },
          {
                "label": "traceroute",
                "correctItem": "Identify path and hop-by-hop delays"
          },
          {
                "label": "Wireshark",
                "correctItem": "Capture and analyze packets"
          },
          {
                "label": "cable tester",
                "correctItem": "Verify physical cable integrity"
          }
    ],
    items: [
          "Test Layer 3 connectivity",
          "Identify path and hop-by-hop delays",
          "Capture and analyze packets",
          "Verify physical cable integrity"
    ],
    topic: "Network Troubleshooting",
    difficulty: Difficulty.TOOLS
  }
]
