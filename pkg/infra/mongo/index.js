const { MongoClient } = require('mongodb');

const init = async ({ config }) => {
  const uri = `mongodb+srv://${config.mongo.user}:${config.mongo.password}@gemnotes-rrih1.mongodb.net/test?retryWrites=true&w=majority`;
  const client = await MongoClient.connect(uri, { useNewUrlParser: true });
  return client.db(config.mongo.db);
};

module.exports = {
  init,
};
