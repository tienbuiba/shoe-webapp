import {
  CityReference,
  DeliveryAddress,
  DistrictReference,
  WardReference,
} from '@prisma/client';

export function existKeywordInQuery(keyword: string): boolean {
  if (keyword === undefined || keyword === null || keyword === '') {
    return false;
  } else return true;
}

export function generateOrderCode() {
  const currentTime = Math.floor(new Date().getTime() / 1000).toString();
  return 'SOD' + currentTime; //SOD = Shoe Order
}

export function getAddressOrderFromAddressDelivery(
  address: DeliveryAddress & { city: CityReference } & {
    district: DistrictReference;
  } & { ward: WardReference },
) {
  return (
    address.city.name +
    ', ' +
    address.district.name +
    ', ' +
    address.ward.name +
    ', ' +
    address.detail
  );
}
