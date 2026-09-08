"use client";

import { useState } from "react";
import { Star, ThumbsUp, Users } from "lucide-react";

const tabs = [
  { label: "Audience", content: "1,284 people are in your audience.", Icon: Users },
  { label: "Reactions", content: "68 people reacted to your latest post.", Icon: ThumbsUp },
  { label: "Saved", content: "12 items are saved for later.", Icon: Star },
];

export function SlidingContentTabs() {
  const [active, setActive] = useState(0);
  const activeTab = tabs[active];

  return (
    <section className="w-full max-w-[288px] rounded-[10px] border border-[#30343a] bg-[#101216] p-[5px]">
      <div className="relative grid grid-cols-3" role="tablist" aria-label="Activity">
        {tabs.map(({ label, Icon }, index) => (
          <button
            key={label}
            id={`sliding-tab-${index}`}
            type="button"
            role="tab"
            aria-selected={active === index}
            className={`relative z-10 inline-flex min-w-0 items-center justify-center gap-1.5 rounded-md border-0 bg-transparent px-1.5 py-[9px] text-[11px] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#f97316] ${active === index ? "text-white" : "text-[#858c96]"}`}
            onClick={() => setActive(index)}
          >
            <Icon size={15} strokeWidth={1.8} aria-hidden="true" />
            <span>{label}</span>
          </button>
        ))}
        <span
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 rounded-md bg-[#f97316] shadow-[0_1px_2px_#0005] transition-transform duration-[750ms] ease-[cubic-bezier(.22,1,.36,1)]"
          style={{ transform: `translateX(${active * 100}%)` }}
          aria-hidden="true"
        />
      </div>
      <p key={active} className="m-0 px-2 pb-[7px] pt-[14px] text-[11px] leading-[1.4] text-[#a9afb8]">
        {activeTab.content}
      </p>
    </section>
  );
}
