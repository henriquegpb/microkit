import { ArrowRight } from "lucide-react";

export function ReadMoreSwap() {
  return (
    <button className="group inline-flex h-12 items-center gap-3 overflow-hidden border-0 bg-transparent p-0 text-base font-medium text-[#f0f0f0]">
      <ArrowRight className="w-0 shrink-0 translate-x-[-12px] text-[#f97316] opacity-0 transition-[width,transform,opacity] duration-[240ms] group-hover:w-[25px] group-hover:translate-x-0 group-hover:opacity-100" size={25} strokeWidth={2.5} />
      <span>Read more</span>
      <ArrowRight className="w-[25px] shrink-0 transition-[width,transform,opacity] duration-[240ms] group-hover:w-0 group-hover:translate-x-3 group-hover:opacity-0" size={25} strokeWidth={2.5} />
    </button>
  );
}
