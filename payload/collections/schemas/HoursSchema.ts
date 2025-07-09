import { Tab } from 'payload';

export const HoursSchema: Tab = {
  label: 'Hours & Contact',
  fields: [
    {
      type: 'group',
      name: 'HoursSchema',
      label: 'Operating Hours',
      fields: [
        {
          name: 'backgroundImage',
          label: 'Background Image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'URL to background image for hours section'
          }
        },
        {
          name: 'simRentalPricing',
          label: 'Sim Rental Pricing',
          type: 'group',
          fields: [
            {
              name: 'title',
              label: 'Title',
              type: 'text',
              required: true,
              admin: {
                description: 'e.g., "SIM RENTAL PRICING"'
              }
            },
            {
              name: 'url',
              label: 'URL',
              type: 'text',
              required: true,
              admin: {
                description: 'Link for the primary action'
              }
            }
          ]
        },
        {
          name: 'regularHours',
          label: 'Regular Hours',
          type: 'array',
          required: true,
          fields: [
            {
              name: 'days',
              label: 'Days',
              type: 'text',
              required: true,
              admin: {
                description: 'e.g., "Monday - Thursday", "Friday", "Saturday"'
              }
            },
            {
              name: 'hours',
              label: 'Hours',
              type: 'text',
              required: true,
              admin: {
                description: 'e.g., "6AM - 11PM", "8AM - 1AM"'
              }
            }
          ],
          admin: {
            description: 'Regular operating hours grouped by days'
          }
        },
        {
          name: 'specialHours',
          label: 'Special Hours',
          type: 'array',
          fields: [
            {
              name: 'description',
              label: 'Description',
              type: 'text',
              required: true,
              admin: {
                description: 'e.g., "Member Benefits (M-F)", "Happy Hour"'
              }
            },
            {
              name: 'hours',
              label: 'Hours',
              type: 'text',
              required: true,
              admin: {
                description: 'e.g., "6AM - 4PM", "8PM - Close"'
              }
            }
          ],
          admin: {
            description: 'Special hours like member benefits, promotions, etc.'
          }
        }
      ]
    }
  ]
};
