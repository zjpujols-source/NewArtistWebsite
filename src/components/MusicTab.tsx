import React, { useState } from 'react';
import { ArtistConfig } from '../types/artist';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { StreamModal } from './StreamModal';

interface MusicTabProps {
  config: ArtistConfig;
  onPlayTrack: (title: string, artist: string, coverArt?: string) => void;
  currentPlayingTrack?: string;
  isPlaying?: boolean;
}

export const MusicTab: React.FC<MusicTabProps> = ({
  config,
  onPlayTrack
}) => {
  const allReleases = config.tabs.music.releases;
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const activeItem = allReleases[selectedIndex] || allReleases[0];

  if (!activeItem) return null;

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : allReleases.length - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev < allReleases.length - 1 ? prev + 1 : 0));
  };

  const handleOpenStreamModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="py-4 sm:py-12 animate-in fade-in duration-500 bg-black text-white min-h-[60vh] flex items-center">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          
          {/* Left Thumbnail Column */}
          <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 lg:col-span-2">
            {allReleases.map((release, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={release.id}
                  onClick={() => setSelectedIndex(idx)}
                  className={`relative w-14 h-14 sm:w-20 sm:h-20 shrink-0 rounded-none overflow-hidden transition-all duration-300 ${
                    isSelected 
                      ? 'border-2 border-white scale-105 opacity-100 shadow-2xl' 
                      : 'border border-white/10 opacity-40 hover:opacity-80'
                  }`}
                  title={release.title}
                >
                  {release.coverArt ? (
                    <img
                      src={release.coverArt}
                      alt={release.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-[10px] text-zinc-500 font-mono">
                      MUSIC
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Center Main Big Cover Artwork */}
          <div className="lg:col-span-5 flex justify-center">
            <div 
              onClick={handleOpenStreamModal}
              className="relative aspect-square w-full max-w-[320px] sm:max-w-[440px] bg-zinc-900 border border-white/20 shadow-2xl cursor-pointer group overflow-hidden"
              title={`Stream / Download ${activeItem.title}`}
            >
              {activeItem.coverArt ? (
                <img
                  src={activeItem.coverArt}
                  alt={activeItem.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-xs text-zinc-500 font-mono">
                  SINGLE / ALBUM COVER
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-xs uppercase tracking-[0.25em] font-bold bg-white text-black px-6 py-3 shadow-2xl">
                  Stream Track
                </span>
              </div>
            </div>
          </div>

          {/* Right Text Column: Title, Link & Circular Navigation */}
          <div className="lg:col-span-5 flex flex-col space-y-4 sm:space-y-6 lg:justify-between lg:min-h-[360px] text-left lg:pl-4 py-1">
            
            <div className="space-y-1.5 sm:space-y-3">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-400 block">
                / MUSIC
              </span>
              <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white font-sans leading-tight whitespace-normal break-words">
                {activeItem.title}
              </h2>
            </div>

            {/* Stream / Download Button & Circular Navigation */}
            <div className="space-y-4 sm:space-y-6 pt-1 sm:pt-4">
              {/* Stream / Download Button (opens platform picker modal) */}
              <div>
                <button
                  onClick={handleOpenStreamModal}
                  className="group inline-flex items-center gap-3 text-sm sm:text-base font-bold uppercase tracking-[0.2em] text-white hover:text-zinc-300 transition-colors"
                >
                  <span>Stream / Download</span>
                  <span className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center transition-transform group-hover:translate-x-1 shadow-lg shrink-0">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </button>
              </div>

              {/* Circular Arrow Navigation Buttons */}
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePrev}
                  aria-label="Previous track"
                  className="w-12 h-12 rounded-full bg-black border border-white/40 hover:border-white text-white hover:bg-white hover:text-black transition-all flex items-center justify-center shadow-lg active:scale-95"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next track"
                  className="w-12 h-12 rounded-full bg-black border border-white/40 hover:border-white text-white hover:bg-white hover:text-black transition-all flex items-center justify-center shadow-lg active:scale-95"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Platform Choice Modal */}
      <StreamModal
        release={activeItem}
        artistName={config.artistName}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPlayTrack={onPlayTrack}
      />
    </div>
  );
};
