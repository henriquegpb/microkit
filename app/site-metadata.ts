import { interactions } from "../content/interactions/catalog";

export const SITE_URL = "https://microkit.co";
export const REPO_URL = "https://github.com/henriquegpb/microkit";
export const SITE_NAME = "MicroKit UI";

/**
 * Two strings the home page renders and the JSON-LD repeats.
 *
 * They live here rather than inline in the JSX because the rule for structured
 * data is that every field has to be something the page also says in words. The
 * only way that stays true as the copy is edited is for both to read the same
 * constant.
 */
export const HERO_DESCRIPTION =
  "MicroKit UI is a component library for developers who care about the experience behind every interaction.";
export const GALLERY_HEADING = "Explore micro interactions";

/**
 * A component page's title, in the words somebody types.
 *
 * "Sliding Send Button" is what the interaction is called in this repository
 * and is not a phrase anybody searches for. `framework` and `type` are already
 * on the page — the eyebrow above the title reads "{category} • {framework}"
 * and the card meta carries the type — so appending them adds the query
 * ("css hover animation", "react click animation") without adding a claim.
 *
 * Derived rather than authored per component: forty-two hand-written titles is
 * forty-two things to forget when the forty-third lands.
 */
export function componentTitle(item: {
  name: string;
  framework: string;
  type: string;
}) {
  return `${item.name} — ${item.framework} ${item.type.toLowerCase()} animation`;
}

export function componentDescription(item: { description: string }) {
  return `${item.description} Free copy-paste code in TypeScript, JavaScript, CSS and Tailwind.`;
}

/**
 * The two framework routes.
 *
 * Framework and not category: the catalog splits 33 CSS / 9 React, while the
 * categories split 35 / 6 / 1 — one category holds nearly everything and
 * another holds a single interaction, which makes for one page that duplicates
 * the index and two that are too thin to deserve a URL. "css hover effects" is
 * also a phrase people search; "click feedback components" is not.
 */
export const FRAMEWORK_ROUTES = ["react", "css"] as const;
export type FrameworkRoute = (typeof FRAMEWORK_ROUTES)[number];

export const frameworkLabel = (route: FrameworkRoute) =>
  route === "react" ? "React" : "CSS";

export function frameworkHeading(route: FrameworkRoute) {
  return `${frameworkLabel(route)} microinteractions`;
}

export function frameworkTitle(route: FrameworkRoute, count: number) {
  return route === "react"
    ? `${count} React animated button components`
    : `${count} CSS hover effects & button animations`;
}

export function frameworkDescription(route: FrameworkRoute, count: number) {
  return route === "react"
    ? `${count} copy-paste React microinteractions: animated buttons, tabs and hover effects, each with a live preview and TypeScript, JavaScript and Tailwind code.`
    : `${count} copy-paste CSS microinteractions: button hover effects, animated links and focus states, each with a live preview and plain CSS or Tailwind code.`;
}

/*
 * The `/components` index.
 *
 * Same rule as above: the heading and the paragraph below it are constants
 * because the CollectionPage schema names them, and because the page's whole
 * job is to be the one place where every component is reachable by a link whose
 * text is the component's own name. If the copy and the schema can drift, the
 * page stops being a reliable description of itself.
 *
 * The title is written in the words somebody types, and stays short enough that
 * appending "| MicroKit UI" still fits in a result.
 */
export const COMPONENTS_INDEX_HEADING = "All components";
export const COMPONENTS_INDEX_TITLE = `All ${interactions.length} components — buttons, tabs and inputs`;
export const COMPONENTS_INDEX_DESCRIPTION = `Every MicroKit UI microinteraction in one list: ${interactions.length} animated buttons, hover effects, tabs and inputs, each with a live preview and copy-paste React, CSS and Tailwind code.`;

/*
 * Two registers, deliberately.
 *
 * `SITE_TITLE` and `SITE_DESCRIPTION` are the only text a search engine or an
 * assistant sees before deciding whether this page answers the question, so
 * they are written in the words somebody types — "copy-paste microinteractions",
 * "css hover effects" — and they name what is actually in the catalog. The
 * count is read from the catalog so the sentence cannot drift from the grid.
 *
 * `SOCIAL_*` keeps the brand voice, because by the time somebody sees a card
 * they arrived through a person rather than a query. These two strings are also
 * what the generated OG image renders, so they are the ones that must not move
 * without someone looking at the picture.
 */
export const SITE_TITLE =
  "MicroKit UI — Copy-paste React & CSS microinteractions";
export const SITE_DESCRIPTION = `${interactions.length} free copy-paste microinteractions for React, CSS and Tailwind — animated buttons, hover effects, tabs and inputs. No package to install, MIT licensed.`;

export const SOCIAL_TITLE = "MicroKit UI — Microinteractions for developers";
export const SOCIAL_DESCRIPTION =
  "Copy-paste microinteractions for modern product interfaces.";
export const SOCIAL_IMAGE_ALT =
  "MicroKit UI — Copy-paste microinteractions for modern product interfaces";

export const OPEN_GRAPH_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: SOCIAL_IMAGE_ALT,
};

export const TWITTER_IMAGE = {
  url: "/twitter-image",
  alt: SOCIAL_IMAGE_ALT,
};
