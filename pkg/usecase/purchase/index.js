const { createPurchase } = require('./createPurchase');

const init = repository => ({
  createPurchase: createPurchase(repository),
});

module.exports = {
  init,
};
