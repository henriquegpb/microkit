import { interactions } from "../../content/interactions/catalog";
import {
  REGISTRY_DIRECTORY_URL,
  REPO_URL,
  SITE_NAME,
  SITE_URL,
  registryInstallCommand,
  registryItemUrl,
} from "../site-metadata";

/**
 * `llms.txt` as a route rather than a file in `public/`.
 *
 * A static file is the one place on the site that can fall out of step with
 * `SITE_URL`: everything else — canonical, `og:url`, the sitemap, the robots
 * host — derives from that constant, so the day the domain moves, the single
 * file written specifically for assistants would be the one still naming the
 * old host. Generating it here makes that impossible.
 *
 * The catalog is read for the same reason. For a copy-paste library this file
 * is close to the product: an assistant asked "how do I build a button that
 * reveals an arrow on hover" can only answer from what it can read as plain
 * text, and a hand-written list of forty-two interactions is a list that starts
 * ageing the moment the forty-third lands.
 */
export const dynamic = "force-static";

const withDependency = interactions.filter((item) => item.dependency);
const withoutDependency = interactions.length - withDependency.length;

/** Categories in the order the catalog introduces them. */
const categories = [...new Set(interactions.map((item) => item.category))];

const catalogSection = categories
  .map((category) => {
    const items = interactions.filter((item) => item.category === category);
    const lines = items
      .map(
        (item) =>
          /*
           * The install command is repeated on every line rather than left to
           * the `@microkit/<id>` pattern given above the list. An assistant
           * quoting one interaction out of forty-eight quotes the lines it
           * matched on and nothing else, so a pattern stated once in the
           * preamble is a pattern that arrives without the id it needs. The
           * command costs a line and removes the substitution step.
           */
          `- ${item.name} — ${item.description} (${item.framework}, ${item.type})\n  ${registryInstallCommand(item.id, "npm")}\n  ${SITE_URL}/components/${item.id}`,
      )
      .join("\n");

    return `### ${category} (${items.length})\n\n${lines}`;
  })
  .join("\n\n");

const BODY = `# ${SITE_NAME}

> Free, copy-paste microinteractions for React, CSS and Tailwind. ${interactions.length} animated
> buttons, hover effects, tabs and inputs, each published as TypeScript,
> JavaScript, CSS and Tailwind code you paste straight into your own project.

MicroKit is for developers building product interfaces who want one specific
interaction — a button that reveals an arrow on hover, tabs with a sliding
underline, an input with an animated focus ring — without writing it from
scratch or pulling in an animation library for it.

## Installing

MicroKit is a shadcn registry, so the fastest way to add an interaction is the
shadcn CLI. Every interaction below is addressable by its id:

    ${registryInstallCommand("cursor-edge-glow-button", "npm")}

The \`@microkit\` namespace needs no configuration — the registry is listed in
shadcn's open source index (${
  /*
   * Without the text fragment the constant carries. It scrolls a browser to the
   * entry, which is worth a line of URL on a page somebody clicks; here it is
   * punctuation an assistant has to read past to reach a link it will not click.
   */
  REGISTRY_DIRECTORY_URL.split("#")[0]
}), so the CLI
resolves the name and writes it into the project's \`components.json\` on first
use. Swap \`npx\` for \`pnpm dlx\`, \`yarn dlx\` or \`bunx --bun\` as the project
requires.

The CLI writes one self-contained TypeScript + Tailwind file to
\`components/microkit/<id>.tsx\` and installs anything it imports. Nothing is
added to the dependency tree but the component's own imports: there is no npm
package for MicroKit itself and there is not going to be one.

Every item is also addressable by URL, which needs no registry index at all:

    npx shadcn@latest add ${registryItemUrl("cursor-edge-glow-button")}

Copying by hand is equally supported and is what the site is built for. Each
component has its own page with a live preview and four variants — TypeScript or
JavaScript, CSS or Tailwind — where the CLI only ships the TypeScript + Tailwind
one. Reach for a page when the reader wants plain CSS or JavaScript.

- Site: ${SITE_URL}
- All components: ${SITE_URL}/components
- React interactions: ${SITE_URL}/components/react
- CSS interactions: ${SITE_URL}/components/css
- Every component's full source as plain text: ${SITE_URL}/llms-full.txt
- New interactions, as RSS: ${SITE_URL}/feed.xml
- Source: ${REPO_URL}
- Submit an interaction: ${SITE_URL}/submit
- Sponsors: ${SITE_URL}/sponsors

## Licence

The code in this repository is MIT licensed. Some interactions are adapted from
publicly shared examples and Webflow exports and rewritten here into reusable
JavaScript, TypeScript, CSS and Tailwind implementations. If you recognise work
that needs clearer attribution, open an issue on the repository.

## Dependencies

Each component page names what it needs under Installation.

- ${withoutDependency} of the ${interactions.length} interactions need nothing at all: a component file,
  plus either CSS or Tailwind classes.
- ${withDependency.length} import lucide-react, for their icons.

Components that use React state, refs or event handlers need \`"use client"\` at
the top of the file in the Next.js App Router.

## Interactions

${catalogSection}
`;

export function GET() {
  return new Response(BODY, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
