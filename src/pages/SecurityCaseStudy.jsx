import { useState } from 'react';
import { securityCaseStudies } from '../data/securityCaseStudyData.js';

export default function SecurityCaseStudy() {
  const [activeCaseId, setActiveCaseId] = useState(securityCaseStudies[0].id);
  const [activeSection, setActiveSection] = useState('scenario');
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState({});

  const activeCase = securityCaseStudies.find((c) => c.id === activeCaseId);

  const handleQuizSubmit = (caseId) => {
    setQuizSubmitted({ ...quizSubmitted, [caseId]: true });
  };

  const getScore = (cs) => {
    if (!quizSubmitted[cs.id]) return null;
    return cs.quiz.reduce((sum, q) => sum + (quizAnswers[q.id] === q.correct ? 1 : 0), 0);
  };

  const sections = [
    { id: 'scenario', label: '📋 The Incident', icon: '📋' },
    { id: 'investigation', label: '🔍 What Went Wrong', icon: '🔍' },
    { id: 'solution', label: '✅ Blockchain Solution', icon: '✅' },
    { id: 'quiz', label: '📝 Test Yourself', icon: '📝' },
  ];

  return (
    <div>
      <div className="page-hero">
        <h1>🔐 Security Case Studies</h1>
        <p>Real-world security scenarios (fictional) showing how blockchain prevents common threats in naval logistics.</p>
      </div>

      {/* Intro Box */}
      <div className="info-box" style={{ marginBottom: 'var(--space-xl)' }}>
        <h4>💡 How to Use These Case Studies</h4>
        <p>Each case study follows a 4-step structure: <strong>The Incident</strong> (what happened) → <strong>What Went Wrong</strong> (why traditional systems failed) → <strong>Blockchain Solution</strong> (how blockchain prevents it) → <strong>Test Yourself</strong> (verify your understanding). Work through each case in order.</p>
      </div>

      {/* Case Study Selector */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
        {securityCaseStudies.map((cs) => {
          const isActive = activeCaseId === cs.id;
          const score = getScore(cs);
          return (
            <button
              key={cs.id}
              onClick={() => { setActiveCaseId(cs.id); setActiveSection('scenario'); }}
              style={{
                background: isActive ? 'var(--accent-light)' : 'var(--bg-surface)',
                border: isActive ? '2px solid var(--accent)' : '1px solid var(--border-light)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-lg)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease',
                boxShadow: isActive ? '0 0 0 3px var(--accent-light)' : 'var(--shadow-xs)',
                fontFamily: 'var(--font-sans)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-sm)' }}>
                <span style={{ fontSize: '1.5rem' }}>{cs.icon}</span>
                <div>
                  <div style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent)' }}>{cs.category}</div>
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{cs.title}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-md)', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                <span>⏱ {cs.duration}</span>
                <span>📊 {cs.difficulty}</span>
                {score !== null && <span style={{ color: 'var(--green-600)', fontWeight: 600 }}>✓ {score}/{cs.quiz.length} correct</span>}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Case Study */}
      {activeCase && (
        <div>
          {/* Case Title */}
          <div className="card" style={{ marginBottom: 'var(--space-lg)', padding: 'var(--space-xl)', borderLeft: '4px solid var(--accent)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
              <span style={{ fontSize: '2.5rem' }}>{activeCase.icon}</span>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent)' }}>{activeCase.category}</div>
                <h2 style={{ marginBottom: '0.25rem' }}>{activeCase.title}</h2>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>⏱ {activeCase.duration} · 📊 {activeCase.difficulty}</div>
              </div>
            </div>
          </div>

          {/* Section Tabs */}
          <div className="tabs">
            {sections.map((s) => (
              <button
                key={s.id}
                className={`tab ${activeSection === s.id ? 'active' : ''}`}
                onClick={() => setActiveSection(s.id)}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* SCENARIO Section */}
          {activeSection === 'scenario' && (
            <div>
              <h3 style={{ marginBottom: 'var(--space-md)' }}>{activeCase.scenario.title}</h3>
              <p style={{ fontSize: '1.0625rem', lineHeight: 1.8, marginBottom: 'var(--space-xl)' }}>
                {activeCase.scenario.background}
              </p>

              {/* Timeline */}
              <h4 style={{ marginBottom: 'var(--space-md)', color: 'var(--accent)' }}>📅 Timeline of Events</h4>
              <div className="timeline">
                {activeCase.scenario.timeline.map((event, i) => (
                  <div key={i} className="timeline-item">
                    <div className="timeline-dot" />
                    <div className="card" style={{ padding: 'var(--space-lg)', marginBottom: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-md)' }}>
                        <span style={{ fontSize: '1.25rem' }}>{event.icon}</span>
                        <div>
                          <div style={{ fontWeight: 600, color: 'var(--accent)', fontSize: '0.875rem', marginBottom: '0.125rem' }}>{event.date}</div>
                          <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>{event.event}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Impact */}
              <div className="danger-box" style={{ marginTop: 'var(--space-xl)' }}>
                <h4 style={{ color: 'var(--red-600)', marginBottom: 'var(--space-sm)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>🚨 Impact</h4>
                <ul style={{ paddingLeft: '1.5rem', fontSize: '0.9375rem', color: 'var(--red-600)' }}>
                  {activeCase.scenario.impact.map((item, i) => (
                    <li key={i} style={{ marginBottom: '0.5rem' }}>{item}</li>
                  ))}
                </ul>
              </div>

              <div style={{ marginTop: 'var(--space-lg)', textAlign: 'center' }}>
                <button className="btn btn-primary" onClick={() => setActiveSection('investigation')}>
                  Continue → What Went Wrong 🔍
                </button>
              </div>
            </div>
          )}

          {/* INVESTIGATION Section */}
          {activeSection === 'investigation' && (
            <div>
              <h3 style={{ marginBottom: 'var(--space-md)' }}>{activeCase.investigation.title}</h3>
              <p style={{ marginBottom: 'var(--space-lg)', fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
                The incident exposed several weaknesses in the existing systems. Here is what failed and why:
              </p>

              <div style={{ display: 'grid', gap: 'var(--space-md)' }}>
                {activeCase.investigation.failures.map((f, i) => (
                  <div key={i} className="card" style={{ padding: 'var(--space-lg)', borderLeft: '4px solid var(--red-500)' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-lg)' }}>
                      <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: 'var(--radius-full)', background: 'var(--red-100)', color: 'var(--red-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.875rem', flexShrink: 0 }}>
                        {i + 1}
                      </div>
                      <div>
                        <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.25rem' }}>❌ {f.method}</h4>
                        <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>{f.problem}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="warning-box" style={{ marginTop: 'var(--space-xl)' }}>
                <h4 style={{ color: 'var(--amber-600)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>💡 Key Takeaway</h4>
                <p style={{ fontSize: '0.9375rem', color: 'var(--amber-600)' }}>
                  These are not rare or exotic failures — they are <strong>common vulnerabilities</strong> in any system that relies on paper records, single-point verification, or editable databases. Blockchain addresses all of them simultaneously.
                </p>
              </div>

              <div style={{ marginTop: 'var(--space-lg)', textAlign: 'center' }}>
                <button className="btn btn-primary" onClick={() => setActiveSection('solution')}>
                  Continue → Blockchain Solution ✅
                </button>
              </div>
            </div>
          )}

          {/* SOLUTION Section */}
          {activeSection === 'solution' && (
            <div>
              <h3 style={{ marginBottom: 'var(--space-md)' }}>{activeCase.solution.title}</h3>
              <p style={{ marginBottom: 'var(--space-xl)', fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
                Here is how blockchain technology would have prevented this incident, step by step:
              </p>

              {/* Solution Steps */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {activeCase.solution.steps.map((s, i) => (
                  <div key={s.step}>
                    {i > 0 && (
                      <div style={{ width: '2px', height: '1.5rem', background: 'var(--border-medium)', marginLeft: 'calc(var(--space-lg) + 1.25rem)' }} />
                    )}
                    <div className="card" style={{ padding: 'var(--space-lg)', borderLeft: '4px solid var(--green-500)' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-lg)' }}>
                        <div style={{ width: '2.75rem', height: '2.75rem', borderRadius: 'var(--radius-full)', background: 'var(--green-100)', color: 'var(--green-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.125rem', flexShrink: 0 }}>
                          {s.icon}
                        </div>
                        <div>
                          <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Step {s.step}: {s.heading}</h4>
                          <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{s.detail}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Outcome */}
              <div className="success-box" style={{ marginTop: 'var(--space-xl)' }}>
                <h4 style={{ color: 'var(--green-600)', marginBottom: 'var(--space-sm)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>✅ Outcome with Blockchain</h4>
                <p style={{ fontSize: '0.9375rem', color: 'var(--green-600)', lineHeight: 1.7 }}>{activeCase.solution.outcome}</p>
              </div>

              <div style={{ marginTop: 'var(--space-lg)', textAlign: 'center' }}>
                <button className="btn btn-primary" onClick={() => setActiveSection('quiz')}>
                  Continue → Test Your Understanding 📝
                </button>
              </div>
            </div>
          )}

          {/* QUIZ Section */}
          {activeSection === 'quiz' && (
            <div>
              <h3 style={{ marginBottom: 'var(--space-md)' }}>Test Your Understanding</h3>
              <p style={{ marginBottom: 'var(--space-lg)', fontSize: '0.9375rem', color: 'var(--text-muted)' }}>
                Answer these questions based on what you learned from this case study.
              </p>

              <div className="quiz-container">
                {activeCase.quiz.map((q, qi) => (
                  <div key={q.id} className="quiz-question">
                    <div className="quiz-question-text">{qi + 1}. {q.question}</div>
                    <div className="quiz-options">
                      {q.options.map((opt, oi) => {
                        let cls = 'quiz-option';
                        if (quizSubmitted[activeCase.id]) {
                          if (oi === q.correct) cls += ' correct';
                          else if (quizAnswers[q.id] === oi) cls += ' incorrect';
                        } else if (quizAnswers[q.id] === oi) {
                          cls += ' selected';
                        }
                        return (
                          <button
                            key={oi}
                            className={cls}
                            onClick={() => {
                              if (!quizSubmitted[activeCase.id]) {
                                setQuizAnswers({ ...quizAnswers, [q.id]: oi });
                              }
                            }}
                            disabled={quizSubmitted[activeCase.id]}
                          >
                            {String.fromCharCode(65 + oi)}. {opt}
                          </button>
                        );
                      })}
                    </div>
                    {quizSubmitted[activeCase.id] && (
                      <div className={`quiz-feedback ${quizAnswers[q.id] === q.correct ? 'correct' : 'incorrect'}`}>
                        {quizAnswers[q.id] === q.correct ? '✓ Correct! ' : '✗ Incorrect. '}
                        {q.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {!quizSubmitted[activeCase.id] ? (
                <button
                  className="btn btn-primary btn-lg"
                  style={{ marginTop: 'var(--space-lg)' }}
                  onClick={() => handleQuizSubmit(activeCase.id)}
                  disabled={activeCase.quiz.some((q) => quizAnswers[q.id] === undefined)}
                >
                  Submit Answers
                </button>
              ) : (
                <div className="success-box" style={{ marginTop: 'var(--space-lg)' }}>
                  <h4 style={{ color: 'var(--green-600)' }}>
                    ✓ Case Study Complete — {getScore(activeCase)}/{activeCase.quiz.length} correct
                  </h4>
                  {/* Link to next case */}
                  {activeCaseId !== securityCaseStudies[securityCaseStudies.length - 1].id && (
                    <button
                      className="btn btn-secondary"
                      style={{ marginTop: 'var(--space-md)' }}
                      onClick={() => {
                        const idx = securityCaseStudies.findIndex((c) => c.id === activeCaseId);
                        setActiveCaseId(securityCaseStudies[idx + 1].id);
                        setActiveSection('scenario');
                      }}
                    >
                      Next Case Study →
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
