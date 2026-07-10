/**
 * Icon set — the exact SVGs used in the design, as small local components.
 * Stroke icons inherit color via `currentColor`; size with `w-*`/`h-*` classes.
 */
import type { SVGProps } from "react";
import type { CategoryIcon } from "@/lib/site";

type IconProps = SVGProps<SVGSVGElement> & { strokeWidth?: number };

function Stroke({ strokeWidth = 1.8, children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const TvLogo = (p: IconProps) => (
  <Stroke {...p}>
    <rect x="2" y="4" width="20" height="14" rx="2" />
    <path d="M7 8h4M7 12h2" />
    <circle cx="16" cy="9" r="1" />
    <circle cx="16" cy="13" r="1" />
    <path d="M8 22h8" />
  </Stroke>
);

export const Search = (p: IconProps) => (
  <Stroke strokeWidth={2} {...p}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </Stroke>
);

export const Home = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
  </Stroke>
);

export const Grid = (p: IconProps) => (
  <Stroke {...p}>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </Stroke>
);

export const ChevronDown = (p: IconProps) => (
  <Stroke strokeWidth={2} {...p}>
    <path d="m6 9 6 6 6-6" />
  </Stroke>
);

export const ChevronLeft = (p: IconProps) => (
  <Stroke strokeWidth={2} {...p}>
    <path d="m15 18-6-6 6-6" />
  </Stroke>
);

export const ChevronRight = (p: IconProps) => (
  <Stroke strokeWidth={2} {...p}>
    <path d="m9 18 6-6-6-6" />
  </Stroke>
);

export const Cart = (p: IconProps) => (
  <Stroke {...p}>
    <circle cx="8" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
  </Stroke>
);

export const Check = (p: IconProps) => (
  <Stroke strokeWidth={2.2} {...p}>
    <path d="M20 6 9 17l-5-5" />
  </Stroke>
);

export const CheckThick = (p: IconProps) => (
  <Stroke strokeWidth={3} {...p}>
    <path d="M20 6 9 17l-5-5" />
  </Stroke>
);

export const ShieldCheck = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" />
  </Stroke>
);

export const Truck = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
    <path d="M15 18H9M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
    <circle cx="17" cy="18" r="2" />
    <circle cx="7" cy="18" r="2" />
  </Stroke>
);

export const MapPin = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </Stroke>
);

export const Phone = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </Stroke>
);

export const Mail = (p: IconProps) => (
  <Stroke {...p}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </Stroke>
);

export const ArrowRight = (p: IconProps) => (
  <Stroke strokeWidth={2} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Stroke>
);

export const TrendingUp = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M16 7h6v6" />
    <path d="m22 7-8.5 8.5-5-5L2 17" />
    <path d="M11.5 3h-8a1 1 0 0 0-1 1v16" />
  </Stroke>
);

export const Sliders = (p: IconProps) => (
  <Stroke strokeWidth={2} {...p}>
    <path d="M3 6h18M7 12h10M11 18h2" />
  </Stroke>
);

export const X = (p: IconProps) => (
  <Stroke strokeWidth={2.4} {...p}>
    <path d="M18 6 6 18M6 6l12 12" />
  </Stroke>
);

export const ZoomIn = (p: IconProps) => (
  <Stroke strokeWidth={2} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.35-4.35M11 8v6M8 11h6" />
  </Stroke>
);

/** Official WhatsApp brand glyph (phone as negative space). */
export function Whatsapp(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.36.101 11.945c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652a11.96 11.96 0 005.71 1.454h.006c6.585 0 11.946-5.36 11.949-11.945a11.9 11.9 0 00-3.495-8.436z" />
    </svg>
  );
}

/** Category glyph, selected by the category's icon key. */
export function CategoryGlyph({ icon, ...props }: IconProps & { icon: CategoryIcon }) {
  switch (icon) {
    case "placas":
      return (
        <Stroke strokeWidth={1.7} {...props}>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <rect x="9" y="9" width="6" height="6" />
          <path d="M15 2v2M9 2v2M15 20v2M9 20v2M2 15h2M2 9h2M20 15h2M20 9h2" />
        </Stroke>
      );
    case "fuentes":
      return (
        <Stroke strokeWidth={1.7} {...props}>
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </Stroke>
      );
    case "tcon":
      return (
        <Stroke strokeWidth={1.7} {...props}>
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8M12 17v4" />
        </Stroke>
      );
    case "tiras":
      return (
        <Stroke strokeWidth={1.7} {...props}>
          <path d="M15 14c.2-1 .7-1.7 1.5-2.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.8.8 1.3 1.5 1.5 2.5" />
          <path d="M9 18h6M10 22h4" />
        </Stroke>
      );
    case "componentes":
      return (
        <Stroke strokeWidth={1.7} {...props}>
          <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
          <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65M22 12.65l-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
        </Stroke>
      );
  }
}
