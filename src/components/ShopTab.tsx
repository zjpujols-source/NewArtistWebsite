import React from 'react';
import { ArtistConfig } from '../types/artist';
import { ShoppingBag } from 'lucide-react';

interface ShopTabProps {
  config: ArtistConfig;
}

export const ShopTab: React.FC<ShopTabProps> = ({ config }) => {
  return (
    <div className="py-24 sm:py-36 animate-in fade-in duration-500 bg-black text-white min-h-[70vh] flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto px-4 sm:px-6 text-center space-y-8">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-500 block">
          / OFFICIAL MERCH STORE
        </span>

        <div className="p-12 bg-zinc-900/40 border border-white/15 space-y-6 flex flex-col items-center justify-center">
          <ShoppingBag className="w-12 h-12 text-zinc-400" />
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white font-sans">
            STORE COMING SOON
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 tracking-wider max-w-md">
            The official merchandise store is currently in development. Stay tuned for exclusive drops and apparel.
          </p>
        </div>
      </div>
    </div>
  );
};
