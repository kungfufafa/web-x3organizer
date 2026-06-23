import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'outlineOnDark' | 'ghost' | 'whatsapp';
type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
  children?: React.ReactNode;
}

interface ButtonAsButton extends BaseProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: undefined;
}

interface ButtonAsAnchor extends BaseProps, Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'className'> {
  /** When provided, the Button renders as an `<a>` (navigation) instead of a `<button>`. */
  href: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-brand-primary hover:bg-brand-hover active:bg-brand-active text-white shadow-sm',
  secondary: 'bg-slate-900 hover:bg-slate-800 text-white shadow-sm',
  accent: 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-sm',
  outline: 'bg-white hover:bg-slate-50 border border-slate-200 text-slate-900',
  outlineOnDark: 'bg-transparent hover:bg-white/10 border border-white/30 text-white',
  ghost: 'bg-transparent hover:bg-slate-50 text-slate-700',
  whatsapp: 'bg-whatsapp hover:bg-whatsapp-hover text-white shadow-sm',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'text-xs py-2.5 px-5 tracking-wide min-h-[44px]',
  md: 'text-sm py-3 px-6 min-h-[44px]',
  lg: 'text-base py-3.5 px-8 min-h-[48px]',
};

const baseClasses =
  'inline-flex items-center justify-center gap-2 font-bold rounded-full transition-colors duration-[250ms] cursor-pointer';

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  children,
  ...props
}) => {
  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (props.href !== undefined) {
    const { href, onClick, ...anchorProps } = props;
    // Preserve SPA routing on plain clicks; let modifier-clicks behave as native links.
    const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
      if (onClick) {
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        onClick(e);
      }
    };
    return (
      <a href={href} onClick={handleClick} className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};