export function initProduct( productName, productSize, priceOrigin, priceSell, productColors, productImages, productShortDesc, productLongDesc, productCategoryId, productSold,brand) {
  return {
    name: productName,
    size: productSize,
    priceOrigin: priceOrigin,
    priceSell: priceSell,
    color: productColors,
    images: productImages,
    shortDesc: productShortDesc,
    longDesc: productLongDesc,
    categoryId: productCategoryId,
    sold: productSold,
    available: 1,
    reviewCount: 0,
    ratingAvg: 0,
    brand: brand
    }
};

