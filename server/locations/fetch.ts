'use server';
import { prisma } from '@/lib/prisma';

// const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchLocation = async (slug: string) => {
  try {
    console.log('Fetching location', slug);

    // await sleep(4000);
    const location = await prisma.location.findUnique({
      where: { slug },
      include: {
        sections: true,
        seo: true
      }
    });

    console.log('Location fetched', location);

    return location;
  } catch (err) {
    console.log('Error fetching location', err);
    return false;
  }
};
