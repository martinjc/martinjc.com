const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const sizes = require('./image_sizes');

const widths = sizes.widths;
const sizes_16_9 = sizes.sizes_16_9;
const sizes_3_4 = sizes.sizes_3_4;

function getAllFiles(dirPath, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
  const files = fs.readdirSync(dirPath);
  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });
  return arrayOfFiles;
}

async function processImages() {
  const rootDir = path.join(__dirname, '..');
  const imgDir = path.join(rootDir, 'src', 'img');
  if (!fs.existsSync(imgDir)) return;

  const allFiles = getAllFiles(imgDir);
  const imageExtensions = new Set(['.png', '.jpg', '.jpeg']);
  const gifExtensions = new Set(['.gif']);

  const imageFiles = allFiles.filter(f => imageExtensions.has(path.extname(f).toLowerCase()));
  const gifFiles = allFiles.filter(f => gifExtensions.has(path.extname(f).toLowerCase()));

  // Process GIFs
  for (const f of gifFiles) {
    const rel = path.relative(path.join(rootDir, 'src'), path.dirname(f));
    const outputDirectory = path.join(rootDir, 'public', rel);
    fs.mkdirSync(outputDirectory, { recursive: true });
    const dest = path.join(outputDirectory, path.basename(f));
    if (!fs.existsSync(dest) || fs.statSync(f).mtimeMs > fs.statSync(dest).mtimeMs) {
      fs.copyFileSync(f, dest);
    }
  }

  // Process Images with Sharp
  for (const f of imageFiles) {
    const rel = path.relative(path.join(rootDir, 'src'), path.dirname(f));
    const outputDirectory = path.join(rootDir, 'public', rel);
    fs.mkdirSync(outputDirectory, { recursive: true });

    const srcMtime = fs.statSync(f).mtimeMs;
    const baseName = path.basename(f, path.extname(f));
    const ext = path.extname(f);

    let metadata;
    try {
      metadata = await sharp(f).metadata();
    } catch (e) {
      console.warn(`Skipping unreadable image: ${f}`, e.message);
      continue;
    }

    const tasks = [];

    // Width variations
    for (const w of widths) {
      const dest = path.join(outputDirectory, `${baseName}_${w}${ext}`);
      if (!fs.existsSync(dest) || srcMtime > fs.statSync(dest).mtimeMs) {
        tasks.push(
          sharp(f)
            .resize({ width: w, withoutEnlargement: true })
            .jpeg({ quality: 85, mozjpeg: true })
            .toFile(dest)
        );
      }
    }

    // 16:9 aspect ratio
    for (const s of sizes_16_9) {
      const dest = path.join(outputDirectory, `${baseName}_16_9_${s.width}${ext}`);
      if (!fs.existsSync(dest) || srcMtime > fs.statSync(dest).mtimeMs) {
        const options = { width: s.width };
        if (metadata.width && metadata.height && metadata.width > metadata.height) {
          options.height = s.height;
          options.fit = 'cover';
          options.position = sharp.strategy.attention;
        }
        tasks.push(
          sharp(f)
            .resize(options)
            .jpeg({ quality: 85, mozjpeg: true })
            .toFile(dest)
        );
      }
    }

    // 3:4 aspect ratio
    for (const s of sizes_3_4) {
      const dest = path.join(outputDirectory, `${baseName}_3_4_${s.width}${ext}`);
      if (!fs.existsSync(dest) || srcMtime > fs.statSync(dest).mtimeMs) {
        const options = { width: s.width };
        if (metadata.width && metadata.height && metadata.width <= metadata.height) {
          options.height = s.height;
          options.fit = 'cover';
          options.position = sharp.strategy.attention;
        }
        tasks.push(
          sharp(f)
            .resize(options)
            .jpeg({ quality: 85, mozjpeg: true })
            .toFile(dest)
        );
      }
    }

    if (tasks.length > 0) {
      await Promise.all(tasks);
    }
  }

  console.log('Image processing completed.');
}

processImages().catch(err => {
  console.error('Error processing images:', err);
  process.exit(1);
});