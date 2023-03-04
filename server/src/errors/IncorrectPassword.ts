import ApplicationError from './ApplicationError';

class IncorrectPassword extends ApplicationError {
  constructor(public message = 'Incorrect password') {
    super(message, 406);
  }
}

export default IncorrectPassword;
