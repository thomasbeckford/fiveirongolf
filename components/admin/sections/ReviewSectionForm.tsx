// components/forms/ReviewSectionForm.tsx
'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ReviewContentSchema, type ReviewContent } from '@/lib/schemas/sections';
import { toggleSectionEnabled } from '@/server/sections/update';
import { PageSection } from '@/lib/generated/prisma';
import { Loader2, Eye, EyeOff, Plus, Trash2, GripVertical, Star } from 'lucide-react';
import { useState } from 'react';

interface ReviewSectionFormProps {
  data: ReviewContent;
  onSave: (data: ReviewContent) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  id: string;
  isEnabled?: boolean;
}

export function ReviewSectionForm({ data, onSave, onCancel, isLoading, id, isEnabled = true }: ReviewSectionFormProps) {
  const [isToggling, setIsToggling] = useState(false);

  const form = useForm<ReviewContent>({
    resolver: zodResolver(ReviewContentSchema),
    defaultValues: {
      title: data?.title || '',
      reviews: data?.reviews || [
        {
          rating: 5,
          text: '',
          author: ''
        }
      ],
      ctaText: data?.ctaText || '',
      ctaUrl: data?.ctaUrl || ''
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'reviews'
  });

  const onSubmit = (formData: ReviewContent) => {
    onSave(formData);
  };

  const handleToggleSection = async () => {
    setIsToggling(true);
    try {
      await toggleSectionEnabled({
        locationId: id,
        page: PageSection.REVIEWS,
        enabled: !isEnabled
      });
    } catch (error) {
      console.error('Error toggling section:', error);
    } finally {
      setIsToggling(false);
    }
  };

  const addReview = () => {
    append({
      rating: 5,
      text: '',
      author: ''
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
    ));
  };

  return (
    <Card className="w-full max-w-6xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          ⭐ Reviews Section
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
            {/* Título Principal */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título de la Sección *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="FIVE IRON GOLF RIVER NORTH REVIEWS"
                      {...field}
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Reviews */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Reseñas</h3>
                <Button type="button" variant="outline" onClick={addReview} className="transition-all duration-200">
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Reseña
                </Button>
              </div>

              {fields.map((field, index) => (
                <Card key={field.id} className="border-l-4 border-l-yellow-500">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <GripVertical className="h-4 w-4 text-gray-400" />⭐ Reseña {index + 1}
                        <div className="flex items-center gap-1 ml-2">
                          {renderStars(form.watch(`reviews.${index}.rating`) || 5)}
                        </div>
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
                    {/* Rating y Autor */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`reviews.${index}.rating`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Calificación *</FormLabel>
                            <Select
                              onValueChange={(value) => field.onChange(parseInt(value))}
                              defaultValue={field.value?.toString()}
                            >
                              <FormControl>
                                <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-blue-500">
                                  <SelectValue placeholder="Selecciona una calificación" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="1">1 ⭐</SelectItem>
                                <SelectItem value="2">2 ⭐⭐</SelectItem>
                                <SelectItem value="3">3 ⭐⭐⭐</SelectItem>
                                <SelectItem value="4">4 ⭐⭐⭐⭐</SelectItem>
                                <SelectItem value="5">5 ⭐⭐⭐⭐⭐</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`reviews.${index}.author`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Autor *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Eric S."
                                {...field}
                                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Texto de la Reseña */}
                    <FormField
                      control={form.control}
                      name={`reviews.${index}.text`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Texto de la Reseña *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="This place is AWESOME! It has everything that you need from golf to lessons, food and a full bar. Please come check it out!"
                              className="min-h-[120px] transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* CTA Section */}
            <Card className="bg-accent border border-accent-foreground/10">
              <CardHeader>
                <CardTitle className="text-md">🎯 Call to Action</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="ctaText"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Texto del Botón</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="BOOK NOW"
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
                    name="ctaUrl"
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
