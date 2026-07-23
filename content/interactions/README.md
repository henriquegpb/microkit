# Interaction catalog

Each entry in `catalog.ts` is the source of truth for a gallery item: its filters, description, dependency labels, and code exposed to visitors.

When adding an interaction:

1. Add its metadata and copyable code to `catalog.ts`.
2. Add the matching isolated preview to `Demo` in `app/page.tsx` (eventually these can move to `components/previews/`).
3. Put any user-visible image, video, font, or downloadable file in `public/assets/interactions/<interaction-id>/` and refer to it from the app as `/assets/interactions/<interaction-id>/<file>`.

This keeps content, UI behavior, and public assets easy to locate as the library grows.
