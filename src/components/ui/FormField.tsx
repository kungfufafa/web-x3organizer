import React from 'react';

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({ label, children, className = '' }) => {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
        {label}
      </label>
      {children}
    </div>
  );
};

const inputBase =
  'w-full text-slate-700 text-sm border border-slate-200 rounded-lg p-3.5 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans transition-all appearance-none';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  dark?: boolean;
}

export const Input: React.FC<InputProps> = ({ dark = false, className = '', ...props }) => {
  const darkClasses = dark
    ? 'bg-white/10 border-white/20 text-white placeholder-slate-300 focus:bg-white/20 focus:border-white/40 focus:ring-amber-500/50'
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
