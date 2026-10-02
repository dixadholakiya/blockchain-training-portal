// Fictional blockchain data for the Naval Logistics Explorer
// ALL data is entirely fictional — no real ships, parts, or organisations

export const blocks = [
  {
    number: 10518,
    timestamp: '2025-03-15T08:12:34Z',
    previousHash: '0000000000000000000000000000000000000000000000000000000000000000',
    hash: 'a3f7c9d2e1b84560f3a72c91d8e54b03f6a1c7d9e2b85460f3a72c91d8e54b03',
    validator: 'Naval Node Alpha',
    transactions: [
      { txId: 'TX-10518-001', partId: 'SPARE-PART-INS-001', from: 'Manufacturer A (Fictional)', to: 'Defence Warehouse Delta', action: 'Part manufactured and dispatched', timestamp: '2025-03-15T08:10:00Z', quantity: 50, status: 'Confirmed' },
      { txId: 'TX-10518-002', partId: 'NAV-SPARE-204', from: 'Manufacturer B (Fictional)', to: 'Defence Warehouse Delta', action: 'Critical component manufactured', timestamp: '2025-03-15T08:11:20Z', quantity: 12, status: 'Confirmed' },
    ],
  },
  {
    number: 10519,
    timestamp: '2025-03-15T08:24:17Z',
    previousHash: 'a3f7c9d2e1b84560f3a72c91d8e54b03f6a1c7d9e2b85460f3a72c91d8e54b03',
    hash: 'b8e21f4c6a7d305891c4b6e2f7a9d1035c8e21f4c6a7d305891c4b6e2f7a9d10',
    validator: 'Naval Node Bravo',
    transactions: [
      { txId: 'TX-10519-001', partId: 'SPARE-PART-INS-001', from: 'Defence Warehouse Delta', to: 'Naval Logistics Centre', action: 'Received at Naval Logistics Centre', timestamp: '2025-03-15T08:20:00Z', quantity: 50, status: 'Confirmed' },
      { txId: 'TX-10519-002', partId: 'SPARE-PART-INS-002', from: 'Manufacturer C (Fictional)', to: 'Supplier Hub East', action: 'Hull plate batch transferred', timestamp: '2025-03-15T08:22:45Z', quantity: 30, status: 'Confirmed' },
      { txId: 'TX-10519-003', partId: 'NAV-SPARE-204', from: 'Defence Warehouse Delta', to: 'Inspection Bay Gamma', action: 'Sent for quality inspection', timestamp: '2025-03-15T08:23:10Z', quantity: 12, status: 'Confirmed' },
    ],
  },
  {
    number: 10520,
    timestamp: '2025-03-15T08:36:42Z',
    previousHash: 'b8e21f4c6a7d305891c4b6e2f7a9d1035c8e21f4c6a7d305891c4b6e2f7a9d10',
    hash: 'c5d93e7a1b4f628d0a3c5e97b1d4f628d0a3c5e97b1d4f6280a3c5e97b1d4f62',
    validator: 'Naval Node Charlie',
    transactions: [
      { txId: 'TX-10520-001', partId: 'NAV-SPARE-204', from: 'Inspection Bay Gamma', to: 'Naval Logistics Centre', action: 'Inspection passed — quality verified', timestamp: '2025-03-15T08:34:00Z', quantity: 12, status: 'Confirmed' },
      { txId: 'TX-10520-002', partId: 'SPARE-PART-INS-001', from: 'Naval Logistics Centre', to: 'Naval Base Echo', action: 'Dispatched to Naval Base', timestamp: '2025-03-15T08:35:30Z', quantity: 50, status: 'Confirmed' },
    ],
  },
  {
    number: 10521,
    timestamp: '2025-03-15T08:48:55Z',
    previousHash: 'c5d93e7a1b4f628d0a3c5e97b1d4f628d0a3c5e97b1d4f6280a3c5e97b1d4f62',
    hash: 'd7f14a8b2c5e739401d6a8f14b2c5e739401d6a8f14b2c5e7394f14b2c5e7394',
    validator: 'Naval Node Delta',
    transactions: [
      { txId: 'TX-10521-001', partId: 'SPARE-PART-INS-001', from: 'Naval Base Echo', to: 'Vessel Maintenance Unit (VMU)', action: 'Received by Vessel Maintenance Unit', timestamp: '2025-03-15T08:45:00Z', quantity: 50, status: 'Confirmed' },
      { txId: 'TX-10521-002', partId: 'NAV-SPARE-204', from: 'Naval Logistics Centre', to: 'Naval Base Echo', action: 'Dispatched to Naval Base', timestamp: '2025-03-15T08:47:20Z', quantity: 12, status: 'Confirmed' },
      { txId: 'TX-10521-003', partId: 'SPARE-PART-INS-003', from: 'Supplier Hub East', to: 'Defence Warehouse Delta', action: 'Electronic module batch received', timestamp: '2025-03-15T08:48:10Z', quantity: 25, status: 'Confirmed' },
    ],
  },
  {
    number: 10522,
    timestamp: '2025-03-15T09:01:28Z',
    previousHash: 'd7f14a8b2c5e739401d6a8f14b2c5e739401d6a8f14b2c5e7394f14b2c5e7394',
    hash: 'e2a85c9d3f6b84721e5c9a2d3f6b84721e5c9a2d3f6b84721e5c9a2d3f6b8472',
    validator: 'Naval Node Alpha',
    transactions: [
      { txId: 'TX-10522-001', partId: 'NAV-SPARE-204', from: 'Naval Base Echo', to: 'Vessel Maintenance Unit (VMU)', action: 'Received by Vessel Maintenance Unit', timestamp: '2025-03-15T09:00:00Z', quantity: 12, status: 'Confirmed' },
      { txId: 'TX-10522-002', partId: 'SPARE-PART-INS-002', from: 'Supplier Hub East', to: 'Defence Warehouse Delta', action: 'Hull plates received at warehouse', timestamp: '2025-03-15T09:00:45Z', quantity: 30, status: 'Confirmed' },
    ],
  },
  {
    number: 10523,
    timestamp: '2025-03-15T09:14:03Z',
    previousHash: 'e2a85c9d3f6b84721e5c9a2d3f6b84721e5c9a2d3f6b84721e5c9a2d3f6b8472',
    hash: 'f1b96d0e4a7c95832f6d0b1e4a7c95832f6d0b1e4a7c95832f6d0b1e4a7c9583',
    validator: 'Naval Node Bravo',
    transactions: [
      { txId: 'TX-10523-001', partId: 'SPARE-PART-INS-003', from: 'Defence Warehouse Delta', to: 'Naval Logistics Centre', action: 'Electronic modules forwarded', timestamp: '2025-03-15T09:12:00Z', quantity: 25, status: 'Confirmed' },
      { txId: 'TX-10523-002', partId: 'SPARE-PART-INS-004', from: 'Manufacturer D (Fictional)', to: 'Defence Warehouse Delta', action: 'Propulsion component manufactured', timestamp: '2025-03-15T09:13:15Z', quantity: 8, status: 'Confirmed' },
    ],
  },
  {
    number: 10524,
    timestamp: '2025-03-15T09:26:41Z',
    previousHash: 'f1b96d0e4a7c95832f6d0b1e4a7c95832f6d0b1e4a7c95832f6d0b1e4a7c9583',
    hash: '08c47e1f5b8d06943a7e1c08f5b8d06943a7e1c08f5b8d06943a7e1c08f5b8d0',
    validator: 'Naval Node Charlie',
    transactions: [
      { txId: 'TX-10524-001', partId: 'SPARE-PART-INS-002', from: 'Defence Warehouse Delta', to: 'Naval Base Foxtrot', action: 'Hull plates dispatched', timestamp: '2025-03-15T09:24:00Z', quantity: 30, status: 'Confirmed' },
      { txId: 'TX-10524-002', partId: 'SPARE-PART-INS-005', from: 'Manufacturer E (Fictional)', to: 'Supplier Hub West', action: 'Radar component manufactured', timestamp: '2025-03-15T09:25:30Z', quantity: 15, status: 'Confirmed' },
      { txId: 'TX-10524-003', partId: 'SPARE-PART-INS-003', from: 'Naval Logistics Centre', to: 'Naval Base Echo', action: 'Electronic modules dispatched', timestamp: '2025-03-15T09:26:00Z', quantity: 25, status: 'Confirmed' },
    ],
  },
  {
    number: 10525,
    timestamp: '2025-03-15T09:38:19Z',
    previousHash: '08c47e1f5b8d06943a7e1c08f5b8d06943a7e1c08f5b8d06943a7e1c08f5b8d0',
    hash: '19d58f2a6c9e17054b8f2d19a6c9e17054b8f2d19a6c9e17054b8f2d19a6c9e1',
    validator: 'Naval Node Delta',
    transactions: [
      { txId: 'TX-10525-001', partId: 'SPARE-PART-INS-004', from: 'Defence Warehouse Delta', to: 'Inspection Bay Gamma', action: 'Propulsion parts sent for inspection', timestamp: '2025-03-15T09:36:00Z', quantity: 8, status: 'Confirmed' },
      { txId: 'TX-10525-002', partId: 'SPARE-PART-INS-005', from: 'Supplier Hub West', to: 'Defence Warehouse Delta', action: 'Radar components received', timestamp: '2025-03-15T09:37:30Z', quantity: 15, status: 'Confirmed' },
    ],
  },
  {
    number: 10526,
    timestamp: '2025-03-15T09:50:07Z',
    previousHash: '19d58f2a6c9e17054b8f2d19a6c9e17054b8f2d19a6c9e17054b8f2d19a6c9e1',
    hash: '2ae69a3b7d0f28165c9a3e2ab7d0f28165c9a3e2ab7d0f28165c9a3e2ab7d0f2',
    validator: 'Naval Node Alpha',
    transactions: [
      { txId: 'TX-10526-001', partId: 'SPARE-PART-INS-004', from: 'Inspection Bay Gamma', to: 'Naval Logistics Centre', action: 'Propulsion inspection passed', timestamp: '2025-03-15T09:48:00Z', quantity: 8, status: 'Confirmed' },
      { txId: 'TX-10526-002', partId: 'SPARE-PART-INS-003', from: 'Naval Base Echo', to: 'Vessel Maintenance Unit (VMU)', action: 'Electronic modules installed', timestamp: '2025-03-15T09:49:30Z', quantity: 25, status: 'Confirmed' },
    ],
  },
  {
    number: 10527,
    timestamp: '2025-03-15T10:02:33Z',
    previousHash: '2ae69a3b7d0f28165c9a3e2ab7d0f28165c9a3e2ab7d0f28165c9a3e2ab7d0f2',
    hash: '3bf70b4c8e1a39276d0b4f3bc8e1a39276d0b4f3bc8e1a39276d0b4f3bc8e1a3',
    validator: 'Naval Node Bravo',
    transactions: [
      { txId: 'TX-10527-001', partId: 'SPARE-PART-INS-005', from: 'Defence Warehouse Delta', to: 'Naval Base Foxtrot', action: 'Radar components dispatched', timestamp: '2025-03-15T10:00:00Z', quantity: 15, status: 'Confirmed' },
      { txId: 'TX-10527-002', partId: 'SPARE-PART-INS-004', from: 'Naval Logistics Centre', to: 'Naval Base Golf', action: 'Propulsion parts dispatched', timestamp: '2025-03-15T10:01:45Z', quantity: 8, status: 'Confirmed' },
    ],
  },
];

// Explorer quiz questions
export const explorerQuiz = [
  {
    id: 'eq1',
    question: 'What connects one block to the next in a blockchain?',
    options: ['The block number', 'The timestamp', 'The hash of the previous block', 'The validator name'],
    correct: 2,
    explanation: 'Each block stores the hash of the previous block, creating a cryptographic chain. This is what makes the blockchain tamper-resistant.',
  },
  {
    id: 'eq2',
    question: 'Can a transaction on the blockchain be secretly altered after it has been recorded?',
    options: ['Yes, by the original sender', 'Yes, by the validator', 'No, because it would change the block hash and break the chain', 'No, because blocks are password-protected'],
    correct: 2,
    explanation: 'Changing any data in a block changes its hash, which then mismatches the "previous hash" stored in the next block, breaking the chain.',
  },
  {
    id: 'eq3',
    question: 'What does the "Validator" field in each block represent?',
    options: ['The person who created the transaction', 'The network node that verified and added the block', 'The shipping company', 'The database administrator'],
    correct: 1,
    explanation: 'In a blockchain, validators are network participants who verify transactions and add new blocks to the chain through a consensus process.',
  },
  {
    id: 'eq4',
    question: 'Why is every transaction timestamped?',
    options: ['For billing purposes only', 'To create a permanent, auditable record of when each action occurred', 'Because the software requires it', 'To calculate shipping time only'],
    correct: 1,
    explanation: 'Timestamps create an immutable chronological record, enabling full traceability and auditability of the supply chain.',
  },
];
