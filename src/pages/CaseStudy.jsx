import { useState } from 'react';
import { journey, caseStudyQuestions, partId, partName } from '../data/caseStudyData.js';
import { useTraining } from '../context/TrainingContext.jsx';

export default function CaseStudy() {
  const [activeStage, setActiveStage] = useState(null);
  const [activeTab, setActiveTab] = useState('try');
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const { modules, dispatch } = useTraining();

  const handleQuizSubmit = () => {
    let score = 0;
    caseStudyQuestions.forEach((q) => { if (quizAnswers[q.id] === q.correct) score += q.points; });
    setQuizSubmitted(true);
    dispatch({ type: 'COMPLETE_MODULE', module: 'caseStudy', score });
  };

  const tabs = [
    { id: 'learn', label: '📚 Learn' },
    { id: 'try', label: '⚓ Try' },
    { id: 'check', label: '✅ Check' },
    { id: 'why', label: '🎯 Why It Matters' },
  ];

  return (
    <div>
      <div className="page-hero">
        <h1>⚓ Naval Logistics Case Study</h1>
        <p>Trace a critical spare part through the entire supply chain using blockchain records.</p>
      </div>

      <div className="tabs">
        {tabs.map((t) => (
          <button key={t.id} className={`tab ${activeTab === t.id ? 'active' : ''}`} onClick={() => setActiveTab(t.id)}>{t.label}</button>
        ))}
      </div>

      {activeTab === 'learn' && (
        <div>
          <div className="info-box">
            <h4>💡 Tracing a Critical Spare Part</h4>
            <p>In this case study, you will follow a fictional critical spare part — <strong>{partId}</strong> ({partName}) — from manufacture to final delivery at a vessel maintenance unit, using only the information recorded on the blockchain.</p>
          </div>
          <div className="card" style={{ marginTop: 'var(--space-lg)', padding: 'var(--space-xl)' }}>
            <h4 style={{ color: 'var(--cyan-400)', marginBottom: 'var(--space-md)' }}>The Journey</h4>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--gray-300)', lineHeight: 2.2, background: 'rgba(0,0,0,0.3)', padding: 'var(--space-lg)', borderRadius: 'var(--radius-md)' }}>
              <div>Manufacturer</div>
              <div style={{ color: 'var(--cyan-500)' }}>  → Supplier / Warehouse</div>
              <div style={{ color: 'var(--cyan-400)' }}>    → Inspection Bay</div>
              <div style={{ color: 'var(--green-400)' }}>      → Naval Logistics Centre</div>
              <div style={{ color: 'var(--green-500)' }}>        → Naval Base</div>
              <div style={{ color: 'var(--white)' }}>          → Vessel Maintenance Unit ✓</div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'try' && (
        <div>
          {/* Part ID Card */}
          <div className="card" style={{ marginBottom: 'var(--space-xl)', padding: 'var(--space-lg)', borderColor: 'rgba(0,212,255,0.25)', textAlign: 'center' }}>
            <div className="text-xs text-gray" style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>Tracking Part</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--cyan-500)', marginTop: '0.25rem' }}>{partId}</div>
            <div className="text-sm text-gray" style={{ marginTop: '0.25rem' }}>{partName}</div>
          </div>

          {/* Timeline */}
          <div className="timeline">
            {journey.map((stage) => (
              <div
                key={stage.stage}
                className={`timeline-item ${activeStage === stage.stage ? 'active' : ''}`}
                onClick={() => setActiveStage(activeStage === stage.stage ? null : stage.stage)}
                style={{ cursor: 'pointer' }}
              >
                <div className="timeline-dot" />
                <div className="card" style={{ padding: 'var(--space-lg)', marginBottom: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <h4 style={{ fontSize: '0.9375rem', color: 'var(--cyan-400)' }}>
                      Stage {stage.stage}: {stage.location}
                    </h4>
                    <span className="text-xs text-gray">Block #{stage.blockNumber}</span>
                  </div>
                  <p className="text-sm" style={{ color: 'var(--gray-300)', marginBottom: '0.25rem' }}>{stage.action}</p>
                  <div className="text-xs text-gray">
                    🕐 {new Date(stage.timestamp).toLocaleString()} &nbsp;|&nbsp; 👤 {stage.handler}
                  </div>

                  {/* Expanded Details */}
                  {activeStage === stage.stage && (
                    <div style={{ marginTop: 'var(--space-md)', paddingTop: 'var(--space-md)', borderTop: '1px solid rgba(0,212,255,0.1)' }}>
                      <div className="block-field">
                        <span className="block-field-label">Status</span>
                        <span className="text-green">{stage.status}</span>
                      </div>
                      <div className="block-field" style={{ borderBottom: 'none' }}>
                        <span className="block-field-label">Details</span>
                      </div>
                      <p className="text-sm text-gray" style={{ marginTop: '0.25rem' }}>{stage.details}</p>
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
          <h3 style={{ marginBottom: 'var(--space-lg)' }}>Knowledge Check — Naval Case Study</h3>
          <div className="quiz-container">
            {caseStudyQuestions.map((q, qi) => (
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
            <button className="btn btn-primary btn-lg" style={{ marginTop: 'var(--space-lg)' }} onClick={handleQuizSubmit} disabled={Object.keys(quizAnswers).length < caseStudyQuestions.length}>Submit Answers</button>
          ) : (
            <div className="success-box" style={{ marginTop: 'var(--space-lg)' }}>
              <h4 style={{ color: 'var(--green-400)' }}>✓ Module Complete — Score: {modules.caseStudy.score}/15</h4>
            </div>
          )}
        </div>
      )}

      {activeTab === 'why' && (
        <div>
          <div className="info-box">
            <h4>🎯 Defence Relevance</h4>
            <p>This case study demonstrates how blockchain provides end-to-end traceability for critical spare parts — from factory to vessel. Every handler, timestamp, and inspection result is permanently recorded, creating an unbreakable audit trail.</p>
          </div>
          <div className="card" style={{ marginTop: 'var(--space-lg)', padding: 'var(--space-lg)' }}>
            <h4 style={{ color: 'var(--cyan-400)' }}>Benefits for Naval Logistics</h4>
            <ul style={{ paddingLeft: '1.5rem', fontSize: '0.875rem', color: 'var(--gray-300)' }}>
              <li style={{ marginBottom: '0.5rem' }}>Instantly verify the provenance of any part or component</li>
              <li style={{ marginBottom: '0.5rem' }}>Detect counterfeit parts through chain-of-custody verification</li>
              <li style={{ marginBottom: '0.5rem' }}>Audit every transfer, inspection, and delivery decision</li>
              <li style={{ marginBottom: '0.5rem' }}>Coordinate across multiple organisations (manufacturers, warehouses, logistics, bases) with shared trust</li>
              <li>Support compliance with defence procurement regulations</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
