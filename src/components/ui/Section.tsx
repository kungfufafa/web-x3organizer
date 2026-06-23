import React from 'react';

type SectionBg = 'white' | 'muted' | 'dark' | 'transparent';
type SectionDensity = 'compact' | 'default' | 'spacious' | 'hero' | 'cta' | 'none';
type SectionSurface = 'page' | 'card' | 'subtle' | 'dark' | 'transparent';
type SectionContainer = 'wide' | 'site' | 'content' | 'prose' | 'none';

interface SectionProps {
  children: React.ReactNode;
  bg?: SectionBg;
  surface?: SectionSurface;
  density?: SectionDensity;
  container?: SectionContainer;
  className?: string;
  innerClassName?: string;
  bordered?: boolean;
  id?: string;
  overflow?: 'visible' | 'hidden';
}

const legacyBgClasses: Record<SectionBg, string> = {
  white: 'bg-white',
  muted: 'bg-surface-page',
  dark: 'bg-slate-950 text-white',
  transparent: '',
};

const surfaceClasses: Record<SectionSurface, string> = {
  page: 'bg-surface-page',
  card: 'bg-white',
  subtle: 'bg-surface-subtle',
  dark: 'bg-slate-950 text-white',
  transparent: '',
};

const densityClasses: Record<SectionDensity, string> = {
  compact: 'section-compact',
  default: 'section-default',
  spacious: 'section-spacious',
  hero: 'section-hero',
  cta: 'section-cta',
  none: '',
};

const containerClasses: Record<SectionContainer, string> = {
  wide: 'container-wide',
  site: 'container-site',
  content: 'container-content',
  prose: 'container-prose',
  none: '',
};

export const Section: React.FC<SectionProps> = ({
  children,
  bg,
  surface,
  density = 'default',
  container = 'site',
  className = '',
  innerClassName = '',
  bordered = false,
  id,
  overflow = 'visible',
}) => {
  const resolvedSurface = surface ? surfaceClasses[surface] : bg ? legacyBgClasses[bg] : surfaceClasses.card;
  const content = container === 'none' ? children : (
    <div className={[containerClasses[container], 'w-full h-full', innerClassName].filter(Boolean).join(' ')}>
      {children}
    </div>
  );

  return (
    <section
      id={id}
      className={[
        'w-full',
        densityClasses[density],
        resolvedSurface,
        bordered ? 'border-t border-slate-100' : '',
        overflow === 'hidden' ? 'overflow-hidden' : '',
        className,
      ].filter(Boolean).join(' ')}
    >
      {content}
    </section>
  );
};
