# MicroKit UI

MicroKit UI is a free, developer-focused library of copy-paste microinteractions. Every library item has a live preview and the code needed to reproduce it.

This repository currently contains the product shell, gallery, playground, and a sample interaction catalog. It is intentionally structured to make adding a large number of interactions predictable.

## Quick start

**Requirements:** Node.js 20 or newer and npm.

```bash
git clone <your-fork-url>
cd microkit
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### If the development server cannot start

Next.js uses Turbopack by default. If its native compiler is unavailable on your machine, use the Webpack fallback:

```bash
npm run dev -- --webpack
```

This is also the command to use in this checkout, where the native macOS SWC binary cannot load.

## Project structure

```text
app/
  layout.tsx                     App metadata and root layout
  page.tsx                       Gallery and playground UI
  globals.css                    Global visual system and preview styles

content/
  interactions/
    catalog.ts                   Interaction metadata, filters, and copyable code
    README.md                    Catalog-specific authoring notes

public/
  assets/                        Every static file delivered to website visitors
    interactions/<interaction>/  Component-specific images, media, or downloads
    brand/                       Shared logos and product assets
    legacy/                      Unused starter files; do not add new work here
```

## Add an interaction

Each interaction starts as an entry in the catalog. This makes it searchable, filterable, and available in the gallery without duplicating metadata.

1. In `content/interactions/catalog.ts`, add an `Interaction` object.
2. Use a unique kebab-case `id`—for example, `command-palette`.
3. Add the matching isolated preview in the `Demo` component in `app/page.tsx`.
4. Include copyable implementation code in the `code` field.
5. Declare any external package in `dependency`; this is shown to visitors.
6. Place any user-visible media in `public/assets/interactions/<id>/` and reference it as `/assets/interactions/<id>/<file>`.
7. Verify the gallery, playground, keyboard behavior, and copy action.

Example catalog entry:

```ts
{
  id: "command-palette",
  name: "Command Palette",
  category: "Navigation",
  framework: "React",
  type: "Keyboard",
  description: "A focused command menu for application shortcuts.",
  code: "<CommandPalette open={open} onOpenChange={setOpen} />",
}
```

## Contribution guidelines

- Keep interactions small, useful, and focused on a single behavior.
- Previews must be genuinely interactive; do not use videos or GIFs as replacements.
- Preserve keyboard navigation, visible focus states, and reduced-motion behavior.
- Avoid unnecessary dependencies. Label any dependency required by a component.
- Use the orange accent (`#F97316`) only for active, selected, status, and focus states.
- Keep gallery metadata quiet—the preview should be the visual focus.
- Do not add static visitor assets outside `public/assets/`.
- Do not commit build output, dependencies, secrets, or generated local files.

## Verify your work

Run these checks before opening a pull request:

```bash
npm run lint
npm run build -- --webpack
```

The Webpack build is the reliable verification command in this checkout. `npm run build` can use Turbopack and needs a working native SWC binary.

## Pull requests

Keep pull requests focused. Include a short description of the interaction or UI behavior, mention any dependency added, and describe how you tested keyboard, mouse/touch, and mobile behavior. Add screenshots or a short recording when a visual change is easier to understand that way.

## License

License information has not yet been added to this repository.
