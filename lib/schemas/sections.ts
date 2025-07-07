// lib/schemas/sections.ts
import { z } from 'zod';

// Base schemas
const CTASchema = z.object({
  text: z.string(),
  url: z.string()
});

const AddressSchema = z.object({
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string()
});

const ReviewSchema = z.object({
  rating: z.number().min(1).max(5),
  text: z.string(),
  author: z.string()
});

export const GeneralInfoSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  slug: z
    .string()
    .min(1, 'El slug es requerido')
    .regex(/^[a-z0-9-]+$/, 'Solo letras minúsculas, números y guiones')
    .refine((val) => !val.startsWith('-') && !val.endsWith('-'), 'No puede empezar o terminar con guión'),
  enabled: z.boolean().default(true).optional(),
  experiences: z.array(z.string()).default([]).optional(),
  timezone: z.string().optional(),
  telephone: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional()
});

// Hero Section
export const HeroContentSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  backgroundImage: z.string().optional(),
  description: z.string().optional(),
  contactInfo: z
    .object({
      address: z.string().optional(),
      phone: z.string().optional(),
      email: z.string().optional()
    })
    .optional(),
  floorplan: z
    .object({
      available: z.boolean(),
      url: z.string()
    })
    .optional(),
  cta: CTASchema.optional()
});

export const ActivityContentSchema = z.object({
  services: z.array(
    z.object({
      title: z.string(),
      subtitle: z.string().optional(),
      description: z.string(),
      highlights: z
        .array(
          z.object({
            label: z.string(),
            text: z.string()
          })
        )
        .optional(),
      primaryCta: CTASchema,
      secondaryCta: CTASchema.optional(),
      pricingLabel: z.string().optional(),
      pricing: z.array(z.string()).optional()
    })
  )
});

// Gallery Section
export const GalleryContentSchema = z.object({
  images: z.array(
    z.object({
      url: z.string(),
      alt: z.string(),
      caption: z.string().optional()
    })
  )
});

// Hours Section
export const HoursContentSchema = z.object({
  backgroundImage: z.string().optional(),
  address: AddressSchema,
  regularHours: z.array(
    z.object({
      days: z.string(),
      hours: z.string()
    })
  ),
  specialHours: z
    .array(
      z.object({
        description: z.string(),
        hours: z.string()
      })
    )
    .optional()
});

// Membership Section
export const MembershipContentSchema = z.object({
  backgroundImage: z.string().optional(),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  cta: CTASchema.optional(),
  benefits: z
    .array(
      z.object({
        title: z.string(),
        description: z.string()
      })
    )
    .optional(),
  pricing: z
    .object({
      monthlyPrice: z.string(),
      terms: z.string()
    })
    .optional(),
  form: z
    .object({
      submitText: z.string(),
      privacyText: z.string()
    })
    .optional(),
  giftCard: z
    .object({
      title: z.string(),
      buttonText: z.string(),
      url: z.string()
    })
    .optional()
});

// Instructors Section (previously Coaches)
export const InstructorsContentSchema = z.object({
  coaches: z.array(
    z.object({
      name: z.string(),
      title: z.string(),
      image: z.string(),
      description: z.string(),
      cta: CTASchema,
      bio: z.string().optional(),
      id: z.string()
    })
  ),
  bookLessonUrl: z.string(),
  learnMoreUrl: z.string()
});

// Multisport Section
export const MultisportContentSchema = z.object({
  backgroundImage: z.string().optional(),
  topBanner: z.string().optional(),
  slides: z.array(
    z.object({
      title: z.string(),
      subtitle: z.string().optional(),
      image: z.string(),
      description: z.string().optional(),
      cta: CTASchema.optional(),
      ctaText: z.string(),
      ctaUrl: z.string(),
      features: z.string().optional()
    })
  ),
  sports: z.array(
    z.object({
      id: z.string(),
      name: z.string()
    })
  )
});

// Duckpin Section
export const DuckpinContentSchema = z.object({
  backgroundImage: z.string().optional(),
  preTitle: z.string().optional(),
  title: z.string(),
  description: z.string(),
  callToAction: z.string().optional(),
  buttonText: z.string(),
  bookingUrl: z.string(),
  icons: z
    .array(
      z.object({
        url: z.string(),
        alt: z.string()
      })
    )
    .optional(),
  faqs: z
    .array(
      z.object({
        id: z.string(),
        question: z.string(),
        answer: z.string()
      })
    )
    .optional()
});

// Reviews Section
export const ReviewsContentSchema = z.object({
  title: z.string(),
  reviews: z.array(ReviewSchema),
  ctaText: z.string(),
  ctaUrl: z.string()
});

// Features Section
export const FeaturesContentSchema = z.object({
  features: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      ctaText: z.string(),
      ctaUrl: z.string(),
      neonColor: z.string()
    })
  )
});

// Footer Section
export const FooterContentSchema = z.object({
  newsletter: z.object({
    title: z.string(),
    locations: z.array(
      z.object({
        label: z.string(),
        value: z.string()
      })
    ),
    disclaimer: z.string()
  }),
  brand: z.object({
    tagline: z.string(),
    socialMedia: z.array(
      z.object({
        platform: z.string(),
        url: z.string()
      })
    )
  }),
  quickLinks: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
      url: z.string()
    })
  ),
  moreLinks: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
      url: z.string()
    })
  ),
  contact: z.object({
    email: z.string(),
    phone: z.string(),
    address: z.string()
  }),
  copyright: z.string()
});

// Union schema para todas las secciones
export const SectionContentSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('HERO'), content: HeroContentSchema }),
  z.object({ type: z.literal('ACTIVITIES'), content: ActivityContentSchema }),
  z.object({ type: z.literal('GALLERY'), content: GalleryContentSchema }),
  z.object({ type: z.literal('HOURS'), content: HoursContentSchema }),
  z.object({ type: z.literal('MEMBERSHIP'), content: MembershipContentSchema }),
  z.object({ type: z.literal('INSTRUCTORS'), content: InstructorsContentSchema }),
  z.object({ type: z.literal('MULTISPORT'), content: MultisportContentSchema }),
  z.object({ type: z.literal('DUCKPIN'), content: DuckpinContentSchema }),
  z.object({ type: z.literal('REVIEWS'), content: ReviewsContentSchema }),
  z.object({ type: z.literal('FEATURES'), content: FeaturesContentSchema }),
  z.object({ type: z.literal('FOOTER'), content: FooterContentSchema })
]);

// Helper para validar por tipo de sección
export const getSectionContentSchema = (sectionType: string) => {
  switch (sectionType) {
    case 'HERO':
      return HeroContentSchema;
    case 'ACTIVITIES':
      return ActivityContentSchema;
    case 'GALLERY':
      return GalleryContentSchema;
    case 'HOURS':
      return HoursContentSchema;
    case 'MEMBERSHIP':
      return MembershipContentSchema;
    case 'INSTRUCTORS':
      return InstructorsContentSchema;
    case 'MULTISPORT':
      return MultisportContentSchema;
    case 'DUCKPIN':
      return DuckpinContentSchema;
    case 'REVIEWS':
      return ReviewsContentSchema;
    case 'FEATURES':
      return FeaturesContentSchema;
    case 'FOOTER':
      return FooterContentSchema;
    default:
      throw new Error(`Unknown section type: ${sectionType}`);
  }
};

// Export de tipos TypeScript inferidos
export type HeroContent = z.infer<typeof HeroContentSchema>;
export type ActivityContent = z.infer<typeof ActivityContentSchema>;
export type GalleryContent = z.infer<typeof GalleryContentSchema>;
export type HoursContent = z.infer<typeof HoursContentSchema>;
export type MembershipContent = z.infer<typeof MembershipContentSchema>;
export type InstructorsContent = z.infer<typeof InstructorsContentSchema>;
export type MultisportContent = z.infer<typeof MultisportContentSchema>;
export type DuckpinContent = z.infer<typeof DuckpinContentSchema>;
export type ReviewsContent = z.infer<typeof ReviewsContentSchema>;
export type FeaturesContent = z.infer<typeof FeaturesContentSchema>;
export type FooterContent = z.infer<typeof FooterContentSchema>;
export type GeneralInfo = z.infer<typeof GeneralInfoSchema>;

export type SectionContent = z.infer<typeof SectionContentSchema>;
