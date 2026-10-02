// Security Case Studies — Fictional but realistic naval scenarios
// Demonstrating how blockchain prevents common security threats

export const securityCaseStudies = [
  {
    id: 'counterfeit-parts',
    icon: '🔧',
    title: 'Case Study 1: The Counterfeit Spare Part',
    category: 'Supply Chain Integrity',
    difficulty: 'Introductory',
    duration: '10 min',
    scenario: {
      title: 'The Problem',
      background: 'INS Vikrant (fictional) reported repeated failures of High-Pressure Turbine Bearings (Part NAV-SPARE-204) during routine operations. The bearings were failing after just 200 hours of operation — far below their rated 5,000-hour lifespan.',
      timeline: [
        { date: 'Day 1', event: 'Vessel reports first bearing failure after 180 hours of operation', icon: '⚠' },
        { date: 'Day 5', event: 'Second bearing from the same batch fails after 210 hours', icon: '⚠' },
        { date: 'Day 8', event: 'Maintenance officer raises a Quality Discrepancy Report (QDR)', icon: '📋' },
        { date: 'Day 12', event: 'Investigation discovers that the bearings were sourced from an unauthorised sub-supplier', icon: '🔍' },
        { date: 'Day 15', event: 'Physical inspection reveals the bearings are counterfeit — made from inferior steel alloy', icon: '❌' },
        { date: 'Day 20', event: 'All 50 bearings from the batch are recalled. Vessel operations disrupted for 3 weeks.', icon: '🚨' },
      ],
      impact: [
        'Vessel readiness reduced — unable to deploy for 3 weeks',
        'Potential safety hazard to crew if failure occurred during operations',
        '₹2.4 crore financial loss (counterfeit parts + emergency procurement + downtime)',
        'Integrity of the entire supply chain questioned',
      ],
    },
    investigation: {
      title: 'Why Did Traditional Methods Fail?',
      failures: [
        { method: 'Paper-Based Records', problem: 'The sub-supplier forged a certificate of origin. Paper certificates were easy to duplicate and had no real-time verification mechanism.' },
        { method: 'Manual Inspection at Warehouse', problem: 'The counterfeit bearings looked identical to genuine ones. Visual inspection could not detect the inferior alloy without destructive testing.' },
        { method: 'Single-Point Verification', problem: 'Only the receiving warehouse checked the supplier credentials. No downstream verification existed — once past the gate, parts were trusted.' },
        { method: 'Fragmented Records', problem: 'The manufacturer, warehouse, logistics, and vessel each maintained separate records. Nobody had a complete picture of the supply chain.' },
      ],
    },
    solution: {
      title: 'How Blockchain Prevents This',
      steps: [
        {
          step: 1,
          heading: 'Manufacturer Registers Part on Blockchain',
          detail: 'When a genuine manufacturer produces NAV-SPARE-204, they record the part ID, material composition, test results, and quality certificate hash on the blockchain. This creates a permanent, timestamped "birth certificate" for every part.',
          icon: '🏭',
        },
        {
          step: 2,
          heading: 'Every Transfer is Recorded',
          detail: 'Each time the part changes hands (manufacturer → warehouse → logistics → base → vessel), a new transaction is recorded. The chain of custody is complete and unbreakable.',
          icon: '🔗',
        },
        {
          step: 3,
          heading: 'Receiving Officer Verifies on Blockchain',
          detail: 'Before accepting the part, the receiving officer scans the part ID and checks the blockchain. They can instantly verify: Who manufactured it? When? What tests were done? Is the supplier authorised? Does the chain of custody have any gaps?',
          icon: '✅',
        },
        {
          step: 4,
          heading: 'Counterfeit Part Has No Blockchain Record',
          detail: 'A counterfeit part would have NO blockchain record from the genuine manufacturer. Even if a fraudster creates a fake record, it would not be signed by the verified manufacturer node — instantly flagged as suspicious.',
          icon: '🚫',
        },
        {
          step: 5,
          heading: 'Alert Propagates to All Participants',
          detail: 'If a suspicious part is detected, an alert is recorded on the blockchain. Every participant in the network (other bases, warehouses, vessels) is immediately informed — preventing the same counterfeit batch from entering service elsewhere.',
          icon: '📢',
        },
      ],
      outcome: 'With blockchain, the counterfeit bearings would have been detected at the very first receiving point. The unauthorised sub-supplier would have had no verified blockchain record. The vessel would never have received defective parts, and crew safety would not have been compromised.',
    },
    quiz: [
      { id: 'sc1q1', question: 'Why couldn\'t the counterfeit bearings be detected by the warehouse\'s existing process?', options: ['The warehouse was understaffed', 'Paper certificates were easy to forge, and visual inspection couldn\'t detect inferior alloy', 'The counterfeit parts were actually genuine', 'The warehouse had no inspection process'], correct: 1, explanation: 'Traditional paper-based certificates can be easily forged, and counterfeit parts are often designed to look identical to genuine ones. Without destructive testing or a verifiable digital record, detection is extremely difficult.' },
      { id: 'sc1q2', question: 'How does blockchain create a "birth certificate" for each part?', options: ['By photographing each part', 'By recording the part ID, material composition, test results, and quality certificate hash as a permanent, timestamped transaction from the verified manufacturer', 'By attaching a physical label', 'By registering it in a government database'], correct: 1, explanation: 'The manufacturer records the part\'s details on the blockchain as the very first transaction. This creates a permanent, immutable record that cannot be forged because it is signed by the verified manufacturer\'s node.' },
      { id: 'sc1q3', question: 'What would happen if a counterfeiter tried to create a fake blockchain record?', options: ['It would be accepted by the system', 'It would be rejected because the fake record would not be signed by the verified manufacturer\'s node — instantly flagged as suspicious', 'It would replace the genuine record', 'Nobody would notice'], correct: 1, explanation: 'Each participant on the blockchain network has a unique cryptographic identity. A counterfeit record would not have the genuine manufacturer\'s digital signature, making it immediately identifiable as fraudulent.' },
    ],
  },
  {
    id: 'record-tampering',
    icon: '📝',
    title: 'Case Study 2: The Altered Maintenance Log',
    category: 'Record Integrity',
    difficulty: 'Intermediate',
    duration: '10 min',
    scenario: {
      title: 'The Problem',
      background: 'During a Board of Inspection (BOI) following a machinery failure on INS Shivalik (fictional), investigators discovered that maintenance records had been backdated. A critical inspection that was listed as "completed" had actually never been performed.',
      timeline: [
        { date: 'Week 1', event: 'Starboard gas turbine develops abnormal vibration during high-speed operations', icon: '⚠' },
        { date: 'Week 2', event: 'Turbine fails catastrophically. Vessel limps to port on single engine.', icon: '🚨' },
        { date: 'Week 3', event: 'Board of Inspection convened. Maintenance records show the 500-hour inspection was "completed on schedule"', icon: '📋' },
        { date: 'Week 4', event: 'Cross-examination reveals the maintenance engineer was on leave during the recorded inspection date', icon: '🔍' },
        { date: 'Week 5', event: 'Digital forensics confirms the maintenance log entry was created 3 days AFTER the scheduled date, not on the date shown', icon: '❌' },
        { date: 'Week 6', event: 'Investigation concludes: Inspection was never performed. Record was falsified to meet compliance deadlines.', icon: '⚖' },
      ],
      impact: [
        'Vessel incapacitated for 6 weeks during turbine replacement',
        'Crew safety endangered — catastrophic failure at sea could have caused casualties',
        'Court of Inquiry proceedings initiated against responsible personnel',
        'Trust in maintenance record integrity undermined across the fleet',
      ],
    },
    investigation: {
      title: 'Why Did Traditional Methods Fail?',
      failures: [
        { method: 'Digital Spreadsheet Log', problem: 'The maintenance log was a shared spreadsheet. Any authorised user could edit any entry, including past entries. There was no audit trail of edits.' },
        { method: 'Supervisor Sign-Off', problem: 'The supervisor signed off on the record without independently verifying the work — a routine practice when workload is high.' },
        { method: 'No Tamper Detection', problem: 'The system had no mechanism to detect that a record was created after the stated date. Timestamps could be manually set.' },
        { method: 'Single Database', problem: 'All records were in one database controlled by the engineering department. No independent verification was possible.' },
      ],
    },
    solution: {
      title: 'How Blockchain Prevents This',
      steps: [
        {
          step: 1,
          heading: 'Maintenance Entry Created in Real-Time',
          detail: 'When an inspection is performed, the engineer records it on the blockchain immediately. The blockchain assigns an immutable timestamp from the network — not from the user\'s device. The timestamp cannot be manipulated.',
          icon: '⏰',
        },
        {
          step: 2,
          heading: 'Record is Instantly Permanent',
          detail: 'Once the maintenance record is written to the blockchain, it cannot be altered, deleted, or backdated. The entry exists in its original form forever, visible to all authorised participants.',
          icon: '🔒',
        },
        {
          step: 3,
          heading: 'Multiple Parties Verify',
          detail: 'The blockchain record is validated by multiple nodes (e.g., engineering department, fleet command, inspection authority). No single party can create or modify a record without consensus.',
          icon: '👥',
        },
        {
          step: 4,
          heading: 'Gap Detection is Automatic',
          detail: 'If a scheduled 500-hour inspection was due on Day X and no blockchain record exists by Day X+1, the system automatically flags the gap. Missed inspections cannot be "papered over" later.',
          icon: '🔔',
        },
        {
          step: 5,
          heading: 'Complete Audit Trail for Investigations',
          detail: 'During a BOI, investigators can pull the complete, immutable maintenance history. Every action has a verified timestamp, an identified performer, and cannot have been retroactively modified.',
          icon: '📊',
        },
      ],
      outcome: 'With blockchain, the missed 500-hour inspection would have been immediately flagged by the system. The engineer could not have created a backdated entry because the blockchain timestamp is set by the network, not the user. The turbine failure might have been prevented entirely.',
    },
    quiz: [
      { id: 'sc2q1', question: 'What was the key failure that allowed the falsification of the maintenance record?', options: ['The maintenance engineer was not qualified', 'The digital spreadsheet allowed past entries to be edited with no audit trail, and timestamps could be manually set', 'The turbine was too old to maintain', 'The inspection equipment was broken'], correct: 1, explanation: 'The core vulnerability was that the record-keeping system allowed records to be created or modified after the fact, with manually settable timestamps and no immutable audit trail.' },
      { id: 'sc2q2', question: 'How does blockchain prevent backdating of records?', options: ['By requiring a password', 'By using network-assigned timestamps that cannot be manipulated by the user, and making records permanent once written', 'By locking the computer after 5pm', 'By emailing the supervisor'], correct: 1, explanation: 'Blockchain timestamps are assigned by the network through consensus, not by the individual user\'s device. Once a record is written, it cannot be altered — making backdating impossible.' },
      { id: 'sc2q3', question: 'What additional benefit does blockchain provide during a Board of Inspection (BOI)?', options: ['It makes the investigation unnecessary', 'It provides a complete, immutable, verified audit trail where every action has a confirmed timestamp and identified performer', 'It automatically repairs the equipment', 'It reduces paperwork only'], correct: 1, explanation: 'Investigators get access to a tamper-proof chronological record. They can trust that every entry is authentic, timestamped by the network, and has not been retroactively modified.' },
    ],
  },
  {
    id: 'procurement-fraud',
    icon: '💰',
    title: 'Case Study 3: The Procurement Fraud',
    category: 'Procurement Integrity',
    difficulty: 'Advanced',
    duration: '10 min',
    scenario: {
      title: 'The Problem',
      background: 'An internal audit at Naval Dockyard (fictional) uncovered a procurement fraud scheme. A procurement officer had been routing orders to a shell company owned by a relative. The shell company would receive payment for goods that were either never delivered or delivered in lower quantities than invoiced.',
      timeline: [
        { date: 'Month 1', event: 'Internal audit flags unusual pattern: 80% of emergency procurement orders for a specific category go to a single vendor', icon: '📊' },
        { date: 'Month 2', event: 'Audit discovers the vendor ("Marine Solutions Pvt Ltd" — fictional) was registered just 6 months before the first order', icon: '🔍' },
        { date: 'Month 3', event: 'Physical stock check reveals 35% shortfall — goods invoiced and paid for were never delivered', icon: '❌' },
        { date: 'Month 4', event: 'Delivery receipts found to be forged — signed by personnel who were not present on the stated dates', icon: '📝' },
        { date: 'Month 5', event: 'Investigation reveals the vendor company is owned by the procurement officer\'s relative. Total fraud: ₹4.7 crore over 18 months.', icon: '⚖' },
        { date: 'Month 6', event: 'Criminal proceedings initiated. Multiple personnel face disciplinary action for negligence in verification.', icon: '🚨' },
      ],
      impact: [
        '₹4.7 crore financial loss to the exchequer',
        'Critical spare parts shortage affecting vessel readiness',
        'Multiple personnel face court-martial and criminal prosecution',
        'Procurement process credibility severely damaged',
        'Systemic review ordered across all dockyards',
      ],
    },
    investigation: {
      title: 'Why Did Traditional Methods Fail?',
      failures: [
        { method: 'Manual Delivery Verification', problem: 'Delivery receipts were paper-based. The procurement officer could forge signatures or have an associate sign for non-existent deliveries.' },
        { method: 'Single-Authority Approval', problem: 'The same officer who selected the vendor also approved the delivery and authorised payment. Insufficient separation of duties.' },
        { method: 'Delayed Audit Cycle', problem: 'Internal audits occurred annually. The fraud ran undetected for 18 months because there was no real-time verification mechanism.' },
        { method: 'No Automated Cross-Checks', problem: 'The system did not automatically compare purchase orders, delivery records, and stock levels. Discrepancies were only found during manual audits.' },
      ],
    },
    solution: {
      title: 'How Blockchain + Smart Contracts Prevent This',
      steps: [
        {
          step: 1,
          heading: 'Vendor Registration on Blockchain',
          detail: 'Every vendor is registered on the blockchain with verified credentials, ownership details, and registration history. The shell company\'s recent registration and lack of history would be a visible red flag to ALL procurement participants.',
          icon: '📝',
        },
        {
          step: 2,
          heading: 'Purchase Order Recorded Immutably',
          detail: 'When a purchase order is created, it is recorded on the blockchain with the ordering officer\'s identity, vendor details, items, quantities, and pricing. This record cannot be altered after the fact.',
          icon: '📦',
        },
        {
          step: 3,
          heading: 'Delivery Verified by Independent Party',
          detail: 'Delivery must be confirmed on the blockchain by BOTH the warehouse receiving officer AND an independent quality inspector — not by the procurement officer. Multi-party confirmation prevents single-point fraud.',
          icon: '👥',
        },
        {
          step: 4,
          heading: 'Smart Contract Enforces Conditions',
          detail: 'A smart contract automatically checks: (1) Is the vendor verified? (2) Does the delivery quantity match the purchase order? (3) Have two independent parties confirmed receipt? (4) Has quality inspection passed? Payment is released ONLY when all conditions are met.',
          icon: '⚙️',
        },
        {
          step: 5,
          heading: 'Real-Time Audit Trail',
          detail: 'Auditors can access the blockchain at any time — not just during annual audits. Discrepancies between purchase orders, deliveries, and stock levels are flagged automatically and immediately.',
          icon: '📊',
        },
      ],
      outcome: 'With blockchain and smart contracts, the shell company would have been flagged at registration due to its lack of history. Forged delivery receipts would be impossible because delivery confirmation requires multiple independent blockchain transactions. Payment would never have been released for undelivered goods because the smart contract would not have found matching delivery confirmations.',
    },
    quiz: [
      { id: 'sc3q1', question: 'What was the fundamental control weakness that enabled the fraud?', options: ['The computer system was hacked', 'The same officer controlled vendor selection, delivery verification, and payment approval — insufficient separation of duties, combined with paper-based records that could be forged', 'The budget was too large', 'The warehouse was understaffed'], correct: 1, explanation: 'The fraud was possible because one person controlled multiple steps in the process, and paper-based records were easy to forge. Blockchain with smart contracts enforces separation of duties automatically.' },
      { id: 'sc3q2', question: 'How does a smart contract prevent payment for undelivered goods?', options: ['By blocking all payments', 'By automatically checking that delivery confirmation exists from multiple independent parties AND quality inspection has passed before releasing payment', 'By requiring the supplier to call and confirm', 'By sending an email to the auditor'], correct: 1, explanation: 'Smart contracts execute pre-defined rules automatically. Payment is released ONLY when all conditions (verified vendor + matching delivery + independent confirmation + quality pass) are met. No human can override these conditions.' },
      { id: 'sc3q3', question: 'Why is real-time auditability important in preventing procurement fraud?', options: ['It reduces paperwork', 'It allows auditors to detect discrepancies immediately — not 18 months later during an annual audit — and automatically flags unusual patterns', 'It makes the process faster', 'It is not important'], correct: 1, explanation: 'The fraud ran for 18 months because audits were annual. With blockchain, every transaction is visible in real-time. Automated monitoring can flag unusual patterns (like 80% of orders going to one vendor) immediately.' },
    ],
  },
];
