import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class GetListQueryDto {
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(0)
  @IsOptional()
  @ApiPropertyOptional({
    name: 'limit',
    minimum: 0,
  })
  limit?: number;

  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(0)
  @IsOptional()
  @ApiPropertyOptional({
    name: 'offset',
    minimum: 1,
  })
  offset?: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    name: 'keyword',
  })
  keyword?: string;
}
