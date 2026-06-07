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
  muted: 'bg-slate-50',
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
        'max-w-7xl mx-auto px-4 md:px-8 py-24 lg:py-32',
        bgClasses[bg],
        bordered ? 'border-t border-slate-200' : '',
        className,
      ].filter(Boolean).join(' ')}
    >
      {children}
    </section>
  );
};
