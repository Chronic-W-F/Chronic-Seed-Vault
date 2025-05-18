import React, { useState, useEffect } from 'react';
import { fetchSeedData } from './components/seedUtils';
import { VaultSummary } from './components/VaultSummary';

const aliasMap = {
  copy: 'copycat genetics',
  copycat: 'copycat genetics',
  'copy cat': 'copycat genetics',
  thc: 'total health connections',
  'total health': 'total health connections',
  dwp: 'dadweedproject',
  dadweed: 'dadweedproject',
  'dadweed project': 'dadweedproject',
  cwf: 'chronic worm farmer',
  'chronic worm farmer': 'chronic worm farmer',
};

const normalize = (val) => {
  const key = val?.toLowerCase().trim();
  return aliasMap[key] || key || '';
};

const App = () => {
  const [seedData, setSeedData] = useState([]);
  const [summary, setSummary] = useState({ totalBreeders: 0, totalStrains: 0 });
  const [query, setQuery] = useState('');
  const [selectedCase, setSelectedCase] = useState('');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      console.log(">>> Loading seed data...");
      const data = await fetchSeedData();
      setSeedData(data);

      const breeders = new Set();
      const strains = new Set();

      data.forEach(({ breeder, strain }) => {
        if (breeder) breeders.add(normalize(breeder));
        if (strain) strains.add(normalize(strain));
      });

      setSummary({
        totalBreeders: breeders.size,
        totalStrains: strains.size,
      });

      setFiltered([]); // Start empty
    };

    loadData();
  }, []);

  useEffect(() => {
    const q = normalize(query);

    const newFiltered = seedData.filter((entry) => {
      const breeder = normalize(entry.breeder);
      const strain = normalize(entry.strain);
      const slot = normalize(entry.slot);
      const raw = normalize(entry.raw);
      const caseName = entry.case;

      if (q) {
        return (
          breeder.includes(q) ||
          strain.includes(q) ||
          slot.includes(q) ||
          raw.includes(q)
        );
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
          placeholder="Search anything..."
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
            <div className="font-semibold">{entry.strain}</div>
            <div className="text-sm text-gray-600">
              Breeder: {entry.breeder} | Type: {entry.type} | Sex: {entry.sex} | Slot: {entry.slot} | Case: {entry.case}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
