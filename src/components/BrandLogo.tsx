import React from 'react';

interface BrandLogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'light',
  size = 'md',
  className = '',
}) => {
  const isDark = variant === 'dark';

  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const subtextSizes = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-xs',
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Custom modern logo featuring two flowing navy and orange strokes */}
      <div className={`relative ${iconSizes[size]} shrink-0 flex items-center justify-center`}>
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          {/* Subtle circular ambient glow */}
          <circle cx="24" cy="24" r="22" fill={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(15,23,42,0.03)'} />
          
          {/* First flowing stroke: Deep Navy Blue ribbon */}
          <path
            d="M8 29C11 17 21 11 36 10C28 14 20 20 17 31C15 36 11 38 8 29Z"
            fill={isDark ? '#38BDF8' : '#0F172A'}
          />

          {/* Second flowing stroke: Vibrant Orange energetic ribbon */}
          <path
            d="M12 37C18 36 24 33 30 25C37 16 41 15 42 16C41 22 34 32 26 36C20 39 15 39 12 37Z"
            fill="#EA580C"
          />

          {/* Dynamic forward kinetic accent dots */}
          <circle cx="37" cy="13" r="2.5" fill="#F97316" />
          <circle cx="10" cy="31" r="2" fill={isDark ? '#E2E8F0' : '#1E293B'} />
        </svg>
      </div>

      <div className="flex flex-col leading-none">
        <div className={`font-extrabold tracking-tight ${textSizes[size]} flex items-baseline gap-1.5`}>
          <span className={isDark ? 'text-white' : 'text-slate-900'}>VANDANA</span>
          <span className="text-orange-600 font-bold">TRAVELS</span>
        </div>
        <span
          className={`font-medium tracking-wider uppercase text-slate-400 ${subtextSizes[size]} mt-0.5`}
        >
          Intercity Express
        </span>
      </div>
    </div>
  );
};
