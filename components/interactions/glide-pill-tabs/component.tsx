"use client";

import "./styles.css";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const options = [
  { key: "all", label: "All" },
  { key: "music", label: "Music" },
  { key: "films", label: "Films" },
  { key: "books", label: "Books" },
];

export function GlidePillTabs() {
  const [value, setValue] = useState("all");
  const trackRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const glideRef = useRef<HTMLSpanElement>(null);
  const placedRef = useRef(false);

  useLayoutEffect(() => {
    const track = trackRef.current;
    const indicator = indicatorRef.current;
    if (!track || !indicator) return;

    const place = (animate: boolean) => {
      const tab = track.querySelector<HTMLElement>(`[data-key="${CSS.escape(value)}"]`);
      if (!tab) return;
      if (!animate) indicator.style.transition = "none";
      indicator.style.transform = `translateX(${tab.offsetLeft}px)`;
      indicator.style.width = `${tab.offsetWidth}px`;
      indicator.dataset.visible = "";
      if (!animate) {
        void indicator.offsetWidth;
        indicator.style.transition = "";
      }
      // The chosen tab is scrolled into view horizontally only, so the page itself never jumps.
      const left = tab.offsetLeft - 24;
      const right = tab.offsetLeft + tab.offsetWidth + 24;
      if (left < track.scrollLeft) track.scrollTo({ left, behavior: animate ? "smooth" : "auto" });
      else if (right > track.scrollLeft + track.clientWidth) {
        track.scrollTo({ left: right - track.clientWidth, behavior: animate ? "smooth" : "auto" });
      }
    };

    // The first placement appears in place; every change after it slides.
    place(placedRef.current);
    placedRef.current = true;

    // Fonts loading or the row resizing move the tabs, so the pill follows them without sliding.
    let lastWidth = track.getBoundingClientRect().width;
    const observer = new ResizeObserver(() => {
      const width = track.getBoundingClientRect().width;
      if (Math.abs(width - lastWidth) < 0.5) return;
      lastWidth = width;
      place(false);
    });
    observer.observe(track);
    return () => observer.disconnect();
  }, [value]);

  useEffect(() => {
    const track = trackRef.current;
    const glide = glideRef.current;
    if (!track || !glide) return;

    const controller = new AbortController();
    const { signal } = controller;
    let shown = false;

    const place = (tab: HTMLElement) => {
      const bounds = track.getBoundingClientRect();
      const rect = tab.getBoundingClientRect();
      const x = rect.left - bounds.left + track.scrollLeft - track.clientLeft;
      const y = rect.top - bounds.top + track.scrollTop - track.clientTop;
      // The first placement fades in where it lands; sliding in from wherever it last was would read as a glitch.
      if (!shown) glide.style.transition = "opacity 180ms ease";
      glide.style.transform = `translate(${x}px, ${y}px)`;
      glide.style.width = `${rect.width}px`;
      glide.style.height = `${rect.height}px`;
      if (!shown) {
        void glide.offsetWidth;
        glide.style.transition = "";
        shown = true;
      }
      glide.dataset.visible = "";
    };

    const hide = () => {
      shown = false;
      delete glide.dataset.visible;
    };

    for (const type of ["pointerover", "focusin"]) {
      track.addEventListener(
        type,
        (event) => {
          const tab = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-pill-tab]") : null;
          if (tab && track.contains(tab)) place(tab);
        },
        { signal },
      );
    }
    track.addEventListener("pointerleave", hide, { signal });
    track.addEventListener(
      "focusout",
      (event) => {
        const inside = event.relatedTarget instanceof Node && track.contains(event.relatedTarget);
        if (!inside && !track.matches(":hover")) hide();
      },
      { signal },
    );

    return () => controller.abort();
  }, []);

  return (
    <div className="glide-pill-tabs" role="tablist" aria-label="Categories" ref={trackRef}>
      <span className="glide-pill-tabs__glide" ref={glideRef} aria-hidden="true" />
      <span className="glide-pill-tabs__indicator" ref={indicatorRef} aria-hidden="true" />
      {options.map((option) => {
        const selected = value === option.key;
        return (
          <button
            key={option.key}
            type="button"
            role="tab"
            className="glide-pill-tab"
            data-pill-tab=""
            data-key={option.key}
            data-selected={selected || undefined}
            aria-selected={selected}
            onClick={() => setValue(option.key)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
