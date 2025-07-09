// collections/Media.ts
import { CollectionConfig } from 'payload';

const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Media',
    plural: 'Media'
  },
  admin: {
    useAsTitle: 'alt',
    group: 'Media'
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user)
  },
  upload: {
    staticDir: 'public/media',
    mimeTypes: ['image/*'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
        height: 300,
        position: 'centre'
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        position: 'centre'
      },
      {
        name: 'card',
        width: 640,
        height: 480,
        position: 'centre'
      }
    ]
  },
  fields: [
    {
      name: 'alt',
      label: 'Alt Text',
      type: 'text',
      required: true
    },
    {
      name: 'caption',
      label: 'Caption',
      type: 'text'
    }
  ]
};

export default Media;
