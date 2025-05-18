import React from 'react';
import './App.css';
import { seedData, DNAIcon, BudIcon } from './components/seedData';
import SearchSection from './components/SearchSection';

// --- Vault Summary ---
const getVaultStats = (data) => {
  const breeders = new Set();
  const strainSet = new Set();

  data.forEach(entry => {
    const breeder = entry.breeder?.toLowerCase().trim();
    const strain = entry.strain?.toLowerCase().trim();
    if (breeder) breeders.add(breeder);
    if (strain) strainSet.add(strain);
  });

  return {
    totalBreeders: breeders.size,
    totalStrains: strainSet.size,
  };
};

// --- Vault Summary UI ---
const VaultSummary = ({ breeders, strains }) => (
  <div className="vault-summary p-4 bg-green-100 rounded shadow-md">
    <h2 className="text-lg sm:text-xl font-bold text-green-800 mb-2">
      Chronic Seed Vault Summary
    </h2>
    <div className="flex flex-col sm:flex-row sm:space-x-6">
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
);

// --- Main App ---
export default function App() {
  const { totalBreeders, totalStrains } = getVaultStats(seedData);

  return (
    <div className="p-4">
      <VaultSummary breeders={totalBreeders} strains={totalStrains} />
      <SearchSection />
    </div>
  );
}
