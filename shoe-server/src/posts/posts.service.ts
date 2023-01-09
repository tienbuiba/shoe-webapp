import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { GetListQueryDto } from 'src/common/dto/get-list.dto';
import { existKeywordInQuery } from 'src/common/helper';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}
  async findOne(postWhereInput: Prisma.PostWhereInput) {
    return await this.prisma.post.findFirst({
      where: postWhereInput,
    });
  }
  async create(createPostArgs: Prisma.PostCreateArgs) {
    return await this.prisma.post.create(createPostArgs);
  }

  async updatePost(id: number, postDto: PostDto) {
    return await this.prisma.post.update({
      where: {
        id: id,
      },
      data: {
        ...postDto,
      },
    });
  }

  async delete(id: number) {
    return await this.prisma.post.delete({
      where: {
        id: id,
      },
    });
  }

  async findAll(query: GetListQueryDto) {
    let listPost: any;
    if (existKeywordInQuery(query.keyword)) {
      listPost = await this.prisma.post.findMany({
        where: {
          OR: [
            {
              shortDesc: {
                contains: query.keyword,
              },
            },
            {
              longDesc: {
                contains: query.keyword,
              },
            },
          ],
        },
        take: query.limit,
        skip: query.limit * query.offset,
      });
    } else {
      listPost = await this.prisma.post.findMany({
        take: query.limit,
        skip: query.limit * query.offset,
      });
    }
    return listPost;
  }

  async countRecord(keyword: string) {
    let count: number;
    if (existKeywordInQuery(keyword)) {
      count = await this.prisma.post.count({
        where: {
          OR: [
            {
              shortDesc: {
                contains: keyword,
              },
            },
            {
              longDesc: {
                contains: keyword,
              },
            },
          ],
        },
      });
    } else {
      count = await this.prisma.post.count();
    }
    return count;
  }
}
