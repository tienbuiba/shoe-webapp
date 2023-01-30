import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsArray()
  @ApiProperty({ type: Array<number> })
  cartIds: Array<number>;

  @IsNumber()
  @ApiProperty({ type: Number })
  addressId: number;
}
