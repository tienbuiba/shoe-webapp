import { PartialType } from '@nestjs/swagger';
import { CreateCommentProductDto } from './create-comment-product.dto';

export class UpdateCommentProductDto extends PartialType(
  CreateCommentProductDto,
) {}
