import ApplicationError from './ApplicationError';

class NotUniqueEmail extends ApplicationError {
  constructor(message) {
    super(message || 'this email were already exist', 409);
  }
}

export default NotUniqueEmail;
