import React, { useEffect, useRef } from 'react';
import { ArtistConfig, TabType } from '../types/artist';

interface HeroProps {
  config: ArtistConfig;
  onSelectTab?: (tab: TabType) => void;
  onPlayTrack?: (title: string, artist: string) => void;
  onUpdateConfig?: (config: ArtistConfig) => void;
}

export const Hero: React.FC<HeroProps> = ({ config }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    // Ensure DOM attributes for strict browser autoplay policy compliance
    videoEl.muted = true;
    videoEl.defaultMuted = true;
    videoEl.setAttribute('muted', '');
    videoEl.setAttribute('playsinline', '');
    videoEl.setAttribute('autoplay', '');

    const playVideo = () => {
      if (videoEl && videoEl.paused) {
        videoEl.play().catch((err) => {
          console.warn(
            'Hero video autoplay notice (browser policy):',
            err
          );
        });
      }
    };

    // If metadata or frames are already loaded, play immediately
    if (videoEl.readyState >= 1) {
      playVideo();
    }

    // Attach listeners for when video metadata / data becomes ready
    videoEl.addEventListener('loadedmetadata', playVideo);
    videoEl.addEventListener('loadeddata', playVideo);
    videoEl.addEventListener('canplay', playVideo);

    // Fallback trigger on initial user interaction if autoplay is deferred
    const handleInteraction = () => {
      playVideo();
    };

    window.addEventListener('click', handleInteraction, {
      capture: true,
      once: true,
    });

    window.addEventListener('touchstart', handleInteraction, {
      capture: true,
      once: true,
    });

    window.addEventListener('pointerdown', handleInteraction, {
      capture: true,
      once: true,
    });

    return () => {
      videoEl.removeEventListener('loadedmetadata', playVideo);
      videoEl.removeEventListener('loadeddata', playVideo);
      videoEl.removeEventListener('canplay', playVideo);

      window.removeEventListener('click', handleInteraction, {
        capture: true,
      });

      window.removeEventListener('touchstart', handleInteraction, {
        capture: true,
      });

      window.removeEventListener('pointerdown', handleInteraction, {
        capture: true,
      });
    };
  }, []);

  return (
    <section className="relative w-full h-[50vh] min-h-[320px] sm:h-[85vh] lg:h-[92vh] overflow-hidden bg-black flex items-center justify-center border-b border-white/10">
      {/* Video Loop Background */}
      <div className="absolute inset-0 z-0 overflow-hidden flex items-center justify-center">
        <video
          ref={videoRef}
          src={config.heroVideoUrl || '/hero-video.mp4'}
          poster={config.heroImage || '/hero-poster.jpg'}
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          preload="metadata"
          className="w-full h-full object-cover object-center opacity-90 transition-opacity duration-500 pointer-events-none"
        />

        {/* Subtle Overlay gradient for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 pointer-events-none" />
      </div>

      {/* Centered Minimalist Title */}
      <div className="relative z-10 text-center px-4 w-full max-w-7xl mx-auto select-none overflow-hidden">
        <h1 className="text-3xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-[0.1em] xs:tracking-[0.18em] sm:tracking-[0.25em] md:tracking-[0.3em] uppercase font-sans text-white drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)] leading-tight truncate sm:whitespace-normal">
          {config.artistName}
        </h1>
      </div>
    </section>
  );
};
