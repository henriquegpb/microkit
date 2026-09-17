"use client";

/*
 * "Other libraries" — projects worth knowing about that are not MicroKit
 * interactions. They have no snippet to copy, so a card links out instead of
 * opening a playground, and the preview shows what the library actually does
 * rather than a component you could paste.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { MorphIcon } from "morphicons/react";
// Icon data, not components: MorphIcon interpolates paths, so the morphing
// half of the preview consumes the `lucide` data package while the static
// chips beside it render the matching `lucide-react` components.
import {
  Heart as HeartData,
  Menu as MenuData,
  Moon as MoonData,
  Play as PlayData,
  Search as SearchData,
  Sun as SunData,
  X as XData,
} from "lucide";
import { Heart, Menu, Moon, Play, Search, Sun, X } from "lucide-react";
import {
  ClockIcon,
  HeartIcon,
  LayersIcon,
  PanelLeftOpenIcon,
  type AnimatedIconHandle,
} from "./animated-icons";

export interface OtherLibrary {
  id: string;
  name: string;
  tagline: string;
  href: string;
  meta: string;
  scale: string;
}

export const otherLibraries: OtherLibrary[] = [
  {
    id: "morphicons",
    name: "Morphicons",
    tagline: "Morph any SVG icon into any other",
    href: "https://www.morphicons.com",
    meta: "Icons",
    scale: "Zero deps",
  },
  {
    id: "lucide-animated",
    name: "Lucide Animated",
    tagline: "Animated React icons built on Lucide",
    href: "https://lucide-animated.com/",
    meta: "React",
    scale: "467 icons",
  },
];

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const MORPH_STEPS = [
  { key: "menu", label: "Menu", data: MenuData, Glyph: Menu },
  { key: "x", label: "Close", data: XData, Glyph: X },
  { key: "sun", label: "Sun", data: SunData, Glyph: Sun },
  { key: "moon", label: "Moon", data: MoonData, Glyph: Moon },
  { key: "play", label: "Play", data: PlayData, Glyph: Play },
  { key: "heart", label: "Heart", data: HeartData, Glyph: Heart },
  { key: "search", label: "Search", data: SearchData, Glyph: Search },
];

/*
 * The morphicons hero in miniature: one icon that keeps becoming the next one
 * in the set, with the set laid out underneath. Picking a chip jumps the morph
 * to that icon and restarts the cycle from there, which is the whole point of
 * the library — the shape you ask for is the shape it travels to.
 */
function MorphiconsPreview() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || prefersReducedMotion()) return;
    const timer = window.setTimeout(() => setIndex(i => (i + 1) % MORPH_STEPS.length), 1500);
    return () => window.clearTimeout(timer);
  }, [index, paused]);

  return (
    <div
      className="library-preview"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <span className="morph-stage">
        <MorphIcon
          icon={MORPH_STEPS[index].data}
          size={44}
          strokeWidth={1.5}
          spring="snappy"
          reducedMotion="user"
        />
      </span>
      <span className="morph-set">
        {MORPH_STEPS.map((step, i) => (
          <button
            key={step.key}
            type="button"
            className={i === index ? "active" : ""}
            aria-label={`Morph to ${step.label}`}
            aria-pressed={i === index}
            onClick={() => setIndex(i)}
          >
            <step.Glyph size={15} strokeWidth={1.7} />
          </button>
        ))}
      </span>
    </div>
  );
}

const ANIMATED_ICONS = [HeartIcon, LayersIcon, ClockIcon, PanelLeftOpenIcon];
const STAGGER = 220;
const HOLD = 900;
const CYCLE = ANIMATED_ICONS.length * STAGGER + 1400;

/*
 * Lucide Animated is a set of Lucide icons that animate on hover, so the
 * preview plays a hovered row on a loop: each icon runs in turn, settles, and
 * the row starts over. Hovering one takes it over manually, which is how the
 * icons behave in a real interface.
 */
function LucideAnimatedPreview() {
  const iconRefs = useRef<(AnimatedIconHandle | null)[]>([]);
  const timers = useRef<number[]>([]);
  const [hovered, setHovered] = useState(false);

  const clearTimers = useCallback(() => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
  }, []);

  useEffect(() => {
    if (hovered || prefersReducedMotion()) return;
    const play = () => {
      ANIMATED_ICONS.forEach((_, i) => {
        timers.current.push(window.setTimeout(() => iconRefs.current[i]?.startAnimation(), i * STAGGER));
        timers.current.push(window.setTimeout(() => iconRefs.current[i]?.stopAnimation(), i * STAGGER + HOLD));
      });
    };
    play();
    const loop = window.setInterval(play, CYCLE);
    return () => {
      window.clearInterval(loop);
      clearTimers();
    };
  }, [clearTimers, hovered]);

  return (
    <div className="library-preview" onMouseLeave={() => setHovered(false)}>
      <span className="animated-icon-row">
        {ANIMATED_ICONS.map((Icon, i) => (
          <span
            key={i}
            className="animated-icon-tile"
            onMouseEnter={() => {
              setHovered(true);
              clearTimers();
              iconRefs.current.forEach(icon => icon?.stopAnimation());
              iconRefs.current[i]?.startAnimation();
            }}
            onMouseLeave={() => iconRefs.current[i]?.stopAnimation()}
          >
            <Icon ref={icon => { iconRefs.current[i] = icon; }} size={24} />
          </span>
        ))}
      </span>
      <span className="library-preview-caption">hover · 467 icons</span>
    </div>
  );
}

const PREVIEWS: Record<string, () => React.ReactElement> = {
  morphicons: MorphiconsPreview,
  "lucide-animated": LucideAnimatedPreview,
};

export function OtherLibraryPreview({ id }: { id: string }) {
  const Preview = PREVIEWS[id];
  return Preview ? <Preview /> : null;
}
