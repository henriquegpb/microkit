# Interaction components

Each interaction owns four files:

- `component.tsx` — the live React component used by the gallery preview.
- `styles.css` — the component's standalone CSS.
- `source.ts` — copy-ready CSS and Tailwind source shown in the code panel.
- `definition.ts` — gallery metadata and dependency information.

Add new components by creating a matching folder and registering it in `registry.tsx` and `definitions.ts`.
