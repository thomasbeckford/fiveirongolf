'use client';
import React from 'react';

interface HighImpactHeroProps {
  children?: React.ReactNode;
  backgroundType?: 'video' | 'image' | 'color';
  backgroundSrc?: string;
  overlayOpacity?: number;
  textColor?: string;
  height?: string;
}

export const HighImpactHero: React.FC<HighImpactHeroProps> = ({
  children,
  backgroundType = 'color',
  backgroundSrc,
  overlayOpacity = 0.4,
  textColor = 'white',
  height = '40vh'
}) => {
  const renderBackground = () => {
    switch (backgroundType) {
      case 'video':
        return backgroundSrc ? (
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
            <source src={backgroundSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : null;

      case 'image':
        return backgroundSrc ? (
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundSrc})` }}
          />
        ) : null;

      case 'color':
      default:
        return <div className="absolute inset-0 w-full h-full bg-accent" />;
    }
  };

  return (
    <div className="relative w-full overflow-hidden" style={{ height }}>
      {renderBackground()}

      {(backgroundType === 'video' || backgroundType === 'image') && (
        <div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity }} />
      )}
      <div className="relative z-10 h-full flex items-center justify-center px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto text-center">
          <div className="space-y-3 sm:space-y-4 md:space-y-6" style={{ color: textColor }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
