import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { existKeywordInQuery } from 'src/common/helper';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(limit: number, offset: number, keyword: string) {
    return await this.prisma.category.findMany({
      where: {
        name: {
          contains: existKeywordInQuery(keyword) ? keyword : '',
        },
      },
      take: limit,
      skip: limit * offset,
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async countNumberRecord(keyword: string) {
    return await this.prisma.category.count({
      where: {
        name: {
          contains: existKeywordInQuery(keyword) ? keyword : '',
        },
      },
    });
  }

  async findOne(categoryWhereInput: Prisma.CategoryWhereInput) {
    return await this.prisma.category.findFirst({
      where: categoryWhereInput,
    });
  }

  async create(categoryCreateArgs: Prisma.CategoryCreateArgs) {
    return await this.prisma.category.create(categoryCreateArgs);
  }

  async update(id: number, categoryDto: CategoryDto) {
    return await this.prisma.category.update({
      where: {
        id: id,
      },
      data: {
        name: categoryDto.name,
      },
    });
  }

  async delete(id: number) {
    return await this.prisma.category.delete({
      where: {
        id: id,
      },
    });
  }
}
