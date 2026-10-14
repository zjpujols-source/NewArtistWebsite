import React from 'react';
import { Release } from '../types/artist';
import { X, ExternalLink } from 'lucide-react';
import {
  SpotifyIcon,
  AppleMusicIcon,
  YouTubeMusicIcon,
  YouTubeIcon,
  AmazonMusicIcon,
  DeezerIcon,
  TidalIcon,
  SoundCloudIcon
} from './PlatformIcons';

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
      icon: <SpotifyIcon className="w-5 h-5 fill-current" />,
    });
  }

  if (release.appleMusicUrl) {
    platforms.push({
      name: 'Apple Music',
      url: release.appleMusicUrl,
      iconBg: 'bg-[#FA243C] text-white',
      textColor: 'text-white',
      badge: 'Stream / Buy',
      icon: <AppleMusicIcon className="w-5 h-5 fill-current" />,
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
      icon: <YouTubeMusicIcon className="w-5 h-5 fill-current" />,
    });
  }

  if (release.youtubeUrl) {
    platforms.push({
      name: 'YouTube Visualizer',
      url: release.youtubeUrl,
      iconBg: 'bg-[#FF0000] text-white',
      textColor: 'text-white',
      badge: 'Watch Video',
      icon: <YouTubeIcon className="w-5 h-5 fill-current" />,
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
      icon: <AmazonMusicIcon className="w-5 h-5 fill-current" />,
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
      icon: <DeezerIcon className="w-5 h-5 fill-current" />,
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
      icon: <TidalIcon className="w-5 h-5 fill-current" />,
    });
  }

  if (release.soundcloudUrl) {
    platforms.push({
      name: 'SoundCloud',
      url: release.soundcloudUrl,
      iconBg: 'bg-[#FF5500] text-white',
      textColor: 'text-white',
      badge: 'Stream',
      icon: <SoundCloudIcon className="w-5 h-5 fill-current" />,
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
