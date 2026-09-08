export function ViewMoreTextSwap() {
  return (
    <button
      type="button"
      className="group relative inline-flex cursor-pointer appearance-none items-center justify-center overflow-hidden border-0 bg-transparent p-0 text-[#f0f0f0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f97316]"
    >
      <span className="relative z-10 flex whitespace-nowrap text-[16px] font-normal [line-height:normal] [transition:transform_.36s_cubic-bezier(.16,1,.3,1),opacity_.22s_ease] group-hover:-translate-y-[160%] group-hover:opacity-0 group-focus-visible:-translate-y-[160%] group-focus-visible:opacity-0">View More</span>
      <span className="absolute z-10 flex translate-y-[160%] whitespace-nowrap text-[16px] font-normal [line-height:normal] opacity-0 [transition:transform_.36s_cubic-bezier(.16,1,.3,1),opacity_.22s_ease] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100" aria-hidden="true">View More</span>
    </button>
  );
}
