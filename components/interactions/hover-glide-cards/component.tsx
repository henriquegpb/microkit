"use client";

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
          return `<rect x="${x}" y="${y}" width="${rect.width}" height="${rect.height}" rx="${radius}"/>`;
        })
        .join("");
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${host.scrollWidth}" height="${host.scrollHeight}">${shapes}</svg>`;
      const image = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
      layer.style.width = `${host.scrollWidth}px`;
      layer.style.height = `${host.scrollHeight}px`;
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
