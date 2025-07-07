'use server';
import { prisma } from '@/lib/prisma';

export const fetchLocations = async () => {
  try {
    console.log('Entra');
    const locations = await prisma.location.findMany({
      orderBy: { name: 'asc' },
      include: {
        sections: true,
        seo: true
      }
    });

    console.log('Sale', locations);
    return locations;
  } catch (err) {
    console.log('Error', err);
    return [];
  }
};
