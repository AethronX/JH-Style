import React from 'react';
import jhOfficialLogoImg from '../assets/images/jh_style_official_logo_1786183322855.jpg';

interface JHLogoProps {
  variant?: 'dark' | 'light'; // dark = black logo on white, light = white logo on dark
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtext?: boolean;
  subtext?: string;
  className?: string;
  mode?: 'combined' | 'logo-only'; // combined = image logo emblem + side text, logo-only = raw official image logo
}

export const JHLogo: React.FC<JHLogoProps> = ({
  variant = 'dark',
  size = 'md',
  showSubtext = true,
  subtext = 'NIZWA • OMAN',
  className = '',
  mode = 'combined',
}) => {
  const isLight = variant === 'light';

  if (mode === 'logo-only') {
    const imgSize = {
      sm: 'h-10 sm:h-12',
      md: 'h-14 sm:h-18',
      lg: 'h-20 sm:h-24',
      xl: 'h-28 sm:h-36',
    }[size];

    return (
      <div className={`relative inline-block select-none ${className}`}>
        <img
          src={jhOfficialLogoImg}
          alt="JH STYLE Official Logo"
          referrerPolicy="no-referrer"
          className={`${imgSize} w-auto object-contain transition-transform duration-300 ${
            isLight ? 'invert contrast-125 brightness-200' : 'mix-blend-multiply'
          }`}
        />
      </div>
    );
  }

  // Dimension scaling for combined mode
  const sizeMap = {
    sm: { imgHeight: 'h-10 sm:h-12', textMain: 'text-lg sm:text-xl', textSub: 'text-[9px] sm:text-[10px]' },
    md: { imgHeight: 'h-14 sm:h-16', textMain: 'text-2xl sm:text-3xl', textSub: 'text-[10px] sm:text-[11px]' },
    lg: { imgHeight: 'h-20 sm:h-24', textMain: 'text-3xl sm:text-4xl', textSub: 'text-[11px] sm:text-[12px]' },
    xl: { imgHeight: 'h-28 sm:h-32', textMain: 'text-4xl sm:text-5xl', textSub: 'text-[12px] sm:text-[14px]' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 sm:gap-4 text-right font-sans select-none ${className}`}>
      {/* High-Res Geometric Crest Emblem */}
      <div className={`relative shrink-0 overflow-hidden transition-transform duration-300 group-hover:scale-105 ${currentSize.imgHeight} aspect-square flex items-center justify-center`}>
        <img
          src={jhOfficialLogoImg}
          alt="JH STYLE Crest Logo"
          referrerPolicy="no-referrer"
          className={`w-full h-full object-contain scale-110 ${
            isLight ? 'invert contrast-125 brightness-200' : 'mix-blend-multiply'
          }`}
        />
      </div>

      {/* Typography Brand Name */}
      <div className="flex flex-col justify-center leading-tight">
        <span
          className={`font-black tracking-[0.18em] uppercase font-sans ${currentSize.textMain} ${
            isLight ? 'text-white' : 'text-black'
          }`}
        >
          JH STYLE
        </span>
        {showSubtext && (
          <span
            className={`font-mono uppercase tracking-[0.28em] mt-0.5 font-bold ${
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

