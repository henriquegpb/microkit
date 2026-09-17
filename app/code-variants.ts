/*
 * The four variants, derived from the two the catalog stores.
 *
 * An interaction ships `tailwindCode` and `code` — the Tailwind implementation
 * and the plain-CSS one — and the site offers each in TypeScript or JavaScript,
 * which is four panels from two strings. The transforms that get there used to
 * live inside `CodePanel`, which was fine while the browser was the only thing
 * reading them. `llms-full.txt` reads them too, from a route handler, and
 * `app/page.tsx` is a client module: importing it there would drag a client
 * boundary into a plain text response.
 *
 * So they live here, in a module with no directive and no React, and both
 * callers derive their variants the same way. The rule this protects is the one
 * the registry generator already states for the CLI: what a reader copies has
 * to be what the preview ran. A second copy of the split for assistants to read
 * would be a second place for that to stop being true.
 */

/**
 * The TypeScript variant, minus the TypeScript.
 *
 * Deliberately three replacements rather than a real transform: the catalog's
 * type annotations are narrow enough to enumerate — an imported type, one event
 * parameter, a generic on `useRef` — and a parser would be a dependency bigger
 * than everything it is here to strip. A new annotation shape means a new line
 * in this function, which is the cost of not carrying a compiler.
 */
export function toJavaScript(source: string) {
  return source
    .replace(/^import type[^\n]*\n/gm, "")
    .replace(/: ReactPointerEvent<HTMLButtonElement>/g, "")
    .replace(/\buseRef<[^>]+>/g, "useRef");
}

/**
 * The plain-CSS implementation, split into the two files a reader needs.
 *
 * `code` holds the component and its stylesheet in one string, separated by the
 * first block comment that opens a line. An interaction whose CSS variant needs
 * no stylesheet has no separator, and the whole string is the component.
 */
export function splitCssVariant(source: string) {
  const separator = source.indexOf("\n/* ");
  if (separator === -1) return { component: source, css: "" };

  return {
    component: source.slice(0, separator),
    css: formatCssCode(source.slice(separator + 1)),
  };
}

export function formatCssCode(source: string) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s*\{\s*/g, " {\n  ")
    .replace(/;\s*/g, ";\n  ")
    .replace(/\s*\}/g, "\n}\n")
    .replace(/\n[ \t]*\n+/g, "\n")
    .replace(/\n  \n}/g, "\n}")
    .trim();
}
