const uuid = require('uuid');

const createImage = ({ imageInfra }) => async (purchase) => {
  const data = {
    Key: uuid.v4(),
    Body: purchase,
    ContentEncoding: 'base64',
    ContentType: 'image/jpeg',
  };

  try {
    await imageInfra.putObject(data).promise();
    return data.Key;
  } catch (e) {
    throw e;
  }
};

module.exports = {
  createImage,
};
