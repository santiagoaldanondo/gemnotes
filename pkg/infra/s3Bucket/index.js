const AWS = require('aws-sdk');

const init = ({ config }) => new AWS.S3({
  accessKeyId: config.s3.accessKeyId,
  secretAccessKey: config.s3.secretAccessKey,
  region: config.s3.region,
  params: {
    Bucket: config.s3.bucket,
  },
});

module.exports = {
  init,
};
