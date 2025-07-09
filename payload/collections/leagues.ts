import { CollectionConfig } from 'payload';

const Leagues: CollectionConfig = {
  slug: 'leagues',
  labels: {
    singular: 'League',
    plural: 'Leagues'
  },
  admin: {
    defaultColumns: ['name', 'status', 'updatedAt'],
    useAsTitle: 'name',
    group: 'Content'
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user)
  },
  fields: [
    {
      type: 'text',
      name: 'name',
      label: 'Name',
      required: true
    },
    {
      type: 'text',
      name: 'slug',
      label: 'Slug',
      required: true
    },
    {
      type: 'text',
      name: 'description',
      label: 'Description',
      required: true
    },
    {
      type: 'text',
      name: 'contact',
      label: 'Contact',
      required: true
    }
  ]
};

export default Leagues;
