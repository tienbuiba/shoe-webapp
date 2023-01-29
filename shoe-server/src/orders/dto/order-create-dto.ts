import { IsArray, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsArray()
  cartIds: Array<number>;

  @IsNumber()
  addressId: number;
}
