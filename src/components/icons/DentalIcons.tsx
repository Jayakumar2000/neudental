import React from 'react';

export interface DentalIconProps {
  className?: string;
}

// Bold, low-detail line style tuned for the site's actual render size
// (20px inside a 48px badge) -- thin dashes, dots and multi-line detail
// collapse into mush at that size, so every icon here uses few strokes
// at a heavier weight instead.
const baseProps = {
  viewBox: '0 0 48 48',
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 3,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

// ---------------------------------------------------------------------------
// 1. Root Canal Treatment: tooth silhouette with a single bold canal line.
// ---------------------------------------------------------------------------
export function IconRootCanal({ className }: DentalIconProps) {
  return (
    <svg {...baseProps} className={className}>
      <path d="M24 8c-4.5 0-6 2.4-9 2.4-3.8 0-6 3-6 8 0 5.6 2 10 3.4 16.6.6 2.8 1.4 5 3 5 2 0 2.2-6 4.4-6s2.6 6 4.2 6c1.6 0 2.4-2.2 3-5C28.6 29 30.6 24.6 30.6 19c0-5-2.2-8-6-8-3 0-4.5-2.4-.6-2.4z" />
      <path d="M24 15v20" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// 2. Dental Implants: crown cap on a threaded post.
// ---------------------------------------------------------------------------
export function IconDentalImplant({ className }: DentalIconProps) {
  return (
    <svg {...baseProps} className={className}>
      <path d="M16 11c0-2.5 3.5-4 8-4s8 1.5 8 4-3.5 4-8 4-8-1.5-8-4z" fill="currentColor" stroke="none" opacity={0.35} />
      <path d="M16 11c0-2.5 3.5-4 8-4s8 1.5 8 4-3.5 4-8 4-8-1.5-8-4z" />
      <path d="M19 15v20M29 15v20" />
      <path d="M19 21h10M19 27h10" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// 3. Orthodontic Treatment: smiling teeth row with brackets and an archwire.
// ---------------------------------------------------------------------------
export function IconBraces({ className }: DentalIconProps) {
  return (
    <svg {...baseProps} className={className}>
      <path d="M9 15c5-4 25-4 30 0" />
      <path d="M9 15c-1.5 9 4 18 15 18s16.5-9 15-18" />
      <circle cx="16" cy="20" r="2.6" fill="currentColor" stroke="none" />
      <circle cx="32" cy="20" r="2.6" fill="currentColor" stroke="none" />
      <path d="M16 20.5h16" />
    </svg>
  );
}
