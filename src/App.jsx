import React, { useState, useEffect } from 'react';
import { fetchSeedData } from './components/seedUtils';
import { VaultSummary } from './components/VaultSummary';

const normalize = (val) => val?.toLowerCase().trim() || '';

const App = () => {
  const [seedData, setSeedData] = useState([]);
  const [summary, setSummary] = useState({ totalBreeders: 0, totalStrains: 0 });
  const [query, setQuery] = useState('');
  const [selectedCase, setSelectedCase] = useState('');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchSeedData();
      setSeedData(data);

      const breeders = new Set();
      const strains = new Set();

      data.forEach(({ raw }) => {
        const parts = raw.split(/\s*–\s*/);
        const breeder = normalize(parts[1] || '');
        const strain = normalize(parts[2] || '');
        if (breeder) breeders.add(breeder);
        if (strain) strains.add(strain);
      });

      setSummary({
        totalBreeders: breeders.size,
        totalStrains: strains.size,
      });

      setFiltered([]); // start empty
    };

    loadData();
  }, []);

  useEffect(() => {
    const rawQuery = normalize(query);

    const newFiltered = seedData.filter((entry) => {
      const caseName = entry.case;
      const raw = normalize(entry.raw);

      if (rawQuery) {
        return raw.includes(rawQuery);
      }

      if (selectedCase) {
        return caseName === selectedCase;
      }

      return false;
    });

    setFiltered(newFiltered);
  }, [query, seedData, selectedCase]);

  const caseNames = [...new Set(seedData.map((entry) => entry.case))];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Chronic Seed Vault</h1>
      <VaultSummary breeders={summary.totalBreeders} strains={summary.totalStrains} />

      <div className="mb-4 flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          placeholder="Search full line..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/2"
        />

        <select
          value={selectedCase}
          onChange={(e) => setSelectedCase(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/2"
        >
          <option value="">Select Case</option>
          {caseNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        {filtered.map((entry, idx) => (
          <div key={idx} className="border p-2 rounded shadow">
            <div className="text-sm font-bold text-gray-800 mb-1">Case: {entry.case}</div>
            <div className="font-mono">{entry.raw}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
