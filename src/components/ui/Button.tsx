import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'whatsapp';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary-blue hover:bg-primary-blue-dark text-white shadow-sm',
  secondary: 'bg-slate-900 hover:bg-slate-800 text-white shadow-sm',
  accent: 'bg-amber-500 hover:bg-amber-600 text-amber-950 shadow-sm',
  outline: 'bg-white hover:bg-slate-50 border border-slate-200 text-slate-800',
  ghost: 'bg-transparent hover:bg-slate-50 text-slate-700',
  whatsapp: 'bg-whatsapp hover:bg-emerald-600 text-white shadow-sm',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'text-[10px] py-2 px-4 tracking-wider',
  md: 'text-xs py-3 px-6',
  lg: 'text-sm py-3.5 px-8',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  children,
  ...props
}) => {
  return (
    <button
      className={[
        'inline-flex items-center justify-center gap-2 font-bold rounded-lg transition-colors duration-200 cursor-pointer',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </button>
  );
};
