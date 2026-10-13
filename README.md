# Artist Website Template — AI Studio Master

This is the **master reusable artist website template**. It is designed to be imported into Google AI Studio and reused for multiple artists.

## Core rule

**Preserve the existing website. Personalize data. Repair bugs surgically. Do not redesign.**

The approved visual design, layout, navigation, components, animations, tabs, responsive behavior, and functionality are already implemented.

## Project structure

- `src/config/artistConfig.ts` — primary artist personalization file.
- `src/types/artist.ts` — configuration/type contract.
- `src/components/` — approved reusable UI components.
- `src/App.tsx` — application composition; treat as structural/locked.
- `src/index.css` — approved styling; treat as structural/locked.
- `public/hero-bg.mp4` — generic fallback hero video.

## AI Studio workflow

1. Import this folder as the project.
2. Tell AI Studio to inspect the project without changing it.
3. Ask it to run the existing build/typecheck and fix only genuine errors.
4. Only after the template is clean, provide artist information.
5. Ask it to update `src/config/artistConfig.ts` only.
6. Do not ask it to "rebuild", "modernize", "improve the design", or "make a new site" unless a redesign is actually intended.

## Personalization

Artist-specific content should normally be changed in `src/config/artistConfig.ts`:

- artist name
- tagline, genre, location
- biography
- hero/profile/gallery media
- theme/accent color
- social/streaming links
- releases and songs
- videos
- live dates
- shop items
- contact information

If information is missing, leave the existing placeholder/empty value. **Do not invent artist facts or links.**

## Error policy

For a build/type error, identify the exact source, make the smallest fix, and stop once the project works. Do not rewrite components or remove features as an error workaround.

See `AI_STUDIO_RULES.md` for the full preservation contract.
