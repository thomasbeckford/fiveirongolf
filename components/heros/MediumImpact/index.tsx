"use client";
import React from "react";

interface MediumImpactHeroProps {
  children?: React.ReactNode;
  backgroundType?: "image" | "color";
  backgroundSrc?: string;
  backgroundColor?: string;
  overlayOpacity?: number;
  textColor?: string;
  bottomBarColor?: string;
  bottomBarText?: string;
  bottomBarTextColor?: string;
  height?: string;
}

export const MediumImpactHero: React.FC<MediumImpactHeroProps> = ({
  children,
  backgroundType = "color",
  backgroundSrc,
  backgroundColor = "#1a1a1a",
  overlayOpacity = 0.4,
  textColor = "white",
  bottomBarColor = "#84cc16",
  bottomBarText = "INFORMACIÓN ADICIONAL • SERVICIOS • CARACTERÍSTICAS",
  bottomBarTextColor = "black",
  height = "60vh",
}) => {
  const renderBackground = () => {
    switch (backgroundType) {
      case "image":
        return backgroundSrc ? (
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundSrc})` }}
          />
        ) : null;

      case "color":
      default:
        return (
          <div
            className="absolute inset-0 w-full h-full"
            style={{ backgroundColor }}
          />
        );
    }
  };

  return (
    <div className="relative w-full overflow-hidden" style={{ height }}>
      {/* Background */}
      {renderBackground()}

      {/* Overlay for better text readability */}
      {backgroundType === "image" && (
        <div
          className="absolute inset-0 bg-black z-10"
          style={{ opacity: overlayOpacity }}
        />
      )}

      {/* Main Content */}
      <div className="relative z-20 h-full flex flex-col">
        {/* Text Content Area */}
        <div className="flex-1 flex items-center justify-start">
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="max-w-4xl">
              <div className="space-y-4" style={{ color: textColor }}>
                {children}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="w-full py-4"
          style={{ backgroundColor: bottomBarColor }}
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <p
              className="text-sm sm:text-base font-bold tracking-wide uppercase"
              style={{ color: bottomBarTextColor }}
            >
              {bottomBarText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
