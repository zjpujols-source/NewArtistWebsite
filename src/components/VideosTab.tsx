import React, { useState } from 'react';
import { ArtistConfig } from '../types/artist';
import { Play, ArrowRight, X } from 'lucide-react';

interface VideosTabProps {
  config: ArtistConfig;
}

export const VideosTab: React.FC<VideosTabProps> = ({ config }) => {
  const allVideos = config.tabs.videos.items;
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const activeVideo = allVideos[selectedIndex] || allVideos[0];
  const otherVideos = allVideos.filter((_, idx) => idx !== selectedIndex);

  if (!activeVideo) return null;

  const youtubeSocial = config.socials.find(s => s.platform === 'youtube');
  const youtubeUrl = youtubeSocial?.url || `https://www.youtube.com/watch?v=${activeVideo.youtubeId}`;
  const videoThumbnail = activeVideo.thumbnail || (activeVideo.youtubeId ? `https://i.ytimg.com/vi/${activeVideo.youtubeId}/hqdefault.jpg` : "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80");

  const handleSelectVideo = (idx: number) => {
    setSelectedIndex(idx);
    setIsPlaying(true);
  };

  return (
    <div className="py-8 sm:py-16 animate-in fade-in duration-500 bg-black text-white min-h-[70vh] flex items-center">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Left Column: Title & Watch More CTA */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-10 text-left">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-400 block">
                VIDEOS
              </span>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white font-sans leading-tight">
                {activeVideo.title}
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

          {/* Right Column: Embedded YouTube Player & Thumbnails */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            
            {/* Main Video Container */}
            <div 
              className="relative aspect-video w-full bg-zinc-900 border border-white/20 shadow-2xl overflow-hidden group"
              title={activeVideo.title}
            >
              {isPlaying ? (
                <div className="relative w-full h-full">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
                    title={activeVideo.title}
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
                    alt={activeVideo.title}
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

            {/* Bottom Row of Other Thumbnails (4 videos: 2x2 on mobile, 1x4 on desktop) */}
            {otherVideos.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {otherVideos.map((video) => {
                  const actualIdx = allVideos.findIndex(v => v.id === video.id);
                  const thumb = video.thumbnail || (video.youtubeId ? `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg` : "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80");
                  return (
                    <div
                      key={video.id}
                      onClick={() => handleSelectVideo(actualIdx)}
                      className="group relative flex flex-col bg-zinc-900 border border-white/10 hover:border-white/60 cursor-pointer overflow-hidden transition-all shadow-lg rounded-lg sm:rounded-none"
                      title={video.title}
                    >
                      {/* Thumbnail Container */}
                      <div className="relative w-full aspect-video bg-zinc-900 overflow-hidden">
                        <img
                          src={thumb}
                          alt={video.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-85 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-black/80 text-white border border-white/30 flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg">
                            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                          </div>
                        </div>
                      </div>

                      {/* Info Below Thumbnail */}
                      <div className="p-2 sm:p-2.5 flex flex-col justify-between flex-1 bg-zinc-950">
                        <h4 className="text-[11px] sm:text-xs font-bold uppercase text-white truncate group-hover:text-purple-300 transition-colors leading-snug">
                          {video.title}
                        </h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
