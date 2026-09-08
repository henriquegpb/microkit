"use client";

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
    <button type="button" onPointerEnter={updateOrbPosition} onPointerMove={updateOrbPosition} className="group relative isolate inline-grid h-[66px] w-[min(200px,calc(100vw-40px))] cursor-pointer place-items-center overflow-hidden rounded-full border-0 bg-[linear-gradient(110deg,#202029_0%,#181820_48%,#15161b_100%)] font-[Arial,Helvetica,sans-serif] text-[#f7f7fa] shadow-[inset_0_3px_4px_rgba(0,0,0,.72),inset_0_-2px_2px_rgba(255,255,255,.07)] [--cursor-x:50%] [--cursor-y:50%] [transition:background_.3s_ease,box-shadow_.3s_cubic-bezier(.16,1,.3,1)] hover:bg-[linear-gradient(110deg,#1e1e26_0%,#171820_48%,#121319_100%)] hover:shadow-[inset_0_2px_2px_rgba(255,255,255,.24),inset_0_-3px_4px_rgba(0,0,0,.74),0_10px_13px_rgba(0,0,0,.58)] focus-visible:bg-[linear-gradient(110deg,#1e1e26_0%,#171820_48%,#121319_100%)] focus-visible:shadow-[inset_0_2px_2px_rgba(255,255,255,.24),inset_0_-3px_4px_rgba(0,0,0,.74),0_10px_13px_rgba(0,0,0,.58)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[7px] focus-visible:outline-[#ff6a22] motion-reduce:transition-none">
      <span className="pointer-events-none absolute z-0 grid size-10 place-items-center rounded-full bg-[#ff6a22] text-[#090a0f] opacity-0 shadow-[0_0_0_1px_rgba(255,198,139,.48),0_0_11px_4px_rgba(255,111,35,.92),0_0_28px_10px_rgba(255,91,20,.48),0_0_42px_16px_rgba(255,76,19,.16)] [left:var(--cursor-x)] [top:var(--cursor-y)] [transform:translate(-50%,-50%)_scale(.55)] [transition:transform_.3s_cubic-bezier(.16,1,.3,1),opacity_.2s_ease] before:absolute before:-inset-[30px] before:-z-10 before:rounded-full before:bg-[radial-gradient(circle,rgba(255,106,34,.34),rgba(255,72,24,.12)_38%,transparent_69%)] group-hover:opacity-100 group-hover:[transform:translate(-50%,-50%)_scale(1)] group-focus-visible:opacity-100 group-focus-visible:[transform:translate(-50%,-50%)_scale(1)] motion-reduce:transition-none" aria-hidden="true">
        <svg viewBox="0 0 32 32" fill="none" className="size-[19px] -translate-x-px translate-y-px -rotate-[5deg]">
          <path d="M28.14 4.94 19.6 27.72c-.4 1.06-1.87 1.1-2.33.06l-4.04-9.05-9.03-4.02c-1.04-.46-1-1.93.06-2.33L27.04 3.86c.74-.28 1.38.34 1.1 1.08Z" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
          <path d="m13.02 18.63 5.75-5.75" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      </span>
      <span className="relative z-10 grid h-[25px] place-items-center overflow-hidden">
        <span className="col-start-1 row-start-1 whitespace-nowrap text-[17px] font-normal tracking-[-.4px] leading-[1.15] [transition:transform_.42s_cubic-bezier(.16,1,.3,1),opacity_.2s_ease] group-hover:-translate-y-[145%] group-hover:opacity-0 group-focus-visible:-translate-y-[145%] group-focus-visible:opacity-0 motion-reduce:transition-none">Share it now</span>
        <span className="col-start-1 row-start-1 translate-y-[145%] whitespace-nowrap text-[17px] font-normal tracking-[-.4px] leading-[1.15] opacity-0 [transition:transform_.42s_cubic-bezier(.16,1,.3,1),opacity_.2s_ease] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:transition-none" aria-hidden="true">Share it now</span>
      </span>
    </button>
  );
}
