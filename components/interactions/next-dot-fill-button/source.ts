export const componentCode = `import "./styles.css";

import { ArrowRight } from "lucide-react";

export function NextDotFillButton() {
  return (
    <button type="button" className="next-dot-fill-button">
      <span className="next-dot-fill-button__fill" aria-hidden="true" />
      <span className="next-dot-fill-button__label">Next</span>
      <span className="next-dot-fill-button__reveal" aria-hidden="true">
        Next
        <ArrowRight size={19} strokeWidth={2.4} />
      </span>
    </button>
  );
}

/* styles.css */
.next-dot-fill-button,
.next-dot-fill-button * {
  box-sizing: border-box;
}

.next-dot-fill-button {
  appearance: none;
  position: relative;
  display: inline-flex;
  width: min(132px, calc(100vw - 40px));
  height: 50px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 1px solid #d7dbe2;
  border-radius: 999px;
  background: #fff;
  padding: 0;
  color: #0a0a0a;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -.02em;
  line-height: 1;
  cursor: pointer;
}

.next-dot-fill-button__fill {
  position: absolute;
  left: 26px;
  top: calc(50% - 4.5px);
  z-index: 1;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #0a0a0a;
  transition: transform .5s cubic-bezier(.16, 1, .3, 1);
}

.next-dot-fill-button__label {
  position: relative;
  z-index: 0;
  transform: translateX(5px);
  transition: transform .35s cubic-bezier(.16, 1, .3, 1), opacity .3s ease;
}

.next-dot-fill-button__reveal {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #fafafa;
  transform: translateX(46px);
  opacity: 0;
  transition: transform .35s cubic-bezier(.16, 1, .3, 1), opacity .3s ease;
}

.next-dot-fill-button__reveal svg {
  flex-shrink: 0;
}

.next-dot-fill-button:hover .next-dot-fill-button__fill,
.next-dot-fill-button:focus-visible .next-dot-fill-button__fill {
  transform: scale(28);
}

.next-dot-fill-button:hover .next-dot-fill-button__label,
.next-dot-fill-button:focus-visible .next-dot-fill-button__label {
  transform: translateX(46px);
  opacity: 0;
}

.next-dot-fill-button:hover .next-dot-fill-button__reveal,
.next-dot-fill-button:focus-visible .next-dot-fill-button__reveal {
  transform: translateX(0);
  opacity: 1;
}

.next-dot-fill-button:focus-visible {
  outline: 2px solid #f97316;
  outline-offset: 4px;
}

@media (prefers-reduced-motion: reduce) {
  .next-dot-fill-button__fill,
  .next-dot-fill-button__label,
  .next-dot-fill-button__reveal {
    transition: none;
  }
}`;

export const tailwindCode = `import { ArrowRight } from "lucide-react";

export function NextDotFillButton() {
  return (
    <button type="button" className="group relative inline-flex h-[50px] w-[min(132px,calc(100vw_-_40px))] cursor-pointer appearance-none items-center justify-center overflow-hidden rounded-full border border-[#d7dbe2] bg-white p-0 font-[Arial,Helvetica,sans-serif] text-base font-medium leading-none tracking-[-.02em] text-[#0a0a0a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f97316]">
      <span className="absolute left-[26px] top-[calc(50%_-_4.5px)] z-[1] size-[9px] rounded-full bg-[#0a0a0a] transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[28] group-focus-visible:scale-[28] motion-reduce:transition-none" aria-hidden="true" />
      <span className="relative z-0 translate-x-[5px] [transition:transform_.35s_cubic-bezier(.16,1,.3,1),opacity_.3s_ease] group-hover:translate-x-[46px] group-hover:opacity-0 group-focus-visible:translate-x-[46px] group-focus-visible:opacity-0 motion-reduce:transition-none">Next</span>
      <span className="absolute inset-0 z-[2] inline-flex translate-x-[46px] items-center justify-center gap-2 text-[#fafafa] opacity-0 [transition:transform_.35s_cubic-bezier(.16,1,.3,1),opacity_.3s_ease] group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 motion-reduce:transition-none" aria-hidden="true">
        Next
        <ArrowRight className="shrink-0" size={19} strokeWidth={2.4} />
      </span>
    </button>
  );
}`;
