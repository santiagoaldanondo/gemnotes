class CustomError extends Error {
  constructor(error, code) {
    // Calling parent constructor of base Error class.
    if (typeof error === 'string') {
      super(error);
    } else {
      super(error.message);
      this.originalError = { ...error };
    }

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, CustomError.prototype);

    // Saving class name in the property of our custom error as a shortcut.
    this.name = this.constructor.name;

    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(this, this.constructor);

    this.code = code;
  }
}

const INVALID_PARAMETERS = 'INVALID_PARAMETERS';

const INTERNAL_ERROR = 'INTERNAL_ERROR';

const UNAVAILABLE_ERROR = 'UNAVAILABLE_ERROR';

const NOT_FOUND = 'NOT_FOUND';

module.exports = {
  CustomError,
  INVALID_PARAMETERS,
  INTERNAL_ERROR,
  UNAVAILABLE_ERROR,
  NOT_FOUND,
};
