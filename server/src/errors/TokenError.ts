import ApplicationError from './ApplicationError';

class TokenError extends ApplicationError {
  constructor(message) {
    super(message || 'invalid token', 401);
  }
}

export default TokenError;
