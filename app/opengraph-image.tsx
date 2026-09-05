import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Single dark card — reads well on every platform, light or dark.
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "96px",
        backgroundColor: "#111111",
        color: "#ffffff",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
        <div
          style={{ display: "flex", fontSize: 40, fontWeight: 700, letterSpacing: "-1px" }}
        >
          improve<span style={{ color: "#34d399" }}>.</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 800,
            marginTop: 16,
            lineHeight: 1.1,
          }}
        >
          All your notes, in one space.
        </div>
        <div
          style={{ display: "flex", fontSize: 28, marginTop: 20, color: "#a3a3a3" }}
        >
          Kerala Plus One improvement exams — videos, notes, previous questions.
        </div>
    </div>,
    { ...size },
  );
}
