export const componentCode = `import { ArrowRight } from "lucide-react";

export function ReadMoreSwap() {
  return (
    <button type="button" className="read-more-swap">
      <ArrowRight className="read-more-arrow read-more-arrow-left" size={25} strokeWidth={2.5} />
      <span>Read more</span>
      <ArrowRight className="read-more-arrow read-more-arrow-right" size={25} strokeWidth={2.5} />
    </button>
  );
}

/* read-more-swap.css */
.read-more-swap { display: inline-flex; align-items: center; gap: 12px; height: 48px; border: 0; overflow: hidden; background: transparent; color: #f0f0f0; font-size: 16px; font-weight: 500; }
.read-more-arrow { flex: 0 0 25px; width: 25px; transition: flex-basis .24s ease, width .24s ease, opacity .2s ease, transform .24s ease; }
.read-more-arrow-left { flex-basis: 0; width: 0; color: #f97316; opacity: 0; transform: translateX(-12px); }
.read-more-swap:hover .read-more-arrow-left, .read-more-swap:focus-visible .read-more-arrow-left { flex-basis: 25px; width: 25px; opacity: 1; transform: translateX(0); }
.read-more-swap:hover .read-more-arrow-right, .read-more-swap:focus-visible .read-more-arrow-right { flex-basis: 0; width: 0; opacity: 0; transform: translateX(12px); }
.read-more-swap:focus-visible { outline: 2px solid #f97316; outline-offset: 4px; }`;

export const tailwindCode = `import { ArrowRight } from "lucide-react";

export function ReadMoreSwap() {
  return (
    <button className="group inline-flex h-12 items-center gap-3 overflow-hidden border-0 bg-transparent p-0 text-base font-medium text-[#f0f0f0]">
      <ArrowRight className="w-0 shrink-0 translate-x-[-12px] text-[#f97316] opacity-0 transition-[width,transform,opacity] duration-[240ms] group-hover:w-[25px] group-hover:translate-x-0 group-hover:opacity-100" size={25} strokeWidth={2.5} />
      <span>Read more</span>
      <ArrowRight className="w-[25px] shrink-0 transition-[width,transform,opacity] duration-[240ms] group-hover:w-0 group-hover:translate-x-3 group-hover:opacity-0" size={25} strokeWidth={2.5} />
    </button>
  );
}`;
