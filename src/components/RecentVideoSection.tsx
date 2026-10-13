import React, { useState } from 'react';
import { ArtistConfig } from '../types/artist';
import { Play, ArrowRight, X } from 'lucide-react';

interface RecentVideoSectionProps {
  config: ArtistConfig;
}

export const RecentVideoSection: React.FC<RecentVideoSectionProps> = ({ config }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const latestVideo = config.tabs.videos.items[0];
  if (!latestVideo) return null;

  const youtubeSocial = config.socials.find(s => s.platform === 'youtube');
  const youtubeUrl = youtubeSocial?.url || `https://www.youtube.com/watch?v=${latestVideo.youtubeId}`;
  const videoThumbnail = latestVideo.thumbnail || (latestVideo.youtubeId ? `https://i.ytimg.com/vi/${latestVideo.youtubeId}/hqdefault.jpg` : "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80");

  return (
    <div className="py-16 sm:py-24 border-t border-white/10 bg-black text-white">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Left Column: Title & Watch More CTA */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-10 text-left">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-400 block">
                / LATEST VIDEO
              </span>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white font-sans leading-tight">
                {latestVideo.title}
              </h2>
            </div>

            <div className="pt-2">
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-4 text-sm sm:text-base font-bold uppercase tracking-[0.2em] text-white hover:text-zinc-300 transition-colors"
              >
                <span>Watch On Youtube Channel</span>
                <span className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center transition-transform group-hover:translate-x-1 shadow-lg shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </a>
            </div>
          </div>

          {/* Right Column: Embedded Video / Thumbnail */}
          <div className="lg:col-span-7">
            <div 
              className="relative aspect-video w-full bg-zinc-900 border border-white/20 shadow-2xl overflow-hidden group"
              title={latestVideo.title}
            >
              {isPlaying ? (
                <div className="relative w-full h-full">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${latestVideo.youtubeId}?autoplay=1&rel=0`}
                    title={latestVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                  <button
                    onClick={() => setIsPlaying(false)}
                    className="absolute top-3 right-3 z-10 p-2 bg-black/80 hover:bg-black text-white rounded-full border border-white/30 backdrop-blur-md transition-all"
                    title="Close Video"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div 
                  onClick={() => setIsPlaying(true)}
                  className="relative w-full h-full cursor-pointer"
                >
                  <img
                    src={videoThumbnail}
                    alt={latestVideo.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/80 text-white border border-white/40 flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-2xl">
                      <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-current ml-1" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
