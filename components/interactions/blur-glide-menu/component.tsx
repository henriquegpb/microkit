"use client";

import "./styles.css";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent, RefObject } from "react";
import { Archive, ArrowLeft, ChevronDown, ChevronRight, Copy, FolderInput, Globe, Inbox, Layers, Palette, Tag, UserPlus } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type MenuRow = {
  id: string;
  label: string;
  icon?: LucideIcon;
  initials?: string;
  tint?: string;
  dot?: string;
  hint?: string;
  panel?: MenuPanel;
};

type MenuPanel = { search?: string; rows: MenuRow[] };

const rootPanel: MenuPanel = {
  rows: [
    {
      id: "invite",
      label: "Invite people",
      icon: UserPlus,
      hint: "@",
      panel: {
        search: "Find people",
        rows: [
          { id: "priya", label: "Priya Raman", initials: "PR", tint: "#a8c7ff" },
          { id: "noah", label: "Noah Whitfield", initials: "NW", tint: "#ffd6a5" },
          { id: "ines", label: "Ines Duarte", initials: "ID", tint: "#b9f0d0" },
        ],
      },
    },
    {
      id: "move",
      label: "Move to",
      icon: FolderInput,
      hint: "M",
      panel: {
        search: "Find a space",
        rows: [
          {
            id: "roadmap",
            label: "Roadmap",
            icon: Layers,
            panel: {
              search: "Find a board",
              rows: [
                { id: "quarter", label: "Quarter planning", initials: "QP", tint: "#a8c7ff" },
                { id: "bets", label: "Platform bets", initials: "PB", tint: "#d9c2ff" },
                { id: "hiring", label: "Hiring plan", initials: "HP", tint: "#ffd6a5" },
                { id: "launch", label: "Launch checklist", initials: "LC", tint: "#b9f0d0" },
              ],
            },
          },
          {
            id: "system",
            label: "Design system",
            icon: Palette,
            panel: {
              search: "Find a board",
              rows: [
                { id: "tokens", label: "Colour tokens", initials: "CT", tint: "#ffc9d4" },
                { id: "specs", label: "Component specs", initials: "CS", tint: "#a8c7ff" },
                { id: "icons", label: "Icon set", initials: "IS", tint: "#b9f0d0" },
              ],
            },
          },
          { id: "site", label: "Marketing site", icon: Globe },
          { id: "support", label: "Support inbox", icon: Inbox },
        ],
      },
    },
    {
      id: "label",
      label: "Set label",
      icon: Tag,
      hint: "L",
      panel: {
        rows: [
          { id: "priority", label: "Priority", dot: "#ff9c9c" },
          { id: "blocked", label: "Blocked", dot: "#ffd6a5" },
          { id: "research", label: "Research", dot: "#a8c7ff" },
          { id: "shipped", label: "Shipped", dot: "#b9f0d0" },
        ],
      },
    },
    { id: "duplicate", label: "Duplicate", icon: Copy, hint: "⌘D" },
    { id: "archive", label: "Archive", icon: Archive },
  ],
};

/* The row height the highlight is positioned against, in px. */
const ROW_HEIGHT = 26;
/* Long enough for the outgoing panel to finish its blur-and-glide exit. */
const PANEL_MS = 420;
const CLOSE_MS = 240;

/* A trail of row ids resolves to the step it opens, and to the row that opened it. */
function stepAt(trail: string[]) {
  let panel = rootPanel;
  let title = "";
  for (const id of trail) {
    const row = panel.rows.find((candidate) => candidate.id === id);
    if (!row?.panel) break;
    panel = row.panel;
    title = row.label;
  }
  return { panel, title };
}

function matches(panel: MenuPanel, query: string) {
  const term = query.trim().toLowerCase();
  return term ? panel.rows.filter((row) => row.label.toLowerCase().includes(term)) : panel.rows;
}

/**
 * One step of the menu.
 *
 * The highlight is a single element the rows share rather than a background per
 * row: hovering moves it, so the pointer drags one surface down the list
 * instead of lighting up disconnected rectangles. It keeps its last index when
 * the pointer leaves so returning to the list slides from where it stopped.
 */
function MenuPanel({
  panel,
  title,
  phase,
  query,
  panelRef,
  searchRef,
  onQuery,
  onSelect,
  onBack,
}: {
  panel: MenuPanel;
  title: string;
  phase: "idle" | "in" | "in-back" | "out" | "out-back";
  query: string;
  panelRef?: RefObject<HTMLDivElement | null>;
  searchRef?: RefObject<HTMLInputElement | null>;
  onQuery?: (value: string) => void;
  onSelect?: (row: MenuRow) => void;
  onBack?: () => void;
}) {
  const [cursor, setCursor] = useState({ index: 0, visible: false });
  const rows = matches(panel, query);
  const leaving = phase === "out" || phase === "out-back";

  return (
    <div className="glide-menu-panel" data-phase={phase} ref={panelRef} inert={leaving || undefined}>
      {title && (
        <>
          <div className="glide-menu-header">
            <button type="button" className="glide-menu-back" onClick={onBack} aria-label={`Back from ${title}`}>
              <ArrowLeft size={13} strokeWidth={1.8} aria-hidden="true" />
            </button>
            {panel.search ? (
              <input
                ref={searchRef}
                className="glide-menu-search"
                data-search=""
                type="text"
                value={query}
                placeholder={panel.search}
                aria-label={panel.search}
                onChange={(event) => onQuery?.(event.target.value)}
              />
            ) : (
              <span className="glide-menu-title">{title}</span>
            )}
          </div>
          <div className="glide-menu-divider" />
        </>
      )}
      <div className="glide-menu-list" role="menu" onMouseLeave={() => setCursor((state) => ({ ...state, visible: false }))}>
        <span
          className="glide-menu-highlight"
          data-visible={cursor.visible}
          style={{ transform: `translateY(${cursor.index * ROW_HEIGHT}px)` }}
          aria-hidden="true"
        />
        {rows.map((row, index) => (
          <button
            key={row.id}
            type="button"
            role="menuitem"
            className="glide-menu-row"
            data-row=""
            aria-haspopup={row.panel ? "menu" : undefined}
            onMouseEnter={() => setCursor({ index, visible: true })}
            onFocus={() => setCursor({ index, visible: true })}
            onClick={() => onSelect?.(row)}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight" && row.panel) {
                event.preventDefault();
                onSelect?.(row);
              }
            }}
          >
            {row.icon && (
              <span className="glide-menu-icon">
                <row.icon size={14} strokeWidth={1.7} aria-hidden="true" />
              </span>
            )}
            {row.initials && (
              <span className="glide-menu-avatar" style={{ background: row.tint }} aria-hidden="true">
                {row.initials}
              </span>
            )}
            {row.dot && <span className="glide-menu-dot" style={{ background: row.dot }} aria-hidden="true" />}
            <span className="glide-menu-label">{row.label}</span>
            {row.hint && <span className="glide-menu-hint">{row.hint}</span>}
            {row.panel && <ChevronRight className="glide-menu-chevron" size={13} strokeWidth={1.8} aria-hidden="true" />}
          </button>
        ))}
        {!rows.length && <p className="glide-menu-empty">No matches</p>}
      </div>
    </div>
  );
}

/**
 * A menu that walks into its own submenus.
 *
 * The step change is the whole interaction, and the trick is the order of it:
 * the outgoing step blurs almost before it starts moving, so the eye loses the
 * words early and reads the slide as one surface passing rather than two lists
 * swapping. The container animates its height at the same time, from the step
 * that is arriving, which is why a four-row step opening under a three-row one
 * never snaps.
 *
 * Heights are measured rather than declared: the search field filters rows, so
 * the height a step wants changes as somebody types.
 */
export function BlurGlideMenu() {
  const [open, setOpen] = useState(true);
  const [nav, setNav] = useState<{ trail: string[]; direction: -1 | 0 | 1 }>({ trail: [], direction: 0 });
  const [query, setQuery] = useState("");
  const [leaving, setLeaving] = useState<{ trail: string[]; query: string; direction: -1 | 1 } | null>(null);
  const [height, setHeight] = useState<number>();
  const rootRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const step = stepAt(nav.trail);

  /* The arriving step owns the container height; the outgoing one is taken out of flow. */
  useEffect(() => {
    if (activeRef.current) setHeight(activeRef.current.offsetHeight);
  }, [nav, query, open]);

  /* A reduced-motion visitor gets no animationend, so the exit is cleared on a timer either way. */
  useEffect(() => {
    if (!leaving) return;
    const timer = setTimeout(() => setLeaving(null), PANEL_MS);
    return () => clearTimeout(timer);
  }, [leaving]);

  /* Rewind to the first step once the surface is out of sight, never in front of the visitor. */
  useEffect(() => {
    if (open) return;
    const timer = setTimeout(() => {
      setNav({ trail: [], direction: 0 });
      setQuery("");
      setLeaving(null);
    }, CLOSE_MS);
    return () => clearTimeout(timer);
  }, [open]);

  /*
   * A click away closes it, but only a click away inside the element the menu
   * was placed in — not anywhere in the document. The listener sits on that
   * element for a reason: a menu that watches the whole page collapses when
   * somebody clicks a nav link or scrollbar three sections away, which reads as
   * the component breaking rather than dismissing. Swap `region` for `document`
   * to dismiss on any click in the page instead.
   */
  useEffect(() => {
    if (!open) return;
    const region = rootRef.current?.parentElement;
    if (!region) return;
    const handlePointerDown = (event: Event) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    region.addEventListener("pointerdown", handlePointerDown);
    return () => region.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  /* Focus follows the step, but only once a step has actually been chosen. */
  useEffect(() => {
    if (nav.direction === 0) return;
    const target = searchRef.current ?? activeRef.current?.querySelector<HTMLButtonElement>("[data-row]");
    target?.focus({ preventScroll: true });
  }, [nav]);

  const enter = (id: string) => {
    setLeaving({ trail: nav.trail, query, direction: 1 });
    setNav({ trail: [...nav.trail, id], direction: 1 });
    setQuery("");
  };

  const back = () => {
    if (!nav.trail.length) return;
    setLeaving({ trail: nav.trail, query, direction: -1 });
    setNav({ trail: nav.trail.slice(0, -1), direction: -1 });
    setQuery("");
  };

  const dismiss = () => {
    setOpen(false);
    triggerRef.current?.focus({ preventScroll: true });
  };

  const moveFocus = (delta: number) => {
    const rows = Array.from(activeRef.current?.querySelectorAll<HTMLButtonElement>("[data-row]") ?? []);
    if (!rows.length) return;
    const index = rows.indexOf(document.activeElement as HTMLButtonElement);
    const next = index < 0 ? (delta > 0 ? 0 : rows.length - 1) : (index + delta + rows.length) % rows.length;
    rows[next].focus({ preventScroll: true });
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const inSearch = (event.target as HTMLElement).dataset.search !== undefined;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      moveFocus(event.key === "ArrowDown" ? 1 : -1);
      return;
    }
    if (!open) return;
    if (event.key === "Escape") {
      event.preventDefault();
      if (nav.trail.length) back();
      else dismiss();
      return;
    }
    if (event.key === "ArrowLeft" && !inSearch && nav.trail.length) {
      event.preventDefault();
      back();
    }
  };

  return (
    <div className="glide-menu" data-open={open} ref={rootRef} onKeyDown={handleKeyDown}>
      <button
        type="button"
        className="glide-menu-trigger"
        ref={triggerRef}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => (open ? dismiss() : setOpen(true))}
      >
        Board actions
        <ChevronDown size={13} strokeWidth={1.8} aria-hidden="true" />
      </button>
      <div className="glide-menu-surface">
        <div className="glide-menu-panels" style={{ height }}>
          {leaving && (
            <MenuPanel
              key={leaving.trail.join("/") || "root"}
              {...stepAt(leaving.trail)}
              phase={leaving.direction === 1 ? "out" : "out-back"}
              query={leaving.query}
            />
          )}
          <MenuPanel
            key={nav.trail.join("/") || "root"}
            {...step}
            phase={nav.direction === 0 ? "idle" : nav.direction === 1 ? "in" : "in-back"}
            query={query}
            panelRef={activeRef}
            searchRef={step.panel.search ? searchRef : undefined}
            onQuery={setQuery}
            onBack={back}
            onSelect={(row) => (row.panel ? enter(row.id) : dismiss())}
          />
        </div>
      </div>
    </div>
  );
}
