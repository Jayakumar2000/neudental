// neudental v1 - "Home › Treatments › Braces" trail at the top of subpages.
// Matches the BreadcrumbList structured data each page carries.
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from '../lib/navigation';

export default function Breadcrumbs({ items, className = '' }: { items: [label: string, path: string][]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 font-sans text-xs text-cool-gray">
        {items.map(([label, path], i) => {
          const last = i === items.length - 1;
          return (
            <li key={path} className="flex items-center gap-1.5 min-w-0">
              {last
                ? <span aria-current="page" className="text-on-surface-variant font-medium truncate max-w-[16rem] sm:max-w-md">{label}</span>
                : <Link to={path} className="hover:text-secondary transition-colors">{label}</Link>}
              {!last && <ChevronRight className="w-3 h-3 shrink-0" aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
