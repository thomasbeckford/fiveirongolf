import { Tab } from 'payload';

export const ActivitySchema: Tab = {
  label: 'Activities',
  fields: [
    {
      type: 'group',
      name: 'ActivitySchema',
      label: 'Activities & Services',
      fields: [
        {
          name: 'services',
          label: 'Services List',
          type: 'array',
          fields: [
            {
              name: 'title',
              label: 'Service Title',
              type: 'text',
              required: true,
              admin: {
                description: 'e.g., "PLAY &", "GOLF"'
              }
            },
            {
              name: 'subtitle',
              label: 'Service Subtitle',
              type: 'text',
              admin: {
                description: 'e.g., "PRACTICE", "INSTRUCTION"'
              }
            },
            {
              name: 'description',
              label: 'Description',
              type: 'textarea',
              required: true,
              admin: {
                description: 'Service description and details'
              }
            },
            {
              name: 'highlights',
              label: 'Highlights',
              type: 'array',
              fields: [
                {
                  name: 'label',
                  label: 'Label',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'e.g., "Location", "Technology"'
                  }
                },
                {
                  name: 'text',
                  label: 'Text',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'Highlight description'
                  }
                }
              ],
              admin: {
                description: 'Key highlights for this service'
              }
            },
            {
              name: 'pricing',
              label: 'Pricing Items',
              type: 'array',
              fields: [
                {
                  name: 'item',
                  label: 'Pricing Item',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'e.g., "Starting at $45/hour", "Group rates available"'
                  }
                }
              ],
              admin: {
                description: 'List of pricing information'
              }
            },
            {
              name: 'pricingLabel',
              label: 'Pricing Label',
              type: 'text',
              admin: {
                description: 'Label for pricing section (e.g., "SIM RENTAL PRICING")'
              }
            },
            {
              type: 'group',
              name: 'primaryCta',
              label: 'Primary Call-to-Action',
              fields: [
                {
                  name: 'text',
                  label: 'Button Text',
                  type: 'text',
                  admin: {
                    description: 'e.g., "BOOK A SIM", "BOOK A LESSON"'
                  }
                },
                {
                  name: 'url',
                  label: 'Button URL',
                  type: 'text',
                  admin: {
                    description: 'Link for the primary action'
                  }
                }
              ]
            },
            {
              type: 'group',
              name: 'secondaryCta',
              label: 'Secondary Call-to-Action',
              fields: [
                {
                  name: 'text',
                  label: 'Button Text',
                  type: 'text',
                  admin: {
                    description: 'e.g., "WAYS TO PLAY", "LEARN MORE"'
                  }
                },
                {
                  name: 'url',
                  label: 'Button URL',
                  type: 'text',
                  admin: {
                    description: 'Link for the secondary action'
                  }
                }
              ]
            }
          ],
          admin: {
            description: 'Add services and activities offered at this location'
          }
        }
      ]
    }
  ]
};
