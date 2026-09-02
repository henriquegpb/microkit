import { ChevronDown } from "lucide-react";
import { interactions } from "@/content/interactions/catalog";
import { StructuredData } from "@/components/structured-data";

const withDependency = interactions.filter((item) => item.dependency).length;
const withoutDependency = interactions.length - withDependency;

/**
 * Questions in the form they get asked, not the form the library is built in.
 *
 * Somebody about to copy a button does not search for "microinteraction
 * primitives" — they ask whether they are allowed to ship it, whether it drags
 * in a package, and whether it survives their Tailwind version. These are those
 * sentences, and the answers are the shortest true replies to them.
 *
 * The counts are read from the catalog so they cannot go stale, and the licence
 * answer says exactly what the repository's own Credits section says. One array
 * drives both the visible list and the FAQPage schema: an answer in structured
 * data that the page does not also make in words is a guideline violation, and
 * a claim a machine will go on repeating with confidence.
 */
export const FAQ = [
  {
    q: "Can I use these in a commercial project?",
    a: "Yes. The code in this repository is MIT licensed. Some interactions are adapted from publicly shared examples and Webflow exports and rewritten here — if you recognise work that needs clearer attribution, open an issue.",
  },
  {
    q: "Do I need to install any dependencies?",
    a: `Usually not. ${withoutDependency} of the ${interactions.length} interactions need nothing at all: a component file and either CSS or Tailwind classes. The other ${withDependency} import lucide-react for their icons, and every component page names what it needs under Installation.`,
  },
  {
    q: "Is there an npm package to install?",
    a: "No, and that is deliberate. You open an interaction, choose TypeScript or JavaScript and CSS or Tailwind, copy it, and it is yours to edit. Nothing is added to your package.json except lucide-react when a component draws an icon.",
  },
  {
    q: "Does it work with Tailwind v4?",
    a: "Yes. Every interaction ships a Tailwind version alongside the CSS one, written with core utilities and arbitrary values that behave the same in v3 and v4. This site is itself built on Tailwind v4.",
  },
  {
    q: "Do the components work with the Next.js App Router?",
    a: 'Yes. Most are markup and CSS with no client state, so they drop straight into a server component. Anything using React state, a ref or an event handler needs "use client" at the top of its file — add it if the snippet you copied does not already have it.',
  },
  {
    q: "Can I submit my own interaction?",
    a: "Yes. The submit page takes your component code and an optional screenshot and prefills a GitHub issue, which you review and open yourself.",
  },
] as const;

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

/**
 * Native `<details>` rather than state and a height transition.
 *
 * Three things come free with it and none of them are free otherwise: it works
 * before hydration, the summary is a real keyboard control, and find-in-page
 * opens the section it matched. It also keeps every answer in the DOM while
 * collapsed, which is what lets the FAQPage schema stay honest — an accordion
 * mounting its content on click would leave the structured data describing text
 * no crawler ever sees.
 */
export function Faq() {
  return (
    <section className="faq" aria-labelledby="faq-heading">
      <StructuredData schema={SCHEMA} />
      <h2 id="faq-heading">Questions</h2>
      <ul>
        {FAQ.map(({ q, a }) => (
          <li key={q}>
            <details>
              <summary>
                {q}
                <ChevronDown size={16} strokeWidth={1.75} aria-hidden="true" />
              </summary>
              <p>{a}</p>
            </details>
          </li>
        ))}
      </ul>
    </section>
  );
}
