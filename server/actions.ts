'use server';

import { Location } from '@/payload/generated-types';
import { getPayload } from 'payload';
import config from '@/payload.config';

export async function getLocations(
  page: number = 1,
  limit: number = 9
): Promise<{ docs: Location[]; hasNextPage: boolean; hasPrevPage: boolean; totalPages: number; totalDocs: number }> {
  try {
    const payload = await getPayload({ config });

    const result = await payload.find({
      collection: 'locations',
      pagination: true,
      page,
      limit,
      depth: 2
    });

    if (!result) {
      throw new Error('Failed to fetch locations');
    }

    return {
      docs: result.docs as Location[],
      hasNextPage: result.hasNextPage,
      hasPrevPage: result.hasPrevPage,
      totalPages: result.totalPages,
      totalDocs: result.totalDocs
    };
  } catch (error) {
    console.error('Error fetching locations:', error);
    return {
      docs: [],
      hasNextPage: false,
      hasPrevPage: false,
      totalPages: 0,
      totalDocs: 0
    };
  }
}

export async function getLocationBySlug(slug: string): Promise<Location | null> {
  try {
    const payload = await getPayload({ config });

    const result = await payload.find({
      collection: 'locations',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 2
    });

    return result.docs[0] || null;
  } catch (error) {
    console.error('Error fetching location by slug:', error);
    return null;
  }
}
