import { NavLink } from 'react-router-dom';
import { useTraining } from '../../context/TrainingContext.jsx';

const modules = [
  { key: 'explorer', label: 'Blockchain Explorer', path: '/explorer', icon: '🔍' },
  { key: 'build', label: 'Build & Verify', path: '/build', icon: '🧱' },
  { key: 'tamper', label: 'Detect Tampering', path: '/tamper', icon: '🛡' },
  { key: 'smartContract', label: 'Smart Contract', path: '/smart-contract', icon: '📋' },
  { key: 'caseStudy', label: 'Naval Case Study', path: '/case-study', icon: '⚓' },
];

const links = [
  { label: 'Security Cases', path: '/security-cases', icon: '🔐' },
  { label: 'Glossary', path: '/glossary', icon: '📖' },
  { label: 'Applications', path: '/applications', icon: '🌐' },
  { label: 'Instructor', path: '/instructor', icon: '👨‍🏫' },
];

export default function Sidebar({ isOpen, onClose }) {
  const { modules: modState, totalScore, maxTotal, progress } = useTraining();

  return (
    <>
      {/* Overlay on mobile */}
      {isOpen && <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 997 }} onClick={onClose} />}

      <aside className={`app-sidebar ${isOpen ? 'open' : ''}`}>
        {/* Score */}
        <div className="sidebar-section">
          <div className="score-card">
            <div className="score-value">{totalScore}</div>
            <div className="score-label">Points out of {maxTotal}</div>
            <div className="progress-bar-container" style={{ marginTop: '0.75rem' }}>
              <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="text-xs text-gray" style={{ marginTop: '0.5rem' }}>{progress}% Complete</div>
          </div>
        </div>

        {/* Modules */}
        <div className="sidebar-section">
          <div className="sidebar-label">Learning Modules</div>
          {modules.map((m) => {
            const s = modState[m.key];
            const statusClass = s.completed ? 'completed' : s.score > 0 ? 'in-progress' : 'not-started';
            return (
              <NavLink
                key={m.key}
                to={m.path}
                className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
                onClick={onClose}
              >
                <span className={`sidebar-status ${statusClass}`} />
                <span style={{ marginRight: 'auto' }}>{m.icon} {m.label}</span>
                {s.completed && <span className="text-xs text-green">✓</span>}
              </NavLink>
            );
          })}
        </div>

        {/* Resources */}
        <div className="sidebar-section">
          <div className="sidebar-label">Resources</div>
          {links.map((l) => (
            <NavLink
              key={l.path}
              to={l.path}
              className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <span>{l.icon} {l.label}</span>
            </NavLink>
          ))}
        </div>
      </aside>
    </>
  );
}
