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

/** Filled brand glyph for WhatsApp. */
export function Whatsapp(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35zM12 2a10 10 0 0 0-8.6 15.06L2 22l5.05-1.32A10 10 0 1 0 12 2z" />
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
