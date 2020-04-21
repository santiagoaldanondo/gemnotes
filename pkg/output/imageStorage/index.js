const { createImage } = require('./createImage');

const init = imageBucket => ({
  createImage: createImage(imageBucket),
});

module.exports = {
  init,
};
