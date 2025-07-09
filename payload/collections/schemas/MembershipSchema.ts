import { Tab } from 'payload';

export const MembershipSchema: Tab = {
  label: 'Membership',
  fields: [
    {
      type: 'group',
      name: 'MembershipSchema',
      label: 'Membership Page Content',
      fields: [
        {
          type: 'group',
          name: 'giftCard',
          label: 'Gift Card Banner',
          fields: [
            {
              name: 'title',
              label: 'Gift Card Title',
              type: 'text',
              admin: {
                description: 'Text for the gift card banner'
              }
            },
            {
              name: 'buttonText',
              label: 'Button Text',
              type: 'text',
              admin: {
                description: 'Text for the gift card button'
              }
            },
            {
              name: 'url',
              label: 'Gift Card URL',
              type: 'text',
              admin: {
                description: 'Link to purchase gift cards'
              }
            }
          ]
        },
        {
          name: 'backgroundImage',
          label: 'Background Image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'URL to background image for membership section'
          }
        },
        {
          name: 'title',
          label: 'Main Title',
          type: 'text',
          admin: {
            description: 'Main membership title (e.g., "BECOME A MEMBER")'
          }
        },
        {
          name: 'subtitle',
          label: 'Subtitle',
          type: 'text',
          admin: {
            description: 'Membership subtitle'
          }
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          admin: {
            description: 'Main membership description text'
          }
        },
        {
          type: 'group',
          name: 'pricing',
          label: 'Pricing Information',
          fields: [
            {
              name: 'monthlyPrice',
              label: 'Monthly Price',
              type: 'text',
              admin: {
                description: 'e.g., "$279/mo."'
              }
            },
            {
              name: 'terms',
              label: 'Pricing Terms',
              type: 'text',
              admin: {
                description: 'e.g., "No initiation fees. Cancel any time."'
              }
            }
          ]
        },
        {
          name: 'benefits',
          label: 'Membership Benefits',
          type: 'array',
          fields: [
            {
              name: 'title',
              label: 'Benefit Title',
              type: 'text',
              required: true,
              admin: {
                description: 'e.g., "Free Golf", "Exclusive Discounts"'
              }
            },
            {
              name: 'description',
              label: 'Benefit Description',
              type: 'text',
              required: true,
              admin: {
                description: 'Detailed description of the benefit'
              }
            }
          ],
          admin: {
            description: 'List of membership benefits'
          }
        },
        {
          type: 'group',
          name: 'form',
          label: 'Membership Form',
          fields: [
            {
              name: 'privacyText',
              label: 'Privacy Policy Text',
              type: 'textarea',
              admin: {
                description: 'Legal disclaimer text for the form'
              }
            },
            {
              name: 'submitText',
              label: 'Submit Button Text',
              type: 'text',
              defaultValue: 'SUBMIT',
              admin: {
                description: 'Text for the form submit button'
              }
            }
          ]
        }
      ]
    }
  ]
};
