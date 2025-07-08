// components/forms/DuckpinSectionForm.tsx
'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { DuckpinContentSchema, type DuckpinContent } from '@/lib/schemas/sections';
import { Loader2, Eye, EyeOff, Plus, Trash2, GripVertical, ExternalLink, Image as ImageIcon } from 'lucide-react';

interface DuckpinSectionFormProps {
  data: DuckpinContent;
  onSave: (data: DuckpinContent) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  isEnabled?: boolean;
  onToggleEnabled?: (enabled: boolean) => void;
}

export function DuckpinSectionForm({
  data,
  onSave,
  onCancel,
  isLoading,
  isEnabled = true,
  onToggleEnabled
}: DuckpinSectionFormProps) {
  const form = useForm<DuckpinContent>({
    resolver: zodResolver(DuckpinContentSchema),
    defaultValues: {
      backgroundImage: data?.backgroundImage || '',
      icons: data?.icons || [
        {
          url: '',
          alt: ''
        }
      ],
      preTitle: data?.preTitle || '',
      title: data?.title || '',
      description: data?.description || '',
      callToAction: data?.callToAction || '',
      buttonText: data?.buttonText || '',
      bookingUrl: data?.bookingUrl || '',
      faqs: data?.faqs || [
        {
          id: '',
          question: '',
          answer: ''
        }
      ]
    }
  });

  const {
    fields: iconFields,
    append: appendIcon,
    remove: removeIcon
  } = useFieldArray({
    control: form.control,
    name: 'icons'
  });

  const {
    fields: faqFields,
    append: appendFaq,
    remove: removeFaq
  } = useFieldArray({
    control: form.control,
    name: 'faqs'
  });

  const onSubmit = (formData: DuckpinContent) => {
    onSave(formData);
  };

  const addIcon = () => {
    appendIcon({
      url: '',
      alt: ''
    });
  };

  const addFaq = () => {
    appendFaq({
      id: '',
      question: '',
      answer: ''
    });
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      // Check for relative paths
      return url.startsWith('/') || url.startsWith('./') || url.startsWith('../');
    }
  };

  const generateSlug = (question: string) => {
    return question
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  };

  return (
    <Card className="w-full max-w-6xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🎳 Duckpin Bowling Section
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
            {/* Imagen de Fondo */}
            <FormField
              control={form.control}
              name="backgroundImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    Imagen de Fondo
                    {field.value && isValidUrl(field.value) && (
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
                      placeholder="/images/duckpin-bowling-bg.jpg"
                      {...field}
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                  <p className="text-xs text-gray-500 mt-1">
                    Imagen de fondo para la sección (ruta relativa o URL completa)
                  </p>
                </FormItem>
              )}
            />

            {/* Contenido Principal */}
            <Card className="bg-accent border border-accent-foreground/10">
              <CardHeader>
                <CardTitle className="text-md">📝 Contenido Principal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="preTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pre-título</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="GET READY TO ROLL WITH"
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
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título Principal *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="DUCKPIN BOWLING!"
                            {...field}
                            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripción</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="This twist on standard bowling uses smaller pins and lighter balls, meaning tighter competition and more thrills."
                          className="min-h-[100px] transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="callToAction"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Call to Action</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Strike up a great time with family and friends! Book your lane now!"
                          className="min-h-[80px] transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="buttonText"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Texto del Botón</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="BOOK YOUR LANE"
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
                    name="bookingUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL de Reserva</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="#book-duckpin"
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

            {/* Iconos */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Iconos Decorativos</h3>
                <Button type="button" variant="outline" onClick={addIcon} className="transition-all duration-200">
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Icono
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {iconFields.map((field, index) => (
                  <Card key={field.id} className="border-l-4 border-l-indigo-500">
                    <CardHeader>
                      <CardTitle className="text-md flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <ImageIcon className="h-4 w-4 text-gray-400" />
                          Icono {index + 1}
                        </div>
                        {iconFields.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeIcon(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name={`icons.${index}.url`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              URL del Icono *
                              {field.value && isValidUrl(field.value) && (
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
                                placeholder="/icons/bowling-pin.svg"
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
                        name={`icons.${index}.alt`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Texto Alternativo (Alt) *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Bowling Pin"
                                {...field}
                                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                              />
                            </FormControl>
                            <FormMessage />
                            <p className="text-xs text-gray-500 mt-1">Descripción del icono para accesibilidad</p>
                          </FormItem>
                        )}
                      />

                      {/* Estado del Icono */}
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-medium text-gray-600">Estado:</span>
                        {form.watch(`icons.${index}.url`) && form.watch(`icons.${index}.alt`) ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-100 text-green-800">
                            ✅ Completo
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
                            ⚠️ Incompleto
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Preguntas Frecuentes (FAQs)</h3>
                <Button type="button" variant="outline" onClick={addFaq} className="transition-all duration-200">
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar FAQ
                </Button>
              </div>

              {faqFields.map((field, index) => (
                <Card key={field.id} className="border-l-4 border-l-amber-500">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <GripVertical className="h-4 w-4 text-gray-400" />❓ FAQ {index + 1}
                        {form.watch(`faqs.${index}.question`) && (
                          <span className="text-sm text-gray-500 truncate max-w-md">
                            - {form.watch(`faqs.${index}.question`).substring(0, 50)}...
                          </span>
                        )}
                      </div>
                      {faqFields.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFaq(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name={`faqs.${index}.id`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ID de la FAQ *</FormLabel>
                          <FormControl>
                            <div className="flex gap-2">
                              <Input
                                placeholder="what-is-duckpin"
                                {...field}
                                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const question = form.watch(`faqs.${index}.question`);
                                  if (question) {
                                    field.onChange(generateSlug(question));
                                  }
                                }}
                                className="whitespace-nowrap"
                              >
                                Auto
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                          <p className="text-xs text-gray-500 mt-1">Identificador único para la pregunta</p>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`faqs.${index}.question`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pregunta *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="WHAT IS DUCKPIN BOWLING?"
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
                      name={`faqs.${index}.answer`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Respuesta *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Duckpin is a variation of bowling that uses smaller, lighter balls that don't have finger holes. The pins for duckpin are also smaller and shorter than standard pins. You also don't need special bowling shoes to play duckpin!"
                              className="min-h-[120px] transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Estado de la FAQ */}
                    <Card className="bg-accent border border-accent-foreground/10">
                      <CardContent className="pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-600">Estado:</span>
                            <div className="mt-1">
                              {form.watch(`faqs.${index}.id`) &&
                              form.watch(`faqs.${index}.question`) &&
                              form.watch(`faqs.${index}.answer`) ? (
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
                            <span className="font-medium text-gray-600">ID:</span>
                            <div className="mt-1">
                              {form.watch(`faqs.${index}.id`) ? (
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
                          <div>
                            <span className="font-medium text-gray-600">Longitud Respuesta:</span>
                            <div className="mt-1 text-lg font-semibold text-purple-600">
                              {form.watch(`faqs.${index}.answer`)?.length || 0}
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
                <CardTitle className="text-md">📊 Resumen de Duckpin</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">Iconos:</span>
                    <div className="mt-1 text-lg font-semibold text-indigo-600">{iconFields.length}</div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">FAQs:</span>
                    <div className="mt-1 text-lg font-semibold text-amber-600">{faqFields.length}</div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Iconos Completos:</span>
                    <div className="mt-1 text-lg font-semibold text-green-600">
                      {
                        iconFields.filter(
                          (_, index) => form.watch(`icons.${index}.url`) && form.watch(`icons.${index}.alt`)
                        ).length
                      }
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">FAQs Completos:</span>
                    <div className="mt-1 text-lg font-semibold text-blue-600">
                      {
                        faqFields.filter(
                          (_, index) =>
                            form.watch(`faqs.${index}.id`) &&
                            form.watch(`faqs.${index}.question`) &&
                            form.watch(`faqs.${index}.answer`)
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
