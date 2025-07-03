import { LOCATIONS_CONTENT } from "@/data/locations-content";
import { LOCATIONS_MASTER } from "@/data/locations-master";
import { LOCATIONS_DEFAULT } from "@/data/locations-default";
import { merge } from "lodash";

export const getLocationBookingInfo = async ({ slug }: { slug: string }) => {
  const location = LOCATIONS_MASTER.find(
    (location) => location.urlSlug === slug
  );
  if (!location) {
    throw new Error(`Location ${slug} not found`);
  }
  return location;
};

function mergeWithDefaults(override) {
  return merge({}, LOCATIONS_DEFAULT, override);
}

export const getLocationSection = async ({ slug }: { slug: string }) => {
  const locationOverride = LOCATIONS_CONTENT.find(
    (location) => location.slug === slug
  );

  if (!locationOverride) {
    return null;
  }

  // Mergear con defaults antes de retornar
  return mergeWithDefaults(locationOverride);
};
