"use client";

import "./styles.css";

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
      className="expanding-tabs"
      role="toolbar"
      aria-label="Workspace views"
      ref={rootRef}
      onKeyDown={handleKeyDown}
    >
      {items.map((item, index) =>
        "separator" in item ? (
          <span
            key={`separator-${index}`}
            className="expanding-tabs-separator"
            role="separator"
            aria-orientation="vertical"
          />
        ) : (
          <button
            key={item.id}
            type="button"
            className="expanding-tab"
            data-tab=""
            aria-label={item.label}
            aria-pressed={active === item.id}
            onClick={() => setActive(active === item.id ? null : item.id)}
          >
            <span className="expanding-tab-icon">
              <item.icon size={15} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <span className="expanding-tab-label" aria-hidden="true">
              <span>{item.label}</span>
            </span>
          </button>
        ),
      )}
    </div>
  );
}
