import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Jasace ACE — Architecture, Construction & Engineering";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0F0E0D",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        {/* Grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(to right, transparent, #B8432F, transparent)",
          }}
        />

        {/* Corner brackets */}
        <div style={{ position: "absolute", top: 40, left: 40, width: 40, height: 40, borderLeft: "2px solid rgba(184,67,47,0.3)", borderTop: "2px solid rgba(184,67,47,0.3)" }} />
        <div style={{ position: "absolute", bottom: 40, right: 40, width: 40, height: 40, borderRight: "2px solid rgba(184,67,47,0.3)", borderBottom: "2px solid rgba(184,67,47,0.3)" }} />

        {/* Label */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <div style={{ width: 40, height: 1, background: "#B8432F" }} />
          <span style={{ fontSize: 14, letterSpacing: "0.2em", color: "#B8432F", textTransform: "uppercase", fontFamily: "sans-serif" }}>
            Architecture · Construction · Engineering
          </span>
        </div>

        {/* Logo */}
        <div style={{ display: "flex", fontSize: 72, fontWeight: 300, color: "white", lineHeight: 1 }}>
          <span style={{ color: "#B8432F", fontWeight: 600 }}>J</span>
          <span>asace</span>
        </div>

        {/* Tagline */}
        <div style={{ fontSize: 32, color: "rgba(255,255,255,0.4)", marginTop: 16, fontStyle: "italic" }}>
          Shaping the Built Environment
        </div>

        {/* Bottom info */}
        <div style={{ position: "absolute", bottom: 60, left: 80, display: "flex", gap: 24, alignItems: "center" }}>
          <span style={{ fontSize: 14, color: "rgba(255,255,255,0.3)", fontFamily: "sans-serif" }}>Las Vegas, NV</span>
          <div style={{ width: 1, height: 16, background: "rgba(255,255,255,0.15)" }} />
          <span style={{ fontSize: 14, color: "rgba(255,255,255,0.3)", fontFamily: "sans-serif" }}>jasace.com</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
