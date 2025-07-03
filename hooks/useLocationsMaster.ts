// hooks/useLocations.ts
import { useState, useEffect } from "react";
import { ILocationMaster } from "@/types/location";

export function useLocationsMaster() {
  const [locationsByCity, setLocationsByCity] = useState<
    Record<string, ILocationMaster[]>
  >({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLocations = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/locations");
      if (!response.ok) throw new Error("Failed to fetch locations");
      const data = await response.json();
      setLocationsByCity(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return {
    locationsByCity,
    loading,
    error,
    refetch: fetchLocations,
  };
}
