import React from 'react';
import { DNAIcon } from './DNAIcon';
import { BudIcon } from './BudIcon';

export const VaultSummary = ({ breeders, strains }) => (
  <div className="vault-summary p-4 bg-green-100 rounded shadow mb-4">
    <h2 className="text-lg sm:text-xl font-bold text-green-800">
      Chronic Seed Vault Summary
    </h2>
    <div className="flex flex-col sm:flex-row sm:space-x-6 mt-2">
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
