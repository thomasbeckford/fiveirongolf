// components/forms/FeaturesSectionForm.tsx
'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { FeaturesContentSchema, type FeaturesContent } from '@/lib/schemas/sections';
import { toggleSectionEnabled } from '@/server/sections/update';
import { PageSection } from '@/lib/generated/prisma';
import { Loader2, Eye, EyeOff, Plus, Trash2, GripVertical, Palette } from 'lucide-react';
import { useState } from 'react';

interface FeaturesSectionFormProps {
  data: FeaturesContent;
  onSave: (data: FeaturesContent) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  id: string;
  isEnabled?: boolean;
  onToggleEnabled?: (enabled: boolean) => void;
}

export function FeaturesSectionForm({
  data,
  onSave,
  onCancel,
  isLoading,
  id,
  isEnabled = true,
  onToggleEnabled
}: FeaturesSectionFormProps) {
  const [isToggling, setIsToggling] = useState(false);

  const form = useForm<FeaturesContent>({
    resolver: zodResolver(FeaturesContentSchema),
    defaultValues: {
      features: data?.features || [
        {
          id: '',
          title: '',
          description: '',
          neonColor: '#39ff14',
          ctaText: '',
          ctaUrl: ''
        }
      ]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'features'
  });

  const onSubmit = (formData: FeaturesContent) => {
    onSave(formData);
  };

  const handleToggleSection = async () => {
    setIsToggling(true);
    try {
      await toggleSectionEnabled({
        locationId: id,
        page: PageSection.FEATURES,
        enabled: !isEnabled
      });
    } catch (error) {
      console.error('Error toggling section:', error);
    } finally {
      setIsToggling(false);
    }
  };

  const addFeature = () => {
    append({
      id: '',
      title: '',
      description: '',
      neonColor: '#39ff14',
      ctaText: '',
      ctaUrl: ''
    });
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  };

  const isValidHexColor = (color: string) => {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
  };

  const presetNeonColors = [
    { name: 'Verde Neón', value: '#39ff14' },
    { name: 'Cyan Neón', value: '#00f5ff' },
    { name: 'Rosa Neón', value: '#ff1493' },
    { name: 'Amarillo Neón', value: '#ffff00' },
    { name: 'Naranja Neón', value: '#ff4500' },
    { name: 'Púrpura Neón', value: '#9d00ff' },
    { name: 'Rojo Neón', value: '#ff0040' },
    { name: 'Azul Neón', value: '#0080ff' }
  ];

  return (
    <Card className="w-full max-w-6xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          ✨ Features Section
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
            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Características Destacadas</h3>
                <Button type="button" variant="outline" onClick={addFeature} className="transition-all duration-200">
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Feature
                </Button>
              </div>

              {fields.map((field, index) => (
                <Card
                  key={field.id}
                  className="border-l-4"
                  style={{
                    borderLeftColor: form.watch(`features.${index}.neonColor`) || '#39ff14'
                  }}
                >
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <GripVertical className="h-4 w-4 text-gray-400" />✨ Feature {index + 1}
                        {form.watch(`features.${index}.title`) && (
                          <span className="text-sm text-gray-500">- {form.watch(`features.${index}.title`)}</span>
                        )}
                        <div
                          className="w-4 h-4 rounded-full border-2 border-gray-300"
                          style={{ backgroundColor: form.watch(`features.${index}.neonColor`) || '#39ff14' }}
                        />
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
                    {/* ID y Título */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`features.${index}.id`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ID de la Feature *</FormLabel>
                            <FormControl>
                              <div className="flex gap-2">
                                <Input
                                  placeholder="restaurant-bar"
                                  {...field}
                                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                                />
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    const title = form.watch(`features.${index}.title`);
                                    if (title) {
                                      field.onChange(generateSlug(title));
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
                        name={`features.${index}.title`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Título *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="RESTAURANT & BAR"
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
                      name={`features.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descripción *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Serving up carefully-selected, casual fare complemented by signature cocktails, local brews on tap and canned classics for some swing juice."
                              className="min-h-[120px] transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Color Neón */}
                    <Card className="bg-accent border border-accent-foreground/10">
                      <CardHeader>
                        <CardTitle className="text-md flex items-center gap-2">
                          <Palette className="h-4 w-4" />
                          Color Neón
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <FormField
                          control={form.control}
                          name={`features.${index}.neonColor`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Código de Color Hexadecimal *</FormLabel>
                              <FormControl>
                                <div className="flex gap-2">
                                  <Input
                                    placeholder="#39ff14"
                                    {...field}
                                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                                  />
                                  <div
                                    className="w-10 h-10 rounded border-2 border-gray-300 flex-shrink-0"
                                    style={{ backgroundColor: field.value || '#39ff14' }}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                              {!isValidHexColor(field.value || '') && (
                                <p className="text-xs text-red-500 mt-1">
                                  Formato inválido. Use formato hexadecimal (#000000)
                                </p>
                              )}
                            </FormItem>
                          )}
                        />

                        {/* Colores Predefinidos */}
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-2">Colores Neón Predefinidos:</p>
                          <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                            {presetNeonColors.map((color) => (
                              <button
                                key={color.value}
                                type="button"
                                onClick={() => form.setValue(`features.${index}.neonColor`, color.value)}
                                className="w-8 h-8 rounded border-2 border-gray-300 hover:border-gray-400 transition-colors"
                                style={{ backgroundColor: color.value }}
                                title={color.name}
                              />
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* CTA */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`features.${index}.ctaText`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Texto del CTA</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="READ MENU"
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
                        name={`features.${index}.ctaUrl`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>URL del CTA</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="#menu"
                                {...field}
                                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Vista Previa */}
                    <Card className="bg-gray-50 border border-gray-200">
                      <CardHeader>
                        <CardTitle className="text-md">👁️ Vista Previa</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div
                          className="p-4 rounded-lg border-2"
                          style={{
                            borderColor: form.watch(`features.${index}.neonColor`) || '#39ff14',
                            backgroundColor: 'rgba(0,0,0,0.05)'
                          }}
                        >
                          <h3
                            className="text-lg font-bold mb-2"
                            style={{ color: form.watch(`features.${index}.neonColor`) || '#39ff14' }}
                          >
                            {form.watch(`features.${index}.title`) || 'Título de la feature'}
                          </h3>
                          <p className="text-gray-700 text-sm mb-3">
                            {form.watch(`features.${index}.description`) ||
                              'Descripción de la feature aparecerá aquí...'}
                          </p>
                          {form.watch(`features.${index}.ctaText`) && (
                            <button
                              className="px-4 py-2 rounded font-medium text-white text-sm transition-all"
                              style={{
                                backgroundColor: form.watch(`features.${index}.neonColor`) || '#39ff14',
                                boxShadow: `0 0 10px ${form.watch(`features.${index}.neonColor`) || '#39ff14'}50`
                              }}
                            >
                              {form.watch(`features.${index}.ctaText`)}
                            </button>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Estado de la Feature */}
                    <Card className="bg-accent border border-accent-foreground/10">
                      <CardContent className="pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-600">Estado:</span>
                            <div className="mt-1">
                              {form.watch(`features.${index}.id`) &&
                              form.watch(`features.${index}.title`) &&
                              form.watch(`features.${index}.description`) &&
                              form.watch(`features.${index}.neonColor`) ? (
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
                            <span className="font-medium text-gray-600">Color:</span>
                            <div className="mt-1">
                              {isValidHexColor(form.watch(`features.${index}.neonColor`) || '') ? (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                                  ✅ Válido
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                                  ❌ Inválido
                                </span>
                              )}
                            </div>
                          </div>
                          <div>
                            <span className="font-medium text-gray-600">CTA:</span>
                            <div className="mt-1">
                              {form.watch(`features.${index}.ctaText`) && form.watch(`features.${index}.ctaUrl`) ? (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                                  ✅ Configurado
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
                                  ➖ Opcional
                                </span>
                              )}
                            </div>
                          </div>
                          <div>
                            <span className="font-medium text-gray-600">Descripción:</span>
                            <div className="mt-1 text-lg font-semibold text-indigo-600">
                              {form.watch(`features.${index}.description`)?.length || 0}
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
                <CardTitle className="text-md">📊 Resumen de Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">Total Features:</span>
                    <div className="mt-1 text-lg font-semibold text-blue-600">{fields.length}</div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Features Completas:</span>
                    <div className="mt-1 text-lg font-semibold text-green-600">
                      {
                        fields.filter(
                          (_, index) =>
                            form.watch(`features.${index}.id`) &&
                            form.watch(`features.${index}.title`) &&
                            form.watch(`features.${index}.description`) &&
                            form.watch(`features.${index}.neonColor`)
                        ).length
                      }
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Con CTA:</span>
                    <div className="mt-1 text-lg font-semibold text-purple-600">
                      {
                        fields.filter(
                          (_, index) =>
                            form.watch(`features.${index}.ctaText`) && form.watch(`features.${index}.ctaUrl`)
                        ).length
                      }
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Colores Válidos:</span>
                    <div className="mt-1 text-lg font-semibold text-orange-600">
                      {
                        fields.filter((_, index) => isValidHexColor(form.watch(`features.${index}.neonColor`) || ''))
                          .length
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
