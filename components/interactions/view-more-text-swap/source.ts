export const componentCode = `export function ViewMoreTextSwap() {
  return (
    <button type="button" className="view-more-text-swap">
      <span className="view-more-text-swap-label view-more-text-swap-label-current">
        View More
      </span>
      <span
        className="view-more-text-swap-label view-more-text-swap-label-incoming"
        aria-hidden="true"
      >
        View More
      </span>
    </button>
  );
}

/* view-more-text-swap.css */
.view-more-text-swap {
  appearance: none;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 0;
  background: transparent;
  padding: 0;
  color: #f0f0f0;
  font-family: Arial, Helvetica, sans-serif;
  cursor: pointer;
}
.view-more-text-swap-label {
  z-index: 1;
  display: flex;
  white-space: nowrap;
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
  transition: transform .36s cubic-bezier(.16, 1, .3, 1), opacity .22s ease;
}
.view-more-text-swap-label-current {
  position: relative;
}
.view-more-text-swap-label-incoming {
  position: absolute;
  opacity: 0;
  transform: translateY(160%);
}
.view-more-text-swap:hover .view-more-text-swap-label-current,
.view-more-text-swap:focus-visible .view-more-text-swap-label-current {
  opacity: 0;
  transform: translateY(-160%);
}
.view-more-text-swap:hover .view-more-text-swap-label-incoming,
.view-more-text-swap:focus-visible .view-more-text-swap-label-incoming {
  opacity: 1;
  transform: translateY(0);
}
.view-more-text-swap:focus-visible {
  outline: 2px solid #f97316;
  outline-offset: 4px;
}`;

export const tailwindCode = `export function ViewMoreTextSwap() {
  return (
    <button
      type="button"
      className="group relative inline-flex cursor-pointer appearance-none items-center justify-center overflow-hidden border-0 bg-transparent p-0 text-[#f0f0f0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f97316]"
    >
      <span className="relative z-10 flex whitespace-nowrap text-[16px] font-normal [line-height:normal] [transition:transform_.36s_cubic-bezier(.16,1,.3,1),opacity_.22s_ease] group-hover:-translate-y-[160%] group-hover:opacity-0 group-focus-visible:-translate-y-[160%] group-focus-visible:opacity-0">View More</span>
      <span className="absolute z-10 flex translate-y-[160%] whitespace-nowrap text-[16px] font-normal [line-height:normal] opacity-0 [transition:transform_.36s_cubic-bezier(.16,1,.3,1),opacity_.22s_ease] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100" aria-hidden="true">View More</span>
    </button>
  );
}`;
