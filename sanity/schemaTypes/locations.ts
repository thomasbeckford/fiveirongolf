// schemas/location.ts - CON SECCIONES EMBEBIDAS
import { defineField, defineType } from 'sanity';
import { PinIcon } from '@sanity/icons';

const PageSection = {
  GENERAL: 'GENERAL',
  HERO: 'HERO',
  ACTIVITIES: 'ACTIVITIES',
  GALLERY: 'GALLERY',
  HOURS: 'HOURS',
  MEMBERSHIP: 'MEMBERSHIP',
  INSTRUCTORS: 'INSTRUCTORS',
  MULTISPORT: 'MULTISPORT',
  DUCKPIN: 'DUCKPIN',
  REVIEWS: 'REVIEWS',
  FEATURES: 'FEATURES',
  FOOTER: 'FOOTER'
};

export const locationSchema = defineType({
  name: 'location',
  title: 'Five Iron Golf Location',
  type: 'document',
  icon: PinIcon,

  // GRUPOS para organizar visualmente los campos
  groups: [
    {
      name: PageSection.GENERAL,
      title: 'Basic Info',
      icon: PinIcon,
      default: true
    },
    {
      name: PageSection.HERO,
      title: 'Hero Section',
      icon: () => '🎭'
    },
    {
      name: PageSection.ACTIVITIES,
      title: 'Activities',
      icon: () => '⛳'
    },
    {
      name: PageSection.HOURS,
      title: 'Hours & Contact',
      icon: () => '🕐'
    },
    {
      name: PageSection.MEMBERSHIP,
      title: 'Membership',
      icon: () => '👥'
    }
  ],

  fields: [
    // ==================== BASIC INFO ====================
    defineField({
      name: 'name',
      title: 'Location Name',
      type: 'string',
      group: PageSection.GENERAL,
      validation: (Rule) => Rule.required(),
      description: 'e.g., "Chicago River North"'
    }),

    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: PageSection.GENERAL,
      options: {
        source: 'name',
        maxLength: 96
      },
      validation: (Rule) => Rule.required()
    }),

    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      group: PageSection.GENERAL,
      options: {
        list: [
          { title: '🟢 Active', value: 'active' },
          { title: '🟡 Coming Soon', value: 'coming-soon' },
          { title: '🔴 Temporarily Closed', value: 'temp-closed' },
          { title: '⚫ Permanently Closed', value: 'closed' }
        ],
        layout: 'radio'
      },
      initialValue: 'active'
    }),

    // Información básica compacta
    defineField({
      name: PageSection.GENERAL,
      title: 'Contact & Location',
      type: 'object',
      group: PageSection.GENERAL,
      options: {
        collapsible: true,
        collapsed: false
      },
      fields: [
        defineField({
          name: 'address',
          title: 'Full Address',
          type: 'string',
          validation: (Rule) => Rule.required()
        }),
        defineField({
          name: 'phone',
          title: 'Phone',
          type: 'string',
          validation: (Rule) => Rule.required()
        }),
        defineField({
          name: 'email',
          title: 'Email',
          type: 'email',
          validation: (Rule) => Rule.required()
        }),
        defineField({
          name: 'coordinates',
          title: 'GPS Location',
          type: 'geopoint',
          description: 'Click on map or enter coordinates'
        }),
        defineField({
          name: 'timezone',
          title: 'Timezone',
          type: 'string',
          options: {
            list: [
              { title: 'Eastern Time', value: 'America/New_York' },
              { title: 'Central Time', value: 'America/Chicago' },
              { title: 'Mountain Time', value: 'America/Denver' },
              { title: 'Pacific Time', value: 'America/Los_Angeles' }
            ]
          }
        })
      ]
    }),

    defineField({
      name: 'experiences',
      title: 'Available Experiences',
      type: 'array',
      group: PageSection.GENERAL,
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: '⛳ Golf', value: 'Golf' },
          { title: '🎳 Bowling', value: 'Bowling' },
          { title: '🏀 Multisport', value: 'Multisport' }
        ]
      }
    }),

    defineField({
      name: 'duckpinBowling',
      title: 'Has Duckpin Bowling',
      type: 'boolean',
      group: PageSection.GENERAL,
      initialValue: false
    }),

    // ==================== HERO SECTION ====================
    defineField({
      name: PageSection.HERO,
      title: 'Hero Content',
      type: 'object',
      group: PageSection.HERO,
      options: {
        collapsible: true,
        collapsed: false
      },
      fields: [
        defineField({
          name: 'title',
          title: 'Main Title',
          type: 'string',
          description: 'e.g., "Chicago"'
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'string',
          description: 'e.g., "River North"'
        }),
        defineField({
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: {
            hotspot: true,
            metadata: ['blurhash', 'lqip', 'palette']
          }
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 4
        }),
        defineField({
          name: 'contactInfo',
          title: 'Display Contact Info',
          type: 'object',
          options: {
            collapsible: true,
            collapsed: true
          },
          fields: [
            defineField({
              name: 'address',
              title: 'Display Address',
              type: 'string',
              description: 'Address shown in hero (can be different from main address)'
            }),
            defineField({
              name: 'phone',
              title: 'Display Phone',
              type: 'string'
            }),
            defineField({
              name: 'email',
              title: 'Display Email',
              type: 'string'
            })
          ]
        }),
        defineField({
          name: 'cta',
          title: 'Call to Action',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Button Text',
              type: 'string',
              initialValue: 'Book Now'
            }),
            defineField({
              name: 'url',
              title: 'Button URL',
              type: 'url'
            })
          ]
        })
      ]
    }),

    // ==================== ACTIVITIES SECTION ====================
    defineField({
      name: PageSection.ACTIVITIES,
      title: 'Activities & Services',
      type: 'object',
      group: PageSection.ACTIVITIES,
      options: {
        collapsible: true,
        collapsed: false
      },
      fields: [
        defineField({
          name: 'services',
          title: 'Services List',
          type: 'array',
          of: [
            {
              type: 'object',
              icon: () => '📋',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Service Title',
                  type: 'string',
                  description: 'e.g., "PLAY &"'
                }),
                defineField({
                  name: 'subtitle',
                  title: 'Service Subtitle',
                  type: 'string',
                  description: 'e.g., "PRACTICE"'
                }),
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                  rows: 4
                }),
                defineField({
                  name: 'highlights',
                  title: 'Highlights',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        defineField({
                          name: 'label',
                          title: 'Label',
                          type: 'string'
                        }),
                        defineField({
                          name: 'text',
                          title: 'Text',
                          type: 'string'
                        })
                      ]
                    }
                  ]
                }),
                defineField({
                  name: 'pricing',
                  title: 'Pricing Info',
                  type: 'array',
                  of: [{ type: 'string' }]
                }),
                defineField({
                  name: 'pricingLabel',
                  title: 'Pricing Label',
                  type: 'string'
                }),
                defineField({
                  name: 'primaryCta',
                  title: 'Primary Button',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'text',
                      title: 'Button Text',
                      type: 'string'
                    }),
                    defineField({
                      name: 'url',
                      title: 'Button URL',
                      type: 'string'
                    })
                  ]
                }),
                defineField({
                  name: 'secondaryCta',
                  title: 'Secondary Button',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'text',
                      title: 'Button Text',
                      type: 'string'
                    }),
                    defineField({
                      name: 'url',
                      title: 'Button URL',
                      type: 'string'
                    })
                  ]
                })
              ],
              preview: {
                select: {
                  title: 'title',
                  subtitle: 'subtitle'
                },
                prepare(selection: { title?: string; subtitle?: string }) {
                  return {
                    title: `${selection.title || ''} ${selection.subtitle || ''}`.trim() || 'Untitled Service',
                    subtitle: 'Activity'
                  };
                }
              }
            }
          ]
        })
      ]
    }),

    // ==================== HOURS SECTION ====================
    defineField({
      name: PageSection.HOURS,
      title: 'Hours & Contact',
      type: 'object',
      group: PageSection.HOURS,
      options: {
        collapsible: true,
        collapsed: false
      },
      fields: [
        defineField({
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: { hotspot: true }
        }),
        defineField({
          name: 'address',
          title: 'Address Display',
          type: 'object',
          fields: [
            defineField({
              name: 'street',
              title: 'Street',
              type: 'string'
            }),
            defineField({
              name: 'city',
              title: 'City',
              type: 'string'
            }),
            defineField({
              name: 'state',
              title: 'State',
              type: 'string'
            }),
            defineField({
              name: 'zip',
              title: 'ZIP Code',
              type: 'string'
            })
          ]
        }),
        defineField({
          name: 'regularHours',
          title: 'Regular Hours',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'days',
                  title: 'Days',
                  type: 'string'
                }),
                defineField({
                  name: 'hours',
                  title: 'Hours',
                  type: 'string'
                })
              ],
              preview: {
                select: {
                  days: 'days',
                  hours: 'hours'
                },
                prepare(selection: { days?: string; hours?: string }) {
                  return {
                    title: selection.days || 'Days',
                    subtitle: selection.hours || 'Hours'
                  };
                }
              }
            }
          ]
        }),
        defineField({
          name: 'specialHours',
          title: 'Special Hours',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'string'
                }),
                defineField({
                  name: 'hours',
                  title: 'Hours',
                  type: 'string'
                })
              ],
              preview: {
                select: {
                  description: 'description',
                  hours: 'hours'
                },
                prepare(selection: { description?: string; hours?: string }) {
                  return {
                    title: selection.description || 'Special Hours',
                    subtitle: selection.hours || 'Hours'
                  };
                }
              }
            }
          ]
        })
      ]
    }),

    // ==================== MEMBERSHIP SECTION ====================
    defineField({
      name: PageSection.MEMBERSHIP,
      title: 'Membership Info',
      type: 'object',
      group: PageSection.MEMBERSHIP,
      options: {
        collapsible: true,
        collapsed: false
      },
      fields: [
        defineField({
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: { hotspot: true }
        }),
        defineField({
          name: 'title',
          title: 'Main Title',
          type: 'string',
          initialValue: 'BECOME A MEMBER'
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'string',
          initialValue: 'ENJOY PERKS THAT BREAK PAR!'
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 4
        }),
        defineField({
          name: 'pricing',
          title: 'Pricing',
          type: 'object',
          fields: [
            defineField({
              name: 'monthlyPrice',
              title: 'Monthly Price',
              type: 'string',
              description: 'e.g., "$279/mo."'
            }),
            defineField({
              name: 'terms',
              title: 'Terms',
              type: 'string',
              description: 'e.g., "No initiation fees. Cancel any time."'
            })
          ]
        }),
        defineField({
          name: 'benefits',
          title: 'Membership Benefits',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Benefit Title',
                  type: 'string'
                }),
                defineField({
                  name: 'description',
                  title: 'Benefit Description',
                  type: 'string'
                })
              ],
              preview: {
                select: {
                  title: 'title',
                  description: 'description'
                },
                prepare(selection: { title?: string; description?: string }) {
                  return {
                    title: selection.title || 'Benefit',
                    subtitle: selection.description
                  };
                }
              }
            }
          ]
        }),
        defineField({
          name: 'giftCard',
          title: 'Gift Card Section',
          type: 'object',
          options: {
            collapsible: true,
            collapsed: true
          },
          fields: [
            defineField({
              name: 'title',
              title: 'Gift Card Title',
              type: 'string',
              initialValue: 'A 5i GIFT CARD MAKES THE PERFECT GIFT'
            }),
            defineField({
              name: 'buttonText',
              title: 'Button Text',
              type: 'string',
              initialValue: 'BUY GIFT CARD'
            }),
            defineField({
              name: 'url',
              title: 'Button URL',
              type: 'url'
            })
          ]
        })
      ]
    }),

    // ==================== SEO ====================
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      group: PageSection.GENERAL,
      options: {
        collapsible: true,
        collapsed: true
      },
      fields: [
        defineField({
          name: 'title',
          title: 'Page Title',
          type: 'string',
          validation: (Rule) => Rule.max(60),
          description: 'Keep under 60 characters for Google'
        }),
        defineField({
          name: 'description',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.max(160),
          description: 'Keep under 160 characters for Google'
        })
      ]
    })
  ],

  // Preview mejorado
  preview: {
    select: {
      title: 'name',
      subtitle: 'basicInfo.address',
      status: 'status',
      media: 'heroSection.backgroundImage'
    },
    prepare(selection: { title?: string; subtitle?: string; status?: string; media?: any }) {
      const { title, subtitle, status } = selection;

      const statusEmojiMap: Record<string, string> = {
        active: '🟢',
        'coming-soon': '🟡',
        'temp-closed': '🔴',
        closed: '⚫'
      };

      const statusEmoji = status && status in statusEmojiMap ? statusEmojiMap[status] : '🟢';

      return {
        title: `${statusEmoji} ${title || 'Untitled Location'}`,
        subtitle: subtitle || 'No address provided'
      };
    }
  },

  // Ordenamiento
  orderings: [
    {
      title: 'Status & Name',
      name: 'statusName',
      by: [
        { field: 'status', direction: 'asc' },
        { field: 'name', direction: 'asc' }
      ]
    },
    {
      title: 'Recently Updated',
      name: 'updated',
      by: [{ field: '_updatedAt', direction: 'desc' }]
    }
  ]
});
