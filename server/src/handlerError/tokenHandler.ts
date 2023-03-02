const { JsonWebTokenError, TokenExpiredError } = require('jsonwebtoken');
const TokenError = require('../errors/TokenError');
const TokenExpirationError = require('../errors/TokenExpirationError');

module.exports = async (err, req, res, next) => {
  if (err instanceof TokenExpiredError) {
    return next(new TokenExpirationError());
  }
  if (err instanceof JsonWebTokenError) {
    return next(new TokenError());
  }

  next(err);
};
