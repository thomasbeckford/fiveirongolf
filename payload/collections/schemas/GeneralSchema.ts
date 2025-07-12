import { Tab } from 'payload';

export const GeneralSchema: Tab = {
  label: 'General Information',
  fields: [
    // Basic Information
    {
      name: 'name',
      label: 'Location Name',
      type: 'text',
      required: true,
      admin: {
        width: '50%',
        description: 'e.g., "Chicago River North", "Main Street"'
      }
    },
    {
      name: 'slug',
      label: 'URL Slug',
      type: 'text',
      required: true,
      admin: {
        width: '50%',
        description: 'Auto-generated from name if empty'
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
      name: 'city',
      label: 'City',
      type: 'text',
      required: true,
      admin: {
        width: '50%',
        description: 'e.g., "Port Chester", "Chicago"'
      }
    },

    // Status & Features
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
      name: 'comingSoon',
      label: 'Coming Soon Flag',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Legacy field - use Status instead'
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
      name: 'hasDuckpin',
      label: 'Has Duckpin Bowling',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar'
      }
    },

    // Contact & Location Fields (flat structure)
    {
      name: 'address',
      label: 'Full Address',
      type: 'text',
      required: true,
      admin: {
        width: '60%',
        description: 'Complete street address including city, state, and ZIP'
      }
    },
    {
      name: 'address_zipcode',
      label: 'City, State & ZIP',
      type: 'text',
      admin: {
        width: '40%',
        description: 'e.g., "Port Chester, NY 10573"'
      }
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'text',
      admin: {
        width: '50%',
        description: 'Format: (555) 123-4567'
      }
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      required: false,
      admin: {
        width: '50%'
      }
    },
    {
      name: 'coordinates',
      label: 'GPS Coordinates',
      type: 'point',
      admin: {
        description: 'Click on map or enter coordinates manually'
      }
    },
    {
      name: 'mapUrl',
      label: 'Google Maps URL',
      type: 'text',
      admin: {
        width: '60%',
        description: 'Direct link to Google Maps location'
      }
    },
    {
      name: 'timezone',
      label: 'Timezone',
      type: 'select',
      admin: {
        width: '40%'
      },
      options: [
        { label: 'Eastern Time', value: 'America/New_York' },
        { label: 'Central Time', value: 'America/Chicago' },
        { label: 'Mountain Time', value: 'America/Denver' },
        { label: 'Pacific Time', value: 'America/Los_Angeles' }
      ]
    }
  ]
};
