const bunyan = require('bunyan');

const init = ({ config }) => bunyan.createLogger({ name: config.app });

module.exports = {
  init,
};
