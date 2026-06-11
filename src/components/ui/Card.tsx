import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
  id?: string;
  animateIndex?: number;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
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
    'bg-white rounded-lg border border-slate-100 shadow-sm flex flex-col',
    hoverable ? 'hover:shadow-md hover:border-slate-200 transition-all duration-300' : '',
    onClick ? 'cursor-pointer' : '',
    className,
  ].filter(Boolean).join(' ');

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
