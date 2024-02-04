export class ApplicationError extends Error {
  constructor(
    public message = 'Something went wrong. Please try again',
    public code = 500,
  ) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
  }
}

export class BadRequestError extends ApplicationError {
  constructor(public message = 'Bad request') {
    super(message, 400);
  }
}

export class BankDeclineError extends ApplicationError {
  constructor(public message = 'Bank declined transaction') {
    super(message, 403);
  }
}

export class NotFoundError extends ApplicationError {
  constructor(public message = 'The requested data was not found') {
    super(message, 404);
  }
}

export class RightsError extends ApplicationError {
  constructor(public message = 'Not enough rights') {
    super(message, 423);
  }
}

export class TokenError extends ApplicationError {
  constructor(public message = 'Invalid token') {
    super(message, 401);
  }
}

export class UserNotFoundError extends ApplicationError {
  constructor(public message = 'User with email was not found') {
    super(message, 404);
  }
}

export class ServerError extends ApplicationError {
  constructor(public message = 'Server error') {
    super(message, 500);
  }
}
