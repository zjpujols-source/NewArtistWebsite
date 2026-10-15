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

    // Forcefully exit native fullscreen if mobile webview ever attempts to pop it open
    const exitNativeFullscreen = () => {
      videoEl.webkitExitFullscreen?.();
    };
    videoEl.addEventListener('webkitbeginfullscreen', exitNativeFullscreen);

    let animId: number;
    let isDestroyed = false;
    let hasStartedPlayback = false;

    const renderLoop = () => {
      if (isDestroyed) return;
      if (videoEl.readyState >= 2 && !videoEl.paused) {
        ctx.drawImage(videoEl, 0, 0, 1280, 720);
      }
      animId = requestAnimationFrame(renderLoop);
    };

    const playVideo = () => {
      if (isDestroyed || !videoEl) return;
      videoEl.muted = true;
      hasStartedPlayback = true;
      const promise = videoEl.play();
      if (promise !== undefined) {
        promise.catch(() => {});
      }
    };

    animId = requestAnimationFrame(renderLoop);

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      // On mobile (TikTok / Instagram / iOS WKWebView):
      // NEVER trigger video.play() on initial page load, because in-app browsers
      // intercept load-time autoplay as an autonomous presentation and force full-screen player.
      // Instead, seamlessly start the background loop on the very first touch, scroll, or tap!
      const handleFirstInteraction = () => {
        playVideo();
      };

      window.addEventListener('touchstart', handleFirstInteraction, { once: true, passive: true });
      window.addEventListener('scroll', handleFirstInteraction, { once: true, passive: true });
      window.addEventListener('pointerdown', handleFirstInteraction, { once: true, passive: true });
      window.addEventListener('click', handleFirstInteraction, { once: true });
    } else {
      // On desktop: safe to start immediately
      playVideo();
      videoEl.addEventListener('loadedmetadata', playVideo);
      videoEl.addEventListener('canplay', playVideo);
    }

    // Auto-resume if app minimizes and comes back, only if user already started playing
    const handleVisibility = () => {
      if (document.visibilityState === 'visible' && hasStartedPlayback && videoEl.paused) {
        playVideo();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      isDestroyed = true;
      cancelAnimationFrame(animId);
      videoEl.removeEventListener('webkitbeginfullscreen', exitNativeFullscreen);
      if (!isMobile) {
        videoEl.removeEventListener('loadedmetadata', playVideo);
        videoEl.removeEventListener('canplay', playVideo);
      }
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
        without autoPlay so in-app browsers never hijack the initial page load into fullscreen.
      */}
      <video
        ref={videoRef}
        src={config.heroVideoUrl || '/hero-video.mp4'}
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
