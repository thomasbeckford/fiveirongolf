// components/forms/FooterSectionForm.tsx
'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FooterContentSchema, type FooterContent } from '@/lib/schemas/sections';
import { toggleSectionEnabled } from '@/server/sections/update';
import { PageSection } from '@/lib/generated/prisma';
import {
  Loader2,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  GripVertical,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Share2
} from 'lucide-react';
import { useState } from 'react';

interface FooterSectionFormProps {
  data: FooterContent;
  onSave: (data: FooterContent) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  id: string;
  isEnabled?: boolean;
}

export function FooterSectionForm({ data, onSave, onCancel, isLoading, id, isEnabled = true }: FooterSectionFormProps) {
  const [isToggling, setIsToggling] = useState(false);

  const form = useForm<FooterContent>({
    resolver: zodResolver(FooterContentSchema),
    defaultValues: {
      newsletter: {
        title: data?.newsletter?.title || '',
        locations: data?.newsletter?.locations || [
          {
            label: '',
            value: ''
          }
        ],
        disclaimer: data?.newsletter?.disclaimer || ''
      },
      brand: {
        tagline: data?.brand?.tagline || '',
        socialMedia: data?.brand?.socialMedia || [
          {
            platform: 'instagram',
            url: ''
          }
        ]
      },
      quickLinks: data?.quickLinks || [
        {
          label: '',
          url: ''
        }
      ],
      moreLinks: data?.moreLinks || [
        {
          label: '',
          url: ''
        }
      ],
      contact: {
        email: data?.contact?.email || '',
        phone: data?.contact?.phone || ''
      },
      copyright: data?.copyright || ''
    }
  });

  const {
    fields: locationFields,
    append: appendLocation,
    remove: removeLocation
  } = useFieldArray({
    control: form.control,
    name: 'newsletter.locations'
  });

  const {
    fields: socialFields,
    append: appendSocial,
    remove: removeSocial
  } = useFieldArray({
    control: form.control,
    name: 'brand.socialMedia'
  });

  const {
    fields: quickLinkFields,
    append: appendQuickLink,
    remove: removeQuickLink
  } = useFieldArray({
    control: form.control,
    name: 'quickLinks'
  });

  const {
    fields: moreLinkFields,
    append: appendMoreLink,
    remove: removeMoreLink
  } = useFieldArray({
    control: form.control,
    name: 'moreLinks'
  });

  const onSubmit = (formData: FooterContent) => {
    onSave(formData);
  };

  const handleToggleSection = async () => {
    setIsToggling(true);
    try {
      await toggleSectionEnabled({
        locationId: id,
        page: PageSection.FOOTER,
        enabled: !isEnabled
      });
    } catch (error) {
      console.error('Error toggling section:', error);
    } finally {
      setIsToggling(false);
    }
  };

  const addLocation = () => {
    appendLocation({
      label: '',
      value: ''
    });
  };

  const addSocialMedia = () => {
    appendSocial({
      platform: 'instagram',
      url: ''
    });
  };

  const addQuickLink = () => {
    appendQuickLink({
      label: '',
      url: '',
      value: ''
    });
  };

  const addMoreLink = () => {
    appendMoreLink({
      label: '',
      url: '',
      value: ''
    });
  };

  const generateSlug = (label: string) => {
    return label
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const socialPlatforms = ['instagram', 'twitter', 'facebook', 'youtube', 'linkedin', 'tiktok', 'pinterest'];

  const getSocialIcon = (platform: string) => {
    const icons: { [key: string]: string } = {
      instagram: '📷',
      twitter: '🐦',
      facebook: '📘',
      youtube: '📺',
      linkedin: '💼',
      tiktok: '🎵',
      pinterest: '📌'
    };
    return icons[platform] || '🔗';
  };

  return (
    <Card className="w-full max-w-6xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🦶 Footer Section
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
            {/* Newsletter Section */}
            <Card className="bg-accent border border-accent-foreground/10">
              <CardHeader>
                <CardTitle className="text-md flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Newsletter
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="newsletter.title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título del Newsletter</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="SUBSCRIBE TO STAY IN THE 5i LOOP"
                          {...field}
                          className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Locations */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Ubicaciones</h4>
                    <Button type="button" variant="outline" size="sm" onClick={addLocation}>
                      <Plus className="h-3 w-3 mr-1" />
                      Agregar
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {locationFields.map((field, index) => (
                      <Card key={field.id} className="border-l-4 border-l-blue-500">
                        <CardContent className="p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Ubicación {index + 1}</span>
                            {locationFields.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeLocation(index)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                          <div className="space-y-2">
                            <FormField
                              control={form.control}
                              name={`newsletter.locations.${index}.label`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      placeholder="Chicago River North"
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
                              name={`newsletter.locations.${index}.value`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <div className="flex gap-2">
                                      <Input
                                        placeholder="chicago-river-north"
                                        {...field}
                                        className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                                      />
                                      <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                          const label = form.watch(`newsletter.locations.${index}.label`);
                                          if (label) {
                                            field.onChange(generateSlug(label));
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
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="newsletter.disclaimer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Disclaimer Legal</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="I consent to receive email communication from Five Iron Golf and agree to the terms of their privacy policy..."
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

            {/* Brand Section */}
            <Card className="bg-accent border border-accent-foreground/10">
              <CardHeader>
                <CardTitle className="text-md flex items-center gap-2">
                  <Share2 className="h-4 w-4" />
                  Marca y Redes Sociales
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="brand.tagline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tagline de la Marca</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="It's all good form at Five Iron!"
                          {...field}
                          className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Social Media */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Redes Sociales</h4>
                    <Button type="button" variant="outline" size="sm" onClick={addSocialMedia}>
                      <Plus className="h-3 w-3 mr-1" />
                      Agregar Red
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {socialFields.map((field, index) => (
                      <Card key={field.id} className="border-l-4 border-l-pink-500">
                        <CardContent className="p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium flex items-center gap-2">
                              {getSocialIcon(form.watch(`brand.socialMedia.${index}.platform`))}
                              Red Social {index + 1}
                            </span>
                            {socialFields.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeSocial(index)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                          <div className="space-y-2">
                            <FormField
                              control={form.control}
                              name={`brand.socialMedia.${index}.platform`}
                              render={({ field }) => (
                                <FormItem>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Selecciona plataforma" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {socialPlatforms.map((platform) => (
                                        <SelectItem key={platform} value={platform}>
                                          {getSocialIcon(platform)}{' '}
                                          {platform.charAt(0).toUpperCase() + platform.slice(1)}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`brand.socialMedia.${index}.url`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      placeholder="https://instagram.com/fiveirongolf"
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
              </CardContent>
            </Card>

            {/* Quick Links and More Links */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Quick Links */}
              <Card className="bg-accent border border-accent-foreground/10">
                <CardHeader>
                  <CardTitle className="text-md flex items-center justify-between">
                    🔗 Enlaces Rápidos
                    <Button type="button" variant="outline" size="sm" onClick={addQuickLink}>
                      <Plus className="h-3 w-3 mr-1" />
                      Agregar
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {quickLinkFields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-2">
                      <GripVertical className="h-4 w-4 text-gray-400" />
                      <FormField
                        control={form.control}
                        name={`quickLinks.${index}.label`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
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
                        name={`quickLinks.${index}.url`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
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
                      {quickLinkFields.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeQuickLink(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* More Links */}
              <Card className="bg-accent border border-accent-foreground/10">
                <CardHeader>
                  <CardTitle className="text-md flex items-center justify-between">
                    📋 Más Enlaces
                    <Button type="button" variant="outline" size="sm" onClick={addMoreLink}>
                      <Plus className="h-3 w-3 mr-1" />
                      Agregar
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {moreLinkFields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-2">
                      <GripVertical className="h-4 w-4 text-gray-400" />
                      <FormField
                        control={form.control}
                        name={`moreLinks.${index}.label`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input
                                placeholder="FRANCHISING"
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
                        name={`moreLinks.${index}.url`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input
                                placeholder="#franchising"
                                {...field}
                                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {moreLinkFields.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeMoreLink(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <Card className="bg-accent border border-accent-foreground/10">
              <CardHeader>
                <CardTitle className="text-md flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Información de Contacto
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="contact.email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Mail className="h-3 w-3" />
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="info@fiveirongolf.com"
                            {...field}
                            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                          />
                        </FormControl>
                        <FormMessage />
                        {field.value && !isValidEmail(field.value) && (
                          <p className="text-xs text-red-500 mt-1">Formato de email inválido</p>
                        )}
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contact.phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Phone className="h-3 w-3" />
                          Teléfono
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="+1-800-GOLF-5i"
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

            {/* Copyright */}
            <FormField
              control={form.control}
              name="copyright"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Copyright</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Five Iron Golf 2025 © All Rights Reserved"
                      {...field}
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Información General */}
            <Card className="bg-accent border border-accent-foreground/10">
              <CardHeader>
                <CardTitle className="text-md">📊 Resumen del Footer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">Ubicaciones:</span>
                    <div className="mt-1 text-lg font-semibold text-blue-600">{locationFields.length}</div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Redes Sociales:</span>
                    <div className="mt-1 text-lg font-semibold text-pink-600">{socialFields.length}</div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Enlaces Rápidos:</span>
                    <div className="mt-1 text-lg font-semibold text-green-600">{quickLinkFields.length}</div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Más Enlaces:</span>
                    <div className="mt-1 text-lg font-semibold text-purple-600">{moreLinkFields.length}</div>
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
