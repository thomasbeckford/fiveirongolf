// hooks/useLocations.ts
import { useState, useEffect } from 'react';
import { ILocation } from '@/types/location';
import { fetchLocations } from '@/server/locations/fetchAll';

export function useLocations() {
  const [locations, setLocations] = useState<ILocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getLocations = async () => {
    try {
      setLoading(true);
      const data = await fetchLocations();
      setLocations(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocations();
  }, []);

  return {
    locations,
    loading,
    error
  };
}
