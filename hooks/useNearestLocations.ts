"use client";

import { useMemo } from "react";
import { useGeolocation } from "./useGeolocation";
import { useLocationsMaster } from "./useLocationsMaster";
import { calculateDistance } from "@/lib/distance";
import { ILocationMaster } from "@/types/location";

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

export interface LocationWithDistance extends ILocationMaster {
  distance: number;
  formattedDistance: string;
}

export function useNearestLocations(limit: number = 5) {
  const {
    location: userLocation,
    loading: locationLoading,
    error: locationError,
  } = useGeolocation();
  const {
    locationsByCity,
    loading,
    error: locationsError,
  } = useLocationsMaster();

  // Esta funcion se recalcula unicamente cuando cambien los datos, sino no se vuelve a calcular
  const nearestLocations = useMemo(() => {
    // Si no tenemos ubicación del usuario o ubicaciones de golf, retornar vacío
    if (!userLocation) {
      return [];
    }

    // Convertir el objeto agrupado en array plano usando tu lógica existente
    const flatLocations = Object.values(locationsByCity).flat();

    // Calcular distancia para cada ubicación usando tu función
    const locationsWithDistance: LocationWithDistance[] = flatLocations.map(
      (location) => {
        const locationCoords = {
          lat: parseFloat(location.latitude),
          lng: parseFloat(location.longitude),
        };

        const distance = calculateDistance(userLocation, locationCoords);

        return {
          ...location,
          distance,
          formattedDistance: formatDistance(distance),
        };
      }
    );

    // Ordenar por distancia y tomar las primeras N
    return locationsWithDistance
      .sort((a, b) => a.distance - b.distance)
      .slice(0, limit);
  }, [userLocation, locationsByCity, limit]);

  const isLoading = locationLoading || loading;
  const error = locationError || locationsError;

  return {
    nearestLocations,
    userLocation,
    isLoading,
    error,
    hasUserLocation: !!userLocation,
  };
}
