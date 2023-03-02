import ApplicationError from './ApplicationError';

class UserNotFoundError extends ApplicationError {
  constructor(message) {
    super(message || 'user with email not found', 404);
  }
}

export default UserNotFoundError;
