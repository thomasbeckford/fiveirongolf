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
    console.log("Change route", slug);
    router.push(`/locations/${slug}`);
  };

  return (
    <Select onValueChange={handleLocationChange}>
      <SelectTrigger size="lg" primary>
        <SelectValue placeholder="Choose location" />
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
