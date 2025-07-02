// components/location-finder.tsx
"use client";

import { useEffect, useState } from "react";
import { useGeolocation } from "@/hooks/useGeolocation";
import { findNearestLocation } from "@/lib/distance";
import { Location } from "@/types/location";
import { useGolfLocations } from "@/hooks/useGolfLocations";

export function LocationFinder() {
  const {
    location: userLocation,
    error,
    loading,
    requestPermission,
  } = useGeolocation();
  const [nearestLocation, setNearestLocation] = useState<Location | null>(null);
  const [showManualSelection, setShowManualSelection] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedLocationId, setSelectedLocationId] = useState("");
  const { golfLocations, isPendingGolfLocations } = useGolfLocations();

  useEffect(() => {
    if (userLocation && golfLocations) {
      const nearest = findNearestLocation(userLocation, golfLocations);
      setNearestLocation(nearest);
    }
  }, [userLocation, golfLocations]);

  const handleManualSelection = () => {
    if (!selectedLocationId || !golfLocations) return;

    const allLocations = Object.values(golfLocations).flat();
    const selected = allLocations.find(
      (loc: Location) => loc.id === selectedLocationId
    ) as Location;

    if (selected) {
      setNearestLocation(selected);
      setShowManualSelection(false);
    }
  };

  // Obtener ciudades únicas de las locaciones
  const cities = golfLocations ? Object.keys(golfLocations) : [];

  if (loading || isPendingGolfLocations) {
    return (
      <div className="p-6 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Detectando tu ubicación...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      {/* Ubicación encontrada */}
      {nearestLocation && (
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-green-800">
              Tu locación más cercana:
            </h3>
          </div>

          <div className="space-y-1">
            <p className="font-medium">{nearestLocation.name}</p>
            <p className="text-sm text-gray-600">{nearestLocation.telephone}</p>
            <p className="text-sm text-gray-500">
              Lat: {parseFloat(nearestLocation.latitude).toFixed(4)}, Lng:{" "}
              {parseFloat(nearestLocation.longitude).toFixed(4)}
            </p>
            {nearestLocation.distance && (
              <p className="text-sm text-gray-500">
                Distancia: {nearestLocation.distance.toFixed(2)} km
                {userLocation?.source === "ip" && " (aproximada)"}
                {userLocation?.source === "gps" && " (GPS)"}
              </p>
            )}

            {/* Botón para ir a la página de la locación */}
            <div className="pt-2">
              <a
                href={`/locations/${nearestLocation.urlSlug}`}
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors"
              >
                Ver detalles
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Error o sin ubicación */}
      {error && !nearestLocation && (
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg">
          <p className="text-amber-700 mb-4">{error}</p>

          <div className="space-y-2">
            <button
              onClick={requestPermission}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Activar GPS para mayor precisión
            </button>

            <button
              onClick={() => setShowManualSelection(!showManualSelection)}
              className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
            >
              Seleccionar manualmente
            </button>
          </div>
        </div>
      )}

      {/* Selección manual */}
      {showManualSelection && golfLocations && (
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-4">
          <h4 className="font-medium">Selecciona tu ubicación:</h4>

          <div>
            <label htmlFor="city" className="block text-sm font-medium mb-1">
              Ciudad:
            </label>
            <select
              id="city"
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                setSelectedLocationId("");
              }}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Selecciona una ciudad</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {selectedCity && (
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium mb-1"
              >
                Locación:
              </label>
              <select
                id="location"
                value={selectedLocationId}
                onChange={(e) => setSelectedLocationId(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Selecciona una locación</option>
                {golfLocations[selectedCity]?.map((location: Location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {selectedLocationId && (
            <button
              onClick={handleManualSelection}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
            >
              Confirmar selección
            </button>
          )}
        </div>
      )}

      {/* Información adicional */}
      {userLocation && (
        <div className="text-xs text-gray-500 text-center">
          Ubicación detectada vía{" "}
          {userLocation.source === "gps" ? "GPS" : "IP geolocation"}
        </div>
      )}
    </div>
  );
}
