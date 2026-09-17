/*
 * Records the date each interaction was first committed.
 *
 * Writes `content/interactions/published.json`, which `/feed.xml` reads. Like
 * `registry.json` it is a build artifact: run `npm run registry:build` after
 * adding an interaction and commit what changes.
 *
 * The dates are read from git rather than written into the definitions because
 * a hand-typed date is a field that can be wrong, and forty-eight of them are
 * forty-eight chances to be wrong about something nobody would notice. The
 * commit that introduced the file is the one fact about when an interaction
 * appeared that cannot drift from the thing it describes.
 *
 * Generated and committed rather than read at build time, because git is not
 * reliably a full clone on a deployment host — a shallow one has no commit that
 * added a file a year ago, and the feed would silently date everything to the
 * deploy.
 */
import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const INTERACTIONS = `${ROOT}/components/interactions`;

/*
 * The id is read out of the definition rather than taken from the directory
 * name. They usually match and sometimes do not — `focus-input/` holds an
 * interaction whose name is Focus Field — and the id is what every URL, every
 * registry item and every feed entry is keyed on.
 */
const ID_RE = /\bid:\s*"([^"]+)"/;

const published = {};
const undated = [];

for (const directory of readdirSync(INTERACTIONS, { withFileTypes: true })) {
  if (!directory.isDirectory()) continue;

  const path = `components/interactions/${directory.name}/definition.ts`;
  let source;
  try {
    source = readFileSync(`${ROOT}/${path}`, "utf8");
  } catch {
    continue;
  }

  const id = source.match(ID_RE)?.[1];
  if (!id) throw new Error(`${path}: no id found`);

  /*
   * `--diff-filter=A` lists the commits that added the file and the last line
   * is the earliest of them, which is the one that counts: a file moved or
   * restored later was still introduced when it was introduced.
   */
  const log = execFileSync(
    "git",
    ["log", "--diff-filter=A", "--format=%aI", "--", path],
    { cwd: ROOT, encoding: "utf8" },
  )
    .trim()
    .split("\n")
    .filter(Boolean);

  const addedAt = log.at(-1);
  if (addedAt) published[id] = addedAt;
  else undated.push(id);
}

/*
 * An interaction that is staged but not yet committed has no date. It is dated
 * now, which is within a commit of true and keeps it at the top of the feed
 * where a brand new component belongs. The next run reads the real date.
 */
const now = new Date().toISOString();
for (const id of undated) published[id] = now;

const sorted = Object.fromEntries(
  Object.entries(published).sort(([, a], [, b]) => b.localeCompare(a)),
);

writeFileSync(
  `${ROOT}/content/interactions/published.json`,
  `${JSON.stringify(sorted, null, 2)}\n`,
);

console.log(
  `published.json — ${Object.keys(sorted).length} interactions dated${
    undated.length ? `, ${undated.length} not yet committed` : ""
  }`,
);
