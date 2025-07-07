'use server';
import { prisma } from '@/lib/prisma';

export const fetchLocation = async (slug: string) => {
  try {
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
