import { ImageResponse } from "next/og";
import { SITE_DESCRIPTION, SITE_NAME } from "./site-metadata";

export const socialImageSize = {
  width: 1200,
  height: 630,
};

const tunnelInsets = [0, 34, 68, 102, 136];
const tunnelColors = ["#f97316", "#b94d12", "#71300f", "#3c1c0d", "#20120c"];

export function createSocialImage() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          background: "#08090b",
          color: "#f5f5f4",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            opacity: 0.28,
            backgroundImage:
              "linear-gradient(#f9731628 1px, transparent 1px), linear-gradient(90deg, #f9731628 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "radial-gradient(circle at 86% 86%, #f9731645 0%, #5421082c 28%, transparent 58%)",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: "66px 72px 56px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                display: "flex",
                width: 30,
                height: 30,
                borderRadius: 8,
                background: "#f97316",
              }}
            />
            <div
              style={{
                display: "flex",
                fontSize: 30,
                fontWeight: 700,
                letterSpacing: "-0.8px",
              }}
            >
              {SITE_NAME}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", width: 760 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 76,
                fontWeight: 500,
                lineHeight: 0.98,
                letterSpacing: "-4px",
              }}
            >
              <div style={{ display: "flex" }}>Microinteractions</div>
              <div style={{ display: "flex" }}>worth copying.</div>
            </div>
            <div
              style={{
                display: "flex",
                width: 670,
                marginTop: 30,
                color: "#a7abb2",
                fontSize: 27,
                lineHeight: 1.35,
              }}
            >
              {SITE_DESCRIPTION}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              color: "#f97316",
              fontFamily: "monospace",
              fontSize: 20,
              letterSpacing: "1px",
            }}
          >
            microkit.co
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            top: 120,
            right: -72,
            display: "flex",
            width: 410,
            height: 410,
          }}
        >
          {tunnelInsets.map((inset, index) => (
            <div
              key={inset}
              style={{
                position: "absolute",
                top: inset,
                left: inset,
                display: "flex",
                width: 410 - inset * 2,
                height: 410 - inset * 2,
                border: `${index === tunnelInsets.length - 1 ? 5 : 4}px solid ${tunnelColors[index]}`,
                borderRadius: 74 - index * 8,
                background: "#050607",
                boxShadow: index === 0 ? "0 28px 90px #000000aa" : "none",
              }}
            />
          ))}
        </div>
      </div>
    ),
    socialImageSize,
  );
}
