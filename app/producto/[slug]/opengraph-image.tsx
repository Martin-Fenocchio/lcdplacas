import { ImageResponse } from "next/og";
import { ALL_PRODUCTS, getProductBySlug } from "@/lib/products";
import { formatARS } from "@/lib/format";

export const alt = "Repuesto para TV LED — LcdPlacas";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return ALL_PRODUCTS.map((p) => ({ slug: p.slug }));
}

// Rich per-product social card — shown when a product link is shared (WhatsApp, etc.).
export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  const rawTitle = product?.title ?? "Repuesto para TV LED";
  const title = rawTitle.split(/,?\s*c[oó]digo/i)[0].trim();
  const photo = product?.images?.[0];
  const brand = product?.brand;
  const code = product?.code;
  const price = product ? formatARS(product.price) : "";

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#ffffff", fontFamily: "sans-serif" }}>
        {/* Photo */}
        <div
          style={{
            display: "flex",
            width: 600,
            height: 630,
            alignItems: "center",
            justifyContent: "center",
            background: "#f8fafc",
            borderRight: "1px solid #e2e8f0",
          }}
        >
          {photo ? (
            <img src={photo} width={520} height={520} style={{ objectFit: "contain" }} alt="" />
          ) : null}
        </div>

        {/* Info */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: 56, justifyContent: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
            <div
              style={{
                display: "flex",
                width: 44,
                height: 44,
                borderRadius: 12,
                backgroundImage: "linear-gradient(135deg,#2563EB,#06B6D4)",
              }}
            />
            <div style={{ display: "flex", fontSize: 28, fontWeight: 700 }}>
              <span style={{ color: "#0f172a" }}>Lcd</span>
              <span style={{ color: "#2563eb" }}>Placas</span>
            </div>
          </div>

          {brand ? (
            <div style={{ display: "flex", fontSize: 22, color: "#64748b", letterSpacing: 2, marginBottom: 10 }}>
              {brand.toUpperCase()}
            </div>
          ) : null}

          <div style={{ display: "flex", fontSize: 40, fontWeight: 700, color: "#0f172a", lineHeight: 1.15, marginBottom: 16 }}>
            {title}
          </div>

          {code ? (
            <div style={{ display: "flex", fontSize: 22, color: "#64748b", marginBottom: 20 }}>Cód. {code}</div>
          ) : null}

          <div style={{ display: "flex", fontSize: 58, fontWeight: 800, color: "#0f172a", marginBottom: 24 }}>{price}</div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              alignSelf: "flex-start",
              background: "#ecfdf5",
              border: "1px solid #bbf7d0",
              color: "#16a34a",
              borderRadius: 999,
              padding: "8px 18px",
              fontSize: 22,
              fontWeight: 600,
            }}
          >
            Probado en 5 puntos · Garantía
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
