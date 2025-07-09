import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { buildConfig } from 'payload';
import Locations from './payload/collections/locations';
import Media from './payload/collections/media';
import Leagues from './payload/collections/leagues';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';

export default buildConfig({
  editor: lexicalEditor(),
  collections: [Locations, Media, Leagues],
  secret: process.env.PAYLOAD_SECRET || '',
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || ''
  }),

  typescript: {
    outputFile: './payload/generated-types.ts'
  },

  plugins: [
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true
      },

      token: process.env.BLOB_READ_WRITE_TOKEN
    })
  ]
});
