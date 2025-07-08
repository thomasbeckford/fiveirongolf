'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Building, Save, ArrowLeft, Loader2, MapPin } from 'lucide-react';
import { createLocation } from '@/server/locations/create';

// Schema simplificado para nueva ubicación
const NewLocationSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  slug: z.string().min(1, 'El slug es requerido'),
  heroTitle: z.string().min(1, 'El título del hero es requerido'),
  heroSubtitle: z.string().min(1, 'El subtítulo del hero es requerido')
});

type NewLocationForm = z.infer<typeof NewLocationSchema>;

export default function NewLocationPage() {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  const form = useForm<NewLocationForm>({
    resolver: zodResolver(NewLocationSchema),
    defaultValues: {
      name: '',
      slug: '',
      heroTitle: '',
      heroSubtitle: ''
    }
  });

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleNameChange = (name: string) => {
    form.setValue('name', name);
    if (name) {
      const slug = generateSlug(name);
      form.setValue('slug', slug);

      // Auto-generar títulos basados en el nombre
      form.setValue('heroTitle', name.toUpperCase());
      form.setValue('heroSubtitle', `WELCOME TO ${name.toUpperCase()}`);
    }
  };

  const onSubmit = async (data: NewLocationForm) => {
    setIsCreating(true);
    try {
      // Crear la ubicación con datos mínimos
      // El backend usará LOCATIONS_DEFAULT para el resto de las secciones
      const locationData = {
        name: data.name,
        slug: data.slug,
        enabled: true,
        latitude: '0', // Valores por defecto
        longitude: '0',
        heroTitle: data.heroTitle,
        heroSubtitle: data.heroSubtitle
      };

      console.log('Creating location with minimal data:', locationData);

      // Simular API call
      await createLocation(locationData);

      // Redirect to the new location's management page
      router.push(`/admin/locations/${data.slug}`);
    } catch (error) {
      console.error('Error creating location:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const goBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={goBack} className="mb-4 hover:bg-gray-100">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Building className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-primary">Nueva Ubicación</h1>
              <p className="text-muted-foreground">Crear una nueva ubicación de Five Iron Golf</p>
            </div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Información Básica */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Información Básica
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre de la Ubicación *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Five Iron Golf River North"
                          {...field}
                          onChange={(e) => handleNameChange(e.target.value)}
                          className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                        />
                      </FormControl>
                      <FormMessage />
                      <p className="text-xs text-gray-500">
                        Se generará automáticamente el slug y los títulos del hero
                      </p>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug (URL) *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="five-iron-golf-river-north"
                          {...field}
                          className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                        />
                      </FormControl>
                      <FormMessage />
                      <p className="text-xs text-gray-500">Se usará en la URL: /locations/{field.value}</p>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Hero Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Sección Hero
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="heroTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título Principal *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="FIVE IRON GOLF RIVER NORTH"
                          {...field}
                          className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="heroSubtitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subtítulo *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="WELCOME TO FIVE IRON GOLF RIVER NORTH"
                          {...field}
                          className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Preview */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
              <CardHeader>
                <CardTitle className="text-md text-blue-700">👁️ Vista Previa del Hero</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 px-4 bg-white rounded-lg border-2 border-dashed border-blue-300">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {form.watch('heroTitle') || 'TÍTULO DEL HERO'}
                  </h1>
                  <p className="text-lg text-gray-600">{form.watch('heroSubtitle') || 'Subtítulo del hero'}</p>
                </div>
              </CardContent>
            </Card>

            {/* Info sobre defaults */}
            <Card className="bg-amber-50 border border-amber-200">
              <CardContent>
                <div className="flex items-start gap-3">
                  <div className="p-1 bg-amber-100 rounded">
                    <Building className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-amber-800 ">Configuración Automática</h3>
                    <p className="text-sm text-amber-700">
                      Esta ubicación se creará con todas las secciones predeterminadas (Activities, Reviews, Gallery,
                      etc.) usando la configuración de LOCATIONS_DEFAULT. Podrás personalizar cada sección después de la
                      creación.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Botones de Acción */}
            <div className="flex justify-between items-center pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={goBack}
                disabled={isCreating}
                className="transition-all duration-200"
              >
                Cancelar
              </Button>

              <Button type="submit" disabled={isCreating} className="transition-all duration-200 min-w-[140px]">
                {isCreating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Creando...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Crear Ubicación
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
