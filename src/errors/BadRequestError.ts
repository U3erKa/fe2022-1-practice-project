import ApplicationError from './ApplicationError';

class BadRequestError extends ApplicationError {
  constructor(public message = 'Bad request') {
    super(message, 400);
  }
}

export default BadRequestError;
