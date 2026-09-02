// neudental v1 - BrandLogo Component
// Single source of truth for the neudental visual identity.
// All headers, footers and share surfaces render the brand through this file so
// the logo, brand name and tagline can never drift apart again.

import React from 'react';

export const BRAND = {
  name: 'neudental',
  legalName: 'neudental dental clinic',
  tagline: 'Modern Dental Care for Confident Smiles',
  phone: '+91 93423 67446',
  phoneHref: 'tel:+919342367446',
  colors: {
    cyan: '#3AC3E6',
    navy: '#0B1341',
    ink: '#0B3B60',
  },
  assets: {
    mark: '/brand/neudental-mark.png',
    markLight: '/brand/neudental-mark-light.png',
    wordmark: '/brand/neudental-wordmark.png',
    wordmarkLight: '/brand/neudental-wordmark-light.png',
    lockup: '/brand/neudental-logo.png',
  },
} as const;

interface BrandLogoProps {
  /** 'light' renders the tint-lifted artwork for dark backgrounds. */
  variant?: 'dark' | 'light';
  /** Tailwind classes controlling the tooth mark size. */
  markClassName?: string;
  /** Tailwind classes controlling the wordmark size. */
  wordmarkClassName?: string;
  /** Tailwind classes for the tagline line. */
  taglineClassName?: string;
  showTagline?: boolean;
  className?: string;
}

export default function BrandLogo({
  variant = 'dark',
  markClassName = 'h-11 w-auto md:h-12',
  wordmarkClassName = 'h-[22px] w-auto md:h-[26px]',
  taglineClassName = 'text-[10px] text-cool-gray tracking-wide font-sans mt-1',
  showTagline = true,
  className = '',
}: BrandLogoProps) {
  const light = variant === 'light';

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img
        src={light ? BRAND.assets.markLight : BRAND.assets.mark}
        alt=""
        aria-hidden="true"
        width={256}
        height={221}
        draggable={false}
        className={`${markClassName} shrink-0 select-none object-contain`}
      />
      <span className="flex flex-col justify-center">
        <img
          src={light ? BRAND.assets.wordmarkLight : BRAND.assets.wordmark}
          alt={BRAND.name}
          width={720}
          height={124}
          draggable={false}
          className={`${wordmarkClassName} select-none object-contain object-left`}
        />
        {showTagline && <span className={taglineClassName}>{BRAND.tagline}</span>}
      </span>
    </span>
  );
}
