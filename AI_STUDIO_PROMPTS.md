# AI Studio Prompt Pack

Use these prompts in order. Do not combine them into one giant request.

## Prompt 1 — Inspect only

You are working with an existing approved artist website template. Do not modify any files yet. Inspect the project structure, identify the main app entry point, identify the artist configuration file, and identify the reusable UI components. Read `AI_STUDIO_RULES.md` and treat it as the project preservation contract. Report what you found and make no code changes.

## Prompt 2 — Validate the master template

Run the existing project's typecheck/build process. If there are errors, fix ONLY the actual errors using the smallest possible surgical changes. Do not redesign, refactor unrelated code, replace components, remove functionality, or change the visual layout. If there are no errors, make no changes. After the project works, stop.

## Prompt 3 — Create a new artist site

Paste the generated prompt from the Artist Site Builder here.

The generated prompt will provide the artist name, hero video filename, social links, song titles, YouTube video links, and contact email. It also instructs you to research and verify the exact song's availability on Spotify, Apple Music, YouTube Music, Amazon Music, Deezer, Tidal, and SoundCloud, and to use the existing Stream / Download modal.
