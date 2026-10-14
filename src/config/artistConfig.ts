import { ArtistConfig } from '../types/artist';

export const defaultArtistConfig: ArtistConfig = {
  // ============================================================
  // ARTIST INFORMATION
  // ============================================================
  artistName: "ORONTI",
  tagline: "Official Artist Website",
  genre: "Alternative / Indie Pop",
  bio: "Official website for ORONTI.",

  // ============================================================
  // HERO
  // ============================================================
  heroVideoUrl: "/hero-video.mp4",
  heroImage: "/hero-poster.jpg",
  profileImage: "/covers/melt-away.jpg",

  // ============================================================
  // DESIGN
  // ============================================================
  accentColor: "#a855f7",
  theme: "dark",

  // ============================================================
  // SOCIALS
  // ============================================================
  socials: [
    {
      id: "instagram",
      platform: "instagram",
      url: "https://www.instagram.com/oronti/",
      label: "Instagram"
    },
    {
      id: "spotify",
      platform: "spotify",
      url: "https://open.spotify.com/artist/1wQ8UgeGAyu3a6CJMN1JCZ",
      label: "Spotify",
      isStreaming: true
    },
    {
      id: "youtube",
      platform: "youtube",
      url: "https://www.youtube.com/@soundofORONTI",
      label: "YouTube"
    },
    {
      id: "tiktok",
      platform: "tiktok",
      url: "https://www.tiktok.com/@oronti_",
      label: "TikTok"
    },
    {
      id: "apple-music",
      platform: "apple-music",
      url: "https://music.apple.com/us/artist/oronti/1795144173",
      label: "Apple Music",
      isStreaming: true
    }
  ],

  // ============================================================
  // SITE TABS
  // ============================================================
  tabs: {
    music: {
      enabled: true,
      title: "MUSIC",
      releases: [
        {
          id: "release-if-only",
          title: "If Only",
          type: "single",
          coverArt: "/covers/if-only.jpg",
          spotifyUrl: "https://open.spotify.com/track/0cxMNjlbT5sUa9wLL2UenK",
          appleMusicUrl: "https://music.apple.com/us/album/if-only/1883727318?i=1883727503",
          youtubeMusicUrl: "https://music.youtube.com/search?q=ORONTI+If+Only"
        },
        {
          id: "release-melt-away",
          title: "Melt Away",
          type: "single",
          coverArt: "/covers/melt-away.jpg",
          spotifyUrl: "https://open.spotify.com/track/7uUM9h5TVZF9y7nB5WL8zp",
          appleMusicUrl: "https://music.apple.com/us/album/melt-away/1883727318?i=1883727499",
          youtubeMusicUrl: "https://music.youtube.com/search?q=ORONTI+Melt+Away",
          youtubeUrl: "https://youtu.be/1R3_GxzmZOY"
        },
        {
          id: "release-moonlight",
          title: "Moonlight",
          type: "single",
          coverArt: "/covers/moonlight.jpg",
          spotifyUrl: "https://open.spotify.com/track/6EqL3wSCBPEMs2uxoTD4m3",
          appleMusicUrl: "https://music.apple.com/us/album/moonlight/1883727318?i=1883727504",
          youtubeMusicUrl: "https://music.youtube.com/search?q=ORONTI+Moonlight",
          youtubeUrl: "https://youtu.be/DTQ_hrLuOGE"
        },
        {
          id: "release-maneater",
          title: "Maneater",
          type: "single",
          coverArt: "/covers/maneater.jpg",
          spotifyUrl: "https://open.spotify.com/track/0UvrExs0tPVMNdp0X8cfAA",
          appleMusicUrl: "https://music.apple.com/us/album/maneater/1883727318?i=1883727500",
          youtubeMusicUrl: "https://music.youtube.com/search?q=ORONTI+Maneater"
        },
        {
          id: "release-soul-child",
          title: "Soul Child",
          type: "single",
          coverArt: "/covers/soul-child.jpg",
          spotifyUrl: "https://open.spotify.com/track/33tVINnMT6cukw1g6g1RTy",
          appleMusicUrl: "https://music.apple.com/us/album/soul-child/6776018777?i=6776018778",
          youtubeMusicUrl: "https://music.youtube.com/search?q=ORONTI+Soul+Child"
        },
        {
          id: "release-wasted-time",
          title: "Wasted Time",
          type: "single",
          coverArt: "/covers/wasted-time.jpg",
          spotifyUrl: "https://open.spotify.com/track/5Do2b2rWtjmKrCJUi77EID",
          appleMusicUrl: "https://music.apple.com/us/album/wasted-time/1863465998?i=1863465999",
          youtubeMusicUrl: "https://music.youtube.com/search?q=ORONTI+Wasted+Time"
        },
        {
          id: "release-hanging-on",
          title: "Hanging On",
          type: "single",
          coverArt: "/covers/hanging-on.jpg",
          spotifyUrl: "https://open.spotify.com/track/49mFqPTicJBuUdXCAvSFWI",
          appleMusicUrl: "https://music.apple.com/us/album/hanging-on/1883727318?i=1883727501",
          youtubeMusicUrl: "https://music.youtube.com/search?q=ORONTI+Hanging+On"
        },
        {
          id: "release-another-life",
          title: "Another Life",
          type: "single",
          coverArt: "/covers/another-life.jpg",
          spotifyUrl: "https://open.spotify.com/track/7e19tIaiBfMBRfzmlybLnG",
          appleMusicUrl: "https://music.apple.com/us/album/another-life/1883727318?i=1883727502",
          youtubeMusicUrl: "https://music.youtube.com/search?q=ORONTI+Another+Life"
        },
        {
          id: "release-saviour",
          title: "Saviour",
          type: "single",
          coverArt: "/covers/saviour.jpg",
          spotifyUrl: "https://open.spotify.com/track/6GnvaMKRpwpYVbk7k1hef2",
          appleMusicUrl: "https://music.apple.com/us/album/saviour/1863705923?i=1863705924",
          youtubeMusicUrl: "https://music.youtube.com/search?q=ORONTI+Saviour"
        }
      ]
    },

    videos: {
      enabled: true,
      title: "VIDEOS",
      items: [
        {
          id: "video-melt-away",
          title: "Melt Away (Official Visualizer)",
          youtubeId: "1R3_GxzmZOY",
          thumbnail: "/videos/melt-away.jpg"
        },
        {
          id: "video-moonlight",
          title: "Moonlight (Official Visualizer)",
          youtubeId: "DTQ_hrLuOGE",
          thumbnail: "/videos/moonlight.jpg"
        }
      ]
    },

    live: {
      enabled: true,
      title: "LIVE",
      status: "coming_soon"
    },

    shop: {
      enabled: true,
      title: "STORE",
      status: "coming_soon"
    },

    contact: {
      enabled: true,
      title: "CONTACT",
      managementEmail: ""
    }
  }
};
