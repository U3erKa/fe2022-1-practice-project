import ApplicationError from './ApplicationError';

class BadRequestError extends ApplicationError {
  constructor(message) {
    super(message || 'bad request', 400);
  }
}

export default BadRequestError;
