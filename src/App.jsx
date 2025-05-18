import React, { useEffect, useState } from 'react';

const DOC_LINKS = {
  'Total Health Connections': 'https://docs.google.com/document/d/1UWskJERde9hip9FgKonDmP21GOHIcDJZS217VWGIeCc/export?format=txt',
  'Autoflower Case': 'https://docs.google.com/document/d/1RKRh2B2GWkopW5eKG2SYkM3dF7kfXnO6jsdeyox13Cc/export?format=txt',
  'Red/Black Case Photoperiods': 'https://docs.google.com/document/d/1J2jWK6EEERu834e2wR--hoABcgxrpppkpNk2r_H8V-0/export?format=txt',
  'Blue Case Photos': 'https://docs.google.com/document/d/1qoE2gM291GBNlX5pP9dtnNqqNF-aZzb4P-_w-DLUvZ8/export?format=txt',
  'Black Case Photoperiods': 'https://docs.google.com/document/d/1f2JwxGy_xlhVbYW11NCP06t6qXbai_lKHC_UCrWsNgM/export?format=txt',
  'Chronic Worm Farmer': 'https://docs.google.com/document/d/1J2jWK6EEERu834e2wR--hoABcgxrpppkpNk2r_H8V-0/export?format=txt',
};

const ALIASES = {
  copy: 'copycat genetics',
  copycat: 'copycat genetics',
  thc: 'total health connections',
  cwf: 'chronic worm farmer',
};

export default function App() {
  const [data, setData] = useState({});
  const [caseName, setCaseName] = useState('');
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const allData = {};
      await Promise.all(
        Object.entries(DOC_LINKS).map(async ([name, url]) => {
          try {
            const res = await fetch(`${url}?nocache=${Date.now()}`);
            const text = await res.text();
            allData[name] = text
              .split('\n')
              .filter((line) => line.trim().length > 0);
          } catch {
            allData[name] = [`[ERROR] Failed to fetch: ${name}`];
          }
        })
      );
      setData(allData);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const query = search.toLowerCase();
    const alias = ALIASES[query] || query;

    if (alias) {
      const found = [];
      Object.entries(data).forEach(([doc, lines]) => {
        lines.forEach((line) => {
          if (line.toLowerCase().includes(alias)) {
            found.push(`${doc} — ${line}`);
          }
        });
      });
      setResults(found);
    } else if (caseName && data[caseName]) {
      setResults(data[caseName]);
    } else {
      setResults([]);
    }
  }, [search, caseName, data]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1 style={{ fontWeight: 'bold', fontSize: '2rem' }}>Chronic Seed Vault</h1>

      <select
        value={caseName}
        onChange={(e) => {
          setCaseName(e.target.value);
          setSearch('');
        }}
        style={{ padding: '0.5rem', fontSize: '1rem', marginBottom: '1rem' }}
      >
        <option value="">Select a seed case...</option>
        {Object.keys(DOC_LINKS).map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Search by strain, breeder, slot, etc..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: '0.5rem',
          fontSize: '1rem',
          width: '100%',
          marginBottom: '1rem',
        }}
      />

      {results.length > 0 ? (
        results.map((line, i) => (
          <div
            key={i}
            style={{
              backgroundColor: '#f4f4f4',
              padding: '1rem',
              marginBottom: '0.5rem',
              borderRadius: '8px',
              fontSize: '0.95rem',
            }}
          >
            {line}
          </div>
        ))
      ) : search ? (
        <p style={{ fontStyle: 'italic' }}>No matches found.</p>
      ) : null}
    </div>
  );
}
