'use client';

import { useState, useEffect } from 'react';

type GeolocationState = {
  location: UserLocation | null;
  error: string | null;
  loading: boolean;
};
type UserLocation = {
  lat: number;
  lng: number;
  source: 'ip' | 'gps';
};

export function useGeolocation(): GeolocationState & {
  requestPermission: () => void;
} {
  const [state, setState] = useState<GeolocationState>({
    location: null,
    error: null,
    loading: true
  });

  const getLocationByVercel = async (): Promise<UserLocation | null> => {
    try {
      const response = await fetch('/api/user-location');
      if (!response.ok) throw new Error('Failed to get Vercel location');

      const data = await response.json();
      return {
        lat: data.latitude,
        lng: data.longitude,
        source: 'ip'
      };
    } catch (error) {
      console.error('Error getting location by Vercel:', error);
      return null;
    }
  };

  const getCurrentPosition = (): Promise<UserLocation> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocalización no soportada'));
        return;
      }

      const options: PositionOptions = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 300000 // 5 minutos
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            source: 'gps'
          });
        },
        reject,
        options
      );
    });
  };

  const attemptGeolocation = async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      // 1. Vercel primero (instantáneo y confiable)
      const vercelLocation = await getLocationByVercel();
      if (vercelLocation) {
        setState({
          location: vercelLocation,
          error: null,
          loading: false
        });
        return;
      }

      // 2. Si Vercel falla, intentar GPS para mayor precisión
      const gpsLocation = await getCurrentPosition();
      setState({
        location: gpsLocation,
        error: null,
        loading: false
      });
    } catch (gpsError) {
      console.error('Error getting location by GPS:', gpsError);
      // 3. Si todo falla, mostrar error pero ofrecer selección manual
      setState({
        location: null,
        error: 'No se pudo determinar la ubicación automáticamente',
        loading: false
      });
    }
  };

  const requestGPSPermission = async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const gpsLocation = await getCurrentPosition();
      setState({
        location: gpsLocation,
        error: null,
        loading: false
      });
    } catch (error) {
      console.error('Error getting location by GPS:', error);
      setState((prev) => ({
        ...prev,
        error: 'No se pudo acceder al GPS. Usando ubicación aproximada.',
        loading: false
      }));
    }
  };

  useEffect(() => {
    attemptGeolocation();
  }, []);

  return {
    ...state,
    requestPermission: requestGPSPermission
  };
}
