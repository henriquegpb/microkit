import { interactions } from "../../content/interactions/catalog";
import { REPO_URL, SITE_NAME, SITE_URL } from "../site-metadata";

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
          `- ${item.name} — ${item.description} (${item.framework}, ${item.type})\n  ${SITE_URL}/components/${item.id}`,
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

There is no npm package. You open a component, choose TypeScript or JavaScript
and CSS or Tailwind, and copy the code. Each component has its own page with a
live preview and all four variants.

- Site: ${SITE_URL}
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
