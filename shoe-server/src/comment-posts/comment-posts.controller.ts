import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Role, RoleEnum, User } from '@prisma/client';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { Roles } from 'src/auth/decorators/role.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { IResponse } from 'src/common/dto/response.dto';
import { PostsService } from 'src/posts/posts.service';
import { CommentPostsService } from './comment-posts.service';
import { CreateCommentPostDto } from './dto/create-comment-post.dto';
import { UpdateCommentPostDto } from './dto/update-comment-post.dto';

@Controller('comment-posts')
@ApiTags('Comment Post')
export class CommentPostsController {
  constructor(
    private readonly commentPostsService: CommentPostsService,
    private readonly postService: PostsService,
  ) {}

  @Get('/list-comment')
  @ApiOperation({ summary: 'Get all comment in a post' })
  async getAllCommentInPost(
    @Query('postId') postId: number,
  ): Promise<IResponse> {
    const existPost = await this.postService.findOne({ id: postId });
    if (!existPost) {
      throw new BadRequestException(`Post not found with id: ${postId}`);
    }

    const comments = await this.commentPostsService.findAll({ postId: postId });
    return {
      statusCode: HttpStatus.OK,
      message: 'Get list comment in this post successfully!',
      data: comments,
    };
  }

  @Post('/comment')
  @UseGuards(JwtGuard)
  @Roles(RoleEnum.USER)
  @ApiOperation({ summary: 'Comment in a post' })
  @ApiQuery({ required: true, name: 'postId' })
  async commentInPost(
    @Query('postId') postId: number,
    @Body() createDto: CreateCommentPostDto,
    @GetUser() user: User,
  ): Promise<IResponse> {
    const existPost = await this.postService.findOne({ id: postId });
    if (!existPost) {
      throw new BadRequestException(`Post not found with id: ${postId}`);
    }

    const comment = await this.commentPostsService.create({
      data: {
        userId: user.id,
        postId: postId,
        content: createDto.content,
      },
    });
    return {
      statusCode: HttpStatus.OK,
      message: 'Comment successfully!',
      data: comment,
    };
  }

  @Post('/update-comment')
  @UseGuards(JwtGuard)
  @Roles(RoleEnum.USER)
  @ApiOperation({ summary: 'Update comment post' })
  @ApiQuery({ required: true, name: 'commentId' })
  async updateCommentPost(
    @Body() updateDto: UpdateCommentPostDto,
    @Query('commentId') commentId: number,
  ): Promise<IResponse> {
    const existComment = await this.commentPostsService.findOne({
      id: commentId,
    });
    if (!existComment) {
      throw new BadRequestException(
        `Comment Post not found with id: ${commentId}`,
      );
    }
    const updateComment = await this.commentPostsService.update(
      commentId,
      updateDto,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Update comment successfully!',
      data: updateComment,
    };
  }

  @Delete('/delete/:id')
  @ApiParam({ name: 'id', required: true })
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Delete comment in post' })
  async deleteComment(
    @Param('id') id: number,
    @GetUser() user: User & { role: Role },
  ): Promise<IResponse> {
    const existComment = await this.commentPostsService.findOne({
      id: id,
    });
    if (!existComment) {
      throw new BadRequestException(`Comment Post not found with id: ${id}`);
    }
    if (user.role.name !== RoleEnum.ADMIN && user.id !== existComment.userId) {
      throw new ForbiddenException(
        'You do not have permission in this resource!',
      );
    }
    await this.commentPostsService.delete(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Delete comment successfully!',
    };
  }

  @Get('/top10')
  @ApiOperation({ summary: 'Top 10 most commented posts in this week' })
  async getTop10Post(): Promise<IResponse> {
    const counts =
      await this.commentPostsService.findTop10MostCommendPostInWeek();
    const postIds = counts.map(({ postId }) => postId);
    const posts = await this.postService.findAllByIds(postIds);
    return {
      statusCode: HttpStatus.OK,
      message: 'Get top 10 posts successfully!',
      data: posts,
    };
  }
}
