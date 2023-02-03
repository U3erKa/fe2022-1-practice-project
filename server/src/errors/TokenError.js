const ApplicationError = require('./ApplicationError');

class TokenError extends ApplicationError{
  constructor (message) {
    super(message || 'token error', 408);
  }
}

module.exports = TokenError;

