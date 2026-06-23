import React from 'react';
import { Eyebrow } from './Badge';

type SectionHeaderAlign = 'left' | 'center';
type SectionHeaderWidth = 'narrow' | 'default' | 'wide';

interface SectionHeaderProps {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  align?: SectionHeaderAlign;
  width?: SectionHeaderWidth;
  inverted?: boolean;
  className?: string;
  titleClassName?: string;
  /** When true, adds standard gap before section content below */
  contentGap?: boolean;
}

const widthClasses: Record<SectionHeaderWidth, string> = {
  narrow: 'measure-section-title max-w-2xl',
  default: 'measure-section-title max-w-3xl',
  wide: 'max-w-4xl',
};

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  description,
  actions,
  align = 'left',
  width = 'default',
  inverted = false,
  className = '',
  titleClassName = '',
  contentGap = false,
}) => (
  <div
    className={[
      widthClasses[width],
      align === 'center' ? 'mx-auto text-center' : '',
      contentGap ? 'section-header-gap' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
  >
    {eyebrow && <Eyebrow className={inverted ? 'text-amber-400' : ''}>{eyebrow}</Eyebrow>}
    <h2
      className={[
        'mt-4 font-display text-display-section font-bold leading-tight',
        inverted ? 'text-white' : 'text-slate-900',
        align === 'center' ? 'measure-section-title mx-auto' : 'measure-section-title',
        titleClassName,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {title}
    </h2>
    {description && (
      <p
        className={[
          'measure-lead mt-6 text-base leading-relaxed md:text-lg',
          inverted ? 'text-slate-300' : 'text-slate-600',
          align === 'center' ? 'mx-auto' : '',
        ].join(' ')}
      >
        {description}
      </p>
    )}
    {actions && (
      <div className={['mt-8 flex flex-wrap gap-3 sm:gap-4', align === 'center' ? 'justify-center' : ''].join(' ')}>
        {actions}
      </div>
    )}
  </div>
);
