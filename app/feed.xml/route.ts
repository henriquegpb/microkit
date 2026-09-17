import { interactions } from "../../content/interactions/catalog";
import published from "../../content/interactions/published.json";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  registryInstallCommand,
} from "../site-metadata";

/**
 * An RSS feed of interactions, newest first.
 *
 * The site has no other way to be followed. Somebody who arrives from a link,
 * copies the one button they came for and leaves has no reason to return, and
 * nothing here asks them to — which is the whole problem with a library that
 * gains a component a week and announces it nowhere.
 *
 * Dates come from `published.json`, generated from git by
 * `scripts/build-published.mjs`. The catalog itself is ordered by curation —
 * what belongs at the top of the gallery — and that order is deliberately not
 * chronological, so it cannot be used here.
 */
export const dynamic = "force-static";

/**
 * The twenty most recent, not all forty-eight.
 *
 * A feed is a list of what is new, and a reader that receives the entire
 * library on the day somebody subscribes marks forty-eight things unread to
 * tell them about one. The archive is `/components`, which is linked from every
 * entry.
 */
const ENTRY_LIMIT = 20;

const publishedAt = (id: string) =>
  (published as Record<string, string>)[id] ?? "";

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const entries = [...interactions]
  .filter((item) => publishedAt(item.id))
  .sort((a, b) => publishedAt(b.id).localeCompare(publishedAt(a.id)))
  .slice(0, ENTRY_LIMIT);

function entryXml(item: (typeof interactions)[number]) {
  const url = `${SITE_URL}/components/${item.id}`;

  /*
   * The description is HTML in a CDATA section rather than a plain sentence,
   * because a feed reader renders it and what this library is selling is what
   * the interaction looks like. The image is the component's own Open Graph
   * card, which already exists per route and is already the picture that
   * represents it everywhere else.
   */
  const description = `<![CDATA[
<p><img src="${url}/opengraph-image" alt="${escapeXml(item.name)}" width="1200" height="630" /></p>
<p>${escapeXml(item.description)}</p>
<p><code>${escapeXml(registryInstallCommand(item.id, "npm"))}</code></p>
<p><a href="${url}">Live preview and the TypeScript, JavaScript, CSS and Tailwind code</a></p>
]]>`;

  return `    <item>
      <title>${escapeXml(item.name)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(publishedAt(item.id)).toUTCString()}</pubDate>
      <category>${escapeXml(item.category)}</category>
      <category>${escapeXml(item.framework)}</category>
      <description>${description}</description>
    </item>`;
}

const BODY = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${entries.map(entryXml).join("\n")}
  </channel>
</rss>
`;

export function GET() {
  return new Response(BODY, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
