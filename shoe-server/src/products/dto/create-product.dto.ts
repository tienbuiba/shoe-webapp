import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  priceOrigin: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  priceSell: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  shortDesc: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  longDesc: string;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  color: Array<string>;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  size: Array<string>;

  @ApiProperty()
  @IsArray()
  images: Array<string>;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  sold: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  available: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  reviewCount: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  ratingAvg: number;
}
