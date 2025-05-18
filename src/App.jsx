import React, { useState, useEffect } from 'react';

const CASES = {
  "Total Health Connections": "https://docs.google.com/document/d/1FSxo3B5Sw4oNX8eD6akMLmLQi_8gL7quxWvT4k8-dlk/export?format=txt",
  "Autoflower Case": "https://docs.google.com/document/d/1RKRh2B2GWkopW5eKG2SYkM3dF7kfXnO6jsdeyox13Cc/export?format=txt",
  "Red/Black Case Photoperiods": "https://docs.google.com/document/d/1J2jWK6EEERu834e2wR--hoABcgxrpppkpNk2r_H8V-0/export?format=txt",
  "Black Case Photoperiods": "https://docs.google.com/document/d/1f2JwxGy_xlhVbYW11NCP06t6qXbai_lKHC_UCrWsNgM/export?format=txt",  // Fixed
  "Blue Case Photos": "https://docs.google.com/document/d/1qoE2gM291GBNlX5pP9dtnNqqNF-aZzb4P-_w-DLUvZ8/export?format=txt",     // Fixed
  "Chronic Worm Farmer Case": "https://docs.google.com/document/d/1UWskJERde9hip9FgKonDmP21GOHIcDJZS217VWGIeCc/export?format=txt"
};

const ALIASES = {
  "copy": "copycat genetics",
  "copycat": "copycat genetics",
  "copycat genetics": "copycat genetics",
  "thc": "total health connections",
  "cwf": "cwf"
};

function App() {
  const [selectedCase, setSelectedCase] = useState('');
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    async function fetchAll() {
      try {
        const all = await Promise.all(
          Object.entries(CASES).map(async ([label, url]) => {
            const res = await fetch(`/api/seedlist?url=${encodeURIComponent(url)}`);
            const text = await res.text();
            const lines = text.split('\n').filter(line => line.trim().length > 0);
            return lines.map(line => ({ text: line, case: label }));
          })
        );
        setAllData(all.flat());
      } catch (err) {
        setError({ error: true, message: err.message });
      }
    }
    fetchAll();
  }, []);

  useEffect(() => {
    if (!selectedCase) return;
    fetch(`/api/seedlist?url=${encodeURIComponent(CASES[selectedCase])}`)
      .then(res => res.text())
      .then(text => {
        const lines = text.split('\n').filter(line => line.trim().length > 0);
        const entries = lines.map(line => ({ text: line, case: selectedCase }));
        setData(entries);
        setError(null);
      })
      .catch(err => setError({ error: true, message: err.message }));
  }, [selectedCase]);

  const normalizedSearch = search.toLowerCase().trim();
  const alias = ALIASES[normalizedSearch] || normalizedSearch;
  const filtered = search
    ? allData.filter(entry => entry.text.toLowerCase().includes(alias))
    : selectedCase
    ? data
    : [];

  return (
    <div style={{ padding: '1rem', fontFamily: 'Arial' }}>
      <h1>Chronic Seed Vault</h1>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="caseSelect">Choose a Case: </label>
        <select
          id="caseSelect"
          value={selectedCase}
          onChange={e => setSelectedCase(e.target.value)}
        >
          <option value="">-- All Cases --</option>
          {Object.keys(CASES).map(caseName => (
            <option key={caseName} value={caseName}>{caseName}</option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Search by strain, breeder, alias..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: '100%', padding: '0.5rem' }}
        />
      </div>

      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}

      <ul style={{ whiteSpace: 'pre-wrap', paddingLeft: 0 }}>
        {filtered.map((entry, index) => (
          <li key={index} style={{ listStyleType: 'none', marginBottom: '0.5rem' }}>
            <strong>{entry.case}</strong>: {entry.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
