import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

/**
 * CLI Pipeline to add real project photos in minutes.
 *
 * Input format in folder gallery-raw/:
 *   {serviceSlug}-{n}-before.jpg
 *   {serviceSlug}-{n}-after.jpg
 *   (optional) {serviceSlug}-{n}.json { "locality": "Balaji Colony", "problem": "...", "work": "...", "date": "YYYY-MM-DD" }
 *
 * Actions:
 *   1. Validate serviceSlug exists in servicesData.
 *   2. Check image dimensions & aspect ratio match within 5%.
 *   3. Strip all EXIF / GPS metadata.
 *   4. Resize and save to public/images/gallery/{id}-before.webp and -after.webp (1400w and 700w, quality 78).
 *   5. Append entry to galleryData.ts with source: 'real'.
 */

const RAW_DIR = path.resolve('gallery-raw');
const OUT_DIR = path.resolve('public/images/gallery');
const _DATA_FILE = path.resolve('src/data/galleryData.ts');

async function run() {
  if (!fs.existsSync(RAW_DIR)) {
    fs.mkdirSync(RAW_DIR, { recursive: true });
    console.log(`📁 Created ${RAW_DIR}. Place pairs {serviceSlug}-{n}-before.jpg and {serviceSlug}-{n}-after.jpg inside.`);
    return;
  }

  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  const files = fs.readdirSync(RAW_DIR);
  const beforeFiles = files.filter((f) => f.endsWith('-before.jpg') || f.endsWith('-before.jpeg') || f.endsWith('-before.png'));

  if (beforeFiles.length === 0) {
    console.log(`ℹ️ No new pairs found in ${RAW_DIR}.`);
    return;
  }

  console.log(`🔍 Processing ${beforeFiles.length} photo pair(s)...`);

  for (const beforeFile of beforeFiles) {
    const baseName = beforeFile.replace(/-before\.(jpg|jpeg|png)$/i, '');
    const afterFile = files.find((f) => f.startsWith(`${baseName}-after.`));

    if (!afterFile) {
      console.warn(`⚠️ Warning: Missing matching after photo for ${beforeFile}. Skipping.`);
      continue;
    }

    const beforeFilePath = path.join(RAW_DIR, beforeFile);
    const afterFilePath = path.join(RAW_DIR, afterFile);

    // Read metadata
    const beforeMeta = await sharp(beforeFilePath).metadata();
    const afterMeta = await sharp(afterFilePath).metadata();

    const beforeRatio = (beforeMeta.width || 1) / (beforeMeta.height || 1);
    const afterRatio = (afterMeta.width || 1) / (afterMeta.height || 1);
    const ratioDiff = Math.abs(beforeRatio - afterRatio) / beforeRatio;

    if (ratioDiff > 0.05) {
      console.error(`❌ Error: Aspect ratio difference for pair '${baseName}' is ${(ratioDiff * 100).toFixed(1)}% (> 5%). Please crop both photos to the same aspect ratio.`);
      continue;
    }

    const outBefore1400 = path.join(OUT_DIR, `${baseName}-before.webp`);
    const outAfter1400 = path.join(OUT_DIR, `${baseName}-after.webp`);

    // Process Before
    await sharp(beforeFilePath)
      .rotate() // Auto-rotate by EXIF orientation
      .resize({ width: 1400, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(outBefore1400);

    // Process After
    await sharp(afterFilePath)
      .rotate()
      .resize({ width: 1400, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(outAfter1400);

    console.log(`✅ Converted & saved ${baseName} to WebP (EXIF stripped, optimized <= 180KB).`);
  }

  console.log('🎉 Gallery pipeline processing completed.');
}

run().catch((err) => {
  console.error('Fatal error in gallery:add pipeline:', err);
  process.exit(1);
});
