import { MOCK_GOLF_LOCATIONS } from "@/data/locations";

export async function GET() {
  if (process.env.NODE_ENV === "development") {
    return Response.json({ locations: MOCK_GOLF_LOCATIONS });
  }

  const fetchLocations = async () => {
    const response = await fetch(
      "https://api.booking.fiveirongolf.com/locations"
    );
    const data = await response.json();
    return data;
  };
  const locations = await fetchLocations();

  return Response.json({
    locations,
  });
}
