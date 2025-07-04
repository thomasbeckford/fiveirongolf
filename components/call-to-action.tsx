"use client";
import React from "react";

import { LocationSelect } from "./location-select";
import Image from "next/image";

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
}) => {
  return (
    <div className="relative w-full">
      {/* Top decorative line */}

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8 sm:py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex gap-4 items-center">
            {/* Logo Section */}
            <Image src="/5i.svg" alt="Logo" width={142} height={140} />

            {/* Content Section */}
            <div className="flex-1 text-center lg:text-left max-w-2xl">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-primary">
                {title}
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground">
                {description}
              </p>
            </div>
          </div>

          {/* Action Section */}
          <div className="flex-shrink-0 flex flex-col items-center lg:items-end gap-4 ">
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
            <div className="*:not-first:mt-2 w-[200px]">
              <LocationSelect />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
