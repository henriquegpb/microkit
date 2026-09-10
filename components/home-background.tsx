"use client";

import { useState } from "react";
import Grainient from "./grainient";

/**
 * The field's one set of parameters, in one place.
 *
 * Every shader parameter not named here is left at `grainient.tsx`'s own
 * default, and that file is vendored — tune the field from this object, never
 * from the defaults over there, or the two will disagree about what is running.
 *
 * The colours are the site's orange at three depths — the same hue as
 * `--blue: #f97316` (the token is misnamed, the value is the brand). The third
 * is a near-black ember rather than true black: black turned the corner the
 * field was leaving into a hole in the page, and this keeps the unlit part of
 * the mass warm. The layer is masked out at its bottom edge anyway, so it never
 * has to match `--bg` exactly to avoid a seam.
 */
const FIELD = {
  color1: "#db6612",
  color2: "#331404",
  color3: "#1b0902",
  // Above the default of 0, which is what pushes orange into the rest of the
  // frame: it slides the blend edges so only the far corner of the field is
  // still on the dark side of them.
  colorBalance: 0.6,
  // Below the default of 0.9, or the field is one orange mass the size of the
  // screen instead of a form moving through it.
  zoom: 0.4,
  // Above the default of 0.25. `timeSpeed` scales the noise and the warp
  // together, so this is the single knob for how fast the whole field moves.
  timeSpeed: 0.4,
} as const;

/**
 * The gradient behind the top of the home page.
 *
 * One screen tall and positioned in the flow of the gallery's scroll container
 * rather than fixed, so it scrolls away with the hero — everything below is
 * cards and body copy, and a moving field behind those is a readability problem
 * dressed up as a design decision. It also lets the shader's own
 * `IntersectionObserver` stop the render loop the moment you scroll past it.
 *
 * The fade to nothing at the bottom is a mask rather than an overlay, so the
 * layer ends without painting a second dark rectangle over anything, and it
 * finishes well inside the first viewport. The fade in on load is in CSS on the
 * same element: the canvas paints its first frame opaque, and without it the
 * field would arrive in a single frame the moment WebGL is ready.
 *
 * Reduced motion gets a painted approximation rather than a frozen canvas:
 * holding `timeSpeed` at zero would still redraw an identical frame sixty times
 * a second, which is the cost without the effect.
 */
export function HomeBackground() {
  // Read once at mount rather than in an effect: this whole subtree is
  // decorative and `aria-hidden`, so there is nothing for hydration to mismatch
  // on that a reader would ever see.
  const [stillness] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  return (
    <div className="home-field" aria-hidden="true">
      {stillness ? <div className="home-field-still" /> : <Grainient {...FIELD} />}
    </div>
  );
}
