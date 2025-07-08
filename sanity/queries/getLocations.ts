import { client } from '../lib/client';

// Query para listar todas las locations
export async function getAllLocations() {
  return client.fetch(`
      *[_type == "location" && status == "active"] | order(name asc) {
        _id,
        name,
        slug,
        basicInfo {
          address,
          phone,
          email
        },
        heroSection {
          title,
          subtitle,
          backgroundImage
        }
      }
    `);
}
