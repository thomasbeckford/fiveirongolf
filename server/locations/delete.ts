'use server';
import { prisma } from '@/lib/prisma';

export const deleteLocation = async (slug: string) => {
  try {
    console.log('Deleting location', slug);

    // Primero obtener la ubicación para tener el ID
    const location = await prisma.location.findUnique({
      where: { slug: slug }
    });

    if (!location) {
      console.log('Location not found:', slug);
      return false;
    }

    // Eliminar en orden de dependencias: primero los registros que dependen de location

    // 1. Eliminar SEO
    await prisma.seo.deleteMany({
      where: { locationId: location.id }
    });
    console.log('SEO records deleted for location:', slug);

    // 2. Eliminar Sections
    await prisma.section.deleteMany({
      where: { locationId: location.id }
    });
    console.log('Section records deleted for location:', slug);

    // 3. Finalmente eliminar la ubicación
    await prisma.location.delete({
      where: { id: location.id }
    });

    console.log('Location deleted successfully:', slug);
    return true;
  } catch (err) {
    console.error('Error deleting location:', err);
    return false;
  }
};
