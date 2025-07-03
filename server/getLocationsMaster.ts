import { LOCATIONS_MASTER } from "@/data/locations-master";

export const getLocationsMaster = async ({ slug }: { slug: string }) => {
  const location = LOCATIONS_MASTER.find(
    (location) => location.urlSlug === slug
  );
  if (!location) {
    throw new Error(`Location ${slug} not found`);
  }
  return location;
};
