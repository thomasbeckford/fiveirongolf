import { Tab } from 'payload';

export const HeroSchema: Tab = {
  label: 'Hero Section',
  fields: [
    {
      type: 'group',
      name: 'HeroSchema',
      label: 'Hero Content',
      fields: [
        {
          name: 'title',
          label: 'Main Title',
          type: 'text',
          required: true,
          admin: {
            description: 'e.g., "Chicago", "New York"'
          }
        },
        {
          name: 'subtitle',
          label: 'Subtitle',
          type: 'text',
          admin: {
            description: 'e.g., "River North", "Flatiron"'
          }
        },
        {
          name: 'backgroundImage',
          label: 'Background Image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Hero background image (optional)'
          }
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          admin: {
            description: 'Optional hero description text'
          }
        },
        {
          type: 'group',
          name: 'floorplan',
          label: 'Floorplan',
          fields: [
            {
              name: 'available',
              label: 'Floorplan Available',
              type: 'checkbox',
              defaultValue: false
            },
            {
              name: 'url',
              label: 'Floorplan URL',
              type: 'text',
              admin: {
                condition: (data) => data.floorplan?.available
              }
            }
          ]
        },
        {
          type: 'group',
          name: 'ctaButton',
          label: 'Call to Action Button',
          fields: [
            {
              name: 'text',
              label: 'Button Text',
              type: 'text',
              defaultValue: 'Book Now'
            },
            {
              name: 'url',
              label: 'Button URL',
              type: 'text'
            },
            {
              name: 'type',
              label: 'Button Style',
              type: 'select',
              options: [
                { label: 'Primary', value: 'primary' },
                { label: 'Secondary', value: 'secondary' }
              ],
              defaultValue: 'primary'
            }
          ]
        }
      ]
    }
  ]
};
