import type { SVGProps } from "react";

/**
 * Lucide has no basketball glyph, so this is a hand-drawn stand-in that
 * matches the lucide stroke style (round caps/joins, 2px default stroke)
 * so it drops in cleanly next to any lucide-react icon.
 */
export function BasketballIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2c2.5 2.7 3.9 6.2 3.9 10s-1.4 7.3-3.9 10" />
      <path d="M12 2c-2.5 2.7-3.9 6.2-3.9 10s1.4 7.3 3.9 10" />
      <path d="M2 12h20" />
      <path d="M3.5 6.5c2.6 1.8 5.4 2.8 8.5 2.8s5.9-1 8.5-2.8" />
      <path d="M3.5 17.5c2.6-1.8 5.4-2.8 8.5-2.8s5.9 1 8.5 2.8" />
    </svg>
  );
}

export default BasketballIcon;
