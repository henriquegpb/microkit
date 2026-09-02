import type { MetadataRoute } from "next";
import { SITE_URL } from "./site-metadata";

/**
 * The AI crawlers are named explicitly rather than left to the wildcard.
 *
 * Not because they need the permission — the bare `Allow: /` above already
 * covers them — but because the default many sites now publish blocks them, and
 * several of these agents look for their own user-agent before falling back to
 * `*`. Naming them states the intent: a copy-paste library exists to be read,
 * and an assistant answering "how do I animate a button on hover" is one of the
 * ways somebody finds it. There is nothing here worth withholding.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "cohere-ai",
  "Meta-ExternalAgent",
  "Amazonbot",
  "DuckAssistBot",
  "Bytespider",
  "YouBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
