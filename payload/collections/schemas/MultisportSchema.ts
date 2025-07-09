import { Tab } from 'payload';

export const MultisportSchema: Tab = {
  label: 'Multisport',
  fields: [
    {
      type: 'group',
      name: 'MultisportSchema',
      label: 'Multisport Games',
      fields: [
        {
          name: 'topBanner',
          label: 'Top Banner Text',
          type: 'text',
          admin: {
            description: 'Main banner text above the multisport section'
          }
        },

        {
          name: 'title',
          label: 'Title',
          type: 'text'
        },

        {
          name: 'subtitle',
          label: 'Subtitle',
          type: 'text'
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          required: true
        },
        {
          name: 'ctaText',
          label: 'CTA Button Text',
          type: 'text',
          admin: {
            description: 'Call-to-action button text'
          }
        },
        {
          name: 'ctaUrl',
          label: 'CTA Button URL',
          type: 'text',
          admin: {
            description: 'Call-to-action button link'
          }
        },

        {
          name: 'slides',
          label: 'Multisport Slides',
          type: 'array',
          fields: [
            {
              name: 'image',
              label: 'Image',
              type: 'upload',
              relationTo: 'media'
            }
          ],
          admin: {
            description: 'Add slides for the multisport carousel'
          }
        },

        {
          name: 'sports',
          label: 'Available Sports',
          type: 'array',
          fields: [
            {
              name: 'id',
              label: 'Sport ID',
              type: 'text',
              required: true,
              admin: {
                description: 'Unique identifier for the sport'
              }
            },
            {
              name: 'name',
              label: 'Sport Name',
              type: 'text',
              required: true,
              admin: {
                description: 'Display name of the sport'
              }
            }
          ],
          admin: {
            description: 'List of available multisport games'
          }
        }
      ]
    }
  ]
};
