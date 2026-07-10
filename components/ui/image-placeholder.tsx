import { cn } from "@/lib/cn";

type Stripe = "card" | "panel" | "gallery";
type Glyph = "board" | "tv" | "image";

const STRIPES: Record<Stripe, string> = {
  card: "repeating-linear-gradient(135deg,#F1F5F9 0 12px,#E9EEF5 12px 24px)",
  panel: "repeating-linear-gradient(135deg,#F1F5F9 0 14px,#E9EEF5 14px 28px)",
  gallery: "repeating-linear-gradient(135deg,#F5F8FC 0 16px,#EDF2F8 16px 32px)",
};

function GlyphIcon({ kind, className }: { kind: Glyph; className?: string }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true,
  };
  if (kind === "tv") {
    return (
      <svg {...common}>
        <rect x="2" y="4" width="20" height="14" rx="2" />
        <path d="M8 22h8M12 18v4M6 8h4M6 12h2" />
        <circle cx="16" cy="9" r="1" />
        <circle cx="16" cy="13" r="1" />
      </svg>
    );
  }
  if (kind === "image") {
    return (
      <svg {...common}>
        <path d="M15 8h.01" />
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="m3 16 5-5c.9-.9 2.1-.9 3 0l5 5" />
        <path d="m14 14 1-1c.9-.9 2.1-.9 3 0l3 3" />
      </svg>
    );
  }
  return (
    <svg {...common} strokeWidth={1.3}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <rect x="8" y="9" width="8" height="6" />
    </svg>
  );
}

interface ImagePlaceholderProps {
  stripe?: Stripe;
  glyph?: Glyph;
  label?: string;
  className?: string;
  glyphClassName?: string;
  labelClassName?: string;
}

/**
 * Striped placeholder standing in for real product photography.
 * Matches the design's diagonal-hatch look; swap for `next/image` later.
 */
export function ImagePlaceholder({
  stripe = "card",
  glyph = "board",
  label,
  className,
  glyphClassName = "w-9 h-9",
  labelClassName = "text-xs",
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn("flex flex-col items-center justify-center gap-2.5", className)}
      style={{ background: STRIPES[stripe] }}
    >
      <GlyphIcon kind={glyph} className={cn("text-faint", glyphClassName)} />
      {label && <span className={cn("font-mono text-faint tracking-wide", labelClassName)}>{label}</span>}
    </div>
  );
}
