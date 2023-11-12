import ApplicationError from './ApplicationError';

class BankDeclineError extends ApplicationError {
  constructor(public message = 'Bank declined transaction') {
    super(message, 403);
  }
}

export default BankDeclineError;
