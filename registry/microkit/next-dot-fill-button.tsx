import { ArrowRight } from "lucide-react";

export function NextDotFillButton() {
  return (
    <button type="button" className="group relative inline-flex h-[50px] w-[min(132px,calc(100vw_-_40px))] cursor-pointer appearance-none items-center justify-center overflow-hidden rounded-full border border-[#d7dbe2] bg-white p-0 font-[Arial,Helvetica,sans-serif] text-base font-medium leading-none tracking-[-.02em] text-[#0a0a0a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f97316]">
      <span className="absolute left-[26px] top-[calc(50%_-_4.5px)] z-[1] size-[9px] rounded-full bg-[#0a0a0a] transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[28] group-focus-visible:scale-[28] motion-reduce:transition-none" aria-hidden="true" />
      <span className="relative z-0 translate-x-[5px] [transition:transform_.35s_cubic-bezier(.16,1,.3,1),opacity_.3s_ease] group-hover:translate-x-[46px] group-hover:opacity-0 group-focus-visible:translate-x-[46px] group-focus-visible:opacity-0 motion-reduce:transition-none">Next</span>
      <span className="absolute inset-0 z-[2] inline-flex translate-x-[46px] items-center justify-center gap-2 text-[#fafafa] opacity-0 [transition:transform_.35s_cubic-bezier(.16,1,.3,1),opacity_.3s_ease] group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 motion-reduce:transition-none" aria-hidden="true">
        Next
        <ArrowRight className="shrink-0" size={19} strokeWidth={2.4} />
      </span>
    </button>
  );
}
