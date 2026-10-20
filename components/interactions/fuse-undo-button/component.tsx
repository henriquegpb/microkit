"use client";

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
