import ApplicationError from './ApplicationError';

class TokenError extends ApplicationError {
  constructor(public message = 'Invalid token') {
    super(message, 401);
  }
}

export default TokenError;
