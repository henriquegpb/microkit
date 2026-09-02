"use client";

import { useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
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

const OPEN_DURATION = 260;
const CLOSE_DURATION = 200;
const EASING = "cubic-bezier(.16,1,.3,1)";
/** Breathing room left below an answer that had to be scrolled into view. */
const REVEAL_MARGIN = 20;

/**
 * The element that actually scrolls, which is not a fixed one.
 *
 * `.gallery-main` and `.gallery-workspace` are both `overflow-y:auto`, and
 * which of the two holds the overflow depends on the viewport — the workspace
 * drops its sponsor rail under 1180px. Asking the DOM which ancestor is really
 * scrolling right now is shorter than encoding that rule twice.
 */
function scrollParent(node: HTMLElement) {
  for (let el = node.parentElement; el; el = el.parentElement) {
    const overflowY = getComputedStyle(el).overflowY;
    if (
      (overflowY === "auto" || overflowY === "scroll") &&
      el.scrollHeight > el.clientHeight
    ) {
      return el;
    }
  }
  return null;
}

/**
 * One question. Native `<details>`, with the open and close animated by hand.
 *
 * The element stays native for the three things that are free with it and free
 * nowhere else: it works before hydration, the summary is a real keyboard
 * control, and find-in-page opens the section it matched. It also keeps every
 * answer in the DOM while collapsed, which is what lets the FAQPage schema stay
 * honest — an accordion mounting its content on click would leave the
 * structured data describing text no crawler ever sees.
 *
 * What is not free is the animation: a browser opens and closes `<details>` in
 * one frame. So the click is intercepted, and the panel's height is animated
 * between 0 and its measured height. `details.open` is set at the start of an
 * opening and only at the end of a closing, because the content has to still be
 * laid out while it collapses.
 *
 * `expanded` tracks intent rather than the attribute, for the same reason: on
 * the way out the two disagree for the length of the animation, and it is the
 * intent that the chevron should follow.
 */
function FaqEntry({ q, a }: { q: string; a: string }) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<Animation | null>(null);
  const [expanded, setExpanded] = useState(false);

  /**
   * Only when the answer would open below the fold, and only by as much as it
   * takes — never past the question itself, or a long answer would scroll the
   * thing you just clicked off the top of the screen.
   *
   * The jump is deliberate rather than smoothed: it runs after the expand has
   * finished, so a second animation on top of it would read as drift.
   */
  const revealIfClipped = () => {
    const details = detailsRef.current;
    if (!details) return;
    const scroller = scrollParent(details);
    if (!scroller) return;

    const item = details.getBoundingClientRect();
    const view = scroller.getBoundingClientRect();
    const clipped = item.bottom - view.bottom + REVEAL_MARGIN;
    if (clipped <= 0) return;

    const untilQuestionLeaves = Math.max(0, item.top - view.top);
    scroller.scrollBy({
      top: Math.min(clipped, untilQuestionLeaves),
      behavior: "instant",
    });
  };

  const toggle = (event: ReactMouseEvent<HTMLElement>) => {
    const details = detailsRef.current;
    const panel = panelRef.current;
    if (!details || !panel) return;

    event.preventDefault();

    // Measured before the running animation is cancelled: cancelling reverts
    // the panel to its base height, and a click mid-flight should carry on from
    // wherever it had got to.
    const from = panel.getBoundingClientRect().height;
    animationRef.current?.cancel();
    animationRef.current = null;

    const opening = !expanded;
    setExpanded(opening);
    if (opening) details.open = true;

    const to = opening ? panel.scrollHeight : 0;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      details.open = opening;
      if (opening) revealIfClipped();
      return;
    }

    const animation = panel.animate(
      { height: [`${from}px`, `${to}px`] },
      { duration: opening ? OPEN_DURATION : CLOSE_DURATION, easing: EASING },
    );
    animationRef.current = animation;
    animation.onfinish = () => {
      animationRef.current = null;
      if (opening) revealIfClipped();
      else details.open = false;
    };
  };

  return (
    <li>
      <details ref={detailsRef} className={expanded ? "is-open" : undefined}>
        <summary onClick={toggle}>
          {q}
          <ChevronDown size={16} strokeWidth={1.75} aria-hidden="true" />
        </summary>
        <div className="faq-answer" ref={panelRef}>
          <p>{a}</p>
        </div>
      </details>
    </li>
  );
}

export function Faq() {
  return (
    <section className="faq" aria-labelledby="faq-heading">
      <StructuredData schema={SCHEMA} />
      <h2 id="faq-heading">Questions</h2>
      <ul>
        {FAQ.map(({ q, a }) => (
          <FaqEntry key={q} q={q} a={a} />
        ))}
      </ul>
    </section>
  );
}
