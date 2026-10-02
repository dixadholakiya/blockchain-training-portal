import { Link } from 'react-router-dom';
import { useTraining } from '../context/TrainingContext.jsx';
import { useRef } from 'react';

const moduleList = [
  {
    key: 'explorer',
    number: 'Module 1 · 15 min',
    title: 'Blockchain Explorer',
    desc: 'Browse a simulated blockchain. See how blocks, transactions, and hashes work — just like searching a digital logbook.',
    icon: '🔍',
    color: 'cyan',
    path: '/explorer',
    points: 20,
  },
  {
    key: 'build',
    number: 'Module 2 · 20 min',
    title: 'Build & Verify a Block',
    desc: 'Create your own block by entering supply data, generate a hash (digital fingerprint), and add it to a chain.',
    icon: '🧱',
    color: 'cyan',
    path: '/build',
    points: 20,
  },
  {
    key: 'tamper',
    number: 'Module 3 · 20 min',
    title: 'Detect Tampering',
    desc: 'Try to change a record and watch the chain break. See exactly why blockchain records cannot be secretly altered.',
    icon: '🛡',
    color: 'amber',
    path: '/tamper',
    points: 25,
  },
  {
    key: 'smartContract',
    number: 'Module 4 · 20 min',
    title: 'Smart Contract Simulation',
    desc: 'Step through a procurement process where the system automatically checks delivery and inspection before approving payment.',
    icon: '📋',
    color: 'green',
    path: '/smart-contract',
    points: 20,
  },
  {
    key: 'caseStudy',
    number: 'Module 5 · 15 min',
    title: 'Naval Logistics Case Study',
    desc: 'Follow a critical spare part from factory to vessel. Use blockchain records to answer questions about its journey.',
    icon: '⚓',
    color: 'cyan',
    path: '/case-study',
    points: 15,
  },
];

export default function Dashboard() {
  const { modules, totalScore, maxTotal, progress, allComplete, dispatch } = useTraining();
  const helpRef = useRef(null);
  const resetRef = useRef(null);

  const handleReset = () => {
    dispatch({ type: 'RESET' });
  };

  return (
    <div>
      {/* Hero */}
      <div style={{ textAlign: 'center', padding: 'var(--space-lg) 0 var(--space-xl)' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
          ⛓ Blockchain in Action
        </h1>
        <p style={{ margin: '0 auto', textAlign: 'center', fontSize: '1.125rem', color: 'var(--text-secondary)' }}>
          A Hands-on Introduction for Defence & Naval Officers
        </p>
        <p style={{ margin: '0.25rem auto', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          120-Minute Interactive Workshop · No Programming Required
        </p>
      </div>

      {/* ============================================ */}
      {/* WHAT IS BLOCKCHAIN — Information Section     */}
      {/* ============================================ */}
      <div className="info-section">
        <h2>📘 What is Blockchain? — A Simple Explanation</h2>
        <p style={{ fontSize: '1.0625rem', marginBottom: 'var(--space-lg)', lineHeight: 1.8 }}>
          Blockchain is a <strong>shared digital record book</strong> that nobody can secretly change. Think of it as a logbook where every entry is <strong>permanent</strong>, <strong>time-stamped</strong>, and visible to all authorised participants. Once something is written, it stays — forever.
        </p>

        {/* Simple Analogy */}
        <div className="analogy-box">
          <h3>🤝 Understanding Blockchain — A Naval Analogy</h3>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-lg)' }}>
            Imagine a <strong>ship's logbook</strong> — but with three special rules:
          </p>
          <div className="analogy-steps">
            <div className="analogy-step">
              <div className="analogy-step-num">1</div>
              <div className="analogy-step-text">
                <strong>Every entry gets a unique seal.</strong> Each page in the logbook gets a mathematical fingerprint (called a "hash"). Change even one word, and the seal changes completely — making alterations obvious.
              </div>
            </div>
            <div className="analogy-step">
              <div className="analogy-step-num">2</div>
              <div className="analogy-step-text">
                <strong>Every page is chained to the previous page.</strong> Each new page includes the seal of the page before it. This creates an unbreakable chain — if you tamper with page 5, pages 6, 7, 8... all break.
              </div>
            </div>
            <div className="analogy-step">
              <div className="analogy-step-num">3</div>
              <div className="analogy-step-text">
                <strong>Everyone has a copy.</strong> Multiple officers each keep an identical copy of the logbook. If one person tries to change a record, everyone else's copies instantly reveal the tampering.
              </div>
            </div>
          </div>
        </div>

        {/* Key Properties */}
        <h3 style={{ marginBottom: 'var(--space-md)', marginTop: 'var(--space-xl)' }}>Why Does This Matter?</h3>
        <div className="info-cards">
          <div className="info-card">
            <div className="info-card-icon">🔒</div>
            <h4>Tamper-Proof Records</h4>
            <p>Once information is recorded, it cannot be secretly altered or deleted. Any change is immediately detected by the system.</p>
          </div>
          <div className="info-card">
            <div className="info-card-icon">👁</div>
            <h4>Full Transparency</h4>
            <p>Every authorised participant can see the same records. No hidden changes, no secret modifications — complete visibility.</p>
          </div>
          <div className="info-card">
            <div className="info-card-icon">📍</div>
            <h4>Complete Traceability</h4>
            <p>Every spare part, every transfer, every inspection — tracked from origin to destination with permanent, time-stamped records.</p>
          </div>
          <div className="info-card">
            <div className="info-card-icon">🤝</div>
            <h4>No Single Point of Control</h4>
            <p>No single person or organisation controls the records. Trust is built into the system itself — not dependent on one authority.</p>
          </div>
          <div className="info-card">
            <div className="info-card-icon">⚡</div>
            <h4>Automated Verification</h4>
            <p>"Smart contracts" can automatically check conditions — like verifying delivery and inspection before releasing payment. No delays, no bias.</p>
          </div>
          <div className="info-card">
            <div className="info-card-icon">📋</div>
            <h4>Permanent Audit Trail</h4>
            <p>Every action has a permanent record. Ideal for compliance, investigations, and accountability in procurement and logistics.</p>
          </div>
        </div>
      </div>

      {/* ============================================ */}
      {/* WHY BLOCKCHAIN FOR THE NAVY                  */}
      {/* ============================================ */}
      <div className="naval-relevance">
        <h3>⚓ Why Blockchain for Naval Logistics?</h3>
        <p style={{ marginBottom: 'var(--space-lg)', fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
          Blockchain can solve real challenges in defence supply chains. Here are practical scenarios where it adds value:
        </p>
        <div className="relevance-items">
          <div className="relevance-item">
            <span>📦</span>
            <div className="relevance-item-text">
              <h4>Spare Parts Tracking</h4>
              <p>Track every component from factory to vessel — detect counterfeits before they enter service.</p>
            </div>
          </div>
          <div className="relevance-item">
            <span>🔧</span>
            <div className="relevance-item-text">
              <h4>Maintenance Records</h4>
              <p>Immutable logs that cannot be backdated — every inspection and repair permanently recorded.</p>
            </div>
          </div>
          <div className="relevance-item">
            <span>💰</span>
            <div className="relevance-item-text">
              <h4>Procurement Integrity</h4>
              <p>Automated payment only after verified delivery and inspection — reducing corruption risk.</p>
            </div>
          </div>
          <div className="relevance-item">
            <span>🔐</span>
            <div className="relevance-item-text">
              <h4>Document Verification</h4>
              <p>Instantly verify certificates, reports, and orders without relying on a central authority.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================ */}
      {/* PROGRESS & STATS                             */}
      {/* ============================================ */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-lg)', marginBottom: 'var(--space-xl)' }}>
        <div className="card" style={{ textAlign: 'center', padding: 'var(--space-lg)' }}>
          <div className="text-accent" style={{ fontSize: '2rem', fontWeight: 800 }}>{totalScore}</div>
          <div className="text-xs text-gray">Score (out of {maxTotal})</div>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: 'var(--space-lg)' }}>
          <div className="text-accent" style={{ fontSize: '2rem', fontWeight: 800 }}>{progress}%</div>
          <div className="text-xs text-gray">Progress</div>
          <div className="progress-bar-container" style={{ marginTop: '0.5rem' }}>
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: 'var(--space-lg)' }}>
          <div className="text-green" style={{ fontSize: '2rem', fontWeight: 800 }}>
            {Object.values(modules).filter(m => m.completed).length}/{Object.keys(modules).length}
          </div>
          <div className="text-xs text-gray">Modules Completed</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)', flexWrap: 'wrap' }}>
        <button className="btn btn-secondary" onClick={() => helpRef.current?.showModal()}>
          ❓ How to Use This Portal
        </button>
        <button className="btn btn-danger" onClick={() => resetRef.current?.showModal()}>
          🔄 Reset Progress
        </button>
        {allComplete && (
          <Link to="/complete" className="btn btn-success btn-lg">
            🎓 View Training Results
          </Link>
        )}
      </div>

      {/* ============================================ */}
      {/* LEARNING MODULES                             */}
      {/* ============================================ */}
      <h2 style={{ marginBottom: 'var(--space-md)' }}>📚 Learning Modules</h2>
      <p style={{ marginBottom: 'var(--space-lg)', fontSize: '0.9375rem', color: 'var(--text-muted)' }}>
        Complete each module in order. Every module has <strong>Learn → Try → Check</strong> tabs. No programming needed — just click and explore!
      </p>
      <div className="module-grid">
        {moduleList.map((m) => {
          const state = modules[m.key];
          return (
            <Link
              to={m.path}
              key={m.key}
              className={`module-card ${state.completed ? 'completed' : ''}`}
            >
              <div className="module-number">{m.number}</div>
              <div className="card-header">
                <div className={`card-icon ${m.color}`}>{m.icon}</div>
                <div>
                  <div className="card-title">{m.title}</div>
                </div>
              </div>
              <div className="card-description">{m.desc}</div>
              <div className="module-points">
                {state.completed ? (
                  <span className="text-green" style={{ fontWeight: 600 }}>✓ Completed — {state.score}/{m.points} points</span>
                ) : (
                  <span>🏆 {m.points} points available</span>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* ============================================ */}
      {/* WORKSHOP OVERVIEW                            */}
      {/* ============================================ */}
      <div className="info-section" style={{ marginTop: 'var(--space-2xl)' }}>
        <h2>🎯 What You Will Learn Today</h2>
        <p style={{ marginBottom: 'var(--space-lg)', fontSize: '0.9375rem' }}>
          By the end of this 120-minute workshop, you will be able to:
        </p>
        <div style={{ display: 'grid', gap: 'var(--space-md)' }}>
          {[
            { num: 1, text: 'Explain what blockchain is and how it works — in plain language' },
            { num: 2, text: 'Understand how blocks, hashes, and chains create tamper-proof records' },
            { num: 3, text: 'Demonstrate why altering one record breaks the entire chain' },
            { num: 4, text: 'Describe how smart contracts automate procurement decisions' },
            { num: 5, text: 'Trace a spare part through a blockchain-based naval supply chain' },
            { num: 6, text: 'Identify appropriate and inappropriate uses of blockchain in defence' },
          ].map((obj) => (
            <div key={obj.num} style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'flex-start', padding: 'var(--space-md)', background: 'var(--bg-surface-alt)', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ width: '2rem', height: '2rem', borderRadius: 'var(--radius-full)', background: 'var(--accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.875rem', flexShrink: 0 }}>{obj.num}</div>
              <span style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', paddingTop: '0.25rem' }}>{obj.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Help Dialog */}
      <dialog ref={helpRef} className="modal">
        <div className="modal-header">
          <h3>How to Use This Portal</h3>
          <button className="modal-close" onClick={() => helpRef.current?.close()}>×</button>
        </div>
        <div>
          <p style={{ marginBottom: '1rem', fontSize: '0.9375rem' }}>Welcome! This training portal is designed for officers with <strong>no technical or programming background</strong>. Everything works by clicking buttons — there is nothing to install or code.</p>
          <h4 style={{ color: 'var(--accent)', marginBottom: '0.5rem' }}>Step-by-Step Guide</h4>
          <ol style={{ paddingLeft: '1.5rem', fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 2 }}>
            <li>Read the <strong>"What is Blockchain?"</strong> section on this page first</li>
            <li>Complete <strong>Module 1</strong> through <strong>Module 5</strong> in order</li>
            <li>Each module has tabs: <strong>Learn</strong> (read), <strong>Try</strong> (hands-on), <strong>Check</strong> (quiz)</li>
            <li>Answer the quiz questions in each module to earn points</li>
            <li>Use the <strong>Glossary</strong> if you encounter an unfamiliar term</li>
            <li>Your progress saves automatically — you can close and return later</li>
          </ol>
          <div className="warning-box" style={{ marginTop: '1rem' }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--amber-600)' }}>
              ⚠ This is an educational simulation. Do not enter any real operational, classified, or personal information.
            </p>
          </div>
        </div>
      </dialog>

      {/* Reset Confirm Dialog */}
      <dialog ref={resetRef} className="modal">
        <div className="modal-header">
          <h3>Reset All Progress?</h3>
          <button className="modal-close" onClick={() => resetRef.current?.close()}>×</button>
        </div>
        <p style={{ fontSize: '0.9375rem' }}>This will erase all your scores and module progress. This cannot be undone.</p>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
          <button className="btn btn-danger" onClick={() => { handleReset(); resetRef.current?.close(); }}>
            Yes, Reset Everything
          </button>
          <button className="btn btn-secondary" onClick={() => resetRef.current?.close()}>
            Cancel
          </button>
        </div>
      </dialog>
    </div>
  );
}
