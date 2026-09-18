export const componentCode = `"use client";

import "./styles.css";

import { useRef, useState } from "react";
import type { AnimationEvent as ReactAnimationEvent, KeyboardEvent as ReactKeyboardEvent, PointerEvent as ReactPointerEvent } from "react";

const MIN = 0;
const MAX = 100;
const PIXELS_PER_STEP = 2;
const DRAG_THRESHOLD = 3;

/* The two speeds a design tool trains your hands to expect, on the keys it trains them to reach for. */
const stepFor = (event: { altKey: boolean; shiftKey: boolean }) => (event.shiftKey ? 10 : event.altKey ? 0.1 : 1);
const round = (value: number) => Math.round(value * 10) / 10;
const clamp = (value: number) => Math.min(MAX, Math.max(MIN, value));
const numeric = (raw: string) => raw.replace(/[^\\d.]/g, "").replace(/(\\..*)\\./g, "$1");

export function ScrubNumberField() {
  const [value, setValue] = useState(48);
  const [draft, setDraft] = useState<string | null>(null);
  const [scrubbing, setScrubbing] = useState(false);
  const [bound, setBound] = useState<"min" | "max" | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const drag = useRef({ origin: 0, base: 48, value: 48, step: 1, pinned: "", moved: false });
  const reverting = useRef(false);

  const startScrub = (event: ReactPointerEvent<HTMLDivElement>) => {
    /* Once you are typing the field is a text input again, and dragging selects characters the way it should. */
    if (event.button !== 0 || document.activeElement === inputRef.current) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { origin: event.clientX, base: value, value, step: stepFor(event), pinned: "", moved: false };
  };

  const moveScrub = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;

    /* Reaching for Shift mid-drag re-bases the gesture instead of multiplying the pixels already travelled. */
    const held = stepFor(event);
    if (held !== drag.current.step) {
      drag.current = { ...drag.current, origin: event.clientX, base: drag.current.value, step: held, moved: true };
    }

    const travel = event.clientX - drag.current.origin;
    if (!drag.current.moved && Math.abs(travel) < DRAG_THRESHOLD) return;
    drag.current.moved = true;
    setScrubbing(true);

    const wanted = round(drag.current.base + Math.round(travel / PIXELS_PER_STEP) * held);
    const pinned = wanted > MAX ? "max" : wanted < MIN ? "min" : "";
    if (pinned && pinned !== drag.current.pinned) setBound(pinned);
    drag.current.pinned = pinned;
    drag.current.value = clamp(wanted);
    setValue(drag.current.value);
  };

  const endScrub = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    event.currentTarget.releasePointerCapture(event.pointerId);
    setScrubbing(false);
    /* A press that never travelled is a click, and a click hands the field over for typing. */
    if (!drag.current.moved) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  };

  const settle = (next: number) => {
    const clamped = clamp(round(next));
    if (clamped !== round(next)) setBound(clamped === MIN ? "min" : "max");
    drag.current.value = clamped;
    setValue(clamped);
    setDraft(null);
  };

  const commit = () => {
    const parsed = draft === null ? Number.NaN : Number.parseFloat(draft);
    /* Escape blurs the field, and the blur that follows must not commit the draft Escape just threw away. */
    if (!reverting.current && Number.isFinite(parsed)) settle(parsed);
    reverting.current = false;
    setDraft(null);
  };

  const handleKey = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      commit();
      event.currentTarget.blur();
      return;
    }
    if (event.key === "Escape") {
      reverting.current = true;
      event.currentTarget.blur();
      return;
    }
    const direction = event.key === "ArrowUp" ? 1 : event.key === "ArrowDown" ? -1 : 0;
    if (!direction) return;
    event.preventDefault();
    settle(value + direction * stepFor(event));
  };

  /* The nudge clears itself when it finishes, so a bound can be hit again the moment the field is still. */
  const clearBound = (event: ReactAnimationEvent<HTMLDivElement>) => {
    if (event.animationName === "scrub-number-nudge") setBound(null);
  };

  return (
    <div
      className="scrub-number-field"
      data-scrubbing={scrubbing || undefined}
      data-bound={bound ?? undefined}
      onAnimationEnd={clearBound}
      onPointerDown={startScrub}
      onPointerMove={moveScrub}
      onPointerUp={endScrub}
      onPointerCancel={endScrub}
    >
      <input
        ref={inputRef}
        className="scrub-number-input"
        type="text"
        inputMode="decimal"
        autoComplete="off"
        aria-label="Opacity"
        value={draft ?? String(value)}
        onChange={(event) => setDraft(numeric(event.target.value))}
        onKeyDown={handleKey}
        onBlur={commit}
      />
    </div>
  );
}

/* styles.css */
.scrub-number-field {
  --scrub-nudge: 5px;
  display: flex;
  align-items: center;
  width: 96px;
  height: 32px;
  border: 1px solid light-dark(#cbd2dc, #363a42);
  border-radius: 7px;
  background: light-dark(#ffffff, #15171b);
  padding: 0 10px;
  cursor: ew-resize;
  touch-action: none;
  transition: border-color .2s ease, box-shadow .2s ease;
}
.scrub-number-field[data-bound="min"] { --scrub-nudge: -5px; }
.scrub-number-input {
  width: 100%;
  min-width: 0;
  border: 0;
  background: none;
  padding: 0;
  color: light-dark(#262d38, #e8ebee);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 13px;
  font-weight: 500;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  cursor: inherit;
}
/* The field itself is the focus ring, so the input must not draw a second one inside it. */
.scrub-number-input:focus,
.scrub-number-input:focus-visible {
  outline: 0;
  cursor: text;
}
.scrub-number-field:focus-within {
  border-color: #f97316;
  box-shadow: 0 0 0 3px #f9731625;
  cursor: text;
}
.scrub-number-field[data-scrubbing] {
  border-color: #f97316;
  box-shadow: 0 0 0 3px #f9731625;
}
.scrub-number-field[data-bound] {
  border-color: #f97316;
  animation: scrub-number-nudge .26s cubic-bezier(.22, 1, .36, 1);
}
@keyframes scrub-number-nudge {
  0%, 100% { transform: translateX(0); }
  40% { transform: translateX(var(--scrub-nudge)); }
}
@media (prefers-reduced-motion: reduce) {
  @keyframes scrub-number-nudge {
    0%, 100% { transform: none; }
  }
}`;

export const tailwindCode = `"use client";

import { useRef, useState } from "react";
import type { AnimationEvent as ReactAnimationEvent, KeyboardEvent as ReactKeyboardEvent, PointerEvent as ReactPointerEvent } from "react";

const MIN = 0;
const MAX = 100;
const PIXELS_PER_STEP = 2;
const DRAG_THRESHOLD = 3;

/* The two speeds a design tool trains your hands to expect, on the keys it trains them to reach for. */
const stepFor = (event: { altKey: boolean; shiftKey: boolean }) => (event.shiftKey ? 10 : event.altKey ? 0.1 : 1);
const round = (value: number) => Math.round(value * 10) / 10;
const clamp = (value: number) => Math.min(MAX, Math.max(MIN, value));
const numeric = (raw: string) => raw.replace(/[^\\d.]/g, "").replace(/(\\..*)\\./g, "$1");

const nudgeKeyframes = \`
@keyframes scrub-number-nudge {
  0%, 100% { transform: translateX(0); }
  40% { transform: translateX(var(--scrub-nudge)); }
}
@media (prefers-reduced-motion: reduce) {
  @keyframes scrub-number-nudge {
    0%, 100% { transform: none; }
  }
}\`;

export function ScrubNumberField() {
  const [value, setValue] = useState(48);
  const [draft, setDraft] = useState<string | null>(null);
  const [scrubbing, setScrubbing] = useState(false);
  const [bound, setBound] = useState<"min" | "max" | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const drag = useRef({ origin: 0, base: 48, value: 48, step: 1, pinned: "", moved: false });
  const reverting = useRef(false);

  const startScrub = (event: ReactPointerEvent<HTMLDivElement>) => {
    /* Once you are typing the field is a text input again, and dragging selects characters the way it should. */
    if (event.button !== 0 || document.activeElement === inputRef.current) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { origin: event.clientX, base: value, value, step: stepFor(event), pinned: "", moved: false };
  };

  const moveScrub = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;

    /* Reaching for Shift mid-drag re-bases the gesture instead of multiplying the pixels already travelled. */
    const held = stepFor(event);
    if (held !== drag.current.step) {
      drag.current = { ...drag.current, origin: event.clientX, base: drag.current.value, step: held, moved: true };
    }

    const travel = event.clientX - drag.current.origin;
    if (!drag.current.moved && Math.abs(travel) < DRAG_THRESHOLD) return;
    drag.current.moved = true;
    setScrubbing(true);

    const wanted = round(drag.current.base + Math.round(travel / PIXELS_PER_STEP) * held);
    const pinned = wanted > MAX ? "max" : wanted < MIN ? "min" : "";
    if (pinned && pinned !== drag.current.pinned) setBound(pinned);
    drag.current.pinned = pinned;
    drag.current.value = clamp(wanted);
    setValue(drag.current.value);
  };

  const endScrub = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    event.currentTarget.releasePointerCapture(event.pointerId);
    setScrubbing(false);
    /* A press that never travelled is a click, and a click hands the field over for typing. */
    if (!drag.current.moved) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  };

  const settle = (next: number) => {
    const clamped = clamp(round(next));
    if (clamped !== round(next)) setBound(clamped === MIN ? "min" : "max");
    drag.current.value = clamped;
    setValue(clamped);
    setDraft(null);
  };

  const commit = () => {
    const parsed = draft === null ? Number.NaN : Number.parseFloat(draft);
    /* Escape blurs the field, and the blur that follows must not commit the draft Escape just threw away. */
    if (!reverting.current && Number.isFinite(parsed)) settle(parsed);
    reverting.current = false;
    setDraft(null);
  };

  const handleKey = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      commit();
      event.currentTarget.blur();
      return;
    }
    if (event.key === "Escape") {
      reverting.current = true;
      event.currentTarget.blur();
      return;
    }
    const direction = event.key === "ArrowUp" ? 1 : event.key === "ArrowDown" ? -1 : 0;
    if (!direction) return;
    event.preventDefault();
    settle(value + direction * stepFor(event));
  };

  /* The nudge clears itself when it finishes, so a bound can be hit again the moment the field is still. */
  const clearBound = (event: ReactAnimationEvent<HTMLDivElement>) => {
    if (event.animationName === "scrub-number-nudge") setBound(null);
  };

  return (
    <>
      <style>{nudgeKeyframes}</style>
      <div
        className="flex h-8 w-[96px] cursor-ew-resize touch-none items-center rounded-[7px] border border-[light-dark(#cbd2dc,#363a42)] bg-[light-dark(#ffffff,#15171b)] px-[10px] transition-[border-color,box-shadow] duration-200 ease-[ease] [--scrub-nudge:5px] focus-within:cursor-text focus-within:border-[#f97316] focus-within:shadow-[0_0_0_3px_#f9731625] data-[scrubbing]:border-[#f97316] data-[scrubbing]:shadow-[0_0_0_3px_#f9731625] data-[bound]:border-[#f97316] data-[bound]:[animation:scrub-number-nudge_.26s_cubic-bezier(.22,1,.36,1)] data-[bound=min]:[--scrub-nudge:-5px]"
        data-scrubbing={scrubbing || undefined}
        data-bound={bound ?? undefined}
        onAnimationEnd={clearBound}
        onPointerDown={startScrub}
        onPointerMove={moveScrub}
        onPointerUp={endScrub}
        onPointerCancel={endScrub}
      >
        <input
          ref={inputRef}
          className="w-full min-w-0 cursor-[inherit] border-0 bg-transparent p-0 font-mono text-[13px] font-medium leading-none tabular-nums text-[light-dark(#262d38,#e8ebee)] outline-0 focus:cursor-text focus:outline-0 focus-visible:outline-0"
          type="text"
          inputMode="decimal"
          autoComplete="off"
          aria-label="Opacity"
          value={draft ?? String(value)}
          onChange={(event) => setDraft(numeric(event.target.value))}
          onKeyDown={handleKey}
          onBlur={commit}
        />
      </div>
    </>
  );
}`;
