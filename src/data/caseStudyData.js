// Case Study data for NAV-SPARE-204 trace journey
// ALL data is entirely fictional

export const partId = 'NAV-SPARE-204';
export const partName = 'High-Pressure Turbine Bearing Assembly';

export const journey = [
  {
    stage: 1,
    location: 'Manufacturer B (Fictional)',
    handler: 'Manufacturing Unit Operator — ID: MFG-OPR-7842',
    action: 'Critical component manufactured and quality-tested at factory',
    timestamp: '2025-03-15T08:11:20Z',
    status: 'Manufactured',
    blockNumber: 10518,
    details: 'Batch of 12 units produced. Factory quality certificate QC-2025-0342 issued.',
  },
  {
    stage: 2,
    location: 'Defence Warehouse Delta',
    handler: 'Warehouse Receiving Officer — ID: DWH-RCV-1205',
    action: 'Received at central defence warehouse and logged into inventory',
    timestamp: '2025-03-15T08:23:10Z',
    status: 'Received at Warehouse',
    blockNumber: 10519,
    details: 'All 12 units received intact. Inventory record WHR-2025-10519 created.',
  },
  {
    stage: 3,
    location: 'Inspection Bay Gamma',
    handler: 'Quality Inspector — ID: QI-INS-0891',
    action: 'Quality inspection passed — all parameters within specification',
    timestamp: '2025-03-15T08:34:00Z',
    status: 'Inspection Passed',
    blockNumber: 10520,
    details: 'Dimensional checks, material tests, and pressure tests completed. Certificate INS-2025-0520 issued.',
  },
  {
    stage: 4,
    location: 'Naval Logistics Centre',
    handler: 'Logistics Coordinator — ID: NLC-LOG-3456',
    action: 'Parts catalogued and prepared for dispatch to operational base',
    timestamp: '2025-03-15T08:47:20Z',
    status: 'Dispatched',
    blockNumber: 10521,
    details: 'Consignment note CN-2025-0521 generated. Transport via secure naval logistics convoy.',
  },
  {
    stage: 5,
    location: 'Naval Base Echo',
    handler: 'Base Supply Officer — ID: NBE-SUP-6723',
    action: 'Received at Naval Base and verified against consignment note',
    timestamp: '2025-03-15T09:00:00Z',
    status: 'Received at Base',
    blockNumber: 10522,
    details: 'All 12 units verified. Base receipt record BR-2025-0522 created.',
  },
  {
    stage: 6,
    location: 'Vessel Maintenance Unit (VMU)',
    handler: 'Chief Engineering Technician — ID: VMU-CET-4189',
    action: 'Received by Vessel Maintenance Unit for installation',
    timestamp: '2025-03-15T09:00:00Z',
    status: 'Delivered to End User',
    blockNumber: 10522,
    details: 'Parts assigned to Vessel INS Fictional (pennant F-42). Installation scheduled.',
  },
];

export const caseStudyQuestions = [
  {
    id: 'cs1',
    question: 'Where did part NAV-SPARE-204 originate?',
    options: ['Defence Warehouse Delta', 'Manufacturer B (Fictional)', 'Naval Logistics Centre', 'Supplier Hub East'],
    correct: 1,
    explanation: 'The blockchain record shows that NAV-SPARE-204 was manufactured at Manufacturer B (Fictional), which is the first entry in the supply chain.',
    points: 3,
  },
  {
    id: 'cs2',
    question: 'Who recorded the transfer from the warehouse to the inspection bay?',
    options: ['Quality Inspector — ID: QI-INS-0891', 'Warehouse Receiving Officer — ID: DWH-RCV-1205', 'Logistics Coordinator — ID: NLC-LOG-3456', 'Manufacturing Unit Operator — ID: MFG-OPR-7842'],
    correct: 1,
    explanation: 'The Warehouse Receiving Officer (DWH-RCV-1205) logged the part into inventory, and the transfer to Inspection Bay Gamma was initiated from the warehouse.',
    points: 3,
  },
  {
    id: 'cs3',
    question: 'When was NAV-SPARE-204 received at Naval Base Echo?',
    options: ['2025-03-15 at 08:11', '2025-03-15 at 08:34', '2025-03-15 at 09:00', '2025-03-15 at 08:47'],
    correct: 2,
    explanation: 'The blockchain timestamp in Block #10522 confirms that NAV-SPARE-204 was received at Naval Base Echo at 09:00 on 15 March 2025.',
    points: 3,
  },
  {
    id: 'cs4',
    question: 'Was the quality inspection completed before the part was dispatched?',
    options: ['No, inspection was skipped', 'Yes — inspection passed in Block #10520 before dispatch in Block #10521', 'The inspection is still pending', 'Inspection was done at the Naval Base'],
    correct: 1,
    explanation: 'Block #10520 records the inspection pass at 08:34, and Block #10521 records the dispatch at 08:47 — confirming the correct sequence.',
    points: 3,
  },
  {
    id: 'cs5',
    question: 'Is the final delivery record consistent with all previous records in the chain?',
    options: ['No — the quantity changed during transit', 'No — the part ID was altered', 'Yes — every record shows 12 units of NAV-SPARE-204 with consistent handlers and timestamps', 'Cannot be determined from the blockchain'],
    correct: 2,
    explanation: 'Every blockchain record consistently shows 12 units of NAV-SPARE-204, with proper sequential timestamps and identified handlers at each stage, demonstrating full traceability.',
    points: 3,
  },
];
