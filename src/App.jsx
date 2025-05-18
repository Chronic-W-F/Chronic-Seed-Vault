import React from 'react';
import './App.css';
import { dnaIcon, budIcon } from '../components/seedData';

// --- Alias Mapping ---
const breederAliases = {
  copy: 'CopyCat Genetics',
  copycat: 'CopyCat Genetics',
  'copycat genetics': 'CopyCat Genetics',
  thc: 'Total Health Connections',
  dwp: 'DadWeedProject',
  'dadweedproject': 'DadWeedProject',
  cwf: 'Chronic Worm Farmer',
};

// --- Normalize Breeder Name ---
const normalizeBreeder = (name) => {
  if (!name) return '';
  const key = name.trim().toLowerCase();
  return breederAliases[key] || name.trim();
};

// --- Deduplicate Logic ---
const getVaultSummary = () => {
  const allSeeds = seedData.flatMap((caseData) => caseData.entries || []);
  const breeders = new Set();
  const strainSet = new Set();

  for (const entry of allSeeds) {
    if (!entry || entry.breeder?.toLowerCase().includes('void')) continue;

    const breeder = normalizeBreeder(entry.breeder);
    const strain = entry.strain?.trim();

    if (breeder) breeders.add(breeder);
    if (strain) strainSet.add(`${strain.toLowerCase()}__${breeder.toLowerCase()}`);
  }

  return {
    totalBreeders: breeders.size,
    totalStrains: strainSet.size,
  };
};

// --- Vault Summary UI ---
const VaultSummary = ({ breeders, strains }) => (
  <div className="vault-summary p-4 bg-green-100 rounded-xl shadow-md mb-4 text-sm sm:text-base">
    <h2 className="text-lg sm:text-xl font-bold text-green-700 mb-2">Chronic Seed Vault Summary</h2>
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
  const { totalBreeders, totalStrains } = getVaultSummary();

  return (
    <div className="p-4">
      <VaultSummary breeders={totalBreeders} strains={totalStrains} />

      <div className="mt-8 p-4 bg-white shadow-md rounded-xl text-center">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">Seed Case Search Coming Soon...</h3>
        <p className="text-gray-600">
          You’ll be able to browse and search all your cases by strain, breeder, and slot number.
        </p>
      </div>
    </div>
  );
}
