import { Tab } from 'payload';

export const SeoSchema: Tab = {
  label: 'SEO',
  fields: [
    {
      type: 'group',
      name: 'SeoSchema',
      label: 'SEO Settings',
      fields: [
        {
          name: 'title',
          label: 'Page Title',
          type: 'text',
          maxLength: 60,
          admin: {
            description: 'Keep under 60 characters for Google'
          }
        },
        {
          name: 'description',
          label: 'Meta Description',
          type: 'textarea',
          maxLength: 160,
          admin: {
            description: 'Keep under 160 characters for Google'
          }
        }
      ]
    }
  ]
};
