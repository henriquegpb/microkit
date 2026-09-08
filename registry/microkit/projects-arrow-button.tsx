import { ArrowRight } from "lucide-react";

export function ProjectsArrowButton() {
  return (
    <button className="group inline-flex items-center gap-[9px] border-0 bg-transparent p-0 text-base font-medium tracking-[.5px] text-[#f0f0f0]">
      <span>Projects</span>
      <span className="relative grid size-8 place-items-center overflow-hidden rounded-full border border-current">
        <ArrowRight className="absolute transition-transform duration-[480ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-[25px]" size={18} strokeWidth={2.4} />
        <ArrowRight className="absolute -translate-x-[25px] transition-transform duration-[480ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-0" size={18} strokeWidth={2.4} />
      </span>
    </button>
  );
}
