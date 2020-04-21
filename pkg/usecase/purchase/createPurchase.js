const createPurchase = ({
  storageOutputAdapter,
  s3BucketOutputAdapter,
}) => async (purchase) => {
  const { images, ...storagePurchase } = purchase;
  let savedImages = [];
  try {
    if (Array.isArray(images)) {
      savedImages = await Promise.all(
        images.map(image => s3BucketOutputAdapter.createImage(image)),
      );
    }
    const createdPurchase = await storageOutputAdapter.createPurchase({
      images: savedImages,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...storagePurchase,
    });
    return createdPurchase;
  } catch (e) {
    throw e;
  }
};
module.exports = {
  createPurchase,
};
