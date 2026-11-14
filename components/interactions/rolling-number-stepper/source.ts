export const componentCode = `"use client";

import "./styles.css";

import { useEffect, useRef, useState, type MouseEvent, type PointerEvent } from "react";

const MIN = 0;
const MAX = 99;
const START = 8;
const EASE = "cubic-bezier(.22, 1, .36, 1)";

// Ref callbacks rather than effects: each one runs once, the moment its digit or column is mounted.
const roll = (node: HTMLElement | null) => {
  if (!node) return;
  // Strict Mode attaches refs twice in development; starting over keeps the second pass from stacking on the first.
  node.getAnimations().forEach((animation) => animation.cancel());
  const direction = Number(node.dataset.direction);
  const leaving = node.dataset.roll === "out";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // A step up pushes the old digit out of the top and brings the new one in from below; a step down reverses it.
  const away = \`translateY(\${direction * -100}%)\`;
  const toward = \`translateY(\${direction * 100}%)\`;
  node.animate(
    leaving
      ? [{ transform: "none", opacity: 1 }, { transform: away, opacity: 0 }]
      : [{ transform: toward, opacity: 0 }, { transform: "none", opacity: 1 }],
    { duration: reduce ? 0 : 450, easing: EASE, fill: leaving ? "forwards" : "none" },
  );
};

// A digit that appears or disappears (9 to 10, 10 to 9) opens or closes its column, so the number re-centres smoothly.
const resize = (node: HTMLElement | null) => {
  if (!node) return;
  // Measured with any earlier pass cancelled, or a column caught mid-collapse would open to nothing.
  node.getAnimations().forEach((animation) => animation.cancel());
  const width = \`\${node.offsetWidth}px\`;
  const leaving = node.dataset.column === "out";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  node.animate(leaving ? [{ width }, { width: "0px" }] : [{ width: "0px" }, { width }], {
    duration: reduce ? 0 : 450,
    easing: EASE,
    fill: leaving ? "forwards" : "none",
  });
};

type Change = { value: number; previous: number; direction: number; tick: number };

function RollingDigits({ value, previous, direction, tick }: Change) {
  const now = String(value);
  const was = String(previous);
  const length = Math.max(now.length, was.length);

  return (
    <span className="rolling-stepper__digits" aria-hidden="true">
      {Array.from({ length }, (_, index) => {
        // Columns are matched from the right, so the ones digit always rolls over the ones digit.
        const place = length - 1 - index;
        const digit = now[now.length - 1 - place];
        const old = was[was.length - 1 - place];
        if (digit === old) {
          return (
            <span key={place} className="rolling-stepper__column">
              <span className="rolling-stepper__digit">{digit}</span>
            </span>
          );
        }
        const column = digit === undefined ? "out" : old === undefined ? "in" : undefined;
        return (
          // Keyed by the step, so every change mounts fresh digits and their animation plays again.
          <span
            key={\`\${place}-\${tick}\`}
            ref={column ? resize : undefined}
            className="rolling-stepper__column"
            data-column={column}
          >
            {old !== undefined && (
              <span ref={roll} className="rolling-stepper__digit" data-roll="out" data-direction={direction}>
                {old}
              </span>
            )}
            {digit !== undefined && (
              <span ref={roll} className="rolling-stepper__digit" data-roll="in" data-direction={direction}>
                {digit}
              </span>
            )}
          </span>
        );
      })}
    </span>
  );
}

export function RollingNumberStepper() {
  const [change, setChange] = useState<Change>({ value: START, previous: START, direction: 1, tick: 0 });
  const valueRef = useRef(START);
  const hold = useRef({ delay: 0, repeat: 0 });

  useEffect(() => {
    const timers = hold.current;
    return () => {
      clearTimeout(timers.delay);
      clearInterval(timers.repeat);
    };
  }, []);

  const release = () => {
    clearTimeout(hold.current.delay);
    clearInterval(hold.current.repeat);
  };

  const nudge = (direction: number) => {
    const previous = valueRef.current;
    const value = Math.min(MAX, Math.max(MIN, previous + direction));
    // A disabled button never hears the pointer come up, so reaching the limit ends the hold itself.
    if (value === previous) return release();
    valueRef.current = value;
    setChange((current) => ({ value, previous, direction, tick: current.tick + 1 }));
  };

  // Pressing steps once; holding on keeps stepping until the pointer lets go.
  const press = (event: PointerEvent<HTMLButtonElement>, direction: number) => {
    if (event.button !== 0) return;
    release();
    nudge(direction);
    hold.current.delay = window.setTimeout(() => {
      hold.current.repeat = window.setInterval(() => nudge(direction), 120);
    }, 400);
  };

  // Pointer presses already stepped on the way down, so only a keyboard click (detail 0) steps here.
  const click = (event: MouseEvent<HTMLButtonElement>, direction: number) => {
    if (event.detail === 0) nudge(direction);
  };

  return (
    <div className="rolling-stepper" role="group" aria-label="Tickets">
      <button
        type="button"
        className="rolling-stepper__button"
        aria-label="Remove a ticket"
        onPointerDown={(event) => press(event, -1)}
        onPointerUp={release}
        onPointerLeave={release}
        onPointerCancel={release}
        onClick={(event) => click(event, -1)}
        disabled={change.value <= MIN}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M5 12h14" />
        </svg>
      </button>
      <div className="rolling-stepper__readout">
        <span className="rolling-stepper__number">
          {/* The widest value sizes the box, so the buttons never move while digits come and go. */}
          <span className="rolling-stepper__sizer" aria-hidden="true">
            {MAX}
          </span>
          {/* The settled value is what screen readers and copy-paste get, but it is never painted. */}
          <output className="rolling-stepper__value" aria-live="polite">
            {change.value}
          </output>
          <RollingDigits {...change} />
        </span>
        <span className="rolling-stepper__label">Tickets</span>
      </div>
      <button
        type="button"
        className="rolling-stepper__button"
        aria-label="Add a ticket"
        onPointerDown={(event) => press(event, 1)}
        onPointerUp={release}
        onPointerLeave={release}
        onPointerCancel={release}
        onClick={(event) => click(event, 1)}
        disabled={change.value >= MAX}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M5 12h14M12 5v14" />
        </svg>
      </button>
    </div>
  );
}

/* styles.css */
.rolling-stepper {
  display: inline-flex;
  align-items: center;
  gap: 18px;
  border: 1px solid light-dark(#e3e6eb, #24272d);
  border-radius: 999px;
  background: light-dark(#ffffff, #121418);
  padding: 6px;
  color: light-dark(#14181e, #f2f4f6);
}

.rolling-stepper,
.rolling-stepper * {
  box-sizing: border-box;
}

.rolling-stepper__button {
  display: grid;
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  place-items: center;
  margin: 0;
  border: 0;
  border-radius: 999px;
  background: light-dark(#f0f2f5, #1b1e23);
  padding: 0;
  color: inherit;
  cursor: pointer;
  touch-action: manipulation;
  user-select: none;
  -webkit-touch-callout: none;
  transition:
    background-color .2s cubic-bezier(.32, .72, 0, 1),
    transform .2s cubic-bezier(.32, .72, 0, 1),
    opacity .2s cubic-bezier(.32, .72, 0, 1);
}

.rolling-stepper__button:enabled:hover {
  background: light-dark(#e6e9ee, #24282e);
}

.rolling-stepper__button:enabled:active {
  transform: scale(.92);
}

.rolling-stepper__button:focus-visible {
  outline: 2px solid #86b6ff;
  outline-offset: 2px;
}

.rolling-stepper__button:disabled {
  opacity: .35;
  cursor: default;
}

.rolling-stepper__readout {
  display: grid;
  min-width: 0;
  justify-items: center;
}

.rolling-stepper__number {
  display: inline-grid;
  font-size: 32px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  letter-spacing: -.02em;
  line-height: 1;
  white-space: nowrap;
}

.rolling-stepper__sizer,
.rolling-stepper__value,
.rolling-stepper__digits {
  grid-area: 1 / 1;
  justify-self: center;
}

.rolling-stepper__sizer {
  visibility: hidden;
}

.rolling-stepper__value {
  color: transparent;
}

.rolling-stepper__digits {
  display: inline-flex;
  pointer-events: none;
  user-select: none;
}

/* Each column clips its own digits, so one rolls out of sight while the next rolls into place. */
.rolling-stepper__column {
  display: inline-grid;
  overflow: hidden;
}

.rolling-stepper__digit {
  grid-area: 1 / 1;
}

.rolling-stepper__label {
  margin-top: 6px;
  color: light-dark(#69727f, #868d97);
  font-size: 11px;
  font-weight: 500;
  line-height: 1;
}

@media (prefers-reduced-motion: reduce) {
  .rolling-stepper__button {
    transition-property: background-color, opacity;
  }
}`;

export const tailwindCode = `"use client";

import { useEffect, useRef, useState, type MouseEvent, type PointerEvent } from "react";

const MIN = 0;
const MAX = 99;
const START = 8;
const EASE = "cubic-bezier(.22, 1, .36, 1)";

// Ref callbacks rather than effects: each one runs once, the moment its digit or column is mounted.
const roll = (node: HTMLElement | null) => {
  if (!node) return;
  // Strict Mode attaches refs twice in development; starting over keeps the second pass from stacking on the first.
  node.getAnimations().forEach((animation) => animation.cancel());
  const direction = Number(node.dataset.direction);
  const leaving = node.dataset.roll === "out";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // A step up pushes the old digit out of the top and brings the new one in from below; a step down reverses it.
  const away = \`translateY(\${direction * -100}%)\`;
  const toward = \`translateY(\${direction * 100}%)\`;
  node.animate(
    leaving
      ? [{ transform: "none", opacity: 1 }, { transform: away, opacity: 0 }]
      : [{ transform: toward, opacity: 0 }, { transform: "none", opacity: 1 }],
    { duration: reduce ? 0 : 450, easing: EASE, fill: leaving ? "forwards" : "none" },
  );
};

// A digit that appears or disappears (9 to 10, 10 to 9) opens or closes its column, so the number re-centres smoothly.
const resize = (node: HTMLElement | null) => {
  if (!node) return;
  // Measured with any earlier pass cancelled, or a column caught mid-collapse would open to nothing.
  node.getAnimations().forEach((animation) => animation.cancel());
  const width = \`\${node.offsetWidth}px\`;
  const leaving = node.dataset.column === "out";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  node.animate(leaving ? [{ width }, { width: "0px" }] : [{ width: "0px" }, { width }], {
    duration: reduce ? 0 : 450,
    easing: EASE,
    fill: leaving ? "forwards" : "none",
  });
};

type Change = { value: number; previous: number; direction: number; tick: number };

function RollingDigits({ value, previous, direction, tick }: Change) {
  const now = String(value);
  const was = String(previous);
  const length = Math.max(now.length, was.length);

  return (
    <span className="pointer-events-none inline-flex select-none justify-self-center [grid-area:1/1]" aria-hidden="true">
      {Array.from({ length }, (_, index) => {
        // Columns are matched from the right, so the ones digit always rolls over the ones digit.
        const place = length - 1 - index;
        const digit = now[now.length - 1 - place];
        const old = was[was.length - 1 - place];
        if (digit === old) {
          return (
            <span key={place} className="inline-grid overflow-hidden">
              <span className="[grid-area:1/1]">{digit}</span>
            </span>
          );
        }
        const column = digit === undefined ? "out" : old === undefined ? "in" : undefined;
        return (
          // Keyed by the step, so every change mounts fresh digits and their animation plays again.
          <span
            key={\`\${place}-\${tick}\`}
            ref={column ? resize : undefined}
            className="inline-grid overflow-hidden"
            data-column={column}
          >
            {old !== undefined && (
              <span ref={roll} className="[grid-area:1/1]" data-roll="out" data-direction={direction}>
                {old}
              </span>
            )}
            {digit !== undefined && (
              <span ref={roll} className="[grid-area:1/1]" data-roll="in" data-direction={direction}>
                {digit}
              </span>
            )}
          </span>
        );
      })}
    </span>
  );
}

export function RollingNumberStepper() {
  const [change, setChange] = useState<Change>({ value: START, previous: START, direction: 1, tick: 0 });
  const valueRef = useRef(START);
  const hold = useRef({ delay: 0, repeat: 0 });

  useEffect(() => {
    const timers = hold.current;
    return () => {
      clearTimeout(timers.delay);
      clearInterval(timers.repeat);
    };
  }, []);

  const release = () => {
    clearTimeout(hold.current.delay);
    clearInterval(hold.current.repeat);
  };

  const nudge = (direction: number) => {
    const previous = valueRef.current;
    const value = Math.min(MAX, Math.max(MIN, previous + direction));
    // A disabled button never hears the pointer come up, so reaching the limit ends the hold itself.
    if (value === previous) return release();
    valueRef.current = value;
    setChange((current) => ({ value, previous, direction, tick: current.tick + 1 }));
  };

  // Pressing steps once; holding on keeps stepping until the pointer lets go.
  const press = (event: PointerEvent<HTMLButtonElement>, direction: number) => {
    if (event.button !== 0) return;
    release();
    nudge(direction);
    hold.current.delay = window.setTimeout(() => {
      hold.current.repeat = window.setInterval(() => nudge(direction), 120);
    }, 400);
  };

  // Pointer presses already stepped on the way down, so only a keyboard click (detail 0) steps here.
  const click = (event: MouseEvent<HTMLButtonElement>, direction: number) => {
    if (event.detail === 0) nudge(direction);
  };

  return (
    <div
      className="inline-flex items-center gap-[18px] rounded-full border border-[color:light-dark(#e3e6eb,#24272d)] bg-[light-dark(#ffffff,#121418)] p-[6px] text-[color:light-dark(#14181e,#f2f4f6)]"
      role="group" aria-label="Tickets">
      <button
        type="button"
        className="m-0 grid size-[44px] shrink-0 cursor-pointer touch-manipulation select-none place-items-center rounded-full border-0 bg-[light-dark(#f0f2f5,#1b1e23)] p-0 text-inherit transition-[background-color,transform,opacity] duration-200 ease-[cubic-bezier(.32,.72,0,1)] [-webkit-touch-callout:none] enabled:hover:bg-[light-dark(#e6e9ee,#24282e)] enabled:active:scale-[.92] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#86b6ff] disabled:cursor-default disabled:opacity-[.35] motion-reduce:transition-[background-color,opacity]"
        aria-label="Remove a ticket"
        onPointerDown={(event) => press(event, -1)}
        onPointerUp={release}
        onPointerLeave={release}
        onPointerCancel={release}
        onClick={(event) => click(event, -1)}
        disabled={change.value <= MIN}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M5 12h14" />
        </svg>
      </button>
      <div className="grid min-w-0 justify-items-center">
        <span className="inline-grid whitespace-nowrap text-[32px] font-semibold leading-none tracking-[-.02em] tabular-nums">
          {/* The widest value sizes the box, so the buttons never move while digits come and go. */}
          <span className="invisible justify-self-center [grid-area:1/1]" aria-hidden="true">
            {MAX}
          </span>
          {/* The settled value is what screen readers and copy-paste get, but it is never painted. */}
          <output className="justify-self-center text-transparent [grid-area:1/1]" aria-live="polite">
            {change.value}
          </output>
          <RollingDigits {...change} />
        </span>
        <span className="mt-[6px] text-[11px] font-medium leading-none text-[color:light-dark(#69727f,#868d97)]">Tickets</span>
      </div>
      <button
        type="button"
        className="m-0 grid size-[44px] shrink-0 cursor-pointer touch-manipulation select-none place-items-center rounded-full border-0 bg-[light-dark(#f0f2f5,#1b1e23)] p-0 text-inherit transition-[background-color,transform,opacity] duration-200 ease-[cubic-bezier(.32,.72,0,1)] [-webkit-touch-callout:none] enabled:hover:bg-[light-dark(#e6e9ee,#24282e)] enabled:active:scale-[.92] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#86b6ff] disabled:cursor-default disabled:opacity-[.35] motion-reduce:transition-[background-color,opacity]"
        aria-label="Add a ticket"
        onPointerDown={(event) => press(event, 1)}
        onPointerUp={release}
        onPointerLeave={release}
        onPointerCancel={release}
        onClick={(event) => click(event, 1)}
        disabled={change.value >= MAX}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M5 12h14M12 5v14" />
        </svg>
      </button>
    </div>
  );
}`;
