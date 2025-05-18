import React, { useState, useEffect } from 'react';
import './App.css';
import { fetchSeedData, DNAIcon, BudIcon } from './components/seedData';
import SearchSection from './components/SearchSection';

const getVaultSummary = (data) => {
  const breeders = new Set();
  const strainSet = new Set();

  data.forEach(({ breeder, strain }) => {
    if (breeder) breeders.add(breeder.toLowerCase());
    if (strain) strainSet.add(strain.toLowerCase());
  });

  return {
    totalBreeders: breeders.size,
    totalStrains: strainSet.size,
  };
};

const VaultSummary = ({ breeders, strains }) => (
  <div className="vault-summary p-4 bg-green-100 rounded-xl shadow-md mb-6">
    <h2 className="text-lg sm:text-xl font-bold text-green-900 mb-2">
      Chronic Seed Vault Summary
    </h2>
    <div className="flex flex-col sm:flex-row sm:space-x-4">
      <div className="flex items-center mb-2 sm:mb-0">
        <DNAIcon />
        <span className="font-medium">{breeders} Unique Breeders</span>
      </div>
      <div className="flex items-center">
        <BudIcon />
        <span className="font-medium">{strains} Unique Strains</span>
      </div>
    </div>
  </div>
);

function App() {
  const [seedData, setSeedData] = useState([]);
  const [summary, setSummary] = useState({ totalBreeders: 0, totalStrains: 0 });

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchSeedData();
      setSeedData(data);
      setSummary(getVaultSummary(data));
    };

    loadData();
  }, []);

  return (
    <div className="App container mx-auto px-4 py-6">
      <header className="mb-6 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-green-800">
          Chronic Seed Vault
        </h1>
        <p className="text-sm text-gray-600">Search across all your seed cases</p>
      </header>

      <VaultSummary
        breeders={summary.totalBreeders}
        strains={summary.totalStrains}
      />

      {summary.totalBreeders === 0 && (
        <div className="text-red-600 text-sm mb-4">
          No seed data loaded. Check Google Doc links or formatting.
        </div>
      )}

      <SearchSection seedData={seedData} />
    </div>
  );
}

export default App;
