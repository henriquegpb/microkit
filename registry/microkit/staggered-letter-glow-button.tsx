import type { CSSProperties } from "react";

const LABEL = "MICROKIT";

export function StaggeredLetterGlowButton() {
  return (
    <button type="button" aria-label={LABEL} className="group relative isolate inline-flex h-[54px] w-[min(190px,calc(100vw_-_40px))] cursor-pointer appearance-none items-center justify-center rounded-full border border-[#48484f] bg-[#15151b] p-0 font-[Arial,Helvetica,sans-serif] text-[#fff8f3] [transition:background-color_.3s_ease,border-color_.32s_ease,box-shadow_.4s_cubic-bezier(.16,1,.3,1)] hover:border-[#f97316] hover:bg-[#18181e] hover:shadow-[inset_28px_0_34px_-28px_rgba(249,115,22,.62),inset_-28px_0_34px_-28px_rgba(249,115,22,.62),inset_0_0_18px_rgba(249,115,22,.08)] focus-visible:border-[#f97316] focus-visible:bg-[#18181e] focus-visible:shadow-[inset_28px_0_34px_-28px_rgba(249,115,22,.62),inset_-28px_0_34px_-28px_rgba(249,115,22,.62),inset_0_0_18px_rgba(249,115,22,.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[5px] focus-visible:outline-[#f97316] motion-reduce:transition-none">
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
