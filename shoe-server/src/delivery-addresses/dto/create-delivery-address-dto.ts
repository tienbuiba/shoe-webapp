import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDeliveryAddressDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  cityId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  wardId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  districtId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  detail: string;
}
