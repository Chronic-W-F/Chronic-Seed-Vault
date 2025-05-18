import React from 'react';
import './App.css';

// --- Icon: DNA strand ---
const DNAIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    style={{ width: '1em', height: '1em', marginRight: '0.5em', verticalAlign: 'middle' }}
  >
    <path d="M13 2v2h-2V2h2zm0 18v2h-2v-2h2zM6.343 6.343l1.414 1.414-1.414-1.414zM16.243 16.243l1.414 1.414-1.414-1.414zM2 11h2v2H2v-2zm18 0h2v2h-2v-2zM6.343 17.657l1.414-1.414-1.414 1.414zM16.243 7.757l1.414-1.414-1.414 1.414zM7 12a5 5 0 015-5V5a7 7 0 00-7 7h2zm5 5a5 5 0 01-5-5H5a7 7 0 007 7v-2zm0-10a5 5 0 015 5h2a7 7 0 00-7-7v2zm5 5a5 5 0 01-5 5v2a7 7 0 007-7h-2z" />
  </svg>
);

// --- Icon: Bud (Cartoon style) ---
const BudIcon = () => (
  <svg
    viewBox="0 0 64 64"
    fill="currentColor"
    style={{ width: '1em', height: '1em', marginRight: '0.5em', verticalAlign: 'middle' }}
  >
    <path d="M32 2c5 10 12 15 18 18-7 3-12 7-16 14 8-2 14-1 20 3-6 4-11 9-14 16 4-1 9 0 14 4-5 3-9 6-10 11-3-4-8-6-12-7-3 4-6 7-10 9-2-6-6-10-12-12 3-5 7-8 13-10-6-4-11-9-13-16 5-1 10-2 16 0-5-6-9-11-16-14 5-3 12-8 18-18z" />
  </svg>
);

// --- Vault Summary Component ---
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
  const uniqueBreeders = 87; // temporary hardcoded value
  const uniqueStrains = 242; // temporary hardcoded value

  return (
    <div className="p-4">
      <VaultSummary uniqueBreeders={uniqueBreeders} uniqueStrains={uniqueStrains} />

      {/* Rest of your seed vault app */}
      <div className="mt-8 text-center text-gray-700">
        <p>This is the rest of the Chronic Seed Vault app.</p>
      </div>
    </div>
  );
}

export default App;
