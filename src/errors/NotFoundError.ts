import ApplicationError from './ApplicationError';

class NotFoundError extends ApplicationError {
  constructor(public message = 'The requested data was not found') {
    super(message, 404);
  }
}

export default NotFoundError;
