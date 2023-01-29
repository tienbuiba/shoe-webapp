import { IsString } from 'class-validator';

export class CreateCommentPostDto {
  @IsString()
  content: string;
}
