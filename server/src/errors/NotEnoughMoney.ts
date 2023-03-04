import ApplicationError from './ApplicationError';

class NotEnoughMoney extends ApplicationError {
  constructor(public message = 'Not enough money') {
    super(message, 417);
  }
}

export default NotEnoughMoney;
