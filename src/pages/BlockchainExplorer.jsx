import { useState, useRef } from 'react';
import { blocks, explorerQuiz } from '../data/blockchainData.js';
import { useTraining } from '../context/TrainingContext.jsx';

export default function BlockchainExplorer() {
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [selectedTx, setSelectedTx] = useState(null);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('try');
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const { modules, dispatch } = useTraining();
  const txRef = useRef(null);

  const filteredBlocks = blocks.filter((b) => {
    if (!search) return true;
    const q = search.toLowerCase();
    if (String(b.number).includes(q)) return true;
    return b.transactions.some(
      (t) => t.txId.toLowerCase().includes(q) || t.partId.toLowerCase().includes(q)
    );
  });

  const handleQuizSubmit = () => {
    let score = 0;
    explorerQuiz.forEach((q) => {
      if (quizAnswers[q.id] === q.correct) score += 5;
    });
    setQuizSubmitted(true);
    dispatch({ type: 'COMPLETE_MODULE', module: 'explorer', score });
  };

  const tabs = [
    { id: 'learn', label: '📚 Learn' },
    { id: 'try', label: '🔍 Try' },
    { id: 'check', label: '✅ Check' },
    { id: 'why', label: '🎯 Why It Matters' },
  ];

  return (
    <div>
      <div className="page-hero">
        <h1>🔍 Blockchain Explorer</h1>
        <p>Explore a simulated blockchain containing fictional naval logistics transactions.</p>
      </div>

      {/* Tabs */}
      <div className="tabs">
        {tabs.map((t) => (
          <button key={t.id} className={`tab ${activeTab === t.id ? 'active' : ''}`} onClick={() => setActiveTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      {/* LEARN Tab */}
      {activeTab === 'learn' && (
        <div>
          <div className="info-box">
            <h4>💡 What is a Blockchain Explorer?</h4>
            <p>A blockchain explorer is like a search engine for the blockchain. It allows you to look up any block, transaction, or asset recorded on the ledger.</p>
          </div>
          <div style={{ marginTop: 'var(--space-lg)' }}>
            <h3>Key Concepts</h3>
            <div style={{ display: 'grid', gap: 'var(--space-md)', marginTop: 'var(--space-md)' }}>
              {[
                { title: 'Blocks', desc: 'Groups of transactions bundled together and added to the chain. Each block has a unique hash (fingerprint).' },
                { title: 'Transactions', desc: 'Individual records of actions — such as transferring a part from one location to another.' },
                { title: 'Hashes', desc: 'Mathematical fingerprints that uniquely identify each block. Changing any data changes the hash.' },
                { title: 'Previous Hash', desc: 'Each block stores the hash of the block before it, creating a linked chain.' },
              ].map((c) => (
                <div key={c.title} className="card" style={{ padding: 'var(--space-md)' }}>
                  <h4 style={{ fontSize: '0.9375rem', color: 'var(--cyan-400)' }}>{c.title}</h4>
                  <p style={{ fontSize: '0.8125rem' }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TRY Tab */}
      {activeTab === 'try' && (
        <div>
          {/* Search */}
          <div className="search-wrapper" style={{ marginBottom: 'var(--space-lg)' }}>
            <span className="search-icon">🔍</span>
            <input
              className="search-input"
              type="text"
              placeholder="Search by block number, transaction ID, or part ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search blocks and transactions"
            />
          </div>

          {/* Block List */}
          <div style={{ display: 'grid', gap: 'var(--space-md)' }}>
            {filteredBlocks.map((block) => (
              <div
                key={block.number}
                className={`block-card ${selectedBlock?.number === block.number ? 'selected' : 'valid'}`}
                onClick={() => setSelectedBlock(selectedBlock?.number === block.number ? null : block)}
                style={{ cursor: 'pointer' }}
                role="button"
                tabIndex={0}
                aria-expanded={selectedBlock?.number === block.number}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedBlock(selectedBlock?.number === block.number ? null : block); } }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-sm)' }}>
                  <span className="block-number">Block #{block.number}</span>
                  <span className="text-xs text-gray">{new Date(block.timestamp).toLocaleString()}</span>
                </div>
                <div className="block-field">
                  <span className="block-field-label">Previous Hash</span>
                  <span className="block-field-value">{block.previousHash.slice(0, 16)}...</span>
                </div>
                <div className="block-field">
                  <span className="block-field-label">Current Hash</span>
                  <span className="block-field-value">{block.hash.slice(0, 16)}...</span>
                </div>
                <div className="block-field">
                  <span className="block-field-label">Transactions</span>
                  <span className="block-field-value">{block.transactions.length}</span>
                </div>
                <div className="block-field" style={{ borderBottom: 'none' }}>
                  <span className="block-field-label">Validator</span>
                  <span className="block-field-value">{block.validator}</span>
                </div>

                {/* Expanded transactions */}
                {selectedBlock?.number === block.number && (
                  <div style={{ marginTop: 'var(--space-md)', borderTop: '1px solid rgba(0,212,255,0.15)', paddingTop: 'var(--space-md)' }}>
                    <h4 style={{ fontSize: '0.875rem', color: 'var(--cyan-400)', marginBottom: 'var(--space-sm)' }}>
                      Transactions in Block #{block.number}
                    </h4>
                    {block.transactions.map((tx) => (
                      <div
                        key={tx.txId}
                        style={{
                          background: 'rgba(0,0,0,0.3)',
                          borderRadius: 'var(--radius-md)',
                          padding: 'var(--space-md)',
                          marginBottom: 'var(--space-sm)',
                          cursor: 'pointer',
                          border: selectedTx?.txId === tx.txId ? '1px solid var(--cyan-500)' : '1px solid transparent',
                        }}
                        onClick={(e) => { e.stopPropagation(); setSelectedTx(selectedTx?.txId === tx.txId ? null : tx); txRef.current?.showModal(); }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                          <span className="text-mono text-sm text-cyan">{tx.txId}</span>
                          <span className="text-xs text-gray">{tx.partId}</span>
                        </div>
                        <p style={{ fontSize: '0.8125rem', marginTop: '0.25rem', color: 'var(--gray-300)' }}>{tx.action}</p>
                        <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)', marginTop: '0.25rem' }}>
                          {tx.from} → {tx.to}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredBlocks.length === 0 && (
            <div className="card" style={{ textAlign: 'center', padding: 'var(--space-2xl)' }}>
              <p className="text-gray">No blocks or transactions match your search.</p>
            </div>
          )}
        </div>
      )}

      {/* CHECK Tab (Quiz) */}
      {activeTab === 'check' && (
        <div>
          <h3 style={{ marginBottom: 'var(--space-lg)' }}>Knowledge Check — Blockchain Explorer</h3>
          <div className="quiz-container">
            {explorerQuiz.map((q, qi) => (
              <div key={q.id} className="quiz-question">
                <div className="quiz-question-text">{qi + 1}. {q.question}</div>
                <div className="quiz-options">
                  {q.options.map((opt, oi) => {
                    let cls = 'quiz-option';
                    if (quizSubmitted) {
                      if (oi === q.correct) cls += ' correct';
                      else if (quizAnswers[q.id] === oi) cls += ' incorrect';
                    } else if (quizAnswers[q.id] === oi) {
                      cls += ' selected';
                    }
                    return (
                      <button
                        key={oi}
                        className={cls}
                        onClick={() => { if (!quizSubmitted) setQuizAnswers({ ...quizAnswers, [q.id]: oi }); }}
                        disabled={quizSubmitted}
                      >
                        {String.fromCharCode(65 + oi)}. {opt}
                      </button>
                    );
                  })}
                </div>
                {quizSubmitted && (
                  <div className={`quiz-feedback ${quizAnswers[q.id] === q.correct ? 'correct' : 'incorrect'}`}>
                    {quizAnswers[q.id] === q.correct ? '✓ Correct! ' : '✗ Incorrect. '}
                    {q.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>
          {!quizSubmitted ? (
            <button
              className="btn btn-primary btn-lg"
              style={{ marginTop: 'var(--space-lg)' }}
              onClick={handleQuizSubmit}
              disabled={Object.keys(quizAnswers).length < explorerQuiz.length}
            >
              Submit Answers
            </button>
          ) : (
            <div className="success-box" style={{ marginTop: 'var(--space-lg)' }}>
              <h4 style={{ color: 'var(--green-400)' }}>
                ✓ Module Complete — Score: {modules.explorer.score}/20
              </h4>
            </div>
          )}
        </div>
      )}

      {/* WHY IT MATTERS Tab */}
      {activeTab === 'why' && (
        <div>
          <h3 style={{ marginBottom: 'var(--space-lg)' }}>What Should You Notice?</h3>
          <div style={{ display: 'grid', gap: 'var(--space-md)' }}>
            {[
              { icon: '👁', title: 'Transparency', desc: 'Every transaction is visible to all authorised participants. No hidden transfers or secret modifications.' },
              { icon: '🔗', title: 'Traceability', desc: 'You can follow any part from manufacturer to end user by following the transaction trail across blocks.' },
              { icon: '🕐', title: 'Time-Stamped Records', desc: 'Every action has a permanent timestamp, creating an indisputable chronological audit trail.' },
              { icon: '⛓', title: 'Linking of Blocks', desc: 'Each block references the previous block\'s hash, forming an unbreakable chain. Altering one block invalidates all subsequent blocks.' },
              { icon: '✓', title: 'Shared Verification', desc: 'Multiple validators confirm each block, preventing any single party from falsifying records.' },
            ].map((item) => (
              <div key={item.title} className="card" style={{ padding: 'var(--space-lg)' }}>
                <h4 style={{ color: 'var(--cyan-400)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {item.icon} {item.title}
                </h4>
                <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="info-box" style={{ marginTop: 'var(--space-lg)' }}>
            <h4>🎯 Defence Relevance</h4>
            <p>In naval logistics, these properties ensure that spare parts, maintenance records, and procurement data maintain integrity throughout the supply chain — preventing counterfeiting, diversion, and falsification of records.</p>
          </div>
        </div>
      )}

      {/* Transaction Detail Dialog */}
      <dialog ref={txRef} className="modal" onClick={(e) => { if (e.target === txRef.current) txRef.current.close(); }}>
        {selectedTx && (
          <>
            <div className="modal-header">
              <h3>Transaction Details</h3>
              <button className="modal-close" onClick={() => txRef.current?.close()}>×</button>
            </div>
            <div style={{ display: 'grid', gap: 'var(--space-sm)' }}>
              <div className="block-field"><span className="block-field-label">Transaction ID</span><span className="block-field-value">{selectedTx.txId}</span></div>
              <div className="block-field"><span className="block-field-label">Part ID</span><span className="block-field-value">{selectedTx.partId}</span></div>
              <div className="block-field"><span className="block-field-label">From</span><span className="block-field-value">{selectedTx.from}</span></div>
              <div className="block-field"><span className="block-field-label">To</span><span className="block-field-value">{selectedTx.to}</span></div>
              <div className="block-field"><span className="block-field-label">Action</span><span className="block-field-value">{selectedTx.action}</span></div>
              <div className="block-field"><span className="block-field-label">Quantity</span><span className="block-field-value">{selectedTx.quantity}</span></div>
              <div className="block-field"><span className="block-field-label">Timestamp</span><span className="block-field-value">{new Date(selectedTx.timestamp).toLocaleString()}</span></div>
              <div className="block-field" style={{ borderBottom: 'none' }}><span className="block-field-label">Status</span><span className="text-green">{selectedTx.status}</span></div>
            </div>
          </>
        )}
      </dialog>
    </div>
  );
}
