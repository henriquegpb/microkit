import type { CSSProperties } from "react";

const LABEL = "MICROKIT";

export function StaggeredLetterTextSwap() {
  return (
    <button type="button" aria-label={LABEL} className="group inline-flex cursor-pointer appearance-none items-center justify-center border-0 bg-transparent p-0 font-[Arial,Helvetica,sans-serif] text-[#f7f7fa] focus-visible:rounded-[3px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[5px] focus-visible:outline-[#f97316]">
      <span className="inline-flex items-center" aria-hidden="true">
        {LABEL.split("").map((letter, index) => (
          <span key={`${letter}-${index}`} style={{ "--letter-delay": `${index * 34}ms` } as CSSProperties} className="relative inline-grid h-[18px] place-items-center overflow-hidden text-[16px] font-semibold leading-[18px] tracking-[-.35px]">
            <span className="col-start-1 row-start-1 [transition:transform_.45s_cubic-bezier(.16,1,.3,1)] [transition-delay:var(--letter-delay)] group-hover:-translate-y-[125%] group-focus-visible:-translate-y-[125%] motion-reduce:transition-none">{letter}</span>
            <span className="col-start-1 row-start-1 translate-y-[125%] [transition:transform_.45s_cubic-bezier(.16,1,.3,1)] [transition-delay:var(--letter-delay)] group-hover:translate-y-0 group-focus-visible:translate-y-0 motion-reduce:transition-none">{letter}</span>
          </span>
        ))}
      </span>
    </button>
  );
}
