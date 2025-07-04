"use client";

import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LOCATIONS_CONTENT } from "@/data/locations-content";

export function LocationSelect() {
  const router = useRouter();

  const handleLocationChange = (slug: string) => {
    router.push(`/locations/${slug}`);
  };

  return (
    <Select onValueChange={handleLocationChange}>
      <SelectTrigger size="lg" className="bg-primary text-black uppercase ">
        <SelectValue placeholder="Select your location" />
      </SelectTrigger>
      <SelectContent>
        {LOCATIONS_CONTENT.map((location) => (
          <SelectItem key={location.id} value={location.slug}>
            {location.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
