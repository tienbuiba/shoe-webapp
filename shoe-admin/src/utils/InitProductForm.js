export function initProduct( name, size, priceOrigin, priceSell, color, images, shortDesc, longDesc, categoryId, sold,available,brand) {
  return {
    name: name,
    size: size,
    priceOrigin: priceOrigin,
    priceSell: priceSell,
    color: color,
    images: images,
    shortDesc: shortDesc,
    longDesc: longDesc,
    categoryId: categoryId,
    sold: sold,
    available: available,
    reviewCount: 1,
    ratingAvg: 5,
    brand: brand
    }
};


export function initEditProduct( name, size, priceOrigin, priceSell, color, images, shortDesc, longDesc, categoryId, sold,available, brand) {
  return {
    name: name,
    size: size,
    priceOrigin: priceOrigin,
    priceSell: priceSell,
    color: color,
    images: images,
    shortDesc: shortDesc,
    longDesc: longDesc,
    categoryId: categoryId,
    sold: sold,
    available: available,
    reviewCount: 1,
    ratingAvg: 5,
    brand: brand
    }
};


