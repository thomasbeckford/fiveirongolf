// payload/seed/index.ts
import _ from 'lodash';
import { getPayload } from 'payload';
import config from '../../payload.config';
import { LOCATIONS_DEFAULT } from './defaults';
import { LOCATIONS_SPECIFIC_DATA } from './locations';

// Function to safely merge data while avoiding relationship field issues
function smartMerge(defaultData: any, specificData: any): any {
  const result = _.cloneDeep(defaultData);

  for (const key in specificData) {
    if (specificData[key] !== undefined) {
      if (_.isArray(specificData[key])) {
        // For arrays: if empty, keep default; otherwise use specific
        if (specificData[key].length === 0) {
          continue;
        } else {
          result[key] = _.cloneDeep(specificData[key]);
        }
      } else if (_.isObject(specificData[key]) && !_.isArray(specificData[key])) {
        // For objects: recursive merge
        result[key] = smartMerge(result[key] || {}, specificData[key]);
      } else {
        // For primitives: replace
        result[key] = specificData[key];
      }
    }
  }

  return result;
}

// Function to remove problematic fields that cause ObjectId errors
function sanitizeForPayload(data: any): any {
  const sanitized = _.cloneDeep(data);

  // Remove any upload/media fields that might cause ObjectId issues
  const fieldsToCheck = [
    'HeroSchema.backgroundImage',
    'HoursSchema.backgroundImage',
    'MembershipSchema.backgroundImage',
    'DuckpinSchema.backgroundImage',
    'GallerySchema.images' // This might have upload references
  ];

  fieldsToCheck.forEach((fieldPath) => {
    if (_.get(sanitized, fieldPath)) {
      console.log(`🔧 Removing potentially problematic field: ${fieldPath}`);
      _.unset(sanitized, fieldPath);
    }
  });

  // Ensure ActivitySchema has consistent structure
  if (sanitized.ActivitySchema) {
    // ActivitySchema should be a group with services array
    if (_.isArray(sanitized.ActivitySchema)) {
      // If it's accidentally an array, wrap it in the correct structure
      sanitized.ActivitySchema = {
        services: sanitized.ActivitySchema
      };
    }
    // Ensure services is always an array
    if (!sanitized.ActivitySchema.services || !_.isArray(sanitized.ActivitySchema.services)) {
      sanitized.ActivitySchema.services = [];
    }
  }

  // Remove any undefined or null values that might cause issues
  return removeNullUndefined(sanitized);
}

// Recursively remove null/undefined values
function removeNullUndefined(obj: any): any {
  if (_.isArray(obj)) {
    return obj.map(removeNullUndefined).filter((v) => v !== null && v !== undefined);
  } else if (_.isObject(obj)) {
    const result: any = {};
    for (const [key, value] of Object.entries(obj)) {
      if (value !== null && value !== undefined) {
        result[key] = removeNullUndefined(value);
      }
    }
    return result;
  }
  return obj;
}

// Validate required fields
function validateLocationData(data: any): boolean {
  const required = ['name', 'GeneralSchema.address', 'GeneralSchema.phone', 'GeneralSchema.email'];

  for (const field of required) {
    if (!_.get(data, field)) {
      console.log(`❌ Missing required field: ${field}`);
      return false;
    }
  }

  return true;
}

// Create a unique identifier for each location
function createLocationKey(data: any): string {
  // Use name + email as unique identifier
  const name = data.name?.toLowerCase().trim();
  const email = data.GeneralSchema?.email?.toLowerCase().trim();
  return `${name}|${email}`;
}

// Get existing locations and create a Set of processed keys
async function getExistingLocations(payload: any): Promise<Set<string>> {
  const existingLocations = await payload.find({
    collection: 'locations',
    select: {
      name: true,
      'GeneralSchema.email': true
    },
    limit: 1000 // Adjust if you have more locations
  });

  const processedKeys = new Set<string>();

  existingLocations.docs.forEach((doc: any) => {
    const key = createLocationKey(doc);
    processedKeys.add(key);
  });

  return processedKeys;
}

const seed = async () => {
  const payload = await getPayload({ config });

  console.log('🌱 Starting incremental seed process...');

  // Get existing locations to avoid duplicates
  console.log('🔍 Checking existing locations...');
  const existingKeys = await getExistingLocations(payload);
  console.log(`📊 Found ${existingKeys.size} existing locations`);

  let created = 0;
  let skipped = 0;
  let failed = 0;

  for (const specificData of LOCATIONS_SPECIFIC_DATA) {
    try {
      console.log(`\n📍 Processing: ${specificData.name}`);
      console.log(`   📧 Email: ${specificData.GeneralSchema?.email || 'N/A'}`);

      // Create unique key for this location
      const locationKey = createLocationKey(specificData);

      // Check if this location already exists
      if (existingKeys.has(locationKey)) {
        console.log(`⏭️  Skipping existing location: ${specificData.name}`);
        skipped++;
        continue;
      }

      // Smart merge with defaults
      let mergedData = smartMerge(LOCATIONS_DEFAULT, specificData);

      // Validate data
      if (!validateLocationData(mergedData)) {
        console.log(`❌ Validation failed for: ${specificData.name}`);
        failed++;
        continue;
      }

      // Show debug info before sanitization
      console.log('🔍 Processing new location...');

      // Sanitize data to remove problematic fields
      mergedData = sanitizeForPayload(mergedData);

      console.log(`   🏃 Activities: ${mergedData.ActivitySchema?.services?.length || 0} items`);
      console.log(
        `   💳 Memberships: ${
          Array.isArray(mergedData.MembershipSchema)
            ? mergedData.MembershipSchema.length
            : mergedData.MembershipSchema
            ? 1
            : 0
        } plans`
      );

      // Create in Payload
      const result = await payload.create({
        collection: 'locations',
        data: mergedData
      });

      console.log(`✅ Created: ${specificData.name} (ID: ${result.id})`);

      // Add to existing keys to avoid duplicates in same run
      existingKeys.add(locationKey);
      created++;
    } catch (error) {
      console.log(`❌ Failed to create ${specificData.name}:`);
      console.log(`📄 Full error object:`);
      console.log(error);
      failed++;
    }
  }

  console.log(`\n🎉 Incremental seed completed!`);
  console.log(`   ✅ Created: ${created} locations`);
  console.log(`   ⏭️  Skipped: ${skipped} locations (already exist)`);
  console.log(`   ❌ Failed: ${failed} locations`);
  console.log(`   📊 Total processed: ${created + skipped + failed} locations`);

  process.exit(0);
};

seed().catch((error) => {
  console.error('❌ Seed process failed:', error);
  process.exit(1);
});

export { smartMerge };
