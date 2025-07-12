// collections/Locations.ts
import { CollectionConfig } from 'payload';
import { ActivitySchema } from './schemas/ActivitySchema';
import { HoursSchema } from './schemas/HoursSchema';
import { MembershipSchema } from './schemas/MembershipSchema';
import { SeoSchema } from './schemas/SeoSchema';
import { HeroSchema } from './schemas/HeroSchema';
import { GallerySchema } from './schemas/GallerySchema';
import { FeaturesSchema } from './schemas/FeaturesSchema';
import { ReviewSchema } from './schemas/ReviewSchema';
import { MultisportSchema } from './schemas/MultisportSchema';
import { DuckpinSchema } from './schemas/DuckpinSchema';
import { InstructorSchema } from './schemas/InstructorSchema';
import { FooterSchema } from './schemas/FooterSchema';
import { GeneralSchema } from './schemas/GeneralSchema';

const Locations: CollectionConfig = {
  slug: 'locations',
  labels: {
    singular: 'Location',
    plural: 'Locations'
  },
  // admin: {
  //   defaultColumns: ['name', 'status', 'address', 'updatedAt'],
  //   useAsTitle: 'name',
  //   group: 'Content'
  // },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user)
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        GeneralSchema,
        SeoSchema,
        HeroSchema,
        ActivitySchema,
        HoursSchema,
        MembershipSchema,
        GallerySchema,
        FeaturesSchema,
        ReviewSchema,
        MultisportSchema,
        DuckpinSchema,
        InstructorSchema,
        FooterSchema
      ]
    }
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data.name && !data.slug) {
          data.slug = data.name
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .trim();
        }
        return data;
      }
    ]
  }
};

export default Locations;
