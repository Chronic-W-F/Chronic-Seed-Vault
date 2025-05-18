import React, { useState, useEffect } from 'react'; import './App.css';

const aliasMap = { copy: 'copycat genetics', copycat: 'copycat genetics', thc: 'total health connections', "total health connections": 'total health connections', cwf: 'chronic worm farmer', "chronic worm farmer": 'chronic worm farmer', };

function App() { const [entries, setEntries] = useState([]); const [searchQuery, setSearchQuery] = useState(''); const [selectedCase, setSelectedCase] = useState(''); const [allEntries, setAllEntries] = useState([]);

const docs = { 'Autoflower Case': 'https://docs.google.com/document/d/1RKRh2B2GWkopW5eKG2SYkM3dF7kfXnO6jsdeyox13Cc/export?format=txt', 'Red/Black Case Photoperiods': 'https://docs.google.com/document/d/1J2jWK6EEERu834e2wR--hoABcgxrpppkpNk2r_H8V-0/export?format=txt', 'Black Case Photoperiods': 'https://docs.google.com/document/d/1qoE2gM291GBNlX5pP9dtnNqqNF-aZzb4P-_w-DLUvZ8/export?format=txt', 'Blue Case Photos': 'https://docs.google.com/document/d/1f2JwxGy_xlhVbYW11NCP06t6qXbai_lKHC_UCrWsNgM/export?format=txt', 'Total Health Connections': 'https://docs.google.com/document/d/1UWskJERde9hip9FgKonDmP21GOHIcDJZS217VWGIeCc/export?format=txt', 'Chronic Worm Farmer': 'https://docs.google.com/document/d/1FSxo3B5Sw4oNX8eD6akMLmLQi_8gL7quxWvT4k8-dlk/export?format=txt', };

useEffect(() => { const fetchData = async () => { const all = []; await Promise.all( Object.entries(docs).map(async ([caseName, url]) => { try { const res = await fetch(/api/seedlist?nocache=${Date.now()}&url=${encodeURIComponent(url)}); const text = await res.text(); const lines = text.split('\n').filter(line => line.trim().length > 0); lines.forEach(line => all.push({ case: caseName, line })); } catch (err) { all.push({ case: caseName, line: {"error":true,"message":"Failed to fetch document"} }); } }) ); setAllEntries(all); }; fetchData(); }, []);

const normalizedQuery = searchQuery.trim().toLowerCase(); const aliasTerm = aliasMap[normalizedQuery] || normalizedQuery;

const filtered = allEntries.filter(entry => { const caseMatch = entry.case.toLowerCase(); const lineMatch = entry.line.toLowerCase(); if (normalizedQuery !== '') { return lineMatch.includes(aliasTerm) || caseMatch.includes(aliasTerm); } else if (selectedCase !== '') { return entry.case === selectedCase; } else { return false; } });

return ( <div className="app"> <h1>Chronic Seed Vault</h1> <select value={selectedCase} onChange={e => setSelectedCase(e.target.value)} className="dropdown" > <option value="">Select a seed case...</option> {Object.keys(docs).map(c => ( <option key={c} value={c}>{c}</option> ))} </select> <input type="text" placeholder="Search by strain, breeder, slot, etc..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="search-box" /> {filtered.map((entry, index) => ( <div key={index} className="entry"> <strong>{entry.case}</strong> <div>{entry.line}</div> </div> ))} {filtered.length === 0 && (searchQuery.trim() !== '' || selectedCase !== '') && ( <div className="entry">No matches found.</div> )} </div> ); }

export default App;

