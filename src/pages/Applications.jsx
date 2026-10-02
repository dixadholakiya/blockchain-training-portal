export default function Applications() {
  const applications = [
    { icon: '📦', title: 'Supply-Chain Traceability', desc: 'Track any item from manufacturer to end user with a permanent, tamper-proof audit trail. Every transfer, handover, and inspection is recorded on the blockchain.' },
    { icon: '🔧', title: 'Spare-Parts Management', desc: 'Verify the provenance of critical spare parts to prevent counterfeit components from entering the supply chain. Each part gets a permanent digital identity.' },
    { icon: '🛠', title: 'Maintenance Records', desc: 'Create immutable maintenance logs that cannot be backdated or altered. Inspectors, engineers, and commanding officers can trust the maintenance history.' },
    { icon: '💼', title: 'Procurement Records', desc: 'Automate procurement approvals with smart contracts. Payment is released only when delivery, inspection, and verification conditions are genuinely met.' },
    { icon: '📍', title: 'Asset Tracking', desc: 'Track the location and status of high-value assets (equipment, vehicles, vessels) across multiple locations and organisations in real time.' },
    { icon: '📄', title: 'Document Verification', desc: 'Store document hashes on the blockchain to verify authenticity. Certificates, inspection reports, and orders can be verified without relying on a central authority.' },
    { icon: '🤝', title: 'Multi-Organisation Coordination', desc: 'Enable multiple organisations (ministries, manufacturers, logistics providers, bases) to share a trusted record without any single party controlling the data.' },
  ];

  const limitations = [
    { icon: '⚠', text: 'Blockchain does NOT automatically make incorrect data truthful. If wrong data is entered, it is permanently wrong.' },
    { icon: '🔒', text: 'Blockchain does NOT make a system completely secure by itself. It must be combined with access controls, encryption, and cybersecurity measures.' },
    { icon: '🔐', text: 'Blockchain does NOT automatically protect confidential information. Data on-chain may be visible to all participants unless encryption is used.' },
    { icon: '🛡', text: 'Blockchain does NOT replace cybersecurity. Endpoints, wallets, and user devices still need to be secured against attacks.' },
    { icon: '📋', text: 'Blockchain does NOT eliminate the need for governance. Clear rules about who can write, validate, and access data are still essential.' },
    { icon: '🤔', text: 'Blockchain is NOT always the right solution. For many use cases, a well-managed traditional database may be simpler, cheaper, and more appropriate.' },
  ];

  return (
    <div>
      <div className="page-hero">
        <h1>🌐 Naval Applications of Blockchain</h1>
        <p>Potential blockchain applications in defence and naval environments.</p>
      </div>

      {/* Applications Grid */}
      <div className="module-grid" style={{ marginBottom: 'var(--space-2xl)' }}>
        {applications.map((app) => (
          <div key={app.title} className="card" style={{ padding: 'var(--space-xl)' }}>
            <div className="card-header">
              <div className="card-icon cyan">{app.icon}</div>
              <div className="card-title">{app.title}</div>
            </div>
            <p className="card-description">{app.desc}</p>
          </div>
        ))}
      </div>

      {/* Important Limitations */}
      <h2 style={{ marginBottom: 'var(--space-lg)', color: 'var(--amber-400)' }}>⚠ Important Limitations</h2>
      <div className="warning-box" style={{ marginBottom: 'var(--space-md)' }}>
        <p style={{ fontSize: '0.9375rem', color: 'var(--amber-400)', fontWeight: 600 }}>
          Blockchain is a powerful tool, but it is not a magic solution. Understanding its limitations is as important as understanding its capabilities.
        </p>
      </div>
      <div style={{ display: 'grid', gap: 'var(--space-md)' }}>
        {limitations.map((l, i) => (
          <div key={i} className="card" style={{ padding: 'var(--space-lg)', borderColor: 'rgba(245,158,11,0.15)' }}>
            <p style={{ fontSize: '0.9375rem', color: 'var(--gray-200)', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>{l.icon}</span>
              <span>{l.text}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
