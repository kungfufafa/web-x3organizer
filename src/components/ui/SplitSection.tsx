import React from 'react';

type SplitRatio = '5-7' | '6-6' | '7-5';
type MediaPosition = 'left' | 'right';

interface SplitSectionProps {
  children: [React.ReactNode, React.ReactNode];
  ratio?: SplitRatio;
  mediaPosition?: MediaPosition;
  className?: string;
  align?: 'start' | 'center';
}

const ratioClasses: Record<SplitRatio, [string, string]> = {
  '5-7': ['lg:col-span-5', 'lg:col-span-7'],
  '6-6': ['lg:col-span-6', 'lg:col-span-6'],
  '7-5': ['lg:col-span-7', 'lg:col-span-5'],
};

export const SplitSection: React.FC<SplitSectionProps> = ({
  children,
  ratio = '6-6',
  mediaPosition = 'right',
  className = '',
  align = 'start',
}) => {
  const [copy, media] = children;
  const [copySpan, mediaSpan] = ratioClasses[ratio];

  return (
    <div
      className={[
        'grid gap-10 md:gap-14 lg:grid-cols-12 lg:gap-20',
        align === 'center' ? 'items-center' : 'items-start',
        className,
      ].filter(Boolean).join(' ')}
    >
      <div className={[copySpan, mediaPosition === 'left' ? 'lg:order-2' : ''].filter(Boolean).join(' ')}>
        {copy}
      </div>
      <div className={[mediaSpan, mediaPosition === 'left' ? 'lg:order-1' : ''].filter(Boolean).join(' ')}>
        {media}
      </div>
    </div>
  );
};
