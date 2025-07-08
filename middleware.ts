import { geolocation } from '@vercel/functions';
import { NextRequest, NextResponse } from 'next/server';
import { regions, getBestLocale, getAllLocaleRoutes } from './data/regions';

export function middleware(request: NextRequest) {
  try {
    const defaultCountry = 'GB';
    const data = geolocation(request);
    const country = data.country || defaultCountry;

    const { pathname } = request.nextUrl;

    // if /studio
    if (pathname.startsWith('/studio')) {
      return NextResponse.next();
    }

    // if /admin
    if (pathname.startsWith('/admin')) {
      return NextResponse.next();
    }

    // Debug en desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.log(`🌍 Country detected: ${country}, Path: ${pathname}`);
    }

    // Si ya está en select-region, continuar
    if (pathname.startsWith('/select-region')) {
      return NextResponse.next();
    }

    // Opción 1: Validar rutas simples (como antes)
    const validCountrySlugs = Object.values(regions);
    const hasValidCountryPrefix = validCountrySlugs.some(
      (slug) => pathname.startsWith(`/${slug}/`) || pathname === `/${slug}`
    );

    // Opción 2: Validar rutas con locale (nueva funcionalidad)
    const validLocaleRoutes = getAllLocaleRoutes();
    const hasValidLocalePrefix = validLocaleRoutes.some(
      (route) => pathname.startsWith(`/${route}/`) || pathname === `/${route}`
    );

    // Si ya tiene un prefijo válido (país o locale), continuar
    if (hasValidCountryPrefix || hasValidLocalePrefix) {
      return NextResponse.next();
    }

    // Si país NO soportado → redirect a selector
    if (!country || !regions[country]) {
      const url = new URL('/select-region', request.url);
      return NextResponse.redirect(url);
    }

    // Si país soportado → decidir qué estrategia usar
    const countrySlug = regions[country];

    // Estrategia 1: Solo país (como antes)
    const simpleRedirectPath = pathname === '/' ? `/${countrySlug}` : `/${countrySlug}${pathname}`;

    // Estrategia 2: País + locale (nueva)
    const acceptLang = request.headers.get('accept-language');
    const userLang = acceptLang?.split(',')[0]?.split('-')[0] || 'en';
    const bestLocale = getBestLocale(country, userLang);
    const localeRedirectPath =
      pathname === '/' ? `/${bestLocale}-${countrySlug}` : `/${bestLocale}-${countrySlug}${pathname}`;

    // Decidir qué estrategia usar basado en una feature flag o config
    const useLocaleRoutes = process.env.NEXT_PUBLIC_USE_LOCALE_ROUTES === 'true';

    const finalRedirectPath = useLocaleRoutes ? localeRedirectPath : simpleRedirectPath;
    const url = new URL(finalRedirectPath, request.url);

    if (process.env.NODE_ENV === 'development') {
      console.log(`🔄 Redirecting to: ${finalRedirectPath}`);
      console.log(`📍 User language: ${userLang}, Best locale: ${bestLocale}`);
    }

    return NextResponse.redirect(url);
  } catch (error) {
    // Fallback en caso de error
    console.error('Middleware error:', error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (.png, .jpg, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'
  ]
};
