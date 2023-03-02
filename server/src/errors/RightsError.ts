import ApplicationError from './ApplicationError';

class RightsError extends ApplicationError {
  constructor(message) {
    super(message || 'not enough rights', 423);
  }
}

export default RightsError;
