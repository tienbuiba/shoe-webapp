import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateCommentProductDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ type: String })
  content?: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  @ApiProperty({ type: Number })
  ratingStar: number;
}
