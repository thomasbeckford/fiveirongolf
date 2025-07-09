import { Tab } from 'payload';

export const FeaturesSchema: Tab = {
  label: 'Features',
  fields: [
    {
      type: 'group',
      name: 'FeaturesSchema',
      label: 'Featured Services',
      fields: [
        {
          name: 'features',
          label: 'Feature Cards',
          type: 'array',
          fields: [
            {
              name: 'id',
              label: 'Feature ID',
              type: 'text',
              required: true,
              admin: {
                description: 'Unique identifier for the feature'
              }
            },
            {
              name: 'title',
              label: 'Feature Title',
              type: 'text',
              required: true,
              admin: {
                description: 'Main title for the feature card'
              }
            },
            {
              name: 'description',
              label: 'Description',
              type: 'textarea',
              required: true,
              admin: {
                description: 'Detailed description of the feature'
              }
            },
            {
              name: 'neonColor',
              label: 'Neon Color',
              type: 'text',
              admin: {
                description: 'Hex color code for neon accent (e.g., #39ff14)'
              }
            },
            {
              name: 'ctaText',
              label: 'CTA Button Text',
              type: 'text',
              admin: {
                description: 'Text for the call-to-action button'
              }
            },
            {
              name: 'ctaUrl',
              label: 'CTA Button URL',
              type: 'text',
              admin: {
                description: 'Link for the call-to-action button'
              }
            }
          ],
          admin: {
            description: 'Add feature cards highlighting key services'
          }
        }
      ]
    }
  ]
};
