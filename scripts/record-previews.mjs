/*
 * Records each interaction's preview as a short looping clip.
 *
 * The library is a visual product with no visual distribution: the catalog is
 * forty-eight things that only exist once somebody moves a pointer over them,
 * and every channel that would carry them — a newsletter, a directory card, a
 * post — wants a file, not a URL. This produces that file.
 *
 *   npm run dev                      # in another terminal
 *   node scripts/record-previews.mjs                       # all of them
 *   node scripts/record-previews.mjs --only magnetic-fill-button --gif
 *
 * Output lands in `previews/` (gitignored): an mp4 per interaction, plus a gif
 * beside it with `--gif`, for the places that still will not take a video.
 *
 * Options:
 *   --base <url>   server to record from (default http://localhost:3000)
 *   --only <id>    one interaction, repeatable
 *   --zoom <n>     render scale, see below (default 2)
 *   --gif          also write a gif
 *   --fps <n>      gif frame rate (default 20; the mp4 is always 25)
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { registerHooks } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = `${ROOT}/previews`;

/* Same resolver the registry generator installs, and for the same reason: the
 * catalog is written for a bundler and Node reads neither its extensionless
 * relative imports nor its `@/` paths. */
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

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const index = args.indexOf(`--${name}`);
  return index === -1 ? fallback : args[index + 1];
};
const only = args.reduce(
  (ids, arg, index) => (arg === "--only" ? [...ids, args[index + 1]] : ids),
  [],
);

const BASE = flag("base", "http://localhost:3000").replace(/\/$/, "");
const ZOOM = Number(flag("zoom", 2));
const GIF_FPS = Number(flag("fps", 20));
const WANT_GIF = args.includes("--gif");

const { interactionDefinitions } = await import(
  pathToFileURL(`${ROOT}/components/interactions/definitions.ts`).href
);
const targets = only.length
  ? interactionDefinitions.filter((item) => only.includes(item.id))
  : interactionDefinitions;

if (!targets.length) {
  throw new Error(`no interaction matches --only ${only.join(", ")}`);
}

const { chromium } = await import("playwright");

try {
  await fetch(BASE, { method: "HEAD" });
} catch {
  throw new Error(`nothing is serving ${BASE} — run \`npm run dev\` first`);
}

/*
 * The video is captured at CSS pixel size: Chromium ignores a device scale
 * factor when recording, so a preview shot at its natural size is a preview
 * that looks soft the moment anything scales it up. Zooming the canvas makes
 * the component render larger in CSS pixels, which is the only axis that
 * reaches the file. The viewport is sized to hold the zoomed canvas.
 */
const VIEWPORT = { width: Math.round(900 * ZOOM), height: Math.round(560 * ZOOM) };

/*
 * A full run starts from an empty directory so a renamed interaction does not
 * leave its old clip behind. A `--only` run must not: re-recording one
 * interaction to fix its gesture is the main reason the flag exists, and
 * wiping the other forty-seven to do it makes the flag useless.
 */
if (!only.length) rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
rmSync(`${OUT}/.raw`, { recursive: true, force: true });

const browser = await chromium.launch();

/*
 * What to point at, and what to keep in frame.
 *
 * The preview canvas is deliberately roomy — a button sits in it at about a
 * fifth of its width, which reads as considered on a component page and as a
 * speck on a timeline. So the clip is framed on the component rather than on
 * the canvas that holds it: the union of the demo's own children, padded, fitted
 * to 16:9 and clamped back inside the canvas.
 *
 * Padding is generous because a bounding box measured at rest is a lower bound.
 * These interactions glow past their edges and several grow on hover, and a
 * frame cut tight to the resting state clips the thing the clip exists to show.
 */
const FRAME_ASPECT = 16 / 9;

async function framing(page, canvasBox) {
  const content = await page.evaluate(() => {
    const demo = document.querySelector(".canvas .demo");
    const rects = [...(demo?.children ?? [])]
      .map((element) => element.getBoundingClientRect())
      .filter((rect) => rect.width > 0 && rect.height > 0);
    if (!rects.length) return null;

    const left = Math.min(...rects.map((rect) => rect.left));
    const top = Math.min(...rects.map((rect) => rect.top));
    return {
      x: left,
      y: top,
      width: Math.max(...rects.map((rect) => rect.right)) - left,
      height: Math.max(...rects.map((rect) => rect.bottom)) - top,
    };
  });

  if (!content) return { content: canvasBox, crop: canvasBox };

  const pad = Math.max(Math.max(content.width, content.height) * 0.45, 64 * ZOOM);
  let { x, y } = { x: content.x - pad, y: content.y - pad };
  let width = content.width + pad * 2;
  let height = content.height + pad * 2;

  if (width / height < FRAME_ASPECT) {
    const widened = height * FRAME_ASPECT;
    x -= (widened - width) / 2;
    width = widened;
  } else {
    const heightened = width / FRAME_ASPECT;
    y -= (heightened - height) / 2;
    height = heightened;
  }

  // Clamp inside the canvas: outside it is the page, which is not the subject.
  const right = Math.min(x + width, canvasBox.x + canvasBox.width);
  const bottom = Math.min(y + height, canvasBox.y + canvasBox.height);
  x = Math.max(x, canvasBox.x);
  y = Math.max(y, canvasBox.y);

  return { content, crop: { x, y, width: right - x, height: bottom - y } };
}

/*
 * Interactions that answer to where the pointer is, not merely to whether it
 * arrived.
 *
 * The default gesture enters from outside, rests on the middle and leaves,
 * which is the honest demonstration of a hover state: the thing it shows is the
 * difference between off and on. It is the wrong demonstration of an
 * interaction whose whole behaviour is positional — the edge glow crossfades as
 * the pointer changes sides, and a pointer that only ever arrives at the centre
 * never changes sides, so the clip showed a button lighting up and none of what
 * makes it worth copying.
 *
 * Kept as a list because nothing in the catalog records this. `type` says
 * Hover for both kinds, and no amount of reading the source tells you which
 * ones are worth sweeping without watching them.
 */
const SWEPT = new Set(["cursor-edge-glow-button"]);

/**
 * Crosses the component end to end, three times, slowly enough to be followed.
 *
 * Stepped by hand rather than through `mouse.move`'s own `steps`, which
 * interpolates as fast as it can: a traverse that takes two frames is a
 * traverse a spring has no time to follow, and the spring is the point.
 */
async function sweep(page, box, canvasBox) {
  const y = box.y + box.height / 2;
  const overshoot = Math.min(box.width * 0.3, 140);
  const left = Math.max(box.x - overshoot, canvasBox.x + 2);
  const right = Math.min(
    box.x + box.width + overshoot,
    canvasBox.x + canvasBox.width - 2,
  );

  const traverse = async (from, to) => {
    const steps = 46;
    for (let step = 0; step <= steps; step++) {
      await page.mouse.move(from + ((to - from) * step) / steps, y);
      await page.waitForTimeout(22);
    }
    await page.waitForTimeout(420);
  };

  await page.mouse.move(left, y);
  await page.waitForTimeout(500);
  await traverse(left, right);
  await traverse(right, left);
  await traverse(left, right);
}

/** Whatever the interaction responds to, performed twice with a rest between. */
async function perform(page, box, canvasBox, type) {
  const centre = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
  // Far enough to count as having left, still inside the preview surface.
  const outside = {
    x: centre.x,
    y: Math.min(box.y + box.height + 90, canvasBox.y + canvasBox.height - 4),
  };

  for (let pass = 0; pass < 2; pass++) {
    await page.mouse.move(outside.x, outside.y);
    await page.waitForTimeout(500);
    // Stepped rather than teleported: several interactions track the pointer's
    // position or its direction of travel, and a jump gives them one frame of
    // input to animate from.
    await page.mouse.move(centre.x, centre.y, { steps: 24 });

    if (type === "Click") {
      await page.waitForTimeout(350);
      await page.mouse.down();
      await page.waitForTimeout(120);
      await page.mouse.up();
    } else if (type === "Focus") {
      await page.mouse.click(centre.x, centre.y);
      // Cleared on the way in, so the second pass records the same interaction
      // the first one did rather than typing on top of it.
      await page.keyboard.press("ControlOrMeta+A");
      await page.keyboard.press("Backspace");
      /* Short and generic on purpose: the one focus interaction in the catalog
       * labels its field "Project name", and the next one may label it anything
       * at all. A word that fits any field beats a plausible-looking value that
       * fits one. */
      await page.keyboard.type("MicroKit", { delay: 110 });
    }

    await page.waitForTimeout(1400);
  }

  await page.mouse.move(outside.x, outside.y);
  await page.waitForTimeout(700);
}

/*
 * `recordVideo` starts filming when the context opens, which is before the page
 * has navigated, before the zoom lands and before anything has been hovered —
 * a second and a half of an empty and then wrongly scaled page, inside a crop
 * rectangle measured for the final layout. Playwright offers no way to start
 * the recording later, so the lead-in is measured by the caller and cut here.
 *
 * The seek goes after `-i` rather than before it: seeking before the input is
 * faster and lands on the nearest keyframe, which for a screen recording can be
 * a second away from where the gesture actually begins.
 */
function encode(webm, id, box, leadInSeconds) {
  const mp4 = `${OUT}/${id}.mp4`;
  // Even dimensions: H.264 with yuv420p cannot encode an odd width or height.
  const even = (n) => Math.max(2, Math.round(n / 2) * 2);
  const crop = `crop=${even(box.width)}:${even(box.height)}:${Math.round(box.x)}:${Math.round(box.y)}`;

  execFileSync(
    "ffmpeg",
    ["-y", "-i", webm, "-ss", leadInSeconds.toFixed(2), "-vf", crop, "-pix_fmt", "yuv420p", "-crf", "18", "-movflags", "+faststart", mp4],
    { stdio: "pipe" },
  );

  if (WANT_GIF) {
    /* Two passes: one to build a palette from the clip's own colours, one to
     * apply it. A gif made without this dithers a dark preview into bands. */
    const palette = `${OUT}/${id}-palette.png`;
    execFileSync("ffmpeg", ["-y", "-i", mp4, "-vf", `fps=${GIF_FPS},palettegen=stats_mode=diff`, palette], { stdio: "pipe" });
    execFileSync(
      "ffmpeg",
      ["-y", "-i", mp4, "-i", palette, "-lavfi", `fps=${GIF_FPS}[x];[x][1:v]paletteuse=dither=bayer:bayer_scale=3`, `${OUT}/${id}.gif`],
      { stdio: "pipe" },
    );
    rmSync(palette);
  }

  return mp4;
}

let recorded = 0;
for (const item of targets) {
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 1,
    recordVideo: { dir: `${OUT}/.raw`, size: VIEWPORT },
    // The previews animate, so honouring a reduced-motion preference here would
    // record forty-eight still images.
    reducedMotion: "no-preference",
  });
  const openedAt = Date.now();
  const page = await context.newPage();

  await page.goto(`${BASE}/components/${item.id}`, { waitUntil: "networkidle" });
  const canvas = page.locator(".canvas").first();
  await canvas.waitFor({ state: "visible" });
  await page.evaluate(
    (zoom) => {
      const element = document.querySelector(".canvas");
      if (element instanceof HTMLElement) element.style.zoom = String(zoom);
    },
    ZOOM,
  );
  // Fonts, the zoom reflow and any entrance animation, before the clip starts.
  await page.waitForTimeout(900);

  const box = await canvas.boundingBox();
  if (!box) throw new Error(`${item.id}: the preview canvas has no box`);
  const { content, crop } = await framing(page, box);

  const leadIn = (Date.now() - openedAt) / 1000;
  if (SWEPT.has(item.id)) await sweep(page, content, box);
  else await perform(page, content, box, item.type);

  await context.close();
  const webm = `${OUT}/.raw/${readdirSync(`${OUT}/.raw`)[0]}`;
  const mp4 = encode(webm, item.id, crop, leadIn);
  rmSync(`${OUT}/.raw`, { recursive: true, force: true });

  recorded++;
  console.log(`${String(recorded).padStart(2)}/${targets.length}  ${mp4.replace(`${ROOT}/`, "")}`);
}

await browser.close();
console.log(`\n${recorded} clip${recorded === 1 ? "" : "s"} in previews/`);
