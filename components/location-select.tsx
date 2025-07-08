'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLocations } from '@/hooks/useLocations';
import { useNearestLocations } from '@/hooks/useNearestLocations';
import { Loader2 } from 'lucide-react';

export function LocationSelect() {
  const router = useRouter();
  const { locations } = useLocations();
  const { nearestLocations, isLoading } = useNearestLocations(1);
  const [isOpen, setIsOpen] = useState(false);

  const handleLocationChange = (slug: string) => {
    router.push(`/locations/${slug}`);
  };

  const nearestLocation = nearestLocations[0];

  return (
    <div>
      <div className="relative flex items-center gap-4 w-[400px] max-w-full">
        {isLoading || !nearestLocation ? (
          <div
            className="h-12 w-12 flex items-center justify-center rounded-full border-2 border-primary"
            aria-label="Loading"
          >
            <Loader2 className="w-4 h-4 animate-spin text-primary" />
          </div>
        ) : (
          <Select onValueChange={handleLocationChange} onOpenChange={setIsOpen} defaultValue={nearestLocation?.slug}>
            <SelectTrigger
              arrow={false}
              className="w-full px-6 py-4 h-auto bg-transparent border-2 border-primary rounded-full text-white text-sm font-medium tracking-wider hover:bg-primary/10 transition-colors focus:ring-0 focus:ring-offset-0 data-[state=open]:bg-primary/10"
            >
              <SelectValue placeholder="SELECT YOUR LOCATION" className="text-white placeholder:text-white" />
            </SelectTrigger>

            {/* External Arrow Button */}
            <div className="w-12 h-12 border-2 border-primary rounded-full flex items-center justify-center shrink-0 transition-transform">
              <ChevronDown
                className={`w-5 h-5 text-primary transition-transform ${
                  nearestLocation?.slug && isOpen ? 'rotate-[-90deg]' : isOpen ? 'rotate-90' : ''
                }`}
              />
            </div>

            <SelectContent className="w-full bg-primary border-4 border-primary rounded-3xl p-0 overflow-hidden min-w-[var(--radix-select-trigger-width)]">
              {/* Search Input Section */}
              <div className="p-4 border-b-2 border-white/20">
                <input
                  type="text"
                  placeholder="Search locations..."
                  className="w-full px-4 py-3 bg-white rounded-full text-black placeholder-gray-500 text-sm focus:outline-none"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              {/* Location Items */}
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
    </div>
  );
}
