const ApplicationError = require('./ApplicationError');

class UncorrectPassword extends ApplicationError{
  constructor (message) {
    super(message || 'uncorrect password', 406);
  }
}

module.exports = UncorrectPassword;

