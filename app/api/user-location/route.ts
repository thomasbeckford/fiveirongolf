import { geolocation } from "@vercel/functions";

export function GET(request: Request) {
  try {
    const details = geolocation(request);
    if (process.env.NODE_ENV === "development") {
      return Response.json({
        city: "Lambeth",
        country: "GB",
        flag: "🇬🇧",
        countryRegion: "ENG",
        region: "lhr1",
        latitude: "51.4667",
        longitude: "-0.1118",
        postalCode: "SW2",
      });
    }
    return Response.json(details);
  } catch (error) {
    console.error("Error getting location by Vercel function:", error);
    return Response.json(
      { error: "No se pudo obtener la ubicación" },
      { status: 500 }
    );
  }
}
