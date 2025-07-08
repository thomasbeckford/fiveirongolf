'use server';
import { prisma } from '@/lib/prisma';

// const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchLocations = async () => {
  try {
    // await sleep(4000);

    const locations = await prisma.location.findMany({
      orderBy: { name: 'asc' },
      include: {
        sections: true,
        seo: true
      }
    });

    return locations;
  } catch (err) {
    console.log('Error', err);
    return [];
  }
};
