import React from 'react';
import { ArtistConfig } from '../types/artist';
import { Headphones, ExternalLink } from 'lucide-react';
import { getPlatformIcon } from './PlatformIcons';

interface FooterProps {
  config: ArtistConfig;
  onSelectTab?: (tab: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ config }) => {
  return (
    <footer className="bg-black text-white py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center space-y-8">

        {/* Social Icons Row */}
        <div className="flex items-center gap-[14px] p-5 flex-wrap justify-center">
          {config.socials.map((soc) => (
            <a
              key={soc.id}
              href={soc.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={soc.label}
              title={soc.label}
              className="w-[44px] h-[44px] rounded-[12px] bg-zinc-900/90 border border-white/15 flex items-center justify-center text-white hover:bg-[#262626] hover:-translate-y-0.5 transition-all duration-150 shadow-md"
            >
              {getPlatformIcon(soc.platform, "w-[22px] h-[22px] fill-white text-white") || (soc.isStreaming ? (
                <Headphones className="w-[22px] h-[22px]" />
              ) : (
                <ExternalLink className="w-[22px] h-[22px]" />
              ))}
            </a>
          ))}
        </div>

        <div className="text-center text-xs text-zinc-500 font-mono">
          © {new Date().getFullYear()} {config.artistName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
