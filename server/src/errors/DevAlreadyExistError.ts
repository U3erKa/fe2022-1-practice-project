import ApplicationError from './ApplicationError';

class DevAlreadyExistError extends ApplicationError {
  constructor(message) {
    super(message || 'Dev with this login already exist', 406);
  }
}

export default DevAlreadyExistError;
