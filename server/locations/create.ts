'use server';
import { prisma } from '@/lib/prisma';
import { Section, Seo, PageSection } from '@/lib/generated/prisma';
import { LOCATIONS_DEFAULT } from '@/data/locations-content-default';

type CreateLocationProps = {
  name: string;
  slug: string;
  enabled: boolean;
  latitude: string;
  longitude: string;
  heroTitle?: string;
  heroSubtitle?: string;
  sections?: Section[];
  seo?: Seo;
};

export const createLocation = async (locationData: CreateLocationProps) => {
  try {
    const location = await prisma.location.create({
      data: {
        name: locationData.name,
        slug: locationData.slug,
        enabled: locationData.enabled || false,
        latitude: locationData.latitude,
        longitude: locationData.longitude
      }
    });

    if (!locationData.sections) {
      // Iterar sobre las claves del objeto sections
      for (const [pageKey, content] of Object.entries(LOCATIONS_DEFAULT.sections)) {
        // Verificar que la clave es un PageSection válido
        if (Object.values(PageSection).includes(pageKey as PageSection)) {
          let sectionContent = content;

          // Si es la sección HERO y se proporcionaron título/subtítulo personalizados
          if (pageKey === PageSection.HERO && (locationData.heroTitle || locationData.heroSubtitle)) {
            sectionContent = {
              ...content,
              title: locationData.heroTitle,
              subtitle: locationData.heroSubtitle
            };
          }

          await prisma.section.create({
            data: {
              page: pageKey as PageSection,
              enabled: true, // Por defecto habilitadas
              locationId: location.id,
              content: sectionContent || {}
            }
          });
        }
      }
    }

    // Crear SEO por defecto si no se proporciona
    if (!locationData.seo) {
      await prisma.seo.create({
        data: {
          title: LOCATIONS_DEFAULT.seo.title.replace('{LOCATION_NAME}', locationData.name),
          description: LOCATIONS_DEFAULT.seo.description.replace('{LOCATION_NAME}', locationData.name),
          locationId: location.id
        }
      });
    } else {
      await prisma.seo.create({
        data: {
          title: locationData.seo.title,
          description: locationData.seo.description,
          locationId: location.id
        }
      });
    }

    return location;
  } catch (err) {
    console.error('Error creating location:', err);
    return false;
  }
};
