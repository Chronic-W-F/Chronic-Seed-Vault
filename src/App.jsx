import React, { useState, useEffect } from 'react';
import { fetchSeedData } from './components/seedUtils';
import { VaultSummary } from './components/VaultSummary';
const aliasMap = {
  copy: 'copycat genetics',
  copycat: 'copycat genetics',
  thc: 'total health connections',
  dwp: 'dadweedproject',
  cwf: 'chronic worm farmer',
};

const normalize = (val) =>
  (val && aliasMap[val.toLowerCase()]) || val?.toLowerCase() || '';

const App = () => {
  const [seedData, setSeedData] = useState([]);
  const [summary, setSummary] = useState({ totalBreeders: 0, totalStrains: 0 });
  const [selectedCase, setSelectedCase] = useState('all');
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchSeedData();
      setSeedData(data);

      const breeders = new Set();
      const strains = new Set();

      data.forEach(({ breeder, strain }) => {
        if (breeder) breeders.add(breeder.toLowerCase());
        if (strain) strains.add(strain.toLowerCase());
      });

      setSummary({
        totalBreeders: breeders.size,
        totalStrains: strains.size,
      });
    };

    loadData();
  }, []);

  useEffect(() => {
    const q = normalize(query);
    if (!q) {
      setFiltered(seedData);
    } else {
      const results = seedData.filter(({ breeder, strain }) => {
        const b = normalize(breeder);
        const s = normalize(strain);
        return b.includes(q) || s.includes(q);
      });
      setFiltered(results);
    }
  }, [query, seedData]);

  return (
    <div className="app-container p-4">
      <h1 className="text-2xl font-bold mb-4">Chronic Seed Vault</h1>
      <VaultSummary breeders={summary.totalBreeders} strains={summary.totalStrains} />
      
      <input
        type="text"
        placeholder="Search breeders or strains..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 rounded w-full mt-4"
      />

      <div className="mt-4">
        {filtered.map((entry, i) => (
          <div key={i} className="border p-2 rounded mb-2 bg-white shadow">
            <strong>Case:</strong> {entry.case} <br />
            <strong>Slot:</strong> {entry.slot} <br />
            <strong>Breeder:</strong> {entry.breeder} <br />
            <strong>Strain:</strong> {entry.strain} <br />
            <strong>Sex:</strong> {entry.sex} <br />
            <strong>Type:</strong> {entry.type}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
