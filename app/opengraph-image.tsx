export const dynamic = "force-static";
import { ImageResponse } from "next/og";
export const runtime = "nodejs";
export const alt = "EV Green Bus — Smarter, greener journeys";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        background: "linear-gradient(120deg,#0b3022,#176c4b)",
        color: "white",
        padding: "70px",
        fontFamily: "sans-serif",
        position: "relative",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 24, letterSpacing: 5, color: "#c7f45a" }}>
          EV · GREEN BUS
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 77,
            fontWeight: 700,
            marginTop: 55,
            lineHeight: 1.05,
          }}
        >
          Smarter, greener
          <br />
          journeys for everyone.
        </div>
        <div style={{ fontSize: 28, marginTop: 35, color: "#d2e4d8" }}>
          Electric public transit · Routes · Live service
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          right: 90,
          bottom: 65,
          width: 350,
          height: 130,
          borderRadius: 35,
          background: "#c7f45a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#123427",
          fontSize: 46,
          fontWeight: 700,
        }}
      >
        EV BUS
      </div>
    </div>,
    size,
  );
}
