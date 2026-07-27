export const componentCode = `import { ArrowDown } from "lucide-react";

export function SeeMoreSwapButton() {
  return (
    <button type="button" className="see-more-swap-button">
      <span className="see-more-swap-content">
        <span className="see-more-swap-icon see-more-swap-icon-left" aria-hidden="true">
          <ArrowDown size={20} strokeWidth={2.4} />
        </span>
        <span className="see-more-swap-label">See more</span>
        <span className="see-more-swap-icon see-more-swap-icon-right" aria-hidden="true">
          <ArrowDown size={20} strokeWidth={2.4} />
        </span>
      </span>
    </button>
  );
}

/* see-more-swap-button.css */
.see-more-swap-button {
  box-sizing: border-box;
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 196px;
  overflow: hidden;
  border: 0;
  border-radius: 999px;
  background: #f0f0f0;
  padding: 12px 16px;
  color: #101016;
  font-family: Arial, Helvetica, sans-serif;
  cursor: pointer;
  transition: background-color .42s cubic-bezier(.16, 1, .3, 1), color .42s cubic-bezier(.16, 1, .3, 1);
}
.see-more-swap-content {
  position: relative;
  display: flex;
  height: 40px;
  width: 100%;
  align-items: center;
  justify-content: center;
}
.see-more-swap-label {
  position: relative;
  z-index: 1;
  white-space: nowrap;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  line-height: normal;
  transform: translateX(16px);
  transition: transform .42s cubic-bezier(.16, 1, .3, 1);
}
.see-more-swap-icon {
  position: absolute;
  display: grid;
  width: 40px;
  height: 40px;
  place-items: center;
  border-radius: 50%;
  transition: transform .42s cubic-bezier(.16, 1, .3, 1);
}
.see-more-swap-icon-left {
  left: 0;
  background: #101016;
  color: #fff;
}
.see-more-swap-icon-right {
  right: 0;
  background: #fff;
  color: #101016;
  transform: translateX(64px);
}
.see-more-swap-button:hover,
.see-more-swap-button:focus-visible {
  background: #22222d;
  color: #f0f0f0;
}
.see-more-swap-button:hover .see-more-swap-icon-left,
.see-more-swap-button:focus-visible .see-more-swap-icon-left {
  transform: translateX(-64px);
}
.see-more-swap-button:hover .see-more-swap-icon-right,
.see-more-swap-button:focus-visible .see-more-swap-icon-right {
  transform: translateX(0);
}
.see-more-swap-button:hover .see-more-swap-label,
.see-more-swap-button:focus-visible .see-more-swap-label {
  transform: translateX(-16px);
}
.see-more-swap-button:focus-visible {
  outline: 2px solid #f97316;
  outline-offset: 4px;
}`;

export const tailwindCode = `import { ArrowDown } from "lucide-react";

export function SeeMoreSwapButton() {
  return (
    <button type="button" className="group inline-flex w-[196px] cursor-pointer appearance-none box-border items-center justify-center overflow-hidden rounded-full border-0 bg-[#f0f0f0] px-4 py-3 text-[#101016] [font-family:Arial,Helvetica,sans-serif] transition-colors duration-[420ms] ease-[cubic-bezier(.16,1,.3,1)] hover:bg-[#22222d] hover:text-[#f0f0f0] focus-visible:bg-[#22222d] focus-visible:text-[#f0f0f0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f97316]">
      <span className="relative flex h-10 w-full items-center justify-center">
        <span className="absolute left-0 grid size-10 place-items-center rounded-full bg-[#101016] text-white transition-transform duration-[420ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-x-16 group-focus-visible:-translate-x-16" aria-hidden="true">
          <ArrowDown size={20} strokeWidth={2.4} />
        </span>
        <span className="relative z-10 translate-x-4 whitespace-nowrap text-center text-[16px] font-medium [line-height:normal] transition-transform duration-[420ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-x-4 group-focus-visible:-translate-x-4">See more</span>
        <span className="absolute right-0 grid size-10 translate-x-16 place-items-center rounded-full bg-white text-[#101016] transition-transform duration-[420ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-0 group-focus-visible:translate-x-0" aria-hidden="true">
          <ArrowDown size={20} strokeWidth={2.4} />
        </span>
      </span>
    </button>
  );
}`;
