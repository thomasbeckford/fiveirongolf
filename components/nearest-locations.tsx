"use client";

import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Loader2 } from "lucide-react";
import { useNearestLocations } from "@/hooks/useNearestLocations";
import { LocationWithDistance } from "@/hooks/useNearestLocations";

interface NearestLocationsProps {
  limit?: number;
  showTitle?: boolean;
  className?: string;
}

export function NearestLocations({
  limit = 5,
  showTitle = true,
  className = "",
}: NearestLocationsProps) {
  const { nearestLocations, userLocation, isLoading, error, hasUserLocation } =
    useNearestLocations(limit);

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center py-8 ${className}`}>
        <Loader2 className="w-6 h-6 animate-spin mr-2" />
        <span>Encontrando ubicaciones cercanas...</span>
      </div>
    );
  }

  if (error || !hasUserLocation) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-muted-foreground mb-4">
          {error || "No se pudo determinar tu ubicación"}
        </p>
        <p className="text-sm text-muted-foreground">
          Puedes navegar por todas las ubicaciones manualmente
        </p>
      </div>
    );
  }

  if (nearestLocations.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-muted-foreground">
          No se encontraron ubicaciones cercanas
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      {showTitle && (
        <h2 className="text-2xl font-bold mb-6 text-center">
          📍 Nearest Locations
        </h2>
      )}

      {userLocation && (
        <div className="text-center mb-6 text-sm text-muted-foreground">
          {userLocation.source === "gps"
            ? "📱 Ubicación GPS"
            : "🌐 Ubicación aproximada"}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {nearestLocations.map(
          (location: LocationWithDistance, index: number) => (
            <div key={location.id}>
              <Card
                className={`hover:shadow-md transition-shadow ${
                  index === 0 ? "ring-2 ring-primary/20" : ""
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg leading-tight">
                        {location.name}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" />
                        {location.formattedDistance}
                        {index === 0 && (
                          <Badge variant="secondary" className="ml-2 text-xs">
                            Más cercana
                          </Badge>
                        )}
                      </CardDescription>
                    </div>
                  </div>

                  {/* Experiencias disponibles */}
                  <div className="flex gap-1 mt-2">
                    {location.experiences?.map((exp) => (
                      <Badge key={exp} variant="outline" className="text-xs">
                        {exp}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex gap-2">
                    <Link
                      href={`/locations/${location.urlSlug}`}
                      className="flex-1"
                    >
                      <Button variant="secondary" size="sm" className="w-full">
                        View Details
                        <Navigation className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          )
        )}
      </div>

      {nearestLocations.length === limit && (
        <div className="text-center mt-6">
          <Link href="/locations">
            <Button variant="outline">Ver todas las ubicaciones</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

// Ejemplo de uso
export function LocationsPageWithNearest() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Ubicaciones más cercanas */}
      <NearestLocations limit={5} />

      {/* Resto del contenido */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Todas las ubicaciones
        </h2>
        {/* Tu grid original aquí */}
      </div>
    </div>
  );
}
