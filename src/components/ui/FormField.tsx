import React from 'react';

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({ label, children, className = '' }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="text-sm font-bold text-slate-600 block">
        {label}
      </label>
      {children}
    </div>
  );
};

const inputBase =
  'w-full text-slate-900 text-base border border-slate-200 rounded-lg p-3.5 bg-white focus:outline-none focus:ring-2 focus:ring-border-focus focus:border-border-focus font-sans transition-all appearance-none';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  dark?: boolean;
}

export const Input: React.FC<InputProps> = ({ dark = false, className = '', ...props }) => {
  const darkClasses = dark
    ? 'bg-white/10 border-white/20 text-white placeholder-slate-300 focus:bg-white/20 focus:border-white/40 focus:ring-white/30'
    : '';
  return <input className={`${inputBase} ${darkClasses} ${className}`} {...props} />;
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export const Select: React.FC<SelectProps> = ({ className = '', children, ...props }) => {
  return (
    <select className={`${inputBase} cursor-pointer ${className}`} {...props}>
      {children}
    </select>
  );
};
