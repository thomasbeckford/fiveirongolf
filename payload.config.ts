
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { buildConfig } from 'payload';
import Locations from './payload/collections/locations';
import Media from './payload/collections/media';
import Leagues from './payload/collections/leagues';

export default buildConfig({
  editor: lexicalEditor(),
  collections: [Locations, Media, Leagues],
  secret: process.env.PAYLOAD_SECRET || '',
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || ''
  }),

  typescript: {
    outputFile: './payload/generated-types.ts'
  }
});
