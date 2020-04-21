const { createPurchase } = require('./createPurchase');

const init = ({ purchaseUsecase }) => ({
  publishRoutes: ({ server }) => {
    server.post('/purchases', createPurchase({ purchaseUsecase }));
  },
});

module.exports = {
  init,
};
