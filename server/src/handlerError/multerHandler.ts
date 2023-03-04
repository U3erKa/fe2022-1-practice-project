import { MulterError } from 'multer';
import BadRequestError from '../errors/BadRequestError';
import type { ErrorRequestHandler } from 'express';

const handleMulterError: ErrorRequestHandler = async (err, req, res, next) => {
  if (err instanceof MulterError) {
    return next(new BadRequestError('Invalid file'));
  }

  next(err);
};

export default handleMulterError;
