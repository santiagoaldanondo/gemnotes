const HEALTH_OPTIONS = { successMessage: 'I\'m alive, for now...' };

const getHealth = (req, res, next) => {
  res.send(HEALTH_OPTIONS);
  return next();
};

module.exports = {
  getHealth,
};
