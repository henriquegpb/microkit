/**
 * Emits one JSON-LD block and nothing else.
 *
 * Kept as a component so every schema on the site is serialised the same way,
 * and so each one can be built from the same data the page renders. Structured
 * data that drifts from the visible page is worse than none: it is both a
 * guideline violation and a claim a machine will repeat confidently.
 */
export function StructuredData({ schema }: { schema: object }) {
  return (
    <script
      type="application/ld+json"
      // Authored in this repository from the catalog, never user input. This is
      // the documented way to emit JSON-LD from the App Router.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
