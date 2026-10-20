"use client";

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
