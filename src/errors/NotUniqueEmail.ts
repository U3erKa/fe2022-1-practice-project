import ApplicationError from './ApplicationError';

class NotUniqueEmail extends ApplicationError {
  constructor(public message = 'This email already exists') {
    super(message, 409);
  }
}

export default NotUniqueEmail;
