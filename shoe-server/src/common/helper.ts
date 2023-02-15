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

export function generateOrderCode(userId: number) {
  const currentTime = Math.floor(new Date().getTime() / 1000).toString();
  return 'SOD' + userId + currentTime; //SOD = Shoe Order
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

export function getPreviousDayWithArgFromToday(numDays: number): Date {
  const today = new Date();
  today.setDate(today.getDate() - numDays);
  return today;
}
export function getPreviousMinutesWithArgFromToday(numMinutes: number): Date {
  const today = new Date();
  today.setMinutes(today.getMinutes() - numMinutes);
  return today;
}
