import { ArrowRight } from "lucide-react";

export function GetStartedCircleSwap() {
  return (
    <button type="button" className="group relative inline-flex h-[50px] w-[min(170px,calc(100vw_-_40px))] cursor-pointer appearance-none items-center overflow-hidden rounded-full border border-[light-dark(#adb6c3,#48484f)] bg-[light-dark(#ffffff,#15151b)] py-0 pr-[52px] pl-5 font-[Arial,Helvetica,sans-serif] text-[light-dark(#14181e,#f7f7fa)] transition-[border-color,background-color] duration-300 hover:border-[light-dark(#a2aab6,#5a5a62)] hover:bg-[light-dark(#f0f2f5,#18181e)] focus-visible:border-[light-dark(#a2aab6,#5a5a62)] focus-visible:bg-[light-dark(#f0f2f5,#18181e)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f97316] motion-reduce:transition-none">
      <span className="whitespace-nowrap text-[15px] font-normal uppercase leading-none tracking-[-.35px]">Get started</span>
      <span className="absolute right-[14px] top-1/2 size-5 -translate-y-1/2 rounded-full bg-[#f97316] transition-transform duration-[420ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-[42px] group-focus-visible:translate-x-[42px] motion-reduce:transition-none" aria-hidden="true" />
      <span className="absolute right-[9px] top-1/2 grid size-[30px] -translate-x-6 -translate-y-1/2 place-items-center rounded-full text-[light-dark(#14181e,#f7f7fa)] opacity-0 [transition:opacity_.18s_ease,transform_.42s_cubic-bezier(.16,1,.3,1)] group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 motion-reduce:transition-none" aria-hidden="true">
        <ArrowRight size={19} strokeWidth={2.4} />
      </span>
    </button>
  );
}
