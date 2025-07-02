// data/regions.ts

export interface Locale {
  code: string;
  name: string;
  flag: string;
  isDefault?: boolean;
}

export interface Country {
  code: string;
  slug: string;
  name: string;
  flag: string;
  locales: Locale[];
  currency: string;
  timezone: string;
}

export interface Region {
  title: string;
  countries: Country[];
}

// Mapeo simple para backward compatibility
export const regions: Record<string, string> = {
  US: "us",
  MX: "mx",
  CO: "co",
  AT: "at",
  GB: "uk",
  DE: "de",
  PT: "pt",
  ES: "es",
  AE: "ae",
  ID: "id",
  CN: "cn",
  TH: "th",
  AU: "au",
};

// Configuración completa con locales
export const regionDetails: Record<string, Region> = {
  NORTH_AMERICA: {
    title: "North America",
    countries: [
      {
        code: "US",
        slug: "us",
        name: "United States",
        flag: "🇺🇸",
        currency: "USD",
        timezone: "America/New_York",
        locales: [
          { code: "en", name: "English", flag: "🇺🇸", isDefault: true },
          { code: "es", name: "Español", flag: "🇪🇸" },
        ],
      },
      {
        code: "MX",
        slug: "mx",
        name: "Mexico",
        flag: "🇲🇽",
        currency: "MXN",
        timezone: "America/Mexico_City",
        locales: [
          { code: "es", name: "Español", flag: "🇲🇽", isDefault: true },
          { code: "en", name: "English", flag: "🇺🇸" },
        ],
      },
    ],
  },
  SOUTH_AMERICA: {
    title: "South America",
    countries: [
      {
        code: "CO",
        slug: "co",
        name: "Colombia",
        flag: "🇨🇴",
        currency: "COP",
        timezone: "America/Bogota",
        locales: [
          { code: "es", name: "Español", flag: "🇨🇴", isDefault: true },
          { code: "en", name: "English", flag: "🇺🇸" },
        ],
      },
    ],
  },
  EUROPE: {
    title: "Europe",
    countries: [
      {
        code: "AT",
        slug: "at",
        name: "Austria",
        flag: "🇦🇹",
        currency: "EUR",
        timezone: "Europe/Vienna",
        locales: [
          { code: "de", name: "Deutsch", flag: "🇦🇹", isDefault: true },
          { code: "en", name: "English", flag: "🇺🇸" },
        ],
      },
      {
        code: "GB",
        slug: "uk",
        name: "United Kingdom",
        flag: "🇬🇧",
        currency: "GBP",
        timezone: "Europe/London",
        locales: [{ code: "en", name: "English", flag: "🇬🇧", isDefault: true }],
      },
      {
        code: "DE",
        slug: "de",
        name: "Germany",
        flag: "🇩🇪",
        currency: "EUR",
        timezone: "Europe/Berlin",
        locales: [
          { code: "de", name: "Deutsch", flag: "🇩🇪", isDefault: true },
          { code: "en", name: "English", flag: "🇺🇸" },
        ],
      },
      {
        code: "PT",
        slug: "pt",
        name: "Portugal",
        flag: "🇵🇹",
        currency: "EUR",
        timezone: "Europe/Lisbon",
        locales: [
          { code: "pt", name: "Português", flag: "🇵🇹", isDefault: true },
          { code: "en", name: "English", flag: "🇺🇸" },
        ],
      },
      {
        code: "ES",
        slug: "es",
        name: "Spain",
        flag: "🇪🇸",
        currency: "EUR",
        timezone: "Europe/Madrid",
        locales: [
          { code: "es", name: "Español", flag: "🇪🇸", isDefault: true },
          { code: "en", name: "English", flag: "🇺🇸" },
        ],
      },
    ],
  },
  MIDDLE_EAST: {
    title: "Middle East",
    countries: [
      {
        code: "AE",
        slug: "ae",
        name: "U.A.E.",
        flag: "🇦🇪",
        currency: "AED",
        timezone: "Asia/Dubai",
        locales: [
          { code: "en", name: "English", flag: "🇺🇸", isDefault: true },
          { code: "ar", name: "العربية", flag: "🇦🇪" },
        ],
      },
    ],
  },
  ASIA: {
    title: "Asia",
    countries: [
      {
        code: "ID",
        slug: "id",
        name: "Indonesia",
        flag: "🇮🇩",
        currency: "IDR",
        timezone: "Asia/Jakarta",
        locales: [
          { code: "id", name: "Bahasa Indonesia", flag: "🇮🇩", isDefault: true },
          { code: "en", name: "English", flag: "🇺🇸" },
        ],
      },
      {
        code: "CN",
        slug: "cn",
        name: "Mainland China",
        flag: "🇨🇳",
        currency: "CNY",
        timezone: "Asia/Shanghai",
        locales: [
          { code: "zh", name: "中文", flag: "🇨🇳", isDefault: true },
          { code: "en", name: "English", flag: "🇺🇸" },
        ],
      },
      {
        code: "TH",
        slug: "th",
        name: "Thailand",
        flag: "🇹🇭",
        currency: "THB",
        timezone: "Asia/Bangkok",
        locales: [
          { code: "th", name: "ไทย", flag: "🇹🇭", isDefault: true },
          { code: "en", name: "English", flag: "🇺🇸" },
        ],
      },
    ],
  },
  OCEANIA: {
    title: "Oceania",
    countries: [
      {
        code: "AU",
        slug: "au",
        name: "Australia",
        flag: "🇦🇺",
        currency: "AUD",
        timezone: "Australia/Sydney",
        locales: [{ code: "en", name: "English", flag: "🇦🇺", isDefault: true }],
      },
    ],
  },
};

// Utilidades para trabajar con locales
export function getCountryByCode(countryCode: string): Country | undefined {
  for (const region of Object.values(regionDetails)) {
    const country = region.countries.find((c) => c.code === countryCode);
    if (country) return country;
  }
  return undefined;
}

export function getSupportedLocales(countryCode: string): string[] {
  const country = getCountryByCode(countryCode);
  return country?.locales.map((l) => l.code) || ["en"];
}

export function getDefaultLocale(countryCode: string): string {
  const country = getCountryByCode(countryCode);
  const defaultLocale = country?.locales.find((l) => l.isDefault);
  return defaultLocale?.code || "en";
}

export function getBestLocale(countryCode: string, userLang: string): string {
  const supportedLocales = getSupportedLocales(countryCode);

  // Si el idioma del usuario está soportado, usarlo
  if (supportedLocales.includes(userLang)) {
    return userLang;
  }

  // Si no, usar el default del país
  return getDefaultLocale(countryCode);
}

// Para generar todas las posibles rutas
export function getAllLocaleRoutes(): string[] {
  const routes: string[] = [];

  for (const region of Object.values(regionDetails)) {
    for (const country of region.countries) {
      for (const locale of country.locales) {
        routes.push(`${locale.code}-${country.slug}`);
      }
    }
  }

  return routes;
}

// Ejemplo de uso:
// getAllLocaleRoutes() retorna: ['en-us', 'es-us', 'es-mx', 'en-mx', 'es-co', ...]
