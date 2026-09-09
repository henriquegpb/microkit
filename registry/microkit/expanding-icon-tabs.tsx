"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { Activity, Compass, CreditCard, SlidersHorizontal, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type TabItem = { id: string; label: string; icon: LucideIcon } | { separator: true };

const items: TabItem[] = [
  { id: "overview", label: "Overview", icon: Compass },
  { id: "activity", label: "Activity", icon: Activity },
  { separator: true },
  { id: "filters", label: "Filters", icon: SlidersHorizontal },
  { id: "members", label: "Members", icon: Users },
  { id: "billing", label: "Billing", icon: CreditCard },
];

export function ExpandingIconTabs() {
  const [active, setActive] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;
    const region = rootRef.current?.parentElement;
    if (!region) return;
    const handlePointerDown = (event: Event) => {
      if (!rootRef.current?.contains(event.target as Node)) setActive(null);
    };
    region.addEventListener("pointerdown", handlePointerDown);
    return () => region.removeEventListener("pointerdown", handlePointerDown);
  }, [active]);

  const moveFocus = (delta: number) => {
    const tabs = Array.from(rootRef.current?.querySelectorAll<HTMLButtonElement>("[data-tab]") ?? []);
    if (!tabs.length) return;
    const index = tabs.indexOf(document.activeElement as HTMLButtonElement);
    const next = index < 0 ? 0 : (index + delta + tabs.length) % tabs.length;
    tabs[next].focus({ preventScroll: true });
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      moveFocus(event.key === "ArrowRight" ? 1 : -1);
      return;
    }
    if (event.key === "Escape" && active) {
      event.preventDefault();
      setActive(null);
    }
  };

  return (
    <div
      className="flex max-w-full flex-wrap items-center gap-1 rounded-xl border border-[#2b2f36] bg-[#121418] p-1 text-[11px] text-[#dfe2e5] shadow-[inset_0_1px_0_rgba(255,255,255,.04),0_10px_24px_rgba(0,0,0,.35)]"
      role="toolbar"
      aria-label="Workspace views"
      ref={rootRef}
      onKeyDown={handleKeyDown}
    >
      {items.map((item, index) =>
        "separator" in item ? (
          <span
            key={`separator-${index}`}
            className="mx-[2px] h-[18px] w-px flex-none bg-[#23262c]"
            role="separator"
            aria-orientation="vertical"
          />
        ) : (
          <button
            key={item.id}
            type="button"
            className={`inline-flex h-[30px] items-center rounded-[9px] border-0 text-[11px] [transition:gap_.5s_cubic-bezier(.32,.72,0,1),padding_.5s_cubic-bezier(.32,.72,0,1),background-color_.3s_ease,color_.3s_ease] motion-reduce:[transition-duration:.01ms] focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-offset-[-1.5px] focus-visible:outline-[#f97316] ${
              active === item.id
                ? "gap-1.5 bg-[#22262c] px-[11px] text-[#f4f5f7]"
                : "gap-0 bg-transparent px-2 text-[#868d97] hover:bg-[#1b1e23] hover:text-[#dfe2e5]"
            }`}
            data-tab=""
            aria-label={item.label}
            aria-pressed={active === item.id}
            onClick={() => setActive(active === item.id ? null : item.id)}
          >
            <span
              className={`grid flex-none place-items-center [transition:color_.3s_ease] motion-reduce:[transition-duration:.01ms] ${
                active === item.id ? "text-[#f97316]" : ""
              }`}
            >
              <item.icon size={15} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <span
              className={`grid overflow-hidden [transition:grid-template-columns_.5s_cubic-bezier(.32,.72,0,1),opacity_.3s_ease] motion-reduce:[transition-duration:.01ms] ${
                active === item.id ? "grid-cols-[1fr] opacity-100" : "grid-cols-[0fr] opacity-0"
              }`}
              aria-hidden="true"
            >
              <span className="min-w-0 overflow-hidden whitespace-nowrap">{item.label}</span>
            </span>
          </button>
        ),
      )}
    </div>
  );
}
