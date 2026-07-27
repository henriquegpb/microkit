export const componentCode = `import { ArrowRight } from "lucide-react";

export function SlidingArrowLabel() {
  return <button type="button" className="sliding-arrow-label"><span className="sliding-arrow-label-copy">Create a blog</span><span className="sliding-arrow-label-icon" aria-hidden="true"><ArrowRight size={16} strokeWidth={2.4} /></span></button>;
}

/* sliding-arrow-label.css */
.sliding-arrow-label { position: relative; display: inline-flex; align-items: center; overflow: hidden; border: 0; background: transparent; padding-right: 24px; color: #f0f0f0; cursor: pointer; }
.sliding-arrow-label-copy { border-radius: 8px; padding: 4px 12px; font-size: 16px; font-weight: 500; transition: background-color .3s ease, color .3s ease; }
.sliding-arrow-label-icon { position: absolute; right: 0; display: flex; width: 16px; opacity: 0; transform: translateX(-10px); transition: opacity .2s ease, transform .35s cubic-bezier(.16, 1, .3, 1); }
.sliding-arrow-label:hover .sliding-arrow-label-copy, .sliding-arrow-label:focus-visible .sliding-arrow-label-copy { background: #f97316; color: #111; }
.sliding-arrow-label:hover .sliding-arrow-label-icon, .sliding-arrow-label:focus-visible .sliding-arrow-label-icon { opacity: 1; transform: translateX(0); }
.sliding-arrow-label:focus-visible { outline: 2px solid #f97316; outline-offset: 4px; }`;

export const tailwindCode = `import { ArrowRight } from "lucide-react";

export function SlidingArrowLabel() {
  return <button type="button" className="group relative inline-flex cursor-pointer items-center overflow-hidden border-0 bg-transparent py-0 pr-6 pl-0 text-[#f0f0f0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f97316]"><span className="rounded-lg px-3 py-1 text-base font-medium transition-colors duration-300 group-hover:bg-[#f97316] group-hover:text-[#111] group-focus-visible:bg-[#f97316] group-focus-visible:text-[#111]">Create a blog</span><span className="absolute right-0 flex w-4 -translate-x-2.5 opacity-0 transition-[opacity,transform] duration-[350ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100" aria-hidden="true"><ArrowRight size={16} strokeWidth={2.4} /></span></button>;
}`;
