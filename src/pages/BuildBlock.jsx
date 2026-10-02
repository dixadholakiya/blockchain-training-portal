import { useState } from 'react';
import { computeBlockHash } from '../utils/hashing.js';
import { useTraining } from '../context/TrainingContext.jsx';

const sampleTransactions = [
  'SPARE-PART-INS-001 dispatched from Manufacturer A to Defence Warehouse',
  'NAV-SPARE-204 received at Naval Logistics Centre',
  'SPARE-PART-INS-002 quality inspection passed',
  'SPARE-PART-INS-003 transferred to Naval Base Echo',
  'NAV-SPARE-204 installed at Vessel Maintenance Unit',
  'SPARE-PART-INS-004 propulsion component dispatched',
  'SPARE-PART-INS-005 radar module received at warehouse',
];

const buildQuiz = [
  {
    id: 'bq1', question: 'What happens to a block\'s hash if you change the transaction data?',
    options: ['Nothing changes', 'The hash changes completely', 'Only the first character changes', 'The block is deleted'],
    correct: 1, explanation: 'Even a tiny change in data produces a completely different hash. This is called the "avalanche effect."',
  },
  {
    id: 'bq2', question: 'What does the "Previous Hash" field store?',
    options: ['The hash of the current block', 'The hash of the block before this one', 'A random number', 'The validator\'s password'],
    correct: 1, explanation: 'Each block stores the hash of the previous block, creating a linked chain that makes tampering detectable.',
  },
  {
    id: 'bq3', question: 'If you have 3 blocks in a chain, how many hash connections exist between them?',
    options: ['1', '2', '3', '0'],
    correct: 1, explanation: 'Block 2 stores Block 1\'s hash, and Block 3 stores Block 2\'s hash — that\'s 2 connections linking 3 blocks.',
  },
  {
    id: 'bq4', question: 'Why is the first block special?',
    options: ['It has no transactions', 'It has no previous hash (genesis block)', 'It is encrypted differently', 'It is larger than others'],
    correct: 1, explanation: 'The first block (genesis block) has no previous block, so its "previous hash" is all zeros. Every chain starts from this block.',
  },
];

export default function BuildBlock() {
  const [chain, setChain] = useState([]);
  const [txData, setTxData] = useState(sampleTransactions[0]);
  const [customTx, setCustomTx] = useState('');
  const [generatedHash, setGeneratedHash] = useState(null);
  const [activeTab, setActiveTab] = useState('try');
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const { modules, dispatch } = useTraining();

  const prevHash = chain.length > 0 ? chain[chain.length - 1].hash : '0000000000000000000000000000000000000000000000000000000000000000';
  const timestamp = new Date().toISOString();
  const currentTx = customTx || txData;

  const handleGenerate = () => {
    const hash = computeBlockHash(prevHash, timestamp, currentTx);
    setGeneratedHash(hash);
  };

  const handleAddBlock = () => {
    if (!generatedHash) return;
    const newBlock = {
      number: chain.length + 1,
      previousHash: prevHash,
      hash: generatedHash,
      timestamp,
      data: currentTx,
    };
    setChain([...chain, newBlock]);
    setGeneratedHash(null);
    setCustomTx('');
  };

  const handleQuizSubmit = () => {
    let score = 0;
    buildQuiz.forEach((q) => { if (quizAnswers[q.id] === q.correct) score += 5; });
    setQuizSubmitted(true);
    dispatch({ type: 'COMPLETE_MODULE', module: 'build', score });
  };

  const tabs = [
    { id: 'learn', label: '📚 Learn' },
    { id: 'try', label: '🧱 Try' },
    { id: 'check', label: '✅ Check' },
    { id: 'why', label: '🎯 Why It Matters' },
  ];

  return (
    <div>
      <div className="page-hero">
        <h1>🧱 Build & Verify a Block</h1>
        <p>Create your own blocks, generate hashes, and build a blockchain chain step by step.</p>
      </div>

      <div className="tabs">
        {tabs.map((t) => (
          <button key={t.id} className={`tab ${activeTab === t.id ? 'active' : ''}`} onClick={() => setActiveTab(t.id)}>{t.label}</button>
        ))}
      </div>

      {activeTab === 'learn' && (
        <div>
          <div className="info-box">
            <h4>💡 How Are Blocks Built?</h4>
            <p>A block is created by combining three things: the previous block's hash, a timestamp, and transaction data. These are passed through a mathematical function (SHA-256) to produce a unique hash — the block's fingerprint.</p>
          </div>
          <div className="card" style={{ marginTop: 'var(--space-lg)', padding: 'var(--space-xl)' }}>
            <h4 style={{ color: 'var(--cyan-400)', marginBottom: 'var(--space-md)' }}>The Block-Building Process</h4>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--gray-300)', lineHeight: 2, background: 'rgba(0,0,0,0.3)', padding: 'var(--space-lg)', borderRadius: 'var(--radius-md)' }}>
              <div>Previous Block Hash  ─┐</div>
              <div>Timestamp            ─┼──► SHA-256 Hash Function ──► <span className="text-cyan">Block Hash</span></div>
              <div>Transaction Data     ─┘</div>
            </div>
          </div>
          <div className="card" style={{ marginTop: 'var(--space-md)', padding: 'var(--space-lg)' }}>
            <h4 style={{ color: 'var(--amber-400)' }}>Key Insight</h4>
            <p style={{ fontSize: '0.875rem' }}>Change even one character in the transaction data and the hash changes <strong>completely</strong>. This is why blockchains are tamper-resistant.</p>
          </div>
        </div>
      )}

      {activeTab === 'try' && (
        <div>
          {/* Block Builder */}
          <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
            <h3 style={{ marginBottom: 'var(--space-md)' }}>Create Block #{chain.length + 1}</h3>

            {/* Previous Hash */}
            <div style={{ marginBottom: 'var(--space-md)' }}>
              <label className="text-sm text-gray" style={{ display: 'block', marginBottom: '0.25rem' }}>Previous Block Hash</label>
              <div className="block-hash">{prevHash}</div>
            </div>

            {/* Transaction Data */}
            <div style={{ marginBottom: 'var(--space-md)' }}>
              <label className="text-sm text-gray" style={{ display: 'block', marginBottom: '0.25rem' }}>Transaction Data</label>
              <select
                className="search-input"
                style={{ paddingLeft: 'var(--space-md)', marginBottom: '0.5rem' }}
                value={txData}
                onChange={(e) => { setTxData(e.target.value); setCustomTx(''); setGeneratedHash(null); }}
              >
                {sampleTransactions.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              <input
                className="search-input"
                style={{ paddingLeft: 'var(--space-md)' }}
                type="text"
                placeholder="Or type your own fictional transaction..."
                value={customTx}
                onChange={(e) => { setCustomTx(e.target.value); setGeneratedHash(null); }}
              />
            </div>

            {/* Timestamp */}
            <div style={{ marginBottom: 'var(--space-md)' }}>
              <label className="text-sm text-gray" style={{ display: 'block', marginBottom: '0.25rem' }}>Timestamp</label>
              <div className="block-hash">{timestamp}</div>
            </div>

            {/* Generate */}
            <button className="btn btn-primary" onClick={handleGenerate}>
              ⚡ Generate Hash
            </button>

            {/* Show Generated Hash */}
            {generatedHash && (
              <div style={{ marginTop: 'var(--space-lg)' }}>
                <label className="text-sm text-cyan" style={{ display: 'block', marginBottom: '0.25rem' }}>Generated Hash (SHA-256)</label>
                <div className="block-hash" style={{ color: 'var(--cyan-400)', border: '1px solid var(--cyan-500)' }}>
                  {generatedHash}
                </div>
                <button
                  className="btn btn-success"
                  style={{ marginTop: 'var(--space-md)' }}
                  onClick={handleAddBlock}
                  disabled={chain.length >= 5}
                >
                  ➕ Add Block to Chain
                </button>
                {chain.length >= 5 && <p className="text-sm text-amber" style={{ marginTop: '0.5rem' }}>Maximum 5 blocks reached for this exercise.</p>}
              </div>
            )}
          </div>

          {/* Visual Chain */}
          {chain.length > 0 && (
            <>
              <h3 style={{ marginBottom: 'var(--space-md)' }}>Your Blockchain</h3>
              <div className="chain-container">
                {chain.map((block, i) => (
                  <div key={block.number} style={{ display: 'flex', alignItems: 'center' }}>
                    {i > 0 && <div className="chain-arrow">→</div>}
                    <div className="block-card valid" style={{ minWidth: '220px', flex: '0 0 auto' }}>
                      <div className="block-number">Block #{block.number}</div>
                      <div className="block-field">
                        <span className="block-field-label">Prev Hash</span>
                        <span className="block-field-value">{block.previousHash.slice(0, 10)}...</span>
                      </div>
                      <div className="block-field">
                        <span className="block-field-label">Hash</span>
                        <span className="block-field-value text-cyan">{block.hash.slice(0, 10)}...</span>
                      </div>
                      <div className="block-field" style={{ borderBottom: 'none' }}>
                        <span className="block-field-label">Data</span>
                      </div>
                      <p className="text-xs text-gray" style={{ marginTop: '0.25rem' }}>{block.data.slice(0, 40)}...</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {activeTab === 'check' && (
        <div>
          <h3 style={{ marginBottom: 'var(--space-lg)' }}>Knowledge Check — Build & Verify</h3>
          <div className="quiz-container">
            {buildQuiz.map((q, qi) => (
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
            <button className="btn btn-primary btn-lg" style={{ marginTop: 'var(--space-lg)' }} onClick={handleQuizSubmit} disabled={Object.keys(quizAnswers).length < buildQuiz.length}>
              Submit Answers
            </button>
          ) : (
            <div className="success-box" style={{ marginTop: 'var(--space-lg)' }}>
              <h4 style={{ color: 'var(--green-400)' }}>✓ Module Complete — Score: {modules.build.score}/20</h4>
            </div>
          )}
        </div>
      )}

      {activeTab === 'why' && (
        <div>
          <div className="info-box">
            <h4>🎯 Defence Relevance</h4>
            <p>Understanding how blocks and hashes work is fundamental to evaluating blockchain solutions for defence logistics. The hash-linking mechanism is what makes the entire audit trail trustworthy — no single administrator can silently alter past records.</p>
          </div>
          <div className="card" style={{ marginTop: 'var(--space-lg)', padding: 'var(--space-lg)' }}>
            <h4 style={{ color: 'var(--cyan-400)' }}>Real-World Application</h4>
            <p style={{ fontSize: '0.875rem' }}>In a naval supply chain, every transfer of a critical spare part (from manufacturer to vessel) would be a transaction. The blockchain ensures that no record can be retroactively changed — providing complete auditability for procurement officers, inspectors, and commanding officers.</p>
          </div>
        </div>
      )}
    </div>
  );
}
