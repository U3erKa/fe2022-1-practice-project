import ApplicationError from './ApplicationError';

class RightsError extends ApplicationError {
  constructor(public message = 'Not enough rights') {
    super(message, 423);
  }
}

export default RightsError;
