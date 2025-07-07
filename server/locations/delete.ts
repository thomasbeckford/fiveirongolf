'use server';
import { prisma } from '@/lib/prisma';

export const deleteLocation = async (id: string) => {
  try {
    await prisma.location.delete({
      where: { id: id }
    });
    return true;
  } catch (err) {
    return false;
  }
};
