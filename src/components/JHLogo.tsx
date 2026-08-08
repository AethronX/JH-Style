import React from 'react';
import jhOfficialLogoImg from '../assets/images/jh_style_official_logo_1786183322855.jpg';

interface JHLogoProps {
  variant?: 'dark' | 'light'; // dark = black logo on white, light = white logo on dark
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtext?: boolean;
  subtext?: string;
  className?: string;
}

export const JHLogo: React.FC<JHLogoProps> = ({
  variant = 'dark',
  size = 'md',
  showSubtext = true,
  subtext = 'NIZWA • OMAN',
  className = '',
}) => {
  const isLight = variant === 'light';

  // Dimension scaling for official logo mark
  const sizeMap = {
    sm: { imgHeight: 'h-10 sm:h-12', textSub: 'text-[9px] sm:text-[10px]' },
    md: { imgHeight: 'h-14 sm:h-16', textSub: 'text-[10px] sm:text-[11px]' },
    lg: { imgHeight: 'h-20 sm:h-24', textSub: 'text-[11px] sm:text-[12px]' },
    xl: { imgHeight: 'h-28 sm:h-36', textSub: 'text-[13px] sm:text-[15px]' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official High-Res Logo Mark */}
      <div className="flex flex-col items-start justify-center">
        <img
          src={jhOfficialLogoImg}
          alt="JH STYLE Official Logo"
          referrerPolicy="no-referrer"
          className={`${currentSize.imgHeight} w-auto object-contain transition-transform duration-300 group-hover:scale-105 ${
            isLight ? 'invert contrast-125 brightness-200' : 'mix-blend-multiply'
          }`}
        />
        {showSubtext && (
          <span
            className={`font-mono uppercase tracking-[0.35em] mt-0.5 font-bold ${
              currentSize.textSub
            } ${isLight ? 'text-zinc-400' : 'text-zinc-500'}`}
          >
            {subtext}
          </span>
        )}
      </div>
    </div>
  );
};


