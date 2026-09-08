"use client";

import { useState } from "react";

const tabs = [
  { label: "Audience", content: "Content one" },
  { label: "Reactions", content: "Content two" },
  { label: "Saved", content: "Content three" },
];

export function SlidingUnderlineTabs() {
  const [active, setActive] = useState(0);
  const activeTab = tabs[active];

  return (
    <>
      <style>{"@keyframes underline-tabs-enter { from { opacity: 0; transform: translateX(-5px); } to { opacity: 1; transform: translateX(0); } }"}</style>
    <section className="w-full max-w-[248px] rounded-[10px] border border-[#30343a] bg-[#101216] p-[5px]">
      <div className="relative grid grid-cols-3 border-b border-[#30343a]" role="tablist" aria-label="Activity">
        {tabs.map(({ label }, index) => (
          <button
            key={label}
            id={`underline-tab-${index}`}
            type="button"
            role="tab"
            aria-selected={active === index}
            className={`relative z-10 cursor-pointer border-0 bg-transparent px-1 py-[9px] text-[10px] transition-colors duration-300 ease-[cubic-bezier(.16,1,.3,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#f97316] motion-reduce:transition-none ${active === index ? "text-white" : "text-[#858c96]"}`}
            onClick={() => setActive(index)}
          >
            {label}
          </button>
        ))}
        <span
          className="pointer-events-none absolute bottom-[-2px] left-1 h-[3px] w-[calc(33.333333%_-_8px)] rounded-full bg-[#f97316] transition-transform duration-[750ms] ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none"
          style={{ transform: `translateX(calc(${active * 100}% + ${active * 8}px))` }}
          aria-hidden="true"
        />
      </div>
      <div key={active} className="grid min-h-[54px] place-content-center px-2 pb-1.5 pt-2.5 text-center text-[11px] text-[#f4f5f7] [animation:underline-tabs-enter_.65s_cubic-bezier(.22,1,.36,1)] motion-reduce:animate-none">
        <span>{activeTab.content}</span>
      </div>
    </section>
    </>
  );
}
