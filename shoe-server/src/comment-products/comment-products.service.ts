import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(commentProductWhereInput: Prisma.CommentProductWhereInput) {
    return await this.prismaService.commentProduct.findFirst({
      where: commentProductWhereInput,
    });
  }

  async findAll(commentProductWhereInput?: Prisma.CommentProductWhereInput) {
    return await this.prismaService.commentProduct.findMany({
      where: commentProductWhereInput,
    });
  }

  async create(commentProductCreateArgs: Prisma.CommentProductCreateArgs) {
    return await this.prismaService.commentProduct.create(
      commentProductCreateArgs,
    );
  }

  async update(
    id: number,
    commentProductUpdateArgs: Prisma.CommentProductUpdateInput,
  ) {
    return await this.prismaService.commentProduct.update({
      where: { id: id },
      data: commentProductUpdateArgs,
    });
  }

  async delete(id: number) {
    return await this.prismaService.commentProduct.delete({
      where: {
        id: id,
      },
    });
  }
}
