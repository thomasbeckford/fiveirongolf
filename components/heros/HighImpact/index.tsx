"use client";
import React from "react";

interface HighImpactHeroProps {
  children?: React.ReactNode;
  backgroundType?: "video" | "image" | "color";
  backgroundSrc?: string;
  backgroundColor?: string;
  overlayOpacity?: number;
  textColor?: string;
}

export const HighImpactHero: React.FC<HighImpactHeroProps> = ({
  children,
  backgroundType = "color",
  backgroundSrc,
  backgroundColor = "#1a1a1a",
  overlayOpacity = 0.4,
  textColor = "white",
}) => {
  const renderBackground = () => {
    switch (backgroundType) {
      case "video":
        return backgroundSrc ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover "
          >
            <source src={backgroundSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : null;

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
            className="absolute inset-0 w-full h-full rounded-[100px]"
            style={{ backgroundColor }}
          />
        );
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden border-6 border-fiveiron-lime rounded-[100px]">
      {/* Background */}
      {renderBackground()}

      {/* Overlay for better text readability */}
      {(backgroundType === "video" || backgroundType === "image") && (
        <div
          className="absolute inset-0 bg-black rounded-[100px]"
          style={{ opacity: overlayOpacity }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-6" style={{ color: textColor }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
