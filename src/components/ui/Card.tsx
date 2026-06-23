import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  /** When provided, the card renders as an `<a>` (navigation) instead of a `<div>`. */
  href?: string;
  hoverable?: boolean;
  id?: string;
  animateIndex?: number;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  href,
  hoverable = true,
  id,
  animateIndex,
}) => {
  const prefersReducedMotion = useReducedMotion();

  const motionProps =
    animateIndex !== undefined && !prefersReducedMotion
      ? {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.35, delay: animateIndex * 0.05, ease: 'easeOut' as const },
        }
      : {};

  const baseClasses = [
    'bg-white rounded-2xl border border-slate-100 shadow-card flex flex-col h-full',
    hoverable ? 'hover:shadow-card-hover hover:border-slate-200 transition-all duration-300' : '',
    onClick ? 'cursor-pointer' : '',
    className,
  ].filter(Boolean).join(' ');

  // Preserve SPA routing while keeping native anchor semantics (open-in-new-tab, copy link).
  const handleClick = (e: React.MouseEvent) => {
    if (!onClick) return;
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (href) e.preventDefault();
    onClick();
  };

  if (href) {
    if (animateIndex !== undefined) {
      return (
        <motion.a id={id} href={href} onClick={handleClick} className={baseClasses} {...motionProps}>
          {children}
        </motion.a>
      );
    }
    return (
      <a id={id} href={href} onClick={handleClick} className={baseClasses}>
        {children}
      </a>
    );
  }

  if (animateIndex !== undefined) {
    return (
      <motion.div id={id} onClick={onClick} className={baseClasses} {...motionProps}>
        {children}
      </motion.div>
    );
  }

  return (
    <div id={id} onClick={onClick} className={baseClasses}>
      {children}
    </div>
  );
};