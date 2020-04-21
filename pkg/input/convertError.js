const errs = require('restify-errors');
const errors = require('../error');

const convertError = (next, error) => {
  if (error instanceof errors.CustomError) {
    const { code, message } = error;
    switch (code) {
      case errors.catalog.INVALID_PARAMETERS:
        return next(new errs.BadRequestError(message));
      case errors.catalog.INTERNAL_ERROR:
        return next(new errs.InternalServerError(message));
      case errors.catalog.UNAVAILABLE_ERROR:
        return next(new errs.ServiceUnavailableError(message));
      case errors.catalog.NOT_FOUND:
        return next(new errs.NotFoundError(message));
      default:
        return next(new errs.ServiceUnavailableError('Unknown service unavailable error!'));
    }
  }
  return next(new errs.InternalServerError('Service unavailable error'));
};

module.exports = { convertError };
