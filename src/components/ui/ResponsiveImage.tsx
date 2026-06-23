import React from 'react';

interface ResponsiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspect?: string;
  wrapperClassName?: string;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  aspect = 'aspect-[4/3]',
  wrapperClassName = '',
  className = '',
  alt,
  loading = 'lazy',
  ...props
}) => (
  <div className={['relative overflow-hidden rounded-2xl bg-slate-100', aspect, wrapperClassName].filter(Boolean).join(' ')}>
    <img
      alt={alt}
      loading={loading}
      className={['absolute inset-0 h-full w-full object-cover', className].filter(Boolean).join(' ')}
      referrerPolicy="no-referrer"
      {...props}
    />
  </div>
);
