import { LOCATIONS_CONTENT } from "@/data/locations-content";
import { LOCATIONS_MASTER } from "@/data/locations-master";
import { LOCATIONS_DEFAULT } from "@/data/locations-default";
import { merge } from "lodash";
import { prisma } from "@/lib/prisma";

function mergeWithDefaults(override: any) {
  return merge({}, LOCATIONS_DEFAULT, override);
}

export const getLocationsContent = async ({ slug }: { slug: string }) => {
  const locationOverride = await prisma.location.findUnique({
    where: {
      slug,
    },
  });

  if (!locationOverride) {
    return null;
  }

  // Mergear con defaults antes de retornar
  return mergeWithDefaults(locationOverride);
};
