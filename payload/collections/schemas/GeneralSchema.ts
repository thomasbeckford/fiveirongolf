import { Tab } from 'payload';

export const GeneralSchema: Tab = {
  label: 'General Information',
  fields: [
    {
      name: 'name',
      label: 'Location Name',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g., "Chicago River North"'
      }
    },
    {
      name: 'slug',
      label: 'URL Slug',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar'
      },
      hooks: {
        beforeValidate: [
          ({ siblingData }: { siblingData: { name?: string; slug?: string } }) => {
            if (siblingData?.name && !siblingData?.slug) {
              return siblingData.name
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .trim();
            }
          }
        ]
      }
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      defaultValue: 'active',
      options: [
        { label: '🟢 Active', value: 'active' },
        { label: '🟡 Coming Soon', value: 'coming-soon' },
        { label: '🔴 Temporarily Closed', value: 'temp-closed' },
        { label: '⚫ Permanently Closed', value: 'closed' }
      ],
      admin: {
        position: 'sidebar'
      }
    },
    {
      name: 'experiences',
      label: 'Available Experiences',
      type: 'select',
      hasMany: true,
      options: [
        { label: '⛳ Golf', value: 'Golf' },
        { label: '🎳 Bowling', value: 'Bowling' },
        { label: '🏀 Multisport', value: 'Multisport' }
      ],
      admin: {
        position: 'sidebar'
      }
    },
    {
      name: 'duckpinBowling',
      label: 'Has Duckpin Bowling',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar'
      }
    },
    // Contact & Location Group
    {
      type: 'group',
      name: 'GeneralSchema',
      fields: [
        {
          name: 'address',
          label: 'Full Address',
          type: 'text',
          required: true
        },
        {
          name: 'phone',
          label: 'Phone',
          type: 'text',
          required: true
        },
        {
          name: 'email',
          label: 'Email',
          type: 'email',
          required: true
        },
        {
          name: 'coordinates',
          label: 'GPS Location',
          type: 'point',
          admin: {
            description: 'Click on map or enter coordinates'
          }
        },
        {
          name: 'timezone',
          label: 'Timezone',
          type: 'select',
          options: [
            { label: 'Eastern Time', value: 'America/New_York' },
            { label: 'Central Time', value: 'America/Chicago' },
            { label: 'Mountain Time', value: 'America/Denver' },
            { label: 'Pacific Time', value: 'America/Los_Angeles' }
          ]
        }
      ]
    }
  ]
};
