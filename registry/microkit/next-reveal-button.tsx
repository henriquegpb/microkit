import { ArrowRight } from "lucide-react";

export function NextRevealButton() {
  return (
    <button type="button" className="group relative inline-flex h-[42px] w-[110px] items-center justify-end overflow-hidden rounded-full border border-[light-dark(#14181e33,#f0f0f033)] bg-[light-dark(#ffffff,#171717)] px-[15px] text-[light-dark(#14181e,#f0f0f0)] cursor-pointer transition-[background-color,border-color,color] duration-500 ease-[cubic-bezier(.4,0,.2,1)] hover:border-transparent hover:bg-[#f97316] hover:text-[light-dark(#f0f2f5,#171d1a)] focus-visible:border-transparent focus-visible:bg-[#f97316] focus-visible:text-[light-dark(#f0f2f5,#171d1a)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f97316]">
      <span className="absolute left-[21px] translate-y-[160%] text-base font-normal opacity-0 transition-[opacity,translate] duration-300 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
        Next
      </span>
      <ArrowRight className="relative z-10 shrink-0" size={27} strokeWidth={1.7} />
    </button>
  );
}
