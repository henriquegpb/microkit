export const componentCode = `import type { PointerEvent as ReactPointerEvent } from "react";
import { ArrowRight } from "lucide-react";

export function WhatsNewGlowButton() {
  const updateGlow = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const position = Math.max(0, Math.min(100, ((event.clientX - bounds.left) / bounds.width) * 100));
    event.currentTarget.style.setProperty("--glow-x", \`\${position}%\`);
  };
  const resetGlow = (event: ReactPointerEvent<HTMLButtonElement>) => {
    event.currentTarget.style.setProperty("--glow-x", "50%");
  };

  return (
    <button type="button" className="whats-new-button" onPointerMove={updateGlow} onPointerLeave={resetGlow}>
      <span className="whats-new-content">
        <ArrowRight size={16} strokeWidth={2.5} />
        {"What's new"}
      </span>
      <span className="whats-new-glow whats-new-glow-orange" aria-hidden="true" />
      <span className="whats-new-glow whats-new-glow-blue" aria-hidden="true" />
    </button>
  );
}

/* whats-new-glow-button.css */
.whats-new-button { --glow-x: 50%; position: relative; display: inline-flex; align-items: center; justify-content: center; min-height: 42px; overflow: hidden; border: 1px solid #36383d; border-radius: 999px; background: #0e0e10; padding: 0 18px; color: #f0f0f0; font-size: 16px; font-weight: 500; }
.whats-new-content { position: relative; z-index: 1; display: inline-flex; align-items: center; gap: 9px; }
.whats-new-glow { position: absolute; bottom: -108%; width: 112%; height: 180%; border-radius: 999px; filter: blur(23px); opacity: .28; transition: left .22s cubic-bezier(.16, 1, .3, 1), transform .45s cubic-bezier(.16, 1, .3, 1), opacity .3s ease; }
.whats-new-glow-orange { left: calc(var(--glow-x) - 78%); background: linear-gradient(145deg, #ffbe91, #f97316 43%, #7a2808); }
.whats-new-glow-blue { left: calc(var(--glow-x) - 30%); background: linear-gradient(145deg, #77e1e6, #2187d7 45%, #192b8a); }
.whats-new-button:hover .whats-new-glow, .whats-new-button:focus-visible .whats-new-glow { transform: translateY(-19px); opacity: 1; }
.whats-new-button:focus-visible { outline: 2px solid #f97316; outline-offset: 3px; }`;

export const tailwindCode = `import type { PointerEvent as ReactPointerEvent } from "react";
import { ArrowRight } from "lucide-react";

export function WhatsNewGlowButton() {
  const updateGlow = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const position = Math.max(0, Math.min(100, ((event.clientX - bounds.left) / bounds.width) * 100));
    event.currentTarget.style.setProperty("--glow-x", \`\${position}%\`);
  };
  const resetGlow = (event: ReactPointerEvent<HTMLButtonElement>) => event.currentTarget.style.setProperty("--glow-x", "50%");

  return (
    <button onPointerMove={updateGlow} onPointerLeave={resetGlow} className="group relative inline-flex min-h-[42px] items-center justify-center overflow-hidden rounded-full border border-[#36383d] bg-[#0e0e10] px-[18px] text-base font-medium text-[#f0f0f0]">
      <span className="relative z-10 inline-flex items-center gap-[9px]"><ArrowRight size={16} strokeWidth={2.5} />{"What's new"}</span>
      <span className="pointer-events-none absolute bottom-[-108%] left-[calc(var(--glow-x)-78%)] h-[180%] w-[112%] rounded-full bg-[linear-gradient(145deg,#ffbe91,#f97316_43%,#7a2808)] opacity-[.28] blur-[23px] transition-[left,transform,opacity] duration-[220ms] ease-out group-hover:translate-y-[-19px] group-hover:opacity-100" />
      <span className="pointer-events-none absolute bottom-[-108%] left-[calc(var(--glow-x)-30%)] h-[180%] w-[112%] rounded-full bg-[linear-gradient(145deg,#77e1e6,#2187d7_45%,#192b8a)] opacity-[.28] blur-[23px] transition-[left,transform,opacity] duration-[220ms] ease-out group-hover:translate-y-[-19px] group-hover:opacity-100" />
    </button>
  );
}`;
