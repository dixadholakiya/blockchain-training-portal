import React, { useState, useEffect } from 'react';
import { generateHash } from '../utils/hashing.js';
import { useTraining } from '../context/TrainingContext.jsx';

// Initial Genesis Block
const GENESIS_BLOCK = {
  index: 0,
  timestamp: '2026-10-01 08:00:00',
  data: {
    origin: 'Naval Operations HQ',
    operation: 'OPERATION TRIDENT LOGISTICS',
    status: 'GENESIS INITIALIZED'
  },
  previousHash: '0000000000000000000000000000000000000000000000000000000000000000',
  nonce: 4201,
  hash: '0000a89f3c1b72e491028471abc90214819d023412589eac8910234159082341'
};

export default function UnifiedLab() {
  const { dispatch, modules } = useTraining();
  const [currentStep, setCurrentStep] = useState(1);

  // Font scale state (default 1.5x as requested)
  const [fontScale, setFontScale] = useState('1.5');

  // Single Chain State across all concepts
  const [chain, setChain] = useState([GENESIS_BLOCK]);

  // Step 1 State: Block Mining
  const [block1Data, setBlock1Data] = useState({
    dispatchBase: 'INS Hansa Naval Base',
    cargo: '120x Heavy Torpedo Munitions',
    temperature: '19°C',
    escortStatus: 'SECURE_NAVAL_ESCORT',
    recipient: 'INS Vikrant Aircraft Carrier'
  });
  const [block1Nonce, setBlock1Nonce] = useState(0);
  const [isMining, setIsMining] = useState(false);
  const [minedBlock1, setMinedBlock1] = useState(false);

  // Step 2 State: Smart Contract
  const [contractRules, setContractRules] = useState({
    maxTemp: 22,
    requiredEscort: 'SECURE_NAVAL_ESCORT',
    autoApprove: true
  });
  const [contractExecuted, setContractExecuted] = useState(false);
  const [contractResult, setContractResult] = useState(null);

  // Step 3 State: Tampering
  const [isTampered, setIsTampered] = useState(false);
  const [tamperedCargoValue, setTamperedCargoValue] = useState('12x Heavy Torpedo Munitions');

  // Step 4 State: Audit & Repair
  const [auditResults, setAuditResults] = useState(null);
  const [chainRepaired, setChainRepaired] = useState(false);

  // Apply Font Scale attribute to <html> element
  useEffect(() => {
    document.documentElement.setAttribute('data-font-scale', fontScale);
    return () => {
      document.documentElement.removeAttribute('data-font-scale');
    };
  }, [fontScale]);

  // Helper to compute a block hash
  const calculateHashForBlock = (index, prevHash, timestamp, dataObj, nonceVal) => {
    const stringified = `${index}${prevHash}${timestamp}${JSON.stringify(dataObj)}${nonceVal}`;
    return generateHash(stringified);
  };

  // Check validity of chain
  const evaluateChainValidity = (chainList) => {
    return chainList.map((blk, idx) => {
      if (idx === 0) return { ...blk, isValid: true };
      const prevBlock = chainList[idx - 1];
      const recomputedHash = calculateHashForBlock(
        blk.index,
        blk.previousHash,
        blk.timestamp,
        blk.data,
        blk.nonce
      );
      const isPrevHashMatching = blk.previousHash === prevBlock.hash;
      const isHashValid = recomputedHash === blk.hash;
      const isValid = isPrevHashMatching && isHashValid;
      return { ...blk, isValid, recomputedHash, isPrevHashMatching };
    });
  };

  const validatedChain = evaluateChainValidity(chain);

  // --- Step 1: Mine Block 1 ---
  const handleMineBlock1 = () => {
    setIsMining(true);
    let n = 0;
    const prevHash = GENESIS_BLOCK.hash;
    const ts = '2026-10-01 09:30:00';
    
    // Simulate POW mining for 00 prefix
    const timer = setInterval(() => {
      n += 17;
      const h = calculateHashForBlock(1, prevHash, ts, block1Data, n);
      setBlock1Nonce(n);
      
      if (h.startsWith('00') || n > 1500) {
        clearInterval(timer);
        const finalHash = h.startsWith('00') ? h : '00' + h.substring(2);
        const newBlock = {
          index: 1,
          timestamp: ts,
          data: { ...block1Data },
          previousHash: prevHash,
          nonce: n,
          hash: finalHash
        };
        setChain([GENESIS_BLOCK, newBlock]);
        setIsMining(false);
        setMinedBlock1(true);
      }
    }, 30);
  };

  // --- Step 2: Execute Smart Contract ---
  const handleExecuteSmartContract = () => {
    if (chain.length < 2) return;
    const b1 = chain[1];
    const currentTemp = parseInt(b1.data.temperature, 10) || 19;
    const isTempOK = currentTemp <= contractRules.maxTemp;
    const isEscortOK = b1.data.escortStatus === contractRules.requiredEscort;
    const passed = isTempOK && isEscortOK;

    const result = {
      passed,
      details: [
        { rule: `Cargo Temperature (<= ${contractRules.maxTemp}°C)`, value: b1.data.temperature, status: isTempOK ? 'PASSED' : 'FAILED' },
        { rule: `Security Escort Verification`, value: b1.data.escortStatus, status: isEscortOK ? 'PASSED' : 'FAILED' },
      ],
      action: passed ? 'AUTOMATED_DISPATCH_APPROVED' : 'DISPATCH_BLOCKED_SECURITY_REJECT'
    };

    setContractResult(result);
    setContractExecuted(true);

    if (passed) {
      const ts = '2026-10-01 10:15:00';
      const prevHash = b1.hash;
      const contractData = {
        contractName: 'NavalMunitionsClearance_v1.0',
        triggerEvent: 'BLOCK_1_MINED_VERIFIED',
        executionResult: 'DISPATCH_APPROVED',
        digitalSignature: 'SIG_SMART_CONTRACT_DEFENCE_KEY_8892'
      };
      const nonce = 8821;
      const hash = calculateHashForBlock(2, prevHash, ts, contractData, nonce);
      const contractBlock = {
        index: 2,
        timestamp: ts,
        data: contractData,
        previousHash: prevHash,
        nonce,
        hash
      };
      setChain([GENESIS_BLOCK, b1, contractBlock]);
    }
  };

  // --- Step 3: Tamper Attack ---
  const handleTamperBlock1 = () => {
    if (chain.length < 2) return;
    const updatedChain = chain.map((blk) => {
      if (blk.index === 1) {
        return {
          ...blk,
          data: {
            ...blk.data,
            cargo: tamperedCargoValue // Cyber attack modifies cargo count from 120x to 12x
          }
        };
      }
      return blk;
    });
    setChain(updatedChain);
    setIsTampered(true);
  };

  // --- Step 4: Audit & Repair ---
  const handleRunAudit = () => {
    const report = validatedChain.map((blk) => ({
      index: blk.index,
      storedHash: blk.hash,
      recomputedHash: blk.recomputedHash || blk.hash,
      isValid: blk.isValid !== false
    }));
    setAuditResults(report);
  };

  const handleRepairChain = () => {
    // Re-mine / restore Block 1 and recalculate subsequent hashes
    const restoredBlock1Data = {
      dispatchBase: 'INS Hansa Naval Base',
      cargo: '120x Heavy Torpedo Munitions',
      temperature: '19°C',
      escortStatus: 'SECURE_NAVAL_ESCORT',
      recipient: 'INS Vikrant Aircraft Carrier'
    };
    const b1PrevHash = GENESIS_BLOCK.hash;
    const b1Ts = '2026-10-01 09:30:00';
    const b1Nonce = 840;
    const b1Hash = '0089aef410b0294192418a0b012481029419204128901249124018241029841a';

    const fixedBlock1 = {
      index: 1,
      timestamp: b1Ts,
      data: restoredBlock1Data,
      previousHash: b1PrevHash,
      nonce: b1Nonce,
      hash: b1Hash
    };

    let newChain = [GENESIS_BLOCK, fixedBlock1];

    if (contractExecuted && contractResult?.passed) {
      const b2Ts = '2026-10-01 10:15:00';
      const b2PrevHash = b1Hash;
      const b2Data = {
        contractName: 'NavalMunitionsClearance_v1.0',
        triggerEvent: 'BLOCK_1_MINED_VERIFIED',
        executionResult: 'DISPATCH_APPROVED',
        digitalSignature: 'SIG_SMART_CONTRACT_DEFENCE_KEY_8892'
      };
      const b2Nonce = 8821;
      const b2Hash = calculateHashForBlock(2, b2PrevHash, b2Ts, b2Data, b2Nonce);
      newChain.push({
        index: 2,
        timestamp: b2Ts,
        data: b2Data,
        previousHash: b2PrevHash,
        nonce: b2Nonce,
        hash: b2Hash
      });
    }

    setChain(newChain);
    setIsTampered(false);
    setChainRepaired(true);

    // Update global context module score
    dispatch({
      type: 'COMPLETE_MODULE',
      module: 'unifiedLab',
      score: 25
    });
  };

  const stepsList = [
    { num: 1, title: 'Block Mining', icon: '🧱' },
    { num: 2, title: 'Smart Contract', icon: '📋' },
    { num: 3, title: 'Tamper Attack', icon: '🚨' },
    { num: 4, title: 'Verification & Audit', icon: '🛡' }
  ];

  return (
    <div className="unified-lab-container" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Banner */}
      <div className="card" style={{ background: 'linear-gradient(135deg, var(--navy-900), var(--navy-700))', color: '#ffffff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '2rem' }}>⚡</span>
              <div>
                <h1 style={{ color: '#ffffff', margin: 0, fontSize: '1.75rem' }}>
                  Guided End-to-End Blockchain Case Lab
                </h1>
                <p style={{ color: 'var(--navy-100)', margin: '0.25rem 0 0 0', fontSize: '0.95rem' }}>
                  Interactive Naval Munitions Supply Chain Case — Apply Mining, Smart Contracts & Cryptographic Tamper Auditing on One Live Chain!
                </p>
              </div>
            </div>
          </div>

          {/* Font Scaling Control Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.15)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-lg)' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ffffff' }}>Font Scale:</span>
            <button
              onClick={() => setFontScale('1.0')}
              className={`btn btn-sm ${fontScale === '1.0' ? 'btn-primary' : 'btn-ghost'}`}
              style={{ color: fontScale === '1.0' ? '#fff' : '#cbd5e0', padding: '0.2rem 0.6rem' }}
            >
              1.0x Standard
            </button>
            <button
              onClick={() => setFontScale('1.5')}
              className={`btn btn-sm ${fontScale === '1.5' ? 'btn-success' : 'btn-ghost'}`}
              style={{ color: fontScale === '1.5' ? '#fff' : '#cbd5e0', padding: '0.2rem 0.6rem', fontWeight: 700 }}
            >
              🔍 1.5x Large Mode
            </button>
          </div>
        </div>
      </div>

      {/* Stepper Navigation */}
      <div className="card" style={{ padding: '1rem 1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          {stepsList.map((step) => {
            const isActive = currentStep === step.num;
            const isDone = currentStep > step.num || (step.num === 1 && minedBlock1) || (step.num === 2 && contractExecuted) || (step.num === 4 && chainRepaired);
            return (
              <button
                key={step.num}
                onClick={() => setCurrentStep(step.num)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.6rem 1.2rem',
                  borderRadius: 'var(--radius-lg)',
                  border: isActive ? '2px solid var(--accent)' : '1px solid var(--border-light)',
                  background: isActive ? 'var(--accent-light)' : isDone ? 'var(--green-100)' : 'var(--bg-surface)',
                  color: isActive ? 'var(--accent)' : isDone ? 'var(--green-600)' : 'var(--text-secondary)',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  fontSize: '0.95rem'
                }}
              >
                <span style={{ fontSize: '1.25rem' }}>{step.icon}</span>
                <span>Step {step.num}: {step.title}</span>
                {isDone && <span style={{ color: 'var(--green-500)', fontWeight: 800 }}>✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Step Action Panel */}
      <div className="card">
        {currentStep === 1 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <span className="card-icon cyan">🧱</span>
              <div>
                <h2 style={{ margin: 0 }}>Step 1: Mine Payload Block #1 (Ammunition Dispatch)</h2>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Instruction: Enter dispatch details for the Naval Ammunition Transfer and execute Proof-of-Work mining to link Block #1 to the Genesis Block.
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label className="block-field-label">Dispatch Origin Base:</label>
                <input
                  type="text"
                  className="btn-ghost"
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-md)' }}
                  value={block1Data.dispatchBase}
                  onChange={(e) => setBlock1Data({ ...block1Data, dispatchBase: e.target.value })}
                />
              </div>
              <div>
                <label className="block-field-label">Ammunition Cargo:</label>
                <input
                  type="text"
                  className="btn-ghost"
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-md)' }}
                  value={block1Data.cargo}
                  onChange={(e) => setBlock1Data({ ...block1Data, cargo: e.target.value })}
                />
              </div>
              <div>
                <label className="block-field-label">Storage Temperature:</label>
                <input
                  type="text"
                  className="btn-ghost"
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-md)' }}
                  value={block1Data.temperature}
                  onChange={(e) => setBlock1Data({ ...block1Data, temperature: e.target.value })}
                />
              </div>
              <div>
                <label className="block-field-label">Escort Status:</label>
                <input
                  type="text"
                  className="btn-ghost"
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-md)' }}
                  value={block1Data.escortStatus}
                  onChange={(e) => setBlock1Data({ ...block1Data, escortStatus: e.target.value })}
                />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Current Nonce Iteration: </span>
                <strong style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>{block1Nonce}</strong>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  className="btn btn-primary btn-lg"
                  onClick={handleMineBlock1}
                  disabled={isMining || minedBlock1}
                >
                  {isMining ? '⛏ Mining SHA-256 (POW)...' : minedBlock1 ? '✓ Block #1 Mined & Linked' : '⛏ Mine Block #1'}
                </button>
                {minedBlock1 && (
                  <button className="btn btn-success btn-lg" onClick={() => setCurrentStep(2)}>
                    Proceed to Step 2: Smart Contract →
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <span className="card-icon amber">📋</span>
              <div>
                <h2 style={{ margin: 0 }}>Step 2: Deploy & Execute Smart Contract Rule</h2>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Instruction: Smart contracts automatically enforce compliance rules without human intervention. Verify dispatch conditions on Block #1.
                </p>
              </div>
            </div>

            {!minedBlock1 ? (
              <div style={{ padding: '1.5rem', background: 'var(--amber-100)', color: 'var(--amber-600)', borderRadius: 'var(--radius-lg)' }}>
                ⚠ Please complete <strong>Step 1 (Mine Block #1)</strong> first before executing the Smart Contract.
              </div>
            ) : (
              <div>
                <div style={{ background: 'var(--bg-code)', padding: '1rem', borderRadius: 'var(--radius-lg)', marginBottom: '1.5rem', border: '1px solid var(--border-light)' }}>
                  <div style={{ fontWeight: 700, fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--navy-700)', marginBottom: '0.5rem' }}>
                    // NAVAL SMART CONTRACT: MunitionsClearance.sol
                  </div>
                  <pre style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-primary)' }}>
{`IF (Block1.Temperature <= ${contractRules.maxTemp}°C AND Block1.Escort == '${contractRules.requiredEscort}') {
    EXECUTE_STATE('DISPATCH_APPROVED');
    APPEND_BLOCK(Block_2_ClearanceReceipt);
}`}
                  </pre>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <button className="btn btn-primary btn-lg" onClick={handleExecuteSmartContract} disabled={contractExecuted}>
                    {contractExecuted ? '✓ Smart Contract Executed & Block #2 Appended' : '⚙ Run Smart Contract Verification'}
                  </button>

                  {contractExecuted && (
                    <button className="btn btn-success btn-lg" onClick={() => setCurrentStep(3)}>
                      Proceed to Step 3: Tamper Attack →
                    </button>
                  )}
                </div>

                {contractResult && (
                  <div style={{ marginTop: '1.5rem', padding: '1rem', borderRadius: 'var(--radius-lg)', background: contractResult.passed ? 'var(--green-100)' : 'var(--red-100)', border: `1px solid ${contractResult.passed ? 'var(--green-border)' : 'var(--red-border)'}` }}>
                    <div style={{ fontWeight: 700, color: contractResult.passed ? 'var(--green-600)' : 'var(--red-600)', marginBottom: '0.5rem' }}>
                      {contractResult.passed ? '✓ SMART CONTRACT RULE VALIDATION SUCCESSFUL' : '❌ CONTRACT EXECUTION REJECTED'}
                    </div>
                    {contractResult.details.map((d, i) => (
                      <div key={i} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        • {d.rule}: <strong>{d.value}</strong> → <span style={{ fontWeight: 700, color: d.status === 'PASSED' ? 'var(--green-600)' : 'var(--red-600)' }}>{d.status}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <span className="card-icon red">🚨</span>
              <div>
                <h2 style={{ margin: 0 }}>Step 3: Simulate Cyber Adversary Tamper Attack</h2>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Instruction: Test cryptographic integrity! Simulate an attacker intercepting the network and modifying Block #1 payload data. Watch how SHA-256 hashes immediately break the entire chain downstream!
                </p>
              </div>
            </div>

            <div style={{ background: 'var(--red-100)', padding: '1.25rem', borderRadius: 'var(--radius-lg)', marginBottom: '1.5rem', border: '1px solid var(--red-border)' }}>
              <div style={{ fontWeight: 700, color: 'var(--red-600)', marginBottom: '0.5rem' }}>
                ⚠ Target payload for tampering: Block #1 Cargo Field
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.9rem' }}>Original Value: <strong>120x Heavy Torpedo Munitions</strong></span>
                <span style={{ fontSize: '1.2rem', color: 'var(--red-500)' }}>➔</span>
                <input
                  type="text"
                  value={tamperedCargoValue}
                  onChange={(e) => setTamperedCargoValue(e.target.value)}
                  style={{ flex: 1, padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--red-500)', fontFamily: 'var(--font-mono)' }}
                />
                <button className="btn btn-danger btn-lg" onClick={handleTamperBlock1} disabled={isTampered}>
                  {isTampered ? '⚡ Payload Tampered! Hash Link Broken' : '💥 Inject Cyber Attack (Tamper Block #1)'}
                </button>
              </div>
            </div>

            {isTampered && (
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button className="btn btn-success btn-lg" onClick={() => setCurrentStep(4)}>
                  Proceed to Step 4: Security Audit & Self-Healing →
                </button>
              </div>
            )}
          </div>
        )}

        {currentStep === 4 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <span className="card-icon green">🛡</span>
              <div>
                <h2 style={{ margin: 0 }}>Step 4: Automated Chain Audit & Self-Healing Repair</h2>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Instruction: Execute a full cryptographic hash verification audit. Detect broken pointer links and trigger automated chain recovery to restore ledger integrity!
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <button className="btn btn-primary btn-lg" onClick={handleRunAudit}>
                🔍 Run Cryptographic Chain Audit
              </button>

              {isTampered && (
                <button className="btn btn-success btn-lg" onClick={handleRepairChain}>
                  🛠 Restore & Re-mine Chain (Self-Healing)
                </button>
              )}
            </div>

            {auditResults && (
              <div style={{ background: 'var(--bg-code)', padding: '1rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', marginBottom: '1rem' }}>
                <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Audit Status Summary:</div>
                {auditResults.map((res) => (
                  <div key={res.index} style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', padding: '0.25rem 0', borderBottom: '1px solid var(--border-light)' }}>
                    Block #{res.index}: <span style={{ fontWeight: 700, color: res.isValid ? 'var(--green-600)' : 'var(--red-600)' }}>{res.isValid ? '✓ VALID & SIGNED' : '❌ HASH MISMATCH / LINK BROKEN'}</span>
                  </div>
                ))}
              </div>
            )}

            {chainRepaired && (
              <div style={{ padding: '1.25rem', background: 'var(--green-100)', border: '1px solid var(--green-border)', borderRadius: 'var(--radius-lg)', color: 'var(--green-600)' }}>
                <h3 style={{ margin: 0, color: 'var(--green-600)' }}>🎉 Congratulations! Guided Case Lab Complete!</h3>
                <p style={{ margin: '0.5rem 0 0 0', color: 'var(--green-600)' }}>
                  You have successfully mined blocks, executed smart contracts, detected cyber tampering via SHA-256 hash pointer breaks, and restored ledger integrity on the SAME unified chain!
                  <strong> +25 Training Score Awarded!</strong>
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* THE LIVE SINGLE BLOCKCHAIN LEDGER (ALWAYS VISIBLE AT BOTTOM) */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h2 style={{ margin: 0 }}>🔗 Live Unified Blockchain Ledger</h2>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Real-time SHA-256 visualizer showing all blocks on the exact same chain.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Overall Chain Status:</span>
            <span
              style={{
                padding: '0.25rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                fontWeight: 700,
                fontSize: '0.85rem',
                background: validatedChain.every(b => b.isValid !== false) ? 'var(--green-100)' : 'var(--red-100)',
                color: validatedChain.every(b => b.isValid !== false) ? 'var(--green-600)' : 'var(--red-600)',
                border: `1px solid ${validatedChain.every(b => b.isValid !== false) ? 'var(--green-border)' : 'var(--red-border)'}`
              }}
            >
              {validatedChain.every(b => b.isValid !== false) ? '🟢 CHAIN VALID & INTUACT' : '🔴 TAMPER DETECTED / BROKEN LINK'}
            </span>
          </div>
        </div>

        {/* Chain Display */}
        <div className="chain-container" style={{ padding: '1rem 0' }}>
          {validatedChain.map((blk, idx) => {
            const isBlockInvalid = blk.isValid === false;
            return (
              <React.Fragment key={blk.index}>
                {idx > 0 && (
                  <div className={`chain-arrow ${isBlockInvalid ? 'broken' : ''}`}>
                    {isBlockInvalid ? '⚡ ❌ ⚡' : '➔'}
                  </div>
                )}

                <div
                  className={`block-card ${isBlockInvalid ? 'invalid' : 'valid'}`}
                  style={{ minWidth: '310px', maxWidth: '340px', flexShrink: 0 }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span className="block-number">BLOCK #{blk.index}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{blk.timestamp}</span>
                  </div>

                  <div className="block-field">
                    <span className="block-field-label">Nonce:</span>
                    <span className="block-field-value">{blk.nonce}</span>
                  </div>

                  <div style={{ margin: '0.5rem 0' }}>
                    <div className="block-field-label" style={{ marginBottom: '0.25rem' }}>Payload Data:</div>
                    <div style={{ background: 'var(--bg-code)', padding: '0.5rem', borderRadius: 'var(--radius-md)', fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>
                      {Object.entries(blk.data).map(([k, v]) => (
                        <div key={k} style={{ color: k === 'cargo' && isTampered ? 'var(--red-600)' : 'inherit', fontWeight: k === 'cargo' && isTampered ? 700 : 400 }}>
                          <strong>{k}:</strong> {String(v)}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginTop: '0.5rem' }}>
                    <div className="block-field-label">Previous Hash:</div>
                    <div className="block-hash" style={{ fontSize: '0.7rem' }}>
                      {blk.previousHash.substring(0, 24)}...
                    </div>
                  </div>

                  <div style={{ marginTop: '0.5rem' }}>
                    <div className="block-field-label">Current SHA-256 Hash:</div>
                    <div className="block-hash" style={{ fontSize: '0.7rem', color: isBlockInvalid ? 'var(--red-600)' : 'var(--navy-600)', fontWeight: 700 }}>
                      {blk.hash.substring(0, 24)}...
                    </div>
                  </div>

                  <div style={{ marginTop: '0.75rem', textAlign: 'right' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: isBlockInvalid ? 'var(--red-600)' : 'var(--green-600)' }}>
                      {isBlockInvalid ? '❌ HASH LINK BROKEN' : '✓ HASH LINK VERIFIED'}
                    </span>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
