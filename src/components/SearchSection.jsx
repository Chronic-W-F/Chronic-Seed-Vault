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
  (val && aliasMap[val.toLowerCase()]) || val?.toLowerCase() || "";

const SearchSection = ({ selectedCase = 'all' }) => {
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [allSeeds, setAllSeeds] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchSeedData();
        const valid = data.filter(
          (entry) => entry && entry.breeder && entry.slot !== undefined
        );
        setAllSeeds(valid);
        setFiltered(valid);
      } catch (err) {
        console.error('Seed data fetch failed:', err);
      }
    };
    load();
  }, []);

  useEffect(() => {
    const term = normalize(query);
    const results = allSeeds.filter((entry) => {
      const breeder = normalize(entry.breeder);
      const alias = normalize(entry.alias);
      const strain = entry.strain?.toLowerCase() || '';
      const slotStr = entry.slot?.toString() || '';

      return (
        slotStr.includes(term) ||
        breeder.includes(term) ||
        alias.includes(term) ||
        strain.includes(term)
      );
    });

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
          <strong>
            Slot {entry.slot ?? '–'} – {entry.strain || '–'} ({entry.sex || '–'} / {entry.type || '–'})
          </strong>
          <div className="text-sm text-gray-700">
            | {entry.breeder || 'Unknown'} – {entry.case || 'Unknown Case'}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchSection;
