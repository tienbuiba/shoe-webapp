import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCartDto {
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  quantity: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  size: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  color: string;
}
