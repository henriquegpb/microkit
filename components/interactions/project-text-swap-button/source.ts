export const componentCode = `export function ProjectTextSwapButton() {
  return (
    <button type="button" className="project-text-swap-button">
      <span className="project-text-swap-label project-text-swap-label-current">
        Start a Project
      </span>
      <span
        className="project-text-swap-label project-text-swap-label-incoming"
        aria-hidden="true"
      >
        Start a Project
      </span>
    </button>
  );
}

/* project-text-swap-button.css */
.project-text-swap-button {
  box-sizing: border-box;
  appearance: none;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 176px;
  overflow: hidden;
  border: 1px solid #f0f0f0;
  border-radius: 999px;
  background: transparent;
  padding: 12px 32px;
  color: #f0f0f0;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  cursor: pointer;
}
.project-text-swap-label {
  z-index: 1;
  display: flex;
  white-space: nowrap;
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
  transition: transform .36s cubic-bezier(.16, 1, .3, 1), opacity .22s ease;
}
.project-text-swap-label-current {
  position: relative;
}
.project-text-swap-label-incoming {
  position: absolute;
  opacity: 0;
  transform: translateY(160%);
}
.project-text-swap-button:hover .project-text-swap-label-current,
.project-text-swap-button:focus-visible .project-text-swap-label-current {
  opacity: 0;
  transform: translateY(-160%);
}
.project-text-swap-button:hover .project-text-swap-label-incoming,
.project-text-swap-button:focus-visible .project-text-swap-label-incoming {
  opacity: 1;
  transform: translateY(0);
}
.project-text-swap-button:focus-visible {
  outline: 2px solid #f97316;
  outline-offset: 4px;
}`;

export const tailwindCode = `export function ProjectTextSwapButton() {
  return (
    <button
      type="button"
      className="group relative inline-flex w-full max-w-44 cursor-pointer appearance-none box-border items-center justify-center overflow-hidden rounded-full border border-[#f0f0f0] bg-transparent px-8 py-3 text-center text-[#f0f0f0] [font-family:Arial,Helvetica,sans-serif] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f97316]"
    >
      <span className="relative z-10 flex text-[16px] font-normal [line-height:normal] [transition:transform_.36s_cubic-bezier(.16,1,.3,1),opacity_.22s_ease] group-hover:-translate-y-[160%] group-hover:opacity-0 group-focus-visible:-translate-y-[160%] group-focus-visible:opacity-0">Start a Project</span>
      <span className="absolute z-10 flex translate-y-[160%] text-[16px] font-normal [line-height:normal] opacity-0 [transition:transform_.36s_cubic-bezier(.16,1,.3,1),opacity_.22s_ease] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100" aria-hidden="true">Start a Project</span>
    </button>
  );
}`;
