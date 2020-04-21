const { config } = require('./config');
const mongoInfra = require('./pkg/infra/mongo');
const s3BucketInfra = require('./pkg/infra/s3Bucket');
const logInfra = require('./pkg/infra/log');
const serverInfra = require('./pkg/infra/server');
const purchaseStorageOutput = require('./pkg/output/storage/purchase');
const s3Output = require('./pkg/output/imageStorage');
const purchase = require('./pkg/usecase/purchase');
const healthInput = require('./pkg/input/health');
const purchaseInput = require('./pkg/input/purchase');

(async () => {
  // Infra
  const db = await mongoInfra.init({ config });
  const s3Bucket = s3BucketInfra.init({ config });
  const log = logInfra.init({ config });
  const server = serverInfra.init({ config, log });

  // Output adapters
  const purchaseStorageOutputAdapter = purchaseStorageOutput.init({ db });
  const s3BucketOutputAdapter = s3Output.init({ imageInfra: s3Bucket });

  // Usecases
  const purchaseUsecase = purchase.init({
    storageOutputAdapter: purchaseStorageOutputAdapter,
    s3BucketOutputAdapter,
  });

  // Input adapters
  healthInput.init().publishRoutes({ server });
  purchaseInput.init({ purchaseUsecase }).publishRoutes({ server });

  server.listen(config.app.port, () => {
    log.info(`${server.name} listening to port ${config.app.port}`);
  });
})();
