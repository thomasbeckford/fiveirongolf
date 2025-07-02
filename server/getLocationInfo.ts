import { MOCK_GOLF_LOCATIONS } from "@/data/locations";

export const getLocationInfo = async ({ slug }: { slug: string }) => {
  const location = MOCK_GOLF_LOCATIONS.find(
    (location) => location.urlSlug === slug
  );
  if (!location) {
    throw new Error(`Location ${slug} not found`);
  }
  return location;
};
