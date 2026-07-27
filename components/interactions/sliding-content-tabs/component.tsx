"use client";

import "./styles.css";

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
    <section className={`sliding-tabs tabs-active-${active}`}>
      <div className="sliding-tabs-list" role="tablist" aria-label="Activity">
        {tabs.map(({ label, Icon }, index) => (
          <button
            key={label}
            id={`sliding-tab-${index}`}
            type="button"
            role="tab"
            aria-selected={active === index}
            className={active === index ? "active" : ""}
            onClick={() => setActive(index)}
          >
            <Icon size={15} strokeWidth={1.8} aria-hidden="true" />
            <span>{label}</span>
          </button>
        ))}
        <span className="sliding-tabs-indicator" aria-hidden="true" />
      </div>
      <p key={active} className="sliding-tabs-content" role="tabpanel" aria-labelledby={`sliding-tab-${active}`}>
        {activeTab.content}
      </p>
    </section>
  );
}
