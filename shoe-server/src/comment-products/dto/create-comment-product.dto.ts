import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateCommentProductDto {
  @IsString()
  @IsOptional()
  content?: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  ratingStar: number;
}
