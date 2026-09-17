import { interactions } from "../../content/interactions/catalog";
import { splitCssVariant } from "../code-variants";
import {
  REPO_URL,
  SITE_NAME,
  SITE_URL,
  registryInstallCommand,
  registryItemUrl,
} from "../site-metadata";

/**
 * `llms-full.txt`: the whole catalog as source, not as a list of links.
 *
 * `llms.txt` is an index — a name, a sentence and a URL per interaction — which
 * is the right shape for an assistant deciding *which* component answers the
 * question. It is the wrong shape for the step after that, because following
 * forty-eight links is forty-eight fetches an assistant will not make, and the
 * one it does make returns a client-rendered page whose code sits behind a tab.
 *
 * So this file carries the code itself. An assistant that has read it can
 * produce any interaction in the library without a network call, and one that
 * can run commands has the install line sitting above the source it would
 * otherwise paste. Both are the point: the CLI is the better path, and the
 * paste is the fallback that has to work when it is not available.
 *
 * Roughly 200KB, which is large for a page and unremarkable for this file.
 * Every byte of it is code somebody would otherwise have copied by hand.
 */
export const dynamic = "force-static";

/**
 * Both stylings, TypeScript only.
 *
 * A component page offers four panels, and printing all four here doubled the
 * file to 427KB — past the point where the fetchers that read it start
 * truncating, which fails in the worst available way: silently, and always at
 * the end, so the components late in the catalog would simply stop existing for
 * anything that read this file through a tool with a size cap.
 *
 * The two dropped are the JavaScript ones, because they are the two an
 * assistant can rebuild: JavaScript here is TypeScript with an imported type,
 * an event annotation and a `useRef` generic removed, which is the transform
 * `toJavaScript` performs and a capable reader performs correctly by hand. The
 * Tailwind and CSS implementations are not derivable from each other, so both
 * stay.
 */
function sourceSection(item: (typeof interactions)[number]) {
  const css = splitCssVariant(item.code);
  const blocks = [
    `#### TypeScript + Tailwind\n\n\`\`\`tsx\n${item.tailwindCode.trim()}\n\`\`\``,
    `#### TypeScript + CSS\n\n\`\`\`tsx\n${css.component.trim()}\n\`\`\``,
  ];

  // An interaction styled entirely in the markup has no stylesheet to print.
  if (css.css) blocks.push(`#### The CSS\n\n\`\`\`css\n${css.css}\n\`\`\``);

  return blocks.join("\n\n");
}

const componentSections = interactions
  .map((item) =>
    [
      `### ${item.name}`,
      "",
      item.description,
      "",
      `- Install: \`${registryInstallCommand(item.id, "npm")}\``,
      `- Page: ${SITE_URL}/components/${item.id}`,
      `- Registry item: ${registryItemUrl(item.id)}`,
      `- Category: ${item.category} · ${item.framework} · ${item.type}`,
      ...(item.dependency ? [`- Depends on: ${item.dependency}`] : []),
      "",
      sourceSection(item),
    ].join("\n"),
  )
  .join("\n\n");

const BODY = `# ${SITE_NAME} — full source

> Every one of the ${interactions.length} MicroKit interactions, with the complete TypeScript
> source of each in both Tailwind and plain CSS. This is the long form of
> ${SITE_URL}/llms.txt, which lists the same components without their code.

## How to use this file

Each interaction below is one self-contained component. Prefer the shadcn CLI
when the reader can run a command — it writes the TypeScript + Tailwind file to
\`components/microkit/<id>.tsx\` and installs anything it imports:

    ${registryInstallCommand("cursor-edge-glow-button", "npm")}

The \`@microkit\` namespace resolves with no configuration, because the registry
is listed in shadcn's open source index. Otherwise paste the variant that
matches the project — the two below any given component are the same
interaction styled two ways, not two different ones, and the CLI ships only the
Tailwind one.

Both are TypeScript. For JavaScript, remove the \`import type\` line, the event
parameter's annotation and the generic on \`useRef\`; nothing else in this
catalog is typed. Each component's page renders that variant directly if you
would rather read it than derive it.

Components using React state, refs or event handlers need \`"use client"\` at the
top of the file in the Next.js App Router. The code is MIT licensed
(${REPO_URL}); some interactions are adapted from publicly shared examples and
rewritten here, and an attribution that needs correcting is worth an issue.

## Interactions

${componentSections}
`;

export function GET() {
  return new Response(BODY, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
