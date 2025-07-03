import { LOCATIONS_CONTENT } from "@/data/locations-content";
import { LOCATIONS_MASTER } from "@/data/locations-master";
import { LOCATIONS_DEFAULT } from "@/data/locations-default";
import { merge } from "lodash";

function mergeWithDefaults(override: any) {
  return merge({}, LOCATIONS_DEFAULT, override);
}

export const getLocationsContent = async ({ slug }: { slug: string }) => {
  const locationOverride = LOCATIONS_CONTENT.find(
    (location) => location.slug === slug
  );

  if (!locationOverride) {
    return null;
  }

  // Mergear con defaults antes de retornar
  return mergeWithDefaults(locationOverride);
};
