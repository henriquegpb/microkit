/*
 * Generates the shadcn registry from the catalog's own sources.
 *
 * Writes `registry.json` and one `registry/microkit/<id>.tsx` per interaction.
 * Both are build artifacts: edit `components/interactions/`, then re-run.
 * `npx shadcn@latest build` turns them into the public JSON under `public/r`.
 *
 * `tailwindCode` in an interaction's `source.ts` is the exact string the site
 * serves under TypeScript + Tailwind (see `CodePanel` in app/page.tsx, where
 * that path applies no transformation beyond `.trim()`). Writing the registry
 * file from that same export is what keeps the code installed by the shadcn CLI
 * byte-for-byte identical to the code shown on the site — a hand-maintained
 * second copy would be a second place for every future edit to be forgotten.
 *
 * Every field below is derived from `definitions.ts`, for the same reason: a
 * hand-written registry.json would be forty-three more things to keep in sync.
 */
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { registerHooks } from "node:module";
import { dirname, resolve } from "node:path";
import { existsSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/*
 * The catalog is written for a bundler, not for Node: `definitions.ts` imports
 * `./cursor-edge-glow-button/definition` without an extension and the
 * definitions import `@/content/interactions/types`. Node's ESM resolver
 * handles neither, so both are taught here rather than by rewriting forty-three
 * import statements to suit a build script.
 */
registerHooks({
  resolve(specifier, context, next) {
    const spec = specifier.startsWith("@/")
      ? pathToFileURL(`${ROOT}/${specifier.slice(2)}`).href
      : specifier;
    try {
      return next(spec, context);
    } catch (error) {
      const base = spec.startsWith("file:")
        ? spec
        : new URL(spec, context.parentURL).href;
      for (const extension of [".ts", ".tsx", "/index.ts"]) {
        const candidate = base + extension;
        if (existsSync(fileURLToPath(candidate))) {
          return { url: candidate, shortCircuit: true };
        }
      }
      throw error;
    }
  },
});

const { interactionDefinitions } = await import(
  pathToFileURL(`${ROOT}/components/interactions/definitions.ts`).href
);

/*
 * Registry categories are the words somebody searches a registry index for.
 * The catalog's own `category` and `type` are written for the gallery's
 * sidebar — "Click feedback" is a heading, not a query — so they are mapped,
 * and an unrecognised value fails the build rather than shipping a wrong tag.
 */
const CATEGORY_TAG = {
  "Click feedback": "button",
  Inputs: "input",
  Navigation: "navigation",
};
const TYPE_TAG = { Hover: "hover", Focus: "focus", Click: "click" };

/*
 * Declared dependencies are read from the code being shipped, not from the
 * `dependency` field on the definition. The field is optional and describes the
 * interaction; this has to describe the file, because it is what the CLI
 * installs into somebody's project.
 */
const IMPORT_RE = /^import\s+(?:type\s+)?(?:[\s\S]*?\s+from\s+)?"([^"]+)";?$/gm;

function dependenciesOf(source, id) {
  const specifiers = [...source.matchAll(IMPORT_RE)].map((match) => match[1]);
  const local = specifiers.filter(
    (specifier) => specifier.startsWith(".") || specifier.startsWith("@/"),
  );
  if (local.length) {
    throw new Error(
      `${id}: tailwindCode imports ${local.join(", ")} — the published file must be self-contained`,
    );
  }
  // React is the peer every consumer already has; the CLI must not install it.
  return [...new Set(specifiers.filter((specifier) => specifier !== "react"))];
}

const outputDir = `${ROOT}/registry/microkit`;
rmSync(outputDir, { recursive: true, force: true });
mkdirSync(outputDir, { recursive: true });

const items = [];
for (const definition of interactionDefinitions) {
  const { id, name, description, category, type, tailwindCode } = definition;

  if (typeof tailwindCode !== "string" || !tailwindCode.trim()) {
    throw new Error(`${id}: source.ts does not export a usable tailwindCode`);
  }
  const categoryTag = CATEGORY_TAG[category];
  const typeTag = TYPE_TAG[type];
  if (!categoryTag) throw new Error(`${id}: unmapped category "${category}"`);
  if (!typeTag) throw new Error(`${id}: unmapped type "${type}"`);

  const source = tailwindCode.trim();
  /*
   * The CLI drops a comment that opens the file — and only that one; a comment
   * after the "use client" directive, at the end of a line, or anywhere further
   * down survives. Left alone it would silently install code that differs from
   * the code on the site, which is the one thing this generator exists to
   * prevent, so it fails here instead. Moving the comment down a line fixes it.
   */
  if (source.startsWith("//") || source.startsWith("/*")) {
    throw new Error(
      `${id}: tailwindCode opens with a comment, which the shadcn CLI strips on install. Move it below the first statement.`,
    );
  }
  writeFileSync(`${outputDir}/${id}.tsx`, `${source}\n`);

  const dependencies = dependenciesOf(source, id);
  items.push({
    name: id,
    type: "registry:component",
    title: name,
    description,
    author: "henriquegpb <https://github.com/henriquegpb>",
    categories: [categoryTag, typeTag],
    docs: `Live preview and the CSS, JavaScript and Tailwind variants: https://microkit.co/components/${id}`,
    ...(dependencies.length ? { dependencies } : {}),
    files: [
      {
        path: `registry/microkit/${id}.tsx`,
        type: "registry:component",
        target: `@components/microkit/${id}.tsx`,
      },
    ],
  });
}

writeFileSync(
  `${ROOT}/registry.json`,
  `${JSON.stringify(
    {
      $schema: "https://ui.shadcn.com/schema/registry.json",
      name: "microkit",
      homepage: "https://microkit.co",
      items,
    },
    null,
    2,
  )}\n`,
);

const withDependencies = items.filter((item) => item.dependencies).length;
console.log(
  `registry.json + ${readdirSync(outputDir).length} files in registry/microkit (${withDependencies} with npm dependencies)`,
);
