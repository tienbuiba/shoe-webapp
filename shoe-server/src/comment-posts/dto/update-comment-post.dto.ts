import { PartialType } from '@nestjs/swagger';
import { CreateCommentPostDto } from './create-comment-post.dto';

export class UpdateCommentPostDto extends PartialType(CreateCommentPostDto) {}
