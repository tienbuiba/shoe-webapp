import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RoleEnum } from '@prisma/client';
import { Roles } from 'src/auth/decorators/role.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { GetListQueryDto } from 'src/common/dto/get-list.dto';
import { IResponse } from 'src/common/dto/response.dto';
import { PostDto } from './dto/post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/detail/:id')
  @ApiOperation({ summary: 'Get detail post' })
  async getPostById(@Param('id') id: number): Promise<IResponse> {
    const post = await this.postsService.findOne({ id: id });
    if (!post) {
      throw new InternalServerErrorException('Post not found with id: ' + id);
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Get detail post successfully!',
      data: post,
    };
  }

  @Post('list')
  @ApiOperation({ summary: 'Get list posts' })
  async getListPost(@Body() query: GetListQueryDto): Promise<IResponse> {
    query.limit = isNaN(query.limit) ? 10 : query.limit;
    query.offset = isNaN(query.offset) ? 0 : query.offset;
    const listPost = await this.postsService.findAll(query);
    const count = await this.postsService.countRecord(query.keyword);
    return {
      statusCode: HttpStatus.OK,
      message: 'Get list post successfully!',
      data: {
        items: listPost,
        total: count,
      },
    };
  }

  @Post('create')
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Create post' })
  async createPost(@Body() postDto: PostDto): Promise<IResponse> {
    await this.postsService.create({
      data: {
        ...postDto,
      },
    });
    return {
      statusCode: HttpStatus.OK,
      message: 'Create post successfully!',
    };
  }
  @Post('update/:id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Update post' })
  async updatePost(
    @Param('id') id: number,
    @Body() postDto: PostDto,
  ): Promise<IResponse> {
    let existPost = await this.postsService.findOne({
      id: id,
    });
    if (!existPost) {
      throw new BadRequestException(`Post not found with id: ${id}`);
    }
    existPost = await this.postsService.updatePost(id, postDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Updated post successfully!',
      data: existPost,
    };
  }
  @Delete('delete/:id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Delete post' })
  async deletePost(@Param('id') id: number): Promise<IResponse> {
    const existPost = await this.postsService.findOne({
      id: id,
    });
    if (!existPost) {
      throw new BadRequestException(`Post not found with id: ${id}`);
    }
    await this.postsService.delete(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Deleted post successfully!',
    };
  }
}
