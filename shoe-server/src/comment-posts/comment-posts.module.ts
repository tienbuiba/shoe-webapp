import { Module } from '@nestjs/common';
import { CommentPostsService } from './comment-posts.service';
import { CommentPostsController } from './comment-posts.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  controllers: [CommentPostsController],
  providers: [CommentPostsService],
  imports: [PrismaModule, PostsModule],
})
export class CommentPostsModule {}
