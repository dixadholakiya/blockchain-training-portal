import { Link } from 'react-router-dom';
import { useTraining } from '../context/TrainingContext.jsx';

const outcomes = [
  { label: 'Blockchain blocks and their structure', key: 'explorer' },
  { label: 'Hash generation and chain linking', key: 'build' },
  { label: 'Tamper detection and immutability', key: 'tamper' },
  { label: 'Smart contracts and automated verification', key: 'smartContract' },
  { label: 'Supply chain traceability with blockchain', key: 'caseStudy' },
  { label: 'Blockchain applications in naval logistics', key: null },
];

export default function TrainingComplete() {
  const { totalScore, maxTotal, modules, allComplete, dispatch } = useTraining();

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <div className="completion-card">
        <div style={{ fontSize: '3rem', marginBottom: 'var(--space-md)' }}>🎓</div>
        <h1 style={{ marginBottom: 'var(--space-sm)' }}>Training Complete</h1>
        <p style={{ textAlign: 'center', margin: '0 auto', color: 'var(--text-secondary)' }}>
          You have completed the Blockchain in Action workshop.
        </p>

        <div className="completion-score" style={{ margin: 'var(--space-xl) 0' }}>
          {totalScore} / {maxTotal}
        </div>
        <p className="text-gray text-center">Total Score</p>

        {/* Module Breakdown */}
        <div style={{ margin: 'var(--space-xl) auto', maxWidth: '400px' }}>
          {Object.entries(modules).map(([key, mod]) => (
            <div key={key} className="block-field" style={{ padding: '0.5rem 0' }}>
              <span className="block-field-label" style={{ textTransform: 'capitalize', fontSize: '0.875rem' }}>
                {key.replace(/([A-Z])/g, ' $1')}
              </span>
              <span className={mod.completed ? 'text-green' : 'text-gray'} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>
                {mod.score}/{mod.maxScore} {mod.completed ? '✓' : '—'}
              </span>
            </div>
          ))}
        </div>

        {/* Learning Outcomes */}
        <div style={{ textAlign: 'left', marginTop: 'var(--space-2xl)' }}>
          <h3 style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
            You have demonstrated an understanding of:
          </h3>
          <ul className="outcome-list">
            {outcomes.map((o) => {
              const completed = o.key ? modules[o.key]?.completed : allComplete;
              return (
                <li key={o.label}>
                  <span className="outcome-check">{completed ? '✓' : '○'}</span>
                  <span>{o.label}</span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', marginTop: 'var(--space-2xl)', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-secondary">
            ← Back to Dashboard
          </Link>
          <button className="btn btn-danger" onClick={() => dispatch({ type: 'RESET' })}>
            🔄 Restart Training
          </button>
        </div>
      </div>
    </div>
  );
}
