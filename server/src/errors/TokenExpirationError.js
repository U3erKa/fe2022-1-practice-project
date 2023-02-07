const ApplicationError = require('./ApplicationError');

class TokenExpirationError extends ApplicationError{
  constructor (message) {
    super(message || 'token expired', 419);
  }
}

module.exports = TokenExpirationError;
