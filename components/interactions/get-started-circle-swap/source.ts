export const componentCode = `import "./styles.css";

import { ArrowRight } from "lucide-react";

export function GetStartedCircleSwap() {
  return (
    <button type="button" className="get-started-circle-swap">
      <span className="get-started-circle-swap__label">Get started</span>
      <span className="get-started-circle-swap__circle" aria-hidden="true" />
      <span className="get-started-circle-swap__arrow" aria-hidden="true">
        <ArrowRight size={19} strokeWidth={2.4} />
      </span>
    </button>
  );
}

/* styles.css */
.get-started-circle-swap,
.get-started-circle-swap * {
  box-sizing: border-box;
}

.get-started-circle-swap {
  appearance: none;
  position: relative;
  display: inline-flex;
  width: min(170px, calc(100vw - 40px));
  height: 50px;
  align-items: center;
  overflow: hidden;
  border: 1px solid #48484f;
  border-radius: 999px;
  background: #15151b;
  padding: 0 52px 0 20px;
  color: #f7f7fa;
  font-family: Arial, Helvetica, sans-serif;
  cursor: pointer;
  transition: border-color .3s ease, background-color .3s ease;
}

.get-started-circle-swap__label {
  white-space: nowrap;
  font-size: 15px;
  font-weight: 400;
  letter-spacing: -.35px;
  line-height: 1;
  text-transform: uppercase;
}

.get-started-circle-swap__circle,
.get-started-circle-swap__arrow {
  position: absolute;
  right: 9px;
  top: 50%;
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.get-started-circle-swap__circle {
  right: 14px;
  width: 20px;
  height: 20px;
  background: #f97316;
  transform: translate(0, -50%);
  transition: transform .42s cubic-bezier(.16, 1, .3, 1);
}

.get-started-circle-swap__arrow {
  display: grid;
  place-items: center;
  color: #f7f7fa;
  transform: translate(-24px, -50%);
  opacity: 0;
  transition: opacity .18s ease, transform .42s cubic-bezier(.16, 1, .3, 1);
}

.get-started-circle-swap:hover,
.get-started-circle-swap:focus-visible {
  border-color: #5a5a62;
  background: #18181e;
}

.get-started-circle-swap:hover .get-started-circle-swap__circle,
.get-started-circle-swap:focus-visible .get-started-circle-swap__circle {
  transform: translate(42px, -50%);
}

.get-started-circle-swap:hover .get-started-circle-swap__arrow,
.get-started-circle-swap:focus-visible .get-started-circle-swap__arrow {
  opacity: 1;
  transform: translate(0, -50%);
}

.get-started-circle-swap:focus-visible {
  outline: 2px solid #f97316;
  outline-offset: 4px;
}

@media (prefers-reduced-motion: reduce) {
  .get-started-circle-swap,
  .get-started-circle-swap__circle,
  .get-started-circle-swap__arrow {
    transition: none;
  }
}`;

export const tailwindCode = `import { ArrowRight } from "lucide-react";

export function GetStartedCircleSwap() {
  return (
    <button type="button" className="group relative inline-flex h-[50px] w-[min(170px,calc(100vw_-_40px))] cursor-pointer appearance-none items-center overflow-hidden rounded-full border border-[#48484f] bg-[#15151b] py-0 pr-[52px] pl-5 font-[Arial,Helvetica,sans-serif] text-[#f7f7fa] transition-[border-color,background-color] duration-300 hover:border-[#5a5a62] hover:bg-[#18181e] focus-visible:border-[#5a5a62] focus-visible:bg-[#18181e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f97316] motion-reduce:transition-none">
      <span className="whitespace-nowrap text-[15px] font-normal uppercase leading-none tracking-[-.35px]">Get started</span>
      <span className="absolute right-[14px] top-1/2 size-5 -translate-y-1/2 rounded-full bg-[#f97316] transition-transform duration-[420ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-[42px] group-focus-visible:translate-x-[42px] motion-reduce:transition-none" aria-hidden="true" />
      <span className="absolute right-[9px] top-1/2 grid size-[30px] -translate-x-6 -translate-y-1/2 place-items-center rounded-full text-[#f7f7fa] opacity-0 [transition:opacity_.18s_ease,transform_.42s_cubic-bezier(.16,1,.3,1)] group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 motion-reduce:transition-none" aria-hidden="true">
        <ArrowRight size={19} strokeWidth={2.4} />
      </span>
    </button>
  );
}`;
