// payload/seed/index.ts
import _ from 'lodash';
import { getPayload } from 'payload';
import config from '../../payload.config';
import { LOCATIONS_DEFAULT } from './defaults';
import { LOCATIONS_SPECIFIC_DATA } from './locations';
import * as path from 'path'; // Changed this line
import fs from 'fs';

// Function to fill missing fields with defaults without overwriting existing values
function fillMissingFields(specificData: any, defaultData: any): any {
  const result = _.cloneDeep(specificData);

  function recursiveFill(target: any, source: any) {
    if (!_.isPlainObject(source)) return;

    for (const key in source) {
      // Si el campo no existe en target, lo copiamos del source
      if (!(key in target)) {
        target[key] = _.cloneDeep(source[key]);
      }
      // Si ambos son objetos planos, aplicamos recursión
      else if (_.isPlainObject(target[key]) && _.isPlainObject(source[key])) {
        recursiveFill(target[key], source[key]);
      }
      // Si el campo existe en target pero es null/undefined/string vacío, lo llenamos con el default
      else if (target[key] === null || target[key] === undefined || target[key] === '') {
        target[key] = _.cloneDeep(source[key]);
      }
      // En todos los otros casos, mantenemos el valor de target (no sobrescribimos)
    }
  }

  recursiveFill(result, defaultData);
  return result;
}

// Upload images and return ObjectIds
async function uploadImages(payload: any, data: any): Promise<any> {
  const cloned = _.cloneDeep(data);

  async function recurse(obj: any, currentPath: string = '') {
    for (const key in obj) {
      const val = obj[key];
      const fieldPath = currentPath ? `${currentPath}.${key}` : key;

      if (_.isPlainObject(val)) {
        await recurse(val, fieldPath);
      } else if (key.toLowerCase().includes('image') && typeof val === 'string' && val.startsWith('local:')) {
        try {
          // Extraer el nombre del archivo
          const filename = val.replace('local:', '');
          const imagePath = path.join(process.cwd(), 'app/(frontend)/api/media', filename);

          console.log(`📷 Processing image field: ${fieldPath}`);
          console.log(`   📁 Looking for file: ${imagePath}`);

          // Verificar que el archivo existe
          if (fs.existsSync(imagePath)) {
            console.log(`   ✅ File found, uploading: ${filename}`);

            // Leer el archivo como Buffer
            const fileBuffer = fs.readFileSync(imagePath);
            const fileStats = fs.statSync(imagePath);

            // Determinar el tipo MIME
            const ext = path.extname(filename).toLowerCase();
            let mimeType = 'image/jpeg';
            if (ext === '.png') mimeType = 'image/png';
            else if (ext === '.gif') mimeType = 'image/gif';
            else if (ext === '.webp') mimeType = 'image/webp';

            // Subir la imagen a Payload usando el buffer
            const uploadResult = await payload.create({
              collection: 'media',
              data: {
                alt: filename.split('.')[0].replace(/[-_]/g, ' '), // Usar el nombre como alt text
                filename: filename,
                mimeType: mimeType,
                filesize: fileStats.size
              },
              file: {
                data: fileBuffer,
                name: filename,
                size: fileStats.size,
                type: mimeType
              }
            });

            // Reemplazar la referencia local con el ObjectId
            obj[key] = uploadResult.id;
            console.log(`   ✅ Image uploaded successfully: ${filename} -> ${uploadResult.id}`);
          } else {
            console.warn(`   ⚠️ Image file not found: ${imagePath}`);
            console.warn(`   🔍 Available files in uploads directory:`);

            // Listar archivos disponibles para debug
            const uploadsDir = path.join(process.cwd(), 'app/(frontend)/api/media');
            if (fs.existsSync(uploadsDir)) {
              const files = fs.readdirSync(uploadsDir);
              files.forEach((file) => console.warn(`      - ${file}`));
            } else {
              console.warn(`      Directory does not exist: ${uploadsDir}`);
            }

            // Remover la referencia inválida
            delete obj[key];
          }
        } catch (error) {
          console.error(`❌ Failed to upload image ${val}:`, error);
          console.error(`   Error details:`, error instanceof Error ? error.message : String(error));
          delete obj[key];
        }
      } else if (_.isArray(val)) {
        // Handle arrays that might contain image references
        for (let i = 0; i < val.length; i++) {
          if (_.isPlainObject(val[i])) {
            await recurse(val[i], `${fieldPath}[${i}]`);
          }
        }
      }
    }
  }

  await recurse(cloned);
  return cloned;
}

function sanitizeForPayload(data: any): any {
  const sanitized = _.cloneDeep(data);

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
  const required = ['name', 'address'];

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
  const slug = data.slug?.toLowerCase().trim();
  const name = data.name?.toLowerCase().trim();
  const email = data.email?.toLowerCase().trim();
  return slug || `${name}|${email}`;
}

// Get existing locations and create a Set of processed keys
async function getExistingLocations(payload: any): Promise<Set<string>> {
  const existingLocations = await payload.find({
    collection: 'locations',
    select: {
      name: true,
      email: true,
      slug: true
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

// Clean invalid ObjectIds
function cleanInvalidObjectIds(data: any): any {
  const cloned = _.cloneDeep(data);

  function recurse(obj: any) {
    for (const key in obj) {
      const val = obj[key];

      if (_.isPlainObject(val)) {
        recurse(val);
      } else if (_.isArray(val)) {
        val.forEach((item, index) => {
          if (_.isPlainObject(item)) {
            recurse(item);
          }
        });
      } else if (key.toLowerCase().includes('image') && typeof val === 'string') {
        // Verificar si es un ObjectId válido (24 caracteres hexadecimales)
        const isValidObjectId = /^[a-f\d]{24}$/i.test(val);

        if (!isValidObjectId) {
          console.warn(`⚠️ Removing invalid image reference "${key}": ${val}`);
          delete obj[key];
        }
      }
    }
  }

  recurse(cloned);
  return cloned;
}

// Check images directory and setup
function checkImagesDirectory(): void {
  const uploadsDir = path.join(process.cwd(), 'public/uploads');

  console.log(`🔍 Checking uploads directory: ${uploadsDir}`);

  if (!fs.existsSync(uploadsDir)) {
    console.error(`❌ Uploads directory does not exist: ${uploadsDir}`);
    console.log(`💡 Please create the directory and add your image files:`);
    console.log(`   mkdir -p ${uploadsDir}`);
    return;
  }

  const files = fs.readdirSync(uploadsDir);
  console.log(`📁 Found ${files.length} files in uploads directory:`);
  files.forEach((file) => {
    const filePath = path.join(uploadsDir, file);
    const stats = fs.statSync(filePath);
    console.log(`   - ${file} (${Math.round(stats.size / 1024)}KB)`);
  });
}

const seed = async () => {
  const payload = await getPayload({ config });

  console.log('🌱 Starting incremental seed process...');

  // Check images directory first
  checkImagesDirectory();

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
      console.log(`   📧 Email: ${specificData.email || 'N/A'}`);
      console.log(`   🏷️ Slug: ${specificData.slug || 'N/A'}`);

      // Create unique key for this location
      const locationKey = createLocationKey(specificData);

      // Check if this location already exists
      if (existingKeys.has(locationKey)) {
        console.log(`⏭️  Skipping existing location: ${specificData.name}`);
        skipped++;
        continue;
      }

      // Fill missing fields with defaults (sin sobrescribir valores existentes)
      let mergedData = fillMissingFields(specificData, LOCATIONS_DEFAULT);

      // Validate data
      if (!validateLocationData(mergedData)) {
        console.log(`❌ Validation failed for: ${specificData.name}`);
        failed++;
        continue;
      }

      // Upload images first
      console.log('📷 Processing images...');
      mergedData = await uploadImages(payload, mergedData);

      // Sanitize data to remove problematic fields
      mergedData = sanitizeForPayload(mergedData);

      // Clean invalid ObjectIds
      mergedData = cleanInvalidObjectIds(mergedData);

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
    } catch (error: any) {
      console.log(`❌ Failed to create ${specificData.name}:`);
      console.log(`📄 Error details:`, error.message);
      if (error.data) {
        console.log(`📄 Error data:`, JSON.stringify(error.data, null, 2));
      }
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

export { fillMissingFields };
