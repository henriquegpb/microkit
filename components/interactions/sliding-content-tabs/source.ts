export const componentCode = `import { useState } from "react";
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
    <section className={\`sliding-tabs tabs-active-\${active}\`}>
      <div className="sliding-tabs-list" role="tablist" aria-label="Activity">
        {tabs.map(({ label, Icon }, index) => (
          <button
            key={label}
            id={\`sliding-tab-\${index}\`}
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
      <p key={active} className="sliding-tabs-content" role="tabpanel" aria-labelledby={\`sliding-tab-\${active}\`}>
        {activeTab.content}
      </p>
    </section>
  );
}

/* sliding-content-tabs.css */
.sliding-tabs {
  width: min(100%, 288px);
  border: 1px solid #30343a;
  border-radius: 10px;
  background: #101216;
  padding: 5px;
}
.sliding-tabs-list {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
.sliding-tabs-list button {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-width: 0;
  border: 0;
  border-radius: 6px;
  background: transparent;
  padding: 9px 6px;
  color: #858c96;
  font-size: 11px;
  cursor: pointer;
  transition: color .3s cubic-bezier(.16, 1, .3, 1);
}
.sliding-tabs-list button.active { color: #fff; }
.sliding-tabs-list button:focus-visible { outline: 2px solid #f97316; outline-offset: -2px; }
.sliding-tabs-indicator {
  position: absolute;
  inset: 0 auto auto 0;
  width: calc(100% / 3);
  height: 100%;
  border-radius: 6px;
  background: #f97316;
  box-shadow: 0 1px 2px #0005;
  transition: transform .75s cubic-bezier(.22, 1, .36, 1);
}
.tabs-active-1 .sliding-tabs-indicator { transform: translateX(100%); }
.tabs-active-2 .sliding-tabs-indicator { transform: translateX(200%); }
.sliding-tabs-content {
  margin: 0;
  padding: 14px 8px 7px;
  color: #a9afb8;
  font-size: 11px;
  line-height: 1.4;
  animation: sliding-tabs-enter .65s cubic-bezier(.22, 1, .36, 1);
}
@keyframes sliding-tabs-enter {
  from { opacity: 0; transform: translateX(-5px); }
  to { opacity: 1; transform: translateX(0); }
}
@media (prefers-reduced-motion: reduce) {
  .sliding-tabs-indicator, .sliding-tabs-list button { transition: none; }
  .sliding-tabs-content { animation: none; }
}`;

export const tailwindCode = `import { useState } from "react";
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
            id={\`sliding-tab-\${index}\`}
            type="button"
            role="tab"
            aria-selected={active === index}
            className={\`relative z-10 inline-flex min-w-0 items-center justify-center gap-1.5 rounded-md border-0 bg-transparent px-1.5 py-[9px] text-[11px] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#f97316] \${active === index ? "text-white" : "text-[#858c96]"}\`}
            onClick={() => setActive(index)}
          >
            <Icon size={15} strokeWidth={1.8} aria-hidden="true" />
            <span>{label}</span>
          </button>
        ))}
        <span
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 rounded-md bg-[#f97316] shadow-[0_1px_2px_#0005] transition-transform duration-[750ms] ease-[cubic-bezier(.22,1,.36,1)]"
          style={{ transform: \`translateX(\${active * 100}%)\` }}
          aria-hidden="true"
        />
      </div>
      <p key={active} className="m-0 px-2 pb-[7px] pt-[14px] text-[11px] leading-[1.4] text-[#a9afb8]">
        {activeTab.content}
      </p>
    </section>
  );
}`;
