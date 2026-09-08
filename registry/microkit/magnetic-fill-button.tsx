"use client";

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
    <button
      onPointerMove={move}
      onPointerLeave={reset}
      className="group relative inline-flex items-center justify-center overflow-hidden rounded-[100px] border border-[#f0f0f0] bg-transparent px-8 py-3 text-base font-medium text-[#f0f0f0] [transform:translate(var(--magnetic-x,0px),var(--magnetic-y,0px))] transition-[transform,color] duration-[220ms] ease-[cubic-bezier(.16,1,.3,1)] hover:text-[#111] focus-visible:text-[#111] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f97316]"
    >
      <span className="relative z-10">Start a project</span>
      <span className="absolute inset-x-0 bottom-0 h-0 bg-[#f97316] transition-[height] duration-[380ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:h-full group-focus-visible:h-full" aria-hidden="true" />
    </button>
  );
}
