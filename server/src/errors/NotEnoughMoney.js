const ApplicationError = require('./ApplicationError');

class NotEnoughMoney extends ApplicationError{
  constructor (message) {
    super(message || 'Not enough money', 417);
  }
}

module.exports = NotEnoughMoney;

