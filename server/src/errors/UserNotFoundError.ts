const ApplicationError = require('./ApplicationError');

class UserNotFoundError extends ApplicationError {
  constructor(message) {
    super(message || 'user with email not found', 404);
  }
}

module.exports = UserNotFoundError;
