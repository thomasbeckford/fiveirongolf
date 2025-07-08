// components/forms/InstructorsSectionForm.tsx
'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { InstructorContentSchema, type InstructorContent } from '@/lib/schemas/sections';
import { toggleSectionEnabled } from '@/server/sections/update';
import { PageSection } from '@/lib/generated/prisma';
import { Loader2, Eye, EyeOff, Plus, Trash2, GripVertical, User, ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface InstructorSectionFormProps {
  data: InstructorContent;
  onSave: (data: InstructorContent) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  id: string;
  isEnabled?: boolean;
}

export function InstructorSectionForm({
  data,
  onSave,
  onCancel,
  isLoading,
  id,
  isEnabled = true
}: InstructorSectionFormProps) {
  const [isToggling, setIsToggling] = useState(false);

  const form = useForm<InstructorContent>({
    resolver: zodResolver(InstructorContentSchema),
    defaultValues: {
      coaches: data?.coaches || [
        {
          id: '',
          name: '',
          title: '',
          bio: '',
          image: ''
        }
      ],
      bookLessonUrl: data?.bookLessonUrl || '',
      learnMoreUrl: data?.learnMoreUrl || ''
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'coaches'
  });

  const onSubmit = (formData: InstructorContent) => {
    onSave(formData);
  };

  const handleToggleSection = async () => {
    setIsToggling(true);
    try {
      await toggleSectionEnabled({
        locationId: id,
        page: PageSection.INSTRUCTORS,
        enabled: !isEnabled
      });
    } catch (error) {
      console.error('Error toggling section:', error);
    } finally {
      setIsToggling(false);
    }
  };

  const addCoach = () => {
    append({
      id: '',
      name: '',
      title: '',
      bio: '',
      image: '',
      description: '',
      cta: {
        text: '',
        url: ''
      }
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
          👨‍🏫 Instructors Section
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
            {/* Coaches */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Instructores</h3>
                <Button type="button" variant="outline" onClick={addCoach} className="transition-all duration-200">
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Instructor
                </Button>
              </div>

              {fields.map((field, index) => (
                <Card key={field.id} className="border-l-4 border-l-blue-500">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <GripVertical className="h-4 w-4 text-gray-400" />
                        👨‍🏫 Instructor {index + 1}
                        {form.watch(`coaches.${index}.name`) && (
                          <span className="text-sm text-gray-500">- {form.watch(`coaches.${index}.name`)}</span>
                        )}
                      </div>
                      {fields.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => remove(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* ID y Nombre */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`coaches.${index}.id`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ID del Instructor *</FormLabel>
                            <FormControl>
                              <div className="flex gap-2">
                                <Input
                                  placeholder="cole-langley"
                                  {...field}
                                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                                />
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    const name = form.watch(`coaches.${index}.name`);
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
                            <p className="text-xs text-gray-500 mt-1">Identificador único (slug) para el instructor</p>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`coaches.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nombre *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="COLE LANGLEY"
                                {...field}
                                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Título */}
                    <FormField
                      control={form.control}
                      name={`coaches.${index}.title`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Título/Posición *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Senior Golf Coach"
                              {...field}
                              className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Imagen */}
                    <FormField
                      control={form.control}
                      name={`coaches.${index}.image`}
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
                    {form.watch(`coaches.${index}.image`) && isValidImageUrl(form.watch(`coaches.${index}.image`)) && (
                      <div className="relative">
                        <div className="bg-gray-100 rounded-lg p-4 border-2 border-dashed border-gray-300">
                          <div className="flex items-center justify-center">
                            <div className="text-center">
                              <img
                                src={form.watch(`coaches.${index}.image`)}
                                alt={form.watch(`coaches.${index}.name`) || 'Preview'}
                                className="max-w-full max-h-48 object-cover rounded-lg shadow-sm"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                }}
                              />
                              <div className="hidden text-gray-500 py-8">
                                <User className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                                <p className="text-sm">Error al cargar la imagen</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Biografía */}
                    <FormField
                      control={form.control}
                      name={`coaches.${index}.bio`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Biografía *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="PGA Professional with 10+ years experience helping golfers of all skill levels improve their game."
                              className="min-h-[120px] transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Información del Instructor */}
                    <Card className="bg-accent border border-accent-foreground/10">
                      <CardContent className="pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-600">Estado:</span>
                            <div className="mt-1">
                              {form.watch(`coaches.${index}.name`) &&
                              form.watch(`coaches.${index}.title`) &&
                              form.watch(`coaches.${index}.bio`) &&
                              form.watch(`coaches.${index}.image`) &&
                              form.watch(`coaches.${index}.id`) ? (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                                  ✅ Completo
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                                  ⚠️ Incompleto
                                </span>
                              )}
                            </div>
                          </div>
                          <div>
                            <span className="font-medium text-gray-600">Imagen:</span>
                            <div className="mt-1">
                              {form.watch(`coaches.${index}.image`) &&
                              isValidImageUrl(form.watch(`coaches.${index}.image`)) ? (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                                  ✅ Válida
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                                  ❌ Inválida
                                </span>
                              )}
                            </div>
                          </div>
                          <div>
                            <span className="font-medium text-gray-600">ID:</span>
                            <div className="mt-1">
                              {form.watch(`coaches.${index}.id`) ? (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                                  ✅ Asignado
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
                                  ⏳ Pendiente
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* CTAs Section */}
            <Card className="bg-accent border border-accent-foreground/10">
              <CardHeader>
                <CardTitle className="text-md">🎯 Enlaces de Acción</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="bookLessonUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL para Reservar Lección</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="#book-lesson"
                            {...field}
                            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                          />
                        </FormControl>
                        <FormMessage />
                        <p className="text-xs text-gray-500 mt-1">Enlace principal para reservar lecciones</p>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="learnMoreUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL para Más Información</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="#coaches-info"
                            {...field}
                            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                          />
                        </FormControl>
                        <FormMessage />
                        <p className="text-xs text-gray-500 mt-1">
                          Enlace para información adicional sobre instructores
                        </p>
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Información General */}
            <Card className="bg-accent border border-accent-foreground/10">
              <CardHeader>
                <CardTitle className="text-md">📊 Resumen de Instructores</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">Total:</span>
                    <div className="mt-1 text-lg font-semibold text-blue-600">{fields.length}</div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Completos:</span>
                    <div className="mt-1 text-lg font-semibold text-green-600">
                      {
                        fields.filter(
                          (_, index) =>
                            form.watch(`coaches.${index}.name`) &&
                            form.watch(`coaches.${index}.title`) &&
                            form.watch(`coaches.${index}.bio`) &&
                            form.watch(`coaches.${index}.image`) &&
                            form.watch(`coaches.${index}.id`)
                        ).length
                      }
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Con Imagen:</span>
                    <div className="mt-1 text-lg font-semibold text-purple-600">
                      {
                        fields.filter(
                          (_, index) =>
                            form.watch(`coaches.${index}.image`) &&
                            isValidImageUrl(form.watch(`coaches.${index}.image`))
                        ).length
                      }
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Con ID:</span>
                    <div className="mt-1 text-lg font-semibold text-orange-600">
                      {fields.filter((_, index) => form.watch(`coaches.${index}.id`)).length}
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
                onClick={handleToggleSection}
                disabled={isToggling}
                className="transition-all duration-200"
              >
                {isToggling ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : isEnabled ? (
                  <EyeOff className="h-4 w-4 mr-2" />
                ) : (
                  <Eye className="h-4 w-4 mr-2" />
                )}
                {isToggling ? 'Procesando...' : isEnabled ? 'Desactivar' : 'Activar'}
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
