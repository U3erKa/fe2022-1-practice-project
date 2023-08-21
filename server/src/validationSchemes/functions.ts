import ApplicationError from '../errors/ApplicationError';

export function isTuple(list: boolean[]) {
  if (!(list instanceof Array)) {
    throw new ApplicationError('Must be an array');
  }
  if (list.length !== 2) {
    throw new ApplicationError('Must be tuple of 2 booleans');
  }
}
