import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { FILES_PATH } from '../constants';
const env = process.env.NODE_ENV || 'development';

const devFilePath = path.resolve(FILES_PATH, 'images');

const filePath = env === 'production' ? '/var/www/html/images/' : devFilePath;

if (!fs.existsSync(filePath)) {
  fs.mkdirSync(filePath, {
    recursive: true,
  });
}

const storageContestFiles = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, filePath);
  },
  filename(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const multerInstance = multer({ storage: storageContestFiles });

export const uploadAvatar = multerInstance.single('file');

export const uploadContestFiles = multerInstance.array('files', 3);

export const updateContestFile = multerInstance.single('file');

export const uploadLogoFiles = multerInstance.single('offerData');
