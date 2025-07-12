'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { cn } from '@/lib/utils';
import { getLocations } from '@/server/actions';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { JSX, useState, useTransition } from 'react';
import useSWR from 'swr';
import { Button } from './ui/button';
import { Input } from './ui/input';

export function LocationSelect({ experience }: { experience?: string }): JSX.Element {
  const router = useRouter();

  const { data: locations, isLoading } = useSWR('locations', () => getLocations());

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentLocation, setCurrentLocation, mounted] = useLocalStorage('location');
  const currentLocationName = locations?.docs.find((location) => location.slug === currentLocation)?.name;
  const [isPending, startTransition] = useTransition();

  // Filtrar ubicaciones basado en el término de búsqueda
  const filteredLocations =
    locations?.docs?.filter((location) => location.name.toLowerCase().includes(searchTerm.toLowerCase())) || [];

  const selectLocation = (slug: string): void => {
    setCurrentLocation(slug);
    setSearchTerm(''); // Limpiar búsqueda al seleccionar

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
    setSearchTerm(''); // Limpiar búsqueda al limpiar ubicación
    setIsOpen(!isOpen);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.stopPropagation();
    setSearchTerm(e.target.value);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    e.stopPropagation();
  };

  const handleSearchFocus = (e: React.FocusEvent<HTMLInputElement>): void => {
    e.stopPropagation();
  };

  const handleOpenChange = (open: boolean): void => {
    setIsOpen(open);
    if (!open) {
      setSearchTerm(''); // Limpiar búsqueda al cerrar
    }
  };

  const buttonClass: string = cn(
    // Base styles
    'text-center flex items-center justify-center bg-transparent border-2 border-primary rounded-full text-white font-medium tracking-wider hover:bg-primary/10 transition-colors focus:ring-0 focus:ring-offset-0 data-[state=open]:bg-primary/10',

    // Responsive sizing
    'w-full min-w-0 px-4 py-3 text-sm h-auto', // Mobile first
    'sm:px-5 sm:py-3.5 sm:text-base', // Small screens
    'md:max-w-[400px] px-6 py-4 text-lg', // Medium screens and up
    'lg:px-8 lg:py-5 lg:ml-auto', // Large screens

    // Placeholder styles
    'data-[placeholder]:text-white data-[placeholder]:font-bold data-[placeholder]:flex data-[placeholder]:items-start data-[placeholder]:justify-start data-[placeholder]:text-left',
    'data-[placeholder]:text-sm data-[placeholder]:uppercase',
    'sm:data-[placeholder]:text-base',
    'md:data-[placeholder]:text-lg',

    // Content styles
    'uppercase font-bold flex items-start justify-start text-left text-white truncate'
  );

  const dropdownClass: string = cn(
    'w-full bg-primary border-4 border-primary rounded-3xl p-0 overflow-hidden',
    'min-w-[var(--radix-select-trigger-width)]',
    'max-w-[100vw] sm:max-w-[90vw] md:max-w-none', // Prevent overflow on small screens
    'data-[state=open]:bg-primary '
  );

  // Loading durante hidratación o transición
  if (!mounted || isPending) {
    return (
      <div className="flex items-center gap-2 w-full">
        <div className="relative flex items-center flex-1 min-w-0">
          <Button className={buttonClass} disabled>
            <span className="truncate">{isPending ? 'Redirecting...' : 'Loading...'}</span>
          </Button>
        </div>
        <Button
          variant="outline"
          className="shrink-0 border-2 border-primary rounded-full flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
          disabled={isPending}
        >
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 w-full ">
      <div className="relative flex items-center flex-1 min-w-0">
        {isLoading ? (
          <Button className={buttonClass} disabled>
            <span className="truncate">Loading...</span>
          </Button>
        ) : (
          <Select onValueChange={selectLocation} onOpenChange={handleOpenChange} open={isOpen} disabled={isPending}>
            {!isOpen && currentLocation ? (
              <Link href={`/locations/${currentLocation}`} className="w-full">
                <Button variant="outline" size="lg" className={buttonClass}>
                  <span className="truncate">{currentLocationName}</span>
                </Button>
              </Link>
            ) : (
              <SelectTrigger arrow={false} className={buttonClass}>
                <SelectValue placeholder="SELECT YOUR LOCATION" />
              </SelectTrigger>
            )}

            <SelectContent className={dropdownClass}>
              <div className="p-3 sm:p-4 border-b-2 border-white/20">
                <Input
                  type="text"
                  placeholder="Search locations..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onKeyDown={handleSearchKeyDown}
                  onFocus={handleSearchFocus}
                  className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-white/20 rounded-full text-white placeholder-gray-300 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-white/30"
                  onClick={(e) => e.stopPropagation()}
                  autoComplete="off"
                />
              </div>

              <div className="max-h-48 sm:max-h-60 md:max-h-72 overflow-y-auto">
                {filteredLocations.length > 0 ? (
                  filteredLocations.map((location, index) => (
                    <SelectItem
                      key={location.id}
                      value={location.slug}
                      className={cn(
                        'w-full px-4 py-2.5 sm:px-6 sm:py-3 text-left text-black font-medium tracking-wide hover:bg-black hover:text-primary focus:bg-black focus:text-primary transition-colors cursor-pointer data-[highlighted]:bg-black data-[highlighted]:text-primary',
                        'text-sm sm:text-base truncate',
                        index !== filteredLocations.length - 1 && 'border-b border-black/10'
                      )}
                    >
                      <span className="truncate">{location.name}</span>
                    </SelectItem>
                  ))
                ) : (
                  <div className="px-4 py-6 sm:px-6 sm:py-8 text-center text-gray-400 text-sm sm:text-base">
                    <div className="truncate">No locations found matching &quot;{searchTerm}&quot;</div>
                  </div>
                )}
              </div>
            </SelectContent>
          </Select>
        )}
      </div>

      <Button
        onClick={clearLocation}
        variant="outline"
        className="shrink-0 border-2 border-primary rounded-full flex items-center justify-center transition-transform w-16 h-16 sm:w-16 sm:h-16 md:w-16 md:h-16 lg:w-16 lg:h-16"
        disabled={isPending}
      >
        <ChevronDown
          className={`w-4 h-4 sm:w-5 sm:h-5 text-primary transition-transform ${isOpen ? 'rotate-[-90deg]' : ''}`}
        />
      </Button>
    </div>
  );
}
