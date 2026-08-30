export const componentCode = `import "./styles.css";

import { ArrowRight } from "lucide-react";

export function ExpandingNewsletterButton() {
  return (
    <button type="button" className="expanding-newsletter-button">
      <span className="expanding-newsletter-button__circle" aria-hidden="true">
        <ArrowRight size={15} strokeWidth={2.5} />
      </span>
      <span className="expanding-newsletter-button__label">Newsletter</span>
    </button>
  );
}

/* styles.css */
.expanding-newsletter-button,
.expanding-newsletter-button * {
  box-sizing: border-box;
}

.expanding-newsletter-button {
  appearance: none;
  position: relative;
  display: inline-flex;
  width: min(145px, calc(100vw - 40px));
  height: 42px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 0;
  border-radius: 999px;
  background: #f97316;
  padding: 0;
  color: #fffaf6;
  font-family: Arial, Helvetica, sans-serif;
  cursor: pointer;
  transition: background-color .3s ease, transform .2s ease;
}

.expanding-newsletter-button__circle {
  position: absolute;
  left: 9px;
  top: 50%;
  display: grid;
  width: 24px;
  height: 24px;
  place-items: center;
  overflow: hidden;
  border-radius: 50%;
  background: #141419;
  color: #fffaf6;
  transform: translateY(-50%);
  transition: left .42s cubic-bezier(.16, 1, .3, 1), width .42s cubic-bezier(.16, 1, .3, 1), height .42s cubic-bezier(.16, 1, .3, 1);
}

.expanding-newsletter-button__circle svg {
  transform: translateX(-26px);
  transition: transform .42s cubic-bezier(.16, 1, .3, 1);
}

.expanding-newsletter-button__label {
  white-space: nowrap;
  font-size: 15px;
  font-weight: 400;
  letter-spacing: -.45px;
  line-height: 1;
  transform: translateX(8px);
}

.expanding-newsletter-button:hover,
.expanding-newsletter-button:focus-visible {
  background: #fb7b21;
}

.expanding-newsletter-button:hover .expanding-newsletter-button__circle,
.expanding-newsletter-button:focus-visible .expanding-newsletter-button__circle {
  left: 4px;
  width: 34px;
  height: 34px;
}

.expanding-newsletter-button:hover .expanding-newsletter-button__circle svg,
.expanding-newsletter-button:focus-visible .expanding-newsletter-button__circle svg {
  transform: translateX(0);
}

.expanding-newsletter-button:active {
  transform: scale(.98);
}

.expanding-newsletter-button:focus-visible {
  outline: 2px solid #fffaf6;
  outline-offset: 4px;
}

@media (prefers-reduced-motion: reduce) {
  .expanding-newsletter-button,
  .expanding-newsletter-button__circle,
  .expanding-newsletter-button__circle svg {
    transition: none;
  }
}`;

export const tailwindCode = `import { ArrowRight } from "lucide-react";

export function ExpandingNewsletterButton() {
  return (
    <button type="button" className="group relative inline-flex h-[42px] w-[min(145px,calc(100vw-40px))] cursor-pointer appearance-none items-center justify-center overflow-hidden rounded-full border-0 bg-[#f97316] p-0 font-[Arial,Helvetica,sans-serif] text-[#fffaf6] transition-[background-color,transform] duration-300 hover:bg-[#fb7b21] focus-visible:bg-[#fb7b21] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#fffaf6] active:scale-[.98] motion-reduce:transition-none">
      <span className="absolute left-[9px] top-1/2 grid size-6 -translate-y-1/2 place-items-center overflow-hidden rounded-full bg-[#141419] text-[#fffaf6] [transition:left_.42s_cubic-bezier(.16,1,.3,1),width_.42s_cubic-bezier(.16,1,.3,1),height_.42s_cubic-bezier(.16,1,.3,1)] group-hover:left-1 group-hover:size-[34px] group-focus-visible:left-1 group-focus-visible:size-[34px] motion-reduce:transition-none" aria-hidden="true">
        <ArrowRight size={15} strokeWidth={2.5} className="-translate-x-[26px] transition-transform duration-[420ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-0 group-focus-visible:translate-x-0 motion-reduce:transition-none" />
      </span>
      <span className="translate-x-2 whitespace-nowrap text-[15px] font-normal leading-none tracking-[-.45px]">Newsletter</span>
    </button>
  );
}`;
