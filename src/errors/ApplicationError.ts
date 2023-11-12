class ApplicationError extends Error {
  constructor(
    public message = 'Something went wrong. Please try again',
    public code = 500,
  ) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
  }
}

export default ApplicationError;
