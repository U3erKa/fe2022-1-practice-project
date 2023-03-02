import { MulterError } from 'multer';
import BadRequestError from '../errors/BadRequestError';

export default async (err, req, res, next) => {
  if (err instanceof MulterError) {
    return next(new BadRequestError('Invalid file'));
  }

  next(err);
};
