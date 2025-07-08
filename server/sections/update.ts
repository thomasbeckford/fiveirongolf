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
