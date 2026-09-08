/*
 * Generates the shadcn registry source files from the catalog's own sources.
 *
 * `tailwindCode` in an interaction's `source.ts` is the exact string the site
 * serves under TypeScript + Tailwind (see `CodePanel` in app/page.tsx, where
 * that path applies no transformation beyond `.trim()`). Writing the registry
 * file from that same export is what keeps the code installed by the shadcn CLI
 * byte-for-byte identical to the code shown on the site — a hand-maintained
 * second copy would be a second place for every future edit to be forgotten.
 *
 * The generated files are committed, not built on deploy: the GitHub registry
 * address `henriquegpb/microkit/<item>` reads them straight out of the
 * repository, and microkit.co's production build stays a plain `next build`.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/*
 * The interactions published through the registry.
 *
 * One entry while the distribution flow is being proven end-to-end. Converting
 * the rest of the catalog means deriving this list from
 * `components/interactions/definitions.ts` rather than extending it by hand.
 */
const ITEMS = ["cursor-edge-glow-button"];

for (const id of ITEMS) {
  // pathToFileURL, not a bare absolute path: dynamic import of an absolute
  // path is not portable to Windows.
  const source = pathToFileURL(
    `${root}/components/interactions/${id}/source.ts`,
  );
  const { tailwindCode } = await import(source.href);

  if (typeof tailwindCode !== "string" || !tailwindCode.trim()) {
    throw new Error(`${id}/source.ts does not export a usable tailwindCode`);
  }

  const target = `${root}/registry/microkit/${id}.tsx`;
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, `${tailwindCode.trim()}\n`);
  console.log(`registry/microkit/${id}.tsx`);
}
