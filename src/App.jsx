import React, { useState, useEffect } from 'react';

const CASES = { "Total Health Connections": "https://docs.google.com/document/d/1FSxo3B5Sw4oNX8eD6akMLmLQi_8gL7quxWvT4k8-dlk/export?format=txt", "Autoflower Case": "https://docs.google.com/document/d/1RKRh2B2GWkopW5eKG2SYkM3dF7kfXnO6jsdeyox13Cc/export?format=txt", "Red/Black Case Photoperiods": "https://docs.google.com/document/d/1J2jWK6EEERu834e2wR--hoABcgxrpppkpNk2r_H8V-0/export?format=txt", "Blue Case Photos": "https://docs.google.com/document/d/1qoE2gM291GBNlX5pP9dtnNqqNF-aZzb4P-_w-DLUvZ8/export?format=txt", "Black Case Photoperiods": "https://docs.google.com/document/d/1f2JwxGy_xlhVbYW11NCP06t6qXbai_lKHC_UCrWsNgM/export?format=txt", "Chronic Worm Farmer Case": "https://docs.google.com/document/d/1UWskJERde9hip9FgKonDmP21GOHIcDJZS217VWGIeCc/export?format=txt" };

const ALIASES = { copy: 'copycat genetics', copycat: 'copycat genetics', thc: 'total health connections', cwf: 'chronic worm farmer', };

function App() { const [selectedCase, setSelectedCase] = useState(''); const [data, setData] = useState([]); const [search, setSearch] = useState('');

useEffect(() => { async function fetchAll() { const all = []; for (const [label, url] of Object.entries(CASES)) { try { const res = await fetch(/api/seedlist?url=${encodeURIComponent(url)}&nocache=${Date.now()}); const text = await res.text(); const lines = text.split('\n').filter(line => line.trim().length > 0); lines.forEach(line => all.push({ text: line, case: label })); } catch (err) { all.push({ text: Error loading ${label}: ${err.message}, case: label }); } } setData(all); } fetchAll(); }, []);

const normalizedSearch = search.trim().toLowerCase(); const aliasTerm = ALIASES[normalizedSearch] || normalizedSearch;

const filtered = search ? data.filter(entry => entry.text.toLowerCase().includes(aliasTerm) || entry.case.toLowerCase().includes(aliasTerm) ) : selectedCase ? data.filter(entry => entry.case === selectedCase) : [];

return ( <div style={{ padding: '1rem', fontFamily: 'sans-serif' }}> <h1>Chronic Seed Vault</h1>

<select
    value={selectedCase}
    onChange={e => {
      setSelectedCase(e.target.value);
      setSearch('');
    }}
    style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
  >
    <option value=''>Select a seed case...</option>
    {Object.keys(CASES).map(c => (
      <option key={c} value={c}>{c}</option>
    ))}
  </select>

  <input
    type='text'
    placeholder='Search all cases...'
    value={search}
    onChange={e => setSearch(e.target.value)}
    style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
  />

  {filtered.map((entry, i) => (
    <div key={i} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '5px', marginBottom: '0.5rem' }}>
      <strong>{entry.case}</strong>
      <div>{entry.text}</div>
    </div>
  ))}

  {filtered.length === 0 && (search || selectedCase) && (
    <p style={{ textAlign: 'center', color: '#777' }}>No matches found.</p>
  )}
</div>

); }

export default App;

