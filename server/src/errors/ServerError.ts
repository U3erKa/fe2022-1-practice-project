import ApplicationError from './ApplicationError';

class ServerError extends ApplicationError {
  constructor(public message = 'Server error') {
    super(message, 500);
  }
}

export default ServerError;
