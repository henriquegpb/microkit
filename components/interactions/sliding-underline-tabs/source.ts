export const componentCode = `import { useState } from "react";

const tabs = [
  { label: "Audience", content: "Content one" },
  { label: "Reactions", content: "Content two" },
  { label: "Saved", content: "Content three" },
];

export function SlidingUnderlineTabs() {
  const [active, setActive] = useState(0);
  const activeTab = tabs[active];

  return (
    <section className={\`underline-tabs underline-tabs-active-\${active}\`}>
      <div className="underline-tabs-list" role="tablist" aria-label="Activity">
        {tabs.map(({ label }, index) => (
          <button
            key={label}
            id={\`underline-tab-\${index}\`}
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
      <div key={active} className="underline-tabs-content" role="tabpanel" aria-labelledby={\`underline-tab-\${active}\`}>
        <span>{activeTab.content}</span>
      </div>
    </section>
  );
}

/* sliding-underline-tabs.css */
.underline-tabs {
  width: min(100%, 248px);
  border: 1px solid #30343a;
  border-radius: 10px;
  background: #101216;
  padding: 5px;
}
.underline-tabs-list {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-bottom: 1px solid #30343a;
}
.underline-tabs-list button {
  position: relative;
  z-index: 1;
  border: 0;
  background: transparent;
  padding: 9px 4px;
  color: #858c96;
  font-size: 10px;
  cursor: pointer;
  transition: color .3s cubic-bezier(.16, 1, .3, 1);
}
.underline-tabs-list button.active { color: #fff; }
.underline-tabs-list button:focus-visible { outline: 2px solid #f97316; outline-offset: -2px; }
.underline-tabs-indicator {
  position: absolute;
  bottom: -1px;
  left: 0;
  width: calc(100% / 3);
  height: 2px;
  border-radius: 999px;
  background: #f97316;
  transition: transform .75s cubic-bezier(.22, 1, .36, 1);
}
.underline-tabs-active-1 .underline-tabs-indicator { transform: translateX(100%); }
.underline-tabs-active-2 .underline-tabs-indicator { transform: translateX(200%); }
.underline-tabs-content {
  display: grid;
  min-height: 54px;
  place-content: center;
  padding: 10px 8px 6px;
  color: #f4f5f7;
  font-size: 11px;
  text-align: center;
  animation: underline-tabs-enter .65s cubic-bezier(.22, 1, .36, 1);
}
@keyframes underline-tabs-enter {
  from { opacity: 0; transform: translateX(-5px); }
  to { opacity: 1; transform: translateX(0); }
}
@media (prefers-reduced-motion: reduce) {
  .underline-tabs-indicator, .underline-tabs-list button { transition: none; }
  .underline-tabs-content { animation: none; }
}`;

export const tailwindCode = `import { useState } from "react";

const tabs = [
  { label: "Audience", content: "Content one" },
  { label: "Reactions", content: "Content two" },
  { label: "Saved", content: "Content three" },
];

export function SlidingUnderlineTabs() {
  const [active, setActive] = useState(0);
  const activeTab = tabs[active];

  return (
    <section className="w-full max-w-[248px] rounded-[10px] border border-[#30343a] bg-[#101216] p-[5px]">
      <div className="relative grid grid-cols-3 border-b border-[#30343a]" role="tablist" aria-label="Activity">
        {tabs.map(({ label }, index) => (
          <button
            key={label}
            id={\`underline-tab-\${index}\`}
            type="button"
            role="tab"
            aria-selected={active === index}
            className={\`relative z-10 border-0 bg-transparent px-1 py-[9px] text-[10px] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#f97316] \${active === index ? "text-white" : "text-[#858c96]"}\`}
            onClick={() => setActive(index)}
          >
            {label}
          </button>
        ))}
        <span
          className="pointer-events-none absolute bottom-[-1px] left-0 h-0.5 w-1/3 rounded-full bg-[#f97316] transition-transform duration-[750ms] ease-[cubic-bezier(.22,1,.36,1)]"
          style={{ transform: \`translateX(\${active * 100}%)\` }}
          aria-hidden="true"
        />
      </div>
      <div key={active} className="grid min-h-[54px] place-content-center px-2 pb-1.5 pt-2.5 text-center text-[11px] text-[#f4f5f7]">
        <span>{activeTab.content}</span>
      </div>
    </section>
  );
}`;
