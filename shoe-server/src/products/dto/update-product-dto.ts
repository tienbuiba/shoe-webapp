import { ApiPropertyOptional } from '@nestjs/swagger';
import { ProductStatusEnum } from '@prisma/client';
import {
  IsEnum,
  IsJSON,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class UpdateProductDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  categoryId: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  priceOrigin: number;

  @ApiPropertyOptional()
  @IsNumber()
  @Min(0)
  @IsOptional()
  priceSell: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  shortDesc: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  longDesc: string;

  @ApiPropertyOptional()
  @IsJSON()
  @IsOptional()
  color: Array<string>;

  @ApiPropertyOptional()
  @IsJSON()
  @IsOptional()
  size: Array<string>;

  @ApiPropertyOptional()
  @IsJSON()
  @IsOptional()
  images: Array<string>;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  sold: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @IsOptional()
  available: number;

  @ApiPropertyOptional()
  @IsEnum(ProductStatusEnum)
  @IsOptional()
  status: ProductStatusEnum;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  reviewCount: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  ratingAvg: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  brand: string;
}
