import { Tab } from 'payload';

export const FooterSchema: Tab = {
  label: 'Footer',
  fields: [
    {
      type: 'group',
      name: 'FooterSchema',
      label: 'Footer Content',
      fields: [
        {
          type: 'group',
          name: 'newsletter',
          label: 'Newsletter Section',
          fields: [
            {
              name: 'title',
              label: 'Newsletter Title',
              type: 'text',
              admin: {
                description: 'Title for the newsletter signup section'
              }
            },
            {
              name: 'locations',
              label: 'Location Options',
              type: 'array',
              fields: [
                {
                  name: 'label',
                  label: 'Display Name',
                  type: 'text',
                  required: true
                },
                {
                  name: 'value',
                  label: 'Value',
                  type: 'text',
                  required: true
                }
              ],
              admin: {
                description: 'Location options for newsletter signup'
              }
            },
            {
              name: 'disclaimer',
              label: 'Legal Disclaimer',
              type: 'textarea',
              admin: {
                description: 'Terms and privacy disclaimer text'
              }
            }
          ]
        },
        {
          type: 'group',
          name: 'brand',
          label: 'Brand Section',
          fields: [
            {
              name: 'tagline',
              label: 'Brand Tagline',
              type: 'text',
              admin: {
                description: 'Company tagline or slogan'
              }
            },
            {
              name: 'socialMedia',
              label: 'Social Media Links',
              type: 'array',
              fields: [
                {
                  name: 'platform',
                  label: 'Platform',
                  type: 'select',
                  options: [
                    { label: 'Instagram', value: 'instagram' },
                    { label: 'Twitter', value: 'twitter' },
                    { label: 'Facebook', value: 'facebook' },
                    { label: 'YouTube', value: 'youtube' },
                    { label: 'LinkedIn', value: 'linkedin' }
                  ],
                  required: true
                },
                {
                  name: 'url',
                  label: 'Profile URL',
                  type: 'text',
                  required: true
                }
              ],
              admin: {
                description: 'Social media platform links'
              }
            }
          ]
        },
        {
          name: 'quickLinks',
          label: 'Quick Links',
          type: 'array',
          fields: [
            {
              name: 'label',
              label: 'Link Text',
              type: 'text',
              required: true
            },
            {
              name: 'url',
              label: 'Link URL',
              type: 'text',
              required: true
            }
          ],
          admin: {
            description: 'Primary navigation links'
          }
        },
        {
          name: 'moreLinks',
          label: 'Additional Links',
          type: 'array',
          fields: [
            {
              name: 'label',
              label: 'Link Text',
              type: 'text',
              required: true
            },
            {
              name: 'url',
              label: 'Link URL',
              type: 'text',
              required: true
            }
          ],
          admin: {
            description: 'Secondary navigation links'
          }
        },
        {
          type: 'group',
          name: 'contact',
          label: 'Contact Information',
          fields: [
            {
              name: 'email',
              label: 'Contact Email',
              type: 'email'
            },
            {
              name: 'phone',
              label: 'Contact Phone',
              type: 'text'
            }
          ]
        },
        {
          name: 'copyright',
          label: 'Copyright Text',
          type: 'text',
          admin: {
            description: 'Copyright notice text'
          }
        }
      ]
    }
  ]
};
