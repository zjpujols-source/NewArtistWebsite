import React from 'react';
import { Release } from '../types/artist';
import { X, ExternalLink, Music, Disc } from 'lucide-react';

interface StreamModalProps {
  release: Release | null;
  artistName: string;
  isOpen: boolean;
  onClose: () => void;
  onPlayTrack?: (title: string, artist: string, coverArt?: string) => void;
}

interface PlatformOption {
  name: string;
  url: string;
  iconBg: string;
  textColor: string;
  badge?: string;
  icon: React.ReactNode;
}

export const StreamModal: React.FC<StreamModalProps> = ({
  release,
  artistName,
  isOpen,
  onClose,
  onPlayTrack,
}) => {
  if (!isOpen || !release) return null;

  // Use explicit songlink URL if provided
  const songlink = release.songlinkUrl;

  const platforms: PlatformOption[] = [];

  if (release.spotifyUrl) {
    platforms.push({
      name: 'Spotify',
      url: release.spotifyUrl,
      iconBg: 'bg-[#1DB954] text-black',
      textColor: 'text-white',
      badge: 'Stream',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.516 17.316c-.217.356-.677.469-1.03.252-2.822-1.725-6.375-2.116-10.56-1.157-.404.093-.811-.161-.904-.565-.093-.404.161-.811.565-.904 4.582-1.047 8.513-.598 11.677 1.341.356.216.47.677.252 1.033zm1.474-3.279c-.273.443-.852.585-1.294.312-3.23-1.986-8.156-2.56-11.977-1.401-.497.151-1.025-.133-1.176-.63-.151-.498.133-1.025.63-1.176 4.37-1.328 9.792-.686 13.505 1.6 4.43.272.585.852.312 1.295zm.127-3.414C15.228 8.49 8.868 8.28 5.163 9.405c-.613.187-1.264-.162-1.452-.774-.187-.613.162-1.264.774-1.452 4.257-1.293 11.278-1.05 15.694 1.571.552.328.735 1.043.407 1.595-.328.552-1.043.735-1.595.407z"/>
        </svg>
      ),
    });
  }

  if (release.appleMusicUrl) {
    platforms.push({
      name: 'Apple Music',
      url: release.appleMusicUrl,
      iconBg: 'bg-[#FA243C] text-white',
      textColor: 'text-white',
      badge: 'Stream / Buy',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M23.994 6.124a9.23 9.23 0 00-.328-1.578c-.287-.893-.762-1.683-1.428-2.35A5.877 5.877 0 0019.888.77c-.894-.288-1.894-.374-3.085-.374H7.2c-1.192 0-2.19.086-3.084.374A5.882 5.882 0 002.69 2.196c-.666.667-1.14 1.457-1.428 2.35A9.23 9.23 0 00.934 6.124C.893 7.02.893 8.02.893 9.212v5.576c0 1.192 0 2.192.041 3.088.04.893.18 1.682.467 2.35.288.893.762 1.683 1.428 2.35a5.886 5.886 0 001.426 1.426c.894.288 1.892.374 3.084.374h9.603c1.191 0 2.191-.086 3.085-.374a5.877 5.877 0 001.428-1.426c.666-.667 1.141-1.457 1.428-2.35.287-.668.427-1.457.467-2.35.041-.896.041-1.896.041-3.088V9.212c0-1.192 0-2.192-.041-3.088zM17.45 14.88c0 2.174-1.642 3.65-3.837 3.65-2.158 0-3.666-1.476-3.666-3.468 0-2.008 1.542-3.484 3.683-3.484.514 0 1.01.099 1.46.29v-5.69l-6.42 1.426v8.423c0 2.174-1.643 3.65-3.837 3.65-2.158 0-3.666-1.476-3.666-3.468 0-2.008 1.542-3.484 3.683-3.484.514 0 1.01.099 1.46.29v-7.22l8.76-1.933v10.608z"/>
        </svg>
      ),
    });
  }

  if (release.youtubeMusicUrl) {
    const ytUrl = release.youtubeMusicUrl;
    platforms.push({
      name: 'YouTube Music',
      url: ytUrl,
      iconBg: 'bg-[#FF0000] text-white',
      textColor: 'text-white',
      badge: 'Stream',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.2c-3.972 0-7.2-3.228-7.2-7.2s3.228-7.2 7.2-7.2 7.2 3.228 7.2 7.2-3.228 7.2-7.2 7.2zm0-11.52c-2.384 0-4.32 1.936-4.32 4.32s1.936 4.32 4.32 4.32 4.32-1.936 4.32-4.32-1.936-4.32-4.32-4.32zm-1.44 6.192V10.128l3.6 2.184-3.6 2.184z"/>
        </svg>
      ),
    });
  }

  if (release.amazonMusicUrl) {
    const amzUrl = release.amazonMusicUrl;
    platforms.push({
      name: 'Amazon Music',
      url: amzUrl,
      iconBg: 'bg-[#00A8E1] text-white',
      textColor: 'text-white',
      badge: 'Stream',
      icon: <Music className="w-5 h-5" />,
    });
  }

  if (release.deezerUrl) {
    const deezerUrl = release.deezerUrl;
    platforms.push({
      name: 'Deezer',
      url: deezerUrl,
      iconBg: 'bg-[#FEAA2D] text-black',
      textColor: 'text-white',
      badge: 'Stream',
      icon: <Disc className="w-5 h-5" />,
    });
  }

  if (release.tidalUrl) {
    const tidalUrl = release.tidalUrl;
    platforms.push({
      name: 'Tidal',
      url: tidalUrl,
      iconBg: 'bg-black border border-white/30 text-white',
      textColor: 'text-white',
      badge: 'HiFi Stream',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 7.2L7.2 12 12 16.8 16.8 12 12 7.2zM4.8 12L0 16.8 4.8 21.6 9.6 16.8 4.8 12zM19.2 12L14.4 16.8 19.2 21.6 24 16.8 19.2 12zM12 2.4L7.2 7.2 12 12 16.8 7.2 12 2.4z"/>
        </svg>
      ),
    });
  }

  if (release.soundcloudUrl) {
    platforms.push({
      name: 'SoundCloud',
      url: release.soundcloudUrl,
      iconBg: 'bg-[#FF5500] text-white',
      textColor: 'text-white',
      badge: 'Stream',
      icon: <Music className="w-5 h-5" />,
    });
  }

  // Universal songlink if available
  if (songlink) {
    platforms.push({
      name: 'All Other Services',
      url: songlink,
      iconBg: 'bg-purple-600 text-white',
      textColor: 'text-white',
      badge: 'Smart Link',
      icon: <ExternalLink className="w-5 h-5" />,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-md bg-zinc-950 border border-white/20 rounded-2xl shadow-2xl overflow-hidden text-white flex flex-col my-auto max-h-[90vh]">
        {/* Header with Background Blur Cover */}
        <div className="relative p-6 border-b border-white/10 flex items-center gap-4 bg-gradient-to-b from-zinc-900 to-zinc-950">
          {release.coverArt ? (
            <img
              src={release.coverArt}
              alt={release.title}
              className="w-20 h-20 rounded-lg object-cover border border-white/20 shadow-lg shrink-0"
            />
          ) : (
            <div className="w-20 h-20 rounded-lg bg-zinc-800 border border-white/20 shadow-lg shrink-0 flex items-center justify-center text-[10px] text-zinc-500 font-mono">
              COVER
            </div>
          )}
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-purple-400 block mb-1">
              {release.type}
            </span>
            <h3 className="text-xl font-black text-white truncate tracking-tight uppercase font-sans">
              {release.title}
            </h3>
            <p className="text-xs text-zinc-400 truncate mt-0.5">{artistName}</p>

            {onPlayTrack && release.tracks && release.tracks.length > 0 && (
              <button
                onClick={() => {
                  const firstTrack = release.tracks[0];
                  onPlayTrack(firstTrack.title, artistName, release.coverArt);
                }}
                className="mt-2 text-[11px] font-bold uppercase tracking-widest text-zinc-300 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <span>▶ Preview Track</span>
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/20 text-zinc-400 hover:text-white transition-all self-start"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Platform Links List */}
        <div className="p-5 overflow-y-auto space-y-2.5 max-h-[60vh]">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-3">
            Choose Your Platform
          </p>

          {platforms.map((plat) => (
            <a
              key={plat.name}
              href={plat.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 hover:border-white/30 transition-all group"
            >
              <div className="flex items-center gap-3.5">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 shadow-md ${plat.iconBg}`}>
                  {plat.icon}
                </div>
                <span className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                  {plat.name}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {plat.badge && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-white/10 text-zinc-300 border border-white/10">
                    {plat.badge}
                  </span>
                )}
                <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
              </div>
            </a>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-zinc-900/40 border-t border-white/10 text-center text-[11px] text-zinc-500">
          Available on all major music streaming services & digital stores.
        </div>
      </div>
    </div>
  );
};
