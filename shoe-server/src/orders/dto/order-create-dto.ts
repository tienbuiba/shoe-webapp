import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethod } from '@prisma/client';
import { IsArray, IsEnum, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsArray()
  @ApiProperty({ type: Array<number> })
  cartIds: Array<number>;

  @IsNumber()
  @ApiProperty({ type: Number })
  addressId: number;

  @IsEnum(PaymentMethod)
  @ApiProperty()
  paymentMethod: PaymentMethod;
}
