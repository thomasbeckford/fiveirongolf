import { Tab } from 'payload';

export const ReviewSchema: Tab = {
  label: 'Reviews',
  fields: [
    {
      type: 'group',
      name: 'ReviewSchema',
      label: 'Customer Reviews',
      fields: [
        {
          name: 'title',
          label: 'Reviews Section Title',
          type: 'text',
          required: true,
          admin: {
            description: 'Main heading for the reviews section'
          }
        },
        {
          name: 'reviews',
          label: 'Customer Reviews',
          type: 'array',
          fields: [
            {
              name: 'rating',
              label: 'Star Rating',
              type: 'number',
              required: true,
              min: 1,
              max: 5,
              admin: {
                description: 'Rating from 1 to 5 stars'
              }
            },
            {
              name: 'text',
              label: 'Review Text',
              type: 'textarea',
              required: true,
              admin: {
                description: 'The customer review content'
              }
            },
            {
              name: 'author',
              label: 'Author Name',
              type: 'text',
              required: true,
              admin: {
                description: 'Name of the person who wrote the review'
              }
            }
          ],
          admin: {
            description: 'Add customer reviews and testimonials'
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
      ]
    }
  ]
};
