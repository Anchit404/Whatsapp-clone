import multer from 'multer';
import { GridFSBucket } from 'mongodb';
import mongoose from 'mongoose';

// Use memory storage - we'll manually upload to GridFS
const storage = multer.memoryStorage();

// Middleware to handle file upload to GridFS
export const uploadToGridFS = (req, res, next) => {
  if (!req.file) {
    return next();
  }

  try {
    const bucket = new GridFSBucket(mongoose.connection.db, {
      bucketName: 'fs'
    });

    const filename = `${Date.now()}-${req.file.originalname}`;
    const uploadStream = bucket.openUploadStream(filename, {
      contentType: req.file.mimetype
    });

    uploadStream.end(req.file.buffer);

    uploadStream.on('finish', () => {
      req.file.filename = filename;
      req.file.id = uploadStream.id;
      next();
    });

    uploadStream.on('error', (err) => {
      next(err);
    });
  } catch (error) {
    next(error);
  }
};

export default multer({ storage }); 
