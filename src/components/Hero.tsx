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
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const videoEl = videoRef.current;
    const canvasEl = canvasRef.current;
    if (!videoEl || !canvasEl) return;

    const ctx = canvasEl.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Fixed internal resolution matching source video (1280x720)
    canvasEl.width = 1280;
    canvasEl.height = 720;

    videoEl.muted = true;
    videoEl.defaultMuted = true;
    videoEl.volume = 0;
    videoEl.playsInline = true;
    videoEl.setAttribute('muted', '');
    videoEl.setAttribute('playsinline', '');
    videoEl.setAttribute('webkit-playsinline', 'true');
    videoEl.setAttribute('x5-playsinline', 'true');
    videoEl.setAttribute('x5-video-player-type', 'h5');
    videoEl.setAttribute('x5-video-player-fullscreen', 'false');
    videoEl.setAttribute('disablePictureInPicture', 'true');
    videoEl.setAttribute('disableRemotePlayback', 'true');

    let animId: number;
    let isDestroyed = false;

    const renderLoop = () => {
      if (isDestroyed) return;
      if (videoEl.readyState >= 2 && !videoEl.paused) {
        ctx.drawImage(videoEl, 0, 0, 1280, 720);
      }
      animId = requestAnimationFrame(renderLoop);
    };

    const tryPlay = () => {
      if (isDestroyed) return;
      videoEl.muted = true;
      const promise = videoEl.play();
      if (promise !== undefined) {
        promise.catch(() => {
          // If in-app browser blocks autonomous autoplay on load,
          // unlock playback on the very first user interaction
          const unlock = () => {
            if (videoEl && videoEl.paused) {
              videoEl.muted = true;
              videoEl.play().catch(() => {});
            }
          };
          window.addEventListener('touchstart', unlock, { once: true, passive: true });
          window.addEventListener('scroll', unlock, { once: true, passive: true });
          window.addEventListener('click', unlock, { once: true });
          window.addEventListener('pointerdown', unlock, { once: true });
        });
      }
    };

    tryPlay();
    animId = requestAnimationFrame(renderLoop);

    videoEl.addEventListener('loadedmetadata', tryPlay);
    videoEl.addEventListener('canplay', tryPlay);

    // Auto-resume if app minimizes or tab switches
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        tryPlay();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // Auto-resume if background video pauses
    const handlePause = () => {
      if (document.visibilityState === 'visible') {
        tryPlay();
      }
    };
    videoEl.addEventListener('pause', handlePause);

    return () => {
      isDestroyed = true;
      cancelAnimationFrame(animId);
      videoEl.removeEventListener('loadedmetadata', tryPlay);
      videoEl.removeEventListener('canplay', tryPlay);
      videoEl.removeEventListener('pause', handlePause);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <section className="relative w-full h-[50vh] min-h-[320px] sm:h-[85vh] lg:h-[92vh] overflow-hidden bg-black flex items-center justify-center border-b border-white/10 select-none">
      {/* Background Poster Fallback */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${config.heroImage || '/hero-poster.jpg'})` }}
      />

      {/* 
        1x1 Pixel Invisible Driver Video:
        Positioned inside layout viewport so WebKit keeps hardware decoding active,
        but completely invisible (1px at 0.001 opacity behind everything) so mobile webviews
        cannot detect or hijack it as a clickable/interactive media player.
      */}
      <video
        ref={videoRef}
        src={config.heroVideoUrl || '/hero-video.mp4'}
        autoPlay
        loop
        muted
        playsInline
        {...{
          'webkit-playsinline': 'true',
          'x5-playsinline': 'true',
          'x5-video-player-type': 'h5',
          'x5-video-player-fullscreen': 'false',
        }}
        disablePictureInPicture
        disableRemotePlayback
        preload="auto"
        tabIndex={-1}
        aria-hidden="true"
        controlsList="nofullscreen nodownload noremoteplayback noplaybackrate"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '1px',
          height: '1px',
          opacity: 0.001,
          pointerEvents: 'none',
          zIndex: -10,
        }}
      />

      {/* Visible Canvas Background: Renders the video frames directly onto canvas */}
      <div className="absolute inset-0 z-0 overflow-hidden flex items-center justify-center pointer-events-none select-none">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover object-center opacity-90 transition-opacity duration-500 pointer-events-none select-none"
        />

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
