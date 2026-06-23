import React from 'react';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate: (href: string) => void;
  inverted?: boolean;
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  onNavigate,
  inverted = false,
  className = '',
}) => (
  <nav aria-label="Breadcrumb" className={className}>
    <ol className="flex flex-wrap items-center gap-2 text-sm font-semibold">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {item.href && !isLast ? (
              <a
                href={item.href}
                onClick={(e) => {
                  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                  e.preventDefault();
                  onNavigate(item.href!);
                }}
                className={inverted ? 'text-slate-300 hover:text-white' : 'text-slate-500 hover:text-slate-900'}
              >
                {item.label}
              </a>
            ) : (
              <span className={inverted ? 'text-white' : 'text-slate-900'} aria-current={isLast ? 'page' : undefined}>
                {item.label}
              </span>
            )}
            {!isLast && <ChevronRight className={inverted ? 'h-4 w-4 text-white/35' : 'h-4 w-4 text-slate-300'} aria-hidden="true" />}
          </li>
        );
      })}
    </ol>
  </nav>
);
