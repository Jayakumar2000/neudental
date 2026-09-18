// neudental v1 - 404 Not Found view
// Rendered by App-v1.tsx for any client-side route it doesn't recognize.
import React from 'react';
import { Home, SearchX } from 'lucide-react';

interface NotFoundProps {
  onGoHome: () => void;
}

export default function NotFound({ onGoHome }: NotFoundProps) {
  return (
    <div className="min-h-[65vh] flex items-center justify-center bg-white px-6 py-20">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary/10 text-secondary mb-6">
          <SearchX className="w-8 h-8" />
        </div>
        <p className="font-serif text-6xl font-bold text-primary leading-none">404</p>
        <h1 className="font-serif text-2xl text-primary font-bold mt-4">This link looks broken</h1>
        <p className="font-sans text-sm text-on-surface-variant mt-3 leading-relaxed">
          The page you were looking for doesn't exist or may have moved. Let's get you back to the neudental homepage.
        </p>
        <button
          type="button"
          onClick={onGoHome}
          className="mt-8 inline-flex items-center gap-2 bg-primary text-white hover:bg-secondary cursor-pointer shadow-xl shadow-primary/10 hover:shadow-secondary/20 hover:-translate-y-0.5 active:translate-y-0 px-8 py-4 rounded-xl font-sans text-sm tracking-wider uppercase font-bold transition-all duration-200"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </button>
      </div>
    </div>
  );
}
