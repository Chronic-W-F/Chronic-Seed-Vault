import React, { useState, useEffect } from 'react'; import { fetchSeedData } from './seedData';

const SearchSection = ({ selectedCase }) => { const [query, setQuery] = useState(''); const [filtered, setFiltered] = useState([]); const [allSeeds, setAllSeeds] = useState([]);

useEffect(() => { fetchSeedData().then(setAllSeeds); }, []);

useEffect(() => { const q = query.toLowerCase(); const matches = allSeeds.filter(entry => { const matchesCase = selectedCase === 'all' || entry.case === selectedCase; return ( matchesCase && ( entry.slot?.toString().includes(q) || entry.breeder?.toLowerCase().includes(q) || entry.strain?.toLowerCase().includes(q) ) ); }); setFiltered(matches); }, [query, selectedCase, allSeeds]);

return ( <div> <h2 className="text-lg font-semibold mb-2">Global Seed Search</h2> <input type="text" placeholder="Search by breeder, strain, or slot..." className="p-2 border rounded w-full mb-4" value={query} onChange={(e) => setQuery(e.target.value)} />

{filtered.map((entry, idx) => (
    <div key={idx} className="p-2 mb-2 border rounded bg-white shadow-sm">
      <strong>Slot {entry.slot ?? '–'}</strong> – {entry.breeder ?? '–'} – {entry.strain ?? '–'} ({entry.sex ?? ''} {entry.type ?? ''})
    </div>
  ))}
</div>

); };

export default SearchSection;

