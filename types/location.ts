// types/location.ts
export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Location {
  id: string;
  mboId: number;
  name: string;
  siteId: number;
  telephone: string;
  latitude: string; // Tu API devuelve string
  longitude: string; // Tu API devuelve string
  experiences: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  promotions: any[];
  urlSlug: string;
  waiverUrl: string;
  calendarUrl: string;
  enableAppointmentReminders: boolean;
  enableS2SBooking: boolean;
  s2sReservationFee: null;
  squareId: string;
  squareCredentialsId: string;
  foodOrderAvailability: string;
  membershipConfig: {
    freeMembershipMinutes: number;
  };
  timezone: string;

  // Campos agregados para cálculos
  distance?: number;
}

export interface UserLocation extends Coordinates {
  source: "gps" | "ip" | "manual";
}

export interface LocationData {
  [city: string]: Location[];
}

export interface GeolocationState {
  location: UserLocation | null;
  error: string | null;
  loading: boolean;
}
