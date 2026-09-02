import { interactions } from "../content/interactions/catalog";

export const SITE_URL = "https://www.microkit.co";
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
