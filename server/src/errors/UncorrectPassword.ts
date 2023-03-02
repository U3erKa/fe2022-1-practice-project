import ApplicationError from './ApplicationError';

class UncorrectPassword extends ApplicationError {
  constructor(message) {
    super(message || 'uncorrect password', 406);
  }
}

export default UncorrectPassword;
