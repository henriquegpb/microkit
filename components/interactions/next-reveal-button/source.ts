export const componentCode = `import { ArrowRight } from "lucide-react";

export function NextRevealButton() {
  return (
    <button type="button" className="next-reveal">
      <span className="next-reveal-label">Next</span>
      <ArrowRight className="next-reveal-arrow" size={27} strokeWidth={1.7} />
    </button>
  );
}

/* next-reveal-button.css */
.next-reveal {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  width: 110px;
  height: 42px;
  overflow: hidden;
  border: 1px solid #f0f0f033;
  border-radius: 999px;
  background: #171717;
  color: #f0f0f0;
  padding: 0 15px;
  cursor: pointer;
  transition: background-color .3s cubic-bezier(.16, 1, .3, 1), border-color .3s cubic-bezier(.16, 1, .3, 1), color .3s cubic-bezier(.16, 1, .3, 1);
}
.next-reveal-label {
  position: absolute;
  left: 21px;
  font-size: 16px;
  font-weight: 400;
  opacity: 0;
  transform: translateY(160%);
  transition: opacity .3s cubic-bezier(.16, 1, .3, 1), transform .3s cubic-bezier(.16, 1, .3, 1);
}
.next-reveal-arrow { position: relative; z-index: 1; flex: none; }
.next-reveal:hover,
.next-reveal:focus-visible {
  border-color: transparent;
  background: #f97316;
  color: #171d1a;
}
.next-reveal:hover .next-reveal-label,
.next-reveal:focus-visible .next-reveal-label { opacity: 1; transform: translateY(0); }
.next-reveal:focus-visible { outline: 2px solid #f97316; outline-offset: 4px; }`;

export const tailwindCode = `import { ArrowRight } from "lucide-react";

export function NextRevealButton() {
  return (
    <button className="group relative inline-flex h-[42px] w-[110px] items-center justify-end overflow-hidden rounded-full border border-[#f0f0f033] bg-[#171717] px-[15px] text-[#f0f0f0] transition-[background-color,border-color,color] duration-300 ease-[cubic-bezier(.16,1,.3,1)] hover:border-transparent hover:bg-[#f97316] hover:text-[#171d1a] focus-visible:border-transparent focus-visible:bg-[#f97316] focus-visible:text-[#171d1a]">
      <span className="absolute left-[21px] translate-y-[160%] text-base font-normal opacity-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
        Next
      </span>
      <ArrowRight className="relative z-10 shrink-0" size={27} strokeWidth={1.7} />
    </button>
  );
}`;
