'use server';

import { prisma } from '@/lib/prisma';
import { PageSection } from '@/lib/generated/prisma';
import { LOCATIONS_DEFAULT } from '@/data/locations-content-default';

interface UpdateSectionParams {
  locationId: string;
  page: PageSection;
  content?: any;
  enabled?: boolean;
}

export async function updateSection({ locationId, page, content, enabled }: UpdateSectionParams) {
  try {
    console.log('Updating section:', {
      locationId,
      page,
      hasContent: !!content,
      enabled,
      contentKeys: content ? Object.keys(content) : []
    });

    // Validar que la location existe
    const location = await prisma.location.findUnique({
      where: { id: locationId }
    });

    if (!location) {
      throw new Error(`Location with id ${locationId} not found`);
    }

    // Obtener la sección actual para conservar datos existentes
    const existingSection = await prisma.section.findUnique({
      where: {
        locationId_page: {
          locationId,
          page
        }
      }
    });

    if (existingSection) {
      const contentChanged =
        content !== undefined && JSON.stringify(content) !== JSON.stringify(existingSection.content);
      const enabledChanged = enabled !== undefined && enabled !== existingSection.enabled;

      if (!contentChanged && !enabledChanged) {
        console.log('No changes detected, returning existing section');
        return existingSection;
      }
    }

    // Preparar los datos de actualización
    const updateData: any = {};

    // Si se proporciona contenido, actualizarlo
    if (content !== undefined) {
      updateData.content = content;
    }

    // Si se proporciona enabled, actualizarlo
    if (enabled !== undefined) {
      updateData.enabled = enabled;
    }

    // Datos para creación (si la sección no existe)
    const createData = {
      page,
      content: content || {}, // Contenido vacío por defecto
      enabled: enabled !== undefined ? enabled : true, // Habilitado por defecto
      locationId
    };

    const result = await prisma.section.upsert({
      where: {
        locationId_page: {
          locationId,
          page
        }
      },
      update: updateData,
      create: createData
    });

    console.log('Section updated successfully:', {
      id: result.id,
      page: result.page,
      enabled: result.enabled,
      hasContent: !!result.content
    });

    return result;
  } catch (error) {
    console.error('Error updating section:', error);
    throw error;
  }
}

// Función helper para solo actualizar contenido (mantiene enabled actual)
export async function updateSectionContent(locationId: string, page: PageSection, content: any) {
  return updateSection({ locationId, page, content });
}

// Función helper para solo toggle enabled/disabled
export async function toggleSectionEnabled(data: UpdateSectionParams) {
  return updateSection(data);
}

// Función helper para habilitar una sección con contenido inicial
export async function enableSectionWithContent(locationId: string, page: PageSection) {
  console.log('Enabling section with content:', { locationId, page });

  // Obtener el contenido por defecto de la sección
  const defaultContent = LOCATIONS_DEFAULT.sections[page];

  if (!defaultContent) {
    console.warn(`No default content found for section ${page}, using empty object`);
    return updateSection({
      locationId,
      page,
      content: {},
      enabled: true
    });
  }

  console.log('Default content for section:', {
    page,
    hasContent: !!defaultContent,
    contentKeys: Object.keys(defaultContent)
  });

  return updateSection({
    locationId,
    page,
    content: defaultContent,
    enabled: true
  });
}

// Función para habilitar todas las secciones con contenido por defecto
export async function enableAllSectionsWithContent(locationId: string) {
  const allSections = Object.values(PageSection);
  const results = [];

  for (const section of allSections) {
    try {
      const result = await enableSectionWithContent(locationId, section);
      results.push(result);
      console.log(`Successfully enabled section ${section} for location ${locationId}`);
    } catch (error) {
      console.error(`Failed to enable section ${section} for location ${locationId}:`, error);
      // Continúa con las demás secciones aunque una falle
    }
  }

  return results;
}
