import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Container } from './Container';

type PageHeroDensity = 'compact' | 'default' | 'hero';
type PageHeroRatio = '5-7' | '6-6';
type PageHeroAlign = 'start' | 'center';

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  innerClassName?: string;
  actions?: React.ReactNode;
  media?: React.ReactNode;
  density?: PageHeroDensity;
  ratio?: PageHeroRatio;
  align?: PageHeroAlign;
  /** Use display-hero scale for home page only */
  titleScale?: 'hero' | 'section';
  children?: React.ReactNode;
}

const ratioSpans: Record<PageHeroRatio, [string, string]> = {
  '5-7': ['lg:col-span-5', 'lg:col-span-7'],
  '6-6': ['lg:col-span-6', 'lg:col-span-6'],
};

export const PageHero: React.FC<PageHeroProps> = ({
  eyebrow,
  title,
  subtitle,
  centered = true,
  className = '',
  innerClassName = '',
  actions,
  media,
  density = 'default',
  ratio = '5-7',
  align = 'start',
  titleScale = 'section',
  children,
}) => {
  const prefersReducedMotion = useReducedMotion();

  const motionProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4, ease: 'easeOut' as const },
      };

  const densityClass =
    density === 'compact' ? 'section-compact' : density === 'hero' ? 'section-hero' : 'section-default';
  const hasSplit = Boolean(media);
  const isCentered = centered && !hasSplit;
  const [copySpan, mediaSpan] = ratioSpans[ratio];
  const titleClass = titleScale === 'hero' ? 'text-display-hero' : 'text-display-section';

  return (
    <section
      className={`relative overflow-hidden border-b border-slate-900 bg-slate-950 text-white ${densityClass} ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/95 to-slate-950/80" />
      <motion.div {...motionProps} className={['relative z-10', innerClassName].filter(Boolean).join(' ')}>
        <Container
          variant="site"
          className={[
            hasSplit
              ? `grid gap-10 md:gap-14 lg:grid-cols-12 lg:gap-20 ${align === 'center' ? 'items-center' : 'items-start'}`
              : isCentered
                ? 'text-center'
                : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <div className={hasSplit ? copySpan : isCentered ? 'mx-auto max-w-3xl' : ''}>
            {eyebrow && (
              <p className="text-xs font-bold uppercase tracking-widest text-amber-500">{eyebrow}</p>
            )}
            <h1
              className={[
                'mt-4 font-display font-bold leading-tight text-white',
                titleClass,
                hasSplit || !isCentered ? 'measure-hero-title' : 'measure-section-title mx-auto',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {title}
            </h1>
            {subtitle && (
              <p
                className={[
                  'measure-lead mt-6 text-base leading-relaxed text-slate-200 md:text-lg',
                  isCentered ? 'mx-auto' : '',
                ].join(' ')}
              >
                {subtitle}
              </p>
            )}
            {actions && (
              <div
                className={[
                  'mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4',
                  isCentered ? 'justify-center' : '',
                ].join(' ')}
              >
                {actions}
              </div>
            )}
            {children && <div className="mt-8">{children}</div>}
          </div>
          {hasSplit && <div className={mediaSpan}>{media}</div>}
        </Container>
      </motion.div>
    </section>
  );
};
