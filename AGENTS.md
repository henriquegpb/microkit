# MicroKit Repository Instructions

## Preview and published-code parity

- Every interaction preview and its published code must remain visually, behaviorally, and functionally identical.
- For interactions in `components/interactions/`, treat `component.tsx`, `styles.css`, and `source.ts` as one atomic implementation. Any change to markup, styling, sizing, animation, timing, state, accessibility, dependencies, links, icons, or reduced-motion behavior must be reflected in all applicable files in the same change.
- Keep both `componentCode` and `tailwindCode` in `source.ts` synchronized with the live preview. Each version must reproduce the preview pixel-for-pixel, including hover, focus, active, exit, and reduced-motion states.
- Published snippets must be complete and copy-ready. Do not use placeholders, omitted helpers, fake URLs, missing icons, undeclared styles, or incomplete imports. Include the stylesheet import and every helper needed to run the component.
- Ensure the JavaScript/TypeScript and CSS/Tailwind selectors on the website all produce valid, usable code. Do not rely on preview-only globals or repository-specific styling unless that dependency is explicitly included in the published snippet.
- Before completing an interaction change, compare the live implementation with every published variant, run `npm run lint`, and run `npm run build` for structural, behavioral, or styling changes that could affect compilation or rendering.
