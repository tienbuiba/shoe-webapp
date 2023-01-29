import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentPostsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(commenPostWhereInput: Prisma.CommentPostWhereInput) {
    return await this.prismaService.commentPost.findFirst({
      where: commenPostWhereInput,
    });
  }
  async findAll(commenPostWhereInput?: Prisma.CommentPostWhereInput) {
    return await this.prismaService.commentPost.findMany({
      where: commenPostWhereInput,
    });
  }
  async create(commentPostCreateArgs: Prisma.CommentPostCreateArgs) {
    return await this.prismaService.commentPost.create(commentPostCreateArgs);
  }

  async update(
    id: number,
    commentPostUpdateArgs: Prisma.CommentPostUpdateInput,
  ) {
    return await this.prismaService.commentPost.update({
      where: {
        id: id,
      },
      data: commentPostUpdateArgs,
    });
  }

  async delete(id: number) {
    return await this.prismaService.commentPost.delete({
      where: {
        id: id,
      },
    });
  }
}
