import Image from "next/image";

import type { PackageManager } from "@/app/site-metadata";

/*
 * The four package-manager marks, desaturated rather than flattened.
 *
 * `grayscale(1)` keeps each logo's internal shading — bun's dark eyes against
 * its pale bun, npm's white letters knocked out of its box — which a mask
 * filled with one colour throws away, turning bun into a blank silhouette.
 *
 * What a filter cannot do on its own is even them out: greyscaled, npm's box
 * lands at 87/255 and bun's dough at 241, so one reads heavy and the other
 * barely reads at all. Each mark therefore carries its own `lift`, aiming the
 * dominant tone at roughly 150 so the row has one weight, and the selected
 * state multiplies whatever that lift is.
 *
 * Sizes match by ink area, not by height. npm is a landscape wordmark at
 * 2.43:1, and matching its height to three square marks made it twice as wide
 * as anything else on the row; equal area is what actually reads as "the same
 * size" across shapes with different proportions. Every viewBox is cropped to
 * its own content, so these numbers are ink rather than padding.
 */
const MARKS: Record<PackageManager, { file: string; ratio: number; lift: number }> = {
  npm: { file: "/logos/NPM.svg", ratio: 124 / 51, lift: 1.7 },
  pnpm: { file: "/logos/PNPM.svg", ratio: 1, lift: 1.2 },
  yarn: { file: "/logos/Yarn.svg", ratio: 124 / 124, lift: 1.25 },
  bun: { file: "/logos/Bun.svg", ratio: 126.4 / 106.84, lift: 0.62 },
};

/** Side of the square mark; the others are matched to its area. */
const BASE = 13;

export function PackageManagerLogo({ name }: { name: PackageManager }) {
  const { file, ratio, lift } = MARKS[name];
  const height = Math.round(BASE / Math.sqrt(ratio));
  const width = Math.round(height * ratio);

  return (
    <Image
      className="pm-logo"
      src={file}
      alt=""
      width={width}
      height={height}
      style={{ width, height, "--pm-lift": lift } as React.CSSProperties}
      aria-hidden="true"
    />
  );
}
