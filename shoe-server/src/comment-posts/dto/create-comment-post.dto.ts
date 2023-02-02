import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCommentPostDto {
  @IsString()
  @ApiProperty()
  content: string;
}
