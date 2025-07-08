'use client';
import React from 'react';

import { LocationSelect } from './location-select';
import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';

interface CallToActionProps {
  title?: string;
  secondaryAction?: () => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({
  title = 'Book Your Visit',

  secondaryAction
}) => {
  return (
    <div className="px-4 flex flex-col gap-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center gap-4 items-start w-full">
        <Image
          src="/5i.svg"
          alt="Logo"
          width={142}
          height={140}
          className="w-[83px] h-[80px] md:w-[142px] md:h-[140px]"
        />

        <div className="text-left font-rawson">
          <h2 className="text-[40px] font-bold text-primary">{title}</h2>
          <p className="text-white">
            We fill up <span className="underline">quickly</span> during this season, book up to 2 weeks in advance!
            Reserve a simulator or schedule your next lesson today.
          </p>
        </div>

        <div className="flex flex-col justify-start items-start gap-2 w-full md:items-end">
          <Link href="/locations">
            <Button
              variant="link"
              className="underline text-white underline-offset-4 decoration-primary text-lg flex justify-end "
              onClick={secondaryAction}
            >
              See all locations
            </Button>
          </Link>

          <div className="w-full md:flex md:justify-end overflow-hidden">
            <LocationSelect />
          </div>
        </div>
      </div>
    </div>
  );
};
