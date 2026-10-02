import { useState } from 'react';
import { useTraining } from '../context/TrainingContext.jsx';

const steps = [
  { id: 1, label: 'Supplier Submits Delivery', icon: '📦', action: 'Submit Delivery Confirmation', desc: 'Supplier confirms that 12 units of High-Pressure Turbine Bearing Assembly (NAV-SPARE-204) have been delivered to the Naval Logistics Centre.' },
  { id: 2, label: 'Logistics Officer Records Receipt', icon: '📋', action: 'Record Receipt', desc: 'Logistics officer verifies the delivery against the purchase order and records receipt in the system.' },
  { id: 3, label: 'Inspector Verifies Equipment', icon: '🔬', action: 'Verify Equipment', desc: 'Quality inspector examines the parts for specification compliance, dimensional accuracy, and material integrity.' },
  { id: 4, label: 'Smart Contract Checks Conditions', icon: '⚙️', action: 'Run Smart Contract', desc: 'The smart contract automatically evaluates all conditions to determine payment eligibility.' },
  { id: 5, label: 'Payment Condition Result', icon: '💰', action: null, desc: 'Based on the smart contract evaluation, the payment status is determined.' },
];

const scQuiz = [
  { id: 'sq1', question: 'What triggers the smart contract to execute?', options: ['A manual button press by an administrator', 'The completion of all required preceding steps (delivery + receipt + inspection)', 'A timer that runs every hour', 'The supplier requesting payment'], correct: 1, explanation: 'Smart contracts execute automatically when their pre-defined conditions are met — no manual intervention needed.' },
  { id: 'sq2', question: 'What happens if the inspection fails?', options: ['Payment is still processed', 'Payment status becomes "NOT ELIGIBLE"', 'The smart contract crashes', 'Someone manually overrides it'], correct: 1, explanation: 'If any condition is not met (e.g., inspection failed), the smart contract automatically sets payment to NOT ELIGIBLE. No override is possible without meeting all conditions.' },
  { id: 'sq3', question: 'Can someone change the smart contract rules after deployment?', options: ['Yes, any administrator can', 'Yes, but only the supplier', 'No — the rules are immutable once deployed on the blockchain', 'It depends on the password'], correct: 2, explanation: 'Once deployed on a blockchain, smart contract rules are immutable — they cannot be secretly altered. This ensures fairness and prevents corruption.' },
  { id: 'sq4', question: 'What advantage does a smart contract have over a manual approval process?', options: ['It is faster but less accurate', 'It eliminates human bias, delays, and the possibility of corruption in the approval process', 'It costs more but is more secure', 'It requires more paperwork'], correct: 1, explanation: 'Smart contracts remove human intermediaries from the decision process, eliminating delays, bias, and the potential for bribery or corruption in procurement approvals.' },
];

export default function SmartContract() {
  const [currentStep, setCurrentStep] = useState(0);
  const [inspectionPassed, setInspectionPassed] = useState(true);
  const [paymentResult, setPaymentResult] = useState(null);
  const [activeTab, setActiveTab] = useState('try');
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const { modules, dispatch } = useTraining();

  const handleStepAction = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 3) {
      // Smart contract evaluation
      const result = inspectionPassed;
      setPaymentResult(result);
      setCurrentStep(4);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setInspectionPassed(true);
    setPaymentResult(null);
  };

  const handleQuizSubmit = () => {
    let score = 0;
    scQuiz.forEach((q) => { if (quizAnswers[q.id] === q.correct) score += 5; });
    setQuizSubmitted(true);
    dispatch({ type: 'COMPLETE_MODULE', module: 'smartContract', score });
  };

  const tabs = [
    { id: 'learn', label: '📚 Learn' },
    { id: 'try', label: '📋 Try' },
    { id: 'check', label: '✅ Check' },
    { id: 'why', label: '🎯 Why It Matters' },
  ];

  return (
    <div>
      <div className="page-hero">
        <h1>📋 Smart Contract Simulation</h1>
        <p>Step through a naval procurement workflow where conditions are automatically verified.</p>
      </div>

      <div className="tabs">
        {tabs.map((t) => (
          <button key={t.id} className={`tab ${activeTab === t.id ? 'active' : ''}`} onClick={() => setActiveTab(t.id)}>{t.label}</button>
        ))}
      </div>

      {activeTab === 'learn' && (
        <div>
          <div className="info-box">
            <h4>💡 What is a Smart Contract?</h4>
            <p>A smart contract is a set of rules written as code that lives on the blockchain. It automatically executes when certain conditions are met — like a vending machine: insert the right amount, press the button, and the product is released. No human intermediary is needed.</p>
          </div>
          <div className="card" style={{ marginTop: 'var(--space-lg)', padding: 'var(--space-xl)' }}>
            <h4 style={{ color: 'var(--cyan-400)', marginBottom: 'var(--space-md)' }}>The Rule in This Simulation</h4>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', color: 'var(--gray-300)', lineHeight: 2, background: 'rgba(0,0,0,0.3)', padding: 'var(--space-lg)', borderRadius: 'var(--radius-md)' }}>
              <div><span className="text-cyan">IF</span></div>
              <div>  equipment_received = <span className="text-green">YES</span></div>
              <div>  <span className="text-cyan">AND</span> inspection_passed = <span className="text-green">YES</span></div>
              <div>  <span className="text-cyan">AND</span> authorised_inspector = <span className="text-green">YES</span></div>
              <div><span className="text-cyan">THEN</span></div>
              <div>  payment_status = <span className="text-green">ELIGIBLE</span></div>
              <div></div>
              <div><span className="text-cyan">OTHERWISE</span></div>
              <div>  payment_status = <span className="text-red">NOT ELIGIBLE</span></div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'try' && (
        <div>
          {/* Scenario */}
          <div className="card" style={{ marginBottom: 'var(--space-xl)', padding: 'var(--space-lg)', borderColor: 'rgba(0,212,255,0.2)' }}>
            <h4 style={{ color: 'var(--cyan-400)' }}>📦 Scenario</h4>
            <p style={{ fontSize: '0.9375rem' }}>A critical spare part (NAV-SPARE-204 — High-Pressure Turbine Bearing Assembly) has been delivered to the Naval Logistics Centre. Complete each step to see if the smart contract approves payment.</p>
          </div>

          {/* Inspection Toggle (available at step 2) */}
          {currentStep >= 2 && currentStep < 4 && (
            <div className="card" style={{ marginBottom: 'var(--space-lg)', padding: 'var(--space-lg)', background: 'rgba(245,158,11,0.08)', borderColor: 'rgba(245,158,11,0.2)' }}>
              <h4 style={{ color: 'var(--amber-400)', marginBottom: '0.5rem' }}>⚙ Inspection Decision</h4>
              <p className="text-sm text-gray" style={{ marginBottom: '0.75rem' }}>Toggle the inspection result to see how the smart contract responds.</p>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontSize: '0.9375rem' }}>
                <input
                  type="checkbox"
                  checked={inspectionPassed}
                  onChange={(e) => setInspectionPassed(e.target.checked)}
                  style={{ width: '1.25rem', height: '1.25rem', accentColor: 'var(--cyan-500)' }}
                />
                <span style={{ color: inspectionPassed ? 'var(--green-400)' : 'var(--red-400)' }}>
                  Inspection {inspectionPassed ? 'PASSED ✓' : 'FAILED ✗'}
                </span>
              </label>
            </div>
          )}

          {/* Workflow Steps */}
          <div className="workflow-container">
            {steps.map((step, i) => {
              const isCompleted = i < currentStep;
              const isActive = i === currentStep;
              const isLocked = i > currentStep;

              return (
                <div key={step.id}>
                  {i > 0 && <div className={`workflow-connector ${isCompleted ? 'active' : ''}`} />}
                  <div className={`workflow-step ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''} ${isLocked ? 'locked' : ''}`}>
                    <div className="workflow-step-number">
                      {isCompleted ? '✓' : step.id}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '0.9375rem', marginBottom: '0.25rem' }}>{step.icon} {step.label}</h4>
                      <p className="text-sm text-gray">{step.desc}</p>

                      {/* Payment Result */}
                      {step.id === 5 && paymentResult !== null && (
                        <div style={{ marginTop: 'var(--space-md)' }}>
                          {paymentResult ? (
                            <div className="success-box">
                              <h4 style={{ color: 'var(--green-400)', fontSize: '1.25rem' }}>💰 Payment Status: ELIGIBLE ✓</h4>
                              <p className="text-sm" style={{ marginTop: '0.5rem', color: 'var(--green-400)' }}>All conditions met. Smart contract has approved payment eligibility.</p>
                            </div>
                          ) : (
                            <div className="danger-box">
                              <h4 style={{ color: 'var(--red-400)', fontSize: '1.25rem' }}>🚫 Payment Status: NOT ELIGIBLE ✗</h4>
                              <p className="text-sm" style={{ marginTop: '0.5rem', color: 'var(--red-400)' }}>Condition not met: Inspection FAILED. Payment cannot be released.</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Action Button */}
                    {isActive && step.action && (
                      <button className="btn btn-primary btn-sm" onClick={handleStepAction} style={{ flexShrink: 0 }}>
                        {step.action}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Reset */}
          <div style={{ marginTop: 'var(--space-xl)', textAlign: 'center' }}>
            <button className="btn btn-secondary" onClick={handleReset}>🔄 Reset Workflow</button>
          </div>
        </div>
      )}

      {activeTab === 'check' && (
        <div>
          <h3 style={{ marginBottom: 'var(--space-lg)' }}>Knowledge Check — Smart Contracts</h3>
          <div className="quiz-container">
            {scQuiz.map((q, qi) => (
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
            <button className="btn btn-primary btn-lg" style={{ marginTop: 'var(--space-lg)' }} onClick={handleQuizSubmit} disabled={Object.keys(quizAnswers).length < scQuiz.length}>Submit Answers</button>
          ) : (
            <div className="success-box" style={{ marginTop: 'var(--space-lg)' }}>
              <h4 style={{ color: 'var(--green-400)' }}>✓ Module Complete — Score: {modules.smartContract.score}/20</h4>
            </div>
          )}
        </div>
      )}

      {activeTab === 'why' && (
        <div>
          <div className="info-box">
            <h4>🎯 Defence Relevance</h4>
            <p>In naval procurement, smart contracts can automate payment approvals, ensuring that suppliers are paid only when delivery, inspection, and verification conditions are genuinely met. This reduces corruption, eliminates bureaucratic delays, and creates a transparent audit trail.</p>
          </div>
          <div className="card" style={{ marginTop: 'var(--space-lg)', padding: 'var(--space-lg)' }}>
            <h4 style={{ color: 'var(--cyan-400)' }}>Potential Applications</h4>
            <ul style={{ paddingLeft: '1.5rem', fontSize: '0.875rem', color: 'var(--gray-300)' }}>
              <li style={{ marginBottom: '0.5rem' }}>Automated procurement payment upon verified delivery</li>
              <li style={{ marginBottom: '0.5rem' }}>Warranty enforcement — claims processed only with valid maintenance records</li>
              <li style={{ marginBottom: '0.5rem' }}>Multi-party approval workflows (manufacturer + inspector + logistics + finance)</li>
              <li>Cross-organisation coordination without requiring trust in a single intermediary</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
