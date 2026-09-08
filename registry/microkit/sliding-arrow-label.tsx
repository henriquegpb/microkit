import { ArrowRight } from "lucide-react";

export function SlidingArrowLabel() {
  return <button type="button" className="group relative inline-flex cursor-pointer items-center overflow-hidden border-0 bg-transparent py-0 pr-6 pl-0 text-[#f0f0f0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f97316]"><span className="rounded-lg px-3 py-1 text-base font-medium transition-colors duration-300 group-hover:bg-[#f97316] group-hover:text-[#111] group-focus-visible:bg-[#f97316] group-focus-visible:text-[#111]">Create a blog</span><span className="absolute right-0 flex w-4 -translate-x-2.5 opacity-0 transition-[opacity,transform] duration-[350ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100" aria-hidden="true"><ArrowRight size={16} strokeWidth={2.4} /></span></button>;
}
