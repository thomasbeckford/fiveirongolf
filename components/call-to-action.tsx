import React from 'react';

import { LocationSelect } from './location-select';
import { Button } from './ui/button';
import Link from 'next/link';
import { getLocations } from '@/server/actions';
import { CountingNumber } from './animate-ui/text/counting-number';

interface CallToActionProps {
  title?: string;
  secondaryAction?: () => void;
}

export async function CallToAction({ title = 'Book Your Visit', secondaryAction }: CallToActionProps) {
  const locations = await getLocations();

  return (
    <div className="px-4 flex flex-col gap-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center gap-4 items-start w-full">
        <div className="text-left font-rawson">
          <h2 className="text-6xl font-bold text-primary">{title}</h2>
          <p className="text-white text-xl">
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

          <p className="text-white text-4xl">
            <CountingNumber number={locations.totalDocs} /> locations <span className="text-primary">worldwide</span>
          </p>

          <div className="w-full md:flex md:justify-end overflow-hidden">
            <LocationSelect />
          </div>
        </div>
      </div>
    </div>
  );
}
