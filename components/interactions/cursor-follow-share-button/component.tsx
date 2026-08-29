"use client";

import "./styles.css";

import type { PointerEvent as ReactPointerEvent } from "react";

export function CursorFollowShareButton() {
  const updateOrbPosition = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top - 14;

    event.currentTarget.style.setProperty("--cursor-x", `${x}px`);
    event.currentTarget.style.setProperty("--cursor-y", `${y}px`);
  };

  return (
    <button type="button" className="cursor-follow-share-button" onPointerEnter={updateOrbPosition} onPointerMove={updateOrbPosition}>
      <span className="cursor-follow-share-button__orb" aria-hidden="true">
        <svg viewBox="0 0 32 32" fill="none">
          <path d="M28.14 4.94 19.6 27.72c-.4 1.06-1.87 1.1-2.33.06l-4.04-9.05-9.03-4.02c-1.04-.46-1-1.93.06-2.33L27.04 3.86c.74-.28 1.38.34 1.1 1.08Z" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
          <path d="m13.02 18.63 5.75-5.75" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      </span>
      <span className="cursor-follow-share-button__labels">
        <span className="cursor-follow-share-button__label cursor-follow-share-button__label--current">Share it now</span>
        <span className="cursor-follow-share-button__label cursor-follow-share-button__label--incoming" aria-hidden="true">Share it now</span>
      </span>
    </button>
  );
}
