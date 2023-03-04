import ApplicationError from './ApplicationError';

class UserNotFoundError extends ApplicationError {
  constructor(public message = 'User with email was not found') {
    super(message, 404);
  }
}

export default UserNotFoundError;
