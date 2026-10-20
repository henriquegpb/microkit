export const componentCode = `"use client";

import "./styles.css";

import { Check, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";

type DeleteState = "idle" | "holding" | "deleted";

const HOLD_MS = 1600;
const RESET_MS = 1800;

function ButtonContent({ deleted }: { deleted: boolean }) {
  return (
    <span className="hold-delete__content">
      <span className="hold-delete__glyph" aria-hidden="true">
        <Trash2 className="hold-delete__icon" data-active={!deleted} size={20} strokeWidth={2} />
        <Check className="hold-delete__icon" data-active={deleted} size={20} strokeWidth={2.4} />
      </span>
      <span className="hold-delete__label">
        <span className="hold-delete__text" data-active={!deleted}>
          Hold to delete
        </span>
        <span className="hold-delete__text" data-active={deleted}>
          Deleted
        </span>
      </span>
    </span>
  );
}

export function HoldToDeleteButton() {
  const [state, setState] = useState<DeleteState>("idle");

  useEffect(() => {
    if (state === "idle") return;
    const timeout = window.setTimeout(
      () => setState(state === "holding" ? "deleted" : "idle"),
      state === "holding" ? HOLD_MS : RESET_MS,
    );
    return () => window.clearTimeout(timeout);
  }, [state]);

  const start = () => setState((current) => (current === "idle" ? "holding" : current));
  const cancel = () => setState((current) => (current === "holding" ? "idle" : current));

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.button === 0) start();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== " " && event.key !== "Enter") return;
    event.preventDefault();
    if (!event.repeat) start();
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === " " || event.key === "Enter") cancel();
  };

  return (
    <button
      type="button"
      className="hold-delete"
      data-state={state}
      onPointerDown={handlePointerDown}
      onPointerUp={cancel}
      onPointerLeave={cancel}
      onPointerCancel={cancel}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onBlur={cancel}
      onContextMenu={(event) => event.preventDefault()}
    >
      <ButtonContent deleted={state === "deleted"} />
      <span className="hold-delete__fill" aria-hidden="true">
        <ButtonContent deleted={state === "deleted"} />
      </span>
    </button>
  );
}

/* styles.css */
.hold-delete,
.hold-delete * {
  box-sizing: border-box;
}

.hold-delete {
  appearance: none;
  position: relative;
  display: inline-flex;
  height: 52px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 0;
  border-radius: 999px;
  background: light-dark(#ffffff, #121418);
  box-shadow:
    inset 0 0 0 1px light-dark(#dfe3ea, #2b2f36),
    0 10px 24px light-dark(rgba(246, 247, 249, .35), rgba(0, 0, 0, .35)),
    0 8px 28px rgba(249, 115, 22, 0);
  padding: 0 24px;
  color: light-dark(#14181e, #f2f4f6);
  font-family: inherit;
  font-size: 17px;
  font-weight: 500;
  letter-spacing: -.01em;
  line-height: 1;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  touch-action: manipulation;
  transition:
    transform .25s cubic-bezier(.16, 1, .3, 1),
    background-color .2s ease,
    box-shadow .5s cubic-bezier(.16, 1, .3, 1);
}

.hold-delete[data-state="idle"]:hover {
  background: light-dark(#f0f2f5, #1b1e23);
}

.hold-delete[data-state="holding"],
.hold-delete[data-state="deleted"] {
  box-shadow:
    inset 0 0 0 1px light-dark(#dfe3ea, #2b2f36),
    0 10px 24px light-dark(rgba(246, 247, 249, .35), rgba(0, 0, 0, .35)),
    0 8px 28px rgba(249, 115, 22, .55);
}

.hold-delete[data-state="holding"] {
  transform: scale(.97);
  transition:
    transform .25s cubic-bezier(.16, 1, .3, 1),
    background-color .2s ease,
    box-shadow 1.6s linear;
}

.hold-delete[data-state="deleted"] {
  cursor: default;
}

.hold-delete:focus-visible {
  outline: 2px solid #f97316;
  outline-offset: 4px;
}

.hold-delete__content {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.hold-delete[data-state="deleted"] {
  animation: hold-delete-pulse .8s cubic-bezier(.16, 1, .3, 1);
}

.hold-delete__glyph {
  display: grid;
  flex: none;
}

.hold-delete__icon {
  grid-area: 1 / 1;
  transition: opacity .24s ease, transform .32s cubic-bezier(.16, 1, .3, 1);
}

.hold-delete__icon[data-active="false"] {
  opacity: 0;
  transform: scale(.5);
}

.hold-delete__label {
  display: grid;
}

.hold-delete__text {
  grid-area: 1 / 1;
  justify-self: start;
  white-space: nowrap;
  transition: opacity .24s ease, transform .32s cubic-bezier(.16, 1, .3, 1), filter .24s ease, visibility .24s;
}

.hold-delete__text[data-active="false"] {
  visibility: hidden;
  opacity: 0;
  transform: translateY(6px);
  filter: blur(2px);
}

.hold-delete__fill {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f97316;
  color: #fff;
  clip-path: inset(0 100% 0 0);
  pointer-events: none;
  transition: clip-path .5s cubic-bezier(.16, 1, .3, 1);
}

.hold-delete[data-state="holding"] .hold-delete__fill,
.hold-delete[data-state="deleted"] .hold-delete__fill {
  clip-path: inset(0);
}

.hold-delete[data-state="holding"] .hold-delete__fill {
  transition: clip-path 1.6s linear;
}

@keyframes hold-delete-pulse {
  from {
    outline: 1px solid rgba(249, 115, 22, .9);
    outline-offset: 0;
  }
  to {
    outline: 1px solid rgba(249, 115, 22, 0);
    outline-offset: 12px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hold-delete[data-state="deleted"] {
    animation: none;
  }

  .hold-delete,
  .hold-delete__icon,
  .hold-delete__text,
  .hold-delete__fill {
    transition: none;
  }

  .hold-delete[data-state="holding"] {
    transform: none;
    transition: box-shadow 1.6s linear;
  }
}`;

export const tailwindCode = `"use client";

import { Check, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";

type DeleteState = "idle" | "holding" | "deleted";

const HOLD_MS = 1600;
const RESET_MS = 1800;

const pulseKeyframes = \`
@keyframes hold-delete-pulse {
  from { outline: 1px solid rgba(249, 115, 22, .9); outline-offset: 0; }
  to { outline: 1px solid rgba(249, 115, 22, 0); outline-offset: 12px; }
}\`;

function ButtonContent({ deleted }: { deleted: boolean }) {
  return (
    <span className="inline-flex items-center gap-[10px]">
      <span className="grid shrink-0" aria-hidden="true">
        <Trash2
          className="[grid-area:1/1] [transition:opacity_.24s_ease,transform_.32s_cubic-bezier(.16,1,.3,1)] data-[active=false]:opacity-0 data-[active=false]:[transform:scale(.5)] motion-reduce:transition-none"
          data-active={!deleted}
          size={20}
          strokeWidth={2}
        />
        <Check
          className="[grid-area:1/1] [transition:opacity_.24s_ease,transform_.32s_cubic-bezier(.16,1,.3,1)] data-[active=false]:opacity-0 data-[active=false]:[transform:scale(.5)] motion-reduce:transition-none"
          data-active={deleted}
          size={20}
          strokeWidth={2.4}
        />
      </span>
      <span className="grid">
        <span
          className="justify-self-start whitespace-nowrap [grid-area:1/1] [transition:opacity_.24s_ease,transform_.32s_cubic-bezier(.16,1,.3,1),filter_.24s_ease,visibility_.24s] data-[active=false]:invisible data-[active=false]:opacity-0 data-[active=false]:[transform:translateY(6px)] data-[active=false]:[filter:blur(2px)] motion-reduce:transition-none"
          data-active={!deleted}
        >
          Hold to delete
        </span>
        <span
          className="justify-self-start whitespace-nowrap [grid-area:1/1] [transition:opacity_.24s_ease,transform_.32s_cubic-bezier(.16,1,.3,1),filter_.24s_ease,visibility_.24s] data-[active=false]:invisible data-[active=false]:opacity-0 data-[active=false]:[transform:translateY(6px)] data-[active=false]:[filter:blur(2px)] motion-reduce:transition-none"
          data-active={deleted}
        >
          Deleted
        </span>
      </span>
    </span>
  );
}

export function HoldToDeleteButton() {
  const [state, setState] = useState<DeleteState>("idle");

  useEffect(() => {
    if (state === "idle") return;
    const timeout = window.setTimeout(
      () => setState(state === "holding" ? "deleted" : "idle"),
      state === "holding" ? HOLD_MS : RESET_MS,
    );
    return () => window.clearTimeout(timeout);
  }, [state]);

  const start = () => setState((current) => (current === "idle" ? "holding" : current));
  const cancel = () => setState((current) => (current === "holding" ? "idle" : current));

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.button === 0) start();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== " " && event.key !== "Enter") return;
    event.preventDefault();
    if (!event.repeat) start();
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === " " || event.key === "Enter") cancel();
  };

  return (
    <>
      <style>{pulseKeyframes}</style>
      <button
        type="button"
        className="group relative inline-flex h-[52px] cursor-pointer appearance-none items-center justify-center overflow-hidden rounded-full border-0 bg-[light-dark(#ffffff,#121418)] px-[24px] [font-family:inherit] text-[17px] font-medium leading-none tracking-[-.01em] text-[light-dark(#14181e,#f2f4f6)] [box-shadow:inset_0_0_0_1px_light-dark(#dfe3ea,#2b2f36),0_10px_24px_light-dark(rgba(246,247,249,.35),rgba(0,0,0,.35)),0_8px_28px_rgba(249,115,22,0)] data-[state=holding]:[box-shadow:inset_0_0_0_1px_light-dark(#dfe3ea,#2b2f36),0_10px_24px_light-dark(rgba(246,247,249,.35),rgba(0,0,0,.35)),0_8px_28px_rgba(249,115,22,.55)] data-[state=deleted]:[box-shadow:inset_0_0_0_1px_light-dark(#dfe3ea,#2b2f36),0_10px_24px_light-dark(rgba(246,247,249,.35),rgba(0,0,0,.35)),0_8px_28px_rgba(249,115,22,.55)] select-none [-webkit-touch-callout:none] touch-manipulation [transition:transform_.25s_cubic-bezier(.16,1,.3,1),background-color_.2s_ease,box-shadow_.5s_cubic-bezier(.16,1,.3,1)] data-[state=holding]:[transition:transform_.25s_cubic-bezier(.16,1,.3,1),background-color_.2s_ease,box-shadow_1.6s_linear] hover:data-[state=idle]:bg-[light-dark(#f0f2f5,#1b1e23)] motion-safe:data-[state=holding]:[transform:scale(.97)] data-[state=deleted]:cursor-default motion-safe:data-[state=deleted]:[animation:hold-delete-pulse_.8s_cubic-bezier(.16,1,.3,1)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f97316] motion-reduce:data-[state=idle]:[transition:none] motion-reduce:data-[state=deleted]:[transition:none] motion-reduce:data-[state=holding]:[transition:box-shadow_1.6s_linear]"
        data-state={state}
        onPointerDown={handlePointerDown}
        onPointerUp={cancel}
        onPointerLeave={cancel}
        onPointerCancel={cancel}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onBlur={cancel}
        onContextMenu={(event) => event.preventDefault()}
      >
        <ButtonContent deleted={state === "deleted"} />
        <span
          className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#f97316] text-white [clip-path:inset(0_100%_0_0)] [transition:clip-path_.5s_cubic-bezier(.16,1,.3,1)] group-data-[state=holding]:[clip-path:inset(0)] group-data-[state=holding]:[transition:clip-path_1.6s_linear] group-data-[state=deleted]:[clip-path:inset(0)] motion-reduce:group-data-[state=idle]:[transition:none] motion-reduce:group-data-[state=deleted]:[transition:none]"
          aria-hidden="true"
        >
          <ButtonContent deleted={state === "deleted"} />
        </span>
      </button>
    </>
  );
}`;
