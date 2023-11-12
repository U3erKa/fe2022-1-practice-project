import ApplicationError from './ApplicationError';

class DevAlreadyExistError extends ApplicationError {
  constructor(public message = 'Dev with this login already exists') {
    super(message, 406);
  }
}

export default DevAlreadyExistError;
