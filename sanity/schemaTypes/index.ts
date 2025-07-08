import { type SchemaTypeDefinition } from 'sanity';
import { locationSchema } from './locations';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [locationSchema]
};
