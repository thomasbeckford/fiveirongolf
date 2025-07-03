"use client";
import React from "react";

import { LocationSelect } from "./location-select";

interface CallToActionProps {
  logo?: React.ReactNode;
  title?: string;
  description?: string;
  buttonText?: string;
  buttonAction?: () => void;
  secondaryText?: string;
  secondaryAction?: () => void;
  variant?: "default" | "card" | "accent";
  showTopLine?: boolean;
}

export const CallToAction: React.FC<CallToActionProps> = ({
  logo,
  title = "Book Your Visit",
  description = "Reserve a simulator or schedule your next lesson today.",
  secondaryText = "SEE ALL LOCATIONS",
  secondaryAction,
  variant = "default",
  showTopLine = true,
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "card":
        return "bg-card text-card-foreground";
      case "accent":
        return "bg-accent text-accent-foreground";
      default:
        return "bg-background text-foreground";
    }
  };

  return (
    <div className={`relative w-full ${getVariantClasses()}`}>
      {/* Top decorative line */}
      {showTopLine && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-fiveiron-orange via-fiveiron-cardinal to-fiveiron-tangerine"></div>
      )}

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8 sm:py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            {logo ? (
              logo
            ) : (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-foreground flex items-center justify-center">
                <span className="text-2xl sm:text-3xl font-bold text-foreground">
                  5i
                </span>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-primary">
              {title}
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground">
              {description}
            </p>
          </div>

          {/* Action Section */}
          <div className="flex-shrink-0 flex flex-col items-center lg:items-end gap-4">
            {/* Secondary link */}
            {secondaryText && (
              <button
                onClick={secondaryAction}
                className="text-sm font-semibold tracking-wide uppercase hover:opacity-80 transition-opacity border-b-2 border-foreground pb-1 text-foreground"
              >
                {secondaryText}
              </button>
            )}

            {/* Primary button */}
            <div className="*:not-first:mt-2">
              <LocationSelect />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
