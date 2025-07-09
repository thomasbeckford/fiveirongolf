import { Tab } from 'payload';

export const DuckpinSchema: Tab = {
  label: 'Duckpin Bowling',
  fields: [
    {
      type: 'group',
      name: 'DuckpinSchema',
      label: 'Duckpin Bowling Section',
      fields: [
        {
          name: 'backgroundImage',
          label: 'Background Image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'URL to background image for the duckpin section'
          }
        },
        {
          name: 'preTitle',
          label: 'Pre-title Text',
          type: 'text',
          admin: {
            description: 'Text that appears before the main title'
          }
        },
        {
          name: 'title',
          label: 'Main Title',
          type: 'text',
          required: true,
          admin: {
            description: 'Main heading for the duckpin section'
          }
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          required: true,
          admin: {
            description: 'Main description of duckpin bowling'
          }
        },
        {
          name: 'callToAction',
          label: 'Call to Action Text',
          type: 'text',
          admin: {
            description: 'Encouraging text before the booking button'
          }
        },
        {
          name: 'buttonText',
          label: 'Button Text',
          type: 'text',
          admin: {
            description: 'Text displayed on the booking button'
          }
        },
        {
          name: 'bookingUrl',
          label: 'Booking URL',
          type: 'text',
          admin: {
            description: 'Link for booking duckpin lanes'
          }
        },
        {
          name: 'faqs',
          label: 'Frequently Asked Questions',
          type: 'array',
          fields: [
            {
              name: 'id',
              label: 'FAQ ID',
              type: 'text',
              required: true,
              admin: {
                description: 'Unique identifier for the FAQ'
              }
            },
            {
              name: 'question',
              label: 'Question',
              type: 'text',
              required: true,
              admin: {
                description: 'The FAQ question'
              }
            },
            {
              name: 'answer',
              label: 'Answer',
              type: 'textarea',
              required: true,
              admin: {
                description: 'The answer to the question'
              }
            }
          ],
          admin: {
            description: 'Common questions about duckpin bowling'
          }
        }
      ]
    }
  ]
};
