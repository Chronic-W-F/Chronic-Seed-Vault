import React, { useState, useEffect } from 'react';
import { seedData } from './seedData';

const SearchSection = () => {
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const q = query.toLowerCase();
    const matches = seedData.filter(entry =>
      entry.slot?.toString().includes(q) ||
      entry.breeder?.toLowerCase().includes(q) ||
      entry.strain?.toLowerCase().includes(q)
    );
    setFiltered(matches);
  }, [query]);

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-2">Global Seed Search</h3>
      <input
        type="text"
        className="w-full p-2 border rounded"
        placeholder="Search by breeder, strain, or slot..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul className="mt-4 space-y-2">
        {filtered.map((entry, index) => (
          <li key={index} className="border p-2 rounded bg-white">
            <strong>Slot {entry.slot}</strong> – {entry.breeder} – {entry.strain} ({entry.sex} {entry.type})
            <div className="text-xs text-gray-500">{entry.case}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchSection;
