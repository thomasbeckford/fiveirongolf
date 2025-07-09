'use server';

import { Location } from '@/payload/generated-types';
import { getPayload } from 'payload';
import config from '@/payload.config';

export async function getLocations(): Promise<Location[]> {
  try {
    const payload = await getPayload({ config });

    const result = await payload.find({
      collection: 'locations',
      depth: 2
    });

    if (!result) {
      throw new Error('Failed to fetch locations');
    }

    return result.docs;
  } catch (error) {
    console.error('Error fetching locations:', error);
    return [];
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
