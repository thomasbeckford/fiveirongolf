import { Section } from '@/lib/generated/prisma';
import { Seo } from '@/lib/generated/prisma';
import { Location } from '@/lib/generated/prisma';

export interface ILocation extends Location {
  sections: Section[];
  seo: Seo | null;
}
