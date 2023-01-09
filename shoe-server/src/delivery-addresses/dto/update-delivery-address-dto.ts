import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateDeliveryAddressDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  fullname: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  cityId: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  wardId: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  districtId: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  detail: string;
}
