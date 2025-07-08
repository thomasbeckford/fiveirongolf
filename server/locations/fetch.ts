'use server';
import { prisma } from '@/lib/prisma';

// const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchLocation = async (slug: string) => {
  try {
    // await sleep(4000);
    const location = await prisma.location.findUnique({
      where: { slug },
      include: {
        sections: true,
        seo: true
      }
    });

    return location;
  } catch (err) {
    return false;
  }
};
