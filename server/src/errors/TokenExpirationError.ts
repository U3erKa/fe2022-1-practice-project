import ApplicationError from './ApplicationError';

class TokenExpirationError extends ApplicationError {
  constructor(public message = 'Token expired') {
    super(message, 419);
  }
}

export default TokenExpirationError;
