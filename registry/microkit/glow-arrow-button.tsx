import { ArrowRight } from "lucide-react";

export function GlowArrowButton() {
  return <button type="button" className="group inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-full border-0 bg-[#f0f0f0] px-8 py-4 text-base font-medium text-[#111] transition-shadow duration-300 hover:shadow-[0_3px_20px_#f0f0f080] focus-visible:shadow-[0_3px_20px_#f0f0f080] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f97316]"><span>Get Started</span><ArrowRight aria-hidden="true" size={16} strokeWidth={2.3} className="transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1" /></button>;
}
