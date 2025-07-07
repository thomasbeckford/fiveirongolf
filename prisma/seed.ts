// prisma/seed.ts
import { PrismaClient } from '@/lib/generated/prisma';
import { LOCATIONS } from '@/data/locations';
import { LOCATIONS_DEFAULT } from '@/data/locations-content-default';
import { PageSection } from '@/lib/generated/prisma';

const prisma = new PrismaClient();

const SECTION_MAPPING = {
  [PageSection.GENERAL]: PageSection.GENERAL,
  [PageSection.HERO]: PageSection.HERO,
  [PageSection.ACTIVITIES]: PageSection.ACTIVITIES,
  [PageSection.HOURS]: PageSection.HOURS,
  [PageSection.REVIEWS]: PageSection.REVIEWS,
  [PageSection.DUCKPIN]: PageSection.DUCKPIN,
  [PageSection.GALLERY]: PageSection.GALLERY,
  [PageSection.MEMBERSHIP]: PageSection.MEMBERSHIP,
  [PageSection.INSTRUCTORS]: PageSection.INSTRUCTORS,
  [PageSection.MULTISPORT]: PageSection.MULTISPORT,
  [PageSection.FEATURES]: PageSection.FEATURES,
  [PageSection.FOOTER]: PageSection.FOOTER
} as const;

async function main() {
  try {
    console.log('🌱 Iniciando seed...');

    // Verificar si ya existen locations
    const existingLocations = await prisma.location.findMany({
      include: {
        sections: true,
        seo: true
      }
    });

    if (existingLocations.length > 0) {
      console.log('📍 Locations ya existen, saltando seed');
      return;
    }

    console.log(`📝 Creando ${LOCATIONS.length} locations...`);

    for (const loc of LOCATIONS) {
      console.log(`  → Creando ${loc.name}...`);

      // 1. Crear la location
      const location = await prisma.location.create({
        data: {
          name: loc.name,
          slug: loc.slug,
          latitude: loc.latitude,
          longitude: loc.longitude,
          enabled: true,
          timezone: loc.timezone || null,
          telephone: loc.phone || null,
          experiences: loc.experiences || []
        }
      });

      // 2. Crear SEO (con fallback al default)
      const seoContent = loc.content?.seo || LOCATIONS_DEFAULT.seo;
      await prisma.seo.create({
        data: {
          title: seoContent.title,
          description: seoContent.description,
          locationId: location.id
        }
      });

      // 3. Crear secciones con fallback al contenido default - SECUENCIALMENTE
      const locationSections = loc.content?.sections || {};
      const defaultSections = LOCATIONS_DEFAULT.sections || {};

      const allSectionKeys = new Set([...Object.keys(locationSections), ...Object.keys(defaultSections)]);

      let sectionCount = 0;
      for (const sectionKey of allSectionKeys) {
        const pageSection = SECTION_MAPPING[sectionKey as keyof typeof SECTION_MAPPING];

        if (!pageSection) {
          console.warn(`⚠️ Sección desconocida: ${sectionKey}`);
          continue;
        }

        // Usar contenido específico de la location o fallback al default
        const typedSectionKey = sectionKey as keyof typeof defaultSections;
        const locationContent = locationSections[typedSectionKey];
        const defaultContent = defaultSections[typedSectionKey];

        // Verificar si el contenido específico está vacío o no existe
        const isLocationContentEmpty =
          !locationContent || (typeof locationContent === 'object' && Object.keys(locationContent).length === 0);

        // Usar default si el contenido específico está vacío
        let sectionContent;
        if (isLocationContentEmpty) {
          sectionContent = defaultContent;
          console.log(`    ↳ Usando contenido default para: ${pageSection}`);
        } else {
          sectionContent = locationContent;
        }

        // Verificar que tengamos contenido final (ya sea específico o default)
        if (!sectionContent || (typeof sectionContent === 'object' && Object.keys(sectionContent).length === 0)) {
          console.warn(`⚠️ No hay contenido (ni específico ni default) para sección: ${pageSection} - saltando`);
          continue;
        }

        console.log(`    ✓ Creando sección: ${pageSection}`);

        await prisma.section.create({
          data: {
            page: pageSection,
            content: sectionContent,
            enabled: true,
            locationId: location.id
          }
        });

        sectionCount++;
      }

      console.log(`    ✅ ${loc.name} completado con ${sectionCount} secciones`);
    }

    console.log('🎉 Seed completado exitosamente');
  } catch (error) {
    console.error('❌ Error en seed:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
