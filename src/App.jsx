import React, { useState, useEffect } from 'react';

const CASES = {
  "Total Health Connections": "https://docs.google.com/document/d/1UWskJERde9hip9FgKonDmP21GOHIcDJZS217VWGIeCc/export?format=txt",
  "Autoflower Case": "https://docs.google.com/document/d/1RKRh2B2GWkopW5eKG2SYkM3dF7kfXnO6jsdeyox13Cc/export?format=txt",
  "Red/Black Case Photoperiods": "https://docs.google.com/document/d/1J2jWK6EEERu834e2wR--hoABcgxrpppkpNk2r_H8V-0/export?format=txt",
  "Black Case Photoperiods": "https://docs.google.com/document/d/1qoE2gM291GBNlX5pP9dtnNqqNF-aZzb4P-_w-DLUvZ8/export?format=txt",
  "Chronic Worm Farmer Case": "https://docs.google.com/document/d/1f2JwxGy_xlhVbYW11NCP06t6qXbai_lKHC_UCrWsNgM/export?format=txt",
  "Blue Case Photos": "https://docs.google.com/document/d/1J8w2LCXDhhIq4EUcge_XhMCftzw7aC7yajCrU6z93QY/export?format=txt",
};

const ALIASES = {
  "thc": "total health connections",
  "copy": "copycat genetics",
  "copycat": "copycat genetics",
  "cwf": "cwf", // Only match "CWF" as a breeder label, not the case name
};

function App() {
  const [selectedCase, setSelectedCase] = useState('');
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);

  // Load all data once on mount
  useEffect(() => {
    async function loadAllCases() {
      const allEntries = [];
      for (const [caseName, url] of Object.entries(CASES)) {
        try {
          const res = await fetch(`/api/seedlist?url=${encodeURIComponent(url)}`);
          const text = await res.text();
          const lines = text.split('\n').filter(line => line.trim().length > 0);
          const entries = lines.map(line => ({ text: line, case: caseName }));
          allEntries.push(...entries);
        } catch (err) {
          console.error(`Failed to fetch ${caseName}: ${err.message}`);
        }
      }
      setData(allEntries);
    }
    loadAllCases();
  }, []);

  const filtered = search
    ? data.filter(entry => {
        const lower = entry.text.toLowerCase();
        const term = search.toLowerCase();
        const alias = ALIASES[term] || term;
        return lower.includes(alias);
      })
    : selectedCase
    ? data.filter(entry => entry.case === selectedCase)
    : [];

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Chronic Seed Vault</h1>
      <select
        value={selectedCase}
        onChange={e => setSelectedCase(e.target.value)}
        style={{ marginBottom: '1rem', padding: '0.5rem' }}
      >
        <option value="">Select a seed case...</option>
        {Object.keys(CASES).map(name => (
          <option key={name} value={name}>{name}</option>
        ))}
      </select>
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search by strain, breeder, slot, etc..."
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />
      {error && <pre>{JSON.stringify(error)}</pre>}
      {filtered.map((entry, i) => (
        <div key={i} style={{ border: '1px solid #ccc', padding: '0.5rem', marginBottom: '0.5rem' }}>
          <strong>{entry.case}</strong><br />
          {entry.text}
        </div>
      ))}
    </div>
  );
}

export default App;
