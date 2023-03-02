import ApplicationError from './ApplicationError';

class BankDeclineError extends ApplicationError {
  constructor(message) {
    super(message || 'Bank decline transaction', 403);
  }
}

export default BankDeclineError;
