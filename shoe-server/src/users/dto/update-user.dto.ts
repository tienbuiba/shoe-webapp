import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  username?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  avartarUrl?: string;
}
