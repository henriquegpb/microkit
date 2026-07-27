export const componentCode = `export function YellowFillPreviewButton() {
  return (
    <button type="button" className="yellow-fill-preview-button">
      <span className="yellow-fill-preview-button-label">Preview in browser</span>
      <span className="yellow-fill-preview-button-fill" aria-hidden="true" />
    </button>
  );
}

/* yellow-fill-preview-button.css */
.yellow-fill-preview-button {
  appearance: none;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 1px solid #f0f0f0;
  border-radius: 999px;
  background: transparent;
  padding: 12px 24px;
  color: #f0f0f0;
  font-family: Arial, Helvetica, sans-serif;
  cursor: pointer;
}
.yellow-fill-preview-button-label {
  position: relative;
  z-index: 1;
  font-size: 16px;
  font-weight: 500;
  transition: color .3s ease;
}
.yellow-fill-preview-button-fill {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 0;
  background: #f97316;
  transition: width .5s cubic-bezier(.16, 1, .3, 1);
}
.yellow-fill-preview-button:hover .yellow-fill-preview-button-label,
.yellow-fill-preview-button:focus-visible .yellow-fill-preview-button-label {
  color: #111;
}
.yellow-fill-preview-button:hover .yellow-fill-preview-button-fill,
.yellow-fill-preview-button:focus-visible .yellow-fill-preview-button-fill {
  width: 100%;
}
.yellow-fill-preview-button:focus-visible {
  outline: 2px solid #f97316;
  outline-offset: 4px;
}`;

export const tailwindCode = `export function YellowFillPreviewButton() {
  return (
    <button
      type="button"
      className="group relative inline-flex cursor-pointer appearance-none items-center justify-center overflow-hidden rounded-full border border-[#f0f0f0] bg-transparent px-6 py-3 text-[#f0f0f0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f97316]"
    >
      <span className="relative z-10 text-base font-medium transition-colors duration-300 group-hover:text-[#111] group-focus-visible:text-[#111]">Preview in browser</span>
      <span className="absolute inset-y-0 left-0 w-0 bg-[#f97316] transition-[width] duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:w-full group-focus-visible:w-full" aria-hidden="true" />
    </button>
  );
}`;
