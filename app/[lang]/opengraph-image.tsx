import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.brand} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  // Mismo arte para todos los idiomas: los titulares de marca están en inglés
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#050505", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, color: "#F5F5F5", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 80, height: 3, background: "#D10B19" }} />
          <div style={{ fontSize: 22, letterSpacing: 8, textTransform: "uppercase", opacity: 0.75 }}>{site.tagline}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 230, fontWeight: 900, lineHeight: 0.85, letterSpacing: -6 }}>FROZZ</div>
          <div style={{ fontSize: 96, fontWeight: 900, lineHeight: 1, color: "#D10B19", letterSpacing: 4 }}>BODYART</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, opacity: 0.7, letterSpacing: 4, textTransform: "uppercase" }}>
          <div>{site.artist}</div>
          <div>{site.base.label}</div>
        </div>
      </div>
    ),
    size,
  );
}
