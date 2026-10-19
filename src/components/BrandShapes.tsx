import React from 'react';

// Concentric rings echoing the brand mark, purely decorative.
export function Rings({ className, count = 3, stroke = '#00fff2' }: { className: string; count?: number; stroke?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 720 720" className={`absolute pointer-events-none ${className}`}>
      {[340, 270, 200, 130].slice(4 - count).map((r) => (
        <circle key={r} cx="360" cy="360" r={r} fill="none" stroke={stroke} strokeWidth="2" />
      ))}
    </svg>
  );
}

// Hand-drawn smile, the signature underline of the section headings.
export function SmileCurve({ className, stroke = '#00fff2' }: { className: string; stroke?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 220 28" preserveAspectRatio="none" className={className}>
      <path d="M4 6 C 60 30, 160 30, 216 6" fill="none" stroke={stroke} strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}
