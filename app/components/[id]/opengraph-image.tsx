import { notFound } from "next/navigation";
import { interactions } from "../../../content/interactions/catalog";
import { createSocialImage, socialImageSize } from "../../social-image";

export const size = socialImageSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return interactions.map(({ id }) => ({ id }));
}

/**
 * Two balanced lines, split on a word boundary.
 *
 * Component names run from "Focus Field" to "Staggered Letter Glow Button", so
 * a fixed break would leave one of them ragged. The split point is the gap that
 * comes closest to halving the string, which for a two-word name means it stays
 * on one line and for a four-word name breaks in the middle.
 */
function balance(name: string) {
  const words = name.split(" ");
  if (words.length < 3) return [name];

  const middle = name.length / 2;
  let best = 1;
  let bestDistance = Infinity;

  for (let at = 1; at < words.length; at += 1) {
    const distance = Math.abs(words.slice(0, at).join(" ").length - middle);
    if (distance < bestDistance) {
      bestDistance = distance;
      best = at;
    }
  }

  return [words.slice(0, best).join(" "), words.slice(best).join(" ")];
}

export default async function ComponentOpenGraphImage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = interactions.find((interaction) => interaction.id === id);

  if (!item) notFound();

  return createSocialImage({
    eyebrow: `${item.category} • ${item.framework}`,
    lines: balance(item.name),
    description: item.description,
  });
}
