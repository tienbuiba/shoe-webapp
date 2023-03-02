export function initProduct( name, size, priceOrigin, priceSell, color, images, shortDesc, longDesc, categoryId, sold,brand) {
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
    available: 1,
    reviewCount: 0,
    ratingAvg: 0,
    brand: brand
    }
};


export function initEditProduct( name, size, priceOrigin, priceSell, color, images, shortDesc, longDesc, categoryId, sold,brand) {
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
    available: 1,
    reviewCount: 0,
    ratingAvg: 0,
    brand: brand
    }
};


