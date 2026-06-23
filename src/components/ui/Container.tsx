import React from 'react';

type ContainerVariant = 'wide' | 'site' | 'content' | 'prose';

/**
 * Horizontal layout containers aligned to the site rail system.
 * - `site` (1280px): primary content anchor for header, grids, CTA copy, footer
 * - `wide` (1440px): full-bleed media breakout shells only
 * - `content` (1024px): FAQ, testimonials, narrow sections
 * - `prose` (768px): long-form reading measure
 */
interface ContainerProps {
  children: React.ReactNode;
  variant?: ContainerVariant;
  className?: string;
}

const variantClasses: Record<ContainerVariant, string> = {
  wide: 'container-wide',
  site: 'container-site',
  content: 'container-content',
  prose: 'container-prose',
};

export const Container: React.FC<ContainerProps> = ({
  children,
  variant = 'site',
  className = '',
}) => (
  <div className={[variantClasses[variant], className].filter(Boolean).join(' ')}>
    {children}
  </div>
);
