"use client";

import "./styles.css";

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
    <section className={`underline-tabs underline-tabs-active-${active}`}>
      <div className="underline-tabs-list" role="tablist" aria-label="Activity">
        {tabs.map(({ label }, index) => (
          <button
            key={label}
            id={`underline-tab-${index}`}
            type="button"
            role="tab"
            aria-selected={active === index}
            className={active === index ? "active" : ""}
            onClick={() => setActive(index)}
          >
            {label}
          </button>
        ))}
        <span className="underline-tabs-indicator" aria-hidden="true" />
      </div>
      <div key={active} className="underline-tabs-content" role="tabpanel" aria-labelledby={`underline-tab-${active}`}>
        <span>{activeTab.content}</span>
      </div>
    </section>
  );
}
