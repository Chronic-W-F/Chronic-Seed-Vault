import React, { useState, useEffect } from 'react';
import { fetchSeedData } from './components/seedUtils';
import { VaultSummary } from './components/VaultSummary';

const normalize = (val) => val?.toLowerCase().trim() || '';

const App = () => {
  const [seedData, setSeedData] = useState([]);
  const [summary, setSummary] = useState({ totalBreeders: 0, totalStrains: 0 });
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [selectedCase, setSelectedCase] = useState('All');

  useEffect(() => {
    const loadData = async () => {
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

      setFiltered(data);
    };

    loadData();
  }, []);

  useEffect(() => {
    const q = normalize(query);
    const filteredByCase =
      selectedCase === 'All'
        ? seedData
        : seedData.filter((entry) => entry.case === selectedCase);

    const finalFiltered = !q
      ? filteredByCase
      : filteredByCase.filter(({ raw, alias, case: docCase }) => {
          return (
            normalize(raw).includes(q) ||
            normalize(alias).includes(q) ||
            normalize(docCase).includes(q)
          );
        });

    setFiltered(finalFiltered);
  }, [query, seedData, selectedCase]);

  const caseOptions = ['All', ...Array.from(new Set(seedData.map((entry) => entry.case)))];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Chronic Seed Vault</h1>
      <VaultSummary breeders={summary.totalBreeders} strains={summary.totalStrains} />

      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search any keyword, breeder, or alias..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/2 mb-2 sm:mb-0"
        />
        <select
          value={selectedCase}
          onChange={(e) => setSelectedCase(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/3"
        >
          {caseOptions.map((caseName, idx) => (
            <option key={idx} value={caseName}>
              {caseName}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full text-sm border">
          <thead>
            <tr className="bg-green-200 text-left">
              <th className="px-2 py-1 border">Line</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((entry, index) => (
              <tr key={index} className="border-t">
                <td className="px-2 py-1 border whitespace-pre">
                  <strong>{entry.case}:</strong> {entry.raw}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
