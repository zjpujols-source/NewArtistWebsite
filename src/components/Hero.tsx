import React from 'react';
import { ArtistConfig, TabType } from '../types/artist';

interface HeroProps {
  config: ArtistConfig;
  onSelectTab?: (tab: TabType) => void;
  onPlayTrack?: (title: string, artist: string) => void;
  onUpdateConfig?: (config: ArtistConfig) => void;
}

export const Hero: React.FC<HeroProps> = ({ config }) => {
  const isVideo = config.heroVideoUrl?.match(/\.(mp4|mov|webm)$/i);

  return (
    <section className="relative w-full h-[50vh] min-h-[320px] sm:h-[85vh] lg:h-[92vh] overflow-hidden bg-black flex items-center justify-center border-b border-white/10 select-none">
      {/* 
        High-Performance Hero Loop:
        When using animated WebP, it renders natively as an image, completely eliminating 
        HTML5 <video> elements and permanently preventing mobile in-app browsers (like TikTok & Instagram)
        from ever hijacking background playback into native fullscreen player modals.
      */}
      <div className="absolute inset-0 z-0 overflow-hidden flex items-center justify-center pointer-events-none select-none">
        {isVideo ? (
          <video
            src={config.heroVideoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center opacity-90 transition-opacity duration-500 pointer-events-none select-none"
          />
        ) : (
          <img
            src={config.heroVideoUrl || '/hero-loop.webp'}
            alt={`${config.artistName} background loop`}
            className="w-full h-full object-cover object-center opacity-90 transition-opacity duration-500 pointer-events-none select-none"
            loading="eager"
            decoding="async"
          />
        )}

        {/* Subtle Overlay gradient for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 pointer-events-none" />
      </div>

      {/* Centered Minimalist Title */}
      <div className="relative z-10 text-center px-4 w-full max-w-7xl mx-auto select-none overflow-hidden pointer-events-none">
        <h1 className="text-3xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-[0.1em] xs:tracking-[0.18em] sm:tracking-[0.25em] md:tracking-[0.3em] uppercase font-sans text-white drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)] leading-tight truncate sm:whitespace-normal pointer-events-none">
          {config.artistName}
        </h1>
      </div>
    </section>
  );
};
