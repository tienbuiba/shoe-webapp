import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

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
  @IsString()
  @IsNotEmpty()
  cityId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  wardId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  districtId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  detail: string;
}
