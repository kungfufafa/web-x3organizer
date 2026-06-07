import React from 'react';

type BadgeVariant = 'default' | 'accent' | 'dark' | 'outline';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-slate-50 border-slate-100 text-slate-600',
  accent: 'bg-amber-500/90 text-amber-950',
  dark: 'bg-slate-900/80 text-white',
  outline: 'bg-white/90 backdrop-blur-md text-slate-900 border-white/20',
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className = '',
}) => {
  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 text-[10px] font-bold px-3 py-1.5 rounded-lg tracking-wide border',
        variantClasses[variant],
        className,
      ].join(' ')}
    >
      {children}
    </span>
  );
};

export const Eyebrow: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <p className={`text-[10px] font-semibold uppercase tracking-widest text-amber-600 ${className}`}>
    {children}
  </p>
);
