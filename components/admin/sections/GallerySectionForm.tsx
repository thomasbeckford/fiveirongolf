// components/forms/GallerySectionForm.tsx
'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { GalleryContentSchema, type GalleryContent } from '@/lib/schemas/sections';
import { toggleSectionEnabled } from '@/server/sections/update';
import { PageSection } from '@/lib/generated/prisma';
import { Loader2, Eye, EyeOff, Plus, Trash2, GripVertical, Image as ImageIcon, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

interface GallerySectionFormProps {
  data: GalleryContent;
  onSave: (data: GalleryContent) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  id: string;
  isEnabled?: boolean;
}

export function GallerySectionForm({
  data,
  onSave,
  onCancel,
  isLoading,
  id,
  isEnabled = true
}: GallerySectionFormProps) {
  const [isToggling, setIsToggling] = useState(false);

  const form = useForm<GalleryContent>({
    resolver: zodResolver(GalleryContentSchema),
    defaultValues: {
      images: data?.images || [
        {
          url: '',
          alt: '',
          caption: ''
        }
      ]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'images'
  });

  const onSubmit = (formData: GalleryContent) => {
    onSave(formData);
  };

  const handleToggleSection = async () => {
    setIsToggling(true);
    try {
      await toggleSectionEnabled({
        locationId: id,
        page: PageSection.GALLERY,
        enabled: !isEnabled
      });
    } catch (error) {
      console.error('Error toggling section:', error);
    } finally {
      setIsToggling(false);
    }
  };

  const addImage = () => {
    append({
      url: '',
      alt: '',
      caption: ''
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

  return (
    <Card className="w-full max-w-6xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          📸 Gallery Section
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
            {/* Imágenes */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Imágenes de la Galería</h3>
                <Button type="button" variant="outline" onClick={addImage} className="transition-all duration-200">
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Imagen
                </Button>
              </div>

              {fields.map((field, index) => (
                <Card key={field.id} className="border-l-4 border-l-purple-500">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <GripVertical className="h-4 w-4 text-gray-400" />
                        📸 Imagen {index + 1}
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
                  <CardContent className="space-y-4">
                    {/* URL de la Imagen */}
                    <FormField
                      control={form.control}
                      name={`images.${index}.url`}
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
                    {form.watch(`images.${index}.url`) && isValidImageUrl(form.watch(`images.${index}.url`)) && (
                      <div className="relative">
                        <div className="bg-gray-100 rounded-lg p-4 border-2 border-dashed border-gray-300">
                          <div className="flex items-center justify-center">
                            <div className="text-center">
                              <Image
                                src={form.watch(`images.${index}.url`)}
                                alt={form.watch(`images.${index}.alt`) || 'Preview'}
                                className="max-w-full max-h-48 object-cover rounded-lg shadow-sm"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                }}
                              />
                              <div className="hidden text-gray-500 py-8">
                                <ImageIcon className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                                <p className="text-sm">Error al cargar la imagen</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Alt Text y Caption */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`images.${index}.alt`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Texto Alternativo (Alt) *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Golf simulator bay"
                                {...field}
                                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                              />
                            </FormControl>
                            <FormMessage />
                            <p className="text-xs text-gray-500 mt-1">Descripción para accesibilidad y SEO</p>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`images.${index}.caption`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subtítulo/Caption</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="State-of-the-art golf simulators"
                                {...field}
                                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                              />
                            </FormControl>
                            <FormMessage />
                            <p className="text-xs text-gray-500 mt-1">Texto que se muestra debajo de la imagen</p>
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Información de la Imagen */}
                    <Card className="bg-accent border border-accent-foreground/10">
                      <CardContent className="pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-600">Estado:</span>
                            <div className="mt-1">
                              {form.watch(`images.${index}.url`) ? (
                                isValidImageUrl(form.watch(`images.${index}.url`)) ? (
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                                    ✅ URL válida
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                                    ❌ URL inválida
                                  </span>
                                )
                              ) : (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
                                  ⏳ Pendiente
                                </span>
                              )}
                            </div>
                          </div>
                          <div>
                            <span className="font-medium text-gray-600">Alt Text:</span>
                            <div className="mt-1">
                              {form.watch(`images.${index}.alt`) ? (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                                  ✅ Completado
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                                  ⚠️ Requerido
                                </span>
                              )}
                            </div>
                          </div>
                          <div>
                            <span className="font-medium text-gray-600">Caption:</span>
                            <div className="mt-1">
                              {form.watch(`images.${index}.caption`) ? (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                                  ✅ Agregado
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
                                  ➖ Opcional
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

            {/* Información General */}
            <Card className="bg-accent border border-accent-foreground/10">
              <CardHeader>
                <CardTitle className="text-md">ℹ️ Información de la Galería</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">Total de Imágenes:</span>
                    <div className="mt-1 text-lg font-semibold text-blue-600">{fields.length}</div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">URLs Válidas:</span>
                    <div className="mt-1 text-lg font-semibold text-green-600">
                      {
                        fields.filter(
                          (_, index) =>
                            form.watch(`images.${index}.url`) && isValidImageUrl(form.watch(`images.${index}.url`))
                        ).length
                      }
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Con Alt Text:</span>
                    <div className="mt-1 text-lg font-semibold text-purple-600">
                      {fields.filter((_, index) => form.watch(`images.${index}.alt`)).length}
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
