import React, { useState } from 'react'; import './App.css'; import { fetchSeedData, DNAIcon, BudIcon } from '../components/seedData.jsx';
import SearchSection from '../components/SearchSection.jsx';
const getVaultSummary = (data) => { const breeders = new Set(); const strainSet = new Set();

data.forEach(({ breeder, strain }) => { if (breeder) breeders.add(breeder); if (strain) strainSet.add(strain.toLowerCase()); });

return { totalBreeders: breeders.size, totalStrains: strainSet.size, }; };

const VaultSummary = ({ breeders, strains }) => (

  <div className="vault-summary p-4 bg-green-100 rounded-xl shadow-md">
    <h2 className="text-lg sm:text-xl font-bold text-green-900 mb-2">
      Chronic Seed Vault Summary
    </h2>
    <div className="flex flex-col sm:flex-row sm:space-x-4">
      <div className="flex items-center">
        <DNAIcon />
        <span className="font-medium">{breeders} Unique Breeders</span>
      </div>
      <div className="flex items-center mt-2 sm:mt-0">
        <BudIcon />
        <span className="font-medium">{strains} Unique Strains</span>
      </div>
    </div>
    <p className="text-xs text-gray-600 mt-2">Synced with your latest uploads</p>
  </div>
);export default function App() { const [selectedCase, setSelectedCase] = useState('all'); const { totalBreeders, totalStrains } = getVaultSummary(seedData);

return ( <div className="p-4"> <VaultSummary breeders={totalBreeders} strains={totalStrains} />

<div className="mb-4 mt-4">
    <label htmlFor="caseSelect" className="block text-sm font-medium mb-1">
      Filter by Case:
    </label>
    <select
      id="caseSelect"
      className="p-2 border rounded w-full"
      value={selectedCase}
      onChange={(e) => setSelectedCase(e.target.value)}
    >
      <option value="all">All Cases</option>
      <option value="Autoflower">Autoflower</option>
      <option value="THC">THC</option>
      <option value="Black Case">Black Case</option>
      <option value="Red/Black Case">Red/Black Case</option>
      <option value="CWF">Chronic Worm Farmer</option>
    </select>
  </div>

  <SearchSection selectedCase={selectedCase} />
</div>

); }

