import React, { useState, useEffect } from 'react';
import { fetchSeedData } from './seedUtils';

const aliasMap = {
  copy: 'copycat genetics',
  copycat: 'copycat genetics',
  thc: 'total health connections',
  dwp: 'dadweedproject',
  cwf: 'chronic worm farmer',
};

const normalize = (val) =>
  aliasMap[val?.toLowerCase()] || val?.toLowerCase();

const SearchSection = ({ selectedCase = 'all', seedData }) => {
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [allSeeds, setAllSeeds] = useState([]);

  useEffect(() => {
    if (seedData?.length) {
      setAllSeeds(seedData);
    } else {
      fetchSeedData().then(setAllSeeds);
    }
  }, [seedData]);

  useEffect(() => {
    const q = normalize(query);
    const matches = allSeeds.filter(entry => {
      const matchesCase = selectedCase === 'all' || entry.case === selectedCase;
      return (
        matchesCase &&
        (
          entry.slot?.toString().includes(q) ||
          normalize(entry.breeder).includes(q) ||
          normalize(entry.strain).includes(q)
        )
      );
    });
    setFiltered(matches);
  }, [query, selectedCase, allSeeds]);

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
          <strong>Slot {entry.slot ?? '–'}</strong> – {entry.breeder ?? '–'} – {entry.strain ?? '–'} ({entry.sex ?? ''} {entry.type ?? ''})<br />
          <small className="text-xs text-gray-500">| {entry.case}</small>
        </div>
      ))}
    </div>
  );
};

export default SearchSection;
