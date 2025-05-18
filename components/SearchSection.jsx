import React, { useState, useEffect } from 'react';
import { fetchSeedData } from './seedData';

const normalizeAlias = (text) => {
  const lower = text.toLowerCase();
  if (lower === 'copy' || lower === 'copycat') return 'copycat genetics';
  if (lower === 'thc') return 'total health connections';
  if (lower === 'dwp' || lower === 'dadweedproject') return 'dadweed project';
  return lower;
};

const SearchSection = ({ seedData = [], selectedCase = 'all' }) => {
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const q = normalizeAlias(query);
    const matches = seedData.filter((entry) => {
      const matchesCase = selectedCase === 'all' || entry.case === selectedCase;
      return (
        matchesCase &&
        (entry.slot?.toString().includes(q) ||
          normalizeAlias(entry.breeder ?? '').includes(q) ||
          (entry.strain ?? '').toLowerCase().includes(q))
      );
    });
    setFiltered(matches);
  }, [query, selectedCase, seedData]);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Global Seed Search</h2>
      <input
        type="text"
        placeholder="Search by breeder, strain, or slot..."
        className="p-2 border rounded w-full mb-4"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {filtered.map((entry, idx) => (
        <div key={idx} className="p-2 mb-2 border rounded bg-white shadow-sm">
          <strong>Slot {entry.slot ?? '–'}</strong> – {entry.breeder ?? '–'} – {entry.strain ?? '–'}<br />
          <span className="text-sm text-gray-600">
            {entry.sex ?? ''} {entry.type ?? ''} | {entry.case ?? ''}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SearchSection;
