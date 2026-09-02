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

export const SITE_TITLE = "MicroKit UI — Microinteractions for developers";
export const SITE_DESCRIPTION =
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
