'use client';

import { JSX, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLocations } from '@/hooks/useLocations';
import { useNearestLocations } from '@/hooks/useNearestLocations';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Button } from './ui/button';
import Link from 'next/link';

export function LocationSelect({ experience }: { experience?: string }): JSX.Element {
  const router = useRouter();
  const { locations } = useLocations();
  const { nearestLocations, isLoading } = useNearestLocations(1);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentLocation, setCurrentLocation, mounted] = useLocalStorage('location');
  const currentLocationName = locations.find((location) => location.slug === currentLocation)?.name;
  const [isPending, startTransition] = useTransition();

  const selectLocation = (slug: string): void => {
    setCurrentLocation(slug);

    // Si no había location guardada, redirigir con transición
    if (!currentLocation) {
      startTransition(() => {
        if (experience)
          return router.push(
            `https://booking.fiveirongolf.com/select-experience?location=${slug}&experience=${experience}`
          );
        router.push(`/locations/${slug}`);
      });
    }
  };

  const clearLocation = (): void => {
    setCurrentLocation('');
    setIsOpen(!isOpen);
  };

  const buttonClass: string =
    'text-center flex items-center justify-center w-[400px] max-w-full px-6 py-4 h-auto bg-transparent border-2 border-primary rounded-full text-white text-sm font-medium tracking-wider hover:bg-primary/10 transition-colors focus:ring-0 focus:ring-offset-0 data-[state=open]:bg-primary/10';

  // Loading durante hidratación o transición
  if (!mounted || isPending) {
    return (
      <div className="flex items-center gap-2">
        <div className="relative flex items-center gap-4 w-[400px] max-w-full">
          <Button className={buttonClass} disabled>
            {isPending ? 'Redirecting...' : 'Loading...'}
          </Button>
        </div>
        <Button
          variant="outline"
          className="w-12 h-12 border-2 border-primary rounded-full flex items-center justify-center shrink-0"
          disabled
        >
          <ChevronDown className="w-5 h-5 text-primary" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="relative flex items-center gap-4 w-[400px] max-w-full">
        {isLoading ? (
          <Button className={buttonClass} disabled>
            Loading...
          </Button>
        ) : (
          <Select onValueChange={selectLocation} onOpenChange={setIsOpen} open={isOpen} disabled={isPending}>
            {!isOpen && currentLocation ? (
              <Link href={`/locations/${currentLocation}`}>
                <Button variant="outline" size="lg" className={buttonClass}>
                  {currentLocationName}
                </Button>
              </Link>
            ) : (
              <SelectTrigger arrow={false} className={buttonClass}>
                <SelectValue placeholder="SELECT YOUR LOCATION" className="text-white placeholder:text-white" />
              </SelectTrigger>
            )}

            <SelectContent className="w-full bg-primary border-4 border-primary rounded-3xl p-0 overflow-hidden min-w-[var(--radix-select-trigger-width)]">
              <div className="p-4 border-b-2 border-white/20">
                <input
                  type="text"
                  placeholder="Search locations..."
                  className="w-full px-4 py-3 bg-white rounded-full text-black placeholder-gray-500 text-sm focus:outline-none"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              <div className="max-h-60 overflow-y-auto">
                {locations.map((location, index) => (
                  <SelectItem
                    key={location.id}
                    value={location.slug}
                    className={`w-full px-6 py-2 text-left text-black text-sm font-medium tracking-wide hover:bg-black hover:text-primary focus:bg-black focus:text-primary transition-colors cursor-pointer data-[highlighted]:bg-black data-[highlighted]:text-primary ${
                      index !== locations.length - 1 ? 'border-b border-black/10' : ''
                    }`}
                  >
                    {location.name}
                  </SelectItem>
                ))}
              </div>
            </SelectContent>
          </Select>
        )}
      </div>

      <Button
        onClick={clearLocation}
        variant="outline"
        className="w-12 h-12 border-2 border-primary rounded-full flex items-center justify-center shrink-0 transition-transform"
        disabled={isPending}
      >
        <ChevronDown className={`w-5 h-5 text-primary transition-transform ${isOpen ? 'rotate-[-90deg]' : ''}`} />
      </Button>
    </div>
  );
}
