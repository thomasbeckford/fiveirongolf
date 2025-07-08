// components/forms/HoursSectionForm.tsx
'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { HoursContentSchema, type HoursContent } from '@/lib/schemas/sections';
import { Loader2, Eye, EyeOff, Plus, Trash2, Clock, Calendar, Star } from 'lucide-react';

interface HoursSectionFormProps {
  data: HoursContent;
  onSave: (data: HoursContent) => void;
  onCancel?: () => void;
  isLoading?: boolean;

  isEnabled?: boolean;
  onToggleEnabled?: (enabled: boolean) => void;
}

export function HoursSectionForm({
  data,
  onSave,
  onCancel,
  isLoading,

  isEnabled = true,
  onToggleEnabled
}: HoursSectionFormProps) {
  const form = useForm<HoursContent>({
    resolver: zodResolver(HoursContentSchema),
    defaultValues: {
      backgroundImage: data?.backgroundImage || '',
      regularHours: data?.regularHours || [
        {
          days: '',
          hours: ''
        }
      ],
      specialHours: data?.specialHours || []
    }
  });

  const specialHours = form.watch('specialHours') || [];

  const {
    fields: regularFields,
    append: appendRegular,
    remove: removeRegular
  } = useFieldArray({
    control: form.control,
    name: 'regularHours'
  });

  const {
    fields: specialFields,
    append: appendSpecial,
    remove: removeSpecial
  } = useFieldArray({
    control: form.control,
    name: 'specialHours'
  });

  const onSubmit = (formData: HoursContent) => {
    onSave(formData);
  };

  const addRegularHours = () => {
    appendRegular({
      days: '',
      hours: ''
    });
  };

  const addSpecialHours = () => {
    appendSpecial({
      description: '',
      hours: ''
    });
  };

  // Predefined options for quick selection
  const dayOptions = ['Monday - Friday', 'Monday - Thursday', 'Friday', 'Saturday', 'Sunday', 'Weekend', 'Weekdays'];

  const hourOptions = ['6AM - 11PM', '6AM - 1AM', '8AM - 1AM', '8AM - 11PM', '9AM - 10PM', '24 Hours'];

  return (
    <Card className="w-full max-w-5xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          ⏰ Hours Section
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
            {/* Background Image */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Configuración General</h3>

              <FormField
                control={form.control}
                name="backgroundImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Imagen de Fondo</FormLabel>
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
            </div>

            {/* Regular Hours */}
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Horarios Regulares
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addRegularHours}
                    className="transition-all duration-200"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar Horario
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {regularFields.map((field, index) => (
                  <Card key={field.id} className="bg-accent border border-accent-foreground/10">
                    <CardContent className="pt-4">
                      <div className="flex items-end gap-4">
                        <div className="flex-1 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name={`regularHours.${index}.days`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    Días
                                  </FormLabel>
                                  <FormControl>
                                    <div className="space-y-2">
                                      <Input
                                        placeholder="Monday - Thursday"
                                        {...field}
                                        className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                                      />
                                      <div className="flex flex-wrap gap-1">
                                        {dayOptions.map((option) => (
                                          <Button
                                            key={option}
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="h-6 px-2 text-xs text-blue-600 hover:bg-blue-100"
                                            onClick={() => field.onChange(option)}
                                          >
                                            {option}
                                          </Button>
                                        ))}
                                      </div>
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name={`regularHours.${index}.hours`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    Horarios
                                  </FormLabel>
                                  <FormControl>
                                    <div className="space-y-2">
                                      <Input
                                        placeholder="6AM - 11PM"
                                        {...field}
                                        className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                                      />
                                      <div className="flex flex-wrap gap-1">
                                        {hourOptions.map((option) => (
                                          <Button
                                            key={option}
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="h-6 px-2 text-xs text-blue-600 hover:bg-blue-100"
                                            onClick={() => field.onChange(option)}
                                          >
                                            {option}
                                          </Button>
                                        ))}
                                      </div>
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>

                        {regularFields.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeRegular(index)}
                            className="text-red-500 hover:text-red-700 mb-4"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {/* Special Hours */}
            <Card className="border-l-4 border-l-amber-500">
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Horarios Especiales
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addSpecialHours}
                    className="transition-all duration-200"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar Especial
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {specialFields.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Star className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No hay horarios especiales configurados</p>
                    <p className="text-sm">Agrega horarios para eventos especiales, descuentos o promociones</p>
                  </div>
                )}

                {specialFields.map((field, index) => (
                  <Card key={field.id} className="bg-accent border border-accent-foreground/10">
                    <CardContent className="pt-4">
                      <div className="flex items-end gap-4">
                        <div className="flex-1 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name={`specialHours.${index}.description`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="flex items-center gap-2">
                                    <Star className="h-4 w-4" />
                                    Descripción
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Member Benefits (M-F)"
                                      {...field}
                                      className="transition-all duration-200 focus:ring-2 focus:ring-amber-500"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name={`specialHours.${index}.hours`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    Horarios
                                  </FormLabel>
                                  <FormControl>
                                    <div className="space-y-2">
                                      <Input
                                        placeholder="6AM - 4PM"
                                        {...field}
                                        className="transition-all duration-200 focus:ring-2 focus:ring-amber-500"
                                      />
                                      <div className="flex flex-wrap gap-1">
                                        {hourOptions.map((option) => (
                                          <Button
                                            key={option}
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="h-6 px-2 text-xs text-amber-600 hover:bg-amber-100"
                                            onClick={() => field.onChange(option)}
                                          >
                                            {option}
                                          </Button>
                                        ))}
                                      </div>
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>

                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSpecial(index)}
                          className="text-red-500 hover:text-red-700 mb-4"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {/* Preview Section */}
            <Card className="bg-accent border border-accent-foreground/10">
              <CardHeader>
                <CardTitle className="text-lg">👁️ Vista Previa</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-blue-700 mb-2">Horarios Regulares:</h4>
                    <div className="space-y-1">
                      {form.watch('regularHours')?.map((hour, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="font-medium">{hour.days || 'Días sin especificar'}</span>
                          <span>{hour.hours || 'Horarios sin especificar'}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {specialHours.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-amber-700 mb-2">Horarios Especiales:</h4>
                      <div className="space-y-1">
                        {specialHours.map((hour, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span className="font-medium">{hour.description || 'Sin descripción'}</span>
                            <span>{hour.hours || 'Horarios sin especificar'}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
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
