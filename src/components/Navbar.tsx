import React, { useState } from 'react';
import { ArtistConfig, TabType } from '../types/artist';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  config: ArtistConfig;
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  config,
  activeTab,
  onSelectTab
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs: { key: TabType; label: string; enabled: boolean }[] = [
    {
      key: 'music',
      label: config.tabs.music.title || 'MUSIC',
      enabled: config.tabs.music.enabled
    },
    {
      key: 'videos',
      label: config.tabs.videos.title || 'VIDEOS',
      enabled: config.tabs.videos.enabled
    },
    {
      key: 'live',
      label: config.tabs.live.title || 'LIVE',
      enabled: config.tabs.live.enabled
    },
    {
      key: 'shop',
      label: config.tabs.shop.title || 'STORE',
      enabled: config.tabs.shop.enabled
    },
    {
      key: 'contact',
      label: config.tabs.contact.title || 'CONTACT',
      enabled: config.tabs.contact.enabled
    },
  ];

  const handleTabClick = (key: TabType) => {
    onSelectTab(key);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">

        {/* Brand / Artist Name */}
        <button
          onClick={() => handleTabClick('music')}
          className="text-lg sm:text-2xl font-black tracking-tighter uppercase text-white hover:opacity-80 transition-opacity font-sans"
        >
          {config.artistName}
        </button>

        {/* Desktop Navigation Tabs */}
        <div className="hidden md:flex items-center gap-1 sm:gap-6 py-2">
          {tabs.filter(t => t.enabled).map((tab) => {
            const isActive = activeTab === tab.key;

            return (
              <button
                key={tab.key}
                onClick={() => onSelectTab(tab.key)}
                className={`px-2.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold tracking-widest uppercase transition-all duration-200 relative whitespace-nowrap ${
                  isActive
                    ? 'text-white'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {tab.label}

                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white shadow-lg" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Action Area */}
        <div className="flex items-center gap-2">

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-zinc-300 hover:text-white focus:outline-none rounded-lg bg-white/5 border border-white/10"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10 px-4 py-4 space-y-1 animate-in fade-in slide-in-from-top-2 duration-200 shadow-2xl">
          {tabs.filter(t => t.enabled).map((tab) => {
            const isActive = activeTab === tab.key;

            return (
              <button
                key={tab.key}
                onClick={() => handleTabClick(tab.key)}
                className={`w-full text-left py-3 px-4 rounded-xl text-sm font-bold tracking-widest uppercase transition-all duration-150 flex items-center justify-between ${
                  isActive
                    ? 'text-white bg-white/10 border-l-2 border-white'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                }`}
              >
                <span>{tab.label}</span>

                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-white shadow-sm" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
};
