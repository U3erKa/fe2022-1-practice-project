import ApplicationError from './ApplicationError';

class ServerError extends ApplicationError {
  constructor(message) {
    super(message || 'server error', 500);
  }
}

export default ServerError;
