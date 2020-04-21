const { getHealth } = require('./getHealth');

const init = () => ({
  publishRoutes: ({ server }) => {
    server.get('/health', getHealth);
  },
});

module.exports = {
  init,
};
