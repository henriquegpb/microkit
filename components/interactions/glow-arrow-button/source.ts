export const componentCode = `import { ArrowRight } from "lucide-react";

export function GlowArrowButton() {
  return <button type="button" className="glow-arrow-button"><span>Get Started</span><ArrowRight aria-hidden="true" size={16} strokeWidth={2.3} /></button>;
}

/* glow-arrow-button.css */
.glow-arrow-button { display: inline-flex; align-items: center; gap: 8px; border: 0; border-radius: 999px; background: #f0f0f0; padding: 16px 32px; color: #111; font-size: 16px; font-weight: 500; cursor: pointer; transition: box-shadow .3s ease; }
.glow-arrow-button svg { transition: transform .3s ease; }
.glow-arrow-button:hover, .glow-arrow-button:focus-visible { box-shadow: 0 3px 20px #f0f0f080; }
.glow-arrow-button:hover svg, .glow-arrow-button:focus-visible svg { transform: translateX(4px); }
.glow-arrow-button:focus-visible { outline: 2px solid #f97316; outline-offset: 4px; }`;

export const tailwindCode = `import { ArrowRight } from "lucide-react";

export function GlowArrowButton() {
  return <button type="button" className="group inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-full border-0 bg-[#f0f0f0] px-8 py-4 text-base font-medium text-[#111] transition-shadow duration-300 hover:shadow-[0_3px_20px_#f0f0f080] focus-visible:shadow-[0_3px_20px_#f0f0f080] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f97316]"><span>Get Started</span><ArrowRight aria-hidden="true" size={16} strokeWidth={2.3} className="transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1" /></button>;
}`;
