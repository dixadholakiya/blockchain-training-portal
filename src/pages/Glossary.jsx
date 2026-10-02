import { useState } from 'react';
import { glossaryTerms } from '../data/glossaryData.js';

export default function Glossary() {
  const [search, setSearch] = useState('');

  const filtered = glossaryTerms.filter((t) =>
    t.term.toLowerCase().includes(search.toLowerCase()) ||
    t.definition.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="page-hero">
        <h1>📖 Glossary</h1>
        <p>Key blockchain terms explained in plain language for non-technical professionals.</p>
      </div>

      <div className="search-wrapper" style={{ marginBottom: 'var(--space-xl)' }}>
        <span className="search-icon">🔍</span>
        <input
          className="search-input"
          type="text"
          placeholder="Search terms..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search glossary terms"
        />
      </div>

      <div className="glossary-grid">
        {filtered.map((t) => (
          <div key={t.term} className="glossary-card">
            <div className="glossary-term">{t.term}</div>
            <div className="glossary-definition">{t.definition}</div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="card" style={{ textAlign: 'center', padding: 'var(--space-2xl)' }}>
          <p className="text-gray">No terms match your search.</p>
        </div>
      )}
    </div>
  );
}
