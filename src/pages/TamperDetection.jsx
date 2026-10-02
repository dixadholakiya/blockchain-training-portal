import { useState } from 'react';
import { computeBlockHash } from '../utils/hashing.js';
import { useTraining } from '../context/TrainingContext.jsx';

function buildInitialChain() {
  const txs = [
    'NAV-SPARE-204: 10 units manufactured at Factory Alpha',
    'NAV-SPARE-204: 10 units received at Defence Warehouse Delta',
    'NAV-SPARE-204: Quantity 12 dispatched to Naval Logistics Centre',
    'NAV-SPARE-204: 12 units inspected and approved at Bay Gamma',
    'NAV-SPARE-204: 12 units delivered to Vessel Maintenance Unit',
  ];
  const chain = [];
  for (let i = 0; i < 5; i++) {
    const prevHash = i === 0 ? '0000000000000000000000000000000000000000000000000000000000000000' : chain[i - 1].hash;
    const ts = `2025-03-15T0${8 + i}:00:00Z`;
    const hash = computeBlockHash(prevHash, ts, txs[i]);
    chain.push({ number: i + 1, previousHash: prevHash, hash, timestamp: ts, data: txs[i], valid: true });
  }
  return chain;
}

const tamperQuiz = [
  { id: 'tq1', question: 'Which block was tampered with?', options: ['Block 1', 'Block 2', 'Block 3', 'Block 4', 'Block 5'], correct: 2, explanation: 'Block 3 was tampered with — the quantity was changed from 12 to 120, which changed its hash.' },
  { id: 'tq2', question: 'Why did blocks after the tampered block also become invalid?', options: ['They were also tampered with', 'Each block stores the previous block\'s hash, so when Block 3\'s hash changed, Block 4\'s "previous hash" no longer matched', 'The validator rejected them', 'The timestamps expired'], correct: 1, explanation: 'Each block stores the hash of its predecessor. When Block 3\'s hash changed, Block 4\'s stored "previous hash" no longer matched — breaking the chain.' },
  { id: 'tq3', question: 'How many blocks became invalid when one block was tampered with?', options: ['Only 1 (the tampered block)', '2 blocks', '3 blocks (tampered + all subsequent)', 'All 5 blocks'], correct: 2, explanation: 'Tampering with Block 3 invalidated Blocks 3, 4, and 5 — all blocks from the tampered point onward.' },
  { id: 'tq4', question: 'Could someone secretly tamper with Block 3 and fix the chain?', options: ['Yes, by correcting the next block\'s previous hash', 'Yes, if they have the admin password', 'No — they would need to recalculate ALL subsequent hashes, which requires consensus from the network', 'No — blocks cannot be read after creation'], correct: 2, explanation: 'To "fix" the chain after tampering, an attacker would need to recompute hashes for every subsequent block AND convince the majority of the network to accept the changes — which is practically impossible in a properly decentralised system.' },
  { id: 'tq5', question: 'What is this property of blockchain called?', options: ['Encryption', 'Immutability', 'Authentication', 'Compression'], correct: 1, explanation: 'Immutability means that once data is written to the blockchain, it cannot be changed without detection. This is one of blockchain\'s most important security properties.' },
];

export default function TamperDetection() {
  const [chain, setChain] = useState(() => buildInitialChain());
  const [tampered, setTampered] = useState(false);
  const [activeTab, setActiveTab] = useState('try');
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const { modules, dispatch } = useTraining();

  const handleTamper = () => {
    if (tampered) return;
    const newChain = [...chain];
    // Tamper with block 3 (index 2) — change quantity
    const tamperedData = 'NAV-SPARE-204: Quantity 120 dispatched to Naval Logistics Centre';
    const newHash = computeBlockHash(newChain[2].previousHash, newChain[2].timestamp, tamperedData);
    newChain[2] = { ...newChain[2], data: tamperedData, hash: newHash, valid: false };
    // Mark subsequent blocks as invalid (their previousHash no longer matches)
    for (let i = 3; i < newChain.length; i++) {
      newChain[i] = { ...newChain[i], valid: false };
    }
    setChain(newChain);
    setTampered(true);
  };

  const handleReset = () => {
    setChain(buildInitialChain());
    setTampered(false);
  };

  const handleQuizSubmit = () => {
    let score = 0;
    tamperQuiz.forEach((q) => { if (quizAnswers[q.id] === q.correct) score += 5; });
    setQuizSubmitted(true);
    dispatch({ type: 'COMPLETE_MODULE', module: 'tamper', score });
  };

  const tabs = [
    { id: 'learn', label: '📚 Learn' },
    { id: 'try', label: '🛡 Try' },
    { id: 'check', label: '✅ Check' },
    { id: 'why', label: '🎯 Why It Matters' },
  ];

  return (
    <div>
      <div className="page-hero">
        <h1>🛡 Detect Tampering</h1>
        <p>See what happens when someone tries to alter a block in the chain.</p>
      </div>

      <div className="tabs">
        {tabs.map((t) => (
          <button key={t.id} className={`tab ${activeTab === t.id ? 'active' : ''}`} onClick={() => setActiveTab(t.id)}>{t.label}</button>
        ))}
      </div>

      {activeTab === 'learn' && (
        <div>
          <div className="info-box">
            <h4>💡 Why Can't Blockchain Data Be Secretly Changed?</h4>
            <p>Every block contains the hash of the previous block. If someone changes data in Block 3, its hash changes — but Block 4 still stores the <em>old</em> hash of Block 3. This mismatch immediately reveals the tampering.</p>
          </div>
          <div className="card" style={{ marginTop: 'var(--space-lg)', padding: 'var(--space-xl)' }}>
            <h4 style={{ color: 'var(--cyan-400)', marginBottom: 'var(--space-md)' }}>The Chain Reaction</h4>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--gray-300)', lineHeight: 2, background: 'rgba(0,0,0,0.3)', padding: 'var(--space-lg)', borderRadius: 'var(--radius-md)' }}>
              <div>Block 1 ──hash──► Block 2 ──hash──► <span className="text-red">Block 3 (TAMPERED)</span></div>
              <div style={{ color: 'var(--red-400)', marginTop: '0.5rem' }}>
                ⚠ Block 3's hash CHANGED → Block 4's "previous hash" NO LONGER MATCHES → CHAIN BROKEN
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'try' && (
        <div>
          {/* Tampering Alert */}
          {tampered && (
            <div className="danger-box" style={{ marginBottom: 'var(--space-lg)' }}>
              <h4 style={{ color: 'var(--red-400)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                ⚠ Chain Integrity Compromised — Hash Mismatch Detected!
              </h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--red-400)', marginTop: '0.5rem' }}>
                Block 3 was tampered with (Quantity changed: 12 → 120). The chain from Block 3 onward is now invalid.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
            <button className="btn btn-danger btn-lg" onClick={handleTamper} disabled={tampered}>
              💥 Tamper with Block 3
            </button>
            <button className="btn btn-secondary" onClick={handleReset}>
              🔄 Reset Chain
            </button>
          </div>

          {/* Chain Visualisation */}
          <div className="chain-container">
            {chain.map((block, i) => (
              <div key={block.number} style={{ display: 'flex', alignItems: 'center' }}>
                {i > 0 && (
                  <div className={`chain-arrow ${(!block.valid && tampered) ? 'broken' : ''}`}>
                    {(!block.valid && tampered) ? '✕' : '→'}
                  </div>
                )}
                <div
                  className={`block-card ${block.valid ? 'valid' : 'invalid'}`}
                  style={{ minWidth: '200px', flex: '0 0 auto' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span className="block-number">Block #{block.number}</span>
                    {block.valid ? (
                      <span className="text-xs text-green">✓ Valid</span>
                    ) : (
                      <span className="text-xs text-red">✗ Invalid</span>
                    )}
                  </div>
                  <div className="block-field">
                    <span className="block-field-label">Prev Hash</span>
                    <span className="block-field-value">{block.previousHash.slice(0, 8)}...</span>
                  </div>
                  <div className="block-field">
                    <span className="block-field-label">Hash</span>
                    <span className={`block-field-value ${block.valid ? 'text-cyan' : 'text-red'}`}>{block.hash.slice(0, 8)}...</span>
                  </div>
                  <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: block.valid ? 'var(--gray-400)' : 'var(--red-400)' }}>
                    {block.data}
                  </div>
                  {!block.valid && block.number === 3 && (
                    <div style={{ marginTop: '0.5rem', padding: '0.5rem', background: 'rgba(239,68,68,0.15)', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', color: 'var(--red-400)' }}>
                      ⚠ DATA ALTERED: Quantity changed from 12 to 120
                    </div>
                  )}
                  {!block.valid && block.number > 3 && (
                    <div style={{ marginTop: '0.5rem', padding: '0.5rem', background: 'rgba(239,68,68,0.15)', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', color: 'var(--red-400)' }}>
                      ⚠ Previous hash mismatch — chain broken
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'check' && (
        <div>
          <h3 style={{ marginBottom: 'var(--space-lg)' }}>Knowledge Check — Tampering Detection</h3>
          {!tampered && (
            <div className="warning-box" style={{ marginBottom: 'var(--space-lg)' }}>
              <p style={{ fontSize: '0.875rem', color: 'var(--amber-400)' }}>💡 Tip: Go to the "Try" tab first and tamper with the chain before answering these questions.</p>
            </div>
          )}
          <div className="quiz-container">
            {tamperQuiz.map((q, qi) => (
              <div key={q.id} className="quiz-question">
                <div className="quiz-question-text">{qi + 1}. {q.question}</div>
                <div className="quiz-options">
                  {q.options.map((opt, oi) => {
                    let cls = 'quiz-option';
                    if (quizSubmitted) { if (oi === q.correct) cls += ' correct'; else if (quizAnswers[q.id] === oi) cls += ' incorrect'; }
                    else if (quizAnswers[q.id] === oi) cls += ' selected';
                    return (
                      <button key={oi} className={cls} onClick={() => { if (!quizSubmitted) setQuizAnswers({ ...quizAnswers, [q.id]: oi }); }} disabled={quizSubmitted}>
                        {String.fromCharCode(65 + oi)}. {opt}
                      </button>
                    );
                  })}
                </div>
                {quizSubmitted && (
                  <div className={`quiz-feedback ${quizAnswers[q.id] === q.correct ? 'correct' : 'incorrect'}`}>
                    {quizAnswers[q.id] === q.correct ? '✓ Correct! ' : '✗ Incorrect. '}{q.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>
          {!quizSubmitted ? (
            <button className="btn btn-primary btn-lg" style={{ marginTop: 'var(--space-lg)' }} onClick={handleQuizSubmit} disabled={Object.keys(quizAnswers).length < tamperQuiz.length}>Submit Answers</button>
          ) : (
            <div className="success-box" style={{ marginTop: 'var(--space-lg)' }}>
              <h4 style={{ color: 'var(--green-400)' }}>✓ Module Complete — Score: {modules.tamper.score}/25</h4>
            </div>
          )}
        </div>
      )}

      {activeTab === 'why' && (
        <div>
          <div className="info-box">
            <h4>🎯 Defence Relevance</h4>
            <p>Imagine someone tries to alter a procurement record — changing the quantity from 12 spare parts to 120 to divert equipment. On a blockchain, this tampering would immediately break the hash chain, alerting every participant in the network.</p>
          </div>
          <div className="card" style={{ marginTop: 'var(--space-lg)', padding: 'var(--space-lg)' }}>
            <h4 style={{ color: 'var(--cyan-400)' }}>Why This Matters in Defence</h4>
            <ul style={{ paddingLeft: '1.5rem', fontSize: '0.875rem', color: 'var(--gray-300)' }}>
              <li style={{ marginBottom: '0.5rem' }}>Prevents retroactive falsification of supply chain records</li>
              <li style={{ marginBottom: '0.5rem' }}>Detects counterfeit part substitution attempts</li>
              <li style={{ marginBottom: '0.5rem' }}>Protects audit trails for procurement oversight</li>
              <li>Creates an immutable evidence chain for investigations</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
