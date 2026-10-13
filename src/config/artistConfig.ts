import { ArtistConfig } from '../types/artist';

export const defaultArtistConfig: ArtistConfig = {
  // ============================================================
  // ARTIST INFORMATION — CHANGE THESE FOR EACH NEW ARTIST
  // ============================================================
  artistName: "ARTIST NAME",
  tagline: "Official Artist Website",
  genre: "Genre / Style",
  bio: "Artist bio goes here.",

  // ============================================================
  // HERO — KEEP THESE FILE NAMES THE SAME
  // Replace the actual files in /public for each artist.
  // ============================================================
  heroVideoUrl: "/hero-video.mp4",
  heroImage: "/hero-poster.jpg",
  profileImage: "",

  // ============================================================
  // DESIGN
  // ============================================================
  accentColor: "#a855f7",
  theme: "dark",

  // ============================================================
  // SOCIALS — ADD/REMOVE/REPLACE LINKS FOR EACH ARTIST
  // ============================================================
  socials: [
    {
      id: "instagram",
      platform: "instagram",
      url: "",
      label: "Instagram"
    },
    {
      id: "spotify",
      platform: "spotify",
      url: "",
      label: "Spotify",
      isStreaming: true
    },
    {
      id: "youtube",
      platform: "youtube",
      url: "",
      label: "YouTube"
    },
    {
      id: "tiktok",
      platform: "tiktok",
      url: "",
      label: "TikTok"
    },
    {
      id: "apple-music",
      platform: "apple-music",
      url: "",
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
          id: "release-1",
          title: "SONG TITLE",
          type: "single",
          coverArt: "",
          spotifyUrl: "",
          appleMusicUrl: "",
          youtubeMusicUrl: ""
        },
        {
          id: "release-2",
          title: "SONG TITLE",
          type: "single",
          coverArt: "",
          spotifyUrl: "",
          appleMusicUrl: "",
          youtubeMusicUrl: ""
        },
        {
          id: "release-3",
          title: "SONG TITLE",
          type: "single",
          coverArt: "",
          spotifyUrl: "",
          appleMusicUrl: "",
          youtubeMusicUrl: ""
        },
        {
          id: "release-4",
          title: "SONG TITLE",
          type: "single",
          coverArt: "",
          spotifyUrl: "",
          appleMusicUrl: "",
          youtubeMusicUrl: ""
        }
      ]
    },

    videos: {
      enabled: true,
      title: "VIDEOS",
      items: [
        {
          id: "video-1",
          title: "VIDEO TITLE",
          youtubeId: "",
          thumbnail: ""
        },
        {
          id: "video-2",
          title: "VIDEO TITLE",
          youtubeId: "",
          thumbnail: ""
        },
        {
          id: "video-3",
          title: "VIDEO TITLE",
          youtubeId: "",
          thumbnail: ""
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
