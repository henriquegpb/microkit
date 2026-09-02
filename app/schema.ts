import {
  componentsByCategory,
  interactions,
  type Interaction,
} from "../content/interactions/catalog";
import type { Metadata } from "next";
import {
  COMPONENTS_INDEX_DESCRIPTION,
  COMPONENTS_INDEX_HEADING,
  frameworkDescription,
  frameworkHeading,
  frameworkLabel,
  frameworkTitle,
  GALLERY_HEADING,
  HERO_DESCRIPTION,
  OPEN_GRAPH_IMAGE,
  REPO_URL,
  SITE_NAME,
  SITE_URL,
  TWITTER_IMAGE,
  type FrameworkRoute,
} from "./site-metadata";

/**
 * Every field below is something the rendered page also states in words.
 *
 * That is a hard rule rather than a preference. Structured data describing text
 * a crawler never sees is a guideline violation, and it is the kind of claim an
 * assistant will repeat with confidence long after the page has moved on.
 */

const componentUrl = (id: string) => `${SITE_URL}/components/${id}`;
const COMPONENTS_INDEX_URL = `${SITE_URL}/components`;

/**
 * Home: the site itself, plus the catalog the gallery renders.
 *
 * There is deliberately no `potentialAction`/`SearchAction`. The search box on
 * the home page filters client-side state and never produces a URL, so naming a
 * search endpoint would advertise a route that does not exist.
 *
 * `itemListOrder` is unordered because it is: the grid ships with three sort
 * controls, so no fixed sequence is a claim this page can make. The positions
 * are there because parsers expect them, not because they mean rank.
 */
export const homeSchema = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: HERO_DESCRIPTION,
    inLanguage: "en-US",
  },
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: GALLERY_HEADING,
    url: SITE_URL,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    mainEntity: {
      "@type": "ItemList",
      name: GALLERY_HEADING,
      numberOfItems: interactions.length,
      itemListOrder: "https://schema.org/ItemListUnordered",
      // Name and URL only. The cards show the name, category, framework and
      // type — not the description — so the description stays on the component
      // page, which is where it is actually written on screen.
      itemListElement: interactions.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: componentUrl(item.id),
      })),
    },
  },
];

/**
 * The `/components` index: the same catalog, described as a list of links.
 *
 * It repeats the home page's ItemList on purpose — that is what an index is —
 * but it carries `description` where the home page's does not, because this is
 * the page that actually prints each component's description next to its name.
 * The home cards show name, category, framework and type and nothing more.
 */
export const componentsIndexSchema = [
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: COMPONENTS_INDEX_HEADING,
    url: COMPONENTS_INDEX_URL,
    description: COMPONENTS_INDEX_DESCRIPTION,
    inLanguage: "en-US",
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    mainEntity: {
      "@type": "ItemList",
      name: COMPONENTS_INDEX_HEADING,
      numberOfItems: interactions.length,
      // Grouped by category on the page, in catalog order within each group.
      // That is a stable sequence with no sort control to disturb it, so the
      // positions here are the positions a reader sees.
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      itemListElement: componentsByCategory
        .flatMap((group) =>
          group.items.map((item) => ({
            "@type": "ListItem",
            name: item.name,
            description: item.description,
            url: componentUrl(item.id),
          })),
        )
        .map((entry, index) => ({ ...entry, position: index + 1 })),
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: SITE_NAME, item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: COMPONENTS_INDEX_HEADING,
        item: COMPONENTS_INDEX_URL,
      },
    ],
  },
];

/**
 * `/components/react` and `/components/css`: the same catalog, narrowed.
 *
 * The metadata is built here rather than in each route file so the two pages
 * cannot describe themselves differently, and so the count in the title is read
 * from the catalog instead of typed twice.
 */
const frameworkItems = (route: FrameworkRoute) =>
  interactions.filter((item) => item.framework === frameworkLabel(route));

export function frameworkMetadata(route: FrameworkRoute): Metadata {
  const items = frameworkItems(route);
  const title = frameworkTitle(route, items.length);
  const description = frameworkDescription(route, items.length);
  const canonical = `/components/${route}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      title: `${title} | ${SITE_NAME}`,
      description,
      siteName: SITE_NAME,
      locale: "en_US",
      images: [OPEN_GRAPH_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [TWITTER_IMAGE],
    },
  };
}

export function frameworkSchema(route: FrameworkRoute) {
  const items = frameworkItems(route);
  const url = `${SITE_URL}/components/${route}`;
  const heading = frameworkHeading(route);

  return [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: heading,
      url,
      description: frameworkDescription(route, items.length),
      inLanguage: "en-US",
      isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
      mainEntity: {
        "@type": "ItemList",
        name: heading,
        numberOfItems: items.length,
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          description: item.description,
          url: componentUrl(item.id),
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: SITE_NAME, item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: COMPONENTS_INDEX_HEADING,
          item: COMPONENTS_INDEX_URL,
        },
        { "@type": "ListItem", position: 3, name: heading, item: url },
      ],
    },
  ];
}

/**
 * The Installation line, as one string used by the visible block and by the
 * schema's `dependencies`. lucide-react is the only dependency in the catalog,
 * and it is there for icons.
 */
export function installationNote(item: Interaction) {
  return item.dependency
    ? `This interaction imports ${item.dependency} for its icons.`
    : "No dependencies required. Drop the component into your project.";
}

export function installationCommand(item: Interaction) {
  return item.dependency
    ? `npm install ${item.dependency}`
    : "# No installation required";
}

/**
 * A component page: the source itself, and where it sits.
 *
 * No `license`. The repository is MIT, but its own Credits section says some
 * interactions are adapted from publicly shared examples and Webflow exports —
 * so stamping MIT onto each component individually would assert, forty-two
 * times over, something the project deliberately does not assert once.
 *
 * The breadcrumb is three levels: the site, the `/components` index, and the
 * component itself as the last position. Category is still not a level — there
 * is no category route, and no breadcrumb item may point at a URL that does not
 * exist. The index is a level only because it is now a real page that links
 * here; before it existed this list stopped at two.
 */
export function componentSchema(item: Interaction) {
  const url = componentUrl(item.id);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareSourceCode",
        name: item.name,
        description: item.description,
        url,
        // What the code panel on this page actually offers: a TypeScript or
        // JavaScript component, styled with CSS or Tailwind classes.
        programmingLanguage: ["TypeScript", "JavaScript", "CSS"],
        // The eyebrow above the title reads "{category} • {framework}".
        ...(item.framework === "React" ? { runtimePlatform: "React" } : {}),
        // Verbatim from the Installation block below the code.
        dependencies: installationNote(item),
        codeRepository: REPO_URL,
        isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: SITE_NAME,
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: COMPONENTS_INDEX_HEADING,
            item: COMPONENTS_INDEX_URL,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: item.name,
            item: url,
          },
        ],
      },
    ],
  };
}
