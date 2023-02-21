import { Injectable } from '@nestjs/common';
import { Order, OrderStatusEnum, Prisma } from '@prisma/client';
import {
  existKeywordInQuery,
  getPreviousDayWithArgFromToday,
} from 'src/common/helper';
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
                  },
                  {
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
                  },
                  {
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
                  },
                  {
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
                  },
                  {
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

  async countNewOrder(day: number) {
    const timeline = getPreviousDayWithArgFromToday(day);

    return await this.prismaService.order.count({
      where: {
        updatedAt: {
          gte: timeline,
        },
        status: OrderStatusEnum.SUCCESS,
      },
    });
  }

  async countTotalRevenue(day: number) {
    const timeline = getPreviousDayWithArgFromToday(day);
    const listOrder = await this.prismaService.order.findMany({
      where: {
        updatedAt: {
          gte: timeline,
        },
        status: OrderStatusEnum.SUCCESS,
      },
    });
    const revenue = listOrder.reduce((total: number, order: Order): number => {
      return total + order.totalPrice;
    }, 0);
    return revenue;
  }
}
