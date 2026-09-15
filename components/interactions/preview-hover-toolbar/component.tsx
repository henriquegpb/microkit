"use client";

import "./styles.css";

import { Expand, MoreHorizontal, Split } from "lucide-react";

const actions = [
  { id: "view", label: "View All", icon: Expand },
  { id: "branch", label: "Branch", icon: Split },
  { id: "more", label: "More", icon: MoreHorizontal },
];

export function PreviewHoverToolbar() {
  return (
    <div className="preview-toolbar">
      <div className="preview-toolbar__anchor">
        <div className="preview-toolbar__bar">
          <div className="preview-toolbar__row" role="toolbar" aria-label="Preview actions">
            {actions.map((action) => (
              <button
                key={action.id}
                type="button"
                className="preview-toolbar__action"
                aria-label={action.label}
              >
                <span className="preview-toolbar__tip" aria-hidden="true">
                  {action.label}
                </span>
                <action.icon size={15} strokeWidth={1.8} aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
