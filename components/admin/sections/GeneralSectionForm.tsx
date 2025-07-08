// components/forms/GeneralSectionForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { Building2, Search, Tag } from 'lucide-react';
import { GeneralInfoSchema } from '@/lib/schemas/sections';
import { GeneralInfo } from '@/lib/schemas/sections';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface GeneralSectionFormProps {
  data?: Partial<GeneralInfo>;
  onSave: (data: GeneralInfo) => Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
  isCreating?: boolean; // Para saber si es nueva location o edición
}

const AVAILABLE_EXPERIENCES = ['Golf', 'Bowling', 'Duckpin', 'Multisport', 'Events', 'Lessons', 'Corporate'];

const TIMEZONES = ['America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles', 'America/Phoenix'];

export function GeneralSectionForm({
  data,
  onSave,
  onCancel,
  isLoading = false,
  isCreating = false
}: GeneralSectionFormProps) {
  const form = useForm<GeneralInfo>({
    resolver: zodResolver(GeneralInfoSchema),
    defaultValues: {
      name: data?.name || '',
      slug: data?.slug || '',
      enabled: data?.enabled ?? true,
      timezone: data?.timezone || 'America/New_York',
      telephone: data?.telephone || '',
      experiences: data?.experiences || [],
      seoTitle: data?.seoTitle || '',
      seoDescription: data?.seoDescription || ''
    }
  });

  // Auto-generar slug desde el nombre
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remover caracteres especiales
      .replace(/\s+/g, '-') // Espacios a guiones
      .replace(/-+/g, '-'); // Múltiples guiones a uno solo
  };

  const onSubmit = async (formData: GeneralInfo) => {
    await onSave(formData);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="w-5 h-5" />
          {isCreating ? 'Nueva Locación' : 'Información General'}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {isCreating
            ? 'Configura la información básica de la nueva locación'
            : 'Edita la información básica y SEO de la locación'}
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Información Básica */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Información Básica
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre de la Locación *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Chicago River North"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            // Auto-generar slug si estamos creando
                            if (isCreating) {
                              const newSlug = generateSlug(e.target.value);
                              form.setValue('slug', newSlug);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL Slug *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm">
                            /locations/
                          </span>
                          <Input
                            placeholder="chicago-river-north"
                            className="pl-20"
                            {...field}
                            disabled={!isCreating} // Solo editable al crear
                          />
                        </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="telephone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono</FormLabel>
                      <FormControl>
                        <Input placeholder="(555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="timezone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zona Horaria</FormLabel>
                      <FormControl>
                        <Select {...field} onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona una zona horaria" />
                          </SelectTrigger>
                          <SelectContent>
                            {TIMEZONES.map((tz) => (
                              <SelectItem key={tz} value={tz}>
                                {tz.replace('America/', '').replace('_', ' ')}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="enabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Locación activa</FormLabel>
                      <FormDescription>Solo las locaciones activas aparecen en el sitio web</FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {/* Experiencias */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Experiencias Disponibles
              </h3>

              <FormField
                control={form.control}
                name="experiences"
                render={({ field }) => (
                  <FormItem>
                    <FormDescription>Selecciona qué experiencias están disponibles en esta locación</FormDescription>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {AVAILABLE_EXPERIENCES.map((experience) => (
                        <div key={experience} className="flex items-center space-x-2">
                          <Checkbox
                            id={experience}
                            checked={field.value?.includes(experience) || false}
                            onCheckedChange={(checked) => {
                              const currentValue = field.value || []; // ← Garantizar array
                              if (checked) {
                                field.onChange([...currentValue, experience]);
                              } else {
                                field.onChange(currentValue.filter((exp) => exp !== experience));
                              }
                            }}
                          />
                          <label htmlFor={experience} className="text-sm font-medium cursor-pointer">
                            {experience}
                          </label>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-1 flex-wrap mt-2">
                      {field.value?.map((exp) => (
                        <Badge key={exp} variant="secondary">
                          {exp}
                        </Badge>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* SEO */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Search className="w-4 h-4" />
                Configuración SEO
              </h3>

              <FormField
                control={form.control}
                name="seoTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título SEO</FormLabel>
                    <FormControl>
                      <Input placeholder="Five Iron Golf Chicago River North - Indoor Golf Simulators" {...field} />
                    </FormControl>
                    <FormDescription>
                      Aparece en Google y en la pestaña del navegador (máx. 60 caracteres)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="seoDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción SEO</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Discover Five Iron Golf in Chicago's River North. Premium indoor golf simulators, expert instruction, and full-service bar in the heart of downtown."
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Aparece en los resultados de Google (máx. 160 caracteres)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Botones */}
            <div className="flex justify-end gap-3 pt-6 border-t">
              {onCancel && (
                <Button type="button" variant="outline" onClick={onCancel}>
                  Cancelar
                </Button>
              )}
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Guardando...' : isCreating ? 'Crear Locación' : 'Guardar Cambios'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
