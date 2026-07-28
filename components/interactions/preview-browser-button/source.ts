export const componentCode = `import { ArrowRight } from "lucide-react";

export function PreviewInBrowserButton() {
  return (
    <button type="button" className="preview-browser-button">
      <span>Preview in browser</span>
      <span className="preview-browser-icon" aria-hidden="true">
        <ArrowRight className="preview-browser-arrow preview-browser-arrow-current" size={17} strokeWidth={2.4} />
        <ArrowRight className="preview-browser-arrow preview-browser-arrow-incoming" size={17} strokeWidth={2.4} />
      </span>
    </button>
  );
}

/* preview-browser-button.css */
.preview-browser-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1px solid #f0f0f0;
  border-radius: 999px;
  background: transparent;
  padding: 12px 24px;
  color: #f0f0f0;
  font-size: 16px;
  font-weight: 500;
}
.preview-browser-icon {
  position: relative;
  display: grid;
  width: 17px;
  height: 20px;
  place-items: center;
  overflow: hidden;
}
.preview-browser-arrow {
  position: absolute;
  transform: rotate(-45deg);
  transition: transform .5s cubic-bezier(.16, 1, .3, 1);
}
.preview-browser-arrow-incoming {
  transform: translate(-16px, 12px) rotate(-45deg);
}
.preview-browser-button:hover .preview-browser-arrow-current,
.preview-browser-button:focus-visible .preview-browser-arrow-current {
  transform: translate(16px, -12px) rotate(-45deg);
}
.preview-browser-button:hover .preview-browser-arrow-incoming,
.preview-browser-button:focus-visible .preview-browser-arrow-incoming {
  transform: translate(0, 0) rotate(-45deg);
}
.preview-browser-button:focus-visible {
  outline: 2px solid #f97316;
  outline-offset: 3px;
}`;

export const tailwindCode = `import { ArrowRight } from "lucide-react";

export function PreviewInBrowserButton() {
  return (
    <button className="group inline-flex items-center justify-center gap-2 rounded-full border border-[#f0f0f0] bg-transparent px-6 py-3 text-base font-medium text-[#f0f0f0]">
      <span>Preview in browser</span>
      <span className="relative grid h-5 w-[17px] place-items-center overflow-hidden">
        <ArrowRight className="absolute rotate-[-45deg] transition-transform duration-[500ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-4 group-hover:-translate-y-3" size={17} strokeWidth={2.4} />
        <ArrowRight className="absolute -translate-x-4 translate-y-3 rotate-[-45deg] transition-transform duration-[500ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-0 group-hover:translate-y-0" size={17} strokeWidth={2.4} />
      </span>
    </button>
  );
}`;
