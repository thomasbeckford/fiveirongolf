'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Loader2, Navigation2 } from 'lucide-react';
import { useNearestLocations } from '@/hooks/useNearestLocations';
import { NeonButton } from './ui/neon-button';

interface NavbarNearestLocationProps {
  className?: string;
  showLabel?: boolean;
  variant?: 'compact' | 'minimal' | 'badge';
}

export default function NearestLocations({
  className = '',
  showLabel = true,
  variant = 'compact'
}: NavbarNearestLocationProps) {
  const { nearestLocations, isLoading, error, hasUserLocation } = useNearestLocations(1);

  const nearestLocation = nearestLocations[0];

  // Estados de carga y error
  if (isLoading) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
        {showLabel && <span className="text-sm text-muted-foreground">Searching...</span>}
      </div>
    );
  }

  if (error || !hasUserLocation || !nearestLocation) {
    return null; // No mostrar nada si hay error o no hay ubicación
  }

  // Variante Badge - Súper compacta
  if (variant === 'badge') {
    return (
      <Link href={`/locations/${nearestLocation.slug}`} className={className}>
        <Badge variant="secondary" className="hover:bg-secondary/80 transition-colors cursor-pointer">
          <MapPin className="w-3 h-3 mr-1" />
          {nearestLocation.formattedDistance}
        </Badge>
      </Link>
    );
  }

  // Variante Minimal - Solo icono y distancia
  if (variant === 'minimal') {
    return (
      <Link href={`/locations/${nearestLocation.slug}`} className={className}>
        <Button variant="ghost" size="sm">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{nearestLocation.formattedDistance}</span>
        </Button>
      </Link>
    );
  }

  // Variante Compact - Más información pero compacta
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showLabel && <span className="text-sm text-muted-foreground hidden sm:inline">Near you:</span>}

      <Button variant="ghost" className="flex items-center gap-2 min-w-0">
        <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
        <div className="min-w-0 flex items-center gap-1">
          <span className="text-md font-medium truncate">{nearestLocation.name}</span>
          <span className="text-xs text-muted-foreground flex-shrink-0">{nearestLocation.formattedDistance}</span>
        </div>
        <Navigation2 className="w-3 h-3 opacity-50 flex-shrink-0" />
      </Button>
    </div>
  );
}
