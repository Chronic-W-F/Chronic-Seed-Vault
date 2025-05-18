import React, { useEffect, useState } from 'react'; import ReactDOM from 'react-dom/client';

const DOC_LINKS = { 'Total Health Connections': 'https://docs.google.com/document/d/1RKRh2B2GWkopW5eKG2SYkM3dF7kfXnO6jsdeyox13Cc/export?format=txt', 'Autoflower Case': 'https://docs.google.com/document/d/1J2jWK6EEERu834e2wR--hoABcgxrpppkpNk2r_H8V-0/export?format=txt', 'Red/Black Case Photoperiods': 'https://docs.google.com/document/d/1qoE2gM291GBNlX5pP9dtnNqqNF-aZzb4P-_w-DLUvZ8/export?format=txt', 'Blue Case Photos': 'https://docs.google.com/document/d/1f2JwxGy_xlhVbYW11NCP06t6qXbai_lKHC_UCrWsNgM/export?format=txt', 'Black Case Photoperiods': 'https://docs.google.com/document/d/1UWskJERde9hip9FgKonDmP21GOHIcDJZS217VWGIeCc/export?format=txt', 'Chronic Worm Farmer': 'https://docs.google.com/document/d/1f3vLkthX5FIV9v6o4EjXYRzUkeue8Jkn/export?format=txt', };

const ALIASES = { thc: 'Total Health Connections', copy: 'CopyCat Genetics', copycat: 'CopyCat Genetics', cwf: 'Chronic Worm Farmer', };

function App() { const [entries, setEntries] = useState([]); const [filtered, setFiltered] = useState([]); const [search, setSearch] = useState(''); const [selectedCase, setSelectedCase] = useState('');

useEffect(() => { if (!selectedCase) return setEntries([]); fetch(/api/seedlist?nocache=${Date.now()}&url=${encodeURIComponent(DOC_LINKS[selectedCase])}) .then(res => res.text()) .then(text => { const parsed = text.split('\n').filter(line => line.trim()).map(line => { return { text: line.trim(), case: selectedCase }; }); setEntries(parsed); }) .catch(err => setEntries([{ text: JSON.stringify({ error: true, message: err.message }), case: selectedCase }])); }, [selectedCase]);

useEffect(() => { const term = search.toLowerCase(); const realTerm = ALIASES[term] || term; const result = entries.filter(e => e.text.toLowerCase().includes(realTerm) ); setFiltered(result); }, [search, entries]);

const visible = search ? filtered : entries;

return ( <div style={{ padding: 20, fontFamily: 'sans-serif' }}> <h1>Chronic Seed Vault</h1> <select value={selectedCase} onChange={e => setSelectedCase(e.target.value)}> <option value=''>Select a seed case...</option> {Object.keys(DOC_LINKS).map(key => ( <option key={key} value={key}>{key}</option> ))} </select> <input type="text" placeholder="Search by strain, breeder, slot, etc..." value={search} onChange={e => setSearch(e.target.value)} style={{ display: 'block', marginTop: 10, padding: 8, width: '100%' }} /> {visible.map((entry, i) => ( <div key={i} style={{ border: '1px solid #ccc', padding: 10, marginTop: 10 }}> <strong>{entry.case}</strong> <div>{entry.text}</div> </div> ))} </div> ); }

export default App;

// /api/seedlist.js // This is your serverless function that fetches raw Google Doc content based on ?url= param // Place this in your Vercel API folder if using their hosting system

