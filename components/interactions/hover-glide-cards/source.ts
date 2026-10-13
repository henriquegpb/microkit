export const componentCode = `"use client";

import "./styles.css";

import { useEffect, useRef } from "react";
import { CalendarDays, FolderOpen, Mail, NotebookPen } from "lucide-react";

const apps = [
  { name: "Calendar", detail: "Plan around your week", icon: CalendarDays },
  { name: "Mail", detail: "Triage every inbox", icon: Mail },
  { name: "Notes", detail: "Draft from meetings", icon: NotebookPen },
  { name: "Files", detail: "Find anything shared", icon: FolderOpen },
];

export function HoverGlideCards() {
  const hostRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLSpanElement>(null);
  const glideRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const layer = layerRef.current;
    const glide = glideRef.current;
    if (!host || !layer || !glide) return;

    const tiles = Array.from(host.querySelectorAll("[data-glide-card]"));
    const controller = new AbortController();
    const { signal } = controller;
    let active = -1;
    let shown = false;

    // The highlight is only seen through the cards' shapes, so crossing a gap it drains out of one card and fills the next.
    const drawMask = () => {
      const bounds = host.getBoundingClientRect();
      const shapes = tiles
        .map((tile) => {
          const rect = tile.getBoundingClientRect();
          const x = rect.left - bounds.left + host.scrollLeft - host.clientLeft;
          const y = rect.top - bounds.top + host.scrollTop - host.clientTop;
          const radius = parseFloat(getComputedStyle(tile).borderTopLeftRadius) || 0;
          return \`<rect x="\${x}" y="\${y}" width="\${rect.width}" height="\${rect.height}" rx="\${radius}"/>\`;
        })
        .join("");
      const svg = \`<svg xmlns="http://www.w3.org/2000/svg" width="\${host.scrollWidth}" height="\${host.scrollHeight}">\${shapes}</svg>\`;
      const image = \`url("data:image/svg+xml,\${encodeURIComponent(svg)}")\`;
      layer.style.width = \`\${host.scrollWidth}px\`;
      layer.style.height = \`\${host.scrollHeight}px\`;
      layer.style.setProperty("mask-image", image);
      layer.style.setProperty("-webkit-mask-image", image);
    };

    const place = () => {
      const tile = tiles[active];
      if (!tile) return;
      const bounds = host.getBoundingClientRect();
      const rect = tile.getBoundingClientRect();
      const x = rect.left - bounds.left + host.scrollLeft - host.clientLeft;
      const y = rect.top - bounds.top + host.scrollTop - host.clientTop;
      // The first placement fades in where it lands; sliding in from wherever it last was would read as a glitch.
      if (!shown) glide.style.transition = "opacity 180ms ease";
      glide.style.transform = \`translate(\${x}px, \${y}px)\`;
      glide.style.width = \`\${rect.width}px\`;
      glide.style.height = \`\${rect.height}px\`;
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
      host.addEventListener(
        type,
        (event) => {
          const tile = event.target instanceof Element ? event.target.closest("[data-glide-card]") : null;
          const index = tile ? tiles.indexOf(tile) : -1;
          if (index < 0) return;
          if (!shown || index !== active) drawMask();
          active = index;
          place();
        },
        { signal },
      );
    }
    host.addEventListener("pointerleave", hide, { signal });
    host.addEventListener(
      "focusout",
      (event) => {
        const inside = event.relatedTarget instanceof Node && host.contains(event.relatedTarget);
        if (!inside && !host.matches(":hover")) hide();
      },
      { signal },
    );

    // Cards reflow under a resting pointer when the grid resizes, so the cut-outs and the highlight are measured again.
    const reflow = new ResizeObserver(() => {
      if (!shown) return;
      drawMask();
      place();
    });
    reflow.observe(host);

    return () => {
      controller.abort();
      reflow.disconnect();
    };
  }, []);

  return (
    <div className="hover-glide-cards" role="group" aria-label="Workspace apps" ref={hostRef}>
      <span className="hover-glide-cards__layer" ref={layerRef} aria-hidden="true">
        <span className="hover-glide-cards__glide" ref={glideRef} />
      </span>
      {apps.map((app) => (
        <button type="button" className="hover-glide-card" data-glide-card="" key={app.name}>
          <span className="hover-glide-card__mark">
            <app.icon size={14} strokeWidth={1.8} aria-hidden="true" />
          </span>
          <span className="hover-glide-card__name">{app.name}</span>
          <span className="hover-glide-card__detail">{app.detail}</span>
        </button>
      ))}
    </div>
  );
}

/* styles.css */
.hover-glide-cards {
  position: relative;
  display: grid;
  width: 100%;
  max-width: 312px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.hover-glide-cards,
.hover-glide-cards * {
  box-sizing: border-box;
}

.hover-glide-cards__layer {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: block;
  pointer-events: none;
  mask-repeat: no-repeat;
  -webkit-mask-repeat: no-repeat;
}

.hover-glide-cards__glide {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 0;
  height: 0;
  border-radius: 10px;
  background: light-dark(rgba(20, 24, 30, .055), rgba(255, 255, 255, .045));
  opacity: 0;
  pointer-events: none;
  transition:
    transform .3s cubic-bezier(.32, .72, 0, 1),
    width .3s cubic-bezier(.32, .72, 0, 1),
    height .3s cubic-bezier(.32, .72, 0, 1),
    opacity .18s ease;
}

.hover-glide-cards__glide[data-visible] {
  opacity: 1;
}

.hover-glide-card {
  display: flex;
  min-width: 0;
  flex-direction: column;
  align-items: flex-start;
  margin: 0;
  border: 1px solid light-dark(#e3e6eb, #24272d);
  border-radius: 10px;
  background: light-dark(#ffffff, #121418);
  padding: 10px;
  color: light-dark(#14181e, #f2f4f6);
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.hover-glide-card:focus-visible {
  outline: 2px solid #86b6ff;
  outline-offset: 2px;
}

.hover-glide-card__mark {
  display: grid;
  width: 24px;
  height: 24px;
  place-items: center;
  margin-bottom: 9px;
  border-radius: 7px;
  background: light-dark(#f0f2f5, #1b1e23);
  color: light-dark(#69727f, #868d97);
}

.hover-glide-card__name,
.hover-glide-card__detail {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.hover-glide-card__name {
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
}

.hover-glide-card__detail {
  margin-top: 2px;
  color: light-dark(#69727f, #868d97);
  font-size: 11px;
  line-height: 14px;
}

@media (hover: none) {
  .hover-glide-cards__glide {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hover-glide-cards__glide {
    transition: opacity .01ms;
  }
}`;

export const tailwindCode = `"use client";

import { useEffect, useRef } from "react";
import { CalendarDays, FolderOpen, Mail, NotebookPen } from "lucide-react";

const apps = [
  { name: "Calendar", detail: "Plan around your week", icon: CalendarDays },
  { name: "Mail", detail: "Triage every inbox", icon: Mail },
  { name: "Notes", detail: "Draft from meetings", icon: NotebookPen },
  { name: "Files", detail: "Find anything shared", icon: FolderOpen },
];

export function HoverGlideCards() {
  const hostRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLSpanElement>(null);
  const glideRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const layer = layerRef.current;
    const glide = glideRef.current;
    if (!host || !layer || !glide) return;

    const tiles = Array.from(host.querySelectorAll("[data-glide-card]"));
    const controller = new AbortController();
    const { signal } = controller;
    let active = -1;
    let shown = false;

    // The highlight is only seen through the cards' shapes, so crossing a gap it drains out of one card and fills the next.
    const drawMask = () => {
      const bounds = host.getBoundingClientRect();
      const shapes = tiles
        .map((tile) => {
          const rect = tile.getBoundingClientRect();
          const x = rect.left - bounds.left + host.scrollLeft - host.clientLeft;
          const y = rect.top - bounds.top + host.scrollTop - host.clientTop;
          const radius = parseFloat(getComputedStyle(tile).borderTopLeftRadius) || 0;
          return \`<rect x="\${x}" y="\${y}" width="\${rect.width}" height="\${rect.height}" rx="\${radius}"/>\`;
        })
        .join("");
      const svg = \`<svg xmlns="http://www.w3.org/2000/svg" width="\${host.scrollWidth}" height="\${host.scrollHeight}">\${shapes}</svg>\`;
      const image = \`url("data:image/svg+xml,\${encodeURIComponent(svg)}")\`;
      layer.style.width = \`\${host.scrollWidth}px\`;
      layer.style.height = \`\${host.scrollHeight}px\`;
      layer.style.setProperty("mask-image", image);
      layer.style.setProperty("-webkit-mask-image", image);
    };

    const place = () => {
      const tile = tiles[active];
      if (!tile) return;
      const bounds = host.getBoundingClientRect();
      const rect = tile.getBoundingClientRect();
      const x = rect.left - bounds.left + host.scrollLeft - host.clientLeft;
      const y = rect.top - bounds.top + host.scrollTop - host.clientTop;
      // The first placement fades in where it lands; sliding in from wherever it last was would read as a glitch.
      if (!shown) glide.style.transition = "opacity 180ms ease";
      glide.style.transform = \`translate(\${x}px, \${y}px)\`;
      glide.style.width = \`\${rect.width}px\`;
      glide.style.height = \`\${rect.height}px\`;
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
      host.addEventListener(
        type,
        (event) => {
          const tile = event.target instanceof Element ? event.target.closest("[data-glide-card]") : null;
          const index = tile ? tiles.indexOf(tile) : -1;
          if (index < 0) return;
          if (!shown || index !== active) drawMask();
          active = index;
          place();
        },
        { signal },
      );
    }
    host.addEventListener("pointerleave", hide, { signal });
    host.addEventListener(
      "focusout",
      (event) => {
        const inside = event.relatedTarget instanceof Node && host.contains(event.relatedTarget);
        if (!inside && !host.matches(":hover")) hide();
      },
      { signal },
    );

    // Cards reflow under a resting pointer when the grid resizes, so the cut-outs and the highlight are measured again.
    const reflow = new ResizeObserver(() => {
      if (!shown) return;
      drawMask();
      place();
    });
    reflow.observe(host);

    return () => {
      controller.abort();
      reflow.disconnect();
    };
  }, []);

  return (
    <div className="relative grid w-full max-w-[312px] grid-cols-2 gap-[8px]" role="group" aria-label="Workspace apps" ref={hostRef}>
      <span className="pointer-events-none absolute left-0 top-0 z-[1] block [mask-repeat:no-repeat] [-webkit-mask-repeat:no-repeat]" ref={layerRef} aria-hidden="true">
        <span className="pointer-events-none absolute left-0 top-0 block h-0 w-0 rounded-[10px] bg-[light-dark(rgba(20,24,30,.055),rgba(255,255,255,.045))] opacity-0 [transition:transform_.3s_cubic-bezier(.32,.72,0,1),width_.3s_cubic-bezier(.32,.72,0,1),height_.3s_cubic-bezier(.32,.72,0,1),opacity_.18s_ease] data-[visible]:opacity-100 motion-reduce:[transition:opacity_.01ms] [@media(hover:none)]:hidden" ref={glideRef} />
      </span>
      {apps.map((app) => (
        <button type="button" className="m-0 flex min-w-0 cursor-pointer flex-col items-start rounded-[10px] border border-[light-dark(#e3e6eb,#24272d)] bg-[light-dark(#ffffff,#121418)] p-[10px] text-left text-[color:light-dark(#14181e,#f2f4f6)] [font:inherit] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#86b6ff]" data-glide-card="" key={app.name}>
          <span className="mb-[9px] grid size-[24px] place-items-center rounded-[7px] bg-[light-dark(#f0f2f5,#1b1e23)] text-[color:light-dark(#69727f,#868d97)]">
            <app.icon size={14} strokeWidth={1.8} aria-hidden="true" />
          </span>
          <span className="max-w-full truncate text-[12px] font-semibold leading-[16px]">{app.name}</span>
          <span className="mt-[2px] max-w-full truncate text-[11px] leading-[14px] text-[color:light-dark(#69727f,#868d97)]">{app.detail}</span>
        </button>
      ))}
    </div>
  );
}`;
