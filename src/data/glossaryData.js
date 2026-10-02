// Glossary terms for blockchain education
// Written for non-technical officers in 1–3 sentences

export const glossaryTerms = [
  {
    term: 'Blockchain',
    definition: 'A shared digital record book (ledger) that stores information in linked groups called "blocks." Once a block is added, it cannot be secretly changed, because every participant has a copy and any alteration would be immediately detected.',
  },
  {
    term: 'Block',
    definition: 'A container that holds a batch of transactions along with a timestamp, its own unique fingerprint (hash), and the fingerprint of the previous block. Blocks are chained together in order, forming the blockchain.',
  },
  {
    term: 'Hash',
    definition: 'A unique digital fingerprint generated from data using a mathematical function. Even a tiny change in the data produces a completely different hash, making it easy to detect tampering.',
  },
  {
    term: 'Transaction',
    definition: 'A single recorded action on the blockchain, such as transferring a spare part from a warehouse to a naval base. Each transaction includes who sent it, who received it, and when it happened.',
  },
  {
    term: 'Node',
    definition: 'A computer connected to the blockchain network that stores a copy of the entire ledger and helps verify new transactions. More nodes means the network is harder to compromise.',
  },
  {
    term: 'Consensus',
    definition: 'The process by which nodes in the network agree that a transaction is valid before it is added to the blockchain. This prevents any single participant from adding false information.',
  },
  {
    term: 'Wallet',
    definition: 'A digital tool that stores the cryptographic keys needed to send and receive transactions on a blockchain. Think of it like a secure digital identity card for the network.',
  },
  {
    term: 'Smart Contract',
    definition: 'A set of rules written as code that automatically executes when pre-defined conditions are met. For example: "Release payment only after delivery is confirmed AND inspection is passed."',
  },
  {
    term: 'Private Key',
    definition: 'A secret code known only to the owner that is used to sign (authorise) transactions. It must be kept confidential — anyone with your private key can act on your behalf.',
  },
  {
    term: 'Public Address',
    definition: 'A shareable identifier (like an email address) that others can use to send transactions to you. It is derived from your private key but does not reveal it.',
  },
  {
    term: 'Immutability',
    definition: 'The property that once data is written to the blockchain, it cannot be altered or deleted without detection. This creates a permanent, trustworthy audit trail.',
  },
  {
    term: 'Distributed Ledger',
    definition: 'A database that is shared and synchronised across multiple locations or organisations. No single party controls it, making it more transparent and resistant to single points of failure.',
  },
];
