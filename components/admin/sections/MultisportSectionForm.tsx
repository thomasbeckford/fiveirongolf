// components/forms/MultisportSectionForm.tsx
'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { MultisportContentSchema, type MultisportContent } from '@/lib/schemas/sections';
import { Loader2, Eye, EyeOff, Plus, Trash2, GripVertical, GamepadIcon, ExternalLink, Trophy } from 'lucide-react';
import Image from 'next/image';

interface MultisportSectionFormProps {
  data: MultisportContent;
  onSave: (data: MultisportContent) => void;
  onCancel?: () => void;
  isLoading?: boolean;

  isEnabled?: boolean;
  onToggleEnabled?: (enabled: boolean) => void;
}

export function MultisportSectionForm({
  data,
  onSave,
  onCancel,
  isLoading,

  isEnabled = true,
  onToggleEnabled
}: MultisportSectionFormProps) {
  const form = useForm<MultisportContent>({
    resolver: zodResolver(MultisportContentSchema),
    defaultValues: {
      topBanner: data?.topBanner || '',
      slides: data?.slides || [
        {
          title: '',
          subtitle: '',
          description: '',
          features: '',
          image: '',
          ctaText: '',
          ctaUrl: ''
        }
      ],
      sports: data?.sports || [
        {
          id: '',
          name: ''
        }
      ]
    }
  });

  const {
    fields: slideFields,
    append: appendSlide,
    remove: removeSlide
  } = useFieldArray({
    control: form.control,
    name: 'slides'
  });

  const {
    fields: sportFields,
    append: appendSport,
    remove: removeSport
  } = useFieldArray({
    control: form.control,
    name: 'sports'
  });

  const onSubmit = (formData: MultisportContent) => {
    onSave(formData);
  };

  const addSlide = () => {
    appendSlide({
      title: '',
      subtitle: '',
      description: '',
      features: '',
      image: '',
      ctaText: '',
      ctaUrl: ''
    });
  };

  const addSport = () => {
    appendSport({
      id: '',
      name: ''
    });
  };

  const isValidImageUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  };

  return (
    <Card className="w-full max-w-6xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🏆 Multisport Section
          <span
            className={`text-sm px-2 py-1 rounded-full ${
              isEnabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {isEnabled ? 'Activo' : 'Inactivo'}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Top Banner */}
            <FormField
              control={form.control}
              name="topBanner"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Banner Superior</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="GAMES THAT GO BEYOND THE GREENS!"
                      {...field}
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                  <p className="text-xs text-gray-500 mt-1">
                    Texto principal que aparece en la parte superior de la sección
                  </p>
                </FormItem>
              )}
            />

            {/* Slides */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Slides de Contenido</h3>
                <Button type="button" variant="outline" onClick={addSlide} className="transition-all duration-200">
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Slide
                </Button>
              </div>

              {slideFields.map((field, index) => (
                <Card key={field.id} className="border-l-4 border-l-orange-500">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <GripVertical className="h-4 w-4 text-gray-400" />
                        🎮 Slide {index + 1}
                        {form.watch(`slides.${index}.title`) && (
                          <span className="text-sm text-gray-500">- {form.watch(`slides.${index}.title`)}</span>
                        )}
                      </div>
                      {slideFields.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSlide(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Título y Subtítulo */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`slides.${index}.title`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Título *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="MULTISPORT"
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
                        name={`slides.${index}.subtitle`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subtítulo</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="AN ELECTRIFYING BLEND OF SIMULATOR SPORTS!"
                                {...field}
                                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Descripción */}
                    <FormField
                      control={form.control}
                      name={`slides.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descripción</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Take the fun to the next level when you book a party or event. Multisport sims bring 6 unique sports into the mix like Hockey, Soccer, and Bowling so the vibes stay high all day and night!"
                              className="min-h-[120px] transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Features */}
                    <FormField
                      control={form.control}
                      name={`slides.${index}.features`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Características/Features</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Bring the whole gang together with customizable difficulty and boost settings so you can tailor the challenge or heat up the competition."
                              className="min-h-[100px] transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Imagen */}
                    <FormField
                      control={form.control}
                      name={`slides.${index}.image`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            URL de la Imagen *
                            {field.value && isValidImageUrl(field.value) && (
                              <a
                                href={field.value}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:text-blue-700"
                              >
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            )}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://fiveirongolf.com/wp-content/uploads/2024/08/RN_3.jpg"
                              {...field}
                              className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Preview de la Imagen */}
                    {form.watch(`slides.${index}.image`) && isValidImageUrl(form.watch(`slides.${index}.image`)) && (
                      <div className="relative">
                        <div className="bg-gray-100 rounded-lg p-4 border-2 border-dashed border-gray-300">
                          <div className="flex items-center justify-center">
                            <div className="text-center">
                              <Image
                                src={form.watch(`slides.${index}.image`)}
                                alt={form.watch(`slides.${index}.title`) || 'Preview'}
                                className="max-w-full max-h-48 object-cover rounded-lg shadow-sm"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                }}
                                width={300}
                                height={300}
                              />
                              <div className="hidden text-gray-500 py-8">
                                <GamepadIcon className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                                <p className="text-sm">Error al cargar la imagen</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* CTA */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`slides.${index}.ctaText`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Texto del CTA</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="BOOK A MULTISPORT EVENT"
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
                        name={`slides.${index}.ctaUrl`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>URL del CTA</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="#book-multisport"
                                {...field}
                                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Sports */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Deportes Disponibles</h3>
                <Button type="button" variant="outline" onClick={addSport} className="transition-all duration-200">
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Deporte
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sportFields.map((field, index) => (
                  <Card key={field.id} className="border-l-4 border-l-green-500">
                    <CardHeader>
                      <CardTitle className="text-md flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Trophy className="h-4 w-4 text-gray-400" />
                          Deporte {index + 1}
                        </div>
                        {sportFields.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSport(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        <FormField
                          control={form.control}
                          name={`sports.${index}.id`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>ID del Deporte *</FormLabel>
                              <FormControl>
                                <div className="flex gap-2">
                                  <Input
                                    placeholder="slapshot-hockey"
                                    {...field}
                                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                                  />
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      const name = form.watch(`sports.${index}.name`);
                                      if (name) {
                                        field.onChange(generateSlug(name));
                                      }
                                    }}
                                    className="whitespace-nowrap"
                                  >
                                    Auto
                                  </Button>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`sports.${index}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nombre del Deporte *</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="SLAPSHOT HOCKEY"
                                  {...field}
                                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Información General */}
            <Card className="bg-accent border border-accent-foreground/10">
              <CardHeader>
                <CardTitle className="text-md">📊 Resumen de Multisport</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">Slides:</span>
                    <div className="mt-1 text-lg font-semibold text-orange-600">{slideFields.length}</div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Deportes:</span>
                    <div className="mt-1 text-lg font-semibold text-green-600">{sportFields.length}</div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Slides Completos:</span>
                    <div className="mt-1 text-lg font-semibold text-blue-600">
                      {
                        slideFields.filter(
                          (_, index) => form.watch(`slides.${index}.title`) && form.watch(`slides.${index}.image`)
                        ).length
                      }
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Deportes Completos:</span>
                    <div className="mt-1 text-lg font-semibold text-purple-600">
                      {
                        sportFields.filter(
                          (_, index) => form.watch(`sports.${index}.id`) && form.watch(`sports.${index}.name`)
                        ).length
                      }
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Botones de Acción */}
            <div className="flex justify-between items-center pt-6 border-t">
              <Button
                type="button"
                variant={isEnabled ? 'destructive' : 'default'}
                onClick={() => onToggleEnabled?.(!isEnabled)}
                disabled={isLoading}
                className="transition-all duration-200"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : isEnabled ? (
                  <EyeOff className="h-4 w-4 mr-2" />
                ) : (
                  <Eye className="h-4 w-4 mr-2" />
                )}
                {isLoading ? 'Procesando...' : isEnabled ? 'Desactivar' : 'Activar'}
              </Button>

              <div className="flex gap-3">
                {onCancel && (
                  <Button type="button" variant="outline" onClick={onCancel} className="transition-all duration-200">
                    Cancelar
                  </Button>
                )}
                <Button type="submit" disabled={isLoading} className="transition-all duration-200">
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Guardando...
                    </>
                  ) : (
                    'Guardar Cambios'
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
