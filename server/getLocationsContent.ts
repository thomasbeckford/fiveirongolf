import { LOCATIONS_DEFAULT } from "@/data/locations-content-default";
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
