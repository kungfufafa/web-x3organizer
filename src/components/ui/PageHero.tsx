import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const PageHero: React.FC<PageHeroProps> = ({
  eyebrow,
  title,
  subtitle,
  centered = true,
  className = '',
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

  return (
    <section
      className={`bg-slate-950 text-white py-20 lg:py-28 px-4 md:px-8 relative border-b border-slate-900 overflow-hidden bgn-pattern-white bgn-pattern-right-bottom ${className}`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,30,73,1),rgba(7,30,73,0.94))] pointer-events-none" />
      <motion.div
        {...motionProps}
        className={`max-w-3xl ${centered ? 'mx-auto text-center' : ''} space-y-6 relative z-10`}
      >
        {eyebrow && (
          <p className="text-[10px] font-bold uppercase tracking-widest text-amber-500">
            {eyebrow}
          </p>
        )}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight font-display leading-[1.05]">
          {title}
        </h1>
        {subtitle && (
          <p className="text-slate-200 text-sm max-w-xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
        {children}
      </motion.div>
    </section>
  );
};
