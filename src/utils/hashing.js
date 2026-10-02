import SHA256 from 'crypto-js/sha256';

/**
 * Generate a SHA-256 hash from input string.
 * Used for the "Build & Verify a Block" simulation.
 */
export function generateHash(input) {
  return SHA256(input).toString();
}

/**
 * Create a block hash from block data.
 */
export function computeBlockHash(previousHash, timestamp, data) {
  const input = `${previousHash}${timestamp}${JSON.stringify(data)}`;
  return generateHash(input);
}
