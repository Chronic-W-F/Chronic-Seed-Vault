import React from 'react';
import './App.css';

// --- Emoji Icons ---
const DNAIcon = () => (
  <span style={{ marginRight: '0.5em', verticalAlign: 'middle' }}>🧬</span>
);

const BudIcon = () => (
  <span style={{ marginRight: '0.5em', verticalAlign: 'middle' }}>🌿</span>
);

// --- Vault Summary ---
const VaultSummary = ({ uniqueBreeders, uniqueStrains }) => (
  <div className="vault-summary p-4 bg-green-100 rounded-xl shadow-md mb-4 text-sm sm:text-base">
    <h2 className="text-lg sm:text-xl font-bold text-green-700 mb-2">Chronic Seed Vault Summary</h2>
    <div className="flex flex-col sm:flex-row sm:space-x-6">
      <div className="flex items-center">
        <DNAIcon />
        <span className="font-medium">{uniqueBreeders} Unique Breeders</span>
      </div>
      <div className="flex items-center mt-2 sm:mt-0">
        <BudIcon />
        <span className="font-medium">{uniqueStrains} Unique Strains</span>
      </div>
    </div>
    <p className="text-xs text-gray-600 mt-2">Synced with your latest uploads</p>
  </div>
);

// --- Main App ---
function App() {
  const uniqueBreeders = 87; // temp static number
  const uniqueStrains = 242; // temp static number

  return (
    <div className="p-4">
      <VaultSummary uniqueBreeders={uniqueBreeders} uniqueStrains={uniqueStrains} />

      {/* Coming soon preview for actual app */}
      <div className="mt-8 p-4 bg-white shadow-md rounded-xl text-center">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">Seed Case Search Coming Soon...</h3>
        <p className="text-gray-600">You’ll be able to browse and search all your cases by strain, breeder, and slot number.</p>
      </div>
    </div>
  );
}

export default App;
