// hooks/useLocations.ts
import { useState, useEffect } from 'react';
import { getLocations } from '@/server/api';
import { Location } from '@/payload/generated-types';

export function useLocations() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getLocationsData = async () => {
    try {
      setLoading(true);
      const data = await getLocations();
      setLocations(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocationsData();
  }, []);

  return {
    locations,
    loading,
    error
  };
}
