"use client";

import "./styles.css";

export function LayeredGradientButton() {
  return <button type="button" className="layered-gradient-button"><span>View all projects</span><span className="layered-gradient-button-surface" aria-hidden="true" /><span className="layered-gradient-button-haze" aria-hidden="true" /></button>;
}
