export const componentCode = `"use client";

import "./styles.css";

import { Archive, RotateCcw } from "lucide-react";
import { useState } from "react";
import type { AnimationEvent } from "react";

type FuseState = "idle" | "burning";

export function FuseUndoButton() {
  const [state, setState] = useState<FuseState>("idle");
  const [fuse, setFuse] = useState(0);

  const handleBurnEnd = (event: AnimationEvent<SVGRectElement>) => {
    if (event.animationName === "fuse-undo-burn") setState("idle");
  };

  const handleClick = () => {
    if (state === "idle") {
      setFuse((current) => current + 1);
      setState("burning");
    } else {
      setState("idle");
    }
  };

  return (
    <button type="button" className="fuse-undo" data-state={state} onClick={handleClick}>
      <svg key={fuse} className="fuse-undo__fuse" aria-hidden="true">
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          rx="26"
          pathLength={1}
          strokeDasharray="1 2"
          onAnimationEnd={handleBurnEnd}
        />
      </svg>
      <span className="fuse-undo__stack" aria-live="polite">
        <span className="fuse-undo__row fuse-undo__row--action" data-active={state === "idle"}>
          <Archive className="fuse-undo__icon" size={20} strokeWidth={2} aria-hidden="true" />
          Archive
        </span>
        <span className="fuse-undo__row fuse-undo__row--undo" data-active={state === "burning"}>
          <RotateCcw className="fuse-undo__icon" size={20} strokeWidth={2} aria-hidden="true" />
          Undo
        </span>
      </span>
    </button>
  );
}

/* styles.css */
.fuse-undo,
.fuse-undo * {
  box-sizing: border-box;
}

.fuse-undo {
  appearance: none;
  position: relative;
  display: inline-flex;
  height: 52px;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 999px;
  background: light-dark(#ffffff, #121418);
  box-shadow:
    inset 0 0 0 1px light-dark(#dfe3ea, #2b2f36),
    0 10px 24px light-dark(rgba(246, 247, 249, .35), rgba(0, 0, 0, .35));
  padding: 0 28px;
  color: light-dark(#14181e, #f2f4f6);
  font-family: inherit;
  font-size: 17px;
  font-weight: 500;
  letter-spacing: -.01em;
  line-height: 1;
  cursor: pointer;
  transition: background-color .2s ease;
}

.fuse-undo:hover {
  background: light-dark(#f0f2f5, #1b1e23);
}

.fuse-undo:focus-visible {
  outline: 2px solid #f97316;
  outline-offset: 4px;
}

.fuse-undo__fuse {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;
  filter: drop-shadow(0 0 6px rgba(249, 115, 22, .55));
  opacity: 0;
  transition: opacity .35s ease;
}

.fuse-undo[data-state="burning"] .fuse-undo__fuse {
  opacity: 1;
}

.fuse-undo__fuse rect {
  fill: none;
  stroke: #f97316;
  stroke-width: 2;
  stroke-linecap: round;
  animation-name: fuse-undo-burn;
  animation-duration: 5s;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
  animation-play-state: paused;
}

.fuse-undo[data-state="burning"] .fuse-undo__fuse rect {
  animation-play-state: running;
}

.fuse-undo[data-state="burning"]:hover .fuse-undo__fuse rect,
.fuse-undo[data-state="burning"]:focus-visible .fuse-undo__fuse rect {
  animation-play-state: paused;
}

.fuse-undo__stack {
  display: grid;
}

.fuse-undo__row {
  display: inline-flex;
  grid-area: 1 / 1;
  justify-self: center;
  align-items: center;
  gap: 10px;
  white-space: nowrap;
  transition:
    opacity .3s ease,
    transform .45s cubic-bezier(.16, 1, .3, 1),
    visibility .3s;
}

.fuse-undo__row[data-active="false"] {
  visibility: hidden;
  opacity: 0;
}

.fuse-undo__row--action[data-active="false"] {
  transform: translateY(-10px);
}

.fuse-undo__row--undo[data-active="false"] {
  transform: translateY(10px);
}

.fuse-undo__icon {
  flex: none;
}

@keyframes fuse-undo-burn {
  from {
    stroke-dashoffset: 0;
  }
  to {
    stroke-dashoffset: -1.02;
  }
}

@media (prefers-reduced-motion: reduce) {
  .fuse-undo,
  .fuse-undo__fuse,
  .fuse-undo__row {
    transition: none;
  }

  .fuse-undo__row[data-active="false"] {
    transform: none;
  }
}`;

export const tailwindCode = `"use client";

import { Archive, RotateCcw } from "lucide-react";
import { useState } from "react";
import type { AnimationEvent } from "react";

type FuseState = "idle" | "burning";

const fuseKeyframes = \`
@keyframes fuse-undo-burn {
  from { stroke-dashoffset: 0; }
  to { stroke-dashoffset: -1.02; }
}\`;

const rowClass =
  "inline-flex items-center gap-[10px] justify-self-center whitespace-nowrap [grid-area:1/1] [transition:opacity_.3s_ease,transform_.45s_cubic-bezier(.16,1,.3,1),visibility_.3s] data-[active=false]:invisible data-[active=false]:opacity-0 motion-reduce:transition-none motion-reduce:data-[active=false]:[transform:none]";

export function FuseUndoButton() {
  const [state, setState] = useState<FuseState>("idle");
  const [fuse, setFuse] = useState(0);

  const handleBurnEnd = (event: AnimationEvent<SVGRectElement>) => {
    if (event.animationName === "fuse-undo-burn") setState("idle");
  };

  const handleClick = () => {
    if (state === "idle") {
      setFuse((current) => current + 1);
      setState("burning");
    } else {
      setState("idle");
    }
  };

  return (
    <>
      <style>{fuseKeyframes}</style>
      <button
        type="button"
        className="group relative inline-flex h-[52px] cursor-pointer appearance-none items-center justify-center rounded-full border-0 bg-[light-dark(#ffffff,#121418)] px-[28px] [font-family:inherit] text-[17px] font-medium leading-none tracking-[-.01em] text-[light-dark(#14181e,#f2f4f6)] [box-shadow:inset_0_0_0_1px_light-dark(#dfe3ea,#2b2f36),0_10px_24px_light-dark(rgba(246,247,249,.35),rgba(0,0,0,.35))] [transition:background-color_.2s_ease] hover:bg-[light-dark(#f0f2f5,#1b1e23)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f97316] motion-reduce:transition-none"
        data-state={state}
        onClick={handleClick}
      >
        <svg
          key={fuse}
          className="pointer-events-none absolute inset-0 size-full overflow-visible opacity-0 [filter:drop-shadow(0_0_6px_rgba(249,115,22,.55))] [transition:opacity_.35s_ease] group-data-[state=burning]:opacity-100 motion-reduce:transition-none"
          aria-hidden="true"
        >
          <rect
            className="fill-none stroke-[#f97316] stroke-2 [stroke-linecap:round] [animation-name:fuse-undo-burn] [animation-duration:5s] [animation-timing-function:linear] [animation-fill-mode:forwards] [animation-play-state:paused] group-data-[state=burning]:[animation-play-state:running] group-data-[state=burning]:group-hover:[animation-play-state:paused] group-data-[state=burning]:group-focus-visible:[animation-play-state:paused]"
            x="0"
            y="0"
            width="100%"
            height="100%"
            rx="26"
            pathLength={1}
            strokeDasharray="1 2"
            onAnimationEnd={handleBurnEnd}
          />
        </svg>
        <span className="grid" aria-live="polite">
          <span className={\`\${rowClass} data-[active=false]:[transform:translateY(-10px)]\`} data-active={state === "idle"}>
            <Archive className="shrink-0" size={20} strokeWidth={2} aria-hidden="true" />
            Archive
          </span>
          <span className={\`\${rowClass} data-[active=false]:[transform:translateY(10px)]\`} data-active={state === "burning"}>
            <RotateCcw className="shrink-0" size={20} strokeWidth={2} aria-hidden="true" />
            Undo
          </span>
        </span>
      </button>
    </>
  );
}`;
