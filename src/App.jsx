import { useState, useEffect } from 'react';

function App() {
  const [entries, setEntries] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/seedlist?nocache=${Date.now()}`);
        const text = await res.text();
        const lines = text.split("\n").filter(line => line.trim().length > 0);
        setEntries(lines);
      } catch (err) {
        setEntries([`{"error":true,"message":"${err.message}"}`]);
      }
    }
    fetchData();
  }, []);

  const filtered = entries.filter(line =>
    line.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ padding: '1rem', maxWidth: '600px', margin: 'auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center' }}>Chronic Seed Vault</h1>
      <input
        type="text"
        placeholder="Search by strain, breeder, slot, etc..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{ marginBottom: '1.5rem', width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
      />
      <div>
        {filtered.map((line, i) => (
          <div key={i} style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '1rem', backgroundColor: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            {line}
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
