'use server';
import { prisma } from '@/lib/prisma';
import { ILocation } from '@/types/location';

// const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchLocations = async () => {
  try {
    // await sleep(4000);

    const londonLocation = {
      id: 1,
      name: 'Soho - London',
      slug: 'soho-london',
      address: '123 Main St',
      city: 'London',
      state: 'London',
      zip: 'EC2A 4AY',
      country: 'United Kingdom',
      latitude: '51.5074',
      longitude: '-0.1278',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
      enabled: true,
      timezone: 'UTC',
      telephone: '123-456-7890',
      experiences: ['golf', 'tennis']
    } as unknown as ILocation;

    const locations = await prisma.location.findMany({
      orderBy: { name: 'asc' },
      include: {
        sections: true,
        seo: true
      }
    });

    return [...locations, londonLocation];
  } catch (err) {
    console.log('Error', err);
    return [];
  }
};
