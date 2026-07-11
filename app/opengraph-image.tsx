import { ImageResponse } from "next/og";

export const alt = "LCDPlacas — Repuestos para TV LED probados y garantizados";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Default social card (home + any page without its own image).
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: "#ffffff",
          padding: 80,
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}>
          <div
            style={{
              display: "flex",
              width: 64,
              height: 64,
              borderRadius: 16,
              backgroundImage: "linear-gradient(135deg,#2563EB,#06B6D4)",
            }}
          />
          <div style={{ display: "flex", fontSize: 40, fontWeight: 700 }}>
            <span style={{ color: "#0f172a" }}>LCD</span>
            <span style={{ color: "#2563eb" }}>Placas</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 66,
            fontWeight: 800,
            color: "#0f172a",
            lineHeight: 1.1,
            marginBottom: 24,
            maxWidth: 1000,
          }}
        >
          Repuestos para TV LED, probados y garantizados
        </div>

        <div style={{ display: "flex", fontSize: 30, color: "#64748b", marginBottom: 36 }}>
          Placas main · Fuentes · T-Con · Tiras de LED · Componentes
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            alignSelf: "flex-start",
            background: "#eff6ff",
            border: "1px solid #dbeafe",
            color: "#1d4ed8",
            borderRadius: 999,
            padding: "10px 22px",
            fontSize: 26,
            fontWeight: 600,
          }}
        >
          Envíos a todo el país · Consultá por WhatsApp
        </div>
      </div>
    ),
    { ...size },
  );
}
