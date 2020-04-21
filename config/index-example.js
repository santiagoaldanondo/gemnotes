const config = {
  app: {
    name: process.env('APP_NAME'),
    port: process.env('APP_PORT'),
  },
  log: {
    name: process.env('APP_NAME'),
    level: process.env('LOG_LEVEL'),
  },
  s3: {
    accessKeyId: process.env('S3_ACCESS_KEY_ID'),
    secretAccessKey: process.env('S3_SECRET_ACCESS_KEY'),
    region: process.env('S3_REGION'),
    bucket: process.env('S3_BUCKET'),
  },
  mongo: {
    db: process.env('MONGO_DB'),
    user: process.env('MONGO_USER'),
    password: process.env('MONGO_PASSWORD'),
  },
};

module.exports = { config };
