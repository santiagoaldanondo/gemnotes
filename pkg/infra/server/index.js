const httpContext = require('express-http-context');
const responseTime = require('response-time');
const restify = require('restify');
const errors = require('restify-errors');
const uuid = require('uuid');

const { X_REQUEST_ID } = require('../../constant');

const init = ({ config, log }) => {
  const server = restify.createServer({
    log,
    name: config.app.name,
    version: config.app.version,
    maxParamLength: 1000,
  });

  const corsMiddleware = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    return next();
  };

  server.use(corsMiddleware);
  server.use(restify.plugins.queryParser());
  server.use(restify.plugins.jsonBodyParser({ mapParams: true }));
  server.use(responseTime());
  server.pre(restify.plugins.pre.sanitizePath());

  server.on('after', (req, res, next, error) => {
    restify.plugins.auditLogger({ log, event: 'after', printLog: req.href() !== '/health' })(req, res, next, error);
  });

  server.on('uncaughtException', (req, res, err, appError) => {
    log.info(appError);
    return res.send(new errors.InternalServerError(appError.message));
  });

  // This is used to inject an UUID per request in httpContext, which is read when logging
  server.use(httpContext.middleware);
  server.use((req, res, next) => {
    const traceId = (req.headers && req.headers[X_REQUEST_ID])
  || req.getId()
  || uuid.v4();
    httpContext.set(X_REQUEST_ID, traceId);
    next();
  });

  return server;
};

module.exports = { init };
