import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { existKeywordInQuery } from 'src/common/helper';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(orderWhereInput: Prisma.OrderWhereInput) {
    return await this.prismaService.order.findFirst({ where: orderWhereInput });
  }

  async findAll(
    limit: number,
    offset: number,
    keyword: string,
    userId: number,
  ) {
    if (existKeywordInQuery(keyword)) {
      return await this.prismaService.order.findMany({
        where:
          userId === null
            ? {
                OR: [
                  {
                    address: {
                      contains: keyword,
                    },
                    code: {
                      contains: keyword,
                    },
                  },
                ],
              }
            : {
                OR: [
                  {
                    address: {
                      contains: keyword,
                    },
                    code: {
                      contains: keyword,
                    },
                  },
                ],
                userId: userId,
              },
        take: limit,
        skip: offset * limit,
        orderBy: {
          createdAt: 'desc',
        },
      });
    } else {
      return await this.prismaService.order.findMany({
        where: userId === null ? {} : { userId: userId },
        take: limit,
        skip: offset * limit,
        orderBy: {
          createdAt: 'desc',
        },
      });
    }
  }
  async countNumberRecord(keyword: string, userId: number) {
    if (existKeywordInQuery(keyword)) {
      return await this.prismaService.order.count({
        where:
          userId === null
            ? {
                OR: [
                  {
                    address: {
                      contains: keyword,
                    },
                    code: {
                      contains: keyword,
                    },
                  },
                ],
              }
            : {
                OR: [
                  {
                    address: {
                      contains: keyword,
                    },
                    code: {
                      contains: keyword,
                    },
                  },
                ],
                userId: userId,
              },
      });
    } else {
      return await this.prismaService.order.count({
        where: userId === null ? {} : { userId: userId },
      });
    }
  }

  async create(createOrderArgs: Prisma.OrderCreateArgs) {
    return await this.prismaService.order.create(createOrderArgs);
  }

  async update(id: number, orderUpdateInput: Prisma.OrderUpdateInput) {
    return await this.prismaService.order.update({
      where: {
        id: id,
      },
      data: orderUpdateInput,
    });
  }

  async delete(id: number) {
    return await this.prismaService.order.delete({
      where: {
        id: id,
      },
    });
  }
}
