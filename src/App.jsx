import { useEffect, useState } from 'react';

const CASES = {
  'Total Health Connections': 'https://docs.google.com/document/d/1FSxo3B5Sw4oNX8eD6akMLmLQi_8gL7quxWvT4k8-dlk/export?format=txt',
  'Autoflower Case': 'https://docs.google.com/document/d/1RKRh2B2GWkopW5eKG2SYkM3dF7kfXnO6jsdeyox13Cc/export?format=txt',
  'Red/Black Case Photoperiods': 'https://docs.google.com/document/d/1J2jWK6EEERu834e2wR--hoABcgxrpppkpNk2r_H8V-0/export?format=txt',
  'Blue Case Photos': 'https://docs.google.com/document/d/1qoE2gM291GBNlX5pP9dtnNqqNF-aZzb4P-_w-DLUvZ8/export?format=txt',
  'Black Case Photoperiods': 'https://docs.google.com/document/d/1f2JwxGy_xlhVbYW11NCP06t6qXbai_lKHC_UCrWsNgM/export?format=txt',
  'Chronic Worm Farmer': 'https://docs.google.com/document/d/1UWskJERde9hip9FgKonDmP21GOHIcDJZS217VWGIeCc/export?format=txt',
};

function App() {
  const [allEntries, setAllEntries] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    async function fetchAllCases() {
      const results = [];
      for (const [label, url] of Object.entries(CASES)) {
        try {
          const res = await fetch(`/api/seedlist?url=${encodeURIComponent(url)}&nocache=${Date.now()}`);
          const text = await res.text();
          const lines = text.split('\n').filter(line => line.trim().length > 0);
          for (const line of lines) {
            results.push({ case: label, line });
          }
        } catch (err) {
          results.push({ case: label, line: `Error loading ${label}: ${err.message}` });
        }
      }
      setAllEntries(results);
    }

    fetchAllCases();
  }, []);

  const filtered = allEntries.filter(entry =>
    entry.line.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ padding: '1rem', maxWidth: '700px', margin: 'auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1rem' }}>
        Chronic Seed Vault
      </h1>

      <input
        type="text"
        placeholder="Search all seed cases by strain, breeder, slot, etc..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{ marginBottom: '1.5rem', width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
      />

      <div>
        {filtered.map((entry, i) => (
          <div key={i} style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '1rem', backgroundColor: '#fff' }}>
            <strong style={{ fontSize: '0.9rem', color: '#555' }}>{entry.case}</strong>
            <div>{entry.line}</div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p style={{ textAlign: 'center', color: '#888' }}>No matches found.</p>
        )}
      </div>
    </div>
  );
}

export default App;
