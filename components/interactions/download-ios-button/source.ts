export const componentCode = `import { ArrowRight } from "lucide-react";

function AppleMark() {
  return (
    <svg className="download-ios-apple" width="18" height="20" viewBox="0 0 14 16" fill="none" aria-hidden="true">
      <path d="M13.5621 5.45739C13.4857 5.50195 11.6671 6.44248 11.6671 8.52785C11.7528 10.9061 13.9621 11.7401 14 11.7401C13.9621 11.7847 13.6665 12.8763 12.7907 14.0205C12.0956 15.0062 11.3242 16 10.1528 16C9.0385 16 8.6385 15.3431 7.35278 15.3431C5.97203 15.3431 5.58135 16 4.5242 16C3.35277 16 2.52419 14.953 1.79127 13.9766C.839096 12.6986.0297778 10.6931.00120634 8.76747C-.0180484 7.74707.19189 6.74403.72481 5.89206C1.47699 4.70265 2.81985 3.89524 4.28631 3.86862C5.40992 3.83331 6.40992 4.58747 7.09563 4.58747C7.75278 4.58747 8.98135 3.86862 10.3714 3.86862C10.9714 3.86919 12.5714 4.03762 13.5621 5.45739ZM7.0006 3.66488C6.8006 2.73303 7.35278 1.80119 7.86706 1.20677C8.52421.487918 9.5621 0 10.4571 0C10.5143.931848 10.1522 1.84575 9.50496 2.51136C8.92421 3.23021 7.92421 3.77138 7.0006 3.66488Z" fill="currentColor" />
    </svg>
  );
}

export function DownloadIOSButton() {
  return (
    <button type="button" className="download-ios-button">
      <span className="download-ios-content">
        <AppleMark />
        <span className="download-ios-label">Download for iOS</span>
        <span className="download-ios-arrow" aria-hidden="true">
          <ArrowRight size={17} strokeWidth={2.4} />
        </span>
      </span>
    </button>
  );
}

/* download-ios-button.css */
.download-ios-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 228px;
  min-height: 56px;
  overflow: hidden;
  border: 1px solid #ffffff14;
  border-radius: 12px;
  background: transparent;
  padding: 8px 16px;
  color: #f0f0f0;
}
.download-ios-content {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.download-ios-apple {
  width: 24px;
  height: 24px;
  flex: none;
  color: #f0f0f0;
  transition: width .52s cubic-bezier(.16, 1, .3, 1), margin .52s cubic-bezier(.16, 1, .3, 1), opacity .24s ease, transform .52s cubic-bezier(.16, 1, .3, 1);
}
.download-ios-label {
  position: relative;
  z-index: 1;
  white-space: nowrap;
  font-size: 16px;
  font-weight: 500;
}
.download-ios-arrow {
  display: grid;
  width: 0;
  height: 24px;
  margin-left: -8px;
  overflow: hidden;
  place-items: center;
  opacity: 0;
  transform: translateX(18px);
  transition: width .52s cubic-bezier(.16, 1, .3, 1), margin .52s cubic-bezier(.16, 1, .3, 1), opacity .24s ease, transform .52s cubic-bezier(.16, 1, .3, 1);
}
.download-ios-button:hover .download-ios-apple,
.download-ios-button:focus-visible .download-ios-apple {
  width: 0;
  margin-right: -8px;
  opacity: 0;
  transform: translateX(-18px);
}
.download-ios-button:hover .download-ios-arrow,
.download-ios-button:focus-visible .download-ios-arrow {
  width: 24px;
  margin-left: 0;
  opacity: 1;
  transform: translateX(0);
}
.download-ios-button:focus-visible {
  outline: 2px solid #f97316;
  outline-offset: 3px;
}`;

export const tailwindCode = `import { ArrowRight } from "lucide-react";

function AppleMark() {
  return (
    <svg className="size-6 shrink-0 text-[#f0f0f0] transition-[width,margin,opacity,transform] duration-[520ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:-mr-2 group-hover:w-0 group-hover:-translate-x-[18px] group-hover:opacity-0 group-focus-visible:-mr-2 group-focus-visible:w-0 group-focus-visible:-translate-x-[18px] group-focus-visible:opacity-0" width="18" height="20" viewBox="0 0 14 16" fill="none" aria-hidden="true">
      <path d="M13.5621 5.45739C13.4857 5.50195 11.6671 6.44248 11.6671 8.52785C11.7528 10.9061 13.9621 11.7401 14 11.7401C13.9621 11.7847 13.6665 12.8763 12.7907 14.0205C12.0956 15.0062 11.3242 16 10.1528 16C9.0385 16 8.6385 15.3431 7.35278 15.3431C5.97203 15.3431 5.58135 16 4.5242 16C3.35277 16 2.52419 14.953 1.79127 13.9766C.839096 12.6986.0297778 10.6931.00120634 8.76747C-.0180484 7.74707.19189 6.74403.72481 5.89206C1.47699 4.70265 2.81985 3.89524 4.28631 3.86862C5.40992 3.83331 6.40992 4.58747 7.09563 4.58747C7.75278 4.58747 8.98135 3.86862 10.3714 3.86862C10.9714 3.86919 12.5714 4.03762 13.5621 5.45739ZM7.0006 3.66488C6.8006 2.73303 7.35278 1.80119 7.86706 1.20677C8.52421.487918 9.5621 0 10.4571 0C10.5143.931848 10.1522 1.84575 9.50496 2.51136C8.92421 3.23021 7.92421 3.77138 7.0006 3.66488Z" fill="currentColor" />
    </svg>
  );
}

export function DownloadIOSButton() {
  return (
    <button className="group inline-flex min-h-14 w-[228px] items-center justify-center overflow-hidden rounded-xl border border-[#ffffff14] bg-transparent px-4 py-2 text-[#f0f0f0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#f97316]">
      <span className="relative inline-flex items-center gap-2">
        <AppleMark />
        <span className="relative z-10 whitespace-nowrap text-base font-medium">Download for IOS</span>
        <span className="-ml-2 grid h-6 w-0 translate-x-[18px] place-items-center overflow-hidden opacity-0 transition-[width,margin,opacity,transform] duration-[520ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:ml-0 group-hover:w-6 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:ml-0 group-focus-visible:w-6 group-focus-visible:translate-x-0 group-focus-visible:opacity-100" aria-hidden="true">
          <ArrowRight size={17} strokeWidth={2.4} />
        </span>
      </span>
    </button>
  );
}`;
