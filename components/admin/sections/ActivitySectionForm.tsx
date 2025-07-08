// components/forms/ActivitySectionForm.tsx
'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ActivityContentSchema, type ActivityContent } from '@/lib/schemas/sections';
import { Loader2, Eye, EyeOff, Plus, Trash2, GripVertical } from 'lucide-react';

interface ActivitySectionFormProps {
  data: ActivityContent;
  onSave: (data: ActivityContent) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  isEnabled?: boolean;
  onToggleEnabled?: (enabled: boolean) => void;
}

export function ActivitySectionForm({
  data,
  onSave,
  onCancel,
  isLoading,
  isEnabled = true,
  onToggleEnabled
}: ActivitySectionFormProps) {
  const form = useForm<ActivityContent>({
    resolver: zodResolver(ActivityContentSchema),
    defaultValues: {
      services: data?.services || [
        {
          title: '',
          subtitle: '',
          description: '',
          pricing: [],
          pricingLabel: '',
          primaryCta: {
            text: '',
            url: ''
          },
          secondaryCta: {
            text: '',
            url: ''
          }
        }
      ]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'services'
  });

  const onSubmit = (formData: ActivityContent) => {
    onSave(formData);
  };

  const addService = () => {
    append({
      title: '',
      subtitle: '',
      description: '',
      pricing: [],
      pricingLabel: '',
      primaryCta: {
        text: '',
        url: ''
      },
      secondaryCta: {
        text: '',
        url: ''
      }
    });
  };

  const addPricing = (serviceIndex: number) => {
    const currentPricing = form.watch(`services.${serviceIndex}.pricing`) || [];
    form.setValue(`services.${serviceIndex}.pricing`, [...currentPricing, '']);
  };

  const removePricing = (serviceIndex: number, pricingIndex: number) => {
    const currentPricing = form.watch(`services.${serviceIndex}.pricing`) || [];
    const newPricing = currentPricing.filter((_, index) => index !== pricingIndex);
    form.setValue(`services.${serviceIndex}.pricing`, newPricing);
  };

  return (
    <Card className="w-full max-w-6xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🏌️ Activities Section
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
            {/* Servicios */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Servicios</h3>
                <Button type="button" variant="outline" onClick={addService} className="transition-all duration-200">
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Servicio
                </Button>
              </div>

              {fields.map((field, index) => (
                <Card key={field.id} className="border-l-4 border-l-orange-500">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <GripVertical className="h-4 w-4 text-gray-400" />
                        🏌️ Servicio {index + 1}
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
                    {/* Títulos */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`services.${index}.title`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Título *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="PLAY &"
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
                        name={`services.${index}.subtitle`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subtítulo *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="PRACTICE"
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
                      name={`services.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descripción</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Descripción detallada del servicio..."
                              className="min-h-[120px] transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Pricing Section */}
                    <Card className="bg-accent border border-accent-foreground/10">
                      <CardHeader>
                        <CardTitle className="text-md flex items-center justify-between">
                          💰 Precios
                          <Button type="button" variant="link" size="sm" onClick={() => addPricing(index)}>
                            <Plus className="h-3 w-3 mr-1" />
                            Agregar Precio
                          </Button>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <FormField
                          control={form.control}
                          name={`services.${index}.pricingLabel`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Etiqueta de Precios</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="SIM RENTAL PRICING"
                                  {...field}
                                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {form.watch(`services.${index}.pricing`)?.map((_, pricingIndex) => (
                          <div key={pricingIndex} className="flex items-center gap-2">
                            <FormField
                              control={form.control}
                              name={`services.${index}.pricing.${pricingIndex}`}
                              render={({ field }) => (
                                <FormItem className="flex-1">
                                  <FormControl>
                                    <Input
                                      placeholder="Starting at $45/hour"
                                      {...field}
                                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removePricing(index, pricingIndex)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    {/* CTAs */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {/* Primary CTA */}
                      <Card className="bg-accent border border-accent-foreground/10">
                        <CardHeader>
                          <CardTitle className="text-md">🎯 CTA Principal</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <FormField
                            control={form.control}
                            name={`services.${index}.primaryCta.text`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Texto del Botón</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="BOOK A SIM"
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
                            name={`services.${index}.primaryCta.url`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>URL del Botón</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="#booking"
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

                      {/* Secondary CTA */}
                      <Card className="bg-accent border border-accent-foreground/10">
                        <CardHeader>
                          <CardTitle className="text-md">🔗 CTA Secundario</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <FormField
                            control={form.control}
                            name={`services.${index}.secondaryCta.text`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Texto del Botón</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="WAYS TO PLAY"
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
                            name={`services.${index}.secondaryCta.url`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>URL del Botón</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="#info"
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
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

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
