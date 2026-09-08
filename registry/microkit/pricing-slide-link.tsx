import { ArrowRight } from "lucide-react";

export function PricingSlideLink() {
  return (
    <button className="group inline-flex items-center gap-2 overflow-hidden border-0 bg-transparent p-0 text-base font-medium leading-none text-[#f0f0f0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[5px] focus-visible:outline-[#f97316]">
      <span className="flex size-[23px] -translate-x-[150%] items-center justify-center transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-0 group-focus-visible:translate-x-0">
        <ArrowRight size={23} strokeWidth={2.25} />
      </span>
      <span className="-translate-x-4 transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-0 group-focus-visible:translate-x-0">
        Pricing
      </span>
    </button>
  );
}
