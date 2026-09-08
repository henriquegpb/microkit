import { ArrowRight } from "lucide-react";

export function ContactUnderlineButton() {
  return (
    <button type="button" className="group inline-flex cursor-pointer appearance-none items-center justify-start gap-2 overflow-hidden border-0 bg-transparent p-0 pr-4 font-[inherit] text-[#f0f0f0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f97316]">
      <span className="relative z-10 grid size-8 shrink-0 place-items-center rounded-lg bg-[#f0f0f0] text-black transition-colors duration-[540ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:bg-[#f97316] group-focus-visible:bg-[#f97316]" aria-hidden="true">
        <ArrowRight className="transition-transform duration-[540ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.35] group-focus-visible:scale-[1.35]" size={16} strokeWidth={2.5} />
      </span>
      <span className="flex flex-col justify-between gap-1 py-2">
        <span className="relative z-10 text-base font-medium leading-none">Get in touch</span>
        <span className="h-px w-full origin-left scale-x-0 bg-[#f0f0f0] transition-transform duration-[540ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100" />
      </span>
    </button>
  );
}
