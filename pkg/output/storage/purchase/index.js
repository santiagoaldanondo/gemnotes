const { createPurchase } = require('./createPurchase');

const init = storage => ({
  createPurchase: createPurchase(storage),
});

module.exports = {
  init,
};
