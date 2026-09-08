import { ArrowRight } from "lucide-react";

export function WhiteContactOrbitButton() {
  return (
    <button type="button" className="group relative inline-flex h-[50px] w-[160px] cursor-pointer appearance-none items-center justify-center overflow-hidden rounded-full border-0 bg-white p-0 font-[Arial,Helvetica,sans-serif] text-[#111] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
      <span className="relative z-10 mr-5 text-base font-normal leading-none tracking-[-.03em] transition-transform duration-[500ms] ease-[cubic-bezier(.16,1,.3,1)] motion-reduce:transition-none">Get in touch</span>
      <span className="absolute right-2 grid size-[34px] place-items-center rounded-full text-[#111] transition-colors duration-[120ms] group-hover:text-white group-hover:delay-[80ms] group-focus-visible:text-white group-focus-visible:delay-[80ms] motion-reduce:transition-none">
        <span className="absolute inset-0 origin-center scale-0 rounded-[inherit] bg-[#111] transition-transform duration-[420ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-100 group-focus-visible:scale-100 motion-reduce:transition-none" />
        <ArrowRight className="relative z-10 transition-transform duration-[500ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:-rotate-45 group-focus-visible:-rotate-45 motion-reduce:transition-none" size={21} strokeWidth={2.6} />
      </span>
    </button>
  );
}
