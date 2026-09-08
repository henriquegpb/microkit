import { ArrowDown } from "lucide-react";

export function SeeMoreSwapButton() {
  return (
    <button type="button" className="group inline-flex w-[196px] cursor-pointer appearance-none box-border items-center justify-center overflow-hidden rounded-full border-0 bg-[#f0f0f0] px-4 py-3 text-[#101016] [font-family:Arial,Helvetica,sans-serif] transition-colors duration-[500ms] ease-[cubic-bezier(.16,1,.3,1)] hover:bg-[#22222d] hover:text-[#f0f0f0] focus-visible:bg-[#22222d] focus-visible:text-[#f0f0f0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f97316]">
      <span className="relative flex h-10 w-full items-center justify-center">
        <span className="absolute left-0 grid size-10 place-items-center rounded-full bg-[#101016] text-white transition-transform duration-[500ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-x-16 group-focus-visible:-translate-x-16" aria-hidden="true">
          <ArrowDown size={20} strokeWidth={2.4} />
        </span>
        <span className="relative z-10 translate-x-4 whitespace-nowrap text-center text-[16px] font-medium [line-height:normal] transition-transform duration-[500ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-x-4 group-focus-visible:-translate-x-4">See more</span>
        <span className="absolute right-0 grid size-10 translate-x-16 place-items-center rounded-full bg-white text-[#101016] transition-transform duration-[500ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-0 group-focus-visible:translate-x-0" aria-hidden="true">
          <ArrowDown size={20} strokeWidth={2.4} />
        </span>
      </span>
    </button>
  );
}
