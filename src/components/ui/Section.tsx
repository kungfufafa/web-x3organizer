import React from 'react';

type SectionBg = 'white' | 'muted' | 'dark' | 'transparent';

interface SectionProps {
  children: React.ReactNode;
  bg?: SectionBg;
  className?: string;
  bordered?: boolean;
  id?: string;
}

const bgClasses: Record<SectionBg, string> = {
  white: 'bg-white',
  muted: 'bg-surface-page',
  dark: 'bg-slate-950 text-white',
  transparent: '',
};

export const Section: React.FC<SectionProps> = ({
  children,
  bg = 'white',
  className = '',
  bordered = false,
  id,
}) => {
  return (
    <section
      id={id}
      className={[
        'w-full py-20 lg:py-28',
        bgClasses[bg],
        bordered ? 'border-t border-slate-100' : '',
        className,
      ].filter(Boolean).join(' ')}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full h-full">
        {children}
      </div>
    </section>
  );
};
