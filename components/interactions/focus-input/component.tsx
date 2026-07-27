"use client";

import "./styles.css";

export function FocusField() {
  return (
    <label className="demo-input">
      <span>Project name</span>
      <input placeholder="e.g. microkit-web" />
    </label>
  );
}
