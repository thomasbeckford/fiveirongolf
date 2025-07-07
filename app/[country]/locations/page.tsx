'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Loader2, Phone } from 'lucide-react';
import { useLocations } from '@/hooks/useLocations';

export default function AllLocationsPage() {
  const { locations, loading, error } = useLocations();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Cargando ubicaciones...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive">Error al cargar ubicaciones</p>
        </div>
      </div>
    );
  }

  // Convertir a array plano
  const allLocations = Object.values(locations || {}).flat();

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            All our <span className="text-primary">locations</span>
          </h1>
          <p className="text-xl text-muted-foreground">{allLocations.length} locations around the world</p>
        </div>

        {/* Grid de ubicaciones */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allLocations.map((location) => {
            const isClosed = location.name.includes('CLOSED');

            console.log(allLocations);

            return (
              <Link
                key={location.id}
                href={isClosed ? '#' : `/locations/${location.id}`}
                aria-disabled={isClosed}
                className={`h-full hover:shadow-lg transition-all cursor-pointer group `}
              >
                <Card
                  className={`h-full hover:shadow-lg  transition-all cursor-pointer group ${
                    isClosed ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                  }`}
                >
                  <CardHeader>
                    <div className="space-y-3">
                      {/* Status badge */}
                      {isClosed && (
                        <Badge variant="destructive" className="w-fit">
                          Closed
                        </Badge>
                      )}

                      {/* Nombre */}
                      <CardTitle
                        className={
                          isClosed ? 'text-muted-foreground' : 'text-lg group-hover:text-primary transition-colors'
                        }
                      >
                        {location.name}
                      </CardTitle>

                      {/* Timezone como ubicación */}
                      <CardDescription className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {location.timezone}
                      </CardDescription>

                      {/* Teléfono */}
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Phone className="w-3 h-3" />
                        {location.telephone}
                      </div>

                      {/* Experiencias */}
                      <div className="flex gap-1 flex-wrap">
                        {location.experiences.map((service) => (
                          <Badge key={service} variant="outline" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
