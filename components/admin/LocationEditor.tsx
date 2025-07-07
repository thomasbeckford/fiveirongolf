'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Settings,
  Target,
  Activity,
  Clock,
  Star,
  ImageIcon,
  Users,
  Trophy,
  IceCreamBowlIcon,
  Sparkles,
  Layout
} from 'lucide-react';
import { GeneralSectionForm } from '@/components/sections/GeneralSectionForm';
import { HeroSectionForm } from '@/components/sections/HeroSectionForm';
import { PageSection, Section } from '@/lib/generated/prisma';
import { ActivityContent, HeroContent, HoursContent } from '@/lib/schemas/sections';
import { updateLocation } from '@/server/locations/update';
import { enableSectionWithContent, updateSectionContent } from '@/server/sections/update';
import { ILocation } from '@/types/location';
import { ActivitySectionForm } from '../sections/ActivitySectionForm';
import { HoursSectionForm } from '../sections/HoursSectionForm';

const SECTIONS = [
  {
    id: PageSection.GENERAL,
    name: 'Información General',
    icon: Settings,
    description: 'Datos básicos, SEO y configuración',
    color: 'bg-fiveiron-blue'
  },
  {
    id: PageSection.HERO,
    name: 'Hero Section',
    icon: Target,
    description: 'Título, imagen principal y CTA',
    color: 'bg-fiveiron-violet'
  },
  {
    id: PageSection.ACTIVITIES,
    name: 'Activities',
    icon: Activity,
    description: 'Servicios y experiencias disponibles',
    color: 'bg-fiveiron-green'
  },
  {
    id: PageSection.HOURS,
    name: 'Horarios',
    icon: Clock,
    description: 'Horarios de atención y información',
    color: 'bg-fiveiron-orange'
  },
  {
    id: PageSection.REVIEWS,
    name: 'Reviews',
    icon: Star,
    description: 'Testimonios y reseñas de clientes',
    color: 'bg-fiveiron-yellow text-fiveiron-black'
  },
  {
    id: PageSection.GALLERY,
    name: 'Galería',
    icon: ImageIcon,
    description: 'Fotos y videos del lugar',
    color: 'bg-fiveiron-pink'
  },
  {
    id: PageSection.INSTRUCTORS,
    name: 'Instructores',
    icon: Users,
    description: 'Equipo de entrenadores y coaches',
    color: 'bg-fiveiron-sky'
  },
  {
    id: PageSection.MULTISPORT,
    name: 'Multisport',
    icon: Trophy,
    description: 'Deportes adicionales disponibles',
    color: 'bg-fiveiron-cardinal'
  },
  {
    id: PageSection.DUCKPIN,
    name: 'Duckpin Bowling',
    icon: IceCreamBowlIcon,
    description: 'Información sobre bowling duckpin',
    color: 'bg-fiveiron-cyan text-fiveiron-black'
  },
  {
    id: PageSection.FEATURES,
    name: 'Features',
    icon: Sparkles,
    description: 'Características especiales del lugar',
    color: 'bg-fiveiron-lime text-fiveiron-black'
  },
  {
    id: PageSection.FOOTER,
    name: 'Footer',
    icon: Layout,
    description: 'Pie de página y enlaces',
    color: 'bg-fiveiron-black'
  }
];

export function LocationEditor({ location }: { location: ILocation }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [activeSection, setActiveSection] = useState<PageSection>(PageSection.GENERAL);
  const sections = location?.sections || [];

  if (!sections.length) {
    return (
      <div>
        <p>No hay secciones disponibles</p>
      </div>
    );
  }

  // Obtener contenido de una sección específica
  const getSectionContent = (page: PageSection) => {
    return sections.find((section: Section) => section.page === page)?.content || null;
  };

  // Cambiar sección activa
  const handleSectionChange = (sectionId: PageSection) => {
    setActiveSection(sectionId);
  };

  // Guardar información general
  const handleSaveGeneral = async (generalData: any) => {
    setIsSaving(true);
    try {
      await updateLocation(location.id, {
        name: generalData.name,
        slug: generalData.slug,
        enabled: generalData.enabled,
        timezone: generalData.timezone,
        telephone: generalData.telephone,
        experiences: generalData.experiences,
        seoTitle: generalData.seoTitle,
        seoDescription: generalData.seoDescription,
        sections: sections
      });
      router.refresh();
    } catch (error) {
      console.error('Error saving general info:', error);
      alert('Error al guardar información general');
    } finally {
      setIsSaving(false);
    }
  };

  // Guardar sección específica
  const handleSaveSection = async (page: PageSection, content: any) => {
    setIsSaving(true);
    try {
      await updateSectionContent(location.id, page, content);
      router.refresh();
    } catch (error) {
      console.error('Error saving section:', error);
      alert('Error al guardar sección');
    } finally {
      setIsSaving(false);
    }
  };

  const activateSection = async () => {
    setIsSaving(true);
    try {
      await enableSectionWithContent(location.id, activeSection);
      router.refresh();
    } catch (error) {
      console.error('Error activating section:', error);
      alert('Error al activar sección');
    } finally {
      setIsSaving(false);
    }
  };

  const renderSectionForm = () => {
    switch (activeSection) {
      case PageSection.GENERAL:
        return (
          <GeneralSectionForm
            data={{
              name: location.name || '',
              slug: location.slug || '',
              enabled: location.enabled ?? true,
              timezone: location.timezone || '',
              telephone: location.telephone || '',
              experiences: location.experiences || [],
              seoTitle: location.seo?.title || '',
              seoDescription: location.seo?.description || ''
            }}
            onSave={handleSaveGeneral}
            isLoading={isSaving}
            isCreating={false}
          />
        );

      case PageSection.HERO:
        return (
          <HeroSectionForm
            id={location.id}
            data={getSectionContent(PageSection.HERO) as HeroContent}
            onSave={async (heroData: HeroContent) => {
              await handleSaveSection(PageSection.HERO, heroData);
            }}
            isLoading={isSaving}
          />
        );

      case PageSection.ACTIVITIES:
        return (
          <ActivitySectionForm
            id={location.id}
            data={getSectionContent(PageSection.ACTIVITIES) as ActivityContent}
            onSave={async (activityData: ActivityContent) => {
              await handleSaveSection(PageSection.ACTIVITIES, activityData);
            }}
            isLoading={isSaving}
          />
        );

      case PageSection.HOURS:
        return (
          <HoursSectionForm
            id={location.id}
            data={getSectionContent(PageSection.HOURS) as HoursContent}
            onSave={async (hoursData: HoursContent) => {
              await handleSaveSection(PageSection.HOURS, hoursData);
            }}
            isLoading={isSaving}
          />
        );

      default:
        return (
          <Card>
            <CardContent className="p-6 md:p-12">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-fiveiron-black  rounded-full flex items-center justify-center mx-auto">
                  <Settings className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    La seccion {activeSection} no tiene un formulario disponible
                  </h3>
                  <p className="text-white/70">Hace click en el boton activar para activarla</p>
                </div>
                <Button variant="outline" onClick={activateSection}>
                  Activar
                </Button>
              </div>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Sidebar - Lista de secciones */}
      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardContent className="p-4">
            <h2 className="font-semibold text-accent-foreground mb-4">Secciones</h2>
            <div className="space-y-2">
              {SECTIONS.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;

                return (
                  <div
                    key={section.id}
                    onClick={() => handleSectionChange(section.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 group ${
                      isActive
                        ? 'bg-accent border-accent border shadow-sm'
                        : 'hover:bg-accent border border-transparent'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          isActive ? section.color : 'bg-fiveiron-black'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-accent-foreground'}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3
                            className={`font-medium text-sm ${
                              isActive ? 'text-accent-foreground' : 'text-accent-foreground'
                            }`}
                          >
                            {section.name}
                          </h3>
                        </div>
                        <p
                          className={`text-xs mt-1 ${
                            isActive ? 'text-accent-foreground/60' : 'text-accent-foreground/40'
                          }`}
                        >
                          {section.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-3">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            {(() => {
              const currentSection = SECTIONS.find((s) => s.id === activeSection);
              const Icon = currentSection?.icon || Settings;
              return (
                <>
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      currentSection?.color || 'bg-accent-foreground'
                    }`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-accent-foreground">{currentSection?.name || 'Sección'}</h1>
                    <p className="text-accent-foreground">
                      {currentSection?.description || 'Configuración de sección'}
                    </p>
                  </div>
                </>
              );
            })()}
          </div>

          <div className="pb-8">{renderSectionForm()}</div>
        </div>
      </div>
    </div>
  );
}
