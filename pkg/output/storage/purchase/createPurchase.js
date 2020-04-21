const createPurchase = ({ db }) => async (purchase) => {
  const response = await db.collection('purchase').insert(purchase);
  return response.ops[0];
};

module.exports = {
  createPurchase,
};
