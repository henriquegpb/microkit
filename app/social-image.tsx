import { ImageResponse } from "next/og";
import { SITE_NAME, SOCIAL_DESCRIPTION } from "./site-metadata";

export const socialImageSize = {
  width: 1200,
  height: 630,
};

const tunnelInsets = [0, 34, 68, 102, 136];
const tunnelColors = ["#f97316", "#b94d12", "#71300f", "#3c1c0d", "#20120c"];

/**
 * One image, two registers.
 *
 * With no argument it is the site card: the tagline and the description that
 * `SOCIAL_TITLE`/`SOCIAL_DESCRIPTION` already carry. Given a component it
 * becomes that component's card — its name in place of the tagline, its own
 * description under it, and the category and framework as an eyebrow.
 *
 * Sharing forty-two different pages under one identical picture wastes the only
 * part of a link somebody actually looks at before clicking. The layout is
 * unchanged so the two still read as the same site.
 */
type SocialImageSubject = {
  eyebrow: string;
  lines: string[];
  description: string;
};

export function createSocialImage(subject?: SocialImageSubject) {
  const eyebrow = subject?.eyebrow;
  const lines = subject?.lines ?? ["Microinteractions", "worth copying."];
  const description = subject?.description ?? SOCIAL_DESCRIPTION;
  // A component name takes two lines at 76px only if it is short; the site
  // tagline is authored to fit. Anything longer steps down a size rather than
  // overflowing the 760px column.
  const titleSize = lines.join(" ").length > 26 ? 58 : 76;

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
            {eyebrow ? (
              <div
                style={{
                  display: "flex",
                  marginBottom: 22,
                  color: "#f97316",
                  fontFamily: "monospace",
                  fontSize: 22,
                  letterSpacing: "1px",
                }}
              >
                {eyebrow}
              </div>
            ) : null}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: titleSize,
                fontWeight: 500,
                lineHeight: 0.98,
                letterSpacing: "-4px",
              }}
            >
              {lines.map((line) => (
                <div key={line} style={{ display: "flex" }}>
                  {line}
                </div>
              ))}
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
              {description}
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
