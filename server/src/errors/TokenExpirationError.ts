import ApplicationError from './ApplicationError';

class TokenExpirationError extends ApplicationError {
  constructor(message) {
    super(message || 'token expired', 419);
  }
}

export default TokenExpirationError;
