const { convertError } = require('../convertError');

const createPurchase = ({ purchaseUsecase }) => async (req, res, next) => {
  try {
    const purchase = req.body;
    const data = await purchaseUsecase.createPurchase(purchase);
    res.send(data);
    return next();
  } catch (error) {
    return convertError(next, error);
  }
};

module.exports = {
  createPurchase,
};
