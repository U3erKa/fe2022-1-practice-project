import ApplicationError from './ApplicationError';

class NotEnoughMoney extends ApplicationError {
  constructor(message) {
    super(message || 'Not enough money', 417);
  }
}

export default NotEnoughMoney;
