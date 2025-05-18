// src/components/SearchSection.jsx

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
  aliasMap[val?.toLowerCase()] || val?.toLowerCase() || "";

const SearchSection = ({ selectedCase = 'all' }) => {
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [allSeeds, setAllSeeds] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await fetchSeedData();
      setAllSeeds(data);
      setFiltered(data);
    };
    load();
  }, []);

  useEffect(() => {
    const term = normalize(query);
    const results = allSeeds.filter(
      (entry) =>
        entry.slot?.toString().includes(term) ||
        normalize(entry.breeder).includes(term) ||
        normalize(entry.alias).includes(term) ||
        entry.strain?.toLowerCase().includes(term)
    );
    setFiltered(results);
  }, [query, allSeeds]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search by breeder, strain, or slot..."
        className="w-full p-2 border rounded mb-4"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {filtered.map((entry, idx) => (
        <div key={idx} className="p-3 mb-2 bg-white shadow rounded">
          <strong>Slot {entry.slot} – {entry.strain || '–'} ({entry.sex || '–'} / {entry.type || '–'})</strong>
          <div className="text-sm text-gray-700">| {entry.breeder} – {entry.case}</div>
        </div>
      ))}
    </div>
  );
};

export default SearchSection;
