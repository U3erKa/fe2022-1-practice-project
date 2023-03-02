import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import TokenError from '../errors/TokenError';
import TokenExpirationError from '../errors/TokenExpirationError';

export default async (err, req, res, next) => {
  if (err instanceof TokenExpiredError) {
    return next(new TokenExpirationError());
  }
  if (err instanceof JsonWebTokenError) {
    return next(new TokenError());
  }

  next(err);
};
