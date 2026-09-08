export function ProjectTextSwapButton() {
  return (
    <button
      type="button"
      className="group relative inline-flex w-full max-w-44 cursor-pointer appearance-none box-border items-center justify-center overflow-hidden rounded-full border border-[#f0f0f0] bg-transparent px-8 py-3 text-center text-[#f0f0f0] [font-family:Arial,Helvetica,sans-serif] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f97316]"
    >
      <span className="relative z-10 flex text-[16px] font-normal [line-height:normal] [transition:transform_.36s_cubic-bezier(.16,1,.3,1),opacity_.22s_ease] group-hover:-translate-y-[160%] group-hover:opacity-0 group-focus-visible:-translate-y-[160%] group-focus-visible:opacity-0">Start a Project</span>
      <span className="absolute z-10 flex translate-y-[160%] text-[16px] font-normal [line-height:normal] opacity-0 [transition:transform_.36s_cubic-bezier(.16,1,.3,1),opacity_.22s_ease] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100" aria-hidden="true">Start a Project</span>
    </button>
  );
}
