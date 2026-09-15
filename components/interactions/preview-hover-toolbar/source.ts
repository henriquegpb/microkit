export const componentCode = `"use client";

import "./styles.css";

import { Expand, MoreHorizontal, Split } from "lucide-react";

const actions = [
  { id: "view", label: "View All", icon: Expand },
  { id: "branch", label: "Branch", icon: Split },
  { id: "more", label: "More", icon: MoreHorizontal },
];

export function PreviewHoverToolbar() {
  return (
    <div className="preview-toolbar">
      <div className="preview-toolbar__anchor">
        <div className="preview-toolbar__bar">
          <div className="preview-toolbar__row" role="toolbar" aria-label="Preview actions">
            {actions.map((action) => (
              <button
                key={action.id}
                type="button"
                className="preview-toolbar__action"
                aria-label={action.label}
              >
                <span className="preview-toolbar__tip" aria-hidden="true">
                  {action.label}
                </span>
                <action.icon size={15} strokeWidth={1.8} aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* styles.css */
.preview-toolbar,
.preview-toolbar *,
.preview-toolbar *::before,
.preview-toolbar *::after {
  box-sizing: border-box;
}

.preview-toolbar {
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 140px;
  align-items: center;
  justify-content: center;
  color: #dfe2e5;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 11px;
}

.preview-toolbar__anchor {
  display: flex;
  height: 34px;
  align-items: flex-end;
}

.preview-toolbar__bar {
  position: relative;
  width: 44px;
  height: 16px;
  border: 1px solid #2e3238;
  border-radius: 999px;
  background: rgba(14, 16, 19, .55);
  transition:
    width 170ms cubic-bezier(.5, 0, .66, .2),
    height 170ms cubic-bezier(.5, 0, .66, .2),
    background-color 170ms cubic-bezier(.5, 0, .66, .2),
    border-color 170ms cubic-bezier(.5, 0, .66, .2);
}

.preview-toolbar:hover .preview-toolbar__bar,
.preview-toolbar:focus-within .preview-toolbar__bar {
  width: 104px;
  height: 34px;
  border-color: #3a4048;
  background: #15181c;
  transition:
    width 170ms cubic-bezier(.34, .8, .5, 1),
    height 170ms cubic-bezier(.34, .8, .5, 1),
    background-color 170ms cubic-bezier(.34, .8, .5, 1),
    border-color 170ms cubic-bezier(.34, .8, .5, 1);
}

.preview-toolbar__row {
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  align-items: center;
  gap: 4px;
  transform: translate(-50%, -50%);
}

.preview-toolbar__action {
  position: relative;
  display: grid;
  width: 28px;
  height: 28px;
  flex: none;
  place-items: center;
  border: 0;
  border-radius: 999px;
  background: transparent;
  padding: 0;
  color: #868d97;
  font: inherit;
  opacity: 0;
  transform: scale(.55);
  pointer-events: none;
  cursor: pointer;
  transition:
    opacity 70ms ease,
    transform 90ms cubic-bezier(.64, 0, .78, 0),
    background-color 150ms ease,
    color 150ms ease;
}

.preview-toolbar:hover .preview-toolbar__action,
.preview-toolbar:focus-within .preview-toolbar__action {
  opacity: 1;
  transform: scale(1);
  pointer-events: auto;
  transition:
    opacity 70ms ease 80ms,
    transform 90ms cubic-bezier(.22, 1, .36, 1) 80ms,
    background-color 150ms ease,
    color 150ms ease;
}

.preview-toolbar__action:hover {
  background: #2a2f36;
  color: #f4f5f7;
}

.preview-toolbar__action:focus-visible {
  outline: 1.5px solid #86b6ff;
  outline-offset: 1px;
}

.preview-toolbar__action svg {
  flex: none;
}

.preview-toolbar__tip {
  position: absolute;
  bottom: calc(100% + 12px);
  left: 50%;
  border: 1px solid #2e3238;
  border-radius: 8px;
  background: #1c1f24;
  padding: 5px 9px;
  color: #e7e9ec;
  font-size: 11px;
  line-height: 1;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transform: translate(-50%, 5px) scale(.94);
  box-shadow: 0 10px 20px rgba(0, 0, 0, .45);
  transition:
    opacity .18s ease,
    transform .3s cubic-bezier(.22, 1, .36, 1);
}

.preview-toolbar__action:hover .preview-toolbar__tip,
.preview-toolbar__action:focus-visible .preview-toolbar__tip {
  opacity: 1;
  transform: translate(-50%, 0) scale(1);
}

@media (prefers-reduced-motion: reduce) {
  .preview-toolbar__bar,
  .preview-toolbar__action,
  .preview-toolbar__tip,
  .preview-toolbar:hover .preview-toolbar__bar,
  .preview-toolbar:focus-within .preview-toolbar__bar,
  .preview-toolbar:hover .preview-toolbar__action,
  .preview-toolbar:focus-within .preview-toolbar__action {
    transition-duration: .01ms;
    transition-delay: 0ms;
  }
}`;

export const tailwindCode = `"use client";

import { Expand, MoreHorizontal, Split } from "lucide-react";

const actions = [
  { id: "view", label: "View All", icon: Expand },
  { id: "branch", label: "Branch", icon: Split },
  { id: "more", label: "More", icon: MoreHorizontal },
];

export function PreviewHoverToolbar() {
  return (
    <div className="group/preview flex h-full min-h-[140px] w-full items-center justify-center font-[Arial,Helvetica,sans-serif] text-[11px] text-[#dfe2e5]">
      <div className="flex h-[34px] items-end">
        <div className="relative h-[16px] w-[44px] rounded-full border border-[#2e3238] bg-[rgba(14,16,19,.55)] [transition:width_170ms_cubic-bezier(.5,0,.66,.2),height_170ms_cubic-bezier(.5,0,.66,.2),background-color_170ms_cubic-bezier(.5,0,.66,.2),border-color_170ms_cubic-bezier(.5,0,.66,.2)] group-hover/preview:h-[34px] group-hover/preview:w-[104px] group-hover/preview:border-[#3a4048] group-hover/preview:bg-[#15181c] group-hover/preview:[transition:width_170ms_cubic-bezier(.34,.8,.5,1),height_170ms_cubic-bezier(.34,.8,.5,1),background-color_170ms_cubic-bezier(.34,.8,.5,1),border-color_170ms_cubic-bezier(.34,.8,.5,1)] group-focus-within/preview:h-[34px] group-focus-within/preview:w-[104px] group-focus-within/preview:border-[#3a4048] group-focus-within/preview:bg-[#15181c] group-focus-within/preview:[transition:width_170ms_cubic-bezier(.34,.8,.5,1),height_170ms_cubic-bezier(.34,.8,.5,1),background-color_170ms_cubic-bezier(.34,.8,.5,1),border-color_170ms_cubic-bezier(.34,.8,.5,1)] motion-reduce:transition-none motion-reduce:group-hover/preview:transition-none motion-reduce:group-focus-within/preview:transition-none">
          <div
            className="absolute left-1/2 top-1/2 flex items-center gap-[4px] [transform:translate(-50%,-50%)]"
            role="toolbar"
            aria-label="Preview actions"
          >
            {actions.map((action) => (
              <button
                key={action.id}
                type="button"
                className="group/action pointer-events-none relative grid size-[28px] flex-none cursor-pointer place-items-center rounded-full border-0 bg-transparent p-0 font-[inherit] text-[#868d97] opacity-0 [transform:scale(.55)] [transition:opacity_70ms_ease,transform_90ms_cubic-bezier(.64,0,.78,0),background-color_150ms_ease,color_150ms_ease] hover:bg-[#2a2f36] hover:text-[#f4f5f7] focus-visible:outline-[1.5px] focus-visible:outline-offset-1 focus-visible:outline-[#86b6ff] group-hover/preview:pointer-events-auto group-hover/preview:opacity-100 group-hover/preview:[transform:scale(1)] group-hover/preview:[transition:opacity_70ms_ease_80ms,transform_90ms_cubic-bezier(.22,1,.36,1)_80ms,background-color_150ms_ease,color_150ms_ease] group-focus-within/preview:pointer-events-auto group-focus-within/preview:opacity-100 group-focus-within/preview:[transform:scale(1)] group-focus-within/preview:[transition:opacity_70ms_ease_80ms,transform_90ms_cubic-bezier(.22,1,.36,1)_80ms,background-color_150ms_ease,color_150ms_ease] motion-reduce:transition-none motion-reduce:group-hover/preview:transition-none motion-reduce:group-focus-within/preview:transition-none"
                aria-label={action.label}
              >
                <span
                  className="pointer-events-none absolute bottom-[calc(100%+12px)] left-1/2 whitespace-nowrap rounded-[8px] border border-[#2e3238] bg-[#1c1f24] px-[9px] py-[5px] text-[11px] leading-none text-[#e7e9ec] opacity-0 shadow-[0_10px_20px_rgba(0,0,0,.45)] [transform:translate(-50%,5px)_scale(.94)] [transition:opacity_.18s_ease,transform_.3s_cubic-bezier(.22,1,.36,1)] group-hover/action:opacity-100 group-hover/action:[transform:translate(-50%,0)_scale(1)] group-focus-visible/action:opacity-100 group-focus-visible/action:[transform:translate(-50%,0)_scale(1)] motion-reduce:transition-none"
                  aria-hidden="true"
                >
                  {action.label}
                </span>
                <action.icon size={15} strokeWidth={1.8} aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}`;
