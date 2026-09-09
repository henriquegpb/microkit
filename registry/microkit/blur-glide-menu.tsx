"use client";

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

/*
 * A full panel width each way, so the two steps never sit on top of each other:
 * the step being left walks all the way out of the frame while the new one
 * arrives from the opposite edge, edge to edge, like one strip being pulled
 * past the opening.
 *
 * Which is why transform is only ever declared at 0% and 100%. An intermediate
 * transform keyframe gives that property its own eased interval, the two panels
 * stop sharing a progress, and the arriving step laps the one leaving and
 * covers it. The blur is what carries the intermediate stops instead: the step
 * being left blurs 6px deep by 30% of the way through, when the easing has
 * moved it barely a tenth of its travel, and the step arriving stays hazy for
 * the whole slide and only pulls into focus over the last third, by which time
 * it has all but stopped. Nothing legible ever moves, in either direction —
 * which is what turns a slide of two lists into one surface passing.
 */
const panelKeyframes = `
@keyframes glide-menu-in {
  0% { opacity: 0; transform: translateX(100%); filter: blur(8px); }
  45% { opacity: .9; }
  65% { filter: blur(6.5px); }
  100% { opacity: 1; transform: translateX(0); filter: blur(0); }
}
@keyframes glide-menu-out {
  0% { opacity: 1; transform: translateX(0); filter: blur(0); }
  30% { opacity: .9; filter: blur(6px); }
  100% { opacity: 0; transform: translateX(-100%); filter: blur(9px); }
}
@keyframes glide-menu-in-back {
  0% { opacity: 0; transform: translateX(-100%); filter: blur(8px); }
  45% { opacity: .9; }
  65% { filter: blur(6.5px); }
  100% { opacity: 1; transform: translateX(0); filter: blur(0); }
}
@keyframes glide-menu-out-back {
  0% { opacity: 1; transform: translateX(0); filter: blur(0); }
  30% { opacity: .9; filter: blur(6px); }
  100% { opacity: 0; transform: translateX(100%); filter: blur(9px); }
}`;

const phaseClass = {
  idle: "",
  in: "[animation:glide-menu-in_.4s_cubic-bezier(.45,.05,.15,1)_both] motion-reduce:[animation-duration:.01ms]",
  "in-back": "[animation:glide-menu-in-back_.4s_cubic-bezier(.45,.05,.15,1)_both] motion-reduce:[animation-duration:.01ms]",
  out: "absolute inset-x-0 top-0 [animation:glide-menu-out_.4s_cubic-bezier(.45,.05,.15,1)_both] motion-reduce:animate-none motion-reduce:opacity-0",
  "out-back": "absolute inset-x-0 top-0 [animation:glide-menu-out-back_.4s_cubic-bezier(.45,.05,.15,1)_both] motion-reduce:animate-none motion-reduce:opacity-0",
};

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
  phase: keyof typeof phaseClass;
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
    <div className={`w-full ${phaseClass[phase]}`} ref={panelRef} inert={leaving || undefined}>
      {title && (
        <>
          <div className="flex h-[26px] items-center gap-[5px] pr-[5px]">
            <button
              type="button"
              className="grid size-5 flex-none place-items-center rounded-[5px] border-0 bg-transparent text-[#868d97] [transition:background-color_.18s_ease,color_.18s_ease] hover:bg-[#22262c] hover:text-[#dfe2e5] focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-offset-0 focus-visible:outline-[#86b6ff] motion-reduce:[transition-duration:.01ms]"
              onClick={onBack}
              aria-label={`Back from ${title}`}
            >
              <ArrowLeft size={13} strokeWidth={1.8} aria-hidden="true" />
            </button>
            {panel.search ? (
              <input
                ref={searchRef}
                className="min-w-0 flex-1 truncate border-0 bg-transparent p-0 text-[11px] text-[#dfe2e5] placeholder:text-[#6d747e] focus:outline-none focus-visible:outline-none"
                data-search=""
                type="text"
                value={query}
                placeholder={panel.search}
                aria-label={panel.search}
                onChange={(event) => onQuery?.(event.target.value)}
              />
            ) : (
              <span className="min-w-0 flex-1 truncate text-[11px] text-[#dfe2e5]">{title}</span>
            )}
          </div>
          <div className="my-[3px] h-px bg-[#23262c]" />
        </>
      )}
      <div
        className="relative"
        role="menu"
        onMouseLeave={() => setCursor((state) => ({ ...state, visible: false }))}
      >
        <span
          className={`pointer-events-none absolute inset-x-0 top-0 h-[26px] rounded-[5px] bg-[#22262c] [transition:transform_.3s_cubic-bezier(.32,.72,0,1),opacity_.18s_ease] motion-reduce:[transition-duration:.01ms] ${cursor.visible ? "opacity-100" : "opacity-0"}`}
          style={{ transform: `translateY(${cursor.index * ROW_HEIGHT}px)` }}
          aria-hidden="true"
        />
        {rows.map((row, index) => (
          <button
            key={row.id}
            type="button"
            role="menuitem"
            className="group relative z-[1] flex h-[26px] w-full items-center gap-2 rounded-[5px] border-0 bg-transparent px-[7px] text-left text-[11px] text-[#c6cbd2] [transition:color_.18s_ease] hover:text-[#f4f5f7] focus-visible:text-[#f4f5f7] focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-offset-[-1.5px] focus-visible:outline-[#86b6ff] motion-reduce:[transition-duration:.01ms]"
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
              <span className="grid size-[14px] flex-none place-items-center text-[#868d97] [transition:color_.18s_ease] group-hover:text-[#c6cbd2] group-focus-visible:text-[#c6cbd2] motion-reduce:[transition-duration:.01ms]">
                <row.icon size={14} strokeWidth={1.7} aria-hidden="true" />
              </span>
            )}
            {row.initials && (
              <span
                className="grid size-[18px] flex-none place-items-center rounded-md text-[9px] font-semibold text-[#15171a]"
                style={{ background: row.tint }}
                aria-hidden="true"
              >
                {row.initials}
              </span>
            )}
            {row.dot && (
              <span
                className="mx-[3px] size-2 flex-none rounded-full"
                style={{ background: row.dot }}
                aria-hidden="true"
              />
            )}
            <span className="min-w-0 flex-1 truncate">{row.label}</span>
            {row.hint && (
              <span className="flex-none font-mono text-[10px] text-[#6b727c]">{row.hint}</span>
            )}
            {row.panel && (
              <ChevronRight
                className="flex-none text-[#5c636d] [transition:transform_.24s_cubic-bezier(.32,.72,0,1),color_.18s_ease] group-hover:text-[#868d97] group-hover:[transform:translateX(2px)] group-focus-visible:text-[#868d97] group-focus-visible:[transform:translateX(2px)] motion-reduce:[transition-duration:.01ms]"
                size={13}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            )}
          </button>
        ))}
        {!rows.length && (
          <p className="m-0 flex h-[26px] items-center px-[7px] text-[11px] text-[#6d747e]">No matches</p>
        )}
      </div>
    </div>
  );
}

/**
 * A menu that walks into its own submenus.
 *
 * The surface hangs off the trigger rather than sitting under it in flow, and
 * the root reserves the space it can ever need — 26px of trigger, a 7px gap and
 * the tallest step, h-[182px] — so a step that grows or shrinks moves nothing
 * above it. Editing the rows means editing that reserve.
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
    <div
      className="relative h-[182px] w-[214px] text-center text-[11px] text-[#dfe2e5]"
      ref={rootRef}
      onKeyDown={handleKeyDown}
    >
      <style>{panelKeyframes}</style>
      <button
        type="button"
        className="inline-flex h-[26px] items-center gap-[7px] rounded-md border border-[#2f333a] bg-[#16181c] pl-[10px] pr-2 text-[11px] text-[#dfe2e5] [transition:border-color_.2s_ease,background-color_.2s_ease] hover:border-[#3d434c] hover:bg-[#1b1e23] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#86b6ff] motion-reduce:[transition-duration:.01ms]"
        ref={triggerRef}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => (open ? dismiss() : setOpen(true))}
      >
        Board actions
        <ChevronDown
          className={`text-[#868d97] [transition:transform_.34s_cubic-bezier(.32,.72,0,1)] motion-reduce:[transition-duration:.01ms] ${open ? "[transform:rotate(180deg)]" : ""}`}
          size={13}
          strokeWidth={1.8}
          aria-hidden="true"
        />
      </button>
      <div
        className={`absolute left-0 top-[33px] z-[1] w-full origin-top rounded-[9px] border border-[#2b2f36] bg-[#121418] p-[5px] text-left shadow-[inset_0_1px_0_rgba(255,255,255,.04),0_16px_34px_rgba(0,0,0,.45)] ${
          open
            ? "visible opacity-100 [filter:blur(0px)] [transform:none] [transition:opacity_.22s_ease,transform_.36s_cubic-bezier(.32,.72,0,1),filter_.28s_ease,visibility_0s]"
            : "invisible opacity-0 blur-[5px] [transform:translateY(-6px)_scale(.97)] [transition:opacity_.18s_ease,transform_.26s_cubic-bezier(.32,.72,0,1),filter_.22s_ease,visibility_0s_linear_.26s]"
        } motion-reduce:[transition-duration:.01ms]`}
      >
        <div
          className="relative overflow-hidden [transition:height_.4s_cubic-bezier(.45,.05,.15,1)] motion-reduce:[transition-duration:.01ms]"
          style={{ height }}
        >
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
