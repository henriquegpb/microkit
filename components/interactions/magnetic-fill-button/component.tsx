"use client";

import "./styles.css";

import type { PointerEvent as ReactPointerEvent } from "react";

export function MagneticFillButton() {
  const move = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - (bounds.left + bounds.width / 2)) * .14;
    const y = (event.clientY - (bounds.top + bounds.height / 2)) * .22;
    event.currentTarget.style.setProperty("--magnetic-x", `${x}px`);
    event.currentTarget.style.setProperty("--magnetic-y", `${y}px`);
  };
  const reset = (event: ReactPointerEvent<HTMLButtonElement>) => {
    event.currentTarget.style.setProperty("--magnetic-x", "0px");
    event.currentTarget.style.setProperty("--magnetic-y", "0px");
  };

  return (
    <button type="button" className="magnetic-fill-button" onPointerMove={move} onPointerLeave={reset}>
      <span className="magnetic-fill-label">Start a project</span>
      <span className="magnetic-fill-background" aria-hidden="true" />
    </button>
  );
}
