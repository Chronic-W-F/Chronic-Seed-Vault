import React, { useEffect, useState } from 'react';

const CASES = { 'Total Health Connections': 'https://docs.google.com/document/d/1UWskJERde9hip9FgKonDmP21GOHIcDJZS217VWGIeCc/export?format=txt', 'Autoflower Case': 'https://docs.google.com/document/d/1RKRh2B2GWkopW5eKG2SYkM3dF7kfXnO6jsdeyox13Cc/export?format=txt', 'Red/Black Case Photoperiods': 'https://docs.google.com/document/d/1J2jWK6EEERu834e2wR--hoABcgxrpppkpNk2r_H8V-0/export?format=txt', 'Black Case Photoperiods': 'https://docs.google.com/document/d/1qoE2gM291GBNlX5pP9dtnNqqNF-aZzb4P-_w-DLUvZ8/export?format=txt', 'Blue Case Photos': 'https://docs.google.com/document/d/1f2JwxGy_xlhVbYW11NCP06t6qXbai_lKHC_UCrWsNgM/export?format=txt', 'Chronic Worm Farmer': 'https://docs.google.com/document/d/1f2JwxGy_xlhVbYW11NCP06t6qXbai_lKHC_UCrWsNgM/export?format=txt', };

const ALIASES = { copy: 'copycat genetics', copycat: 'copycat genetics', thc: 'total health connections', cwf: 'chronic worm farmer', };

function App() { const [selectedCase, setSelectedCase] = useState(''); const [data, setData] = useState([]); const [search, setSearch] = useState(''); const [error, setError] = useState(null);

useEffect(() => { if (!selectedCase) return; fetch(/api/seedlist?url=${encodeURIComponent(CASES[selectedCase])}) .then(res => res.text()) .then(text => { const lines = text.split('\n').filter(line => line.trim().length > 0); const entries = lines.map(line => ({ text: line, case: selectedCase })); setData(entries); setError(null); }) .catch(err => setError({ error: true, message: err.message })); }, [selectedCase]);

const filtered = search ? data.filter(entry => { const lower = entry.text.toLowerCase(); const alias = ALIASES[search.toLowerCase()] || search.toLowerCase(); return lower.includes(alias); }) : data;

return ( <div style={{ padding: 20, fontFamily: 'sans-serif' }}> <h1>Chronic Seed Vault</h1> <select value={selectedCase} onChange={e => setSelectedCase(e.target.value)} style={{ padding: 10, fontSize: 16, width: '100%', marginBottom: 10 }}> <option value=''>Select a seed case...</option> {Object.keys(CASES).map(key => ( <option key={key} value={key}>{key}</option> ))} </select> <input type='text' placeholder='Search by strain, breeder, slot, etc...' value={search} onChange={e => setSearch(e.target.value)} style={{ padding: 10, fontSize: 16, width: '100%' }} /> {error && <pre>{JSON.stringify(error)}</pre>} {!search && !selectedCase && <p style={{ marginTop: 10, color: '#777' }}>No matches found.</p>} {filtered.map((entry, i) => ( <div key={i} style={{ padding: 10, border: '1px solid #ccc', marginTop: 10, borderRadius: 5 }}> <strong>{entry.case}</strong> <div>{entry.text}</div> </div> ))} </div> ); }

export default App;

