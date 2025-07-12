import fs from 'fs';
import fetch from 'node-fetch';
import axios from 'axios';
import FormData from 'form-data';
import dotenv from 'dotenv';

type Location = {
  title: {
    rendered: string;
  };
  slug: string;
  acf: {
    city_name: string;
    location_address: string;
    location_phone: string;
    location_email: string;
    location_coordinates: {
      lat: number;
      lng: number;
    };
    active_module_duckpin_book: boolean;
    active_module_multisport: boolean;
    enable_coming_soon: boolean;
  };
  _embedded: {
    'wp:featuredmedia': {
      source_url: string;
    }[];
  };
};

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

// Config
const API_URL = 'https://fiveironstagin.wpengine.com/wp-json/wp/v2/location?per_page=100&_embed';
const PAYLOAD_URL = process.env.PAYLOAD_URL || 'http://localhost:3000';
const PAYLOAD_SECRET = process.env.PAYLOAD_SECRET || '8a2ecb39c7c14231e12ec56d';

console.log('API_URL:', API_URL);
console.log('PAYLOAD_URL:', PAYLOAD_URL);
console.log('PAYLOAD_SECRET:', PAYLOAD_SECRET);

// Simple logger
const log = {
  info: (msg: string) => console.log(`ℹ️ ${msg}`),
  success: (msg: string) => console.log(`✅ ${msg}`),
  error: (msg: string) => console.error(`❌ ${msg}`)
};

// Get timezone from city
const getTimezone = (city: string): string => {
  const zones: Record<string, string> = {
    'New York': 'America/New_York',
    Brooklyn: 'America/New_York',
    Boston: 'America/New_York',
    Chicago: 'America/Chicago',
    Detroit: 'America/Detroit',
    Nashville: 'America/Chicago',
    Denver: 'America/Denver',
    Phoenix: 'America/Phoenix',
    'Los Angeles': 'America/Los_Angeles',
    Seattle: 'America/Los_Angeles'
  };
  return zones[city] || 'America/New_York';
};

// Download and upload image
const processImage = async (url: string, filename: string): Promise<string | null> => {
  try {
    if (!url?.startsWith('http')) return null;

    // Development: save locally
    if (process.env.NODE_ENV !== 'production') {
      const response = await axios.get(url, { responseType: 'arraybuffer', timeout: 15000 });
      const dir = './app/(frontend)/api/media';
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

      const path = `${dir}/${filename}`;
      fs.writeFileSync(path, response.data);
      return `local:${filename}`;
    }

    // Production: upload to Payload
    const response = await axios.get(url, { responseType: 'arraybuffer', timeout: 15000 });
    const form = new FormData();
    form.append('file', Buffer.from(response.data), filename);

    const upload = await axios.post(`${PAYLOAD_URL}/api/media`, form, {
      headers: { ...form.getHeaders(), Authorization: `Bearer ${PAYLOAD_SECRET}` },
      timeout: 15000
    });

    return upload.data?.doc?.id || null;
  } catch (error) {
    log.error(`Image processing failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return null;
  }
};

// Main function
async function main() {
  try {
    log.info('Starting location pipeline...');

    // 1. Fetch data
    const response = await fetch(API_URL);
    const rawData = (await response.json()) as Location[];
    log.success(`Fetched ${rawData.length} locations`);

    // 2. Process locations
    const locations = [];
    let processed = 0;

    for (const location of rawData) {
      if (!location.title?.rendered || !location.slug || !location.acf) continue;

      const acf = location.acf;
      const city = acf.city_name || '';
      const comingSoon = acf.enable_coming_soon || false;

      // Determine experiences
      const experiences = ['Golf'];
      if (acf.active_module_duckpin_book) experiences.push('Duckpin Bowling');
      if (acf.active_module_multisport) experiences.push('Multisport');

      // Get hero image
      const heroImage = location._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

      // Process image if exists
      let backgroundImage = null;
      if (heroImage) {
        log.info(`Processing image for ${location.title.rendered}...`);
        const filename = `${location.slug}-hero.jpg`;
        backgroundImage = await processImage(heroImage, filename);
      }

      // Format location
      const formattedLocation = {
        name: location.title.rendered,
        slug: location.slug,
        city,
        address: acf.location_address || '',
        phone: acf.location_phone || '',
        email: acf.location_email || '',
        coordinates: acf.location_coordinates ? [acf.location_coordinates.lng, acf.location_coordinates.lat] : [0, 0],
        timezone: getTimezone(city),
        hasDuckpin: acf.active_module_duckpin_book || false,
        comingSoon,
        experiences,

        SeoSchema: {
          title: `${experiences.join(' & ')} ${city ? `in ${city}` : ''} - Five Iron Golf`,
          description: `Experience ${experiences.join(' and ')} at Five Iron Golf in ${city}. ${
            comingSoon ? 'Coming soon!' : 'Book your simulator today!'
          }`
        },

        HeroSchema: {
          title: city,
          subtitle: location.title.rendered.replace(city, '').trim() || location.title.rendered,
          ...(backgroundImage && { backgroundImage }),
          ctaButton: {
            text: comingSoon ? 'Join Waitlist' : 'Book Now',
            url: comingSoon
              ? `https://fiveirongolf.com/locations/${location.slug}#waitlist`
              : `https://booking.fiveirongolf.com/select-experience?location=${location.slug}`,
            type: 'primary'
          }
        }
      };

      locations.push(formattedLocation);
      processed++;

      // Small delay between requests
      if (heroImage) await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    // 3. Save output
    const outputDir = './scripts/output';
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

    const outputFile = `${outputDir}/locationsEnriched${process.env.NODE_ENV === 'production' ? '-prod' : ''}.json`;
    fs.writeFileSync(outputFile, JSON.stringify(locations, null, 2));

    log.success(`✨ Pipeline completed!`);
    log.success(`📄 Processed ${processed} locations`);
    log.success(`💾 Saved to: ${outputFile}`);
  } catch (error) {
    log.error(`Pipeline failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    process.exit(1);
  }
}

export default main;
