'use client';
import React from 'react';

interface MediumImpactHeroProps {
  children?: React.ReactNode;
  backgroundSrc?: string;
  backgroundColor?: string;
  height?: string;
  bottomBar?: boolean;
  bottomBarColor?: string;
  bottomBarText?: string;
  className?: string;
}

export const MediumImpactHero: React.FC<MediumImpactHeroProps> = ({
  children,
  backgroundSrc,
  backgroundColor = '#1a1a1a',
  height = '30vh',
  bottomBar = true,
  bottomBarColor = '#84cc16',
  bottomBarText = 'ADDITIONAL INFORMATION • SERVICES • FEATURES',
  className = ''
}) => {
  const backgroundStyle = backgroundSrc
    ? { backgroundImage: `url(${backgroundSrc})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { backgroundColor };

  return (
    <div className={`relative w-full overflow-hidden ${className}`} style={{ height }}>
      {/* Background */}
      <div className="absolute inset-0" style={backgroundStyle} />

      {/* Overlay solo si hay imagen */}
      {backgroundSrc && <div className="absolute inset-0 bg-black/40" />}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Main Content - Sin restricciones de ancho */}
        <div className="flex-1 flex items-center text-white">{children}</div>

        {/* Bottom Bar */}
        {bottomBar && (
          <div className="w-full py-4" style={{ backgroundColor: bottomBarColor }}>
            <div className="px-6 sm:px-8 lg:px-12">
              <p className="text-sm sm:text-base font-bold tracking-wide uppercase text-black">{bottomBarText}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
