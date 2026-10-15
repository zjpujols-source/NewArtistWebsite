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

    // Apply strict background video attributes for mobile webviews (TikTok, Instagram, iOS WebKit)
    videoEl.muted = true;
    videoEl.defaultMuted = true;
    videoEl.volume = 0;
    videoEl.setAttribute('muted', '');
    videoEl.setAttribute('playsinline', '');
    videoEl.setAttribute('webkit-playsinline', 'true');
    videoEl.setAttribute('x5-playsinline', 'true');
    videoEl.setAttribute('x5-video-player-type', 'h5');
    videoEl.setAttribute('x5-video-player-fullscreen', 'false');
    videoEl.setAttribute('disablePictureInPicture', 'true');
    videoEl.setAttribute('disableRemotePlayback', 'true');
    videoEl.setAttribute('controlsList', 'nofullscreen nodownload noremoteplayback noplaybackrate');

    const tryPlay = () => {
      if (videoEl && videoEl.paused) {
        const promise = videoEl.play();
        if (promise !== undefined) {
          promise.catch(() => {
            // Silently ignore browser autoplay deferrals
          });
        }
      }
    };

    // Auto-resume if in-app browser or iOS ever pauses the background video
    const handlePause = () => {
      tryPlay();
    };

    // Resume when coming back to tab / viewport
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        tryPlay();
      }
    };

    tryPlay();

    videoEl.addEventListener('loadedmetadata', tryPlay);
    videoEl.addEventListener('loadeddata', tryPlay);
    videoEl.addEventListener('canplay', tryPlay);
    videoEl.addEventListener('pause', handlePause);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      videoEl.removeEventListener('loadedmetadata', tryPlay);
      videoEl.removeEventListener('loadeddata', tryPlay);
      videoEl.removeEventListener('canplay', tryPlay);
      videoEl.removeEventListener('pause', handlePause);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <section className="relative w-full h-[50vh] min-h-[320px] sm:h-[85vh] lg:h-[92vh] overflow-hidden bg-black flex items-center justify-center border-b border-white/10 select-none">
      {/* Video Loop Background */}
      <div className="absolute inset-0 z-0 overflow-hidden flex items-center justify-center pointer-events-none select-none">
        <video
          ref={videoRef}
          src={config.heroVideoUrl || '/hero-video.mp4'}
          poster={config.heroImage || '/hero-poster.jpg'}
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          disableRemotePlayback
          preload="auto"
          tabIndex={-1}
          aria-hidden="true"
          controlsList="nofullscreen nodownload noremoteplayback noplaybackrate"
          className="w-full h-full object-cover object-center opacity-90 transition-opacity duration-500 pointer-events-none select-none"
        >
          <source src={config.heroVideoUrl || '/hero-video.mp4'} type="video/mp4" />
        </video>

        {/* Subtle Overlay gradient for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 pointer-events-none" />
      </div>

      {/* Touch & Click Shield: Absorbs taps/clicks so mobile webviews cannot treat background video as clickable media */}
      <div 
        className="absolute inset-0 z-[1] touch-pan-y pointer-events-auto"
        onClick={(e) => {
          e.preventDefault();
        }}
        aria-hidden="true"
      />

      {/* Centered Minimalist Title */}
      <div className="relative z-10 text-center px-4 w-full max-w-7xl mx-auto select-none overflow-hidden pointer-events-none">
        <h1 className="text-3xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-[0.1em] xs:tracking-[0.18em] sm:tracking-[0.25em] md:tracking-[0.3em] uppercase font-sans text-white drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)] leading-tight truncate sm:whitespace-normal pointer-events-none">
          {config.artistName}
        </h1>
      </div>
    </section>
  );
};
