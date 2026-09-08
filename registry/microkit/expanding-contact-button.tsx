import { ArrowRight } from "lucide-react";

export function ExpandingContactButton() {
  return (
    <button className="group relative inline-flex h-9 w-9 items-center overflow-hidden rounded-full border-0 bg-transparent p-0 text-[13px] font-medium leading-none text-[#f0f0f0] transition-[width,background-color,color] duration-[320ms] ease-[cubic-bezier(.4,0,.2,1)] hover:w-[145px] hover:bg-[#f4f4f5] hover:text-[#111] focus-visible:w-[145px] focus-visible:bg-[#f4f4f5] focus-visible:text-[#111]">
      <span className="relative z-10 grid size-9 shrink-0 place-items-center rounded-full bg-[#f97316] text-[#111]">
        <ArrowRight size={18} strokeWidth={2.5} />
      </span>
      <span className="absolute left-[47px] whitespace-nowrap opacity-0 -translate-x-[5px] transition-[opacity,transform] duration-[240ms] delay-[60ms] group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100">
        Get in touch
      </span>
    </button>
  );
}
