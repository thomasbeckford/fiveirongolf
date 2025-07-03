// types/location.ts

export interface ILocationMaster {
  id: string;
  name: string;
  slug: string;
  status: string;
  seo: {
    title: string;
    description: string;
  };
  mboId: number;
  siteId: number;
  telephone: string;
  latitude: string;
  longitude: string;
  experiences: string[];
  promotions: string[];
  urlSlug: string;
  waiverUrl: string;
  calendarUrl: string;
  enableAppointmentReminders: boolean;
  enableS2SBooking: boolean;
  s2sReservationFee: number | null;
  squareId: string;
  squareCredentialsId: string;
  foodOrderAvailability: string;
  membershipConfig: {
    freeMembershipMinutes: number;
  };
  timezone: string;
  distance?: number;
  source?: "gps" | "ip";
}

export interface ILocationContent {
  id: string;
  name: string;
  slug: string;
  status: string;
  seo: {
    title: string;
    description: string;
  };
  sections: {
    hero: IHeroSection;
    playAndPractice: IPlayAndPracticeSection;
    gallery: IGallerySection;
    hours: IHoursSection;
    membership: IMembershipSection;
    reviews: IReviewsSection;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IFeaturesSection {
  hidden?: boolean;
  features: Array<{
    id: string;
    title: string;
    description: string;
    neonColor: string;
    ctaText: string;
    ctaUrl: string;
  }>;
}

export interface IReviewsSection {
  hidden: boolean;
  title: string;
  reviews: Array<{
    rating: number;
    text: string;
    author: string;
  }>;
  ctaText: string;
  ctaUrl: string;
}

export interface IDuckpinSection {
  hidden?: boolean;
  backgroundImage: string;
  icons?: Array<{
    url: string;
    alt: string;
  }>;
  preTitle: string;
  title: string;
  description: string;
  callToAction: string;
  buttonText: string;
  bookingUrl: string;
  faqs: Array<{
    id: string;
    question: string;
    answer: string;
  }>;
}
export interface IMultisportSection {
  hidden?: boolean;
  topBanner: string;
  slides: Array<{
    id: string;
    title: string;
    subtitle: string;
    description: string;
    features?: string;
    image: string;
    ctaText: string;
    ctaUrl: string;
  }>;
  sports: Array<{
    id: string;
    name: string;
  }>;
}

export interface ICoachesSection {
  hidden?: boolean;
  title?: string;
  coaches: Array<{
    id: string;
    name: string;
    title: string;
    image?: string;
    bio?: string;
  }>;
  bookLessonUrl: string;
  learnMoreUrl: string;
}

export interface IHeroSection {
  hidden: boolean;
  backgroundImage: string;
  title: string;
  subtitle: string;
  description: string;
  contactInfo: {
    address: string;
    phone: string;
    email: string;
  };
  floorplan: {
    available: boolean;
    url: string;
  };
  cta: {
    text: string;
    url: string;
  };
}

export interface IPlayAndPracticeSection {
  hidden?: boolean;
  services?: Array<{
    title: string;
    subtitle?: string;
    description: string;
    highlights?: Array<{
      label: string;
      text: string;
    }>;
    pricing?: string[];
    pricingLabel?: string;
    primaryCta: {
      text: string;
      url: string;
    };
    secondaryCta?: {
      text: string;
      url: string;
    };
  }>;
}

export interface IGallerySection {
  hidden: boolean;
  images: Array<{
    url: string;
    alt: string;
    caption: string;
  }>;
}

export interface IHoursSection {
  hidden: boolean;
  backgroundImage: string;
  title: string;
  regularHours: Array<{
    days: string;
    hours: string;
  }>;
  specialHours: Array<{
    description: string;
    hours: string;
  }>;
}

export interface IMembershipSection {
  hidden?: boolean;
  giftCard?: {
    title: string;
    buttonText: string;
    url: string;
  };
  backgroundImage: string;
  title: string;
  subtitle: string;
  description: string;
  pricing: {
    monthlyPrice: string;
    terms: string;
  };
  benefits: Array<{
    title: string;
    description: string;
  }>;
  form: {
    privacyText: string;
    submitText: string;
  };
}

export interface IReviewsSection {
  hidden: boolean;
  title: string;
  items: Array<{
    name: string;
    initial: string;
    review: string;
    rating: number;
  }>;
}

export interface IFooterSection {
  newsletter: {
    title: string;
    locations: Array<{
      label: string;
      value: string;
    }>;
    disclaimer: string;
  };
  brand: {
    tagline: string;
    socialMedia: Array<{
      platform: "instagram" | "twitter" | "youtube";
      url: string;
    }>;
  };
  quickLinks: Array<{
    label: string;
    url: string;
  }>;
  moreLinks: Array<{
    label: string;
    url: string;
  }>;
  contact: {
    email: string;
    phone: string;
  };
  copyright: string;
}

export interface UserLocation {
  lat: number;
  lng: number;
  source: "gps" | "ip";
}

export interface GeolocationState {
  location: UserLocation | null;
  error: string | null;
  loading: boolean;
}

export interface LocationWithDistance extends ILocationMaster {
  distance: number;
  formattedDistance: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}
