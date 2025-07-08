import { client } from '../lib/client';

// Query para obtener una location completa
export async function getLocationBySlug(slug: string) {
  console.log('Buscando location con slug: ', slug);

  return client.fetch(
    `
      *[_type == "location" && slug.current == $slug && status == "active"][0] {
        _id,
        name,
        slug,
        status,
        GENERAL {
          address,
          phone,
          email,
          coordinates,
          timezone
        },
        experiences,
        duckpinBowling,
        HERO {
          title,
          subtitle,
          backgroundImage {
            asset->{
              _id,
              url,
              metadata {
                dimensions,
                lqip,
                palette
              }
            },
            hotspot,
            crop
          },
          description,
          contactInfo {
            address,
            phone,
            email
          },
          cta {
            text,
            url
          }
        },
        ACTIVITIES {
          services[] {
            title,
            subtitle,
            description,
            highlights[] {
              label,
              text
            },
            pricing,
            pricingLabel,
            primaryCta {
              text,
              url
            },
            secondaryCta {
              text,
              url
            }
          }
        },
        HOURS {
          backgroundImage {
            asset->{
              _id,
              url,
              metadata {
                dimensions
              }
            }
          },
          address {
            street,
            city,
            state,
            zip
          },
          regularHours[] {
            days,
            hours
          },
          specialHours[] {
            description,
            hours
          }
        },
        MEMBERSHIP {
          backgroundImage {
            asset->{
              _id,
              url,
              metadata {
                dimensions
              }
            }
          },
          title,
          subtitle,
          description,
          pricing {
            monthlyPrice,
            terms
          },
          benefits[] {
            title,
            description
          },
          giftCard {
            title,
            buttonText,
            url
          }
        },
        seo {
          title,
          description
        }
      }
    `,
    { slug }
  );
}
