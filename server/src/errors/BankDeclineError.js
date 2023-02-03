const ApplicationError = require('./ApplicationError');

class BankDeclineError extends ApplicationError{
  constructor (message) {
    super(message || 'Bank decline transaction', 403);
  }
}

module.exports = BankDeclineError;
