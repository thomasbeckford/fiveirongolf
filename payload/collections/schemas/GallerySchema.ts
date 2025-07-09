import { Tab } from 'payload';

export const GallerySchema: Tab = {
  label: 'Gallery',
  fields: [
    {
      type: 'group',
      name: 'GallerySchema',
      label: 'Photo Gallery',
      fields: [
        {
          name: 'images',
          label: 'Gallery Images',
          type: 'array',
          fields: [
            {
              name: 'url',
              label: 'Image',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                description: 'Direct URL to the image'
              }
            },
            {
              name: 'alt',
              label: 'Alt Text',
              type: 'text',
              required: true,
              admin: {
                description: 'Alternative text for accessibility'
              }
            },
            {
              name: 'caption',
              label: 'Caption',
              type: 'text',
              admin: {
                description: 'Caption displayed below the image'
              }
            }
          ],
          admin: {
            description: 'Add images to the gallery'
          }
        }
      ]
    }
  ]
};
