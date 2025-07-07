'use server';
import { prisma } from '@/lib/prisma';
import { Section } from '@/lib/generated/prisma';

type UpdateLocationData = {
  name: string;
  slug: string;
  enabled: boolean;
  timezone: string;
  telephone: string;
  experiences: string[];
  seoTitle: string;
  seoDescription: string;
  sections: Section[];
};

export const updateLocation = async (id: string, locationData: UpdateLocationData) => {
  try {
    await prisma.location.update({
      where: { id: id },
      data: {
        name: locationData.name,
        slug: locationData.slug,
        enabled: locationData.enabled,
        timezone: locationData.timezone,
        telephone: locationData.telephone,
        experiences: locationData.experiences,
        updatedAt: new Date()
      }
    });

    if (locationData.seoTitle || locationData.seoDescription) {
      await prisma.seo.update({
        where: { locationId: id },
        data: {
          title: locationData.seoTitle ?? '',
          description: locationData.seoDescription ?? ''
        }
      });
    }
    return true;
  } catch (err) {
    return false;
  }
};
