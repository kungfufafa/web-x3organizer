import React, { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface AccordionItem {
  id?: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  className = '',
}) => {
  const baseId = useId();
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) next.clear();
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item, index) => {
        const itemId = item.id ?? `${baseId}-${index}`;
        const isOpen = openIds.has(itemId);
        const panelId = `${itemId}-panel`;
        const triggerId = `${itemId}-trigger`;

        return (
          <div
            key={itemId}
            className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden"
          >
            <h3 className="m-0">
              <button
                id={triggerId}
                type="button"
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-display font-semibold text-slate-900 hover:bg-slate-50 transition-colors touch-target"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(itemId)}
              >
                <span className="text-base leading-snug">{item.question}</span>
                <ChevronDown
                  className={`w-5 h-5 shrink-0 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              hidden={!isOpen}
              className="px-5 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100"
            >
              {isOpen && <p className="pt-4">{item.answer}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
};
