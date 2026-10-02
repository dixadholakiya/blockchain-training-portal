import { useState } from 'react';
import { useTraining } from '../context/TrainingContext.jsx';

const schedule = [
  { time: '0–15 min', activity: 'Introduction & Overview', desc: 'Welcome, learning objectives, portal tour' },
  { time: '15–30 min', activity: 'Module 1: Blockchain Explorer', desc: 'Explore blocks, transactions, search, discuss transparency' },
  { time: '30–55 min', activity: 'Module 2: Build & Verify a Block', desc: 'Create blocks, generate hashes, build a chain' },
  { time: '55–75 min', activity: 'Module 3: Tampering Detection', desc: 'Tamper with a block, observe chain breakage, quiz' },
  { time: '75–95 min', activity: 'Module 4: Smart Contract Simulation', desc: 'Step through procurement workflow, toggle conditions' },
  { time: '95–110 min', activity: 'Module 5: Naval Case Study', desc: 'Trace NAV-SPARE-204, answer questions' },
  { time: '110–120 min', activity: 'Discussion & Final Quiz', desc: 'Open discussion, review scores, closing remarks' },
];

const discussionQuestions = [
  'What advantages does blockchain provide over a conventional database for supply chain management?',
  'Where could blockchain help most in naval logistics — and why?',
  'What types of information should NOT be placed on a blockchain? Why?',
  'What happens if incorrect information is entered into the blockchain initially? Does blockchain fix this?',
  'Who should operate and validate the nodes in a military blockchain network?',
  'When would a conventional database be a better choice than blockchain?',
];

const learningObjectives = [
  'Explain what a blockchain is and how blocks are linked together',
  'Describe how hashes provide tamper detection',
  'Demonstrate how changing data in one block affects the entire chain',
  'Explain what a smart contract does and how it automates decisions',
  'Trace an item through a blockchain-based supply chain',
  'Identify appropriate and inappropriate uses of blockchain in defence',
];

export default function InstructorMode() {
  const { instructorUnlocked, dispatch, modules, totalScore, maxTotal } = useTraining();
  const [pin, setPin] = useState('');
  const [showAnswers, setShowAnswers] = useState(false);

  const handleUnlock = () => {
    if (pin === '1234') {
      dispatch({ type: 'UNLOCK_INSTRUCTOR' });
    }
  };

  if (!instructorUnlocked) {
    return (
      <div>
        <div className="page-hero">
          <h1>👨‍🏫 Instructor Mode</h1>
          <p>Enter the instructor PIN to access workshop management tools.</p>
        </div>
        <div className="card" style={{ maxWidth: '400px', padding: 'var(--space-xl)' }}>
          <label className="text-sm text-gray" style={{ display: 'block', marginBottom: '0.5rem' }}>Instructor PIN</label>
          <input
            className="search-input"
            style={{ paddingLeft: 'var(--space-md)', marginBottom: 'var(--space-md)' }}
            type="password"
            placeholder="Enter PIN..."
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleUnlock(); }}
          />
          <button className="btn btn-primary" onClick={handleUnlock}>Unlock Instructor Mode</button>
          <p className="text-xs text-gray" style={{ marginTop: 'var(--space-md)' }}>Default PIN: 1234</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-hero">
        <h1>👨‍🏫 Instructor Mode</h1>
        <p>Workshop management tools and instructor guide.</p>
      </div>

      <div className="instructor-panel">
        <div className="instructor-badge">🔓 Instructor Mode Active</div>
      </div>

      {/* Quick Actions */}
      <div style={{ display: 'flex', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)', flexWrap: 'wrap' }}>
        <button className="btn btn-danger" onClick={() => dispatch({ type: 'RESET' })}>
          🔄 Reset All Activities
        </button>
        <button className="btn btn-secondary" onClick={() => setShowAnswers(!showAnswers)}>
          {showAnswers ? '🙈 Hide Answers' : '👁 Reveal All Answers'}
        </button>
        <button className="btn btn-ghost" onClick={() => dispatch({ type: 'TOGGLE_INSTRUCTOR' })}>
          Toggle Instructor Mode
        </button>
      </div>

      {/* Participant Scores Overview */}
      <div className="card" style={{ marginBottom: 'var(--space-xl)', padding: 'var(--space-xl)' }}>
        <h3 style={{ marginBottom: 'var(--space-md)' }}>Current Session Scores</h3>
        <div style={{ display: 'grid', gap: 'var(--space-sm)' }}>
          {Object.entries(modules).map(([key, mod]) => (
            <div key={key} className="block-field">
              <span className="block-field-label" style={{ textTransform: 'capitalize' }}>{key.replace(/([A-Z])/g, ' $1')}</span>
              <span className={mod.completed ? 'text-green' : 'text-gray'}>
                {mod.score}/{mod.maxScore} {mod.completed ? '✓' : ''}
              </span>
            </div>
          ))}
          <div className="block-field" style={{ borderBottom: 'none', borderTop: '2px solid var(--cyan-500)', paddingTop: 'var(--space-md)' }}>
            <span className="block-field-label" style={{ fontWeight: 700 }}>Total</span>
            <span className="text-cyan" style={{ fontWeight: 700 }}>{totalScore}/{maxTotal}</span>
          </div>
        </div>
      </div>

      {/* Workshop Timing */}
      <div className="card" style={{ marginBottom: 'var(--space-xl)', padding: 'var(--space-xl)' }}>
        <h3 style={{ marginBottom: 'var(--space-md)' }}>Workshop Schedule (120 Minutes)</h3>
        <div style={{ display: 'grid', gap: 'var(--space-sm)' }}>
          {schedule.map((s) => (
            <div key={s.time} className="block-field">
              <div>
                <span className="text-cyan text-mono text-sm" style={{ marginRight: '1rem' }}>{s.time}</span>
                <span style={{ fontWeight: 600 }}>{s.activity}</span>
                <span className="text-xs text-gray" style={{ marginLeft: '0.5rem' }}>— {s.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Objectives */}
      <div className="card" style={{ marginBottom: 'var(--space-xl)', padding: 'var(--space-xl)' }}>
        <h3 style={{ marginBottom: 'var(--space-md)' }}>Learning Objectives</h3>
        <ul style={{ paddingLeft: '1.5rem', fontSize: '0.9375rem', color: 'var(--gray-300)' }}>
          {learningObjectives.map((obj, i) => (
            <li key={i} style={{ marginBottom: '0.5rem' }}>
              <span className="text-green" style={{ marginRight: '0.5rem' }}>{i + 1}.</span> {obj}
            </li>
          ))}
        </ul>
      </div>

      {/* Discussion Questions */}
      <div className="card" style={{ marginBottom: 'var(--space-xl)', padding: 'var(--space-xl)' }}>
        <h3 style={{ marginBottom: 'var(--space-md)' }}>Discussion Questions</h3>
        <div style={{ display: 'grid', gap: 'var(--space-md)' }}>
          {discussionQuestions.map((q, i) => (
            <div key={i} style={{ background: 'rgba(0,0,0,0.2)', padding: 'var(--space-md)', borderRadius: 'var(--radius-md)' }}>
              <p style={{ fontSize: '0.9375rem', color: 'var(--gray-200)' }}>
                <span className="text-cyan" style={{ fontWeight: 700, marginRight: '0.5rem' }}>Q{i + 1}.</span> {q}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Answer Key (if revealed) */}
      {showAnswers && (
        <div className="card" style={{ padding: 'var(--space-xl)', borderColor: 'rgba(245,158,11,0.3)' }}>
          <h3 style={{ color: 'var(--amber-400)', marginBottom: 'var(--space-md)' }}>🔑 Quiz Answer Key</h3>
          <div style={{ fontSize: '0.875rem', color: 'var(--gray-300)' }}>
            <h4 style={{ color: 'var(--cyan-400)', marginTop: 'var(--space-md)' }}>Module 1 — Blockchain Explorer</h4>
            <p>Q1: C (Hash of previous block) | Q2: C (Changes hash, breaks chain) | Q3: B (Validator node) | Q4: B (Permanent audit record)</p>
            <h4 style={{ color: 'var(--cyan-400)', marginTop: 'var(--space-md)' }}>Module 2 — Build & Verify</h4>
            <p>Q1: B (Hash changes completely) | Q2: B (Previous block's hash) | Q3: B (2 connections) | Q4: B (No previous hash — genesis)</p>
            <h4 style={{ color: 'var(--cyan-400)', marginTop: 'var(--space-md)' }}>Module 3 — Tampering Detection</h4>
            <p>Q1: C (Block 3) | Q2: B (Previous hash mismatch) | Q3: C (3 blocks) | Q4: C (Need to recalculate all) | Q5: B (Immutability)</p>
            <h4 style={{ color: 'var(--cyan-400)', marginTop: 'var(--space-md)' }}>Module 4 — Smart Contract</h4>
            <p>Q1: B (Conditions met) | Q2: B (NOT ELIGIBLE) | Q3: C (Immutable) | Q4: B (Eliminates bias/corruption)</p>
            <h4 style={{ color: 'var(--cyan-400)', marginTop: 'var(--space-md)' }}>Module 5 — Case Study</h4>
            <p>Q1: B (Manufacturer B) | Q2: B (Warehouse Officer) | Q3: C (09:00) | Q4: B (Yes, Block 10520 before 10521) | Q5: C (Consistent records)</p>
          </div>
        </div>
      )}
    </div>
  );
}
