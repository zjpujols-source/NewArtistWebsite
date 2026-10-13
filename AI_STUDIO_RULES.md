# AI STUDIO — TEMPLATE PRESERVATION CONTRACT

## 1. ROLE

You are maintaining and personalizing an **existing approved artist website template**.

You are NOT designing a new website.

The current implementation is the source of truth. Preserve it unless the user explicitly requests a design or functionality change.

## 2. NON-NEGOTIABLE PRESERVATION RULES

Never:

- rebuild the website from scratch
- replace the existing layout with another layout
- redesign the navigation
- remove tabs or components to make an error disappear
- replace working components with simplified alternatives
- change animations or interactions as a workaround
- invent artist facts, links, releases, dates, venues, images, or social accounts
- refactor unrelated code while fixing an error
- make broad "improvements" that were not requested

A working existing component is preferable to a newly invented implementation.

## 3. FILE OWNERSHIP

### Artist data — normally editable

- `src/config/artistConfig.ts`

This is the primary personalization surface.

### Structural/template files — preserve

- `src/App.tsx`
- `src/index.css`
- `src/main.tsx`
- `src/components/Navbar.tsx`
- `src/components/Hero.tsx`
- `src/components/Footer.tsx`
- `src/components/MusicTab.tsx`
- `src/components/VideosTab.tsx`
- `src/components/LiveTab.tsx`
- `src/components/ShopTab.tsx`
- `src/components/ContactTab.tsx`
- `src/components/RecentVideoSection.tsx`
- `src/components/StreamModal.tsx`
- `src/components/TemplateCustomizer.tsx`
- `src/types/artist.ts`

These files may be edited only when a specific technical issue genuinely requires it or the user explicitly requests a structural change. If one must be changed, make the smallest possible patch.

## 4. ERROR-FIXING PROTOCOL

When a compiler, typecheck, runtime, or build error occurs:

1. Read the exact error.
2. Identify the exact file and relevant line/code path.
3. Determine the root cause.
4. Make the smallest change that fixes that root cause.
5. Re-run the relevant check.
6. Stop when it works.

Do not respond to an error by rebuilding the app, swapping frameworks, replacing components, removing features, or changing the design.

If the error is caused by missing data, fix the data/configuration rather than rewriting the component.

## 5. PERSONALIZATION PROTOCOL

When given a new artist:

1. Keep the existing page structure exactly the same.
2. Map the supplied artist information into the existing `ArtistConfig` structure.
3. Prefer changing only `src/config/artistConfig.ts`.
4. Preserve all component names and existing behavior.
5. Do not invent missing information.
6. Do not create new sections just because the artist has information that is not currently represented.

If the supplied information does not fit an existing config field, explain what is missing and wait for a specific instruction rather than restructuring the app.

## 6. UNKNOWN DATA

Never hallucinate:

- songs
- release dates
- streaming URLs
- social handles
- YouTube videos
- tour dates
- venues
- merch products
- booking/management contacts
- awards or achievements
- biographies
- statistics
- photographs or artist-specific media

Use provided data only. Existing generic placeholders may remain until replaced.

## 7. CHANGE BOUNDARY

Before editing a file, ask:

> Is this file directly responsible for the requested change or reported error?

If no, do not edit it.

If yes, make the minimum necessary edit.

## 8. DO NOT USE REDESIGN LANGUAGE AS A SOLUTION

Requests such as "fix", "make it work", "resolve the error", or "get this running" do NOT authorize a redesign.

A technical fix must preserve the existing UI.

## 9. VALIDATION CHECKLIST

After any change, verify:

- the project builds/typechecks
- all existing tabs remain
- existing navigation remains
- existing components remain
- existing styling remains
- existing animations/interactions remain
- responsive behavior remains
- no artist facts were invented
- no unrelated files were changed
- no functionality was removed

If the requested task is complete, STOP.

## 10. PRIORITY ORDER

When deciding what to do, follow this priority order:

1. Preserve existing design and functionality.
2. Fix the smallest root cause of the requested technical problem.
3. Personalize artist data through `artistConfig.ts`.
4. Make no unrelated changes.

**MINIMAL PATCH > REFACTOR > REBUILD**

A rebuild is prohibited unless the user explicitly asks for a rebuild.

## MUSIC PLATFORM DISCOVERY

When the user provides an artist name and song title but does not provide platform URLs, research the exact recording and populate only verified URLs for platforms supported by the existing `Release` type: Spotify, Apple Music, YouTube Music, Amazon Music, Deezer, Tidal, SoundCloud, and Songlink when appropriate.

Do not fabricate links or substitute generic platform search pages when an exact release URL cannot be verified.

The existing `StreamModal` is the approved platform picker. Do not replace it with a new music player or modal. It must show only platforms for which a verified URL is present.

## ARTIST IMAGERY

Do not add artist profile photos, gallery images, stock photos, or invented imagery. The intended visual media are the hero/background video, YouTube thumbnails, and verified official release artwork for music.

## VIDEO METADATA

The Videos tab does not need views, dates, or duration metadata. Use the existing YouTube player and YouTube thumbnail behavior. Leave unused metadata fields empty.

# HERO VIDEO PERFORMANCE RULES

Hero/background videos are an important part of this template and must be optimized for fast loading, especially on mobile and cellular connections.

## HERO VIDEO REQUIREMENTS

Every hero/background video must meet these requirements:

* Target resolution: **720p**
* Format: **MP4 / H.264**
* Target file size: approximately **1–3 MB** for a typical 8–10 second loop
* Remove audio from hero/background videos unless audio is explicitly required
* Do NOT use a large 1080p/high-bitrate source file directly as the website's background video
* The hero video must be muted
* The hero video must autoplay
* The hero video must loop
* The hero video must use `playsInline` for mobile
* Prefer `preload="metadata"` rather than `preload="auto"`
* The hero video must have a poster image

## WHEN A NEW HERO VIDEO IS PROVIDED

Before adding a new hero video to the project:

1. Inspect the video's file size, resolution, codec, bitrate, frame rate, duration, and whether it contains audio.
2. If the video is already appropriately optimized, use it.
3. If the video is too large or unnecessarily high resolution/bitrate, create an optimized version.
4. The optimized version should target approximately 720p and 1–3 MB for a typical short background loop.
5. Remove unnecessary audio from the background video.
6. Generate a poster image from a representative frame of the video.
7. Place the optimized video and poster in the appropriate `/public` directory.
8. Update the existing hero configuration to point to the optimized video.
9. Update the existing Hero component to use the poster if necessary.

## LOADING BEHAVIOR

The poster image must appear immediately while the hero video is loading.

The user must never be presented with an unnecessary black or empty hero area simply because the video has not loaded yet.

The intended behavior is:

POSTER APPEARS → VIDEO LOADS → VIDEO PLAYS → VIDEO LOOPS

If the video cannot load because of a slow connection or another temporary problem, the poster should remain visible.

Do not redesign the hero section to solve video-loading problems.

## MOBILE

The hero video must work correctly on mobile devices.

Use the existing hero implementation and make only the minimum technical changes necessary to ensure:

* autoplay works when allowed
* the video is muted
* `playsInline` is present
* the video loops
* the poster displays while loading
* the video does not create unnecessary bandwidth usage

Do not create a separate mobile website or redesign the hero for mobile.

## IMPORTANT: PRESERVE THE TEMPLATE

These performance changes must NOT change the approved visual design.

Do NOT:

* redesign the hero
* change the hero layout
* replace the hero component
* remove the background video
* add new sections
* change navigation
* change animations
* replace the existing styling

The goal is simply to make the existing hero video **load faster and behave reliably on mobile**.

## MINIMAL-PATCH RULE

If the existing Hero component already satisfies these requirements, do not modify it.

If a change is necessary, make the smallest possible technical change.

After the performance fix works, STOP.

Do not make unrelated improvements or refactors.

The project's /public directory is the permanent location for hero media. The hero video must be /public/hero-video.mp4 and the poster must be /public/hero-poster.jpg. Do not create alternate media folders or move these files elsewhere.