"use client";

/*
 * The glide: ONE highlight per list that slides to the row under the pointer (or
 * the keyboard), instead of every row lighting up on its own. Ported from Nora's
 * app/ui/glide/Glide.tsx: drop a <Glide /> inside any positioned container and
 * name its rows; the highlight follows them.
 *
 * It measures with getBoundingClientRect relative to its host, plus the host's
 * scroll, so it works inside scrolling lists and with rows that are not direct
 * children. The first placement only fades in — sliding in from wherever it last
 * was would read as a glitch — and every move after that glides.
 */

import { useEffect, useRef } from "react";

/*
 * clip: the highlight only exists INSIDE the rows. For cards with gaps between
 * them, a highlight sliding through the gutter reads as a loose rectangle
 * crossing the page; clipped, it is seen only through the cards' rounded shapes,
 * so between two cards it drains out of one and fills the next.
 *
 * The cut-outs live on a layer that never moves — the host's full size, masked by
 * one SVG of every row — and the cursor slides inside it. Masking the cursor
 * itself means sliding the mask the opposite way on a matching transition, and
 * two CSS transitions interrupted by a pointer crossing several cards do not stay
 * in step: they drew a seam through the middle of a card.
 */
function maskLayer(layer: HTMLElement, host: HTMLElement, shapesSelector: string) {
  const hostRect = host.getBoundingClientRect();
  const width = host.scrollWidth;
  const height = host.scrollHeight;
  const shapes = Array.from(host.querySelectorAll<HTMLElement>(shapesSelector))
    .map((row) => {
      const rect = row.getBoundingClientRect();
      const x = rect.left - hostRect.left + host.scrollLeft - host.clientLeft;
      const y = rect.top - hostRect.top + host.scrollTop - host.clientTop;
      const radius = parseFloat(getComputedStyle(row).borderTopLeftRadius) || 0;
      return `<rect x="${x}" y="${y}" width="${rect.width}" height="${rect.height}" rx="${radius}"/>`;
    })
    .join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">${shapes}</svg>`;
  const image = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  layer.style.width = `${width}px`;
  layer.style.height = `${height}px`;
  layer.style.setProperty("mask-image", image);
  layer.style.setProperty("-webkit-mask-image", image);
}

export function Glide({
  items,
  className,
  clip = false,
  shapes,
}: {
  /** CSS selector for the rows the highlight follows. */
  items: string;
  className?: string;
  /** Show the highlight only inside the rows, never in the gaps between them. */
  clip?: boolean;
  /** Clip mode: where the highlight shows, when that is only part of each row —
   *  a card's footer, say, so the glide never washes over its preview. The
   *  highlight still follows `items`. Defaults to the rows themselves. */
  shapes?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cursor = ref.current;
    // In clip mode the cursor sits inside the masking layer, so the host is one level further up.
    const layer = clip ? cursor?.parentElement : null;
    const host = (clip ? layer?.parentElement : cursor?.parentElement) ?? null;
    if (!cursor || !host) return;
    let shown = false;
    let current: HTMLElement | null = null;

    const place = (row: HTMLElement) => {
      const hostRect = host.getBoundingClientRect();
      const rect = row.getBoundingClientRect();
      const x = rect.left - hostRect.left + host.scrollLeft - host.clientLeft;
      const y = rect.top - hostRect.top + host.scrollTop - host.clientTop;
      /* The cut-outs are re-drawn on every move to a NEW row, from the same layout
         read as the cursor's own position, so wherever the cursor comes to rest it
         and the cut-out under it agree. Not on every pointerover: that fires for
         each child entered. */
      if (layer && (!shown || row !== current)) maskLayer(layer, host, shapes ?? items);
      current = row;
      if (!shown) cursor.style.transition = "opacity 180ms ease";
      cursor.style.transform = `translate(${x}px, ${y}px)`;
      cursor.style.width = `${rect.width}px`;
      cursor.style.height = `${rect.height}px`;
      if (!shown) {
        void cursor.offsetWidth;
        cursor.style.transition = "";
        shown = true;
      }
      cursor.dataset.visible = "";
    };

    const hide = () => {
      shown = false;
      delete cursor.dataset.visible;
    };

    const follow = (event: Event) => {
      const row = (event.target as Element | null)?.closest?.(items) as HTMLElement | null;
      if (!row || !host.contains(row)) return;
      if (row.matches(':disabled, [aria-disabled="true"], [data-disabled]')) return;
      place(row);
    };

    const onFocusOut = (event: FocusEvent) => {
      if (!host.contains(event.relatedTarget as Node | null) && !host.matches(":hover")) hide();
    };

    /* Rows can move under a resting pointer — a filter re-renders the gallery,
       the window resizes and the grid reflows. Clip mode measures the cut-outs and
       the cursor again when that can have happened; an unclipped glide re-measures
       on its next move, which is all a list ever needs. */
    const resync = () => {
      if (!shown || !current?.isConnected || !layer) return;
      maskLayer(layer, host, shapes ?? items);
      place(current);
    };
    const reflow = layer ? new ResizeObserver(resync) : null;
    reflow?.observe(host);

    host.addEventListener("pointerover", follow);
    host.addEventListener("focusin", follow);
    host.addEventListener("pointerleave", hide);
    host.addEventListener("focusout", onFocusOut);
    return () => {
      reflow?.disconnect();
      host.removeEventListener("pointerover", follow);
      host.removeEventListener("focusin", follow);
      host.removeEventListener("pointerleave", hide);
      host.removeEventListener("focusout", onFocusOut);
    };
  }, [items, clip, shapes]);

  const cursor = <span ref={ref} className={`glide${className ? ` ${className}` : ""}`} aria-hidden="true" />;

  return clip ? (
    <span className="glide-clip" aria-hidden="true">
      {cursor}
    </span>
  ) : (
    cursor
  );
}
