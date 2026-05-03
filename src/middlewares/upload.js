import sharp from 'sharp';
import path from 'path';
import multer from 'multer';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Create uploads directory if it doesn't exist
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = path.join(__dirname, '..', '..', 'public', 'uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Middleware to create thumbnail from uploaded image
const createThumbnail = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }

  try {
    console.log(req.file.path);
    
    // Get the filename without extension
    const fileDir = path.dirname(req.file.path);
    const fileName = path.basename(req.file.path, path.extname(req.file.path));
    const fileExtension = path.extname(req.file.path);
    
    // Create thumbnail filename with _thumb suffix
    const thumbnailPath = path.join(fileDir, `${fileName}_thumb${fileExtension}`);
    
    // Create 160x160 png thumbnail with sharp using promise API
    await sharp(req.file.path)
      .resize(160, 160, {
        fit: 'cover',
        position: 'center'
      })
      .png()
      .toFile(thumbnailPath);
    
    console.log(`Thumbnail created: ${thumbnailPath}`);
    next();
  } catch (error) {
    console.error('Error creating thumbnail:', error);
    next();
  }
};

export { upload, createThumbnail };
