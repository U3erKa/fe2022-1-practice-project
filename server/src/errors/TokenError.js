const ApplicationError = require('./ApplicationError');

class TokenError extends ApplicationError {
  constructor(message) {
    super(message || 'invalid token', 401);
  }
}

module.exports = TokenError;
