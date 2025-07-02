// lib/distance.ts
import {
  Coordinates,
  Location,
  LocationData,
  UserLocation,
} from "@/types/location";

export function calculateDistance(
  point1: Coordinates,
  point2: Coordinates
): number {
  const R = 6371; // Radio de la Tierra en km
  const dLat = toRad(point2.lat - point1.lat);
  const dLon = toRad(point2.lng - point1.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(point1.lat)) *
      Math.cos(toRad(point2.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(value: number): number {
  return (value * Math.PI) / 180;
}

export function findNearestLocation(
  userLocation: UserLocation,
  allLocations: LocationData
): Location | null {
  const flatLocations = Object.values(allLocations).flat();

  if (flatLocations.length === 0) return null;

  let nearestLocation = flatLocations[0];
  let minDistance = calculateDistance(userLocation, {
    lat: parseFloat(nearestLocation.latitude),
    lng: parseFloat(nearestLocation.longitude),
  });

  for (const location of flatLocations) {
    const locationCoords = {
      lat: parseFloat(location.latitude),
      lng: parseFloat(location.longitude),
    };

    const distance = calculateDistance(userLocation, locationCoords);

    if (distance < minDistance) {
      minDistance = distance;
      nearestLocation = location;
    }
  }

  return {
    ...nearestLocation,
    distance: minDistance,
  };
}
