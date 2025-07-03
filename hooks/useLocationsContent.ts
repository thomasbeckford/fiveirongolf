// hooks/useLocations.ts
import { useState, useEffect } from "react";
import { ILocationContent } from "@/types/location";

export function useLocationsContent() {
  const [locations, setLocations] = useState<ILocationContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLocations = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/locations");
      if (!response.ok) throw new Error("Failed to fetch locations");
      const data = await response.json();
      setLocations(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const createLocation = async (
    locationData: Omit<ILocationContent, "id" | "createdAt" | "updatedAt">
  ) => {
    try {
      const response = await fetch("/api/locations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(locationData),
      });
      if (!response.ok) throw new Error("Failed to create location");
      await fetchLocations();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      return false;
    }
  };

  const updateLocation = async (
    id: string,
    locationData: Partial<ILocationContent>
  ) => {
    try {
      const response = await fetch(`/api/locations/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(locationData),
      });
      if (!response.ok) throw new Error("Failed to update location");
      await fetchLocations();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      return false;
    }
  };

  const deleteLocation = async (id: string) => {
    try {
      const response = await fetch(`/api/locations/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete location");
      await fetchLocations();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      return false;
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return {
    locations,
    loading,
    error,
    refetch: fetchLocations,
    createLocation,
    updateLocation,
    deleteLocation,
  };
}
