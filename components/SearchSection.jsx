import React, { useState, useEffect } from 'react';

const SearchSection = ({ selectedCase, seedData }) => {
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const q = query.toLowerCase();
    const matches = seedData.filter(entry => {
      const matchesCase =
        selectedCase === 'all' ||
        entry.case === selectedCase ||
        (selectedCase === 'THC' && entry.breeder?.toLowerCase() === 'thc') ||
        (selectedCase === 'CWF' && entry.breeder?.toLowerCase() === 'cwf');

      return (
        matchesCase &&
        (
          entry.slot?.toString().includes(q) ||
          entry.breeder?.toLowerCase().includes(q) ||
          entry.strain?.toLowerCase().includes(q)
        )
      );
    });
    setFiltered(matches);
  }, [query, selectedCase, seedData]);

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-2">Global Seed Search</h3>
      <input
        type="text"
        placeholder="Search by breeder, strain, or slot..."
        className="p-2 border rounded w-full mb-4"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {filtered.map((entry, index) => (
        <div key={index} className="border p-2 mb-2 rounded bg-white shadow-sm">
          <strong>Slot {entry.slot}</strong> – {entry.breeder} – {entry.strain} ({entry.sex} {entry.type})
        </div>
      ))}
    </div>
  );
};

export default SearchSection;
