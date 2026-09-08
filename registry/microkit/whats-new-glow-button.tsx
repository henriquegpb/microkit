"use client";

import type { PointerEvent as ReactPointerEvent } from "react";
import { ArrowRight } from "lucide-react";

export function WhatsNewGlowButton() {
  const updateGlow = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const position = Math.max(0, Math.min(100, ((event.clientX - bounds.left) / bounds.width) * 100));
    event.currentTarget.style.setProperty("--glow-x", `${position}%`);
  };
  const resetGlow = (event: ReactPointerEvent<HTMLButtonElement>) => event.currentTarget.style.setProperty("--glow-x", "50%");

  return (
    <button onPointerMove={updateGlow} onPointerLeave={resetGlow} className="group relative inline-flex min-h-[42px] items-center justify-center overflow-hidden rounded-full border border-[#36383d] bg-[#0e0e10] px-[18px] text-base font-medium text-[#f0f0f0]">
      <span className="relative z-10 inline-flex items-center gap-[9px]"><ArrowRight size={16} strokeWidth={2.5} />{"What's new"}</span>
      <span className="pointer-events-none absolute bottom-[-108%] left-[calc(var(--glow-x)-78%)] h-[180%] w-[112%] rounded-full bg-[linear-gradient(145deg,#ffbe91,#f97316_43%,#7a2808)] opacity-[.28] blur-[23px] transition-[left,transform,opacity] duration-[220ms] ease-out group-hover:translate-y-[-19px] group-hover:opacity-100" />
      <span className="pointer-events-none absolute bottom-[-108%] left-[calc(var(--glow-x)-30%)] h-[180%] w-[112%] rounded-full bg-[linear-gradient(145deg,#77e1e6,#2187d7_45%,#192b8a)] opacity-[.28] blur-[23px] transition-[left,transform,opacity] duration-[220ms] ease-out group-hover:translate-y-[-19px] group-hover:opacity-100" />
    </button>
  );
}
