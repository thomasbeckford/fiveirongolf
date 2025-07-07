'use server';
import { prisma } from '@/lib/prisma';
import { ILocation } from '@/types/location';

export const createLocation = async (locationData: ILocation) => {
  try {
    const location = await prisma.location.create({
      data: {
        name: locationData.name,
        slug: locationData.slug,
        enabled: locationData.enabled || false,
        latitude: locationData.latitude,
        longitude: locationData.longitude,
        experiences: locationData.experiences || []
      }
    });

    for (const section of locationData.sections) {
      await prisma.section.create({
        data: {
          page: section.page,
          enabled: section.enabled,
          locationId: location.id,
          content: section.content || {}
        }
      });
    }

    if (locationData.seo) {
      await prisma.seo.create({
        data: {
          title: locationData.seo.title,
          description: locationData.seo.description,
          locationId: location.id
        }
      });
    }

    return location;
  } catch (err) {
    return false;
  }
};
