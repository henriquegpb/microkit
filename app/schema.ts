import { interactions, type Interaction } from "../content/interactions/catalog";
import {
  GALLERY_HEADING,
  HERO_DESCRIPTION,
  REPO_URL,
  SITE_NAME,
  SITE_URL,
} from "./site-metadata";

/**
 * Every field below is something the rendered page also states in words.
 *
 * That is a hard rule rather than a preference. Structured data describing text
 * a crawler never sees is a guideline violation, and it is the kind of claim an
 * assistant will repeat with confidence long after the page has moved on.
 */

const componentUrl = (id: string) => `${SITE_URL}/components/${id}`;

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
 * The breadcrumb is two levels because the last position of a BreadcrumbList is
 * the current page, and the current page is the component. Category is not a
 * level: there is no category route, and no breadcrumb item may point at a URL
 * that does not exist. `/components` has no index page either.
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
            name: item.name,
            item: url,
          },
        ],
      },
    ],
  };
}
