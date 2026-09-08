import { ArrowRight } from "lucide-react";

export function ExpandingNewsletterButton() {
  return (
    <button type="button" className="group relative inline-flex h-[42px] w-[min(145px,calc(100vw-40px))] cursor-pointer appearance-none items-center justify-center overflow-hidden rounded-full border-0 bg-[#f97316] p-0 font-[Arial,Helvetica,sans-serif] text-[#fffaf6] transition-[background-color,transform] duration-300 hover:bg-[#fb7b21] focus-visible:bg-[#fb7b21] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#fffaf6] active:scale-[.98] motion-reduce:transition-none">
      <span className="absolute left-[9px] top-1/2 grid size-6 -translate-y-1/2 place-items-center overflow-hidden rounded-full bg-[#141419] text-[#fffaf6] [transition:left_.42s_cubic-bezier(.16,1,.3,1),width_.42s_cubic-bezier(.16,1,.3,1),height_.42s_cubic-bezier(.16,1,.3,1)] group-hover:left-1 group-hover:size-[34px] group-focus-visible:left-1 group-focus-visible:size-[34px] motion-reduce:transition-none" aria-hidden="true">
        <ArrowRight size={15} strokeWidth={2.5} className="-translate-x-[26px] transition-transform duration-[420ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-0 group-focus-visible:translate-x-0 motion-reduce:transition-none" />
      </span>
      <span className="translate-x-2 whitespace-nowrap text-[15px] font-normal leading-none tracking-[-.45px]">Newsletter</span>
    </button>
  );
}
