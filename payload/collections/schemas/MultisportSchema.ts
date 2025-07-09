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
          name: 'slides',
          label: 'Multisport Slides',
          type: 'array',
          fields: [
            {
              name: 'id',
              label: 'Slide ID',
              type: 'text',
              required: true,
              admin: {
                description: 'Unique identifier for the slide'
              }
            },
            {
              name: 'title',
              label: 'Slide Title',
              type: 'text',
              required: true
            },
            {
              name: 'subtitle',
              label: 'Slide Subtitle',
              type: 'text'
            },
            {
              name: 'description',
              label: 'Description',
              type: 'textarea',
              required: true
            },
            {
              name: 'features',
              label: 'Features Text',
              type: 'textarea',
              admin: {
                description: 'Additional features or benefits text'
              }
            },
            {
              name: 'image',
              label: 'Slide Image',
              type: 'text',
              admin: {
                description: 'URL to slide image'
              }
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
