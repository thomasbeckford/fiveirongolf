import { useMemo } from 'react';
import { useGeolocation } from './useGeolocation';
import { calculateDistance } from '@/lib/distance';
import { useLocations } from './useLocations';
import { Location } from '@/payload/generated-types';

// Formatear distancia para mostrar
function formatDistance(distance: number): string {
  if (distance < 1) {
    return `${Math.round(distance * 1000)}m`;
  } else if (distance < 10) {
    return `${distance.toFixed(1)}km`;
  } else {
    return `${Math.round(distance)}km`;
  }
}

export interface LocationWithDistance extends Location {
  distance: number;
  formattedDistance: string;
}

export function useNearestLocations(limit: number = 5) {
  const { location: userLocation, loading: locationLoading, error: locationError } = useGeolocation();
  const { locations, loading: locationsLoading, error: locationsError } = useLocations();

  // Esta funcion se recalcula unicamente cuando cambien los datos, sino no se vuelve a calcular
  const nearestLocations = useMemo(() => {
    // Si no tenemos ubicación del usuario o ubicaciones de golf, retornar vacío
    if (!userLocation || !locations) {
      return [];
    }

    // CORECCIÓN: Verificar si locations es un array o un objeto agrupado
    let flatLocations: Location[];

    if (Array.isArray(locations)) {
      // Si locations ya es un array, usarlo directamente
      flatLocations = locations;
    } else {
      // Si locations es un objeto agrupado, convertir a array plano
      flatLocations = Object.values(locations as Location[]).flat();
    }

    // Validar que tenemos ubicaciones válidas
    if (!flatLocations || flatLocations.length === 0) {
      return [];
    }

    // Calcular distancia para cada ubicación usando tu función
    const locationsWithDistance: LocationWithDistance[] = flatLocations
      .map((location) => {
        const latitude = location.GeneralSchema?.coordinates?.[1];
        const longitude = location.GeneralSchema?.coordinates?.[0];

        // Validar que la ubicación tiene coordenadas válidas
        if (!latitude || !longitude) {
          console.warn('Location missing coordinates:', location);
          return null;
        }

        const locationCoords = {
          lat: parseFloat(latitude.toString()),
          lng: parseFloat(longitude.toString())
        };

        // Validar que las coordenadas son números válidos
        if (isNaN(locationCoords.lat) || isNaN(locationCoords.lng)) {
          console.warn('Invalid coordinates for location:', location);
          return null;
        }

        const distance = calculateDistance(userLocation, locationCoords);

        return {
          ...location,
          distance,
          formattedDistance: formatDistance(distance)
        };
      })
      .filter(Boolean) as LocationWithDistance[]; // Filtrar ubicaciones nulas

    // Ordenar por distancia y tomar las primeras N
    return locationsWithDistance.sort((a, b) => a.distance - b.distance).slice(0, limit);
  }, [userLocation, locations, limit]);

  const isLoading = locationLoading || locationsLoading;
  const error = locationError || locationsError;

  return {
    nearestLocations,
    userLocation,
    isLoading,
    error,
    hasUserLocation: !!userLocation
  };
}
