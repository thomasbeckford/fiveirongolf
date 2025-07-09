'use server';

import { Location } from '@/payload/generated-types';
import { getPayload } from 'payload';
import config from '@/payload.config';

export async function getLocations(): Promise<Location[]> {
  try {
    const response = await fetch('http://localhost:3000/api/locations?depth=2');

    if (!response.ok) {
      throw new Error('Failed to fetch locations');
    }

    const data = await response.json();
    return data.docs; // ✅ Correcto - devuelve el array completo
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
